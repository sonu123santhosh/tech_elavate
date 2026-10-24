/**
 * Automated Test Suite for Virtual Chemistry Lab — Experiments
 * Verifies all 15 experiments, data integrity, calculations, quizzes, and backend endpoints.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getAllExperiments,
  getExperimentById,
  getExperimentsByCategory,
  searchExperiments,
  evaluateExperimentQuiz,
} from '../frontend/src/features/virtual-lab/data/experimentsDatabase.js';

test('Virtual Lab Database - Contains exactly 15 experiments', () => {
  const all = getAllExperiments();
  assert.equal(all.length, 15, `Expected 15 experiments, found ${all.length}`);
});

test('Virtual Lab Database - All 15 experiments have valid sequential numbers 1–15 and unique IDs', () => {
  const all = getAllExperiments();
  const idSet = new Set();
  const numSet = new Set();

  for (let i = 0; i < all.length; i++) {
    const exp = all[i];
    assert.ok(exp.id, `Experiment at index ${i} missing ID`);
    assert.ok(!idSet.has(exp.id), `Duplicate experiment ID: ${exp.id}`);
    idSet.add(exp.id);

    assert.equal(exp.number, i + 1, `Expected experiment #${i + 1}, got #${exp.number}`);
    assert.ok(!numSet.has(exp.number), `Duplicate experiment number: ${exp.number}`);
    numSet.add(exp.number);
  }

  assert.equal(idSet.size, 15);
  assert.equal(numSet.size, 15);
});

test('Virtual Lab Database - Verifies all 15 required titles exist in exact order', () => {
  const expectedTitles = [
    'Acid–Base Titration',
    'pH Determination',
    'Preparation of a Standard Solution',
    'Filtration',
    'Crystallization and Recrystallization',
    'Paper Chromatography',
    'Simple Distillation',
    'Determination of Water Hardness',
    'Conductometric Titration',
    'pH-Metric Titration',
    'Chloride Estimation in Water',
    'Dissolved Oxygen in Water',
    'Viscosity Measurement',
    'Beer–Lambert Law',
    'Qualitative Salt Analysis',
  ];

  const all = getAllExperiments();
  for (let i = 0; i < expectedTitles.length; i++) {
    assert.equal(
      all[i].title,
      expectedTitles[i],
      `Experiment #${i + 1} expected "${expectedTitles[i]}", got "${all[i].title}"`
    );
  }
});

test('Virtual Lab Database - Every experiment has complete required educational fields', () => {
  const all = getAllExperiments();

  for (const exp of all) {
    // Aim & Principle
    assert.ok(exp.aim && exp.aim.trim().length > 15, `${exp.id} missing aim`);
    assert.ok(exp.principle && exp.principle.trim().length > 50, `${exp.id} missing principle`);

    // Apparatus & Chemicals
    assert.ok(Array.isArray(exp.apparatus) && exp.apparatus.length >= 3, `${exp.id} missing apparatus`);
    assert.ok(Array.isArray(exp.chemicals) && exp.chemicals.length >= 2, `${exp.id} missing chemicals`);

    // Procedure Steps
    assert.ok(Array.isArray(exp.procedureSteps) && exp.procedureSteps.length >= 4, `${exp.id} missing steps`);
    for (const step of exp.procedureSteps) {
      assert.ok(step.step >= 1, `${exp.id} invalid step number`);
      assert.ok(step.title && step.title.length > 2, `${exp.id} step missing title`);
      assert.ok(step.instruction && step.instruction.length > 10, `${exp.id} step missing instruction`);
    }

    // Observation Table
    assert.ok(exp.observationTable, `${exp.id} missing observation table`);
    assert.ok(Array.isArray(exp.observationTable.headers) && exp.observationTable.headers.length >= 2, `${exp.id} missing table headers`);
    assert.ok(Array.isArray(exp.observationTable.sampleRows) && exp.observationTable.sampleRows.length >= 1, `${exp.id} missing table rows`);
    assert.ok(exp.observationTable.note, `${exp.id} observation table missing sample/example note`);

    // Formulae / Calculations
    assert.ok(Array.isArray(exp.formulae) && exp.formulae.length >= 1, `${exp.id} missing formulae`);
    assert.ok(Array.isArray(exp.calculations) && exp.calculations.length >= 1, `${exp.id} missing calculations`);

    // Result & Interpretation
    assert.ok(exp.result, `${exp.id} missing result`);
    assert.ok(exp.result.summary && exp.result.summary.length > 10, `${exp.id} missing result summary`);
    assert.ok(Array.isArray(exp.result.values) && exp.result.values.length >= 1, `${exp.id} missing result values`);
    assert.ok(exp.result.interpretation && exp.result.interpretation.length > 10, `${exp.id} missing interpretation`);

    // Safety Precautions
    assert.ok(Array.isArray(exp.safetyPrecautions) && exp.safetyPrecautions.length >= 2, `${exp.id} missing safety`);

    // Quiz Questions (at least 3 questions per experiment, 4 options each)
    assert.ok(Array.isArray(exp.quiz) && exp.quiz.length >= 3, `${exp.id} missing quiz`);
    for (const q of exp.quiz) {
      assert.ok(q.question && q.question.length > 5, `${exp.id} invalid question`);
      assert.equal(q.options.length, 4, `${exp.id} question must have 4 options`);
      const uniqueOpts = new Set(q.options.map((o) => o.trim().toLowerCase()));
      assert.equal(uniqueOpts.size, 4, `${exp.id} options must be distinct`);
      assert.ok(q.correctAnswer >= 0 && q.correctAnswer <= 3, `${exp.id} invalid correctAnswer index`);
      assert.ok(q.explanation && q.explanation.length > 5, `${exp.id} missing explanation`);
    }
  }
});

test('Virtual Lab Database - Category filtering groups experiments accurately', () => {
  const titrimetric = getExperimentsByCategory('titrimetric');
  assert.equal(titrimetric.length, 5, 'Expected 5 titrimetric experiments');

  const instrumental = getExperimentsByCategory('instrumental');
  assert.equal(instrumental.length, 5, 'Expected 5 instrumental experiments');

  const separation = getExperimentsByCategory('separation');
  assert.equal(separation.length, 4, 'Expected 4 separation experiments');

  const qualitative = getExperimentsByCategory('qualitative');
  assert.equal(qualitative.length, 1, 'Expected 1 qualitative experiment');
});

test('Virtual Lab Database - Search engine matches across titles and chemicals', () => {
  const edtaResults = searchExperiments('EDTA');
  assert.ok(edtaResults.length >= 1);
  assert.ok(edtaResults.some((e) => e.id === 'determination-of-water-hardness'));

  const distillationResults = searchExperiments('Distillation');
  assert.ok(distillationResults.length >= 1);
  assert.equal(distillationResults[0].id, 'simple-distillation');
});

test('Virtual Lab Database - Simulator integration and distinction verification', () => {
  // Test search for simulators
  const phSimResults = searchExperiments('pH Titration Simulator');
  assert.ok(phSimResults.length >= 1);
  assert.ok(phSimResults.some((e) => e.id === 'ph-metric-titration'));

  const condSimResults = searchExperiments('Conductometric Simulator');
  assert.ok(condSimResults.length >= 1);
  assert.ok(condSimResults.some((e) => e.id === 'conductometric-titration'));

  const phDetResults = searchExperiments('pH Determination');
  assert.ok(phDetResults.length >= 1);
  assert.equal(phDetResults[0].id, 'ph-determination');

  // Verify simulator flags
  const exp9 = getExperimentById('conductometric-titration');
  assert.equal(exp9.hasSimulator, true);
  assert.equal(exp9.simulatorType, 'conductometric');

  const exp10 = getExperimentById('ph-metric-titration');
  assert.equal(exp10.hasSimulator, true);
  assert.equal(exp10.simulatorType, 'ph-metric');

  // Verify pH Determination is clearly distinguished
  const exp2 = getExperimentById('ph-determination');
  assert.ok(exp2.distinctionNote && exp2.distinctionNote.includes('Non-Titrimetric'));
  assert.notEqual(exp2.id, exp10.id);
});

test('Virtual Lab Database - Quiz evaluation calculates scores and explanations', () => {
  const exp = getExperimentById('acid-base-titration');
  const total = exp.quiz.length;

  // Perfect score
  const perfectAnswers = exp.quiz.map((q) => q.correctAnswer);
  const perfectRes = evaluateExperimentQuiz('acid-base-titration', perfectAnswers);
  assert.equal(perfectRes.isValid, true);
  assert.equal(perfectRes.score, total);
  assert.equal(perfectRes.percentage, 100);
  assert.match(perfectRes.message, /Perfect Score/);

  // Zero score
  const wrongAnswers = exp.quiz.map((q) => (q.correctAnswer + 1) % 4);
  const zeroRes = evaluateExperimentQuiz('acid-base-titration', wrongAnswers);
  assert.equal(zeroRes.isValid, true);
  assert.equal(zeroRes.score, 0);
  assert.equal(zeroRes.percentage, 0);

  // Invalid experiment
  const invalidRes = evaluateExperimentQuiz('non-existent-lab', [0, 0, 0]);
  assert.equal(invalidRes.isValid, false);
});

test('Virtual Lab Backend - Controller endpoints return sanitized responses', async () => {
  const {
    handleGetAllExperiments,
    handleGetExperimentById,
    handleEvaluateExperimentQuiz,
  } = await import('../backend/src/controllers/experimentController.js');

  // 1. All experiments
  let resDataAll = null;
  const resAll = {
    status(c) { assert.equal(c, 200); return this; },
    json(d) { resDataAll = d; return this; },
  };
  handleGetAllExperiments({}, resAll);
  assert.equal(resDataAll.success, true);
  assert.equal(resDataAll.count, 15);
  assert.equal(resDataAll.data.length, 15);

  // 2. Single experiment
  let resDataOne = null;
  const resOne = {
    status(c) { assert.equal(c, 200); return this; },
    json(d) { resDataOne = d; return this; },
  };
  handleGetExperimentById({ params: { id: 'beer-lambert-law' } }, resOne);
  assert.equal(resDataOne.success, true);
  assert.equal(resDataOne.data.title, 'Beer–Lambert Law');
  assert.equal(resDataOne.data.quizQuestions[0].correctAnswer, undefined, 'Answers must be sanitized');

  // 3. Quiz evaluate
  let resDataEval = null;
  const resEval = {
    status(c) { assert.equal(c, 200); return this; },
    json(d) { resDataEval = d; return this; },
  };
  handleEvaluateExperimentQuiz(
    { body: { experimentId: 'beer-lambert-law', answers: [0, 0, 0] } },
    resEval
  );
  assert.equal(resDataEval.success, true);
  assert.ok(resDataEval.evaluation.score !== undefined);
});
