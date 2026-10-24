import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EQUIPMENT_DATABASE,
  getAllEquipment,
  getEquipmentById,
  getEquipmentByCategory,
  searchEquipment,
  evaluateQuiz,
} from '../frontend/src/features/ar-quiz/equipmentDatabase.js';

test('Equipment Database - Contains exactly 63 equipment items', () => {
  const all = getAllEquipment();
  assert.equal(all.length, 63, `Expected 63 items, found ${all.length}`);
});

test('Equipment Database - All 63 equipment items have unique IDs and positive numbers', () => {
  const all = getAllEquipment();
  const idSet = new Set();
  const numSet = new Set();

  for (const item of all) {
    assert.ok(item.id, `Item missing id: ${JSON.stringify(item)}`);
    assert.ok(!idSet.has(item.id), `Duplicate ID found: ${item.id}`);
    idSet.add(item.id);

    assert.ok(item.number >= 1 && item.number <= 63, `Invalid number: ${item.number} for ${item.id}`);
    assert.ok(!numSet.has(item.number), `Duplicate number found: ${item.number}`);
    numSet.add(item.number);
  }

  assert.equal(idSet.size, 63);
  assert.equal(numSet.size, 63);
});

test('Equipment Database - Preserves supplied names and main uses for key equipment', () => {
  const beaker = getEquipmentById('beaker');
  assert.ok(beaker);
  assert.equal(beaker.name, 'Beaker');
  assert.equal(beaker.mainUse, 'Holding and mixing liquids.');

  const burette = getEquipmentById('burette');
  assert.ok(burette);
  assert.equal(burette.name, 'Burette');
  assert.equal(burette.mainUse, 'Delivering liquid during titration.');

  const bunsen = getEquipmentById('bunsen-burner');
  assert.ok(bunsen);
  assert.equal(bunsen.name, 'Bunsen Burner');
  assert.equal(bunsen.mainUse, 'Heating substances using a flame.');
});

test('Equipment Database - Laboratory pH Meter and Digital / Portable pH Meter are distinct', () => {
  const labPh = getEquipmentById('laboratory-ph-meter');
  const portablePh = getEquipmentById('digital-portable-ph-meter');

  assert.ok(labPh, 'laboratory-ph-meter must exist');
  assert.ok(portablePh, 'digital-portable-ph-meter must exist');
  assert.notEqual(labPh.id, portablePh.id);
  assert.equal(labPh.name, 'Laboratory pH Meter');
  assert.equal(labPh.mainUse, 'Measuring solution pH using an electrode.');
  assert.equal(portablePh.name, 'Digital / Portable pH Meter');
  assert.equal(portablePh.mainUse, 'Portable electronic measurement of solution pH.');
});

test('Equipment Database - Microscope exists and has correct metadata', () => {
  const scope = getEquipmentById('microscope');
  assert.ok(scope);
  assert.equal(scope.number, 63);
  assert.equal(scope.name, 'Microscope');
  assert.equal(scope.mainUse, 'Magnifying small objects and specimens for observation.');
});

test('Equipment Database - Every item has complete instructions, guidance, precautions, and 5 valid questions', () => {
  const all = getAllEquipment();

  for (const item of all) {
    assert.ok(item.operatingInstructions && item.operatingInstructions.length >= 2, `${item.id} missing instructions`);
    assert.ok(item.handlingGuidance && item.handlingGuidance.length >= 1, `${item.id} missing handling`);
    assert.ok(item.safetyPrecautions && item.safetyPrecautions.length >= 1, `${item.id} missing precautions`);

    assert.ok(item.quiz, `${item.id} missing quiz`);
    assert.equal(item.quiz.length, 5, `${item.id} must have exactly 5 questions (got ${item.quiz.length})`);

    for (let qIdx = 0; qIdx < item.quiz.length; qIdx++) {
      const q = item.quiz[qIdx];
      assert.ok(q.question && q.question.trim().length > 5, `${item.id} Q${qIdx + 1} invalid question`);
      assert.ok(Array.isArray(q.options), `${item.id} Q${qIdx + 1} options must be array`);
      assert.equal(q.options.length, 4, `${item.id} Q${qIdx + 1} must have 4 options`);

      // Verify all 4 options are distinct
      const uniqueOpts = new Set(q.options.map((o) => o.trim().toLowerCase()));
      assert.equal(uniqueOpts.size, 4, `${item.id} Q${qIdx + 1} options must be distinct`);

      // Verify correct answer is 0, 1, 2, or 3
      assert.ok(q.correctAnswer >= 0 && q.correctAnswer <= 3, `${item.id} Q${qIdx + 1} invalid correctAnswer`);
      assert.ok(q.explanation && q.explanation.trim().length > 5, `${item.id} Q${qIdx + 1} missing explanation`);
    }
  }
});

