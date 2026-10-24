/**
 * Educational curriculum data, theories, safety protocols, and sample data
 * for pH-Metric Titration of Acetic Acid with Sodium Hydroxide.
 */

export const PH_EXPERIMENT_METADATA = {
  title: 'pH-Metric Titration of Acetic Acid with Sodium Hydroxide',
  code: 'EXP-PH-01',
  analyte: 'Acetic Acid (CH₃COOH)',
  titrant: 'Sodium Hydroxide (NaOH)',
  objective:
    'To determine the precise equivalence point and concentration of an unknown acetic acid solution by titrating against standardized sodium hydroxide solution using a calibrated digital pH meter.',
  theory:
    'Acetic acid (CH₃COOH) is a weak monobasic acid (Ka ≈ 1.8 × 10⁻⁵) that ionizes partially in aqueous solution: CH₃COOH ⇌ CH₃COO⁻ + H⁺. When titrated with strong base NaOH, the reaction proceeds as: CH₃COOH + NaOH → CH₃COONa + H₂O. Before the equivalence point, a buffer system (CH₃COOH / CH₃COO⁻) resists steep pH changes. At the equivalence point, all acetic acid is converted to sodium acetate. Hydrolysis of the acetate anion (CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻) makes the solution weakly basic (pH typically between 8.5 and 9.0). Beyond equivalence, excess OH⁻ ions cause pH to climb towards ~12.',
  
  instruments: [
    {
      name: 'Digital pH Meter',
      purpose: 'Measures the electromotive force (EMF) of the electrochemical cell and displays the logarithmic hydrogen ion activity (-log[H⁺]) directly as pH.',
    },
    {
      name: 'Combined Glass & Reference Electrode',
      purpose: 'Contains a pH-sensitive thin glass membrane and an integrated Ag/AgCl reference electrode immersed in saturated KCl electrolyte.',
    },
    {
      name: '50 mL Precision Burette',
      purpose: 'Dispenses accurate incremental volumes (0.5 mL to 1.0 mL) of standardized 0.1 M NaOH titrant.',
    },
    {
      name: 'Magnetic Stirrer & Teflon Stir Bar',
      purpose: 'Ensures homogeneous mixing of the titrant and analyte without splashing or impacting the fragile glass electrode.',
    },
    {
      name: '250 mL Pyrex Beaker',
      purpose: 'Serves as the titration reaction vessel with sufficient depth to fully submerge the electrode bulb and stir bar.',
    },
    {
      name: 'Volumetric Pipette (20 mL)',
      purpose: 'Transfers an accurately measured 20.00 mL aliquot of the acetic acid solution into the beaker.',
    },
  ],

  chemicals: [
    {
      name: 'Acetic Acid Solution (~0.1 M CH₃COOH)',
      purpose: 'The analyte weak acid solution whose exact molar concentration is being determined.',
      hazards: 'Mildly corrosive, pungent vapor. Avoid skin contact or inhalation.',
    },
    {
      name: 'Standard Sodium Hydroxide (0.100 M NaOH)',
      purpose: 'The secondary standard titrant of known exact molarity used to neutralize the acid.',
      hazards: 'Caustic, causes severe chemical burns and irreversible eye damage.',
    },
    {
      name: 'Standard Buffer Solutions (pH 4.01, 7.00, 9.20)',
      purpose: 'Used for two-point or three-point electronic calibration of the pH meter.',
      hazards: 'Non-hazardous analytical calibration standards.',
    },
    {
      name: 'Deionized / Distilled Water',
      purpose: 'For rinsing the electrode between additions and diluting the analyte to ensure proper bulb immersion.',
      hazards: 'None.',
    },
  ],

  safetyPrecautions: [
    'Always wear splash-proof chemical safety goggles, a buttoned lab coat, and nitrile gloves throughout the procedure.',
    'Sodium hydroxide (NaOH) is severely caustic. If spilled on skin, flush immediately with copious cold running water for at least 15 minutes.',
    'Handle the combined pH electrode with extreme care; the delicate glass bulb can crack easily if struck by the magnetic spin bar.',
    'Never turn on the magnetic stirrer at excessive speeds. Keep the stir bar safely centered away from the electrode.',
    'Dispose of neutralized titration mixtures in the designated heavy metal-free chemical waste container.',
  ],

  supervisorReminder:
    'SAFETY CHECKPOINT: Ensure the laboratory supervisor or instructor inspects your burette meniscus reading and electrode calibration before starting titrant addition.',

  steps: [
    {
      step: 1,
      title: 'Electrode Calibration',
      description: 'Rinse the combined glass electrode with distilled water and gently blot with lint-free tissue. Immerse in standard pH 7.00 buffer and calibrate. Repeat with pH 4.01 buffer for two-point acidic calibration.',
    },
    {
      step: 2,
      title: 'Sample Preparation',
      description: 'Pipette accurately 20.0 mL of unknown acetic acid solution into a clean 250 mL beaker. Add approximately 50 mL of distilled water to ensure the electrode bulb is completely submerged.',
    },
    {
      step: 3,
      title: 'Apparatus Setup',
      description: 'Place the beaker on the magnetic stirrer. Carefully insert the magnetic stir bar. Clamp the combined pH electrode and the burette filled with standardized 0.1 M NaOH directly above the beaker.',
    },
    {
      step: 4,
      title: 'Initial Measurement',
      description: 'Start gentle stirring. Allow the digital reading to stabilize for 30 seconds. Record the initial pH at 0.0 mL NaOH added.',
    },
    {
      step: 5,
      title: 'Titration Procedure',
      description: 'Add 0.1 M NaOH in 1.0 mL increments initially. As the rate of pH change increases near pH 6.0, reduce increments to 0.2 mL. Record stabilized pH after each addition until pH reaches approximately 11.5–12.0.',
    },
    {
      step: 6,
      title: 'Data Analysis & Equivalence',
      description: 'Plot pH versus NaOH volume. Compute the first derivative (ΔpH/ΔV) and second derivative (Δ²pH/ΔV²) to pinpoint the exact equivalence point volume and calculate acid molarity.',
    },
  ],

  /**
   * Clearly marked sample demonstration data.
   * NOTE: For educational demonstration only. Not actual laboratory measurements.
   */
  sampleData: [
    { volume: 0.0, ph: 2.88, isDemo: true },
    { volume: 2.0, ph: 3.62, isDemo: true },
    { volume: 4.0, ph: 4.05, isDemo: true },
    { volume: 6.0, ph: 4.32, isDemo: true },
    { volume: 8.0, ph: 4.57, isDemo: true },
    { volume: 10.0, ph: 4.76, isDemo: true },
    { volume: 12.0, ph: 4.96, isDemo: true },
    { volume: 14.0, ph: 5.16, isDemo: true },
    { volume: 16.0, ph: 5.39, isDemo: true },
    { volume: 18.0, ph: 5.71, isDemo: true },
    { volume: 19.0, ph: 6.04, isDemo: true },
    { volume: 19.5, ph: 6.36, isDemo: true },
    { volume: 19.8, ph: 6.85, isDemo: true },
    { volume: 20.0, ph: 8.72, isDemo: true }, // Equivalence point
    { volume: 20.2, ph: 10.42, isDemo: true },
    { volume: 20.5, ph: 10.98, isDemo: true },
    { volume: 21.0, ph: 11.41, isDemo: true },
    { volume: 22.0, ph: 11.75, isDemo: true },
    { volume: 24.0, ph: 12.06, isDemo: true },
  ],
};
