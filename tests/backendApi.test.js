import test from 'node:test';
import assert from 'node:assert/strict';
import { handleHealth, handleChat } from '../backend/src/controllers/chatController.js';

test('Backend Controller - Health check returns status and service information', () => {
  const req = {};
  let responseData = null;
  let statusCode = null;

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
  };

  handleHealth(req, res);

  assert.equal(statusCode, 200);
  assert.equal(responseData.status, 'ok');
  assert.equal(responseData.service, 'Smart Lab Equipment Assistant API');
  assert.ok('geminiConfigured' in responseData);
});

test('Backend Controller - handleChat rejects missing or invalid messages with 400', async () => {
  let statusCode = null;
  let responseData = null;

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
  };

  // Missing message
  await handleChat({ body: {} }, res);
  assert.equal(statusCode, 400);
  assert.equal(responseData.success, false);
  assert.match(responseData.error, /"message" is required/);

  // Blank message
  await handleChat({ body: { message: '   ' } }, res);
  assert.equal(statusCode, 400);
  assert.equal(responseData.success, false);
  assert.match(responseData.error, /cannot be empty/);

  // Message exceeding 2000 chars
  const longMsg = 'a'.repeat(2500);
  await handleChat({ body: { message: longMsg } }, res);
  assert.equal(statusCode, 400);
  assert.equal(responseData.success, false);
  assert.match(responseData.error, /exceeds the 2,000 character limit/);
});

test('Backend Controller - handleChat returns 503 if GEMINI_API_KEY is not configured', async () => {
  // Ensure GEMINI_API_KEY is unset or default placeholder
  const originalKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;

  let statusCode = null;
  let responseData = null;

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
  };

  await handleChat({ body: { message: 'What is acetic acid?' } }, res);

  assert.equal(statusCode, 503);
  assert.equal(responseData.success, false);
  assert.equal(responseData.code, 'MISSING_API_KEY');
  assert.match(responseData.error, /GEMINI_API_KEY is not configured/);

  // Restore
  if (originalKey) {
    process.env.GEMINI_API_KEY = originalKey;
  }
});

test('Backend Controller - handleChatStream rejects missing or empty messages with 400', async () => {
  const { handleChatStream } = await import('../backend/src/controllers/chatController.js');

  let statusCode = null;
  let responseData = null;

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
    setHeader() {},
  };

  // Missing message
  await handleChatStream({ body: {} }, res);
  assert.equal(statusCode, 400);
  assert.equal(responseData.success, false);
  assert.match(responseData.error, /"message" is required/);

  // Blank message
  await handleChatStream({ body: { message: '   ' } }, res);
  assert.equal(statusCode, 400);
  assert.equal(responseData.success, false);
  assert.match(responseData.error, /cannot be empty/);

  // Exceeding 2000 chars
  await handleChatStream({ body: { message: 'x'.repeat(2500) } }, res);
  assert.equal(statusCode, 400);
  assert.equal(responseData.success, false);
  assert.match(responseData.error, /exceeds the 2,000 character limit/);
});

test('Backend Controller - handleChatStream returns 503 if GEMINI_API_KEY is not configured', async () => {
  const { handleChatStream } = await import('../backend/src/controllers/chatController.js');
  const originalKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;

  let statusCode = null;
  let responseData = null;

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
    setHeader() {},
  };

  await handleChatStream({ body: { message: 'Explain pH' } }, res);
  assert.equal(statusCode, 503);
  assert.equal(responseData.code, 'MISSING_API_KEY');

  if (originalKey) {
    process.env.GEMINI_API_KEY = originalKey;
  }
});

test('Backend Controller - handleGetAllEquipment returns all 63 items sanitized', async () => {
  const { handleGetAllEquipment } = await import('../backend/src/controllers/quizController.js');

  let statusCode = 200;
  let responseData = null;
  const res = {
    status(c) { statusCode = c; return this; },
    json(d) { responseData = d; return this; },
  };

  handleGetAllEquipment({}, res);

  assert.equal(statusCode, 200);
  assert.equal(responseData.success, true);
  assert.equal(responseData.count, 63);
  assert.equal(responseData.data.length, 63);

  // Check first item
  const first = responseData.data[0];
  assert.ok(first.id);
  assert.ok(first.name);
  assert.ok(first.mainUse);
  assert.equal(first.quiz, undefined, 'Quiz answers should not be leaked in list view');
});

test('Backend Controller - handleGetEquipmentById returns single item or 404', async () => {
  const { handleGetEquipmentById } = await import('../backend/src/controllers/quizController.js');

  let statusCode = 200;
  let responseData = null;
  const res = {
    status(c) { statusCode = c; return this; },
    json(d) { responseData = d; return this; },
  };

  // Valid ID: microscope
  handleGetEquipmentById({ params: { id: 'microscope' } }, res);
  assert.equal(statusCode, 200);
  assert.equal(responseData.success, true);
  assert.equal(responseData.data.name, 'Microscope');
  assert.equal(responseData.data.number, 63);
  assert.equal(responseData.data.quizQuestions.length, 5);
  assert.equal(responseData.data.quizQuestions[0].correctAnswer, undefined, 'correctAnswer index should be sanitized');

  // Invalid ID
  handleGetEquipmentById({ params: { id: 'laser-cannon' } }, res);
  assert.equal(statusCode, 404);
  assert.equal(responseData.success, false);
});

test('Backend Controller - handleEvaluateQuiz performs server-side score calculation and validates payload', async () => {
  const { handleEvaluateQuiz } = await import('../backend/src/controllers/quizController.js');

  let statusCode = 200;
  let responseData = null;
  const res = {
    status(c) { statusCode = c; return this; },
    json(d) { responseData = d; return this; },
  };

  // Missing equipmentId
  handleEvaluateQuiz({ body: { answers: [0, 1, 2, 3, 0] } }, res);
  assert.equal(statusCode, 400);

  // Invalid answers length
  handleEvaluateQuiz({ body: { equipmentId: 'beaker', answers: [0, 1] } }, res);
  assert.equal(statusCode, 400);

  // Valid submission for beaker
  handleEvaluateQuiz({ body: { equipmentId: 'beaker', answers: [0, 0, 0, 0, 0] } }, res);
  assert.equal(statusCode, 200);
  assert.equal(responseData.success, true);
  assert.equal(responseData.evaluation.score, 5);
  assert.equal(responseData.evaluation.percentage, 100);
});

