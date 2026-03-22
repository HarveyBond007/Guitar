// ── DOM References ──────────────────────────────────────────────────────────
const sidebar = document.getElementById('sidebar');
const lessonList = document.getElementById('lesson-list');
const lessonView = document.getElementById('lesson-view');
const fretboardContainer = document.getElementById('fretboard-container');
const fretboardEl = document.getElementById('fretboard');
const quizContainer = document.getElementById('quiz-container');
const prevBtn = document.getElementById('prev-lesson');
const nextBtn = document.getElementById('next-lesson');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const clearFretboardBtn = document.getElementById('clear-fretboard');
const showAllNotesCheckbox = document.getElementById('show-all-notes');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

// ── State ───────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'guitarLabProgress';
let currentLessonIndex = 0;
let completedLessons = new Set();

const TRAINING_IDS = new Set([
    'ear-training',
    'chord-training',
    'scale-training',
    'arpeggio-training'
]);

// ── Progress Persistence ────────────────────────────────────────────────────
function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            currentLessonIndex = typeof data.currentLesson === 'number' ? data.currentLesson : 0;
            completedLessons = new Set(Array.isArray(data.completed) ? data.completed : []);
        }
    } catch (e) {
        console.warn('Failed to load progress:', e);
    }
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            currentLesson: currentLessonIndex,
            completed: Array.from(completedLessons)
        }));
    } catch (e) {
        console.warn('Failed to save progress:', e);
    }
}

// ── Toast Notifications ─────────────────────────────────────────────────────
function showToast(message, type = '', duration = 3000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' ' + type : '');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger reflow so the entrance transition fires
    toast.offsetHeight; // eslint-disable-line no-unused-expressions
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        // Fallback removal if transitionend never fires
        setTimeout(() => { if (toast.parentNode) toast.remove(); }, 500);
    }, duration);
}

// ── Progress Bar ────────────────────────────────────────────────────────────
function updateProgressBar() {
    const total = LESSONS.length;
    const done = completedLessons.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    if (progressBar) progressBar.style.width = pct + '%';
    if (progressText) progressText.textContent = pct + '% complete (' + done + '/' + total + ')';
}

// ── Mark Lesson Complete ────────────────────────────────────────────────────
function markComplete(lessonId) {
    if (completedLessons.has(lessonId)) return;

    completedLessons.add(lessonId);
    saveProgress();
    updateProgressBar();
    updateSidebarStates();
    showToast('Lesson completed!', 'success');
}

function onQuizComplete(score, total) {
    const pct = total > 0 ? (score / total) * 100 : 0;
    if (pct >= 60) {
        markComplete(LESSONS[currentLessonIndex].id);
    } else {
        showToast('Score: ' + Math.round(pct) + '%. You need at least 60% to pass. Try again!');
    }
}

// Expose for external Quiz callbacks
window.onQuizComplete = onQuizComplete;

// ── Sidebar ─────────────────────────────────────────────────────────────────
function buildSidebar() {
    if (!lessonList) return;
    lessonList.innerHTML = '';

    let currentSection = null;

    LESSONS.forEach((lesson, index) => {
        if (lesson.section && lesson.section !== currentSection) {
            currentSection = lesson.section;
            const header = document.createElement('li');
            header.className = 'section-header';
            header.textContent = currentSection;
            lessonList.appendChild(header);
        }

        const li = document.createElement('li');
        li.className = 'lesson-item';
        li.dataset.index = index;
        li.dataset.lessonId = lesson.id;

        const icon = document.createElement('span');
        icon.className = 'lesson-icon';
        icon.textContent = completedLessons.has(lesson.id) ? '●' : '○';
        li.appendChild(icon);
        li.appendChild(document.createTextNode(lesson.title));

        if (completedLessons.has(lesson.id)) li.classList.add('completed');

        li.addEventListener('click', () => navigateTo(index));
        lessonList.appendChild(li);
    });
}

function updateSidebarStates() {
    if (!lessonList) return;

    lessonList.querySelectorAll('.lesson-item').forEach((li) => {
        const idx = parseInt(li.dataset.index, 10);
        const id = li.dataset.lessonId;
        const isCompleted = completedLessons.has(id);

        li.classList.toggle('active', idx === currentLessonIndex);
        li.classList.toggle('completed', isCompleted);

        const icon = li.querySelector('.lesson-icon');
        if (icon) icon.textContent = isCompleted ? '●' : '○';
    });
}

