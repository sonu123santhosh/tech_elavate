/**
 * Educational curriculum data, theories, safety protocols, and sample data
 * for Conductometric Titration of Acetic Acid with Sodium Hydroxide.
 */

export const CONDUCTOMETRIC_EXPERIMENT_METADATA = {
  title: 'Conductometric Titration of Acetic Acid with Sodium Hydroxide',
  code: 'EXP-COND-02',
  analyte: 'Acetic Acid (CH₃COOH)',
  titrant: 'Sodium Hydroxide (NaOH)',
  objective:
    'To accurately locate the equivalence point of a weak acid (CH₃COOH) titrated with a strong base (NaOH) by tracking electrical conductance changes through conductometry.',
  theory:
    'Electrical conductivity depends on the concentration and mobility of ions in solution. Acetic acid is a weak acid that dissociates weakly into H⁺ and CH₃COO⁻. Initial conductance is relatively low. As NaOH is added, unionized CH₃COOH is converted to highly ionized sodium acetate (CH₃COO⁻ + Na⁺). The presence of common acetate ions further suppresses acetic acid dissociation. Consequently, conductivity increases only gently (or dips slightly initially, then rises with a shallow slope). Once the equivalence point is reached, all acid is neutralized. Subsequent additions of NaOH introduce excess, highly mobile hydroxyl ions (OH⁻, limiting ionic conductivity λ° ≈ 198 Ω⁻¹ cm² eq⁻¹) alongside Na⁺ ions (λ° ≈ 50). This produces a sharp, steep upward inflection. Extrapolating the two linear branches gives the equivalence point at their intersection.',

  instruments: [
    {
      name: 'Digital Conductivity Meter',
      purpose: 'Applies high-frequency alternating current (AC) across electrodes to prevent polarization and measures solution conductance (G) in µS or mS.',
    },
    {
      name: 'Conductivity Cell (Platinized Platinum)',
      purpose: 'Contains two platinum plates with known geometry and cell constant (K_cell ≈ 1.0 cm⁻¹) immersed in the electrolyte.',
    },
    {
      name: '50 mL Precision Burette',
      purpose: 'Dispenses accurate 0.5 mL to 1.0 mL increments of standardized 0.1 M NaOH titrant.',
    },
    {
      name: 'Magnetic Stirrer & Teflon Stir Bar',
      purpose: 'Ensures instantaneous mixing; stirring is paused or kept low during conductance readout to avoid air bubble interference.',
    },
    {
      name: '250 mL Pyrex Beaker',
      purpose: 'Holds the electrolyte solution with ample depth to completely cover the conductivity cell electrode plates.',
    },
    {
      name: 'Volumetric Pipette (20 mL)',
      purpose: 'Accurately measures and transfers 20.00 mL of the acetic acid sample into the beaker.',
    },
  ],

  chemicals: [
    {
      name: 'Acetic Acid (~0.1 M CH₃COOH)',
      purpose: 'The weak acid analyte whose stoichiometric endpoint and concentration are to be determined.',
      hazards: 'Corrosive vapor, mild eye/skin irritant. Work in a ventilated area.',
    },
    {
      name: 'Standard Sodium Hydroxide (0.100 M NaOH)',
      purpose: 'Strong base titrant used to neutralize the acetic acid and donate mobile OH⁻ ions post-equivalence.',
      hazards: 'Highly caustic base. Causes severe chemical burns and permanent corneal damage.',
    },
    {
      name: 'Standard 0.01 M KCl Solution',
      purpose: 'Used for calibrating the conductometer and determining the exact cell constant (K_cell).',
      hazards: 'Non-hazardous standard salt solution.',
    },
    {
      name: 'Conductivity Water (Distilled / Deionized)',
      purpose: 'High-purity water with negligible background ionic conductivity (< 2 µS/cm) for solution preparation and cell washing.',
      hazards: 'None.',
    },
  ],

  safetyPrecautions: [
    'Wear mandatory personal protective equipment: safety glasses, lab coat, and chemical-resistant gloves.',
    'Handle 0.1 M NaOH with caution. In case of skin exposure, immediately drench the area under running water for at least 15 minutes.',
    'Never touch the delicate platinum black coating inside the conductivity cell. Rinse gently with distilled water; never wipe with abrasive paper.',
    'Ensure the conductivity cell is completely submerged; exposed plates cause erratic resistance readings and false measurements.',
    'Avoid entrapping air bubbles between the platinum electrodes. Tap the cell gently if bubbles adhere to the plates.',
  ],

  supervisorReminder:
    'SAFETY CHECKPOINT: Verify your conductivity cell immersion depth and confirm the cell constant calibration with your instructor before starting titrant addition.',

  steps: [
    {
      step: 1,
      title: 'Cell Constant Calibration',
      description: 'Rinse the conductivity cell with deionized water. Immerse in standard 0.01 M KCl solution (known conductivity 1413 µS/cm at 25°C) and calibrate the meter or note the cell constant.',
    },
    {
      step: 2,
      title: 'Sample Preparation',
      description: 'Pipette accurately 20.0 mL of unknown acetic acid solution into a clean 250 mL beaker. Add 80–100 mL of conductivity water so the cell plates are well immersed.',
    },
    {
      step: 3,
      title: 'Titration Assembly',
      description: 'Place the beaker on a magnetic stirrer. Clamp the conductivity cell and burette filled with standardized 0.1 M NaOH securely.',
    },
    {
      step: 4,
      title: 'Initial Conductance Reading',
      description: 'Mix gently, pause stirrer briefly (or maintain steady low speed), and record initial conductance at 0.0 mL NaOH added.',
    },
    {
      step: 5,
      title: 'Titrant Addition',
      description: 'Add 0.1 M NaOH in 0.5 mL to 1.0 mL increments. Stir for 15 seconds after each addition, allow the display to stabilize, and record conductance up to ~30 mL (well past the expected endpoint).',
    },
    {
      step: 6,
      title: 'Trendline Analysis',
      description: 'Plot conductance (µS/cm) versus NaOH volume (mL). Fit two linear regression trend lines: Branch 1 (pre-equivalence) and Branch 2 (post-equivalence). Their intersection marks the equivalence point volume.',
    },
  ],

  /**
   * Clearly marked sample demonstration data.
   * NOTE: For educational demonstration only. Not actual laboratory measurements.
   */
  sampleData: [
    { volume: 0.0, conductivity: 120, isDemo: true },
    { volume: 2.0, conductivity: 138, isDemo: true },
    { volume: 4.0, conductivity: 162, isDemo: true },
    { volume: 6.0, conductivity: 185, isDemo: true },
    { volume: 8.0, conductivity: 210, isDemo: true },
    { volume: 10.0, conductivity: 235, isDemo: true },
    { volume: 12.0, conductivity: 260, isDemo: true },
    { volume: 14.0, conductivity: 285, isDemo: true },
    { volume: 16.0, conductivity: 310, isDemo: true },
    { volume: 18.0, conductivity: 335, isDemo: true },
    { volume: 20.0, conductivity: 360, isDemo: true }, // Equivalence vicinity
    { volume: 22.0, conductivity: 520, isDemo: true },
    { volume: 24.0, conductivity: 685, isDemo: true },
    { volume: 26.0, conductivity: 850, isDemo: true },
    { volume: 28.0, conductivity: 1015, isDemo: true },
    { volume: 30.0, conductivity: 1180, isDemo: true },
  ],
};
