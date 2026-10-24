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
   */
  startListening(callbacks = {}) {
    if (!this.isSupported()) {
      const err = new Error(
        'Speech recognition is not supported in this browser. Please use Chrome, Edge, Safari, or type in the chat box.'
      );
      this.state = SPEECH_STATES.ERROR;
      if (typeof callbacks.onError === 'function') callbacks.onError(err);
      return false;
    }

    // Stop any existing session
    this.cancelListening();

    this.callbacks = callbacks;
    this.finalTranscript = '';
    this.interimTranscript = '';

    try {
      this.recognition = new this.RecognitionClass();
      this.recognition.continuous = false; // Turn-based laboratory question
      this.recognition.interimResults = true; // Live typing as user speaks
      this.recognition.lang = 'en-US';
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
          const transcript = item[0].transcript;
          if (item.isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        if (interim) {
          this.interimTranscript = interim;
          if (typeof this.callbacks?.onInterimResult === 'function') {
            this.callbacks.onInterimResult(this.finalTranscript + interim);
          }
        }

        if (final) {
          this.finalTranscript += (this.finalTranscript ? ' ' : '') + final.trim();
          this.interimTranscript = '';
          this.state = SPEECH_STATES.PROCESSING;
          this.notifyStateChange(SPEECH_STATES.PROCESSING, 'Finalizing transcript...');
          if (typeof this.callbacks?.onFinalResult === 'function') {
            this.callbacks.onFinalResult(this.finalTranscript);
          }
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('SpeechRecognition error event:', event.error);

        // Aborted by user action is normal cancellation, not a failure
        if (event.error === 'aborted') {
          this.state = SPEECH_STATES.READY;
          this.notifyStateChange(SPEECH_STATES.READY, 'Speech input cancelled.');
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
            userMessage = 'Network connection error during voice recognition. Check your connection or type your question.';
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
        if (this.state !== SPEECH_STATES.ERROR) {
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
