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

    // ========== Chord Identification Training ==========
    function renderChordTraining(container) {
        const CHORD_TYPES = [
            { name: 'Major', intervals: [0, 4, 7], symbol: '' },
            { name: 'Minor', intervals: [0, 3, 7], symbol: 'm' },
            { name: 'Dominant 7th', intervals: [0, 4, 7, 10], symbol: '7' },
            { name: 'Major 7th', intervals: [0, 4, 7, 11], symbol: 'maj7' },
            { name: 'Minor 7th', intervals: [0, 3, 7, 10], symbol: 'm7' },
            { name: 'Diminished', intervals: [0, 3, 6], symbol: 'dim' },
            { name: 'Augmented', intervals: [0, 4, 8], symbol: 'aug' },
            { name: 'Sus2', intervals: [0, 2, 7], symbol: 'sus2' },
            { name: 'Sus4', intervals: [0, 5, 7], symbol: 'sus4' },
            { name: 'Power Chord', intervals: [0, 7], symbol: '5' }
        ];
        const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        let score = 0, total = 0, currentChord = null, answered = false;

        function pickRandom() {
            const type = CHORD_TYPES[Math.floor(Math.random() * CHORD_TYPES.length)];
            const rootIdx = Math.floor(Math.random() * 12);
            const rootName = NOTE_NAMES[rootIdx];
            const octave = 3;
            const notes = type.intervals.map(s => {
                const idx = (rootIdx + s) % 12;
                const o = octave + Math.floor((rootIdx + s) / 12);
                return NOTE_NAMES[idx] + o;
            });
            return { type, rootName, notes, display: rootName + type.symbol };
        }

        function renderUI() {
            container.classList.remove('hidden');
            container.innerHTML = `
                <div class="quiz-header">
                    <h3>Chord Identification</h3>
                    <span class="quiz-score">Score: ${score} / ${total}</span>
                </div>
                <div class="ear-training-area">
                    <p class="text-muted">Listen to the chord and identify its type</p>
                    <div>
                        <button class="btn btn-accent" id="play-chord-btn">Play Chord</button>
                        <button class="btn btn-sm" id="replay-chord-btn" style="display:none">Replay</button>
                    </div>
                    <div class="interval-buttons">
                        ${CHORD_TYPES.map(ct => `<button class="play-btn chord-guess" data-name="${ct.name}">${ct.name}</button>`).join('')}
                    </div>
                    <div class="quiz-explanation" id="chord-feedback"></div>
                </div>
            `;

            document.getElementById('play-chord-btn').addEventListener('click', () => {
                currentChord = pickRandom();
                answered = false;
                AudioEngine.playChord(currentChord.notes, 1.8);
                document.getElementById('replay-chord-btn').style.display = 'inline-block';
                document.getElementById('chord-feedback').className = 'quiz-explanation';
                container.querySelectorAll('.chord-guess').forEach(b => {
                    b.classList.remove('correct', 'incorrect', 'disabled');
                });
            });

            document.getElementById('replay-chord-btn').addEventListener('click', () => {
                if (currentChord) AudioEngine.playChord(currentChord.notes, 1.8);
            });

            container.querySelectorAll('.chord-guess').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (!currentChord || answered) return;
                    answered = true;
                    total++;
                    const chosen = btn.dataset.name;
                    const correct = chosen === currentChord.type.name;
                    if (correct) score++;

                    container.querySelectorAll('.chord-guess').forEach(b => {
                        b.classList.add('disabled');
                        if (b.dataset.name === currentChord.type.name) b.classList.add('correct');
                        if (b === btn && !correct) b.classList.add('incorrect');
                    });

                    const fb = document.getElementById('chord-feedback');
                    fb.className = `quiz-explanation show ${correct ? 'correct' : 'incorrect'}`;
                    fb.innerHTML = correct
                        ? `<strong>Correct!</strong> That was ${currentChord.display} (${currentChord.type.name}).`
                        : `<strong>That was ${currentChord.display} (${currentChord.type.name}).</strong> Listen for the quality next time!`;
                    container.querySelector('.quiz-score').textContent = `Score: ${score} / ${total}`;
                });
            });
        }
        renderUI();
    }

    // ========== Scale Practice Training ==========
    function renderScaleTraining(container) {
        const SCALES = [
            { name: 'Major', intervals: [0,2,4,5,7,9,11] },
            { name: 'Natural Minor', intervals: [0,2,3,5,7,8,10] },
            { name: 'Minor Pentatonic', intervals: [0,3,5,7,10] },
            { name: 'Major Pentatonic', intervals: [0,2,4,7,9] },
            { name: 'Blues', intervals: [0,3,5,6,7,10] },
            { name: 'Dorian', intervals: [0,2,3,5,7,9,10] },
            { name: 'Mixolydian', intervals: [0,2,4,5,7,9,10] },
            { name: 'Phrygian', intervals: [0,1,3,5,7,8,10] }
        ];
        const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        let score = 0, total = 0, currentScale = null, answered = false;

        function pickRandom() {
            const scale = SCALES[Math.floor(Math.random() * SCALES.length)];
            const rootIdx = Math.floor(Math.random() * 7); // keep in lower range for clarity
            const rootName = NOTE_NAMES[rootIdx];
            const octave = 3;
            const notes = scale.intervals.map(s => {
                const idx = (rootIdx + s) % 12;
                const o = octave + Math.floor((rootIdx + s) / 12);
                return NOTE_NAMES[idx] + o;
            });
            // Add the octave
            notes.push(rootName + (octave + 1));
            return { scale, rootName, notes };
        }

        function renderUI() {
            container.classList.remove('hidden');
            container.innerHTML = `
                <div class="quiz-header">
                    <h3>Scale Identification</h3>
                    <span class="quiz-score">Score: ${score} / ${total}</span>
                </div>
                <div class="ear-training-area">
                    <p class="text-muted">Listen to the scale and identify its type</p>
                    <div>
                        <button class="btn btn-accent" id="play-scale-btn">Play Scale</button>
                        <button class="btn btn-sm" id="replay-scale-btn" style="display:none">Replay</button>
                    </div>
                    <div class="interval-buttons">
                        ${SCALES.map(s => `<button class="play-btn scale-guess" data-name="${s.name}">${s.name}</button>`).join('')}
                    </div>
                    <div class="quiz-explanation" id="scale-feedback"></div>
                </div>
            `;

            document.getElementById('play-scale-btn').addEventListener('click', () => {
                currentScale = pickRandom();
                answered = false;
                AudioEngine.playSequence(currentScale.notes, 0.3, 0.45);
                document.getElementById('replay-scale-btn').style.display = 'inline-block';
                document.getElementById('scale-feedback').className = 'quiz-explanation';
                container.querySelectorAll('.scale-guess').forEach(b => {
                    b.classList.remove('correct', 'incorrect', 'disabled');
                });
            });

            document.getElementById('replay-scale-btn').addEventListener('click', () => {
                if (currentScale) AudioEngine.playSequence(currentScale.notes, 0.3, 0.45);
            });

            container.querySelectorAll('.scale-guess').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (!currentScale || answered) return;
                    answered = true;
                    total++;
                    const chosen = btn.dataset.name;
                    const correct = chosen === currentScale.scale.name;
                    if (correct) score++;

                    container.querySelectorAll('.scale-guess').forEach(b => {
                        b.classList.add('disabled');
                        if (b.dataset.name === currentScale.scale.name) b.classList.add('correct');
                        if (b === btn && !correct) b.classList.add('incorrect');
                    });

                    const fb = document.getElementById('scale-feedback');
                    fb.className = `quiz-explanation show ${correct ? 'correct' : 'incorrect'}`;
                    fb.innerHTML = correct
                        ? `<strong>Correct!</strong> That was the ${currentScale.rootName} ${currentScale.scale.name} scale.`
                        : `<strong>That was the ${currentScale.rootName} ${currentScale.scale.name} scale.</strong> Try to hear the unique intervals!`;
                    container.querySelector('.quiz-score').textContent = `Score: ${score} / ${total}`;
                });
            });
        }
        renderUI();
    }

    // ========== Arpeggio Training ==========
    function renderArpeggioTraining(container) {
        const ARPEGGIOS = [
            { name: 'Major', intervals: [0, 4, 7, 12], desc: '1-3-5' },
            { name: 'Minor', intervals: [0, 3, 7, 12], desc: '1-b3-5' },
            { name: 'Dominant 7th', intervals: [0, 4, 7, 10, 12], desc: '1-3-5-b7' },
            { name: 'Major 7th', intervals: [0, 4, 7, 11, 12], desc: '1-3-5-7' },
            { name: 'Minor 7th', intervals: [0, 3, 7, 10, 12], desc: '1-b3-5-b7' },
            { name: 'Diminished', intervals: [0, 3, 6, 12], desc: '1-b3-b5' },
            { name: 'Augmented', intervals: [0, 4, 8, 12], desc: '1-3-#5' },
            { name: 'Minor-Major 7th', intervals: [0, 3, 7, 11, 12], desc: '1-b3-5-7' }
        ];
        const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        let score = 0, total = 0, currentArp = null, answered = false;

        function pickRandom() {
            const arp = ARPEGGIOS[Math.floor(Math.random() * ARPEGGIOS.length)];
            const rootIdx = Math.floor(Math.random() * 12);
            const rootName = NOTE_NAMES[rootIdx];
            const octave = 3;
            const notes = arp.intervals.map(s => {
                const idx = (rootIdx + s) % 12;
                const o = octave + Math.floor((rootIdx + s) / 12);
                return NOTE_NAMES[idx] + o;
            });
            return { arp, rootName, notes };
        }

        function renderUI() {
            container.classList.remove('hidden');
            container.innerHTML = `
                <div class="quiz-header">
                    <h3>Arpeggio Training</h3>
                    <span class="quiz-score">Score: ${score} / ${total}</span>
                </div>
                <div class="ear-training-area">
                    <p class="text-muted">Listen to the arpeggio (broken chord) and identify its type</p>
                    <div>
                        <button class="btn btn-accent" id="play-arp-btn">Play Arpeggio</button>
                        <button class="btn btn-sm" id="replay-arp-btn" style="display:none">Replay</button>
                    </div>
                    <div class="interval-buttons">
                        ${ARPEGGIOS.map(a => `<button class="play-btn arp-guess" data-name="${a.name}">${a.name}<br><small style="opacity:0.7">${a.desc}</small></button>`).join('')}
                    </div>
                    <div class="quiz-explanation" id="arp-feedback"></div>
                </div>
            `;

            document.getElementById('play-arp-btn').addEventListener('click', () => {
                currentArp = pickRandom();
                answered = false;
                AudioEngine.playSequence(currentArp.notes, 0.35, 0.5);
                document.getElementById('replay-arp-btn').style.display = 'inline-block';
                document.getElementById('arp-feedback').className = 'quiz-explanation';
                container.querySelectorAll('.arp-guess').forEach(b => {
                    b.classList.remove('correct', 'incorrect', 'disabled');
                });
            });

            document.getElementById('replay-arp-btn').addEventListener('click', () => {
                if (currentArp) AudioEngine.playSequence(currentArp.notes, 0.35, 0.5);
            });

            container.querySelectorAll('.arp-guess').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (!currentArp || answered) return;
                    answered = true;
                    total++;
                    const chosen = btn.dataset.name;
                    const correct = chosen === currentArp.arp.name;
                    if (correct) score++;

                    container.querySelectorAll('.arp-guess').forEach(b => {
                        b.classList.add('disabled');
                        if (b.dataset.name === currentArp.arp.name) b.classList.add('correct');
                        if (b === btn && !correct) b.classList.add('incorrect');
                    });

                    const fb = document.getElementById('arp-feedback');
                    fb.className = `quiz-explanation show ${correct ? 'correct' : 'incorrect'}`;
                    fb.innerHTML = correct
                        ? `<strong>Correct!</strong> That was a ${currentArp.rootName} ${currentArp.arp.name} arpeggio (${currentArp.arp.desc}).`
                        : `<strong>That was a ${currentArp.rootName} ${currentArp.arp.name} arpeggio (${currentArp.arp.desc}).</strong> Listen for the chord quality played note by note!`;
                    container.querySelector('.quiz-score').textContent = `Score: ${score} / ${total}`;
                });
            });
        }
        renderUI();
    }

    return { render, renderEarTraining, renderChordTraining, renderScaleTraining, renderArpeggioTraining };
})();
