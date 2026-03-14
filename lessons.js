const LESSONS = [
    // ==================== SECTION: THE BASICS ====================
    {
        id: 'what-is-music',
        title: 'What is Music?',
        section: 'The Basics',
        subtitle: 'Sound, pitch, and rhythm — the foundations of everything',
        content: () => `
            <h2>What is Music?</h2>
            <p class="subtitle">Sound, pitch, and rhythm — the foundations of everything</p>

            <p>Before we touch a single string, let's understand what music actually <em>is</em>. Don't worry — this isn't a physics lecture. We'll keep it simple and fun.</p>

            <h3>Sound is Vibration</h3>
            <p>Everything you hear is caused by something vibrating. When you pluck a guitar string, it vibrates back and forth incredibly fast. These vibrations travel through the air as invisible waves and hit your eardrums. Your brain interprets those waves as sound.</p>

            <div class="concept-box">
                <h4>Key Concept: Pitch</h4>
                <p><strong>Pitch</strong> is how "high" or "low" a sound is. It's determined by how fast something vibrates:</p>
                <ul>
                    <li><strong>Fast vibrations</strong> = high pitch (like a bird chirping)</li>
                    <li><strong>Slow vibrations</strong> = low pitch (like thunder rumbling)</li>
                </ul>
                <p>We measure vibrations in <strong>Hertz (Hz)</strong> — the number of vibrations per second. The note A above middle C vibrates at exactly 440 Hz.</p>
            </div>

            <p>Try hearing the difference:</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playNote('E2', 1.5)">Low E (82 Hz)</button>
                <button class="play-btn" onclick="AudioEngine.playNote('E4', 1.5)">High E (330 Hz)</button>
            </p>

            <h3>What Makes Music Different from Noise?</h3>
            <p>Noise is random — like a car horn or a door slamming. Music is <strong>organized sound</strong>. It has three key ingredients:</p>

            <div class="concept-box">
                <h4>The Three Ingredients of Music</h4>
                <ul>
                    <li><strong>Melody</strong> — A sequence of notes played one after another (the part you hum or sing along to)</li>
                    <li><strong>Harmony</strong> — Multiple notes played at the same time (chords that support the melody)</li>
                    <li><strong>Rhythm</strong> — The pattern of when notes happen in time (the beat that makes you tap your foot)</li>
                </ul>
            </div>

            <p>Listen to a simple melody vs. a chord:</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playSequence(['C3','E3','G3','C4'], 0.4, 0.6)">Melody (notes in sequence)</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3','C4'], 1.5)">Harmony (notes together)</button>
            </p>

            <div class="concept-box tip-box">
                <h4>Why This Matters for Guitar</h4>
                <p>Guitar is one of the few instruments that can do <em>all three</em> at once — play melodies, strum chords for harmony, and keep rhythm. That's what makes it so versatile and popular!</p>
            </div>

            <h3>The Musical Alphabet</h3>
            <p>Here's the good news: music only uses <strong>12 unique notes</strong>. That's it! These 12 notes repeat over and over, just at higher or lower pitches. We'll learn all about them in the next few lessons.</p>
            <p>Think of it like a clock with 12 hours — after 12, you start back at 1, but it's a new cycle.</p>
        `,
        quiz: [
            { question: 'What causes sound?', options: ['Light waves', 'Vibrations traveling through the air', 'Electricity', 'Magnets'], correct: 1, explanation: 'Sound is caused by vibrations. When something vibrates (like a guitar string), it creates waves in the air that our ears detect.' },
            { question: 'What determines how high or low a sound is?', options: ['Volume', 'Duration', 'Pitch (speed of vibration)', 'Rhythm'], correct: 2, explanation: 'Pitch is determined by the speed of vibration. Faster vibrations = higher pitch, slower vibrations = lower pitch.' },
            { question: 'How many unique notes does music use?', options: ['7', '10', '12', '26'], correct: 2, explanation: 'Music uses 12 unique notes. These 12 notes repeat in higher and lower octaves, but there are only 12 distinct pitches.' },
            { question: 'What is harmony?', options: ['Notes played one after another', 'Multiple notes played at the same time', 'The speed of the music', 'How loud the music is'], correct: 1, explanation: 'Harmony is multiple notes sounding at the same time — like when you strum a chord on a guitar.' }
        ]
    },
    {
        id: 'meet-your-guitar',
        title: 'Meet Your Guitar',
        section: 'The Basics',
        subtitle: 'The 6 strings, standard tuning, and how frets work',
        content: () => `
            <h2>Meet Your Guitar</h2>
            <p class="subtitle">The 6 strings, standard tuning, and how frets work</p>

            <p>Let's get to know your instrument! Whether you have an acoustic or electric guitar, the fundamentals are the same.</p>

            <h3>The 6 Strings</h3>
            <p>Your guitar has 6 strings. We number them from thinnest to thickest:</p>

            <table class="note-table">
                <tr><th>String #</th><th>Note</th><th>Nickname</th><th>Listen</th></tr>
                <tr><td>1st (thinnest)</td><td>E</td><td>High E</td><td><button class="play-btn" onclick="AudioEngine.playNote('E4')">Play</button></td></tr>
                <tr><td>2nd</td><td>B</td><td></td><td><button class="play-btn" onclick="AudioEngine.playNote('B3')">Play</button></td></tr>
                <tr><td>3rd</td><td>G</td><td></td><td><button class="play-btn" onclick="AudioEngine.playNote('G3')">Play</button></td></tr>
                <tr><td>4th</td><td>D</td><td></td><td><button class="play-btn" onclick="AudioEngine.playNote('D3')">Play</button></td></tr>
                <tr><td>5th</td><td>A</td><td></td><td><button class="play-btn" onclick="AudioEngine.playNote('A2')">Play</button></td></tr>
                <tr><td>6th (thickest)</td><td>E</td><td>Low E</td><td><button class="play-btn" onclick="AudioEngine.playNote('E2')">Play</button></td></tr>
            </table>

            <button class="play-btn" onclick="AudioEngine.playSequence(['E2','A2','D3','G3','B3','E4'], 0.5, 0.8)">Play all strings (low to high)</button>

            <div class="concept-box">
                <h4>Remembering the String Names: EADGBE</h4>
                <p>From thickest to thinnest: <strong>E - A - D - G - B - E</strong></p>
                <p>Common mnemonics:</p>
                <ul>
                    <li><strong>E</strong>very <strong>A</strong>mateur <strong>D</strong>oes <strong>G</strong>et <strong>B</strong>etter <strong>E</strong>ventually</li>
                    <li><strong>E</strong>ddie <strong>A</strong>te <strong>D</strong>ynamite, <strong>G</strong>ood <strong>B</strong>ye <strong>E</strong>ddie</li>
                </ul>
            </div>

            <h3>How Frets Work</h3>
            <p>The metal strips running across the neck of your guitar are called <strong>frets</strong>. When you press a string down behind a fret, you shorten the vibrating length of the string, making the pitch higher.</p>

            <div class="concept-box">
                <h4>The Magic Rule of Frets</h4>
                <p>Each fret raises the pitch by exactly <strong>one semitone</strong> (the smallest step in Western music). This is incredibly important:</p>
                <ul>
                    <li>Fret 0 (open string) = the string's natural note</li>
                    <li>Fret 1 = one semitone higher</li>
                    <li>Fret 2 = two semitones higher</li>
                    <li>Fret 12 = twelve semitones higher = the same note, one octave up!</li>
                </ul>
            </div>

            <p>Try it! Here's the 6th string (low E) at different frets:</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playNote('E2')">Open (E)</button>
                <button class="play-btn" onclick="AudioEngine.playNote('F2')">Fret 1 (F)</button>
                <button class="play-btn" onclick="AudioEngine.playNote('G2')">Fret 3 (G)</button>
                <button class="play-btn" onclick="AudioEngine.playNote('A2')">Fret 5 (A)</button>
                <button class="play-btn" onclick="AudioEngine.playNote('E3')">Fret 12 (E again!)</button>
            </p>

            <div class="concept-box tip-box">
                <h4>Those Dots on the Neck</h4>
                <p>Most guitars have dot markers at frets 3, 5, 7, 9, and 12 (double dot). These help you quickly find your position on the neck. Fret 12 is special — it's exactly halfway along the string, and every note there is one octave higher than the open string.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => { fb.clear(); }
        },
        quiz: [
            { question: 'How many strings does a standard guitar have?', options: ['4', '5', '6', '8'], correct: 2, explanation: 'A standard guitar has 6 strings, tuned E-A-D-G-B-E from thickest to thinnest.' },
            { question: 'What note is the thickest (6th) string tuned to?', options: ['A', 'D', 'G', 'E'], correct: 3, explanation: 'The 6th string (thickest) is tuned to low E. The 1st string (thinnest) is also E, but two octaves higher.' },
            { question: 'What happens when you press a string at fret 1?', options: ['The pitch goes down by one semitone', 'The pitch goes up by one semitone', 'The pitch goes up by one octave', 'Nothing changes'], correct: 1, explanation: 'Each fret raises the pitch by exactly one semitone — the smallest step in Western music.' },
            { question: 'What is special about fret 12?', options: ['It is the last fret', 'The note is one octave higher than the open string', 'It makes the string silent', 'It changes the tuning'], correct: 1, explanation: 'Fret 12 is exactly halfway along the string. The note there is the same as the open string, but one octave (12 semitones) higher.' }
        ]
    },
    {
        id: 'musical-notes',
        title: 'Musical Notes',
        section: 'The Basics',
        subtitle: 'The 12 notes that make up all of Western music',
        content: () => `
            <h2>Musical Notes</h2>
            <p class="subtitle">The 12 notes that make up all of Western music</p>

            <p>Every song you've ever heard — from Beethoven to Beyoncé — is built from just <strong>12 notes</strong>. Let's meet them all.</p>

            <h3>The Musical Alphabet</h3>
            <p>Music uses the first 7 letters of the alphabet: <strong>A B C D E F G</strong>. After G, it starts over at A. These 7 letters are called the <strong>natural notes</strong>.</p>

            <h3>Sharps and Flats</h3>
            <p>Between most natural notes, there's an extra note. These are called <strong>sharps (#)</strong> and <strong>flats (b)</strong>:</p>
            <ul>
                <li><strong>Sharp (#)</strong> means "one semitone higher" — C# is one semitone above C</li>
                <li><strong>Flat (b)</strong> means "one semitone lower" — Db is one semitone below D</li>
                <li>C# and Db are actually the <em>same pitch</em>! They're just two names for the same note.</li>
            </ul>

            <div class="concept-box">
                <h4>All 12 Notes in Order</h4>
                <p>Starting from C and going up by semitone:</p>
            </div>

            <table class="note-table">
                <tr><th>#</th><th>Note</th><th>Listen</th></tr>
                <tr><td>1</td><td>C</td><td><button class="play-btn" onclick="AudioEngine.playNote('C3')">Play</button></td></tr>
                <tr><td>2</td><td>C# / Db</td><td><button class="play-btn" onclick="AudioEngine.playNote('C#3')">Play</button></td></tr>
                <tr><td>3</td><td>D</td><td><button class="play-btn" onclick="AudioEngine.playNote('D3')">Play</button></td></tr>
                <tr><td>4</td><td>D# / Eb</td><td><button class="play-btn" onclick="AudioEngine.playNote('D#3')">Play</button></td></tr>
                <tr><td>5</td><td>E</td><td><button class="play-btn" onclick="AudioEngine.playNote('E3')">Play</button></td></tr>
                <tr><td>6</td><td>F</td><td><button class="play-btn" onclick="AudioEngine.playNote('F3')">Play</button></td></tr>
                <tr><td>7</td><td>F# / Gb</td><td><button class="play-btn" onclick="AudioEngine.playNote('F#3')">Play</button></td></tr>
                <tr><td>8</td><td>G</td><td><button class="play-btn" onclick="AudioEngine.playNote('G3')">Play</button></td></tr>
                <tr><td>9</td><td>G# / Ab</td><td><button class="play-btn" onclick="AudioEngine.playNote('G#3')">Play</button></td></tr>
                <tr><td>10</td><td>A</td><td><button class="play-btn" onclick="AudioEngine.playNote('A3')">Play</button></td></tr>
                <tr><td>11</td><td>A# / Bb</td><td><button class="play-btn" onclick="AudioEngine.playNote('A#3')">Play</button></td></tr>
                <tr><td>12</td><td>B</td><td><button class="play-btn" onclick="AudioEngine.playNote('B3')">Play</button></td></tr>
            </table>

            <button class="play-btn" onclick="AudioEngine.playSequence(['C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3','C4'], 0.3, 0.4)">Play all 12 notes (chromatic scale)</button>

            <div class="concept-box warning-box">
                <h4>Important: The Two Missing Sharps</h4>
                <p>Notice that there is <strong>no sharp between E and F</strong>, and <strong>no sharp between B and C</strong>. These pairs are already one semitone apart naturally. This is a quirk of the musical system that you just need to memorize:</p>
                <ul>
                    <li>E to F = 1 semitone (no E#)</li>
                    <li>B to C = 1 semitone (no B#)</li>
                    <li>All other natural notes are 2 semitones apart</li>
                </ul>
            </div>

            <h3>Octaves</h3>
            <p>After you've gone through all 12 notes, you arrive back at the same note name, but it sounds higher. This cycle is called an <strong>octave</strong>.</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playNote('A2')">A (low)</button>
                <button class="play-btn" onclick="AudioEngine.playNote('A3')">A (middle)</button>
                <button class="play-btn" onclick="AudioEngine.playNote('A4')">A (high)</button>
            </p>
            <p>These are all "A" — they sound like the same note, just at different heights. Your ear naturally recognizes them as the same note.</p>

            <div class="concept-box tip-box">
                <h4>Think of It Like a Spiral Staircase</h4>
                <p>The 12 notes are like positions on a clock face. An octave is one full turn around the clock. You end up in the same position (same note), but you've gone up one level (higher pitch).</p>
            </div>
        `,
        quiz: [
            { question: 'How many unique notes are there in Western music?', options: ['7', '10', '12', '14'], correct: 2, explanation: 'There are 12 unique notes: A, A#, B, C, C#, D, D#, E, F, F#, G, G#. After that, they repeat in higher/lower octaves.' },
            { question: 'What does a sharp (#) do to a note?', options: ['Makes it louder', 'Raises it by one semitone', 'Lowers it by one semitone', 'Makes it longer'], correct: 1, explanation: 'A sharp raises a note by one semitone — the smallest step in music. C# is one semitone higher than C.' },
            { question: 'Which pair of natural notes has NO sharp between them?', options: ['A and B', 'C and D', 'E and F', 'G and A'], correct: 2, explanation: 'E to F is naturally one semitone apart (no E# needed). The same is true for B to C. All other adjacent natural notes are two semitones apart.' },
            { question: 'What is an octave?', options: ['A group of 8 notes', 'The distance of 12 semitones where the note name repeats', 'A type of chord', 'The 8th fret'], correct: 1, explanation: 'An octave is the distance of 12 semitones. The note name repeats, but at a higher or lower pitch.' }
        ]
    },
    {
        id: 'reading-fretboard',
        title: 'Reading the Fretboard',
        section: 'The Basics',
        subtitle: 'How notes are laid out on the guitar neck',
        content: () => `
            <h2>Reading the Fretboard</h2>
            <p class="subtitle">How notes are laid out on the guitar neck</p>

            <p>Now that you know the 12 notes, let's see where they live on your guitar. Toggle "Show all notes" below to see every note on the fretboard!</p>

            <div class="concept-box">
                <h4>How Notes are Arranged</h4>
                <p>Each string starts at its open note and goes up by one semitone per fret:</p>
                <ul>
                    <li>6th string: E, F, F#, G, G#, A, A#, B, C, C#, D, D#, E (fret 12)...</li>
                    <li>5th string: A, A#, B, C, C#, D, D#, E, F, F#, G, G#, A (fret 12)...</li>
                    <li>And so on for each string</li>
                </ul>
            </div>

            <h3>Finding Any Note</h3>
            <p>To find any note on any string, just count up from the open string note, one semitone per fret. For example, to find C on the 5th string (A):</p>
            <p>A (open) → A# (fret 1) → B (fret 2) → <strong>C (fret 3)</strong></p>

            <div class="concept-box tip-box">
                <h4>Pro Tip: Learn the Landmark Frets</h4>
                <p>Start by memorizing the notes at frets 3, 5, 7, and 12 (where the dot markers are). This gives you anchor points to quickly find any note nearby.</p>
            </div>

            <h3>The Octave Pattern</h3>
            <p>Remember: fret 12 always gives you the same note as the open string, one octave higher. So the pattern from frets 12-24 is identical to frets 0-12.</p>

            <div class="concept-box">
                <h4>Same Note, Different Places</h4>
                <p>Unlike a piano where each note exists in only one place, on guitar the same note can be played at many different positions! For example, the note A can be played at:</p>
                <ul>
                    <li>5th string, open</li>
                    <li>6th string, fret 5</li>
                    <li>4th string, fret 7</li>
                    <li>3rd string, fret 2 (as A, one octave higher)</li>
                </ul>
                <p>This is both a challenge and a superpower of the guitar.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.clear();
                fb.setShowAll(true);
            }
        },
        quiz: [
            { question: 'On the 6th string (E), what note is at fret 5?', options: ['G', 'A', 'B', 'D'], correct: 1, explanation: 'Counting up from E: E(0), F(1), F#(2), G(3), G#(4), A(5). The note at fret 5 on the 6th string is A.' },
            { question: 'On the 5th string (A), what note is at fret 3?', options: ['B', 'C', 'C#', 'D'], correct: 1, explanation: 'Counting up from A: A(0), A#(1), B(2), C(3). The note at fret 3 on the 5th string is C.' },
            { question: 'Can the same note be played at different positions on the guitar?', options: ['No, each note is in one place only', 'Yes, the same note appears in many positions', 'Only on electric guitars', 'Only for open strings'], correct: 1, explanation: 'Unlike a piano, the same note can be played at multiple positions on different strings. This is a unique feature of the guitar.' }
        ]
    },
    // ==================== SECTION: BUILDING BLOCKS ====================
    {
        id: 'intervals',
        title: 'Intervals',
        section: 'Building Blocks',
        subtitle: 'The distance between any two notes — the DNA of music',
        content: () => `
            <h2>Intervals</h2>
            <p class="subtitle">The distance between any two notes — the DNA of music</p>

            <p>An <strong>interval</strong> is simply the distance between two notes, measured in semitones (frets). This is arguably the most important concept in all of music theory. Everything else — scales, chords, harmony — is built from intervals.</p>

            <h3>Why Intervals Matter</h3>
            <p>Think of intervals like the building blocks of a house. You can't understand the house (a chord or a scale) without understanding the blocks (intervals) it's made of. Once you know intervals, everything else clicks into place.</p>

            <div class="concept-box">
                <h4>Every Interval Has a Name</h4>
                <p>Each distance (in semitones) has a specific name. Here they all are:</p>
            </div>

            <table class="note-table">
                <tr><th>Semitones</th><th>Interval Name</th><th>Example (from C)</th><th>Listen</th></tr>
                <tr><td>0</td><td>Unison (same note)</td><td>C → C</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','C3')">Play</button></td></tr>
                <tr><td>1</td><td>Minor 2nd</td><td>C → C#</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','C#3')">Play</button></td></tr>
                <tr><td>2</td><td>Major 2nd</td><td>C → D</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','D3')">Play</button></td></tr>
                <tr><td>3</td><td>Minor 3rd</td><td>C → D#</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','D#3')">Play</button></td></tr>
                <tr><td>4</td><td>Major 3rd</td><td>C → E</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','E3')">Play</button></td></tr>
                <tr><td>5</td><td>Perfect 4th</td><td>C → F</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','F3')">Play</button></td></tr>
                <tr><td>6</td><td>Tritone</td><td>C → F#</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','F#3')">Play</button></td></tr>
                <tr><td>7</td><td>Perfect 5th</td><td>C → G</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','G3')">Play</button></td></tr>
                <tr><td>8</td><td>Minor 6th</td><td>C → G#</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','G#3')">Play</button></td></tr>
                <tr><td>9</td><td>Major 6th</td><td>C → A</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','A3')">Play</button></td></tr>
                <tr><td>10</td><td>Minor 7th</td><td>C → A#</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','A#3')">Play</button></td></tr>
                <tr><td>11</td><td>Major 7th</td><td>C → B</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','B3')">Play</button></td></tr>
                <tr><td>12</td><td>Octave</td><td>C → C</td><td><button class="play-btn" onclick="AudioEngine.playInterval('C3','C4')">Play</button></td></tr>
            </table>

            <h3>Interval Character</h3>
            <p>Each interval has a distinct emotional flavor:</p>
            <div class="concept-box">
                <h4>Interval Moods</h4>
                <ul>
                    <li><strong>Minor 2nd (1)</strong> — Tense, dissonant. Think "Jaws" theme.</li>
                    <li><strong>Major 2nd (2)</strong> — Neutral, stepping. Think "Happy Birthday" first two notes.</li>
                    <li><strong>Minor 3rd (3)</strong> — Sad, somber. The sound of a minor chord.</li>
                    <li><strong>Major 3rd (4)</strong> — Happy, bright. The sound of a major chord.</li>
                    <li><strong>Perfect 4th (5)</strong> — Open, strong. Think "Here Comes the Bride."</li>
                    <li><strong>Tritone (6)</strong> — Unstable, spooky. Called "the devil's interval" in medieval times!</li>
                    <li><strong>Perfect 5th (7)</strong> — Powerful, stable. Think "Star Wars" opening. This is the power chord interval!</li>
                    <li><strong>Octave (12)</strong> — Same note, different height. Pure and open.</li>
                </ul>
            </div>

            <div class="concept-box tip-box">
                <h4>On the Guitar</h4>
                <p>Intervals are easy to see on guitar: the number of frets between two notes on the same string = the interval in semitones. If you play fret 3 and fret 7 on the same string, that's 4 semitones = a Major 3rd.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlightScale('C', [0, 4, 7]);
                fb.highlight(['C', 'E', 'G'], {'C': 'var(--note-root)', 'E': 'var(--note-third)', 'G': 'var(--note-fifth)'});
            }
        },
        quiz: [
            { question: 'What is an interval?', options: ['A type of chord', 'The distance between two notes', 'A rhythm pattern', 'A guitar technique'], correct: 1, explanation: 'An interval is the distance between any two notes, measured in semitones (frets on guitar).' },
            { question: 'How many semitones is a Perfect 5th?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'A Perfect 5th is 7 semitones. From C to G, count: C#(1), D(2), D#(3), E(4), F(5), F#(6), G(7).' },
            { question: 'Which interval sounds "sad"?', options: ['Major 3rd', 'Minor 3rd', 'Perfect 5th', 'Octave'], correct: 1, explanation: 'The Minor 3rd (3 semitones) has a sad, somber quality. It is the defining interval of minor chords.' },
            { question: 'What interval is nicknamed "the devil\'s interval"?', options: ['Minor 2nd', 'Tritone', 'Minor 7th', 'Major 7th'], correct: 1, explanation: 'The Tritone (6 semitones) was called "diabolus in musica" (the devil in music) in medieval times because of its unstable, dissonant sound.' },
            { question: 'On one string, if you play fret 2 and fret 9, how many semitones apart are they?', options: ['5', '7', '9', '11'], correct: 1, explanation: '9 - 2 = 7 semitones. On a single string, the interval in semitones equals the difference in fret numbers.' }
        ]
    },
    {
        id: 'major-scale',
        title: 'The Major Scale',
        section: 'Building Blocks',
        subtitle: 'The most important scale in all of music',
        content: () => `
            <h2>The Major Scale</h2>
            <p class="subtitle">The most important scale in all of music</p>

            <p>If music theory had a king, it would be the <strong>major scale</strong>. Almost everything in Western music — chords, keys, harmony — is built from or described relative to the major scale.</p>

            <h3>What is a Scale?</h3>
            <p>A scale is simply a set of notes arranged in order from low to high (or high to low). Think of it as a recipe — it tells you which notes to use.</p>

            <h3>The Major Scale Formula</h3>
            <p>The major scale uses 7 notes selected from the 12 available notes, following a specific pattern of <strong>whole steps (W)</strong> and <strong>half steps (H)</strong>:</p>

            <div class="concept-box">
                <h4>Whole Step vs Half Step</h4>
                <ul>
                    <li><strong>Half step (H)</strong> = 1 semitone = 1 fret on guitar</li>
                    <li><strong>Whole step (W)</strong> = 2 semitones = 2 frets on guitar</li>
                </ul>
                <h4>The Major Scale Formula</h4>
                <p style="font-size: 1.3rem; text-align: center; letter-spacing: 4px; margin: 12px 0;"><strong>W - W - H - W - W - W - H</strong></p>
            </div>

            <h3>Building C Major Step by Step</h3>
            <p>Let's build the C major scale using the formula. Start on C:</p>

            <div class="scale-degrees">
                <div class="scale-degree"><span class="degree-num">1 (Root)</span><span class="degree-note" style="color:var(--note-root)">C</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note">D</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note" style="color:var(--note-third)">E</span></div>
                <div class="scale-degree"><span class="degree-num">H →</span><span class="degree-note">F</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note" style="color:var(--note-fifth)">G</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note">A</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note" style="color:var(--note-seventh)">B</span></div>
                <div class="scale-degree"><span class="degree-num">H →</span><span class="degree-note" style="color:var(--note-root)">C</span></div>
            </div>

            <p>
                <button class="play-btn" onclick="AudioEngine.playSequence(['C3','D3','E3','F3','G3','A3','B3','C4'], 0.35, 0.5)">Play C Major Scale</button>
                <button class="play-btn" onclick="AudioEngine.playSequence(['G3','A3','B3','C4','D4','E4','F#4','G4'], 0.35, 0.5)">Play G Major Scale</button>
            </p>

            <div class="concept-box tip-box">
                <h4>Why C Major is Special</h4>
                <p>C major uses only the natural notes (no sharps or flats): C D E F G A B. That's why it's the easiest key for piano, and why music theory often uses it as a starting point. On guitar, it's not the easiest to play, but it's still the easiest to <em>think</em> about.</p>
            </div>

            <h3>Scale Degrees</h3>
            <p>Each note in the scale gets a number, called its <strong>degree</strong>:</p>
            <table class="note-table">
                <tr><th>Degree</th><th>Name</th><th>Note (in C)</th><th>Role</th></tr>
                <tr><td>1</td><td>Root / Tonic</td><td>C</td><td>Home base — the key center</td></tr>
                <tr><td>2</td><td>Supertonic</td><td>D</td><td>One step above the tonic</td></tr>
                <tr><td>3</td><td>Mediant</td><td>E</td><td>Determines major vs minor feel</td></tr>
                <tr><td>4</td><td>Subdominant</td><td>F</td><td>Pulls toward the dominant</td></tr>
                <tr><td>5</td><td>Dominant</td><td>G</td><td>Creates tension, wants to resolve to 1</td></tr>
                <tr><td>6</td><td>Submediant</td><td>A</td><td>Relative minor root</td></tr>
                <tr><td>7</td><td>Leading Tone</td><td>B</td><td>Strongly pulls up to the root</td></tr>
            </table>

            <div class="concept-box">
                <h4>The Major Scale is Your Reference Point</h4>
                <p>In music theory, almost everything is described relative to the major scale. When someone says "flat the 3rd" or "sharp the 7th," they mean relative to the major scale. Master this scale, and everything else becomes easier to understand.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlightScale('C', [0, 2, 4, 5, 7, 9, 11]);
            }
        },
        quiz: [
            { question: 'What is the major scale formula?', options: ['W-W-W-H-W-W-H', 'W-W-H-W-W-W-H', 'H-W-W-W-H-W-W', 'W-H-W-W-H-W-W'], correct: 1, explanation: 'The major scale formula is W-W-H-W-W-W-H (Whole-Whole-Half-Whole-Whole-Whole-Half).' },
            { question: 'How many notes are in a major scale?', options: ['5', '6', '7', '12'], correct: 2, explanation: 'A major scale has 7 unique notes (plus the octave of the root, making 8 if you count both endpoints).' },
            { question: 'What are the notes in the C major scale?', options: ['C D E F G A B', 'C D E F# G A B', 'C Db Eb F G Ab Bb', 'C D E F G A Bb'], correct: 0, explanation: 'C major uses all natural notes with no sharps or flats: C D E F G A B.' },
            { question: 'What is the 5th degree of a major scale called?', options: ['Mediant', 'Subdominant', 'Dominant', 'Leading Tone'], correct: 2, explanation: 'The 5th degree is called the Dominant. It creates tension that wants to resolve back to the root (1st degree).' }
        ]
    },
    {
        id: 'minor-scale',
        title: 'The Minor Scale',
        section: 'Building Blocks',
        subtitle: 'The sad, emotional counterpart to the major scale',
        content: () => `
            <h2>The Minor Scale</h2>
            <p class="subtitle">The sad, emotional counterpart to the major scale</p>

            <p>If the major scale sounds happy and bright, the <strong>natural minor scale</strong> sounds sad, dark, and emotional. It's used extensively in rock, metal, blues, and any music that wants to convey intensity or melancholy.</p>

            <h3>The Minor Scale Formula</h3>
            <div class="concept-box">
                <h4>Natural Minor Scale Formula</h4>
                <p style="font-size: 1.3rem; text-align: center; letter-spacing: 4px; margin: 12px 0;"><strong>W - H - W - W - H - W - W</strong></p>
                <p>In semitones from the root: 0, 2, 3, 5, 7, 8, 10</p>
            </div>

            <h3>Building A Minor</h3>
            <p>Let's build A natural minor:</p>

            <div class="scale-degrees">
                <div class="scale-degree"><span class="degree-num">1</span><span class="degree-note" style="color:var(--note-root)">A</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note">B</span></div>
                <div class="scale-degree"><span class="degree-num">H →</span><span class="degree-note" style="color:var(--note-third)">C</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note">D</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note" style="color:var(--note-fifth)">E</span></div>
                <div class="scale-degree"><span class="degree-num">H →</span><span class="degree-note">F</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note" style="color:var(--note-seventh)">G</span></div>
                <div class="scale-degree"><span class="degree-num">W →</span><span class="degree-note" style="color:var(--note-root)">A</span></div>
            </div>

            <p>
                <button class="play-btn" onclick="AudioEngine.playSequence(['A2','B2','C3','D3','E3','F3','G3','A3'], 0.35, 0.5)">Play A Minor Scale</button>
                <button class="play-btn" onclick="AudioEngine.playSequence(['E3','F#3','G3','A3','B3','C4','D4','E4'], 0.35, 0.5)">Play E Minor Scale</button>
            </p>

            <h3>The Relative Minor Secret</h3>
            <p>Here's a mind-blowing fact: <strong>A minor and C major use the exact same notes!</strong> A B C D E F G. The only difference is which note is "home" (the root).</p>

            <div class="concept-box">
                <h4>Relative Major and Minor</h4>
                <p>Every major scale has a <strong>relative minor</strong> that shares all the same notes. The relative minor starts on the <strong>6th degree</strong> of the major scale:</p>
                <ul>
                    <li>C major → A minor (6th note of C major is A)</li>
                    <li>G major → E minor</li>
                    <li>D major → B minor</li>
                    <li>F major → D minor</li>
                </ul>
            </div>

            <h3>Major vs Minor: Hear the Difference</h3>
            <p>The key difference is the <strong>3rd degree</strong>: major has a major 3rd (4 semitones), minor has a minor 3rd (3 semitones).</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playSequence(['A2','B2','C#3','D3','E3'], 0.4, 0.5)">A Major (happy)</button>
                <button class="play-btn" onclick="AudioEngine.playSequence(['A2','B2','C3','D3','E3'], 0.4, 0.5)">A Minor (sad)</button>
            </p>

            <div class="concept-box tip-box">
                <h4>Why A Minor is Great for Guitar</h4>
                <p>A minor is one of the most guitar-friendly keys. The open strings (E, A, B, E) are all notes in the A minor scale, making it easy to play and great sounding. Tons of rock and pop songs are in A minor or E minor.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlightScale('A', [0, 2, 3, 5, 7, 8, 10]);
            }
        },
        quiz: [
            { question: 'What is the natural minor scale formula?', options: ['W-W-H-W-W-W-H', 'W-H-W-W-H-W-W', 'H-W-W-H-W-W-W', 'W-W-H-W-W-H-W'], correct: 1, explanation: 'The natural minor scale formula is W-H-W-W-H-W-W.' },
            { question: 'What is the relative minor of C major?', options: ['E minor', 'D minor', 'A minor', 'G minor'], correct: 2, explanation: 'A minor is the relative minor of C major. They share the same notes (A B C D E F G), just starting on different roots.' },
            { question: 'What makes a scale sound "minor" vs "major"?', options: ['The root note', 'The flat 3rd degree', 'The number of notes', 'How fast you play it'], correct: 1, explanation: 'The 3rd degree is the key difference. A minor 3rd (3 semitones, flatted) gives the sad minor sound, while a major 3rd (4 semitones) gives the happy major sound.' }
        ]
    },
    {
        id: 'pentatonic-scales',
        title: 'The Pentatonic Scales',
        section: 'Building Blocks',
        subtitle: "The guitarist's best friend — 5 notes that always sound good",
        content: () => `
            <h2>The Pentatonic Scales</h2>
            <p class="subtitle">The guitarist's best friend — 5 notes that always sound good</p>

            <p>If there's one scale every guitarist must know, it's the <strong>pentatonic scale</strong>. "Penta" means five — this scale uses just 5 notes instead of 7. Fewer notes = fewer wrong notes = easier to sound great!</p>

            <h3>Minor Pentatonic</h3>
            <p>The minor pentatonic is the most used scale in rock, blues, and pop guitar. It takes the natural minor scale and removes the 2nd and 6th degrees:</p>

            <div class="concept-box">
                <h4>A Minor Pentatonic</h4>
                <p>Semitones from root: 0, 3, 5, 7, 10</p>
                <p>Notes: A, C, D, E, G</p>
                <p>It's the minor scale minus the "awkward" notes.</p>
            </div>

            <p>
                <button class="play-btn" onclick="AudioEngine.playSequence(['A2','C3','D3','E3','G3','A3'], 0.35, 0.5)">Play A Minor Pentatonic</button>
                <button class="play-btn" onclick="AudioEngine.playSequence(['E3','G3','A3','B3','D4','E4'], 0.35, 0.5)">Play E Minor Pentatonic</button>
            </p>

            <h3>Major Pentatonic</h3>
            <p>The major pentatonic removes the 4th and 7th degrees from the major scale:</p>

            <div class="concept-box">
                <h4>C Major Pentatonic</h4>
                <p>Semitones from root: 0, 2, 4, 7, 9</p>
                <p>Notes: C, D, E, G, A</p>
                <p>Sounds bright, happy, and country/folk-ish.</p>
            </div>

            <p>
                <button class="play-btn" onclick="AudioEngine.playSequence(['C3','D3','E3','G3','A3','C4'], 0.35, 0.5)">Play C Major Pentatonic</button>
            </p>

            <h3>Why Pentatonics Are So Popular</h3>
            <div class="concept-box tip-box">
                <h4>The "No Wrong Notes" Scale</h4>
                <p>The pentatonic scale is incredibly forgiving. Because it removes the two most "tense" notes from the full scale, almost any combination of pentatonic notes sounds good. This makes it perfect for:</p>
                <ul>
                    <li>Guitar solos and improvisation</li>
                    <li>Jamming with other musicians</li>
                    <li>Writing riffs and melodies</li>
                    <li>Learning to play by ear</li>
                </ul>
                <p>Legendary guitarists like Jimi Hendrix, BB King, Jimmy Page, and Slash use the pentatonic scale extensively.</p>
            </div>

            <div class="concept-box">
                <h4>Relative Pentatonics</h4>
                <p>Just like major and minor scales, pentatonics have relatives: A minor pentatonic and C major pentatonic use the same 5 notes (A, C, D, E, G). The difference is which note you treat as "home."</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlightScale('A', [0, 3, 5, 7, 10]);
            }
        },
        quiz: [
            { question: 'How many notes are in a pentatonic scale?', options: ['4', '5', '6', '7'], correct: 1, explanation: '"Penta" means five. The pentatonic scale uses 5 notes, making it simpler than the 7-note major or minor scale.' },
            { question: 'What are the notes in A minor pentatonic?', options: ['A B C D E', 'A C D E G', 'A B D E G', 'A C D F G'], correct: 1, explanation: 'A minor pentatonic: A, C, D, E, G. It is the A natural minor scale with the 2nd (B) and 6th (F) removed.' },
            { question: 'Why are pentatonic scales popular for improvisation?', options: ['They have more notes to choose from', 'They remove tense notes, so almost everything sounds good', 'They are only used in blues', 'They are harder to play'], correct: 1, explanation: 'By removing the two most dissonant notes, pentatonic scales are very forgiving — it is hard to play a bad-sounding note.' }
        ]
    },
    // ==================== SECTION: CHORDS ====================
    {
        id: 'what-are-chords',
        title: 'What Are Chords?',
        section: 'Chords',
        subtitle: 'Stacking notes together to create harmony',
        content: () => `
            <h2>What Are Chords?</h2>
            <p class="subtitle">Stacking notes together to create harmony</p>

            <p>A <strong>chord</strong> is what happens when you play three or more notes at the same time. Chords are the backbone of songs — they create the harmony that supports melodies.</p>

            <h3>Triads: The Simplest Chords</h3>
            <p>The most basic chord is a <strong>triad</strong> — three notes stacked on top of each other. Triads are built by stacking two intervals called <strong>thirds</strong>.</p>

            <div class="concept-box">
                <h4>Building a Major Triad</h4>
                <p>A major triad has three notes:</p>
                <ul>
                    <li><strong>Root</strong> — The note the chord is named after</li>
                    <li><strong>Major 3rd</strong> — 4 semitones above the root</li>
                    <li><strong>Perfect 5th</strong> — 7 semitones above the root</li>
                </ul>
                <p>Formula: <strong>Root + 4 semitones + 3 semitones</strong> (from the 3rd to the 5th)</p>
            </div>

            <h3>Example: C Major Triad</h3>
            <div class="scale-degrees">
                <div class="scale-degree"><span class="degree-num">Root</span><span class="degree-note" style="color:var(--note-root)">C</span></div>
                <div class="scale-degree"><span class="degree-num">Major 3rd</span><span class="degree-note" style="color:var(--note-third)">E</span></div>
                <div class="scale-degree"><span class="degree-num">Perfect 5th</span><span class="degree-note" style="color:var(--note-fifth)">G</span></div>
            </div>

            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3'], 1.5)">Play C Major Triad</button>
                <button class="play-btn" onclick="AudioEngine.playSequence(['C3','E3','G3'], 0.5, 0.7)">Hear the notes separately</button>
            </p>

            <h3>Major vs Minor Triads</h3>
            <p>The difference between major and minor is just <strong>one semitone</strong> in the 3rd:</p>

            <div class="concept-box">
                <h4>Triad Formulas</h4>
                <ul>
                    <li><strong>Major triad</strong> = Root + Major 3rd (4) + Perfect 5th (7)</li>
                    <li><strong>Minor triad</strong> = Root + Minor 3rd (3) + Perfect 5th (7)</li>
                </ul>
                <p>That one semitone difference in the 3rd is what makes major sound happy and minor sound sad!</p>
            </div>

            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3'], 1.5)">C Major (happy)</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['C3','D#3','G3'], 1.5)">C Minor (sad)</button>
            </p>

            <div class="concept-box tip-box">
                <h4>Chords on Guitar</h4>
                <p>On guitar, a "chord" usually involves strumming 4-6 strings, but many of those notes are duplicates (the same note in different octaves). A C major chord shape might use all 6 strings, but it's still just the notes C, E, and G repeated.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlightChord('C', [0, 4, 7]);
            }
        },
        quiz: [
            { question: 'What is a triad?', options: ['A chord with 2 notes', 'A chord with 3 notes', 'A chord with 4 notes', 'A type of scale'], correct: 1, explanation: 'A triad is a chord made of 3 notes: the root, 3rd, and 5th.' },
            { question: 'What intervals make up a major triad?', options: ['Root, Minor 3rd, Perfect 5th', 'Root, Major 3rd, Perfect 5th', 'Root, Major 2nd, Perfect 4th', 'Root, Perfect 4th, Perfect 5th'], correct: 1, explanation: 'A major triad = Root + Major 3rd (4 semitones) + Perfect 5th (7 semitones).' },
            { question: 'What makes a minor chord sound different from a major chord?', options: ['A different root note', 'The 3rd is lowered by one semitone', 'The 5th is raised', 'It uses more notes'], correct: 1, explanation: 'The only difference is the 3rd: major uses a major 3rd (4 semitones), minor uses a minor 3rd (3 semitones). That one semitone changes the whole mood!' }
        ]
    },
    {
        id: 'major-minor-chords',
        title: 'Major & Minor Chords',
        section: 'Chords',
        subtitle: 'The essential open chords every guitarist needs',
        content: () => `
            <h2>Major & Minor Chords</h2>
            <p class="subtitle">The essential open chords every guitarist needs</p>

            <p>Let's hear and explore the most common open chords on guitar. "Open" chords use open (unfretted) strings, which makes them easier to play and gives them a full, ringing sound.</p>

            <h3>Major Chords</h3>
            <p>Major chords sound bright, happy, and resolved:</p>

            <div class="chord-grid">
                <div class="chord-diagram">
                    <span class="chord-name">C Major</span>
                    <span>C - E - G</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3','C4','E4'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">G Major</span>
                    <span>G - B - D</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['G2','B2','D3','G3','B3','G4'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">D Major</span>
                    <span>D - F# - A</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['D3','A3','D4','F#4'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">E Major</span>
                    <span>E - G# - B</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['E2','B2','E3','G#3','B3','E4'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">A Major</span>
                    <span>A - C# - E</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','A3','C#4','E4'], 1.5)">Play</button>
                </div>
            </div>

            <h3>Minor Chords</h3>
            <p>Minor chords sound dark, sad, or introspective:</p>

            <div class="chord-grid">
                <div class="chord-diagram">
                    <span class="chord-name">Am</span>
                    <span>A - C - E</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','A3','C4','E4'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">Em</span>
                    <span>E - G - B</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['E2','B2','E3','G3','B3','E4'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">Dm</span>
                    <span>D - F - A</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['D3','A3','D4','F4'], 1.5)">Play</button>
                </div>
            </div>

            <h3>Comparing Major vs Minor</h3>
            <p>Hear the difference side by side:</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','A3','C#4','E4'], 1.5)">A Major</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','A3','C4','E4'], 1.5)">A Minor</button>
            </p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['E2','B2','E3','G#3','B3','E4'], 1.5)">E Major</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['E2','B2','E3','G3','B3','E4'], 1.5)">E Minor</button>
            </p>

            <div class="concept-box tip-box">
                <h4>The "Campfire Chords"</h4>
                <p>With just G, C, D, Em, and Am, you can play thousands of songs. Seriously! These five chords appear in an enormous number of popular songs. Many guitarists learn these first and can start playing along with music almost immediately.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlightChord('C', [0, 4, 7]);
            }
        },
        quiz: [
            { question: 'What notes make up a G major chord?', options: ['G, B, D', 'G, A, B', 'G, C, E', 'G, Bb, D'], correct: 0, explanation: 'G major = G (root) + B (major 3rd) + D (perfect 5th).' },
            { question: 'What is the difference between E major and E minor?', options: ['Different root notes', 'E major has G#, E minor has G', 'They sound the same', 'E minor has more notes'], correct: 1, explanation: 'The only difference is the 3rd: E major has G# (major 3rd = 4 semitones), E minor has G (minor 3rd = 3 semitones).' },
            { question: 'What does "open chord" mean?', options: ['A chord with no notes', 'A chord that uses open (unfretted) strings', 'A chord you can modify', 'A chord from an open tuning'], correct: 1, explanation: 'Open chords use one or more open strings (strings that are not fretted). They tend to sound full and are easier to play.' }
        ]
    },
    {
        id: 'seventh-chords',
        title: 'Seventh Chords',
        section: 'Chords',
        subtitle: 'Adding color and sophistication with the 7th',
        content: () => `
            <h2>Seventh Chords</h2>
            <p class="subtitle">Adding color and sophistication with the 7th</p>

            <p>Triads use 3 notes. <strong>Seventh chords</strong> add a 4th note — the 7th degree — creating richer, more complex sounds. They're essential in jazz, blues, funk, and R&B, but appear everywhere in music.</p>

            <h3>Three Types of Seventh Chords</h3>

            <div class="concept-box">
                <h4>Major 7th (maj7)</h4>
                <p>Formula: Root + Major 3rd (4) + Perfect 5th (7) + Major 7th (11)</p>
                <p>Sound: Dreamy, smooth, jazzy, romantic</p>
                <p>Example: Cmaj7 = C, E, G, B</p>
            </div>
            <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3','B3'], 1.5)">Play Cmaj7</button>

            <div class="concept-box">
                <h4>Dominant 7th (7)</h4>
                <p>Formula: Root + Major 3rd (4) + Perfect 5th (7) + Minor 7th (10)</p>
                <p>Sound: Bluesy, tense, wants to resolve. THE blues chord.</p>
                <p>Example: C7 = C, E, G, Bb</p>
            </div>
            <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3','A#3'], 1.5)">Play C7</button>

            <div class="concept-box">
                <h4>Minor 7th (m7)</h4>
                <p>Formula: Root + Minor 3rd (3) + Perfect 5th (7) + Minor 7th (10)</p>
                <p>Sound: Mellow, smooth, soulful</p>
                <p>Example: Cm7 = C, Eb, G, Bb</p>
            </div>
            <button class="play-btn" onclick="AudioEngine.playChord(['C3','D#3','G3','A#3'], 1.5)">Play Cm7</button>

            <h3>Comparing Them All</h3>
            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','A3','C#4','E4'], 1.5)">A Major</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','G#3','C#4','E4'], 1.5)">Amaj7</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','G3','C#4','E4'], 1.5)">A7</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','G3','C4','E4'], 1.5)">Am7</button>
            </p>

            <div class="concept-box tip-box">
                <h4>When to Use Each</h4>
                <ul>
                    <li><strong>Major 7th</strong> — Bossa nova, jazz ballads, neo-soul, dreamy pop</li>
                    <li><strong>Dominant 7th</strong> — Blues (12-bar blues uses ALL dominant 7ths), rock, funk</li>
                    <li><strong>Minor 7th</strong> — Jazz, R&B, soul, lo-fi hip-hop</li>
                </ul>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlightChord('C', [0, 4, 7, 11]);
            }
        },
        quiz: [
            { question: 'How many notes are in a seventh chord?', options: ['3', '4', '5', '7'], correct: 1, explanation: 'Seventh chords have 4 notes: root, 3rd, 5th, and 7th.' },
            { question: 'Which seventh chord type is essential for blues?', options: ['Major 7th', 'Dominant 7th', 'Minor 7th', 'Diminished 7th'], correct: 1, explanation: 'The Dominant 7th (e.g., A7, E7) is THE characteristic blues chord. The 12-bar blues uses dominant 7th chords throughout.' },
            { question: 'What is the formula for a dominant 7th chord?', options: ['Root, Major 3rd, Perfect 5th, Major 7th', 'Root, Major 3rd, Perfect 5th, Minor 7th', 'Root, Minor 3rd, Perfect 5th, Minor 7th', 'Root, Minor 3rd, Diminished 5th, Minor 7th'], correct: 1, explanation: 'A dominant 7th = Root + Major 3rd + Perfect 5th + Minor 7th. It combines a major triad with a minor (flatted) 7th.' }
        ]
    },
    {
        id: 'power-chords',
        title: 'Power Chords',
        section: 'Chords',
        subtitle: 'Root + 5th = pure rock power',
        content: () => `
            <h2>Power Chords</h2>
            <p class="subtitle">Root + 5th = pure rock power</p>

            <p>Power chords are the backbone of rock, punk, metal, and grunge. They're simple, they're loud, and they sound absolutely massive through a distorted amp.</p>

            <h3>What Makes Them Special</h3>
            <div class="concept-box">
                <h4>Power Chord = Root + Perfect 5th</h4>
                <p>A power chord uses just <strong>two unique notes</strong>: the root and the perfect 5th (7 semitones up). No 3rd!</p>
                <p>Because there's no 3rd, power chords are neither major nor minor — they're <strong>neutral</strong>. That's why they're written with a "5" (e.g., A5, E5, G5).</p>
            </div>

            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','A3'], 1.5)">A5 Power Chord</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['E2','B2','E3'], 1.5)">E5 Power Chord</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['G2','D3','G3'], 1.5)">G5 Power Chord</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['D3','A3','D4'], 1.5)">D5 Power Chord</button>
            </p>

            <h3>Why No 3rd?</h3>
            <p>When you play through distortion or overdrive, the 3rd creates a harsh, muddy sound. By removing it, power chords stay clean and punchy even with heavy distortion. This is why they dominate rock and metal.</p>

            <h3>The Moveable Shape</h3>
            <div class="concept-box tip-box">
                <h4>One Shape, Every Key</h4>
                <p>The beautiful thing about power chords is that the <strong>shape never changes</strong>. You just slide it up and down the neck:</p>
                <ul>
                    <li>Root on the 6th string + same fret + 2 on the 5th string</li>
                    <li>Or: Root on the 5th string + same fret + 2 on the 4th string</li>
                </ul>
                <p>This means once you learn one power chord shape, you can play in any key just by moving it to a different fret!</p>
            </div>

            <p>Hear power chords moving up the neck:</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playSequence(['E2','A2','D3','G3','C3'], 0.6, 0.5)">E5 → A5 → D5 → G5 → C5</button>
            </p>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlight(['A', 'E'], {'A': 'var(--note-root)', 'E': 'var(--note-fifth)'});
            }
        },
        quiz: [
            { question: 'What two notes make up a power chord?', options: ['Root and 3rd', 'Root and 5th', 'Root and 7th', '3rd and 5th'], correct: 1, explanation: 'A power chord consists of just the root and the perfect 5th. No 3rd is included.' },
            { question: 'Why do power chords work well with distortion?', options: ['They are louder', 'They have no 3rd, which would sound muddy with distortion', 'They use all 6 strings', 'They are played faster'], correct: 1, explanation: 'The 3rd creates harsh overtones with distortion. By omitting it, power chords stay clean and punchy.' },
            { question: 'Are power chords major or minor?', options: ['Major', 'Minor', 'Neither — they are neutral', 'Both at the same time'], correct: 2, explanation: 'Without a 3rd, power chords are neither major nor minor. They are neutral, which is why they work in any context.' }
        ]
    },
    // ==================== SECTION: PUTTING IT TOGETHER ====================
    {
        id: 'keys',
        title: 'Keys & Key Signatures',
        section: 'Putting It Together',
        subtitle: 'Understanding what key a song is in',
        content: () => `
            <h2>Keys & Key Signatures</h2>
            <p class="subtitle">Understanding what key a song is in</p>

            <p>When someone says a song is "in the key of G," they mean the song is built around the <strong>G major scale</strong>. The key tells you which notes and chords will appear in the song.</p>

            <h3>What is a Key?</h3>
            <div class="concept-box">
                <h4>A Key is a Home Base</h4>
                <p>A <strong>key</strong> is a group of notes (a scale) that a piece of music uses, centered around one note (the <strong>tonic</strong> or root). The key of C major means:</p>
                <ul>
                    <li>The music uses notes from the C major scale: C D E F G A B</li>
                    <li>The note C feels like "home" — the resting point</li>
                    <li>The chords are built from these same notes</li>
                </ul>
            </div>

            <h3>Sharps and Flats in Different Keys</h3>
            <p>Each key has a specific set of sharps or flats. Here are the most guitar-friendly keys:</p>

            <table class="note-table">
                <tr><th>Key</th><th>Sharps/Flats</th><th>Notes</th><th>Listen</th></tr>
                <tr><td>C major</td><td>None</td><td>C D E F G A B</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['C3','D3','E3','F3','G3','A3','B3','C4'], 0.3)">Play</button></td></tr>
                <tr><td>G major</td><td>1 sharp (F#)</td><td>G A B C D E F#</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['G3','A3','B3','C4','D4','E4','F#4','G4'], 0.3)">Play</button></td></tr>
                <tr><td>D major</td><td>2 sharps (F#, C#)</td><td>D E F# G A B C#</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['D3','E3','F#3','G3','A3','B3','C#4','D4'], 0.3)">Play</button></td></tr>
                <tr><td>A major</td><td>3 sharps (F#, C#, G#)</td><td>A B C# D E F# G#</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['A2','B2','C#3','D3','E3','F#3','G#3','A3'], 0.3)">Play</button></td></tr>
                <tr><td>E major</td><td>4 sharps</td><td>E F# G# A B C# D#</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['E3','F#3','G#3','A3','B3','C#4','D#4','E4'], 0.3)">Play</button></td></tr>
            </table>

            <h3>How to Identify the Key</h3>
            <div class="concept-box tip-box">
                <h4>Quick Tips for Finding the Key</h4>
                <ul>
                    <li>The song usually starts and/or ends on the <strong>tonic chord</strong> (the I chord)</li>
                    <li>The chord that feels most like "home" or "resolution" is likely the key</li>
                    <li>Look at which sharps/flats are used — they point to the key</li>
                    <li>The last note of the melody often lands on the root note</li>
                </ul>
            </div>

            <div class="concept-box">
                <h4>Major and Minor Keys</h4>
                <p>Every major key has a relative minor key (and vice versa). They share the same notes but have a different "home" note. Common minor keys for guitar:</p>
                <ul>
                    <li>A minor (relative of C major) — no sharps or flats</li>
                    <li>E minor (relative of G major) — 1 sharp</li>
                    <li>D minor (relative of F major) — 1 flat</li>
                    <li>B minor (relative of D major) — 2 sharps</li>
                </ul>
            </div>
        `,
        quiz: [
            { question: 'What does it mean when a song is "in the key of G"?', options: ['The song only uses the note G', 'The song is built around the G major scale', 'The song starts with a G chord only', 'The guitar must be tuned to G'], correct: 1, explanation: 'Being "in the key of G" means the song uses notes and chords from the G major scale, with G as the home/tonic note.' },
            { question: 'How many sharps does the key of D major have?', options: ['None', '1 (F#)', '2 (F# and C#)', '3 (F#, C#, G#)'], correct: 2, explanation: 'D major has 2 sharps: F# and C#. The notes are D E F# G A B C#.' },
            { question: 'What is the relative minor of G major?', options: ['D minor', 'E minor', 'A minor', 'B minor'], correct: 1, explanation: 'E minor is the relative minor of G major. Both share the same notes and the same single sharp (F#).' }
        ]
    },
    {
        id: 'number-system',
        title: 'The Number System',
        section: 'Putting It Together',
        subtitle: 'Roman numerals and the Nashville number system',
        content: () => `
            <h2>The Number System</h2>
            <p class="subtitle">Roman numerals and the Nashville number system</p>

            <p>Instead of memorizing chord progressions in every key, musicians use <strong>numbers</strong>. This lets you describe a song's structure in a way that works in any key.</p>

            <h3>Chords Built from the Scale</h3>
            <p>When you build a triad on each degree of the major scale (using only notes from that scale), you get 7 chords. Some are major, some are minor, and one is diminished:</p>

            <div class="concept-box">
                <h4>The 7 Chords of a Major Key</h4>
                <table class="note-table">
                    <tr><th>Degree</th><th>Roman Numeral</th><th>Chord Type</th><th>In C</th><th>Listen</th></tr>
                    <tr><td>1st</td><td>I</td><td>Major</td><td>C</td><td><button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3'], 1.2)">Play</button></td></tr>
                    <tr><td>2nd</td><td>ii</td><td>minor</td><td>Dm</td><td><button class="play-btn" onclick="AudioEngine.playChord(['D3','F3','A3'], 1.2)">Play</button></td></tr>
                    <tr><td>3rd</td><td>iii</td><td>minor</td><td>Em</td><td><button class="play-btn" onclick="AudioEngine.playChord(['E3','G3','B3'], 1.2)">Play</button></td></tr>
                    <tr><td>4th</td><td>IV</td><td>Major</td><td>F</td><td><button class="play-btn" onclick="AudioEngine.playChord(['F3','A3','C4'], 1.2)">Play</button></td></tr>
                    <tr><td>5th</td><td>V</td><td>Major</td><td>G</td><td><button class="play-btn" onclick="AudioEngine.playChord(['G3','B3','D4'], 1.2)">Play</button></td></tr>
                    <tr><td>6th</td><td>vi</td><td>minor</td><td>Am</td><td><button class="play-btn" onclick="AudioEngine.playChord(['A3','C4','E4'], 1.2)">Play</button></td></tr>
                    <tr><td>7th</td><td>vii°</td><td>diminished</td><td>Bdim</td><td><button class="play-btn" onclick="AudioEngine.playChord(['B3','D4','F4'], 1.2)">Play</button></td></tr>
                </table>
            </div>

            <div class="concept-box">
                <h4>Reading Roman Numerals</h4>
                <ul>
                    <li><strong>Uppercase</strong> (I, IV, V) = Major chord</li>
                    <li><strong>Lowercase</strong> (ii, iii, vi) = minor chord</li>
                    <li><strong>° symbol</strong> (vii°) = diminished chord</li>
                </ul>
                <p>Pattern to memorize: <strong>Major, minor, minor, Major, Major, minor, diminished</strong></p>
            </div>

            <h3>Why Numbers Are Powerful</h3>
            <p>If someone says "play a I-V-vi-IV," you can play it in <em>any</em> key:</p>
            <table class="note-table">
                <tr><th>Progression</th><th>In C</th><th>In G</th><th>In D</th></tr>
                <tr><td>I</td><td>C</td><td>G</td><td>D</td></tr>
                <tr><td>V</td><td>G</td><td>D</td><td>A</td></tr>
                <tr><td>vi</td><td>Am</td><td>Em</td><td>Bm</td></tr>
                <tr><td>IV</td><td>F</td><td>C</td><td>G</td></tr>
            </table>

            <div class="concept-box tip-box">
                <h4>The Nashville Number System</h4>
                <p>Professional session musicians in Nashville use numbers instead of chord names. A chart might just say "1 1 4 1 5 4 1 5" — and the band can instantly play it in whatever key the singer needs. Learning to think in numbers is a huge skill upgrade!</p>
            </div>
        `,
        quiz: [
            { question: 'In a major key, what type of chord is built on the 2nd degree?', options: ['Major', 'Minor', 'Diminished', 'Augmented'], correct: 1, explanation: 'The ii chord (2nd degree) in a major key is always minor. The pattern is: I(Maj), ii(min), iii(min), IV(Maj), V(Maj), vi(min), vii°(dim).' },
            { question: 'What does an uppercase Roman numeral mean?', options: ['Minor chord', 'Major chord', 'Diminished chord', 'Seventh chord'], correct: 1, explanation: 'Uppercase Roman numerals (I, IV, V) indicate major chords. Lowercase (ii, iii, vi) indicate minor chords.' },
            { question: 'In the key of G, what is the V chord?', options: ['C', 'D', 'E', 'A'], correct: 1, explanation: 'In G major (G A B C D E F#), the 5th degree is D, so the V chord is D major.' }
        ]
    },
    {
        id: 'chord-progressions',
        title: 'Common Chord Progressions',
        section: 'Putting It Together',
        subtitle: 'The patterns behind thousands of hit songs',
        content: () => `
            <h2>Common Chord Progressions</h2>
            <p class="subtitle">The patterns behind thousands of hit songs</p>

            <p>A <strong>chord progression</strong> is a sequence of chords played in order. Amazingly, a handful of progressions show up in the vast majority of popular music. Learn these, and you'll recognize them everywhere.</p>

            <h3>I - IV - V (The "Blues/Rock" Progression)</h3>
            <p>The most fundamental progression in Western music. Used in blues, rock, country, and folk.</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3'],1.2); setTimeout(()=>AudioEngine.playChord(['F3','A3','C4'],1.2),1400); setTimeout(()=>AudioEngine.playChord(['G3','B3','D4'],1.2),2800)">I-IV-V in C</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['G2','B2','D3'],1.2); setTimeout(()=>AudioEngine.playChord(['C3','E3','G3'],1.2),1400); setTimeout(()=>AudioEngine.playChord(['D3','F#3','A3'],1.2),2800)">I-IV-V in G</button>
            </p>

            <h3>I - V - vi - IV (The "Pop" Progression)</h3>
            <p>This is the most common progression in modern pop music. Think "Let It Be," "No Woman No Cry," "Someone Like You," and countless others.</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3'],1.2); setTimeout(()=>AudioEngine.playChord(['G3','B3','D4'],1.2),1400); setTimeout(()=>AudioEngine.playChord(['A3','C4','E4'],1.2),2800); setTimeout(()=>AudioEngine.playChord(['F3','A3','C4'],1.2),4200)">I-V-vi-IV in C</button>
                <button class="play-btn" onclick="AudioEngine.playChord(['G2','B2','D3'],1.2); setTimeout(()=>AudioEngine.playChord(['D3','F#3','A3'],1.2),1400); setTimeout(()=>AudioEngine.playChord(['E3','G3','B3'],1.2),2800); setTimeout(()=>AudioEngine.playChord(['C3','E3','G3'],1.2),4200)">I-V-vi-IV in G</button>
            </p>

            <h3>ii - V - I (The "Jazz" Progression)</h3>
            <p>The most important progression in jazz. Creates a smooth, sophisticated resolution.</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['D3','F3','A3'],1.2); setTimeout(()=>AudioEngine.playChord(['G3','B3','D4'],1.2),1400); setTimeout(()=>AudioEngine.playChord(['C3','E3','G3'],1.5),2800)">ii-V-I in C</button>
            </p>

            <h3>I - IV - V - IV (The "50s" Progression)</h3>
            <p>Classic rock and roll, doo-wop, and early rock. "Twist and Shout," "La Bamba."</p>
            <p>
                <button class="play-btn" onclick="AudioEngine.playChord(['A2','E3','A3','C#4'],1.0); setTimeout(()=>AudioEngine.playChord(['D3','A3','D4','F#4'],1.0),1200); setTimeout(()=>AudioEngine.playChord(['E3','B3','E4','G#4'],1.0),2400); setTimeout(()=>AudioEngine.playChord(['D3','A3','D4','F#4'],1.0),3600)">I-IV-V-IV in A</button>
            </p>

            <h3>12-Bar Blues</h3>
            <div class="concept-box">
                <h4>The 12-Bar Blues Structure</h4>
                <p>The 12-bar blues is a repeating 12-measure pattern that's been the foundation of blues, rock, and jazz for over a century:</p>
                <table class="note-table">
                    <tr><th>Bar</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
                    <tr><td>Line 1</td><td>I</td><td>I</td><td>I</td><td>I</td></tr>
                    <tr><td>Line 2</td><td>IV</td><td>IV</td><td>I</td><td>I</td></tr>
                    <tr><td>Line 3</td><td>V</td><td>IV</td><td>I</td><td>V</td></tr>
                </table>
            </div>

            <div class="concept-box tip-box">
                <h4>Start Listening!</h4>
                <p>Now that you know these progressions, you'll start hearing them everywhere. Put on your favorite songs and try to identify which progression they use. You'll be amazed how often these same patterns appear!</p>
            </div>
        `,
        quiz: [
            { question: 'What is the most common chord progression in pop music?', options: ['I-IV-V', 'I-V-vi-IV', 'ii-V-I', 'I-vi-IV-V'], correct: 1, explanation: 'I-V-vi-IV is the most common progression in modern pop music. It appears in thousands of hit songs.' },
            { question: 'How many bars/measures are in a standard blues progression?', options: ['8', '10', '12', '16'], correct: 2, explanation: 'The standard blues progression is 12 bars long, which is why it is called "12-bar blues."' },
            { question: 'The ii-V-I progression is most associated with which genre?', options: ['Country', 'Metal', 'Jazz', 'Punk'], correct: 2, explanation: 'The ii-V-I is the quintessential jazz progression. It creates a smooth, sophisticated harmonic resolution.' }
        ]
    },
    {
        id: 'caged-system',
        title: 'The CAGED System',
        section: 'Putting It Together',
        subtitle: '5 shapes that unlock the entire fretboard',
        content: () => `
            <h2>The CAGED System</h2>
            <p class="subtitle">5 shapes that unlock the entire fretboard</p>

            <p>The <strong>CAGED system</strong> is a method for understanding the guitar neck by connecting 5 basic open chord shapes: <strong>C, A, G, E, and D</strong>. These shapes can be moved up the neck to play any chord in any position.</p>

            <h3>The 5 Shapes</h3>
            <p>You already know the open chord shapes for C, A, G, E, and D major. The CAGED system shows that these shapes <em>connect</em> and overlap across the entire fretboard.</p>

            <div class="concept-box">
                <h4>The Key Insight</h4>
                <p>Any major chord can be played in 5 different positions on the neck, each using one of the CAGED shapes (with a barre). The shapes link together like puzzle pieces, covering the whole fretboard.</p>
            </div>

            <h3>Example: C Major Across the Neck</h3>
            <p>The C chord can be played using:</p>
            <div class="chord-grid">
                <div class="chord-diagram">
                    <span class="chord-name">C shape</span>
                    <span>Open position</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3','C4','E4'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">A shape</span>
                    <span>3rd fret area</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['C3','G3','C4','E4'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">G shape</span>
                    <span>5th fret area</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['C3','E3','G3','C4'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">E shape</span>
                    <span>8th fret area</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['C3','G3','C4','E4','G4','C5'], 1.5)">Play</button>
                </div>
                <div class="chord-diagram">
                    <span class="chord-name">D shape</span>
                    <span>10th fret area</span>
                    <button class="play-btn" onclick="AudioEngine.playChord(['C4','E4','G4','C5'], 1.5)">Play</button>
                </div>
            </div>

            <div class="concept-box tip-box">
                <h4>Why Learn CAGED?</h4>
                <ul>
                    <li>Play any chord anywhere on the neck</li>
                    <li>Connect scale patterns across positions</li>
                    <li>Understand how the fretboard fits together</li>
                    <li>Improvise more freely by seeing note patterns</li>
                    <li>Find chord voicings that sound unique</li>
                </ul>
            </div>

            <div class="concept-box">
                <h4>The CAGED Order</h4>
                <p>The shapes always connect in the same order: <strong>C → A → G → E → D → C → A → ...</strong></p>
                <p>This cycle repeats endlessly up the neck. Each shape flows into the next, creating a map of the entire fretboard.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlightChord('C', [0, 4, 7]);
            }
        },
        quiz: [
            { question: 'What does CAGED stand for?', options: ['A music theory concept unrelated to chords', 'The 5 open chord shapes: C, A, G, E, D', 'A type of guitar tuning', 'A scale pattern'], correct: 1, explanation: 'CAGED refers to the 5 basic open chord shapes (C, A, G, E, D) that can be moved up the neck to play any chord.' },
            { question: 'How many positions can any major chord be played in using CAGED?', options: ['2', '3', '5', '7'], correct: 2, explanation: 'Any major chord can be played in 5 different positions on the neck, one for each CAGED shape.' },
            { question: 'What is the order of the CAGED shapes moving up the neck?', options: ['C-A-G-E-D', 'A-C-D-E-G', 'E-A-D-G-C', 'D-C-A-G-E'], correct: 0, explanation: 'The shapes always connect in order: C → A → G → E → D, then the cycle repeats.' }
        ]
    },
    // ==================== SECTION: BEYOND THE BASICS ====================
    {
        id: 'modes',
        title: 'Modes',
        section: 'Beyond the Basics',
        subtitle: 'The 7 flavors of the major scale',
        content: () => `
            <h2>Modes</h2>
            <p class="subtitle">The 7 flavors of the major scale</p>

            <p><strong>Modes</strong> are one of those topics that sounds intimidating but is actually simple. A mode is just a major scale started on a different note. Each starting point gives the scale a different mood or flavor.</p>

            <h3>The 7 Modes</h3>
            <p>Using the C major scale notes (C D E F G A B), you get 7 modes by starting on each degree:</p>

            <table class="note-table">
                <tr><th>Mode</th><th>Starts On</th><th>Character</th><th>Listen</th></tr>
                <tr><td>Ionian (I)</td><td>C</td><td>Happy, standard (= major scale)</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['C3','D3','E3','F3','G3','A3','B3','C4'], 0.3)">Play</button></td></tr>
                <tr><td>Dorian (ii)</td><td>D</td><td>Jazzy minor, smooth</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['D3','E3','F3','G3','A3','B3','C4','D4'], 0.3)">Play</button></td></tr>
                <tr><td>Phrygian (iii)</td><td>E</td><td>Spanish, exotic, dark</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['E3','F3','G3','A3','B3','C4','D4','E4'], 0.3)">Play</button></td></tr>
                <tr><td>Lydian (IV)</td><td>F</td><td>Dreamy, floating, ethereal</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['F3','G3','A3','B3','C4','D4','E4','F4'], 0.3)">Play</button></td></tr>
                <tr><td>Mixolydian (V)</td><td>G</td><td>Bluesy major, rock</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['G3','A3','B3','C4','D4','E4','F4','G4'], 0.3)">Play</button></td></tr>
                <tr><td>Aeolian (vi)</td><td>A</td><td>Sad (= natural minor scale)</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['A3','B3','C4','D4','E4','F4','G4','A4'], 0.3)">Play</button></td></tr>
                <tr><td>Locrian (vii)</td><td>B</td><td>Unstable, dissonant, rare</td><td><button class="play-btn" onclick="AudioEngine.playSequence(['B3','C4','D4','E4','F4','G4','A4','B4'], 0.3)">Play</button></td></tr>
            </table>

            <h3>The Most Useful Modes for Guitar</h3>

            <div class="concept-box">
                <h4>Dorian Mode</h4>
                <p>Like a minor scale with a brighter 6th degree. Used heavily in jazz, funk, and classic rock. Think "So What" by Miles Davis or "Oye Como Va" by Santana.</p>
            </div>

            <div class="concept-box">
                <h4>Mixolydian Mode</h4>
                <p>Like a major scale with a flat 7th. Perfect for blues-rock. Think "Sweet Home Alabama" or "Norwegian Wood."</p>
            </div>

            <div class="concept-box">
                <h4>Phrygian Mode</h4>
                <p>That instant "Spanish guitar" sound comes from the Phrygian mode, specifically the flat 2nd (one semitone above the root).</p>
            </div>

            <div class="concept-box tip-box">
                <h4>The Secret</h4>
                <p>You already know all 7 modes if you know the major scale! The trick is understanding which mode to use over which chord. Each mode aligns with the chord built on its starting degree.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlightScale('D', [0, 2, 3, 5, 7, 9, 10]);
            }
        },
        quiz: [
            { question: 'What is a mode?', options: ['A type of chord', 'A major scale started on a different degree', 'A guitar effect', 'A rhythm pattern'], correct: 1, explanation: 'A mode is the major scale played starting from a different degree. Each starting point creates a different mood while using the same notes.' },
            { question: 'Which mode sounds "Spanish" or exotic?', options: ['Dorian', 'Phrygian', 'Lydian', 'Mixolydian'], correct: 1, explanation: 'The Phrygian mode has a flat 2nd (one semitone above the root) which gives it a distinctly Spanish or Middle Eastern sound.' },
            { question: 'The Aeolian mode is the same as which scale?', options: ['Major scale', 'Natural minor scale', 'Pentatonic scale', 'Blues scale'], correct: 1, explanation: 'The Aeolian mode (starting on the 6th degree of the major scale) is identical to the natural minor scale.' },
            { question: 'Which mode is most associated with jazz and funk?', options: ['Ionian', 'Dorian', 'Locrian', 'Lydian'], correct: 1, explanation: 'The Dorian mode is widely used in jazz and funk. Its minor quality with a bright natural 6th gives it a smooth, sophisticated sound.' }
        ]
    },
    {
        id: 'blues-scale',
        title: 'The Blues Scale',
        section: 'Beyond the Basics',
        subtitle: 'Adding soul with the "blue note"',
        content: () => `
            <h2>The Blues Scale</h2>
            <p class="subtitle">Adding soul with the "blue note"</p>

            <p>The blues scale is the sound of emotion on guitar. It takes the minor pentatonic (your best friend from earlier) and adds one magical note — the <strong>blue note</strong>.</p>

            <h3>Blues Scale Formula</h3>
            <div class="concept-box">
                <h4>Minor Pentatonic + Blue Note</h4>
                <p>The blues scale = minor pentatonic + flat 5th (tritone)</p>
                <p>Semitones from root: <strong>0, 3, 5, 6, 7, 10</strong></p>
                <p>A blues scale: A, C, D, <span style="color: var(--warning)">Eb</span>, E, G</p>
                <p>The <span style="color: var(--warning)">Eb</span> is the "blue note" — it creates that characteristic tension and grit.</p>
            </div>

            <p>
                <button class="play-btn" onclick="AudioEngine.playSequence(['A2','C3','D3','D#3','E3','G3','A3'], 0.35, 0.5)">Play A Blues Scale</button>
                <button class="play-btn" onclick="AudioEngine.playSequence(['E3','G3','A3','A#3','B3','D4','E4'], 0.35, 0.5)">Play E Blues Scale</button>
            </p>

            <h3>Compare: Pentatonic vs Blues</h3>
            <p>
                <button class="play-btn" onclick="AudioEngine.playSequence(['A2','C3','D3','E3','G3','A3'], 0.35, 0.5)">A Minor Pentatonic</button>
                <button class="play-btn" onclick="AudioEngine.playSequence(['A2','C3','D3','D#3','E3','G3','A3'], 0.35, 0.5)">A Blues Scale</button>
            </p>
            <p>Hear how the blue note adds that extra bite and expressiveness?</p>

            <h3>The Blue Note in Action</h3>
            <div class="concept-box">
                <h4>How to Use the Blue Note</h4>
                <p>The blue note isn't usually a note you <em>land</em> on — it's a note you <em>pass through</em>. Think of it as a spice:</p>
                <ul>
                    <li>Slide through it on the way to the 5th</li>
                    <li>Bend up to it from the 4th</li>
                    <li>Use it as a brief tension note before resolving</li>
                    <li>Don't sit on it too long or it loses its magic</li>
                </ul>
            </div>

            <h3>The 12-Bar Blues</h3>
            <p>The blues scale pairs perfectly with the 12-bar blues progression we learned earlier. Play the blues scale over I7-IV7-V7 dominant seventh chords for authentic blues sound.</p>

            <div class="concept-box tip-box">
                <h4>Every Rock Guitarist Uses This</h4>
                <p>The blues scale is behind the solos of Jimi Hendrix, Eric Clapton, Stevie Ray Vaughan, BB King, Jimmy Page, and virtually every rock and blues guitarist. If you learn one scale for soloing, this is it.</p>
            </div>
        `,
        fretboard: {
            setup: (fb) => {
                fb.highlight(['A', 'C', 'D', 'D#', 'E', 'G'], {
                    'A': 'var(--note-root)', 'C': 'var(--note-third)',
                    'D': 'var(--note-fifth)', 'D#': 'var(--note-seventh)',
                    'E': 'var(--note-fifth)', 'G': 'var(--note-other)'
                });
            }
        },
        quiz: [
            { question: 'What is the blues scale?', options: ['A major scale with a flat 3rd', 'A minor pentatonic with an added flat 5th', 'A chromatic scale', 'A whole tone scale'], correct: 1, explanation: 'The blues scale is the minor pentatonic scale with one added note: the flat 5th (also called the "blue note").' },
            { question: 'What is the "blue note"?', options: ['The root note', 'The flat 5th / tritone', 'The major 3rd', 'The octave'], correct: 1, explanation: 'The blue note is the flat 5th (tritone, 6 semitones from the root). It adds tension and grit to the pentatonic scale.' },
            { question: 'How should you use the blue note?', options: ['Play it as long as possible', 'Avoid it entirely', 'Pass through it briefly for tension and expression', 'Only play it on the first beat'], correct: 2, explanation: 'The blue note works best as a passing tone — slide through it, bend into it, or use it briefly for expression. Sitting on it too long sounds unresolved.' }
        ]
    },
    {
        id: 'ear-training',
        title: 'Ear Training',
        section: 'Beyond the Basics',
        subtitle: 'Train your ears to recognize intervals by sound',
        content: () => `
            <h2>Ear Training</h2>
            <p class="subtitle">Train your ears to recognize intervals by sound</p>

            <p>Being able to <em>hear</em> music — not just read it — is one of the most valuable skills you can develop. Ear training helps you:</p>
            <ul>
                <li>Figure out songs by ear (no tabs needed!)</li>
                <li>Improvise and jam more freely</li>
                <li>Communicate with other musicians</li>
                <li>Understand the music you listen to on a deeper level</li>
            </ul>

            <h3>Interval Recognition</h3>
            <p>In this exercise, you'll hear two notes played one after another. Your job is to identify the interval. Use the reference songs to help:</p>

            <div class="concept-box">
                <h4>Song References for Intervals</h4>
                <ul>
                    <li><strong>Minor 2nd</strong> — "Jaws" theme</li>
                    <li><strong>Major 2nd</strong> — "Happy Birthday" (Hap-py)</li>
                    <li><strong>Minor 3rd</strong> — "Greensleeves" opening</li>
                    <li><strong>Major 3rd</strong> — "When the Saints Go Marching In"</li>
                    <li><strong>Perfect 4th</strong> — "Here Comes the Bride"</li>
                    <li><strong>Tritone</strong> — "The Simpsons" theme (The-Simp)</li>
                    <li><strong>Perfect 5th</strong> — "Star Wars" opening</li>
                    <li><strong>Minor 6th</strong> — "The Entertainer"</li>
                    <li><strong>Major 6th</strong> — "My Bonnie Lies Over the Ocean"</li>
                    <li><strong>Minor 7th</strong> — "Star Trek" theme</li>
                    <li><strong>Major 7th</strong> — "Take On Me" (chorus, Take-On)</li>
                    <li><strong>Octave</strong> — "Somewhere Over the Rainbow" (Some-where)</li>
                </ul>
            </div>

            <div class="concept-box tip-box">
                <h4>Tips for Ear Training</h4>
                <ul>
                    <li>Practice a little bit every day — consistency beats long sessions</li>
                    <li>Start with just a few intervals and add more as you get comfortable</li>
                    <li>Sing the intervals to internalize them</li>
                    <li>Don't get discouraged — this is a skill that improves over time</li>
                </ul>
            </div>

            <p>Try the interactive exercise below! Click "Play Interval" and then guess which interval you heard.</p>
        `,
        quiz: null
    }
];
