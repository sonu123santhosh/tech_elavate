/**
 * Mathematical utilities for titration curve analysis, linear regression,
 * numerical derivatives, and equivalence point determination.
 */

/**
 * Calculates simple linear regression for a set of [x, y] points.
 * Model: y = m * x + c
 *
 * @param {Array<{x: number, y: number}>} points
 * @returns {{ slope: number, intercept: number, r2: number, rss: number } | null}
 */
export function linearRegression(points) {
  if (!points || points.length < 2) return null;

  const n = points.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < n; i++) {
    const x = points[i].x;
    const y = points[i].y;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
    sumY2 += y * y;
  }

  const denominator = n * sumX2 - sumX * sumX;
  if (Math.abs(denominator) < 1e-12) {
    // Vertical line or identical x coordinates
    return null;
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  // Compute Residual Sum of Squares (RSS) and Total Sum of Squares (TSS) for R²
  const meanY = sumY / n;
  let rss = 0;
  let tss = 0;

  for (let i = 0; i < n; i++) {
    const yPredicted = slope * points[i].x + intercept;
    const residual = points[i].y - yPredicted;
    rss += residual * residual;
    const diffMean = points[i].y - meanY;
    tss += diffMean * diffMean;
  }

  const r2 = tss > 1e-12 ? Math.max(0, 1 - rss / tss) : 1;

  return { slope, intercept, r2, rss };
}

/**
 * Computes intersection of two lines:
 * Line 1: y = m1 * x + c1
 * Line 2: y = m2 * x + c2
 *
 * @param {number} m1
 * @param {number} c1
 * @param {number} m2
 * @param {number} c2
 * @returns {{ x: number, y: number } | null}
 */
export function lineIntersection(m1, c1, m2, c2) {
  const deltaM = m1 - m2;
  if (Math.abs(deltaM) < 1e-9) {
    // Parallel lines, no unique intersection
    return null;
  }

  const x = (c2 - c1) / deltaM;
  const y = m1 * x + c1;

  return { x, y };
}

/**
 * Validates strictly ascending volume sequence.
 * @param {Array<{volume: number, value: number}>} readings
 * @returns {boolean}
 */
export function isStrictlyIncreasing(readings) {
  if (!readings || readings.length < 2) return true;
  for (let i = 1; i < readings.length; i++) {
    if (readings[i].volume <= readings[i - 1].volume) {
      return false;
    }
  }
  return true;
}

/**
 * Safely parse numbers.
 * @param {any} val
 * @returns {number|null}
 */
export function safeParseFloat(val) {
  if (val === null || val === undefined || val === '') return null;
  const num = Number(val);
  return Number.isFinite(num) ? num : null;
}
