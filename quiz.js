const Quiz = (() => {
    function render(container, questions, onComplete) {
        let currentQ = 0;
        let score = 0;

        function showQuestion() {
            if (currentQ >= questions.length) {
                showResults();
                return;
            }
            const q = questions[currentQ];
            container.classList.remove('hidden');
            container.innerHTML = `
                <div class="quiz-header">
                    <h3>Quiz</h3>
                    <span class="quiz-score">Question ${currentQ + 1} of ${questions.length}</span>
                </div>
                <div class="quiz-question">
                    <p>${q.question}</p>
                    <div class="quiz-options">
                        ${q.options.map((opt, i) => `<button class="quiz-option" data-index="${i}">${opt}</button>`).join('')}
                    </div>
                    <div class="quiz-explanation"></div>
                </div>
            `;

            container.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('click', () => handleAnswer(btn, q));
            });
        }

        function handleAnswer(btn, q) {
            const chosen = parseInt(btn.dataset.index);
            const correct = chosen === q.correct;
            if (correct) score++;

            container.querySelectorAll('.quiz-option').forEach((b, i) => {
                b.classList.add('disabled');
                if (i === q.correct) b.classList.add('correct');
                if (i === chosen && !correct) b.classList.add('incorrect');
            });

            const expl = container.querySelector('.quiz-explanation');
            expl.className = `quiz-explanation show ${correct ? 'correct' : 'incorrect'}`;
            expl.innerHTML = `<strong>${correct ? 'Correct!' : 'Not quite.'}</strong> ${q.explanation}`;

            const nextBtn = document.createElement('button');
            nextBtn.className = 'btn btn-primary quiz-next-btn';
            nextBtn.textContent = currentQ < questions.length - 1 ? 'Next Question' : 'See Results';
            nextBtn.addEventListener('click', () => { currentQ++; showQuestion(); });
            container.querySelector('.quiz-question').appendChild(nextBtn);
        }

        function showResults() {
            const pct = Math.round((score / questions.length) * 100);
            const grade = pct >= 80 ? 'great' : pct >= 50 ? 'ok' : 'needs-work';
            const msgs = {
                great: "Excellent work! You've mastered this topic!",
                ok: "Good effort! Review the lesson and try again to solidify your knowledge.",
                'needs-work': "Keep learning! Re-read the lesson and give it another shot."
            };
            container.innerHTML = `
                <div class="quiz-results">
                    <h3>Quiz Complete!</h3>
                    <div class="score-display ${grade}">${pct}%</div>
                    <p>${score} out of ${questions.length} correct</p>
                    <p>${msgs[grade]}</p>
                    <button class="btn btn-primary" id="quiz-retry">Try Again</button>
                </div>
            `;
            container.querySelector('#quiz-retry').addEventListener('click', () => {
                currentQ = 0; score = 0; showQuestion();
            });
            if (onComplete) onComplete(score, questions.length);
        }

        showQuestion();
    }

    function renderEarTraining(container) {
        const INTERVALS = [
            { name: 'Minor 2nd', semitones: 1 },
            { name: 'Major 2nd', semitones: 2 },
            { name: 'Minor 3rd', semitones: 3 },
            { name: 'Major 3rd', semitones: 4 },
            { name: 'Perfect 4th', semitones: 5 },
            { name: 'Tritone', semitones: 6 },
            { name: 'Perfect 5th', semitones: 7 },
            { name: 'Minor 6th', semitones: 8 },
            { name: 'Major 6th', semitones: 9 },
            { name: 'Minor 7th', semitones: 10 },
            { name: 'Major 7th', semitones: 11 },
            { name: 'Octave', semitones: 12 }
        ];

        const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        let score = 0, total = 0, currentInterval = null, answered = false;

        function pickRandom() {
            const idx = Math.floor(Math.random() * INTERVALS.length);
            const baseNoteIdx = Math.floor(Math.random() * 12);
            const baseOctave = 3;
            const baseName = NOTE_NAMES[baseNoteIdx];
            const topIdx = (baseNoteIdx + INTERVALS[idx].semitones) % 12;
            const topOctave = baseOctave + Math.floor((baseNoteIdx + INTERVALS[idx].semitones) / 12);
            const topName = NOTE_NAMES[topIdx];
            return {
                interval: INTERVALS[idx],
                base: baseName + baseOctave,
                top: topName + topOctave
            };
        }

        function renderUI() {
            container.classList.remove('hidden');
            container.innerHTML = `
                <div class="quiz-header">
                    <h3>Ear Training</h3>
                    <span class="quiz-score">Score: ${score} / ${total}</span>
                </div>
                <div class="ear-training-area">
                    <button class="btn btn-accent" id="play-interval-btn">Play Interval</button>
                    <button class="btn btn-sm" id="replay-btn" style="display:none">Replay</button>
                    <div class="interval-buttons">
                        ${INTERVALS.map(iv => `<button class="play-btn interval-guess" data-semitones="${iv.semitones}">${iv.name}</button>`).join('')}
                    </div>
                    <div class="quiz-explanation" id="ear-feedback"></div>
                </div>
            `;

            document.getElementById('play-interval-btn').addEventListener('click', () => {
                currentInterval = pickRandom();
                answered = false;
                AudioEngine.playInterval(currentInterval.base, currentInterval.top);
                document.getElementById('replay-btn').style.display = 'inline-block';
                document.getElementById('ear-feedback').className = 'quiz-explanation';
                container.querySelectorAll('.interval-guess').forEach(b => {
                    b.classList.remove('correct', 'incorrect', 'disabled');
                });
            });

            document.getElementById('replay-btn').addEventListener('click', () => {
                if (currentInterval) AudioEngine.playInterval(currentInterval.base, currentInterval.top);
            });

            container.querySelectorAll('.interval-guess').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (!currentInterval || answered) return;
                    answered = true;
                    total++;
                    const chosen = parseInt(btn.dataset.semitones);
                    const correct = chosen === currentInterval.interval.semitones;
                    if (correct) score++;

                    container.querySelectorAll('.interval-guess').forEach(b => {
                        b.classList.add('disabled');
                        if (parseInt(b.dataset.semitones) === currentInterval.interval.semitones) b.classList.add('correct');
                        if (b === btn && !correct) b.classList.add('incorrect');
                    });

                    const fb = document.getElementById('ear-feedback');
                    fb.className = `quiz-explanation show ${correct ? 'correct' : 'incorrect'}`;
                    fb.innerHTML = correct
                        ? `<strong>Correct!</strong> That was a ${currentInterval.interval.name}.`
                        : `<strong>That was a ${currentInterval.interval.name}.</strong> Keep practicing!`;

                    container.querySelector('.quiz-score').textContent = `Score: ${score} / ${total}`;
                });
            });
        }

        renderUI();
    }

    return { render, renderEarTraining };
})();
