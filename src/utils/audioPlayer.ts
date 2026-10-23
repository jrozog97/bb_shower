/**
 * Universal Mobile & Desktop Audio Controller for Baby Shower Invitations.
 * Optimized specifically for iOS Safari, Android Chrome, Samsung Internet and Desktop.
 *
 * Implements a dual-engine architecture:
 * 1. Native HTML5 <audio> with mobile attributes (playsInline, webkitPlaysInline)
 *    and local /assets/lullaby.mp3 for crystal-clear, zero-lag playback on mobile speakers.
 * 2. Web Audio API synthesizer with iOS unlock & DynamicsCompressorNode as immediate fallback.
 */

class UniversalInvitationAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private isSynthesizerRunning = false;
  private timeoutId: any = null;
  private currentVolume = 0.65; // Optimized for mobile phone speakers
  private listeners: ((playing: boolean) => void)[] = [];
  public isPlayingState = false;
  private isUnlocked = false;

  private defaultAudioUrl = '/assets/lullaby.mp3';

  // Notes for Web Audio synthesizer fallback (Brahms Lullaby)
  private notes: { freq: number; dur: number }[] = [
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 440.00, dur: 1.1 }, // A4
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
    this.setupGlobalUnlockListeners();
  }

  /**
   * Set up passive listeners on first touch/click to unlock WebKit/Blink audio
   * immediately upon user interaction on mobile phones.
   */
  private setupGlobalUnlockListeners() {
    if (typeof window === 'undefined') return;

    const unlockHandler = () => {
      this.unlockMobileAudio();
      window.removeEventListener('touchstart', unlockHandler, true);
      window.removeEventListener('touchend', unlockHandler, true);
      window.removeEventListener('pointerdown', unlockHandler, true);
      window.removeEventListener('click', unlockHandler, true);
    };

    window.addEventListener('touchstart', unlockHandler, { capture: true, passive: true });
    window.addEventListener('touchend', unlockHandler, { capture: true, passive: true });
    window.addEventListener('pointerdown', unlockHandler, { capture: true, passive: true });
    window.addEventListener('click', unlockHandler, { capture: true, passive: true });
  }

  /**
   * Unlocks both HTML5 Audio and Web Audio contexts synchronously during a touch gesture.
   */
  public unlockMobileAudio() {
    if (this.isUnlocked) return;
    this.isUnlocked = true;

    // 1. Prepare HTML5 Audio element for mobile
    try {
      if (!this.audioElement) {
        this.initHtmlAudio(this.defaultAudioUrl);
      }
    } catch (e) {
      console.warn('HTML5 audio init error', e);
    }

    // 2. Unlock Web Audio Context for iOS Safari
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass && !this.ctx) {
        this.ctx = new AudioCtxClass();
      }
      if (this.ctx) {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        // Play 1-sample silent buffer (essential to unlock iOS WebKit audio hardware)
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);
      }
    } catch (e) {
      console.warn('WebAudio unlock error', e);
    }
  }

  private initHtmlAudio(url: string): HTMLAudioElement {
    if (!this.audioElement) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.loop = true;
      audio.volume = this.currentVolume;

      // Essential iOS Safari / Android attributes
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');
      audio.setAttribute('x-webkit-airplay', 'allow');

      audio.addEventListener('ended', () => {
        if (this.isPlayingState) {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        }
      });

      audio.addEventListener('error', () => {
        console.warn('Audio element error, falling back to synthesizer...');
        if (this.isPlayingState) {
          this.startSynth();
        }
      });

      this.audioElement = audio;
    }

    if (this.audioElement.src !== url && !this.audioElement.src.endsWith(url)) {
      this.audioElement.src = url;
      this.audioElement.load();
    }

    return this.audioElement;
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

  /**
   * Plays music using the best available engine (HTML5 Audio or Web Audio Synthesizer).
   */
  public play(customUrl?: string) {
    this.unlockMobileAudio();

    const targetUrl = customUrl || this.defaultAudioUrl;
    const audio = this.initHtmlAudio(targetUrl);

    this.isPlayingState = true;
    this.notify();

    // Try HTML5 audio playback first (ideal for mobile speakers and battery)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlayingState = true;
          this.notify();
        })
        .catch((err) => {
          console.log('HTML5 play blocked or deferred, activating synthesizer fallback:', err);
          // Fall back to Web Audio Synthesizer
          this.startSynth();
        });
    }
  }

  /**
   * Pauses all music engines immediately.
   */
  public pause() {
    this.isPlayingState = false;
    this.notify();

    if (this.audioElement) {
      try {
        this.audioElement.pause();
      } catch (e) {
        // ignore
      }
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.isSynthesizerRunning = false;
  }

  /**
   * Toggles play/pause state.
   */
  public toggle(customUrl?: string) {
    if (this.isPlayingState) {
      this.pause();
    } else {
      this.play(customUrl);
    }
  }

  /**
   * Adjusts volume across all engines.
   */
  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.currentVolume;
    }
  }

  // =========================================================================
  // WEB AUDIO SYNTHESIZER FALLBACK (WITH MOBILE COMPRESSOR & HARMONICS)
  // =========================================================================

  private initAudioContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }

    // Set up master compressor to ensure clarity on tiny smartphone speakers
    if (!this.compressor && this.ctx) {
      try {
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-24, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(12, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);
        this.compressor.connect(this.ctx.destination);
      } catch (e) {
        // ignore
      }
    }
  }

  private startSynth() {
    this.initAudioContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.runSynthLoop();
      }).catch(() => {
        this.runSynthLoop();
      });
    } else {
      this.runSynthLoop();
    }
  }

  private runSynthLoop() {
    if (this.isSynthesizerRunning) return;
    this.isSynthesizerRunning = true;
    this.isPlayingState = true;
    this.notify();
    this.stepMelody();
  }

  private playMusicBoxNote(freq: number, duration: number) {
    if (!this.ctx || !this.isSynthesizerRunning) return;

    try {
      const now = Math.max(this.ctx.currentTime, 0.05);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now); // 1 octave higher for music box sparkle

      const masterVol = this.currentVolume;

      // Safe envelope scheduling (never throws on suspended resume)
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(masterVol * 0.55, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.8);

      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.linearRampToValueAtTime(masterVol * 0.22, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.2);

      const dest = this.compressor || this.ctx.destination;

      osc.connect(gain);
      gain.connect(dest);

      osc2.connect(gain2);
      gain2.connect(dest);

      osc.start(now);
      osc2.start(now);

      osc.stop(now + duration * 2);
      osc2.stop(now + duration * 2);
    } catch (e) {
      console.warn('Synth playback error', e);
    }
  }

  private stepMelody() {
    if (!this.isSynthesizerRunning) return;

    const note = this.notes[this.currentNoteIndex];
    this.playMusicBoxNote(note.freq, note.dur);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.notes.length;

    const delay = note.dur * 860;
    this.timeoutId = setTimeout(() => {
      this.stepMelody();
    }, delay);
  }
}

export const audioPlayer = new UniversalInvitationAudioController();