test('Quiz Evaluation - Computes score and percentage accurately', () => {
  // Perfect score (5/5 = 100%)
  const perfect = evaluateQuiz('beaker', [0, 0, 0, 0, 0]);
  assert.equal(perfect.isValid, true);
  assert.equal(perfect.score, 5);
  assert.equal(perfect.totalQuestions, 5);
  assert.equal(perfect.percentage, 100);
  assert.match(perfect.message, /Perfect Score/);

  // Partial score (3/5 = 60%)
  const partial = evaluateQuiz('beaker', [0, 0, 0, 1, 1]);
  assert.equal(partial.isValid, true);
  assert.equal(partial.score, 3);
  assert.equal(partial.percentage, 60);

  // Zero score (0/5 = 0%)
  const zero = evaluateQuiz('beaker', [1, 1, 1, 1, 1]);
  assert.equal(zero.isValid, true);
  assert.equal(zero.score, 0);
  assert.equal(zero.percentage, 0);

  // Invalid equipment ID handled gracefully
  const invalid = evaluateQuiz('non-existent-device', [0, 0, 0, 0, 0]);
  assert.equal(invalid.isValid, false);
  assert.match(invalid.error, /not found/);
});

test('Search & Filter - Filters by category and search queries', () => {
  const glassware = getEquipmentByCategory('glassware');
  assert.ok(glassware.length >= 10);

  const searchRes = searchEquipment('titration');
  assert.ok(searchRes.length >= 2);
  const ids = searchRes.map((i) => i.id);
  assert.ok(ids.includes('burette') || ids.includes('conical-flask'));
});

test('QuizEngine - State machine navigation, selection, and retry reset', async () => {
  const { QuizEngine } = await import('../frontend/src/features/ar-quiz/QuizEngine.js');
  const engine = new QuizEngine('beaker');

  assert.equal(engine.getCurrentIndex(), 0);
  assert.equal(engine.getTotalQuestions(), 5);
  assert.equal(engine.getSelectedAnswer(), null);

  // Attempting to advance without selection returns error
  const step0Adv = engine.nextQuestion();
  assert.equal(step0Adv.success, false);
  assert.match(step0Adv.error, /select an answer/);

  // Select option 0
  engine.selectAnswer(0);
  assert.equal(engine.getSelectedAnswer(), 0);

  // Can now advance to question 1
  assert.equal(engine.nextQuestion().success, true);
  assert.equal(engine.getCurrentIndex(), 1);

  // Can navigate back and previous answer is preserved
  assert.equal(engine.prevQuestion().success, true);
  assert.equal(engine.getCurrentIndex(), 0);
  assert.equal(engine.getSelectedAnswer(), 0);

  // Complete all 5 questions
  engine.selectAnswer(0); // Q1
  engine.nextQuestion();
  engine.selectAnswer(0); // Q2
  engine.nextQuestion();
  engine.selectAnswer(0); // Q3
  engine.nextQuestion();
  engine.selectAnswer(0); // Q4
  engine.nextQuestion();
  engine.selectAnswer(0); // Q5

  assert.equal(engine.isLastQuestion(), true);

  // Submit quiz
  const submitRes = engine.submitQuiz();
  assert.equal(submitRes.success, true);
  assert.equal(submitRes.result.score, 5);
  assert.equal(submitRes.result.percentage, 100);

  // Reset for retry
  engine.reset();
  assert.equal(engine.getCurrentIndex(), 0);
  assert.equal(engine.getSelectedAnswer(), null);
  assert.equal(engine.isSubmitted, false);
});

test('QuizEngine - Interactive Check Answer, answer locking, and immediate educational feedback', async () => {
  const { QuizEngine } = await import('../frontend/src/features/ar-quiz/QuizEngine.js');
  const engine = new QuizEngine('burette');

  // Attempting to check answer before selection returns error
  const unselectedCheck = engine.checkAnswer();
  assert.equal(unselectedCheck.success, false);
  assert.match(unselectedCheck.error, /select an answer/);
  assert.equal(engine.isAnswerChecked(), false);

  // Select an answer
  engine.selectAnswer(0); // For burette Q1: Delivering liquid during titration (correct)
  assert.equal(engine.getSelectedAnswer(), 0);

  // Check the answer
  const checkRes = engine.checkAnswer();
  assert.equal(checkRes.success, true);
  assert.equal(checkRes.isCorrect, true);
  assert.equal(checkRes.correctAnswer, 0);
  assert.ok(checkRes.explanation && checkRes.explanation.length > 5);
  assert.equal(engine.isAnswerChecked(), true);
  assert.equal(engine.getScoreSoFar(), 1);

  // Crucial test: User cannot change answer once checked (prevents repeatedly submitting to change score)
  engine.selectAnswer(1);
  assert.equal(engine.getSelectedAnswer(), 0, 'Answer must remain locked at original choice after checking');

  // Advance to next question
  assert.equal(engine.nextQuestion().success, true);
  assert.equal(engine.getCurrentIndex(), 1);
  assert.equal(engine.isAnswerChecked(), false);

  // Select wrong answer
  engine.selectAnswer(3);
  const wrongCheck = engine.checkAnswer();
  assert.equal(wrongCheck.success, true);
  assert.equal(wrongCheck.isCorrect, false);
  assert.equal(engine.isAnswerChecked(), true);
  assert.equal(engine.getScoreSoFar(), 1); // score remains 1

  // User cannot overwrite wrong answer to correct one after checking
  engine.selectAnswer(wrongCheck.correctAnswer);
  assert.equal(engine.getSelectedAnswer(), 3, 'Cannot change incorrect answer after checking');

  // Verify reset clears checked status
  engine.reset();
  assert.equal(engine.isAnswerChecked(), false);
  assert.equal(engine.getScoreSoFar(), 0);
});