function scrollSidebarToActive() {
    if (!lessonList) return;
    const active = lessonList.querySelector('.lesson-item.active');
    if (active) {
        active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function hasQuizOrTraining(lesson) {
    return lesson.quiz || TRAINING_IDS.has(lesson.id);
}

// ── Navigation ──────────────────────────────────────────────────────────────
let previousLessonIndex = null;

function navigateTo(index) {
    if (index < 0 || index >= LESSONS.length) return;

    // Mark the previous lesson complete if it had no quiz and was not a training lesson
    if (previousLessonIndex !== null && previousLessonIndex !== index) {
        const prevLesson = LESSONS[previousLessonIndex];
        if (!hasQuizOrTraining(prevLesson)) {
            markComplete(prevLesson.id);
        }
    }

    currentLessonIndex = index;
    previousLessonIndex = index;
    const lesson = LESSONS[index];

    // ── Lesson content ──────────────────────────────────────────────────
    if (lessonView) {
        lessonView.innerHTML = typeof lesson.content === 'function' ? lesson.content() : '';
    }

    // ── Fretboard setup ─────────────────────────────────────────────────
    if (lesson.fretboard) {
        if (fretboardContainer) fretboardContainer.classList.remove('hidden');
        Fretboard.clear();
        if (showAllNotesCheckbox) {
            showAllNotesCheckbox.checked = false;
            Fretboard.setShowAll(false);
        }
        if (typeof lesson.fretboard === 'function') {
            lesson.fretboard(Fretboard, fretboardEl);
        } else if (lesson.fretboard.setup) {
            lesson.fretboard.setup(Fretboard);
            Fretboard.render(fretboardEl);
        } else {
            Fretboard.render(fretboardEl);
            if (lesson.fretboard.scale) {
                Fretboard.highlightScale(lesson.fretboard.scale);
            } else if (lesson.fretboard.chord) {
                Fretboard.highlightChord(lesson.fretboard.chord);
            } else if (lesson.fretboard.highlights) {
                Fretboard.highlight(lesson.fretboard.highlights);
            }
        }
    } else {
        if (fretboardContainer) fretboardContainer.classList.add('hidden');
    }

    // ── Quiz / Training ─────────────────────────────────────────────────
    if (lesson.id === 'ear-training') {
        if (quizContainer) quizContainer.classList.remove('hidden');
        Quiz.renderEarTraining(quizContainer);
    } else if (lesson.id === 'chord-training') {
        if (quizContainer) quizContainer.classList.remove('hidden');
        Quiz.renderChordTraining(quizContainer);
    } else if (lesson.id === 'scale-training') {
        if (quizContainer) quizContainer.classList.remove('hidden');
        Quiz.renderScaleTraining(quizContainer);
    } else if (lesson.id === 'arpeggio-training') {
        if (quizContainer) quizContainer.classList.remove('hidden');
        Quiz.renderArpeggioTraining(quizContainer);
    } else if (lesson.quiz && lesson.quiz.length > 0) {
        if (quizContainer) quizContainer.classList.remove('hidden');
        Quiz.render(quizContainer, lesson.quiz, onQuizComplete);
    } else {
        if (quizContainer) quizContainer.classList.add('hidden');
    }

    // ── Navigation button states ────────────────────────────────────────
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === LESSONS.length - 1;

    // ── Sidebar updates ─────────────────────────────────────────────────
    updateSidebarStates();
    scrollSidebarToActive();

    // ── Scroll content to top ───────────────────────────────────────────
    if (lessonView) lessonView.scrollTo({ top: 0, behavior: 'smooth' });

    // ── Close sidebar on mobile ─────────────────────────────────────────
    if (window.innerWidth < 768 && sidebar) {
        sidebar.classList.remove('open');
    }

    saveProgress();
}

// ── Event Listeners ─────────────────────────────────────────────────────────
function initEventListeners() {
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentLessonIndex > 0) navigateTo(currentLessonIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentLessonIndex < LESSONS.length - 1) navigateTo(currentLessonIndex + 1);
        });
    }

    if (clearFretboardBtn) {
        clearFretboardBtn.addEventListener('click', () => {
            Fretboard.clear();
            Fretboard.render(fretboardEl);
        });
    }

    if (showAllNotesCheckbox) {
        showAllNotesCheckbox.addEventListener('change', (e) => {
            Fretboard.setShowAll(e.target.checked);
            const lesson = LESSONS[currentLessonIndex];
            if (lesson.fretboard && lesson.fretboard.setup) {
                lesson.fretboard.setup(Fretboard);
            }
            Fretboard.render(fretboardEl);
        });
    }

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (sidebar) sidebar.classList.toggle('open');
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

        if (e.key === 'ArrowLeft' && currentLessonIndex > 0) {
            navigateTo(currentLessonIndex - 1);
        } else if (e.key === 'ArrowRight' && currentLessonIndex < LESSONS.length - 1) {
            navigateTo(currentLessonIndex + 1);
        }
    });
}

// ── Initialisation ──────────────────────────────────────────────────────────
function init() {
    loadProgress();
    buildSidebar();
    updateProgressBar();
    initEventListeners();

    // Clamp saved lesson index to valid range
    if (currentLessonIndex < 0 || currentLessonIndex >= LESSONS.length) {
        currentLessonIndex = 0;
    }

    navigateTo(currentLessonIndex);
}

document.addEventListener('DOMContentLoaded', init);
