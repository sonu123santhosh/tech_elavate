import { safeParseFloat, isStrictlyIncreasing } from '../../utils/mathUtils.js';

/**
 * Calculates pH-Metric Titration equivalence point and derivative curves.
 *
 * @param {Array<{volume: any, ph: any}>} rawReadings
 * @param {number} [analyteVolume=20] Aliquot volume of CH3COOH in mL
 * @param {number} [titrantMolarity=0.1] Molarity of NaOH in mol/L
 * @returns {object} calculation results, validation errors, and derivative series
 */
export function calculatePhEquivalence(rawReadings, analyteVolume = 20, titrantMolarity = 0.1) {
  // 1. Sanitize & Filter invalid inputs
  const cleaned = [];
  const errors = [];

  if (!rawReadings || !Array.isArray(rawReadings) || rawReadings.length === 0) {
    return {
      isValid: false,
      error: 'No data entries provided. Please enter at least 3 readings.',
      readings: [],
    };
  }

  for (let i = 0; i < rawReadings.length; i++) {
    const row = rawReadings[i];
    const vol = safeParseFloat(row.volume);
    const ph = safeParseFloat(row.ph);

    if (vol === null || ph === null) {
      errors.push(`Row ${i + 1}: Missing or invalid numerical value.`);
      continue;
    }

    if (vol < 0) {
      errors.push(`Row ${i + 1}: Volume cannot be negative (${vol} mL).`);
      continue;
    }

    if (ph < 0 || ph > 14) {
      errors.push(`Row ${i + 1}: pH value must be between 0.00 and 14.00 (got ${ph}).`);
      continue;
    }

    cleaned.push({ volume: vol, ph: ph });
  }

  if (cleaned.length < 3) {
    return {
      isValid: false,
      error: errors.length > 0
        ? `Insufficient valid readings (${cleaned.length} valid). Errors: ${errors.join(' ')}`
        : 'At least 3 valid readings are required to compute titration derivatives.',
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

  // 2. First Derivative: ΔpH / ΔV at midpoints
  // d1[i] = (pH[i+1] - pH[i]) / (V[i+1] - V[i])
  // midV[i] = (V[i+1] + V[i]) / 2
  const firstDerivative = [];
  let maxD1 = -Infinity;
  let maxD1Index = -1;

  for (let i = 0; i < cleaned.length - 1; i++) {
    const dV = cleaned[i + 1].volume - cleaned[i].volume;
    const dpH = cleaned[i + 1].ph - cleaned[i].ph;
    const d1 = dpH / dV;
    const midV = (cleaned[i + 1].volume + cleaned[i].volume) / 2;

    firstDerivative.push({
      midVolume: Number(midV.toFixed(3)),
      d1: Number(d1.toFixed(4)),
      v1: cleaned[i].volume,
      v2: cleaned[i + 1].volume,
      ph1: cleaned[i].ph,
      ph2: cleaned[i + 1].ph,
    });

    if (d1 > maxD1) {
      maxD1 = d1;
      maxD1Index = i;
    }
  }

  // Check if first derivative is negligible (flat line, no neutralization leap)
  if (maxD1 <= 0.05) {
    return {
      isValid: false,
      error: 'No distinct inflection point detected. The pH change rate (ΔpH/ΔV) is too low across all intervals. Verify your readings.',
      readings: cleaned,
      firstDerivative,
      secondDerivative: [],
    };
  }

  // 3. Second Derivative: Δ²pH / ΔV²
  // d2[i] = (d1[i+1] - d1[i]) / (midV[i+1] - midV[i])
  const secondDerivative = [];
  for (let i = 0; i < firstDerivative.length - 1; i++) {
    const dMidV = firstDerivative[i + 1].midVolume - firstDerivative[i].midVolume;
    const dd1 = firstDerivative[i + 1].d1 - firstDerivative[i].d1;
    const d2 = dd1 / dMidV;
    const v2Mid = (firstDerivative[i + 1].midVolume + firstDerivative[i].midVolume) / 2;

    secondDerivative.push({
      midVolume: Number(v2Mid.toFixed(3)),
      d2: Number(d2.toFixed(4)),
      d1_left: firstDerivative[i].d1,
      d1_right: firstDerivative[i + 1].d1,
    });
  }

  // 4. Determine Equivalence Point:
  // Locate zero-crossing of second derivative in the vicinity of max first derivative
  let eqVolume = null;
  let method = 'First Derivative Peak (ΔpH/ΔV)';

  // Search for zero crossing where d2 changes from positive to negative near maxD1
  let zeroCrossingFound = false;
  for (let i = 0; i < secondDerivative.length - 1; i++) {
    const d2Current = secondDerivative[i].d2;
    const d2Next = secondDerivative[i + 1].d2;

    if (d2Current > 0 && d2Next < 0) {
      // Linear interpolation to find exact zero
      // V_zero = V_current + (0 - d2Current) * (V_next - V_current) / (d2Next - d2Current)
      const vCurr = secondDerivative[i].midVolume;
      const vNext = secondDerivative[i + 1].midVolume;
      eqVolume = vCurr + (-d2Current) * (vNext - vCurr) / (d2Next - d2Current);
      method = 'Second Derivative Zero-Crossing (Δ²pH/ΔV² = 0)';
      zeroCrossingFound = true;
      break;
    }
  }

  // Fallback to first derivative maximum interval midpoint if zero-crossing was not bracketed
  if (!zeroCrossingFound || eqVolume === null || eqVolume < cleaned[0].volume || eqVolume > cleaned[cleaned.length - 1].volume) {
    const peakInterval = firstDerivative[maxD1Index];
    eqVolume = peakInterval.midVolume;
    method = 'First Derivative Maximum Rate (ΔpH/ΔV peak)';
  }

  // Estimate pH at equivalence volume via piecewise linear interpolation
  let eqPh = null;
  for (let i = 0; i < cleaned.length - 1; i++) {
    if (eqVolume >= cleaned[i].volume && eqVolume <= cleaned[i + 1].volume) {
      const fraction = (eqVolume - cleaned[i].volume) / (cleaned[i + 1].volume - cleaned[i].volume);
      eqPh = cleaned[i].ph + fraction * (cleaned[i + 1].ph - cleaned[i].ph);
      break;
    }
  }

  if (eqPh === null) {
    eqPh = cleaned[cleaned.length - 1].ph;
  }

  // 5. Calculate stoichiometric molarity of Acetic Acid (CH3COOH)
  // Reaction: CH3COOH + NaOH -> CH3COONa + H2O (1:1 mole ratio)
  // M_acid * V_acid = M_base * V_eq
  // M_acid = (M_base * V_eq) / V_acid
  const estimatedMolarity = analyteVolume > 0
    ? (titrantMolarity * eqVolume) / analyteVolume
    : null;

  return {
    isValid: true,
    readings: cleaned,
    firstDerivative,
    secondDerivative,
    maxRate: Number(maxD1.toFixed(4)),
    equivalencePoint: {
      volumeMl: Number(eqVolume.toFixed(2)),
      ph: Number(eqPh.toFixed(2)),
      method,
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
      `The equivalence point occurs at ${eqVolume.toFixed(2)} mL of NaOH where the rate of change of pH (ΔpH/ΔV) reaches its peak and the second derivative crosses zero. At this point, moles of NaOH added equals moles of CH₃COOH originally present. The estimated pH at equivalence is ${eqPh.toFixed(2)}, which is greater than 7.00 due to the hydrolysis of sodium acetate salt (CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻).`,
  };
}
