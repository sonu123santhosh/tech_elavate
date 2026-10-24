/**
 * SpeechRecognitionManager
 * Handles speech-to-text (STT) for the AI Lab Assistant using the Web Speech API.
 * Provides real-time interim results, handles permissions, visual states, and error recoveries.
 */

export const SPEECH_STATES = {
  READY: 'ready',
  LISTENING: 'listening',
  PROCESSING: 'processing',
  ERROR: 'error',
};

export class SpeechRecognitionManager {
  constructor() {
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

    this.RecognitionClass = SpeechRecognition;
    this.recognition = null;
    this.state = SPEECH_STATES.READY;
    this.callbacks = null;
    this.finalTranscript = '';
    this.interimTranscript = '';
    this.silenceTimer = null;
    this.networkRetryCount = 0;
    this.isManualStop = false;
  }

  /**
   * Check if the browser supports Web Speech API speech recognition.
   */
  isSupported() {
    return Boolean(this.RecognitionClass);
  }

  /**
   * Returns current operational state: 'ready' | 'listening' | 'processing' | 'error'
   */
  getState() {
    return this.state;
  }

  /**
   * Starts a speech recognition session upon user activation.
   * @param {object} callbacks { onStateChange, onInterimResult, onFinalResult, onError }
   * @param {object} options { continuous: boolean, lang: string, isRetry: boolean }
   */
  startListening(callbacks = {}, options = {}) {
    if (!this.isSupported()) {
      const err = new Error(
        'Speech recognition is not supported in this browser. Please use Chrome, Edge, Safari, or type in the chat box.'
      );
      this.state = SPEECH_STATES.ERROR;
      if (typeof callbacks.onError === 'function') callbacks.onError(err);
      return false;
    }

    if (!options.isRetry) {
      this.networkRetryCount = 0;
    }

    // Stop any existing session
    this.cancelListening();

    this.callbacks = callbacks;
    this.finalTranscript = '';
    this.interimTranscript = '';
    this.isManualStop = false;

    try {
      this.recognition = new this.RecognitionClass();
      // In Chromium, continuous: true opens a streaming websocket to Google's speech cloud that frequently
      // terminates with event.error === 'network'. Single-utterance mode (continuous: false) is robust,
      // completes cleanly when the user pauses, and prevents socket network drops.
      this.recognition.continuous = Boolean(options.continuous);
      this.recognition.interimResults = true;
      this.recognition.lang = options.lang || 'en-US';
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.state = SPEECH_STATES.LISTENING;
        this.notifyStateChange(SPEECH_STATES.LISTENING, 'Listening to your lab question...');
      };

      this.recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          const transcript = item[0]?.transcript || '';
          if (item.isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        if (interim) {
          this.interimTranscript = interim;
          if (typeof this.callbacks?.onInterimResult === 'function') {
            const combined = (this.finalTranscript + (this.finalTranscript ? ' ' : '') + interim).trim();
            this.callbacks.onInterimResult(combined);
          }
        }

        if (final) {
          this.finalTranscript += (this.finalTranscript ? ' ' : '') + final.trim();
          this.interimTranscript = '';
          if (typeof this.callbacks?.onInterimResult === 'function') {
            this.callbacks.onInterimResult(this.finalTranscript);
          }
        }

        // Automatic silence detection: finalize after 2 seconds of natural pause
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
        }
        if (this.finalTranscript || this.interimTranscript) {
          this.silenceTimer = setTimeout(() => {
            this.stopListening();
          }, 2000);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('SpeechRecognition error event:', event.error);

        // Aborted by user action or manual stop is normal termination, not an error
        if (event.error === 'aborted' || this.isManualStop) {
          this.state = SPEECH_STATES.READY;
          this.notifyStateChange(SPEECH_STATES.READY, 'Speech input ready.');
          return;
        }

        // SALVAGE: If the speech service threw an error (like network drop or no-speech timeout),
        // but words were already captured in this session, prioritize salvaging the user's question!
        const captured = (this.finalTranscript || this.interimTranscript || '').trim();
        if (captured && (event.error === 'network' || event.error === 'no-speech')) {
          console.info(`SpeechRecognition encountered ${event.error}, but captured question was preserved:`, captured);
          this.state = SPEECH_STATES.READY;
          this.notifyStateChange(SPEECH_STATES.READY, 'Question captured.');
          if (typeof this.callbacks?.onFinalResult === 'function') {
            this.callbacks.onFinalResult(captured);
          }
          return;
        }

        // AUTOMATIC RETRY ON TRANSIENT NETWORK DROPS
        if (event.error === 'network' && this.networkRetryCount < 1) {
          this.networkRetryCount++;
          console.warn(`Transient network issue in speech recognition. Re-initiating connection (attempt ${this.networkRetryCount})...`);
          this.notifyStateChange(SPEECH_STATES.LISTENING, 'Reconnecting speech service...');
          setTimeout(() => {
            if (this.state !== SPEECH_STATES.READY && !this.isManualStop) {
              this.startListening(this.callbacks, { continuous: false, isRetry: true });
            }
          }, 350);
          return;
        }

        this.state = SPEECH_STATES.ERROR;
        let userMessage = 'Speech recognition encountered an issue.';

        switch (event.error) {
          case 'not-allowed':
          case 'service-not-allowed':
            userMessage =
              'Microphone access was denied. Please allow microphone permissions in your browser address bar to use voice commands.';
            break;
          case 'no-speech':
            userMessage = 'No speech detected. Please speak clearly near your microphone and try again.';
            break;
          case 'network':
            userMessage =
              'Voice recognition service is temporarily unreachable from your network. You can type your question directly in the chat box.';
            break;
          case 'audio-capture':
            userMessage = 'No microphone device was detected. Ensure a working microphone is connected.';
            break;
          case 'bad-grammar':
            userMessage = 'Speech recognition grammar error.';
            break;
          default:
            userMessage = `Voice recognition error: ${event.error || 'Unknown error'}.`;
        }

        this.notifyStateChange(SPEECH_STATES.ERROR, userMessage);
        if (typeof this.callbacks?.onError === 'function') {
          this.callbacks.onError(new Error(userMessage));
        }
      };

      this.recognition.onend = () => {
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
          this.silenceTimer = null;
        }
        if (this.state !== SPEECH_STATES.ERROR) {
          const completedTranscript = (this.finalTranscript || this.interimTranscript || '').trim();
          if (completedTranscript && typeof this.callbacks?.onFinalResult === 'function') {
            this.callbacks.onFinalResult(completedTranscript);
          }
          this.state = SPEECH_STATES.READY;
          this.notifyStateChange(SPEECH_STATES.READY, 'Ready');
        }
      };

