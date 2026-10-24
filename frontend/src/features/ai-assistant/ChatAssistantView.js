import { chatService } from './chatService.js';
import { speechRecognitionManager, SPEECH_STATES } from './SpeechRecognitionManager.js';
import { speechSynthesisManager } from './SpeechSynthesisManager.js';
import { renderScientificMarkdown } from './ChatRenderer.js';

export class ChatAssistantView {
  constructor(container) {
    this.container = container;
    this.messages = [
      {
        id: 'msg-welcome',
        role: 'assistant',
        text: ' Hello! I am your **AI Lab Assistant**.\n\nI can explain acid-base principles, guide your pH-metric and conductometric titrations, assist with stoichiometry and derivative calculations, review instrumentation, or provide conservative safety guidance.\n\nYou can type your questions or use the  **Microphone** and **Voice Mode** to speak with me directly!\n\nHow can I help you in the laboratory today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    this.isLoading = false;
    this.backendStatus = { checking: true, configured: false };

    // Voice Assistant State
    this.isVoiceMode = false;
    this.speechState = SPEECH_STATES.READY;
    this.voiceStatusText = '';
    this.voiceError = null;
    this.activeSpeakingMessageId = null;

    // Speech Managers
    this.stt = speechRecognitionManager;
    this.tts = speechSynthesisManager;
  }

  mount() {
    this.container.innerHTML = this.renderTemplate();
    this.attachEventListeners();
    this.checkBackendStatus();
  }

  destroy() {
    // Safely stop all speech recognition and playback upon view teardown
    if (this.stt) {
      this.stt.cancelListening();
    }
    if (this.tts) {
      this.tts.stop();
    }
    this.container.innerHTML = '';
  }

  renderTemplate() {
    const suggestedPrompts = [
      'What is a burette used for and how do I read the meniscus?',
      'Explain the equivalence point of CH₃COOH vs NaOH',
      'What is the difference between pH-metric and conductometric titration?',
      'Explain how to determine water hardness using EDTA titration',
      'Explain the Beer–Lambert law and calibration curve',
      'What precautions should I take during crystallization?',
    ];

    const isSttSupported = this.stt.isSupported();
    const isTtsSupported = this.tts.isSupported();

    return `
      <div class="chat-container animate-fade-in ${this.isVoiceMode ? 'voice-mode-active' : ''}">
        <!-- Chat Header -->
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar-ai"></div>
            <div>
              <div class="chat-title-group">
                <h1 class="chat-title">AI Lab Assistant</h1>
                <span class="badge-status" id="backend-status-badge">Checking connection...</span>
                ${this.isVoiceMode ? '<span class="badge-voice-mode"> Voice Mode Active</span>' : ''}
              </div>
              <p class="chat-desc">Conversational chemistry mentor & lab safety advisor</p>
            </div>
          </div>
          <div class="chat-header-actions">
            <!-- Voice Mode Toggle -->
            <button
              class="btn btn-sm btn-voice-toggle ${this.isVoiceMode ? 'btn-voice-on' : 'btn-voice-off'}"
              id="voice-mode-toggle"
              title="Toggle interactive Voice Conversation Mode"
              aria-pressed="${this.isVoiceMode}"
            >
               Voice Mode: ${this.isVoiceMode ? 'ON' : 'OFF'}
            </button>

            <!-- Global Stop Speech (visible while audio is playing) -->
            <button
              class="btn btn-ghost btn-sm btn-stop-global ${this.activeSpeakingMessageId ? '' : 'hidden'}"
              id="btn-global-stop-speech"
              title="Stop audio narration"
              aria-label="Stop audio playback"
            >
               Stop Audio
            </button>

            <!-- Clear Chat -->
            <button class="btn btn-ghost btn-sm" id="chat-clear-btn" title="Clear conversation">
               Clear
            </button>
          </div>
        </div>

        <!-- Voice Mode Dedicated Interactive Banner -->
        ${
          this.isVoiceMode
            ? `
          <div class="voice-mode-banner animate-fade-in" id="voice-mode-banner">
            <div class="voice-banner-left">
              <div class="voice-pulse-ring ${this.speechState === SPEECH_STATES.LISTENING ? 'pulse-listening' : ''}">
                ${this.speechState === SPEECH_STATES.LISTENING ? '' : ''}
              </div>
              <div class="voice-banner-info">
                <div class="voice-banner-title">
                  <strong>Voice Conversation Mode</strong>
                  <span class="voice-state-tag state-${this.speechState}">${this.getSpeechStateLabel()}</span>
                </div>
                <p class="voice-banner-desc" id="voice-banner-desc">
                  ${this.getVoiceModeDescription()}
                </p>
              </div>
            </div>
            <div class="voice-banner-actions">
              <button
                class="btn ${this.speechState === SPEECH_STATES.LISTENING ? 'btn-danger' : 'btn-primary'} btn-sm"
                id="btn-voice-banner-action"
                ${!isSttSupported ? 'disabled' : ''}
              >
                ${this.speechState === SPEECH_STATES.LISTENING ? ' Finish Speaking' : ' Speak Lab Question'}
              </button>
              <button class="btn btn-ghost btn-sm" id="btn-exit-voice-mode" title="Return to standard text chat">
                Exit Voice Mode 
              </button>
            </div>
          </div>
        `
            : ''
        }

        <!-- Voice Recognition Error Alert (hidden by default) -->
        <div id="voice-error-alert" class="voice-error-alert ${this.voiceError ? '' : 'hidden'}">
          <div class="warning-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="warning-text" id="voice-error-text">
            ${this.voiceError || ''}
          </div>
          <button type="button" class="btn-voice-type-fallback" id="btn-voice-focus-input" title="Type your question">
            Type question
          </button>
          <button type="button" class="btn-close-alert" id="btn-close-voice-alert" aria-label="Dismiss error" title="Dismiss">
            ✕
          </button>
        </div>

        <!-- Missing API Key Alert (hidden by default) -->
        <div id="api-key-alert" class="api-key-warning hidden">
          <div class="warning-icon"></div>
          <div class="warning-text">
            <strong>API Key Required:</strong> To enable live AI responses, add your API key to <code>backend/.env</code> (<code>GEMINI_API_KEY=your_key</code>) and start the backend (<code>npm start</code> in <code>backend/</code>).
          </div>
        </div>

        <!-- Suggested Prompt Chips -->
        <div class="suggested-prompts-bar">
          <span class="prompts-label"> Suggested Questions:</span>
          <div class="prompts-scroll">
            ${suggestedPrompts
              .map(
                (p) => `
              <button class="chip-prompt" data-prompt="${p}">${p}</button>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Chat Messages Scroll Area -->
        <div class="chat-messages" id="chat-messages-list">
          ${this.renderMessages()}
        </div>

        <!-- Listening Wave Indicator (visible while microphone is capturing) -->
        <div id="listening-indicator-bar" class="listening-indicator-bar ${this.speechState === SPEECH_STATES.LISTENING ? '' : 'hidden'}">
          <div class="wave-animation">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
          <span class="listening-text" id="listening-indicator-text">
            Listening... Speak clearly into your microphone
          </span>
          <button class="btn-cancel-listening" id="btn-cancel-listening" title="Cancel microphone capture">
             Cancel
          </button>
        </div>

        <!-- Chat Input Bar -->
        <div class="chat-input-wrapper">
          <form id="chat-form" class="chat-input-form ${this.speechState === SPEECH_STATES.LISTENING ? 'form-listening' : ''}">
            <!-- Microphone Speech-to-Text Button -->
            <button
              type="button"
              id="chat-mic-btn"
              class="btn btn-mic ${this.speechState === SPEECH_STATES.LISTENING ? 'mic-active' : ''}"
              title="${
                isSttSupported
                  ? this.speechState === SPEECH_STATES.LISTENING
                    ? 'Stop listening and review speech'
                    : 'Click to speak your question'
                  : 'Speech recognition is not supported in this browser'
              }"
              aria-label="Voice input with microphone"
              ${!isSttSupported ? 'disabled' : ''}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>

            <!-- Text Input Area -->
            <textarea
              id="chat-textarea"
              class="chat-textarea"
              placeholder="${
                this.speechState === SPEECH_STATES.LISTENING
                  ? 'Listening... Your spoken words will appear here for review...'
                  : 'Ask about titration curves, safety precautions, electrodes, or calculations... (Press Enter to send, Shift+Enter for new line)'
              }"
              rows="2"
            ></textarea>

            <!-- Send Button -->
            <button type="submit" id="chat-send-btn" class="btn btn-send" aria-label="Send message" title="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>

          <div class="input-hint">
            <span>Safety First: Never attempt undocumented chemical combinations. Always verify with your lab supervisor.</span>
            ${!isSttSupported ? '<span class="hint-unsupported">• Web Speech API not supported in this browser</span>' : ''}
          </div>
        </div>
      </div>
    `;
  }

  getSpeechStateLabel() {
    switch (this.speechState) {
      case SPEECH_STATES.LISTENING:
        return 'Listening...';
      case SPEECH_STATES.PROCESSING:
        return 'Transcribing...';
      case SPEECH_STATES.ERROR:
        return 'Error';
      default:
        return 'Ready';
    }
  }

  getVoiceModeDescription() {
    if (this.speechState === SPEECH_STATES.LISTENING) {
      return 'Microphone is active. Speak your question, then click "Finish Speaking" or let pause detect.';
    }
    if (this.activeSpeakingMessageId) {
      return 'AI Lab Assistant is currently reading the scientific explanation aloud.';
    }
    return 'Click "Speak Lab Question" to ask verbally. The assistant will transcribe, reason, and read the explanation aloud.';
  }

  renderMessages() {
    const isTtsSupported = this.tts.isSupported();

    return this.messages
      .map((msg) => {
        const isUser = msg.role === 'user';
        const isSpeaking = this.activeSpeakingMessageId === msg.id && this.tts.isPlaying(msg.id);
        const isPaused = this.activeSpeakingMessageId === msg.id && this.tts.isPaused(msg.id);

        return `
          <div class="chat-message-row ${isUser ? 'user-row' : 'assistant-row'}" data-msg-id="${msg.id}">
            <div class="msg-avatar">${isUser ? '' : ''}</div>
            <div class="msg-bubble ${isUser ? 'bubble-user' : 'bubble-assistant'} ${isSpeaking ? 'bubble-speaking' : ''}">
              
              <!-- Clean Header: Author Name, Role Badge, and Timestamp -->
              <div class="msg-header-row">
                <div class="msg-author-info">
                  <span class="msg-author">${isUser ? 'You' : 'AI Lab Assistant'}</span>
                  ${!isUser ? `<span class="msg-role-badge"> Lab Advisor</span>` : ''}
                </div>
                <div class="msg-timestamp">${msg.timestamp || ''}</div>
              </div>

              <!-- Main Content: Formatted with Scientific Markdown, LaTeX & Chemistry -->
              <div class="msg-content ${isUser ? 'msg-content-user' : 'msg-content-assistant'}">
                ${renderScientificMarkdown(msg.text, { isStreaming: Boolean(msg.isStreaming) })}
                ${msg.isStreaming ? '<span class="inline-stream-cursor">▌</span>' : ''}
              </div>

              ${
                msg.truncated
                  ? `
                <div class="msg-truncation-bar">
                  <span class="truncation-icon"></span>
                  <span class="truncation-label">Response reached max output limit.</span>
                  <button class="btn-continue-response" data-continue-msg="Please continue from where you left off.">
                    ▶ Continue Explanation
                  </button>
                </div>
              `
                  : ''
              }

              <!-- Dedicated Voice & Utility Toolbar on Assistant Responses (Never overlaps or interrupts text) -->
              ${
                !isUser
                  ? `
                <div class="msg-toolbar-row">
                  ${
                    isTtsSupported
                      ? `
                    <div class="msg-tts-toolbar" role="toolbar" aria-label="Speech and audio playback controls">
                      <button
                        class="btn-tts-action btn-tts-play ${isSpeaking ? 'active-speaking' : ''} ${isPaused ? 'active-paused' : ''}"
                        data-msg-id="${msg.id}"
                        title="${isSpeaking ? 'Pause speech narration' : isPaused ? 'Resume speech narration' : 'Listen to this explanation aloud'}"
                        aria-label="${isSpeaking ? 'Pause' : isPaused ? 'Resume' : 'Listen'}"
                      >
                        <span class="tts-icon">${isSpeaking ? '⏸' : isPaused ? '▶' : ''}</span>
                        <span class="tts-label">${isSpeaking ? 'Pause' : isPaused ? 'Resume' : 'Listen'}</span>
                      </button>

                      ${
                        isSpeaking || isPaused
                          ? `
                        <button
                          class="btn-tts-action btn-tts-stop"
                          data-msg-id="${msg.id}"
                          title="Stop speech playback"
                          aria-label="Stop audio"
                        >
                          <span class="tts-icon"></span>
                          <span class="tts-label">Stop</span>
                        </button>
                      `
                          : ''
                      }

                      ${
                        isSpeaking
                          ? `
                        <div class="msg-speaking-badge animate-fade-in">
                          <span class="pulse-speaking-dot"></span>
                          <span class="speaking-text">Speaking aloud...</span>
                        </div>
                      `
                          : isPaused
                          ? `
                        <div class="msg-speaking-badge badge-paused animate-fade-in">
                          <span class="pulse-paused-dot"></span>
                          <span class="speaking-text">Paused</span>
                        </div>
                      `
                          : ''
                      }
                    </div>
                  `
                      : '<div class="msg-tts-toolbar"></div>'
                  }

                  <div class="msg-utility-actions">
                    <button
                      class="btn-copy-msg"
                      data-msg-id="${msg.id}"
                      title="Copy explanation to clipboard"
                      aria-label="Copy text"
                    >
                      <span class="copy-icon"></span> Copy
                    </button>
                  </div>
                </div>
              `
                  : ''
              }
            </div>
          </div>
        `;
      })
      .join('');
  }

  attachEventListeners() {
    const root = this.container;
    const form = root.querySelector('#chat-form');
    const textarea = root.querySelector('#chat-textarea');
    const clearBtn = root.querySelector('#chat-clear-btn');
    const chips = root.querySelectorAll('.chip-prompt');
    const voiceModeToggle = root.querySelector('#voice-mode-toggle');
    const exitVoiceBtn = root.querySelector('#btn-exit-voice-mode');
    const micBtn = root.querySelector('#chat-mic-btn');
    const bannerSpeakBtn = root.querySelector('#btn-voice-banner-action');
    const cancelListeningBtn = root.querySelector('#btn-cancel-listening');
    const globalStopBtn = root.querySelector('#btn-global-stop-speech');
    const closeAlertBtn = root.querySelector('#btn-close-voice-alert');

    // Submit handler
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitUserMessage();
      });
    }

    // Enter to send (Shift+Enter for newline)
    if (textarea) {
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.submitUserMessage();
        }
      });
    }

    // Clear Chat
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.tts.stop();
        this.activeSpeakingMessageId = null;
        chatService.clearHistory();
        this.messages = [
          {
            id: 'msg-cleared-' + Date.now(),
            role: 'assistant',
            text: 'Conversation cleared. What experiment question would you like to explore next?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
        this.refreshMessages();
      });
    }

    // Suggested Chips
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const prompt = chip.dataset.prompt;
        if (textarea) {
          textarea.value = prompt;
          this.submitUserMessage();
        }
      });
    });

    // Voice Mode Toggle
    if (voiceModeToggle) {
      voiceModeToggle.addEventListener('click', () => {
        this.toggleVoiceMode();
      });
    }

    if (exitVoiceBtn) {
      exitVoiceBtn.addEventListener('click', () => {
        this.exitVoiceMode();
      });
    }

    // Microphone Input Button
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        this.toggleMicrophoneCapture();
      });
    }

    // Voice Mode Banner Action Button
    if (bannerSpeakBtn) {
      bannerSpeakBtn.addEventListener('click', () => {
        this.toggleMicrophoneCapture();
      });
    }

    // Cancel Listening Button
    if (cancelListeningBtn) {
      cancelListeningBtn.addEventListener('click', () => {
        this.cancelMicrophoneCapture();
      });
    }

    // Global Stop Speech Button
    if (globalStopBtn) {
      globalStopBtn.addEventListener('click', () => {
        this.stopAllSpeech();
      });
    }

    // Close Voice Error Alert
    if (closeAlertBtn) {
      closeAlertBtn.addEventListener('click', () => {
        this.clearVoiceError();
      });
    }

    // Type Question Fallback Button
    const focusInputBtn = root.querySelector('#btn-voice-focus-input');
    if (focusInputBtn) {
      focusInputBtn.addEventListener('click', () => {
        this.clearVoiceError();
        if (textarea) textarea.focus();
      });
    }

    if (textarea) {
      textarea.addEventListener('input', () => {
        if (this.voiceError) {
          this.clearVoiceError();
        }
      });
    }

    // Delegated click for Text-to-Speech play/pause/stop buttons
    const messagesList = root.querySelector('#chat-messages-list');
    if (messagesList) {
      messagesList.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.btn-tts-play');
        if (playBtn) {
          const msgId = playBtn.dataset.msgId;
          this.toggleSpeechPlayback(msgId);
          return;
        }

        const stopBtn = e.target.closest('.btn-tts-stop');
        if (stopBtn) {
          this.stopAllSpeech();
          return;
        }

        const copyBtn = e.target.closest('.btn-copy-msg');
        if (copyBtn) {
          const msgId = copyBtn.dataset.msgId;
          const msg = this.messages.find((m) => m.id === msgId);
          if (msg && msg.text) {
            navigator.clipboard?.writeText(msg.text).then(() => {
              copyBtn.innerHTML = ' Copied!';
              setTimeout(() => {
                copyBtn.innerHTML = '<span class="copy-icon"></span> Copy';
              }, 2000);
            }).catch(() => {});
          }
          return;
        }

        const continueBtn = e.target.closest('.btn-continue-response');
        if (continueBtn) {
          const continuePrompt = continueBtn.dataset.continueMsg || 'Please continue from where you left off.';
          const textarea = root.querySelector('#chat-textarea');
          if (textarea) {
            textarea.value = continuePrompt;
            this.submitUserMessage();
          }
          return;
        }
      });
    }
  }

  /**
   * Toggles Voice Conversation Mode on or off.
   */
  toggleVoiceMode() {
    this.isVoiceMode = !this.isVoiceMode;
    this.voiceError = null;

    if (!this.isVoiceMode) {
      this.cancelMicrophoneCapture();
    }

    // Re-render UI to display or hide Voice Mode Banner
    this.container.innerHTML = this.renderTemplate();
    this.attachEventListeners();
    this.checkBackendStatus();

    // Scroll to bottom
    const list = this.container.querySelector('#chat-messages-list');
    if (list) list.scrollTop = list.scrollHeight;
  }

  exitVoiceMode() {
    if (this.isVoiceMode) {
      this.toggleVoiceMode();
    }
  }

  /**
   * Toggles Speech-to-Text microphone recording.
   */
  toggleMicrophoneCapture() {
    if (this.speechState === SPEECH_STATES.LISTENING) {
      // User tapped while listening -> finish and review
      this.stt.stopListening();
    } else {
      this.startMicrophoneCapture();
    }
  }

  startMicrophoneCapture() {
    this.clearVoiceError();
    const textarea = this.container.querySelector('#chat-textarea');

    // Stop any speech playback before listening
    this.stopAllSpeech();

    const success = this.stt.startListening({
      onStateChange: (state, message) => {
        this.speechState = state;
        this.voiceStatusText = message;
        this.updateVoiceUiState();
      },
      onInterimResult: (transcript) => {
        if (textarea) {
          textarea.value = transcript;
          textarea.scrollTop = textarea.scrollHeight;
        }
      },
      onFinalResult: (transcript) => {
        this.clearVoiceError();
        if (textarea) {
          textarea.value = transcript;
        }
        // In Voice Mode, if transcript is non-empty, auto-submit
        if (this.isVoiceMode && transcript && transcript.trim()) {
          setTimeout(() => {
            this.submitUserMessage();
          }, 350);
        }
      },
      onError: (err) => {
        this.voiceError = err.message || 'Microphone error.';
        this.showVoiceError(this.voiceError);
        this.speechState = SPEECH_STATES.ERROR;
        this.updateVoiceUiState();
      },
    });

    if (!success) {
      this.showVoiceError('Speech recognition is not supported in this browser.');
    }
  }

  cancelMicrophoneCapture() {
    this.stt.cancelListening();
    this.speechState = SPEECH_STATES.READY;
    this.updateVoiceUiState();
  }

  updateVoiceUiState() {
    const micBtn = this.container.querySelector('#chat-mic-btn');
    const form = this.container.querySelector('#chat-form');
    const listeningBar = this.container.querySelector('#listening-indicator-bar');
    const listeningText = this.container.querySelector('#listening-indicator-text');
    const bannerDesc = this.container.querySelector('#voice-banner-desc');
    const bannerAction = this.container.querySelector('#btn-voice-banner-action');

    const isListening = this.speechState === SPEECH_STATES.LISTENING;

    if (micBtn) {
      micBtn.classList.toggle('mic-active', isListening);
      micBtn.title = isListening
        ? 'Listening... Click to finish speaking'
        : 'Click to speak your question';
    }

    if (form) {
      form.classList.toggle('form-listening', isListening);
    }

    if (listeningBar) {
      listeningBar.classList.toggle('hidden', !isListening);
    }

    if (listeningText && this.voiceStatusText) {
      listeningText.textContent = this.voiceStatusText;
    }

    if (bannerDesc) {
      bannerDesc.textContent = this.getVoiceModeDescription();
    }

    if (bannerAction) {
      bannerAction.className = `btn ${isListening ? 'btn-danger' : 'btn-primary'} btn-sm`;
      bannerAction.innerHTML = isListening ? ' Finish Speaking' : ' Speak Lab Question';
    }
  }

  showVoiceError(message) {
    this.voiceError = message;
    const alert = this.container.querySelector('#voice-error-alert');
    const text = this.container.querySelector('#voice-error-text');
    if (alert && text) {
      text.textContent = message;
      alert.classList.remove('hidden');
    }
    // Auto-focus chat textarea so the user can immediately type their question
    const textarea = this.container.querySelector('#chat-textarea');
    if (textarea && (message.includes('type') || message.includes('unreachable'))) {
      textarea.focus();
    }
    // Automatically reset speech state after a few seconds so the mic button is unlocked
    setTimeout(() => {
      if (this.speechState === SPEECH_STATES.ERROR) {
        this.speechState = SPEECH_STATES.READY;
        this.updateVoiceUiState();
      }
    }, 4500);
  }

  clearVoiceError() {
    this.voiceError = null;
    const alert = this.container.querySelector('#voice-error-alert');
    if (alert) alert.classList.add('hidden');
  }

  /**
   * Toggles speech narration for a given message.
   * @param {string} messageId
   */
  toggleSpeechPlayback(messageId) {
    const msg = this.messages.find((m) => m.id === messageId);
    if (!msg) return;

    if (this.tts.isPlaying(messageId)) {
      this.tts.pause();
      this.updateGlobalStopButton();
      this.refreshMessages();
    } else if (this.tts.isPaused(messageId)) {
      this.tts.resume();
      this.updateGlobalStopButton();
      this.refreshMessages();
    } else {
      this.playMessageSpeech(msg);
    }
  }

  playMessageSpeech(msg) {
    if (!msg || !msg.text) return;

    this.activeSpeakingMessageId = msg.id;
    this.updateGlobalStopButton();
    this.refreshMessages();

    this.tts.speak(msg.text, msg.id, {
      onStart: () => {
        this.activeSpeakingMessageId = msg.id;
        this.updateGlobalStopButton();
        this.refreshMessages();
      },
      onPause: () => {
        this.updateGlobalStopButton();
        this.refreshMessages();
      },
      onResume: () => {
        this.updateGlobalStopButton();
        this.refreshMessages();
      },
      onEnd: () => {
        this.activeSpeakingMessageId = null;
        this.updateGlobalStopButton();
        this.refreshMessages();
      },
      onError: (err) => {
        console.warn('Speech playback error:', err);
        this.activeSpeakingMessageId = null;
        this.updateGlobalStopButton();
        this.refreshMessages();
      },
    });
  }

  stopAllSpeech() {
    this.tts.stop();
    this.activeSpeakingMessageId = null;
    this.updateGlobalStopButton();
    this.refreshMessages();
  }

  updateGlobalStopButton() {
    const globalStopBtn = this.container.querySelector('#btn-global-stop-speech');
    if (globalStopBtn) {
      globalStopBtn.classList.toggle('hidden', !this.tts.hasActiveSpeech());
    }
  }

  async checkBackendStatus() {
    const badge = this.container.querySelector('#backend-status-badge');
    const alert = this.container.querySelector('#api-key-alert');

    const res = await chatService.checkHealth();
    if (res.ok && res.data) {
      if (res.data.geminiConfigured) {
        if (badge) {
          badge.className = 'badge-status status-online';
          badge.textContent = '● Online';
        }
        if (alert) alert.classList.add('hidden');
      } else {
        if (badge) {
          badge.className = 'badge-status status-warning';
          badge.textContent = '● Backend Connected (No API Key)';
        }
        if (alert) alert.classList.remove('hidden');
      }
    } else {
      if (badge) {
        badge.className = 'badge-status status-offline';
        badge.textContent = '● Backend Offline';
      }
      if (alert) {
        alert.classList.remove('hidden');
        alert.querySelector('.warning-text').innerHTML =
          `<strong>Backend Not Reachable:</strong> Ensure the Node/Express backend service is running and accessible at <code>/api</code>.`;
      }
    }
  }

  async submitUserMessage() {
    const textarea = this.container.querySelector('#chat-textarea');
    if (!textarea || this.isLoading) return;

    const message = textarea.value.trim();
    if (!message) return;

    // Cancel any active microphone capture session
    this.cancelMicrophoneCapture();

    // Stop current speech playback before sending new query
    this.stopAllSpeech();

    // Append User Message with unique ID
    const userMsgId = 'msg-user-' + Date.now();
    this.messages.push({
      id: userMsgId,
      role: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    textarea.value = '';
    this.isLoading = true;
    this.refreshMessages();
    this.showTypingIndicator();

    const assistantMsgId = 'msg-ai-' + Date.now();
    let assistantMsg = null;

    try {
      const response = await chatService.sendMessageStream(message, (chunkText, meta) => {
        if (!assistantMsg) {
          this.removeTypingIndicator();
          assistantMsg = {
            id: assistantMsgId,
            role: 'assistant',
            text: meta.fullText || chunkText,
            isStreaming: !meta.done,
            truncated: Boolean(meta.truncated),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          this.messages.push(assistantMsg);
          this.refreshMessages();
        } else {
          // Accumulate without overwriting
          assistantMsg.text = meta.fullText;
          assistantMsg.isStreaming = !meta.done;
          assistantMsg.truncated = Boolean(meta.truncated);

          // Update DOM element directly for high-performance streaming updates
          const msgEl = this.container.querySelector(`[data-msg-id="${assistantMsg.id}"] .msg-content`);
          if (msgEl) {
            msgEl.innerHTML =
              renderScientificMarkdown(assistantMsg.text, { isStreaming: !meta.done }) +
              (!meta.done ? '<span class="inline-stream-cursor">▌</span>' : '');
          }
          const list = this.container.querySelector('#chat-messages-list');
          if (list) list.scrollTop = list.scrollHeight;
        }
      });

      this.removeTypingIndicator();
      this.isLoading = false;

      if (response.success) {
        if (!assistantMsg) {
          assistantMsg = {
            id: assistantMsgId,
            role: 'assistant',
            text: response.reply,
            isStreaming: false,
            truncated: Boolean(response.truncated),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          this.messages.push(assistantMsg);
        } else {
          assistantMsg.text = response.reply;
          assistantMsg.isStreaming = false;
          assistantMsg.truncated = Boolean(response.truncated);
        }
        this.refreshMessages();

        // If in Voice Mode, read complete finished response aloud
        if (this.isVoiceMode) {
          this.playMessageSpeech(assistantMsg);
        }
      } else {
        if (!assistantMsg) {
          let errorMsg = ` **Error:** ${response.error}`;
          if (response.code === 'MISSING_API_KEY') {
            errorMsg +=
              `\n\nTo configure your API Key:\n1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/)\n2. Open \`backend/.env\`\n3. Add: \`GEMINI_API_KEY=your_actual_key\`\n4. Restart the server (\`npm run dev\` in \`backend/\`)`;
          }
          this.messages.push({
            id: assistantMsgId,
            role: 'assistant',
            text: errorMsg,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });
        } else {
          assistantMsg.text += `\n\n **Connection issue:** ${response.error}`;
          assistantMsg.isStreaming = false;
        }
        this.refreshMessages();
      }
    } catch (err) {
      console.error('Chat error:', err);
      this.removeTypingIndicator();
      this.isLoading = false;
      if (!assistantMsg) {
        this.messages.push({
          id: assistantMsgId,
          role: 'assistant',
          text: ` **Error:** ${err.message || 'An unexpected error occurred.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      } else {
        assistantMsg.text += `\n\n **Error:** ${err.message}`;
        assistantMsg.isStreaming = false;
      }
      this.refreshMessages();
    }
  }

  showTypingIndicator() {
    const list = this.container.querySelector('#chat-messages-list');
    if (!list) return;

    const typingEl = document.createElement('div');
    typingEl.id = 'chat-typing-indicator';
    typingEl.className = 'chat-message-row assistant-row';
    typingEl.innerHTML = `
      <div class="msg-avatar"></div>
      <div class="msg-bubble bubble-assistant typing-bubble">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    list.appendChild(typingEl);
    list.scrollTop = list.scrollHeight;
  }

  removeTypingIndicator() {
    const typingEl = this.container.querySelector('#chat-typing-indicator');
    if (typingEl) typingEl.remove();
  }

  refreshMessages() {
    const list = this.container.querySelector('#chat-messages-list');
    if (list) {
      list.innerHTML = this.renderMessages();
      list.scrollTop = list.scrollHeight;
    }
  }

  /**
   * Scientific Markdown & LaTeX formatter (delegates to ChatRenderer)
   */
  formatMarkdown(text) {
    return renderScientificMarkdown(text);
  }
}
