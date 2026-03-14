document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'guitarTheoryProgress';
    let currentLessonIndex = 0;
    let completedLessons = new Set();

    // DOM elements
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

    // Load saved progress
    function loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (saved) {
                currentLessonIndex = saved.currentLesson || 0;
                completedLessons = new Set(saved.completed || []);
            }
        } catch (e) { /* ignore */ }
    }

    function saveProgress() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            currentLesson: currentLessonIndex,
            completed: Array.from(completedLessons)
        }));
    }

    // Build sidebar
    function buildSidebar() {
        lessonList.innerHTML = '';
        let currentSection = '';
        LESSONS.forEach((lesson, i) => {
            if (lesson.section !== currentSection) {
                currentSection = lesson.section;
                const header = document.createElement('li');
                header.className = 'section-header';
                header.textContent = currentSection;
                lessonList.appendChild(header);
            }
            const li = document.createElement('li');
            li.dataset.index = i;
            const icon = document.createElement('span');
            icon.className = 'lesson-icon';
            icon.textContent = completedLessons.has(lesson.id) ? '●' : '○';
            li.appendChild(icon);
            li.appendChild(document.createTextNode(lesson.title));
            if (completedLessons.has(lesson.id)) li.classList.add('completed');
            li.addEventListener('click', () => navigateTo(i));
            lessonList.appendChild(li);
        });
    }

    function updateSidebarStates() {
        lessonList.querySelectorAll('li[data-index]').forEach(li => {
            const idx = parseInt(li.dataset.index);
            const lesson = LESSONS[idx];
            li.classList.toggle('active', idx === currentLessonIndex);
            li.classList.toggle('completed', completedLessons.has(lesson.id));
            li.querySelector('.lesson-icon').textContent = completedLessons.has(lesson.id) ? '●' : '○';
        });
    }

    function updateProgressBar() {
        const pct = Math.round((completedLessons.size / LESSONS.length) * 100);
        progressBar.style.width = pct + '%';
        progressText.textContent = pct + '% complete';
    }

    // Mark lesson complete
    function markComplete(lessonId) {
        if (!completedLessons.has(lessonId)) {
            completedLessons.add(lessonId);
            updateSidebarStates();
            updateProgressBar();
            saveProgress();
            showToast('Lesson completed!', 'success');
        }
    }

    // Navigate to lesson
    let previousLessonId = null;

    function navigateTo(index) {
        if (index < 0 || index >= LESSONS.length) return;

        // Mark previous lesson complete if it had no quiz
        if (previousLessonId) {
            const prevLesson = LESSONS.find(l => l.id === previousLessonId);
            const trainingLessons = ['ear-training', 'chord-training', 'scale-training', 'arpeggio-training'];
            if (prevLesson && !prevLesson.quiz && !trainingLessons.includes(prevLesson.id)) {
                markComplete(prevLesson.id);
            }
        }

        currentLessonIndex = index;
        const lesson = LESSONS[index];
        previousLessonId = lesson.id;

        // Set content
        lessonView.innerHTML = lesson.content();

        // Fretboard
        if (lesson.fretboard) {
            fretboardContainer.classList.remove('hidden');
            Fretboard.clear();
            showAllNotesCheckbox.checked = false;
            Fretboard.setShowAll(false);
            lesson.fretboard.setup(Fretboard);
            Fretboard.render(fretboardEl);
        } else {
            fretboardContainer.classList.add('hidden');
        }

        // Quiz / Training
        if (lesson.id === 'ear-training') {
            quizContainer.classList.remove('hidden');
            Quiz.renderEarTraining(quizContainer);
        } else if (lesson.id === 'chord-training') {
            quizContainer.classList.remove('hidden');
            Quiz.renderChordTraining(quizContainer);
        } else if (lesson.id === 'scale-training') {
            quizContainer.classList.remove('hidden');
            Quiz.renderScaleTraining(quizContainer);
        } else if (lesson.id === 'arpeggio-training') {
            quizContainer.classList.remove('hidden');
            Quiz.renderArpeggioTraining(quizContainer);
        } else if (lesson.quiz && lesson.quiz.length > 0) {
            quizContainer.classList.remove('hidden');
            Quiz.render(quizContainer, lesson.quiz, (score, total) => {
                if (score / total >= 0.6) markComplete(lesson.id);
            });
        } else {
            quizContainer.classList.add('hidden');
        }

        // Navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === LESSONS.length - 1;

        // Update sidebar
        updateSidebarStates();
        saveProgress();

        // Scroll to top
        document.getElementById('content').scrollTo(0, 0);
    }

    // Toast
    function showToast(message, type = '') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.getElementById('toast-container').appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => navigateTo(currentLessonIndex - 1));
    nextBtn.addEventListener('click', () => navigateTo(currentLessonIndex + 1));

    clearFretboardBtn.addEventListener('click', () => {
        Fretboard.clear();
        Fretboard.render(fretboardEl);
    });

    showAllNotesCheckbox.addEventListener('change', (e) => {
        Fretboard.setShowAll(e.target.checked);
        const lesson = LESSONS[currentLessonIndex];
        if (lesson.fretboard) lesson.fretboard.setup(Fretboard);
        Fretboard.render(fretboardEl);
    });

    // Initialize
    loadProgress();
    buildSidebar();
    if (currentLessonIndex >= LESSONS.length) currentLessonIndex = 0;
    navigateTo(currentLessonIndex);
    updateProgressBar();
});
