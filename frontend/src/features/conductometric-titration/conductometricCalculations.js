import { linearRegression, lineIntersection, safeParseFloat, isStrictlyIncreasing } from '../../utils/mathUtils.js';

/**
 * Calculates Conductometric Titration equivalence point via intersection
 * of fitted pre-equivalence and post-equivalence linear trend lines.
 *
 * @param {Array<{volume: any, conductivity: any}>} rawReadings
 * @param {string} [unit='µS/cm'] Conductivity unit ('µS/cm' or 'mS/cm')
 * @param {number} [analyteVolume=20] Aliquot volume of CH3COOH in mL
 * @param {number} [titrantMolarity=0.1] Molarity of NaOH in mol/L
 * @returns {object} calculation results, regression models, and validation status
 */
export function calculateConductometricEquivalence(
  rawReadings,
  unit = 'µS/cm',
  analyteVolume = 20,
  titrantMolarity = 0.1
) {
  const cleaned = [];
  const errors = [];

  if (!rawReadings || !Array.isArray(rawReadings) || rawReadings.length === 0) {
    return {
      isValid: false,
      error: 'No conductivity readings provided. Please enter at least 4 readings.',
      readings: [],
    };
  }

  for (let i = 0; i < rawReadings.length; i++) {
    const row = rawReadings[i];
    const vol = safeParseFloat(row.volume);
    const cond = safeParseFloat(row.conductivity);

    if (vol === null || cond === null) {
      errors.push(`Row ${i + 1}: Missing or non-numeric volume or conductivity.`);
      continue;
    }

    if (vol < 0) {
      errors.push(`Row ${i + 1}: Volume cannot be negative (${vol} mL).`);
      continue;
    }

    if (cond < 0) {
      errors.push(`Row ${i + 1}: Measured conductivity cannot be negative (${cond} ${unit}).`);
      continue;
    }

    cleaned.push({ volume: vol, conductivity: cond, unit });
  }

  if (cleaned.length < 4) {
    return {
      isValid: false,
      error: errors.length > 0
        ? `Insufficient valid readings (${cleaned.length} valid). Errors: ${errors.join(' ')}`
        : 'Conductometric trendline fitting requires at least 4 valid readings (at least 2 before and 2 after equivalence).',
      readings: cleaned,
      validationErrors: errors,
    };
  }

  // Ensure volume is strictly sorted and increasing
  cleaned.sort((a, b) => a.volume - b.volume);

  if (!isStrictlyIncreasing(cleaned)) {
    return {
      isValid: false,
      error: 'Duplicate or non-increasing volume points detected. Volumes must strictly increase.',
      readings: cleaned,
      validationErrors: errors,
    };
  }

  // Piecewise Two-Line Linear Regression Optimization
  // Find partition index k (2 <= k <= cleaned.length - 2) that minimizes combined RSS
  let bestSplit = null;
  let minCombinedRss = Infinity;

  const n = cleaned.length;
  for (let k = 2; k <= n - 2; k++) {
    const branch1Points = cleaned.slice(0, k).map((p) => ({ x: p.volume, y: p.conductivity }));
    const branch2Points = cleaned.slice(k).map((p) => ({ x: p.volume, y: p.conductivity }));

    const reg1 = linearRegression(branch1Points);
    const reg2 = linearRegression(branch2Points);

    if (!reg1 || !reg2) continue;

    // In weak acid - strong base titration, post-equivalence slope (excess OH-) MUST be greater than pre-equivalence slope
    if (reg2.slope <= reg1.slope) {
      continue;
    }

    const intersection = lineIntersection(reg1.slope, reg1.intercept, reg2.slope, reg2.intercept);
    if (!intersection) continue;

    // Check if intersection is within reasonable range
    if (intersection.x < cleaned[0].volume || intersection.x > cleaned[n - 1].volume) {
      continue;
    }

    const combinedRss = reg1.rss + reg2.rss;
    if (combinedRss < minCombinedRss) {
      minCombinedRss = combinedRss;
      bestSplit = {
        splitIndex: k,
        reg1,
        reg2,
        intersection,
        branch1Points,
        branch2Points,
      };
    }
  }

  // Fallback: If strict slope condition was not met due to noise, try all splits without strict slope filter
  if (!bestSplit) {
    for (let k = 2; k <= n - 2; k++) {
      const b1 = cleaned.slice(0, k).map((p) => ({ x: p.volume, y: p.conductivity }));
      const b2 = cleaned.slice(k).map((p) => ({ x: p.volume, y: p.conductivity }));

      const reg1 = linearRegression(b1);
      const reg2 = linearRegression(b2);

      if (!reg1 || !reg2) continue;

      const inter = lineIntersection(reg1.slope, reg1.intercept, reg2.slope, reg2.intercept);
      if (!inter) continue;

      const combinedRss = reg1.rss + reg2.rss;
      if (combinedRss < minCombinedRss) {
        minCombinedRss = combinedRss;
        bestSplit = {
          splitIndex: k,
          reg1,
          reg2,
          intersection: inter,
          branch1Points: b1,
          branch2Points: b2,
        };
      }
    }
  }

  if (!bestSplit) {
    return {
      isValid: false,
      error:
        'Could not fit intersecting trend lines. Readings appear strictly monotonic or parallel. Ensure you have collected data points before AND after the equivalence point.',
      readings: cleaned,
      unit,
    };
  }

  const { reg1, reg2, intersection } = bestSplit;
  const eqVolume = intersection.x;
  const eqConductivity = intersection.y;

  // Stoichiometry
  const estimatedMolarity = analyteVolume > 0
    ? (titrantMolarity * eqVolume) / analyteVolume
    : null;

  return {
    isValid: true,
    readings: cleaned,
    unit,
    branch1: {
      slope: Number(reg1.slope.toFixed(4)),
      intercept: Number(reg1.intercept.toFixed(4)),
      r2: Number(reg1.r2.toFixed(4)),
      equation: `G = ${reg1.slope.toFixed(3)}·V + ${reg1.intercept.toFixed(2)}`,
    },
    branch2: {
      slope: Number(reg2.slope.toFixed(4)),
      intercept: Number(reg2.intercept.toFixed(4)),
      r2: Number(reg2.r2.toFixed(4)),
      equation: `G = ${reg2.slope.toFixed(3)}·V + ${reg2.intercept.toFixed(2)}`,
    },
    equivalencePoint: {
      volumeMl: Number(eqVolume.toFixed(2)),
      conductivity: Number(eqConductivity.toFixed(2)),
      unit,
      method: 'Intersection of Fitted Linear Trend Lines',
    },
    stoichiometry: {
      analyte: 'Acetic Acid (CH₃COOH)',
      titrant: 'Sodium Hydroxide (NaOH)',
      analyteVolumeMl: analyteVolume,
      titrantMolarity: titrantMolarity,
      calculatedMolarity: estimatedMolarity !== null ? Number(estimatedMolarity.toFixed(4)) : null,
      unit: 'mol/L (M)',
    },
    explanation:
      `The estimated equivalence point is found at the intersection of two linear regression branches: V_eq = (c₂ - c₁) / (m₂ - m₁) = ${eqVolume.toFixed(2)} mL. Line 1 (neutralization branch: slope = ${reg1.slope.toFixed(3)}) reflects the conversion of weak acetic acid into sodium acetate (CH₃COO⁻ and Na⁺ ions). Line 2 (excess titrant branch: slope = ${reg2.slope.toFixed(3)}) shows a much steeper rise due to the high ionic mobility of free hydroxyl ions (OH⁻). Note: This value is a mathematical estimate derived by linear extrapolation, clearly distinguished from individual raw sensor readings.`,
  };
}
