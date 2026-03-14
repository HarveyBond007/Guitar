// ========== Interactive Fretboard ==========

const Fretboard = (() => {
    const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const ENHARMONIC = { 'Db': 'C#', 'Eb': 'D#', 'Fb': 'E', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#', 'Cb': 'B' };

    // Standard tuning: E2 A2 D3 G3 B3 E4 (low to high string)
    const STANDARD_TUNING = [
        { note: 'E', octave: 2 },  // 6th string (thickest)
        { note: 'A', octave: 2 },
        { note: 'D', octave: 3 },
        { note: 'G', octave: 3 },
        { note: 'B', octave: 3 },
        { note: 'E', octave: 4 },  // 1st string (thinnest)
    ];

    const NUM_FRETS = 15;
    const FRET_MARKERS = [3, 5, 7, 9, 12, 15];
    const DOUBLE_MARKERS = [12];

    // Layout constants
    const LEFT_MARGIN = 40;
    const TOP_MARGIN = 30;
    const FRET_WIDTH = 56;
    const STRING_SPACING = 28;
    const NUT_X = LEFT_MARGIN + 15;

    let highlightedNotes = new Set();
    let noteColors = {};
    let showAll = false;

    function normalizeNote(name) {
        return ENHARMONIC[name] || name;
    }

    function getNoteAtFret(stringIndex, fret) {
        const open = STANDARD_TUNING[stringIndex];
        const openIndex = NOTE_NAMES.indexOf(open.note);
        const noteIndex = (openIndex + fret) % 12;
        const octave = open.octave + Math.floor((openIndex + fret) / 12);
        return { name: NOTE_NAMES[noteIndex], octave };
    }

    function getNoteMidi(stringIndex, fret) {
        const open = STANDARD_TUNING[stringIndex];
        const openMidi = (open.octave + 1) * 12 + NOTE_NAMES.indexOf(open.note);
        return openMidi + fret;
    }

    function render(container) {
        const svgWidth = LEFT_MARGIN + 20 + (NUM_FRETS + 1) * FRET_WIDTH + 20;
        const svgHeight = TOP_MARGIN + (STANDARD_TUNING.length - 1) * STRING_SPACING + 50;

        let svg = `<svg class="fretboard-svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">`;

        // Fret markers (dots on guitar body)
        FRET_MARKERS.forEach(fret => {
            const x = NUT_X + (fret - 0.5) * FRET_WIDTH;
            const yMid = TOP_MARGIN + 2.5 * STRING_SPACING;
            if (DOUBLE_MARKERS.includes(fret)) {
                svg += `<circle class="fret-marker" cx="${x}" cy="${yMid - 18}" r="6"/>`;
                svg += `<circle class="fret-marker" cx="${x}" cy="${yMid + 18}" r="6"/>`;
            } else {
                svg += `<circle class="fret-marker" cx="${x}" cy="${yMid}" r="6"/>`;
            }
        });

        // Nut
        svg += `<line class="nut-line" x1="${NUT_X}" y1="${TOP_MARGIN - 4}" x2="${NUT_X}" y2="${TOP_MARGIN + 5 * STRING_SPACING + 4}"/>`;

        // Fret lines
        for (let f = 1; f <= NUM_FRETS; f++) {
            const x = NUT_X + f * FRET_WIDTH;
            svg += `<line class="fret-line" x1="${x}" y1="${TOP_MARGIN - 2}" x2="${x}" y2="${TOP_MARGIN + 5 * STRING_SPACING + 2}"/>`;
        }

        // Fret numbers
        for (let f = 1; f <= NUM_FRETS; f++) {
            const x = NUT_X + (f - 0.5) * FRET_WIDTH;
            svg += `<text class="fret-number" x="${x}" y="${TOP_MARGIN + 5 * STRING_SPACING + 24}">${f}</text>`;
        }

        // Strings
        STANDARD_TUNING.forEach((s, i) => {
            const y = TOP_MARGIN + i * STRING_SPACING;
            const thick = i <= 2 ? ' thick' : '';
            svg += `<line class="string-line${thick}" x1="${NUT_X}" y1="${y}" x2="${NUT_X + NUM_FRETS * FRET_WIDTH}" y2="${y}"/>`;
        });

        // String names (to the left)
        STANDARD_TUNING.forEach((s, i) => {
            const y = TOP_MARGIN + i * STRING_SPACING;
            svg += `<text class="string-name" x="${LEFT_MARGIN - 8}" y="${y + 1}" dominant-baseline="central">${s.note}</text>`;
        });

        // Notes
        STANDARD_TUNING.forEach((s, stringIdx) => {
            for (let fret = 0; fret <= NUM_FRETS; fret++) {
                const noteInfo = getNoteAtFret(stringIdx, fret);
                const noteName = noteInfo.name;
                const isHighlighted = highlightedNotes.has(noteName);
                const shouldShow = showAll || isHighlighted;

                if (!shouldShow) continue;

                const x = fret === 0 ? NUT_X - 12 : NUT_X + (fret - 0.5) * FRET_WIDTH;
                const y = TOP_MARGIN + stringIdx * STRING_SPACING;
                const color = noteColors[noteName] || 'var(--note-default)';
                const noteStr = noteName + noteInfo.octave;

                svg += `<circle class="note-dot" cx="${x}" cy="${y}" r="13" fill="${color}" data-note="${noteStr}" data-string="${stringIdx}" data-fret="${fret}" onclick="Fretboard.onNoteClick('${noteStr}')"/>`;
                svg += `<text class="note-label" x="${x}" y="${y}">${noteName}</text>`;
            }
        });

        svg += '</svg>';
        container.innerHTML = svg;
    }

    function onNoteClick(noteStr) {
        AudioEngine.playNote(noteStr, 1.0);
    }

    function highlight(notes, colors = {}) {
        highlightedNotes = new Set(notes.map(normalizeNote));
        noteColors = {};
        for (const [note, color] of Object.entries(colors)) {
            noteColors[normalizeNote(note)] = color;
        }
        // Default color for notes without a specific color
        highlightedNotes.forEach(n => {
            if (!noteColors[n]) noteColors[n] = 'var(--note-default)';
        });
    }

    function clear() {
        highlightedNotes.clear();
        noteColors = {};
    }

    function setShowAll(val) {
        showAll = val;
    }

    function getShowAll() {
        return showAll;
    }

    // Highlight a scale with degree-based coloring
    function highlightScale(rootNote, intervals, labels) {
        const root = normalizeNote(rootNote);
        const rootIdx = NOTE_NAMES.indexOf(root);
        const colors = {};
        const notes = [];
        const degreeColors = [
            'var(--note-root)', 'var(--note-other)', 'var(--note-third)',
            'var(--note-other)', 'var(--note-fifth)', 'var(--note-other)',
            'var(--note-seventh)'
        ];

        intervals.forEach((semitones, i) => {
            const noteIdx = (rootIdx + semitones) % 12;
            const note = NOTE_NAMES[noteIdx];
            notes.push(note);
            colors[note] = degreeColors[i] || 'var(--note-other)';
        });

        highlight(notes, colors);
        return notes;
    }

    // Highlight a chord with root/third/fifth coloring
    function highlightChord(rootNote, semitoneIntervals) {
        const root = normalizeNote(rootNote);
        const rootIdx = NOTE_NAMES.indexOf(root);
        const colors = {};
        const notes = [];
        const chordColors = ['var(--note-root)', 'var(--note-third)', 'var(--note-fifth)', 'var(--note-seventh)'];

        semitoneIntervals.forEach((s, i) => {
            const noteIdx = (rootIdx + s) % 12;
            const note = NOTE_NAMES[noteIdx];
            notes.push(note);
            colors[note] = chordColors[i] || 'var(--note-other)';
        });

        highlight(notes, colors);
        return notes;
    }

    return {
        render,
        highlight,
        highlightScale,
        highlightChord,
        clear,
        setShowAll,
        getShowAll,
        onNoteClick,
        getNoteAtFret,
        NOTE_NAMES,
        STANDARD_TUNING,
        normalizeNote
    };
})();
