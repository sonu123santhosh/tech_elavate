import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SpeechSynthesisManager,
  TTS_STATES,
} from '../frontend/src/features/ai-assistant/SpeechSynthesisManager.js';
import {
  SpeechRecognitionManager,
  SPEECH_STATES,
} from '../frontend/src/features/ai-assistant/SpeechRecognitionManager.js';

class MockUtterance {
  constructor(text) {
    this.text = text;
    this.voice = null;
    this.lang = 'en-US';
    this.rate = 1.0;
    this.pitch = 1.0;
    this.onstart = null;
    this.onboundary = null;
    this.onpause = null;
    this.onresume = null;
    this.onend = null;
    this.onerror = null;
  }
}

class MockSpeechSynthesis {
  constructor() {
    this.speaking = false;
    this.paused = false;
    this.currentUtterance = null;
    this.calls = [];
  }

  getVoices() {
    return [
      { name: 'Google US English', lang: 'en-US' },
      { name: 'Microsoft Natural David', lang: 'en-US' },
    ];
  }

  speak(utterance) {
    this.calls.push('speak');
    this.speaking = true;
    this.paused = false;
    this.currentUtterance = utterance;
    if (typeof utterance.onstart === 'function') {
      utterance.onstart();
    }
  }

  pause() {
    this.calls.push('pause');
    this.paused = true;
    if (this.currentUtterance && typeof this.currentUtterance.onpause === 'function') {
      this.currentUtterance.onpause();
    }
  }

  resume() {
    this.calls.push('resume');
    this.paused = false;
    if (this.currentUtterance && typeof this.currentUtterance.onresume === 'function') {
      this.currentUtterance.onresume();
    }
  }

  cancel() {
    this.calls.push('cancel');
    this.speaking = false;
    this.paused = false;
    if (this.currentUtterance && typeof this.currentUtterance.onerror === 'function') {
      this.currentUtterance.onerror({ error: 'canceled' });
    }
    this.currentUtterance = null;
  }
}

test('SpeechSynthesisManager - Sanitizes markdown for natural conversational speech', () => {
  const tts = new SpeechSynthesisManager();

  const markdownInput = `
### Experiment Summary
In this titration of **CH₃COOH** with **NaOH**, the equivalence point occurs at pH 8.7.
- Use a burette with ±0.05 mL tolerance.
- Maintain temperature at 25 °C.
- Measure conductance in µS/cm and compute ΔpH/ΔV.
\`\`\`javascript
const code = true;
\`\`\`
For details, see [Chemistry Manual](https://example.com).
  `;

  const clean = tts.sanitizeTextForSpeech(markdownInput);

  // Markdown characters stripped
  assert.ok(!clean.includes('###'));
  assert.ok(!clean.includes('**'));
  assert.ok(!clean.includes('```'));
  assert.ok(!clean.includes('https://example.com'));

  // Chemistry acronyms pronounced naturally
  assert.ok(clean.includes('acetic acid'));
  assert.ok(clean.includes('sodium hydroxide'));
  assert.ok(clean.includes('micro Siemens per centimeter'));
  assert.ok(clean.includes('delta pH over delta V'));
  assert.ok(clean.includes('degrees Celsius'));
  assert.ok(clean.includes('plus or minus'));
  assert.ok(clean.includes('Chemistry Manual'));
});

test('SpeechSynthesisManager - Handles empty and whitespace text safely', () => {
  const tts = new SpeechSynthesisManager();
  assert.equal(tts.sanitizeTextForSpeech(''), '');
  assert.equal(tts.sanitizeTextForSpeech(null), '');
  assert.equal(tts.sanitizeTextForSpeech('   \n  '), '');
});

test('SpeechSynthesisManager - Graceful fallback when window.speechSynthesis is absent', () => {
  // In Node environment, window is not defined
  const tts = new SpeechSynthesisManager();
  assert.equal(tts.isSupported(), false);

  let errorCaptured = null;
  const result = tts.speak('Hello world', 'msg-1', {
    onError: (err) => {
      errorCaptured = err;
    },
  });

  assert.equal(result, false);
  assert.ok(errorCaptured !== null);
  assert.match(errorCaptured.message, /not supported/);
  assert.equal(tts.isPlaying('msg-1'), false);
  assert.equal(tts.hasActiveSpeech(), false);
});

