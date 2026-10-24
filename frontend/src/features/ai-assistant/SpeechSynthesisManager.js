/**
 * SpeechSynthesisManager
 * Handles text-to-speech (TTS) for the AI Lab Assistant using the Web Speech API.
 * Cleans markdown formatting, manages playback states (play, pause, stop),
 * prevents overlapping audio, fixes Chromium pause/resume quirks, and provides natural voices.
 */

export const TTS_STATES = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  STOPPED: 'stopped',
};

export class SpeechSynthesisManager {
  /**
   * @param {SpeechSynthesis|null} synth Optional SpeechSynthesis instance (for testing or custom injection)
   * @param {typeof SpeechSynthesisUtterance|null} utteranceConstructor Optional Utterance class
   */
  constructor(synth = null, utteranceConstructor = null) {
    this.synth =
      synth || (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null);
    this.utteranceConstructor =
      utteranceConstructor ||
      (typeof window !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined'
        ? window.SpeechSynthesisUtterance
        : null);

    this.playbackState = TTS_STATES.IDLE;
    this.currentUtterance = null;
    this.activeMessageId = null;
    this.activeText = '';
    this.charIndex = 0;
    this.callbacks = null;
    this.cachedVoice = null;
    this.keepAliveTimer = null;

    if (this.synth) {
      // Chrome/Edge load voices asynchronously
      if (typeof window !== 'undefined' && typeof window.speechSynthesis?.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => {
          this.cachedVoice = this.pickBestVoice();
        };
      }
    }
  }

