/**
 * Audio Synthesizer & Player for Digital Baby Shower Invitations.
 * Generates an enchanting music-box lullaby melody (Brahms Lullaby) using Web Audio API
 * so that music ALWAYS works reliably without broken external MP3 links or CORS blocks,
 * with support for custom audio URLs when provided.
 */

class InvitationAudioController {
  private ctx: AudioContext | null = null;
  private isSynthesizerRunning = false;
  private timeoutId: any = null;
  private customAudio: HTMLAudioElement | null = null;
  private currentVolume = 0.45;
  private listeners: ((playing: boolean) => void)[] = [];
  public isPlayingState = false;

  private notes: { freq: number; dur: number }[] = [
    // Brahms Lullaby melody note frequencies (Hz) & durations (seconds)
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 440.00, dur: 1.1 }, // Bb4 / A4
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 440.00, dur: 1.2 }, // A4
    { freq: 392.00, dur: 0.5 }, // G4
    { freq: 523.25, dur: 0.9 }, // C5
    { freq: 493.88, dur: 0.5 }, // B4
    { freq: 440.00, dur: 0.6 }, // A4
    { freq: 392.00, dur: 0.9 }, // G4
    { freq: 329.63, dur: 0.6 }, // E4
    { freq: 349.23, dur: 0.6 }, // F4
    { freq: 392.00, dur: 1.2 }, // G4
    { freq: 349.23, dur: 0.6 }, // F4
    { freq: 329.63, dur: 0.6 }, // E4
    { freq: 293.66, dur: 1.4 }, // D4
    // Second phrase
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 440.00, dur: 1.1 }, // A4
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 440.00, dur: 1.2 }, // A4
    { freq: 392.00, dur: 0.5 }, // G4
    { freq: 587.33, dur: 0.9 }, // D5
    { freq: 523.25, dur: 0.5 }, // C5
    { freq: 493.88, dur: 0.6 }, // B4
    { freq: 440.00, dur: 0.9 }, // A4
    { freq: 523.25, dur: 1.6 }, // C5
  ];

  private currentNoteIndex = 0;

  constructor() {
    // Lazy initialized on first user interaction
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.push(listener);
    listener(this.isPlayingState);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.isPlayingState));
  }

  private initAudioContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playMusicBoxNote(freq: number, duration: number) {
    if (!this.ctx || !this.isSynthesizerRunning) return;

    try {
      const now = this.ctx.currentTime;
      
      // Main chime tone (sine)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Subtle harmonic overtone (gives music box sparkle)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now); // 1 octave higher overtone

      const masterVolume = this.currentVolume;

      // Bell envelope (instant attack, gentle decay)
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(masterVolume * 0.45, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.8);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(masterVolume * 0.15, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);

      osc.stop(now + duration * 2);
      osc2.stop(now + duration * 2);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  private stepMelody() {
    if (!this.isSynthesizerRunning) return;

    const note = this.notes[this.currentNoteIndex];
    this.playMusicBoxNote(note.freq, note.dur);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.notes.length;

    // Interval before next note
    const delay = note.dur * 850;
    this.timeoutId = setTimeout(() => {
      this.stepMelody();
    }, delay);
  }

  public play(customUrl?: string) {
    if (customUrl) {
      if (!this.customAudio || this.customAudio.src !== customUrl) {
        if (this.customAudio) {
          this.customAudio.pause();
        }
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
        this.customAudio.volume = this.currentVolume;
      }
      this.customAudio.play().then(() => {
        this.isPlayingState = true;
        this.notify();
      }).catch(() => {
        // Fallback to synth if custom url fails
        this.startSynth();
      });
      return;
    }

    this.startSynth();
  }

  private startSynth() {
    this.initAudioContext();
    if (this.isSynthesizerRunning) return;

    this.isSynthesizerRunning = true;
    this.isPlayingState = true;
    this.notify();
    this.stepMelody();
  }

  public pause() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.isSynthesizerRunning = false;

    if (this.customAudio) {
      this.customAudio.pause();
    }

    this.isPlayingState = false;
    this.notify();
  }

  public toggle(customUrl?: string) {
    if (this.isPlayingState) {
      this.pause();
    } else {
      this.play(customUrl);
    }
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.customAudio) {
      this.customAudio.volume = this.currentVolume;
    }
  }
}

export const audioPlayer = new InvitationAudioController();