test('SpeechSynthesisManager - Lifecycle: Play -> Pause -> Resume -> Pause -> Resume -> Stop -> Play again', () => {
  const mockSynth = new MockSpeechSynthesis();
  const tts = new SpeechSynthesisManager(mockSynth, MockUtterance);

  assert.equal(tts.isSupported(), true);
  assert.equal(tts.getState(), TTS_STATES.IDLE);
  assert.equal(tts.isPlaying('msg-1'), false);
  assert.equal(tts.isPaused('msg-1'), false);
  assert.equal(tts.hasActiveSpeech(), false);

  let started = false;
  let pausedCount = 0;
  let resumedCount = 0;
  let ended = false;

  const callbacks = {
    onStart: () => {
      started = true;
    },
    onPause: () => {
      pausedCount++;
    },
    onResume: () => {
      resumedCount++;
    },
    onEnd: () => {
      ended = true;
    },
  };

  // 1. Play
  const playResult = tts.speak('Explanation of pH titration curves.', 'msg-1', callbacks);
  assert.equal(playResult, true);
  assert.equal(started, true);
  assert.equal(tts.getState(), TTS_STATES.PLAYING);
  assert.equal(tts.isPlaying('msg-1'), true);
  assert.equal(tts.isPaused('msg-1'), false);
  assert.equal(tts.hasActiveSpeech(), true);

  const initialUtterance = tts.currentUtterance;
  assert.ok(initialUtterance !== null);

  // 2. Pause
  tts.pause();
  assert.equal(pausedCount, 1);
  assert.equal(tts.getState(), TTS_STATES.PAUSED);
  assert.equal(tts.isPlaying('msg-1'), false);
  assert.equal(tts.isPaused('msg-1'), true);
  assert.equal(tts.hasActiveSpeech(), true);
  assert.equal(tts.currentUtterance, initialUtterance); // Preserves active utterance

  // 3. Resume
  tts.resume();
  assert.equal(resumedCount, 1);
  assert.equal(tts.getState(), TTS_STATES.PLAYING);
  assert.equal(tts.isPlaying('msg-1'), true);
  assert.equal(tts.isPaused('msg-1'), false);
  assert.equal(tts.currentUtterance, initialUtterance); // Does NOT create a new utterance

  // 4. Pause again
  tts.pause();
  assert.equal(pausedCount, 2);
  assert.equal(tts.getState(), TTS_STATES.PAUSED);
  assert.equal(tts.isPlaying('msg-1'), false);
  assert.equal(tts.isPaused('msg-1'), true);
  assert.equal(tts.currentUtterance, initialUtterance);

  // 5. Resume again
  tts.resume();
  assert.equal(resumedCount, 2);
  assert.equal(tts.getState(), TTS_STATES.PLAYING);
  assert.equal(tts.isPlaying('msg-1'), true);
  assert.equal(tts.isPaused('msg-1'), false);
  assert.equal(tts.currentUtterance, initialUtterance);

  // 6. Stop
  tts.stop();
  assert.equal(tts.getState(), TTS_STATES.IDLE);
  assert.equal(tts.isPlaying('msg-1'), false);
  assert.equal(tts.isPaused('msg-1'), false);
  assert.equal(tts.hasActiveSpeech(), false);
  assert.equal(tts.currentUtterance, null);

  // 7. Play again
  const secondPlay = tts.speak('New explanation content.', 'msg-1', callbacks);
  assert.equal(secondPlay, true);
  assert.equal(tts.getState(), TTS_STATES.PLAYING);
  assert.equal(tts.isPlaying('msg-1'), true);
  assert.notEqual(tts.currentUtterance, initialUtterance);

  tts.stop();
});

test('SpeechSynthesisManager - Rapid button clicks maintain synchronized state', () => {
  const mockSynth = new MockSpeechSynthesis();
  const tts = new SpeechSynthesisManager(mockSynth, MockUtterance);

  tts.speak('Rapid toggle test message.', 'msg-rapid');
  assert.equal(tts.isPlaying('msg-rapid'), true);

  // Rapid toggles
  for (let i = 0; i < 5; i++) {
    tts.pause();
    assert.equal(tts.getState(), TTS_STATES.PAUSED);
    assert.equal(tts.isPaused('msg-rapid'), true);
    assert.equal(tts.isPlaying('msg-rapid'), false);

    tts.resume();
    assert.equal(tts.getState(), TTS_STATES.PLAYING);
    assert.equal(tts.isPlaying('msg-rapid'), true);
    assert.equal(tts.isPaused('msg-rapid'), false);
  }

  tts.stop();
  assert.equal(tts.getState(), TTS_STATES.IDLE);
});