  isSupported() {
    const hasUtterance =
      Boolean(this.utteranceConstructor) ||
      (typeof window !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined');
    return Boolean(this.synth && hasUtterance);
  }

  /**
   * Returns current internal playback state ('idle' | 'playing' | 'paused' | 'stopped').
   */
  getState() {
    return this.playbackState;
  }

  /**
   * Selects the highest quality natural-sounding English voice available.
   */
  pickBestVoice() {
    if (!this.synth || typeof this.synth.getVoices !== 'function') return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    // Prefer Google, Microsoft Natural, or Apple English voices
    const preferred = voices.find(
      (v) =>
        v.lang?.startsWith('en') &&
        (v.name.includes('Google') ||
          v.name.includes('Natural') ||
          v.name.includes('Samantha') ||
          v.name.includes('Daniel') ||
          v.name.includes('Jenny'))
    );

    if (preferred) return preferred;

    // Fallback to any en-US or en-GB voice
    const englishVoice = voices.find((v) => v.lang === 'en-US' || v.lang?.startsWith('en'));
    return englishVoice || voices[0] || null;
  }

  /**
   * Sanitizes markdown, equations, and chemical symbols into natural conversational speech.
   * @param {string} text Raw markdown or text from AI response
   * @returns {string} Clean readable text for speech synthesis
   */
  sanitizeTextForSpeech(text) {
    if (!text) return '';

    let clean = String(text);

    // Remove code blocks
    clean = clean.replace(/```[\s\S]*?```/g, 'Code block omitted.');

    // Remove inline code
    clean = clean.replace(/`([^`]+)`/g, '$1');

    // Remove image and markdown links [text](url) -> text
    clean = clean.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');
    clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // Translate LaTeX fractions: \frac{A}{B} -> A over B
    clean = clean.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2');

    // Translate reaction arrows and mathematical relations
    clean = clean
      .replace(/\\longrightarrow|\\rightarrow|-->|->/g, ' yields ')
      .replace(/\\longleftarrow|\\leftarrow|<--|<-/g, ' from ')
      .replace(/\\longleftrightarrow|\\rightleftharpoons|<=>/g, ' in equilibrium with ')
      .replace(/\\Delta|\\delta|Δ/g, 'delta ')
      .replace(/\\Lambda|\\lambda|Λ|λ/g, 'lambda ')
      .replace(/\\kappa|κ/g, 'kappa ')
      .replace(/\\epsilon|ε/g, 'epsilon ')
      .replace(/\\cdot|\\times|×/g, ' times ')
      .replace(/\\approx|≈/g, ' approximately ')
      .replace(/\\pm|±/g, 'plus or minus ')
      .replace(/\\le|\\leq|≤/g, ' less than or equal to ')
      .replace(/\\ge|\\geq|≥/g, ' greater than or equal to ')
      .replace(/\\log_\{?10\}?/g, 'log base 10 of ')
      .replace(/\\log/g, 'log of ')
      .replace(/\\ln/g, 'natural log of ');

    // Translate chemistry state symbols: \text{(aq)}, \text{(s)}, etc.
    clean = clean
      .replace(/\\text\{\(aq\)\}|\(aq\)/gi, 'aqueous')
      .replace(/\\text\{\(s\)\}|\(s\)/gi, 'solid')
      .replace(/\\text\{\(l\)\}|\(l\)/gi, 'liquid')
      .replace(/\\text\{\(g\)\}|\(g\)/gi, 'gas');

    // Strip \text{...} wrappers to content
    clean = clean.replace(/\\text\{([^}]+)\}/g, '$1');

    // Strip display equation delimiters $$...$$ and inline $...$
    clean = clean.replace(/\$\$([\s\S]*?)\$\$/g, ' $1 ');
    clean = clean.replace(/\$([^$]+)\$/g, ' $1 ');

    // Remove markdown headers
    clean = clean.replace(/^#{1,6}\s+(.*)$/gm, '$1.');

    // Remove bold and italics
    clean = clean.replace(/\*\*([^*]+)\*\*/g, '$1');
    clean = clean.replace(/\*([^*]+)\*/g, '$1');
    clean = clean.replace(/__([^_]+)__/g, '$1');
    clean = clean.replace(/_([^_]+)_/g, '$1');

    // Convert bullet points to natural commas/pauses
    clean = clean.replace(/^\s*[-*•]\s+/gm, ' ');

    // Normalize chemistry acronyms and special symbols for clear pronunciation
    clean = clean
      .replace(/CH₃COOH|CH3COOH/g, 'acetic acid')
      .replace(/NaOH/g, 'sodium hydroxide')
      .replace(/HCl/g, 'H C L')
      .replace(/CH₃COONa|CH3COONa/g, 'sodium acetate')
      .replace(/H₂O|H2O/g, 'water')
      .replace(/µS\/cm|uS\/cm/g, 'micro Siemens per centimeter')
      .replace(/mS\/cm/g, 'milli Siemens per centimeter')
      .replace(/mol\/L/g, 'moles per liter')
      .replace(/ΔpH\/ΔV|delta pH\/delta V/g, 'delta pH over delta V')
      .replace(/Δ²pH\/ΔV²|Δ2pH\/ΔV2/g, 'second derivative delta two pH over delta V squared')
      .replace(/°C/g, 'degrees Celsius')
      .replace(/λ°/g, 'limiting ionic conductance')
      .replace(/pKa|pK_a/gi, 'p K a')
      .replace(/EDTA/g, 'E D T A')
      .replace(/KMnO₄|KMnO4/g, 'potassium permanganate')
      .replace(/FeSO₄|FeSO4/g, 'ferrous sulfate')
      .replace(/H₂SO₄|H2SO4/g, 'sulfuric acid')
      .replace(/HNO₃|HNO3/g, 'nitric acid')
      .replace(/CaCO₃|CaCO3/g, 'calcium carbonate')
      .replace(/NaCl/g, 'sodium chloride');

    // Remove remaining backslashes, braces, and math symbols
    clean = clean.replace(/[\\[\]{}]/g, ' ');
    clean = clean.replace(/[*_#~>|]/g, '');
    clean = clean.replace(/\s+/g, ' ').trim();

    return clean;
  }

  /**
   * Speaks the provided text for a specific message bubble.
   * Cancels any ongoing speech automatically to prevent overlapping audio.
   * @param {string} text
   * @param {string|number} messageId
   * @param {object} callbacks { onStart, onEnd, onError, onPause, onResume }
   */
  speak(text, messageId, callbacks = {}) {
    if (!this.isSupported()) {
      if (typeof callbacks.onError === 'function') {
        callbacks.onError(new Error('Speech synthesis is not supported in this browser.'));
      }
      return false;
    }

    // If currently playing or paused, stop cleanly before starting new speech
    if (this.playbackState !== TTS_STATES.IDLE && this.playbackState !== TTS_STATES.STOPPED) {
      this.stop();
    }

    const cleanText = this.sanitizeTextForSpeech(text);
    if (!cleanText) {
      if (typeof callbacks.onEnd === 'function') callbacks.onEnd();
      return false;
    }

    const UtteranceClass =
      this.utteranceConstructor ||
      (typeof window !== 'undefined' ? window.SpeechSynthesisUtterance : null);

    if (!UtteranceClass) {
      if (typeof callbacks.onError === 'function') {
        callbacks.onError(new Error('SpeechSynthesisUtterance constructor is unavailable.'));
      }
      return false;
    }

    try {
      const utterance = new UtteranceClass(cleanText);
      this.currentUtterance = utterance;
      this.activeMessageId = messageId;
      this.activeText = cleanText;
      this.charIndex = 0;
      this.callbacks = callbacks;
      this.playbackState = TTS_STATES.PLAYING;

      // Configure voice, pitch, and speed
      const voice = this.cachedVoice || this.pickBestVoice();
      if (voice) {
        utterance.voice = voice;
      }
      utterance.lang = voice?.lang || 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        if (this.currentUtterance !== utterance) return;
        this.playbackState = TTS_STATES.PLAYING;
        this.startKeepAlive();
        if (typeof this.callbacks?.onStart === 'function') {
          this.callbacks.onStart();
        }
      };

      utterance.onboundary = (event) => {
        if (this.currentUtterance !== utterance) return;
        if (event && typeof event.charIndex === 'number' && event.charIndex >= 0) {
          this.charIndex = event.charIndex;
        }
      };

      utterance.onpause = () => {
        if (this.currentUtterance !== utterance) return;
        this.stopKeepAlive();
        const wasPlaying = this.playbackState === TTS_STATES.PLAYING;
        this.playbackState = TTS_STATES.PAUSED;
        if (wasPlaying && typeof this.callbacks?.onPause === 'function') {
          this.callbacks.onPause();
        }
      };

      utterance.onresume = () => {
        if (this.currentUtterance !== utterance) return;
        this.startKeepAlive();
        const wasPaused = this.playbackState === TTS_STATES.PAUSED;
        this.playbackState = TTS_STATES.PLAYING;
        if (wasPaused && typeof this.callbacks?.onResume === 'function') {
          this.callbacks.onResume();
        }
      };

      utterance.onend = () => {
        if (this.currentUtterance !== utterance) return;
        this.stopKeepAlive();
        this.playbackState = TTS_STATES.IDLE;
        const cb = this.callbacks?.onEnd;
        this.cleanupPlayback();
        if (typeof cb === 'function') {
          cb();
        }
      };

      utterance.onerror = (event) => {
        if (this.currentUtterance !== utterance) return;
        this.stopKeepAlive();

        // CRITICAL ROOT-CAUSE FIX FOR CHROMIUM ON WINDOWS:
        // When speech is paused in Chromium, the browser engine dispatches an 'interrupted' error event.
        // We MUST NOT destroy the paused state or discard the active utterance when interrupted occurs during pause!
        if (this.playbackState === TTS_STATES.PAUSED && event?.error === 'interrupted') {
          return;
        }

        // 'canceled' or 'interrupted' is expected when speech is stopped intentionally
        if (event?.error === 'canceled' || event?.error === 'interrupted') {
          this.playbackState = TTS_STATES.IDLE;
          const cb = this.callbacks?.onEnd;
          this.cleanupPlayback();
          if (typeof cb === 'function') cb();
          return;
        }

        console.warn('SpeechSynthesis error:', event?.error);
        this.playbackState = TTS_STATES.IDLE;
        const errCb = this.callbacks?.onError;
        this.cleanupPlayback();
        if (typeof errCb === 'function') {
          errCb(new Error(event?.error || 'Speech playback failed.'));
        }
      };

      this.synth.speak(utterance);
      this.startKeepAlive();
      return true;
    } catch (err) {
      console.error('Failed to invoke SpeechSynthesis.speak:', err);
      this.cleanupPlayback();
      this.playbackState = TTS_STATES.IDLE;
      if (typeof callbacks.onError === 'function') {
        callbacks.onError(err);
      }
      return false;
    }
  }

  /**
   * Pauses current speech playback without losing position.
   */
  pause() {
    if (!this.synth) return;
    if (this.playbackState !== TTS_STATES.PLAYING) return;

    this.stopKeepAlive();
    this.playbackState = TTS_STATES.PAUSED;

    try {
      this.synth.pause();
    } catch (err) {
      console.warn('Error during synth.pause():', err);
    }

    if (typeof this.callbacks?.onPause === 'function') {
      this.callbacks.onPause();
    }
  }

  /**
   * Resumes paused speech playback of the existing utterance.
   * Does NOT recreate an utterance unless the browser discarded it.
   */
  resume() {
    if (!this.synth) return;
    if (this.playbackState !== TTS_STATES.PAUSED) return;

    if (!this.currentUtterance) {
      this.handleLostUtteranceRecovery();
      return;
    }

    this.playbackState = TTS_STATES.PLAYING;

    try {
      this.synth.resume();
    } catch (err) {
      console.warn('Error during synth.resume():', err);
    }

    this.startKeepAlive();

    if (typeof this.callbacks?.onResume === 'function') {
      this.callbacks.onResume();
    }

    // Graceful recovery check:
    // If the browser engine dropped the utterance from its queue during pause,
    // verify after a brief tick and recover smoothly.
    if (typeof setTimeout !== 'undefined') {
      setTimeout(() => {
        if (
          this.playbackState === TTS_STATES.PLAYING &&
          this.synth &&
          !this.synth.speaking &&
          !this.synth.paused
        ) {
          this.handleLostUtteranceRecovery();
        }
      }, 350);
    }
  }

  /**
   * Cancels and stops speech immediately and resets playback state.
   */
  stop() {
    this.stopKeepAlive();
    this.playbackState = TTS_STATES.STOPPED;

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (err) {
        console.warn('Error during synth.cancel():', err);
      }
    }

    const cb = this.callbacks?.onEnd;
    this.cleanupPlayback();
    this.playbackState = TTS_STATES.IDLE;

    if (typeof cb === 'function') {
      cb();
    }
  }

  /**
   * Checks if audio is currently playing for this message (or any message if omitted).
   * @param {string|number} [messageId]
   */
  isPlaying(messageId) {
    if (messageId !== undefined && messageId !== null) {
      return this.playbackState === TTS_STATES.PLAYING && String(this.activeMessageId) === String(messageId);
    }
    return this.playbackState === TTS_STATES.PLAYING;
  }

  /**
   * Checks if audio is paused for this message (or any message if omitted).
   * @param {string|number} [messageId]
   */
  isPaused(messageId) {
    if (messageId !== undefined && messageId !== null) {
      return this.playbackState === TTS_STATES.PAUSED && String(this.activeMessageId) === String(messageId);
    }
    return this.playbackState === TTS_STATES.PAUSED;
  }

  /**
   * Returns whether any speech is currently active or paused.
   */
  hasActiveSpeech() {
    return this.playbackState === TTS_STATES.PLAYING || this.playbackState === TTS_STATES.PAUSED;
  }

  /**
   * Internal cleanup of active utterance, message ID, and callbacks.
   */
  cleanupPlayback() {
    this.currentUtterance = null;
    this.activeMessageId = null;
    this.activeText = '';
    this.charIndex = 0;
    this.callbacks = null;
  }

  /**
   * Chromium 15-second speech freeze workaround.
   * Periodically triggers pause/resume while playing to keep long utterances alive.
   */
  startKeepAlive() {
    this.stopKeepAlive();
    if (typeof setInterval === 'undefined') return;

    this.keepAliveTimer = setInterval(() => {
      if (
        this.playbackState === TTS_STATES.PLAYING &&
        this.synth &&
        this.synth.speaking &&
        !this.synth.paused
      ) {
        try {
          this.synth.pause();
          this.synth.resume();
        } catch (e) {
          // Ignore keepalive hiccups
        }
      }
    }, 10000);
  }

  stopKeepAlive() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  /**
   * Graceful recovery if the browser drops or cancels an utterance unexpectedly.
   */
  handleLostUtteranceRecovery() {
    if (this.activeMessageId && this.activeText) {
      const remaining = this.charIndex > 0 ? this.activeText.slice(this.charIndex).trim() : this.activeText;
      if (remaining) {
        const msgId = this.activeMessageId;
        const cb = this.callbacks;
        this.stopKeepAlive();
        this.cleanupPlayback();
        this.speak(remaining, msgId, cb);
        return;
      }
    }
    this.stop();
  }
}

export const speechSynthesisManager = new SpeechSynthesisManager();

