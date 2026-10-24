import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePhEquivalence } from '../frontend/src/features/ph-titration/phCalculations.js';
import { PH_EXPERIMENT_METADATA } from '../frontend/src/features/ph-titration/phData.js';

test('pH Calculation - Demonstration Sample Data yields expected equivalence point', () => {
  const sample = PH_EXPERIMENT_METADATA.sampleData;
  const result = calculatePhEquivalence(sample, 20.0, 0.1);

  assert.equal(result.isValid, true);
  assert.ok(result.equivalencePoint.volumeMl >= 19.5 && result.equivalencePoint.volumeMl <= 20.5);
  // Equivalence pH of acetic acid with NaOH should be basic (pH > 7)
  assert.ok(result.equivalencePoint.ph > 7.0);
  assert.ok(result.stoichiometry.calculatedMolarity !== null);
  assert.ok(result.stoichiometry.calculatedMolarity > 0.09 && result.stoichiometry.calculatedMolarity < 0.11);
});

test('pH Calculation - Handles empty and insufficient readings gracefully', () => {
  const emptyRes = calculatePhEquivalence([]);
  assert.equal(emptyRes.isValid, false);
  assert.match(emptyRes.error, /Please enter at least 3 readings/);

  const twoPoints = [
    { volume: 0, ph: 3.0 },
    { volume: 10, ph: 5.0 },
  ];
  const insufficientRes = calculatePhEquivalence(twoPoints);
  assert.equal(insufficientRes.isValid, false);
  assert.match(insufficientRes.error, /At least 3 valid readings are required/);
});

test('pH Calculation - Validates range limits and negative volumes', () => {
  const invalidData = [
    { volume: -2, ph: 4.0 }, // negative volume
    { volume: 5, ph: 16.0 }, // pH > 14
    { volume: 10, ph: -1.0 }, // pH < 0
  ];
  const res = calculatePhEquivalence(invalidData);
  assert.equal(res.isValid, false);
  assert.ok(res.validationErrors.length >= 3);
});

test('pH Calculation - Detects duplicate or non-increasing volumes', () => {
  const nonIncreasing = [
    { volume: 5, ph: 4.0 },
    { volume: 10, ph: 5.0 },
    { volume: 10, ph: 7.0 }, // duplicate
    { volume: 15, ph: 10.0 },
  ];
  const res = calculatePhEquivalence(nonIncreasing);
  assert.equal(res.isValid, false);
  assert.match(res.error, /Duplicate or non-increasing volume/);
});

test('pH Calculation - Detects flat titration curves without inflection', () => {
  const flatData = [
    { volume: 0, ph: 7.0 },
    { volume: 5, ph: 7.01 },
    { volume: 10, ph: 7.02 },
    { volume: 15, ph: 7.03 },
  ];
  const res = calculatePhEquivalence(flatData);
  assert.equal(res.isValid, false);
  assert.match(res.error, /No distinct inflection point detected/);
});
