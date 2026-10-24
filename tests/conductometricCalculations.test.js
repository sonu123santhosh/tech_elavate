import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateConductometricEquivalence } from '../frontend/src/features/conductometric-titration/conductometricCalculations.js';
import { CONDUCTOMETRIC_EXPERIMENT_METADATA } from '../frontend/src/features/conductometric-titration/conductometricData.js';
import { linearRegression, lineIntersection } from '../frontend/src/utils/mathUtils.js';

test('Math Utils - Linear regression calculates slope, intercept, and R²', () => {
  // Line y = 2x + 5
  const points = [
    { x: 1, y: 7 },
    { x: 2, y: 9 },
    { x: 3, y: 11 },
    { x: 4, y: 13 },
  ];
  const reg = linearRegression(points);
  assert.ok(reg !== null);
  assert.ok(Math.abs(reg.slope - 2.0) < 1e-6);
  assert.ok(Math.abs(reg.intercept - 5.0) < 1e-6);
  assert.ok(Math.abs(reg.r2 - 1.0) < 1e-6);
});

test('Math Utils - Line intersection solves system of equations', () => {
  // Line 1: y = 2x + 10
  // Line 2: y = 5x - 5
  // 2x + 10 = 5x - 5 => 3x = 15 => x = 5, y = 20
  const inter = lineIntersection(2, 10, 5, -5);
  assert.ok(inter !== null);
  assert.ok(Math.abs(inter.x - 5.0) < 1e-6);
  assert.ok(Math.abs(inter.y - 20.0) < 1e-6);
});

test('Conductometric Calculation - Demonstration Sample Data yields expected intersection equivalence point', () => {
  const sample = CONDUCTOMETRIC_EXPERIMENT_METADATA.sampleData;
  const result = calculateConductometricEquivalence(sample, 'µS/cm', 20.0, 0.1);

  assert.equal(result.isValid, true);
  assert.ok(result.equivalencePoint.volumeMl >= 19.0 && result.equivalencePoint.volumeMl <= 21.0);
  // Post-equivalence slope must be steeper than pre-equivalence
  assert.ok(result.branch2.slope > result.branch1.slope);
  assert.ok(result.stoichiometry.calculatedMolarity > 0.09 && result.stoichiometry.calculatedMolarity < 0.11);
});

test('Conductometric Calculation - Rejects insufficient readings (<4 points)', () => {
  const threePoints = [
    { volume: 0, conductivity: 100 },
    { volume: 5, conductivity: 120 },
    { volume: 10, conductivity: 150 },
  ];
  const res = calculateConductometricEquivalence(threePoints);
  assert.equal(res.isValid, false);
  assert.match(res.error, /requires at least 4 valid readings/);
});

test('Conductometric Calculation - Rejects negative volumes and conductivities', () => {
  const invalidPoints = [
    { volume: -1, conductivity: 100 },
    { volume: 5, conductivity: -50 },
    { volume: 10, conductivity: 200 },
    { volume: 15, conductivity: 300 },
  ];
  const res = calculateConductometricEquivalence(invalidPoints);
  assert.equal(res.isValid, false);
  assert.ok(res.validationErrors.length >= 2);
});
