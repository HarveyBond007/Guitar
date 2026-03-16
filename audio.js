// ========== Audio Engine ==========
// Synthesizes guitar-like tones using the Web Audio API

const AudioEngine = (() => {
    let audioCtx = null;

    function getContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // Note frequencies (A4 = 440 Hz)
    const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    function noteToFreq(noteName, octave) {
        const noteIndex = NOTE_NAMES.indexOf(noteName);
        if (noteIndex === -1) return 440;
        // Semitones from A4
        const semitonesFromA4 = (octave - 4) * 12 + (noteIndex - 9);
        return 440 * Math.pow(2, semitonesFromA4 / 12);
    }

    function midiToFreq(midi) {
        return 440 * Math.pow(2, (midi - 69) / 12);
    }

    // Parse note string like "E2", "C#4"
    function parseNote(noteStr) {
        const match = noteStr.match(/^([A-G]#?)(\d)$/);
        if (!match) return 440;
        return noteToFreq(match[1], parseInt(match[2]));
    }

    // Play a single note with guitar-like timbre
    function playNote(noteStr, duration = 1.0, startTime = 0) {
        const ctx = getContext();
        const freq = typeof noteStr === 'number' ? midiToFreq(noteStr) : parseNote(noteStr);
        const now = ctx.currentTime + startTime;

        // Fundamental oscillator
        const osc1 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, now);

        // Second harmonic
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2, now);

        // Third harmonic for brightness
        const osc3 = ctx.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(freq * 3, now);

        // Gain for mixing
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        const gain3 = ctx.createGain();
        const masterGain = ctx.createGain();

        gain1.gain.setValueAtTime(0.4, now);
        gain2.gain.setValueAtTime(0.15, now);
        gain3.gain.setValueAtTime(0.05, now);

        // Guitar-like envelope: fast attack, quick decay, sustain, release
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.3, now + 0.005);
        masterGain.gain.exponentialRampToValueAtTime(0.15, now + 0.1);
        masterGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);
        gain1.connect(masterGain);
        gain2.connect(masterGain);
        gain3.connect(masterGain);
        masterGain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc3.start(now);
        osc1.stop(now + duration + 0.1);
        osc2.stop(now + duration + 0.1);
        osc3.stop(now + duration + 0.1);
    }

    // Play multiple notes simultaneously (chord)
    function playChord(noteStrings, duration = 1.5) {
        noteStrings.forEach(n => playNote(n, duration));
    }

    // Play notes sequentially (scale, arpeggio)
    function playSequence(noteStrings, interval = 0.35, duration = 0.5) {
        noteStrings.forEach((n, i) => playNote(n, duration, i * interval));
    }

    // Play an interval: two notes
    function playInterval(note1, note2, simultaneous = false) {
        if (simultaneous) {
            playNote(note1, 1.5);
            playNote(note2, 1.5);
        } else {
            playNote(note1, 1.0, 0);
            playNote(note2, 1.0, 0.6);
        }
    }

    return {
        playNote,
        playChord,
        playSequence,
        playInterval,
        parseNote,
        noteToFreq,
        NOTE_NAMES,
        getContext
    };
})();