      this.recognition.start();
      return true;
    } catch (err) {
      console.error('Failed to start SpeechRecognition:', err);
      this.state = SPEECH_STATES.ERROR;
      const msg = 'Could not start microphone session: ' + err.message;
      this.notifyStateChange(SPEECH_STATES.ERROR, msg);
      if (typeof callbacks.onError === 'function') callbacks.onError(new Error(msg));
      return false;
    }
  }

  /**
   * Finishes current speaking and finalizes transcript.
   */
  stopListening() {
    this.isManualStop = true;
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (this.recognition && this.state === SPEECH_STATES.LISTENING) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn('Error calling recognition.stop():', e);
      }
    }
  }

  /**
   * Cancels listening immediately and discards interim audio.
   */
  cancelListening() {
    this.isManualStop = true;
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {
        console.warn('Error calling recognition.abort():', e);
      }
      this.recognition = null;
    }
    this.state = SPEECH_STATES.READY;
    this.finalTranscript = '';
    this.interimTranscript = '';
    this.notifyStateChange(SPEECH_STATES.READY, 'Ready');
  }

  notifyStateChange(state, message = '') {
    if (typeof this.callbacks?.onStateChange === 'function') {
      this.callbacks.onStateChange(state, message);
    }
  }
}

export const speechRecognitionManager = new SpeechRecognitionManager();