test('SpeechSynthesisManager - Switching to another message cancels active speech and plays new message', () => {
  const mockSynth = new MockSpeechSynthesis();
  const tts = new SpeechSynthesisManager(mockSynth, MockUtterance);

  tts.speak('First message audio.', 'msg-1');
  assert.equal(tts.isPlaying('msg-1'), true);
  assert.equal(tts.isPlaying('msg-2'), false);

  // User clicks play on message 2
  tts.speak('Second message audio.', 'msg-2');
  assert.equal(tts.isPlaying('msg-1'), false);
  assert.equal(tts.isPlaying('msg-2'), true);
  assert.equal(tts.activeMessageId, 'msg-2');

  tts.stop();
  assert.equal(tts.isPlaying('msg-2'), false);
});

test('SpeechSynthesisManager - Chromium interrupted error during pause does NOT destroy paused utterance', () => {
  const mockSynth = new MockSpeechSynthesis();
  const tts = new SpeechSynthesisManager(mockSynth, MockUtterance);

  tts.speak('Chromium interrupted test.', 'msg-chrom');
  const utterance = tts.currentUtterance;

  tts.pause();
  assert.equal(tts.getState(), TTS_STATES.PAUSED);

  // Chromium fires 'interrupted' error on utterance when paused
  utterance.onerror({ error: 'interrupted' });

  // Utterance and PAUSED state must remain intact!
  assert.equal(tts.getState(), TTS_STATES.PAUSED);
  assert.equal(tts.isPaused('msg-chrom'), true);
  assert.equal(tts.currentUtterance, utterance);

  // Resume succeeds
  tts.resume();
  assert.equal(tts.getState(), TTS_STATES.PLAYING);
  assert.equal(tts.isPlaying('msg-chrom'), true);

  tts.stop();
});

test('SpeechSynthesisManager - Natural completion resets playback state to IDLE', () => {
  const mockSynth = new MockSpeechSynthesis();
  let completed = false;
  const tts = new SpeechSynthesisManager(mockSynth, MockUtterance);

  tts.speak('Short message.', 'msg-done', {
    onEnd: () => {
      completed = true;
    },
  });

  assert.equal(tts.isPlaying('msg-done'), true);

  // Utterance completes naturally
  tts.currentUtterance.onend();

  assert.equal(completed, true);
  assert.equal(tts.getState(), TTS_STATES.IDLE);
  assert.equal(tts.isPlaying('msg-done'), false);
  assert.equal(tts.isPaused('msg-done'), false);
  assert.equal(tts.currentUtterance, null);
});

test('SpeechRecognitionManager - Initial state and unsupported fallback', () => {
  // In Node environment, window.SpeechRecognition is not defined
  const stt = new SpeechRecognitionManager();
  assert.equal(stt.isSupported(), false);
  assert.equal(stt.getState(), SPEECH_STATES.READY);

  let errorCaptured = null;
  let stateRecorded = null;

  const started = stt.startListening({
    onStateChange: (state) => {
      stateRecorded = state;
    },
    onError: (err) => {
      errorCaptured = err;
    },
  });

  assert.equal(started, false);
  assert.equal(stt.getState(), SPEECH_STATES.ERROR);
  assert.ok(errorCaptured !== null);
  assert.match(errorCaptured.message, /not supported in this browser/);
});

test('SpeechRecognitionManager - Cancel listening resets state to READY', () => {
  const stt = new SpeechRecognitionManager();
  stt.cancelListening();
  assert.equal(stt.getState(), SPEECH_STATES.READY);
});

test('SpeechRecognitionManager - Salvages captured transcript on network disconnection', () => {
  // Mock SpeechRecognition class
  class MockSpeechRecognition {
    constructor() {
      this.continuous = false;
      this.interimResults = true;
      this.lang = 'en-US';
      this.onstart = null;
      this.onresult = null;
      this.onerror = null;
      this.onend = null;
    }
    start() {
      if (this.onstart) this.onstart();
    }
    stop() {
      if (this.onend) this.onend();
    }
    abort() {
      if (this.onend) this.onend();
    }
  }

  const stt = new SpeechRecognitionManager();
  stt.RecognitionClass = MockSpeechRecognition;

  let finalDelivered = null;
  let errorTriggered = null;

  stt.startListening({
    onFinalResult: (transcript) => {
      finalDelivered = transcript;
    },
    onError: (err) => {
      errorTriggered = err;
    },
  });

  // Simulate user speaking part of a question
  stt.recognition.onresult({
    resultIndex: 0,
    results: [
      [{ transcript: 'What is water hardness' }],
    ],
  });

  // Simulate network interruption
  stt.recognition.onerror({ error: 'network' });

  // Captured question should be preserved and delivered without throwing fatal error
  assert.equal(finalDelivered, 'What is water hardness');
  assert.equal(errorTriggered, null);
  assert.equal(stt.getState(), SPEECH_STATES.READY);
});


