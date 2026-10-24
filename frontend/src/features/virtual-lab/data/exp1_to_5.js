/**
 * Virtual Chemistry Lab — Experiments 1 to 5
 *
 * 1. Acid–Base Titration
 * 2. pH Determination
 * 3. Preparation of a Standard Solution
 * 4. Filtration
 * 5. Crystallization and Recrystallization
 */

export const EXPERIMENTS_1_TO_5 = [
  {
    id: 'acid-base-titration',
    number: 1,
    title: 'Acid–Base Titration',
    category: 'titrimetric',
    categoryLabel: 'Titrimetric Analysis',
    duration: '45 mins',
    difficulty: 'Intermediate',
    icon: '🧪',
    aim: 'To determine the molarity and strength of an unknown hydrochloric acid (HCl) solution by titrating against a standard 0.100 M sodium hydroxide (NaOH) solution using phenolphthalein indicator.',
    principle: `Acid–base titration is a quantitative volumetric analysis method based on the complete neutralization reaction between hydronium ions (H₃O⁺) from an acid and hydroxide ions (OH⁻) from a base:

HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)
Net ionic equation: H⁺(aq) + OH⁻(aq) → H₂O(l)

At the stoichiometric equivalence point, the number of equivalents of acid exactly equals the number of equivalents of base:
N₁ · V₁ = N₂ · V₂  (or M₁ · V₁ = M₂ · V₂ for monoprotic species)

Phenolphthalein is chosen as the visual indicator because its transition range (pH 8.2–10.0) coincides closely with the sharp inflection pH jump (pH 4.0 to 10.0) observed in strong acid–strong base titrations. A single drop of titrant causes a sharp color shift from colorless to faint, permanent pink (persisting for ≥ 30 seconds).`,
    apparatus: [
      'Burette (50 mL, 0.1 mL subdivisions) with Teflon stopcock',
      'Volumetric Pipette (20.0 mL) with safety bulb',
      'Conical Flask (250 mL Erlenmeyer)',
      'Retort Stand with Burette Clamp',
      'White ceramic tile (for contrast)',
      'Glass Funnel and Wash Bottle',
    ],
    chemicals: [
      'Standard Sodium Hydroxide solution (0.100 M NaOH, standardized)',
      'Unknown Hydrochloric Acid solution (~0.1 M HCl)',
      'Phenolphthalein indicator solution (0.1% w/v in 50% ethanol)',
      'Deionized / Distilled water',
    ],
    diagramType: 'titration-setup',
    procedureSteps: [
      {
        step: 1,
        title: 'Burette Preparation',
        instruction: 'Rinse the clean 50 mL burette with ~5 mL of 0.100 M NaOH solution. Fill the burette with NaOH solution above the 0.00 mL mark. Open the stopcock briefly to purge any trapped air bubbles from the jet tip, then adjust the meniscus precisely to the 0.00 mL mark at eye level.',
      },
      {
        step: 2,
        title: 'Pipetting the Acid Sample',
        instruction: 'Rinse a 20.0 mL volumetric pipette with the unknown HCl solution. Using a safety pipette bulb, accurately transfer 20.0 mL of HCl into a thoroughly rinsed 250 mL conical flask.',
      },
      {
        step: 3,
        title: 'Adding Indicator and Diluent',
        instruction: 'Add approximately 20 mL of deionized water to the flask (to ensure adequate volume for swirling; this does not alter the moles of acid present). Add 2 to 3 drops of phenolphthalein indicator. Swirl gently; the solution should remain completely colorless.',
      },
      {
        step: 4,
        title: 'Titration Execution',
        instruction: 'Place the conical flask on a white tile under the burette tip. Add NaOH titrant steadily while continuously swirling the flask. As the pink color begins to dissipate more slowly, reduce the flow to drop-by-drop additions.',
      },
      {
        step: 5,
        title: 'End-Point Detection',
        instruction: 'Stop the titration immediately when a single drop of NaOH imparts a faint, pale pink coloration that persists throughout the solution for at least 30 seconds. Record the final burette reading to two decimal places (±0.05 mL).',
      },
      {
        step: 6,
        title: 'Concordant Trials',
        instruction: 'Repeat the titration two more times to obtain at least two concordant burette readings agreeing within ±0.10 mL. Compute the mean concordant titre volume.',
      },
    ],
    observationTable: {
      headers: ['Trial No.', 'Volume of HCl (V₁, mL)', 'Initial Burette Reading (mL)', 'Final Burette Reading (mL)', 'Volume of NaOH added (V₂, mL)'],
      sampleRows: [
        ['1 (Pilot)', '20.00', '0.00', '20.60', '20.60'],
        ['2 (Accurate)', '20.00', '0.00', '20.40', '20.40'],
        ['3 (Accurate)', '20.00', '20.40', '40.80', '20.40'],
      ],
      concordantValue: '20.40 mL',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Actual laboratory values will vary based on prepared reagent batches.',
    },
    formulae: [
      {
        name: 'Molarity of Unknown Acid (M₁)',
        formula: 'M₁ = (M₂ · V₂) / V₁',
        variables: 'M₂ = Molarity of NaOH (0.100 M), V₂ = Concordant volume of NaOH (20.40 mL), V₁ = Volume of HCl pipetted (20.00 mL)',
      },
      {
        name: 'Strength of Acid (g/L)',
        formula: 'Strength = M₁ · Molar Mass of HCl',
        variables: 'Molar Mass of HCl = 36.46 g/mol',
      },
    ],
    calculations: [
      'M₁ = (0.100 M × 20.40 mL) / 20.00 mL = 0.1020 M (mol/L)',
      'Strength of HCl = 0.1020 mol/L × 36.46 g/mol = 3.719 g/L',
    ],
    result: {
      summary: 'The molarity and strength of the supplied hydrochloric acid solution were successfully determined.',
      values: [
        { label: 'Molarity of HCl', value: '0.1020 M (mol/L)' },
        { label: 'Strength of HCl', value: '3.719 g/L' },
      ],
      interpretation: 'The molarity of 0.1020 M closely matches nominal bench specification with standard analytical deviation (< 1.5%). The sharp end-point confirms complete neutralization.',
    },
    safetyPrecautions: [
      'Sodium hydroxide is a caustic base capable of causing severe chemical burns and permanent corneal damage. Wear chemical splash goggles and nitrile gloves at all times.',
      'Hydrochloric acid emits corrosive and irritating hydrogen chloride vapors. Never inhale vapors directly.',
      'Always use a pipette bulb or mechanical filler; never pipette chemical solutions by mouth.',
      'Neutralize residual titrated waste before disposal down the laboratory drain with copious running water.',
    ],
    quiz: [
      {
        id: 'ab-q1',
        question: 'Why does adding ~20 mL of distilled water to the conical flask NOT affect the calculated acid molarity?',
        options: [
          'Because the number of millimoles of H⁺ ions in the flask remains constant',
          'Because distilled water neutralizes some of the acid',
          'Because water alters the indicator color transition threshold',
          'Because water reacts with NaOH before it reaches the acid',
        ],
        correctAnswer: 0,
        explanation: 'Volumetric titrations determine the total moles of analyte. Adding neutral distilled water changes the concentration in the flask but does not alter the absolute number of moles (millimoles) of HCl transferred by the pipette.',
      },
      {
        id: 'ab-q2',
        question: 'What is the color change of phenolphthalein indicator at the end-point of this titration?',
        options: [
          'Colorless to persistent faint pink',
          'Pink to yellow',
          'Deep red to clear colorless',
          'Yellow to blue',
        ],
        correctAnswer: 0,
        explanation: 'Phenolphthalein is colorless in acidic solution (pH < 8.2) and transitions to faint pink in slightly alkaline solution (pH 8.2–10.0), signaling the completion of neutralization.',
      },
      {
        id: 'ab-q3',
        question: 'What error occurs if an air bubble trapped in the burette tip dislodges during titration?',
        options: [
          'The measured titrant volume will appear larger than the true volume consumed',
          'The measured titrant volume will appear smaller than the true volume consumed',
          'The acid molarity will be severely underestimated',
          'The pH of the solution will immediately drop to zero',
        ],
        correctAnswer: 0,
        explanation: 'If an air bubble exits the tip during titration, the liquid level in the burette falls without delivering actual titrant to the flask, resulting in an artificially high volume reading and an overestimated acid strength.',
      },
    ],
  },
  {
    id: 'ph-determination',
    number: 2,
    title: 'pH Determination',
    category: 'instrumental',
    categoryLabel: 'Instrumental Chemistry',
    duration: '40 mins',
    difficulty: 'Beginner',
    icon: '📊',
    distinctionNote: 'General pH Measurement (pH Paper & Buffers — Non-Titrimetric)',
    keywords: [
      'ph determination',
      'universal indicator paper',
      'ph paper',
      'buffer solution calibration',
      'ph meter calibration',
      'hydrogen ion concentration',
      'glass electrode',
      'acidity and alkalinity',
    ],
    aim: 'To determine the pH and hydrogen ion concentration [H⁺] of various laboratory solutions and environmental water samples using universal indicator paper and a calibrated digital pH meter.',
    principle: `The pH of an aqueous solution is defined as the negative logarithm (base 10) of the hydrogen (hydronium) ion activity:

pH = -log₁₀[H⁺]  and  [H⁺] = 10^(-pH) mol/L
At 25°C, pure neutral water has [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M, hence pH = 7.00.

Digital pH meters operate on potentiometric principles using a combined glass electrode. The electrode consists of an internal Ag/AgCl reference element and a thin, pH-sensitive glass membrane. When immersed in solution, a potential difference develops across the hydrated gel layers of the glass bulb according to the Nernst equation:

E_cell = E° - (2.303·R·T / F) · pH = E° - 0.05916 · pH  (at 298.15 K)

The meter amplifier measures this millivolt potential (slope ~59.16 mV per pH unit) and converts it to a direct digital pH reading.`,
    apparatus: [
      'Digital Benchtop pH Meter (0.01 pH resolution) with automatic temperature compensation (ATC)',
      'Combined Glass-Reference Electrode (stored in 3 M KCl)',
      'Universal pH Indicator Paper strips with standard color comparator chart',
      'Glass Beakers (100 mL, 5 units)',
      'Magnetic Stirrer with Teflon-coated stir bar',
      'Wash bottle with deionized water and lint-free optical wipes',
    ],
    chemicals: [
      'Standard Buffer Solutions: pH 4.01 (phthalate), pH 7.00 (phosphate), and pH 9.20/10.01 (borate/carbonate)',
      '0.1 M Hydrochloric Acid (HCl)',
      '0.1 M Acetic Acid (CH₃COOH)',
      '0.1 M Sodium Hydroxide (NaOH)',
      'Tap water and Distilled water samples',
      '3 M Potassium Chloride (KCl) electrode storage solution',
    ],
    diagramType: 'ph-meter-setup',
    procedureSteps: [
      {
        step: 1,
        title: 'Electrode Inspection & Preparation',
        instruction: 'Remove the electrode protective cap containing 3 M KCl. Inspect the glass membrane for physical damage or air bubbles around the internal reference wire. Rinse the electrode thoroughly with deionized water and blot dry gently with a lint-free tissue (do not rub the glass bulb).',
      },
      {
        step: 2,
        title: 'Two-Point Calibration',
        instruction: 'Immerse the electrode and ATC temperature probe into pH 7.00 buffer. Stir gently and allow the reading to stabilize. Press "CAL" and accept 7.00. Rinse with deionized water, then immerse in pH 4.01 buffer (or pH 9.20 for basic ranges). Complete calibration ensuring electrode slope is between 95% and 102%.',
      },
      {
        step: 3,
        title: 'Preliminary pH Paper Screening',
        instruction: 'Dip a clean glass rod into each test solution and touch it onto a strip of universal pH paper. Compare the developed color against the comparator chart to estimate pH to ±0.5 units.',
      },
      {
        step: 4,
        title: 'Quantitative Meter Measurement',
        instruction: 'Pour ~50 mL of test solution into a clean 100 mL beaker. Immerse the calibrated electrode ensuring the porous ceramic liquid junction is fully submerged. Stir slowly on a magnetic stirrer.',
      },
      {
        step: 5,
        title: 'Data Recording',
        instruction: 'Once the stability icon appears on the meter display (reading stationary for 15 seconds), record the pH value to two decimal places and solution temperature in °C.',
      },
      {
        step: 6,
        title: 'Electrode Care & Storage',
        instruction: 'Rinse electrode with deionized water between every sample. After all measurements are complete, submerge the electrode in 3 M KCl storage solution. Never leave the glass bulb dry or in distilled water.',
      },
    ],
    observationTable: {
      headers: ['Sample Solution', 'Universal Paper Color', 'Estimated pH (Paper)', 'Digital Meter pH (25°C)', 'Calculated [H⁺] (mol/L)', 'Classification'],
      sampleRows: [
        ['0.1 M HCl', 'Deep Red', '1.0', '1.08', '8.32 × 10⁻² M', 'Strongly Acidic'],
        ['0.1 M CH₃COOH', 'Orange-Yellow', '3.0', '2.88', '1.32 × 10⁻³ M', 'Weakly Acidic'],
        ['Distilled Water', 'Yellow-Green', '6.5', '6.82', '1.51 × 10⁻⁷ M', 'Near Neutral'],
        ['Tap Water', 'Green', '7.5', '7.45', '3.55 × 10⁻⁸ M', 'Slightly Alkaline'],
        ['0.1 M NaOH', 'Deep Violet', '13.0', '12.95', '1.12 × 10⁻¹³ M', 'Strongly Alkaline'],
      ],
      concordantValue: 'N/A (Multi-sample evaluation)',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Temperature = 25.0°C.',
    },
    formulae: [
      {
        name: 'Hydrogen Ion Concentration [H⁺]',
        formula: '[H⁺] = 10^(-pH) mol/L',
        variables: 'pH = Measured value from calibrated meter',
      },
      {
        name: 'Hydroxide Ion Concentration [OH⁻]',
        formula: '[OH⁻] = Kw / [H⁺] = 1.0 × 10⁻¹⁴ / [H⁺] (at 25°C)',
        variables: 'Kw = Autoionization constant of water = 1.0 × 10⁻¹⁴',
      },
    ],
    calculations: [
      'For 0.1 M CH₃COOH with pH = 2.88: [H⁺] = 10^(-2.88) = 1.318 × 10⁻³ M',
      '[OH⁻] = 1.0 × 10⁻¹⁴ / 1.318 × 10⁻³ = 7.587 × 10⁻¹² M',
      'For Tap Water with pH = 7.45: [H⁺] = 10^(-7.45) = 3.548 × 10⁻⁸ M',
    ],
    result: {
      summary: 'The pH and hydrogen ion concentrations of acidic, neutral, and alkaline solutions were accurately quantified.',
      values: [
        { label: '0.1 M HCl pH', value: '1.08 ([H⁺] = 0.0832 M)' },
        { label: '0.1 M CH₃COOH pH', value: '2.88 ([H⁺] = 0.00132 M)' },
        { label: 'Tap Water pH', value: '7.45 (Acceptable drinking water range 6.5–8.5)' },
      ],
      interpretation: 'The digital meter provides precise quantification (0.01 resolution) distinguishing strong and weak electrolytes, whereas universal paper serves for qualitative triage.',
    },
    safetyPrecautions: [
      'Never wipe the glass electrode vigorously with paper towels, as static charges will build up and cause erratic, drifting readings.',
      'Always store the electrode in 3 M KCl solution. Prolonged storage in deionized water leaches lithium/potassium ions from the glass membrane gel layer.',
      'Wear eye protection when handling strongly acidic (HCl) and caustic (NaOH) test solutions.',
    ],
    quiz: [
      {
        id: 'ph-q1',
        question: 'If a solution has a pH of 3.00 and is diluted tenfold with pure water, what will be its approximate new pH?',
        options: [
          '4.00',
          '2.00',
          '3.10',
          '7.00',
        ],
        correctAnswer: 0,
        explanation: 'Diluting a strong acid tenfold decreases [H⁺] by a factor of 10. Since pH is a logarithmic scale (pH = -log[H⁺]), a 10-fold reduction in [H⁺] increases pH by exactly 1.0 unit (3.00 → 4.00).',
      },
      {
        id: 'ph-q2',
        question: 'According to the Nernst equation at 25°C, what potential change corresponds to a shift of 1.0 pH unit?',
        options: [
          '59.16 mV',
          '100.0 mV',
          '1.00 mV',
          '14.0 mV',
        ],
        correctAnswer: 0,
        explanation: 'The theoretical Nernstian slope factor 2.303·R·T/F equals 0.05916 V or 59.16 mV per pH unit at 298.15 K (25°C).',
      },
      {
        id: 'ph-q3',
        question: 'Why must the combined glass electrode be stored in 3 M KCl rather than distilled water?',
        options: [
          'To maintain hydration and prevent leaching of electrolyte from the reference junction',
          'Because distilled water dissolves the glass bulb',
          'Because KCl acts as a strong disinfectant',
          'To keep the electrode electrically charged',
        ],
        correctAnswer: 0,
        explanation: 'Storage in 3 M KCl matches the internal reference electrolyte concentration, preventing osmotic leaching of KCl through the porous ceramic frit and preserving the hydrated gel layer on the glass membrane.',
      },
    ],
  },
  {
    id: 'preparation-of-standard-solution',
    number: 3,
    title: 'Preparation of a Standard Solution',
    category: 'titrimetric',
    categoryLabel: 'Titrimetric Analysis',
    duration: '35 mins',
    difficulty: 'Beginner',
    icon: '⚖️',
    aim: 'To prepare 250 mL of a primary standard 0.0500 M (0.1000 N) oxalic acid dihydrate [H₂C₂O₄·2H₂O] solution by direct analytical weighing.',
    principle: `A standard solution is a reagent solution of precisely known concentration used in quantitative chemical analysis. Standards are classified into:
1. Primary Standards: Substances of high purity (≥ 99.9%), high equivalent weight, non-hygroscopic nature, thermal stability, and definite chemical stoichiometry. Examples include oxalic acid dihydrate, anhydrous sodium carbonate, and potassium hydrogen phthalate.
2. Secondary Standards: Substances whose solutions cannot be prepared by direct weighing due to hygroscopic absorption (NaOH) or instability (KMnO₄, HCl), requiring standardization against a primary standard.

Oxalic acid dihydrate (H₂C₂O₄·2H₂O, Molar Mass = 126.07 g/mol) is a dibasic primary standard acid:
H₂C₂O₄ + 2NaOH → Na₂C₂O₄ + 2H₂O
Equivalent Weight = Molar Mass / Basicity = 126.07 / 2 = 63.035 g/equiv

The required mass (W) to prepare volume V (mL) of normality N is given by:
W = (N · Eq. Wt · V) / 1000`,
    apparatus: [
      'Analytical Balance (0.0001 g / 0.1 mg precision)',
      'Volumetric Flask (250 mL, Class A, with ground glass stopper)',
      'Weighing Boat / Watch Glass',
      'Glass Funnel (short stem)',
      'Glass Stirring Rod and Wash Bottle',
      'Beaker (100 mL)',
    ],
    chemicals: [
      'Analytical Reagent (AR) grade Oxalic Acid Dihydrate crystals [H₂C₂O₄·2H₂O, MW = 126.07 g/mol, assay ≥ 99.8%]',
      'Freshly boiled and cooled deionized water (CO₂-free)',
    ],
    diagramType: 'volumetric-flask-prep',
    procedureSteps: [
      {
        step: 1,
        title: 'Theoretical Mass Calculation',
        instruction: 'Calculate the theoretical mass required: W = (0.1000 N × 63.035 g/equiv × 250 mL) / 1000 = 1.5759 g.',
      },
      {
        step: 2,
        title: 'Analytical Weighing by Difference',
        instruction: 'Place a clean, dry weighing bottle on the analytical balance and tare it. Accurately weigh approximately 1.576 g of pure oxalic acid crystals to four decimal places. Record mass W₁.',
      },
      {
        step: 3,
        title: 'Quantitative Transfer',
        instruction: 'Insert a clean funnel into the neck of a 250 mL volumetric flask. Carefully transfer the crystals through the funnel. Reweigh the container to record any residual mass (W₂) to determine net transferred mass W = W₁ - W₂.',
      },
      {
        step: 4,
        title: 'Rinsing and Dissolution',
        instruction: 'Rinse the weighing container and funnel thoroughly with deionized water from a wash bottle so all adhering crystal dust is washed into the flask. Add ~100 mL of water and swirl gently until crystals are completely dissolved.',
      },
      {
        step: 5,
        title: 'Dilution to Volume',
        instruction: 'Add deionized water until the liquid level reaches approximately 1 cm below the graduation mark. Use a Pasteur dropper to add the final drops slowly until the bottom of the curved meniscus aligns exactly with the horizontal calibration mark at eye level.',
      },
      {
        step: 6,
        title: 'Homogenization & Labeling',
        instruction: 'Insert the stopper firmly. Invert and swirl the flask smoothly at least 10–15 times to ensure complete homogeneity. Calculate the exact normality and label with chemical name, concentration, date, and analyst name.',
      },
    ],
    observationTable: {
      headers: ['Measurement Parameter', 'Trial 1 (Sample Data)', 'Unit'],
      sampleRows: [
        ['Mass of weighing container + Oxalic acid (W₁)', '14.8524', 'g'],
        ['Mass of empty weighing container after transfer (W₂)', '13.2762', 'g'],
        ['Net mass of oxalic acid transferred (W = W₁ - W₂)', '1.5762', 'g'],
        ['Nominal Volume of Volumetric Flask (V)', '250.00', 'mL'],
        ['Equivalent Weight of Oxalic Acid Dihydrate', '63.035', 'g/equiv'],
      ],
      concordantValue: 'Exact Normality = 0.1000 N',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Calibrated Class A glassware used.',
    },
    formulae: [
      {
        name: 'Exact Normality of Solution',
        formula: 'N = (W · 1000) / (Eq. Wt · V)',
        variables: 'W = Mass of solute in grams (1.5762 g), Eq. Wt = 63.035 g/equiv, V = Volume in mL (250.00 mL)',
      },
      {
        name: 'Exact Molarity of Solution',
        formula: 'M = N / Basicity = N / 2',
        variables: 'Basicity of oxalic acid = 2',
      },
    ],
    calculations: [
      'N = (1.5762 g × 1000) / (63.035 g/equiv × 250.00 mL) = 1576.2 / 15758.75 = 0.10002 N',
      'M = 0.10002 N / 2 = 0.05001 M (mol/L)',
      'Strength = W / (V / 1000) = 1.5762 g / 0.250 L = 6.3048 g/L',
    ],
    result: {
      summary: '250 mL of standard primary oxalic acid solution was successfully prepared with analytical precision.',
      values: [
        { label: 'Calculated Normality', value: '0.1000 N' },
        { label: 'Calculated Molarity', value: '0.0500 M' },
        { label: 'Strength of Solution', value: '6.305 g/L' },
      ],
      interpretation: 'The prepared solution demonstrates analytical standard grade suitable for standardizing secondary sodium hydroxide solutions in volumetric titrations.',
    },
    safetyPrecautions: [
      'Oxalic acid crystals are toxic upon ingestion and cause severe skin irritation. Handle with a spatula; never touch crystals with bare hands.',
      'Never shake the volumetric flask violently while inverting; hold the ground glass stopper securely with the palm of your hand to prevent leakage.',
      'Do not heat the volumetric flask or add boiling water; thermal expansion disrupts precision volumetric calibration permanently.',
    ],
    quiz: [
      {
        id: 'std-q1',
        question: 'Why is sodium hydroxide (NaOH) NOT suitable as a primary standard substance?',
        options: [
          'Because it is hygroscopic and rapidly absorbs atmospheric CO₂ to form carbonates',
          'Because its molar mass is too high',
          'Because it does not dissolve in water',
          'Because it is an explosive liquid',
        ],
        correctAnswer: 0,
        explanation: 'Solid NaOH pellets are deliquescent (absorb ambient water vapor) and absorb CO₂ from air to form Na₂CO₃, preventing accurate weighing of stoichiometric mass.',
      },
      {
        id: 'std-q2',
        question: 'What is the equivalent weight of oxalic acid dihydrate (H₂C₂O₄·2H₂O, MW = 126.07 g/mol) in acid–base neutralization?',
        options: [
          '63.035 g/equiv',
          '126.07 g/equiv',
          '42.02 g/equiv',
          '90.03 g/equiv',
        ],
        correctAnswer: 0,
        explanation: 'Oxalic acid is a dibasic acid containing 2 ionizable protons. Equivalent Weight = Molar Mass / Basicity = 126.07 / 2 = 63.035 g/equiv.',
      },
      {
        id: 'std-q3',
        question: 'What is the correct viewing technique when making up a solution to the calibration mark in a volumetric flask?',
        options: [
          'Align the bottom of the curved liquid meniscus with the horizontal ring mark at eye level',
          'Align the top edges of the meniscus with the ring mark from above',
          'Fill until the liquid overflows the neck',
          'Read from a 45-degree downward angle',
        ],
        correctAnswer: 0,
        explanation: 'To eliminate parallax error, eye level must be horizontal with the calibration ring, and for clear liquids the lowest point (bottom) of the concave meniscus must rest tangentially on the line.',
      },
    ],
  },
  {
    id: 'filtration',
    number: 4,
    title: 'Filtration',
    category: 'separation',
    categoryLabel: 'Separation & Purification',
    duration: '40 mins',
    difficulty: 'Beginner',
    icon: '🌪️',
    aim: 'To separate an insoluble solid precipitate (Barium Sulphate, BaSO₄) from an aqueous reaction mixture and compare the filtration rates of gravity filtration versus vacuum (Büchner) suction filtration.',
    principle: `Filtration is a mechanical separation process that separates solid particulates from a liquid suspension through a porous medium (filter paper/membrane) that allows the liquid (filtrate) to pass while retaining the solid residue (filter cake).

1. Gravity Filtration: Fluid flow is driven solely by the hydrostatic gravity head of the liquid column above the filter paper. The flow rate is governed by Darcy's Law:
Q = (k · A · ΔP) / (μ · L)
Where Q is flow rate, k is medium permeability, A is filter area, ΔP is gravity pressure, μ is fluid viscosity, and L is cake thickness. Because ΔP is small (~0.01 atm), gravity filtration is slow.

2. Vacuum (Büchner) Filtration: A water aspirator or mechanical vacuum pump applies negative pressure (vacuum, ΔP ~ 0.5–0.8 atm) beneath the perforated porcelain plate of a Büchner funnel. The high pressure differential drastically accelerates filtration velocity (5× to 10× faster) and produces a drier filter cake.`,
    apparatus: [
      'Büchner Funnel (porcelain with perforated plate, 70 mm diameter)',
      'Büchner Vacuum Flask (thick-walled, 500 mL, with heavy-duty side-arm)',
      'Water Aspirator / Laboratory Vacuum Pump with check valve',
      'Standard Glass Funnel (long stem, 60° cone)',
      'Whatman No. 42 (ashless, quantitative, 2.5 μm retention) and No. 1 filter papers',
      'Beakers (250 mL, 2 units), Glass stirring rod, and Rubber Policeman',
    ],
    chemicals: [
      '0.1 M Barium Chloride solution (BaCl₂)',
      '0.1 M Sodium Sulphate solution (Na₂SO₄)',
      'Precipitate formed: BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)',
      'Hot deionized wash water',
    ],
    diagramType: 'buchner-filtration-setup',
    procedureSteps: [
      {
        step: 1,
        title: 'Precipitate Generation',
        instruction: 'In a 250 mL beaker, mix 50.0 mL of 0.1 M BaCl₂ with 50.0 mL of 0.1 M Na₂SO₄. Stir vigorously to form a fine, white crystalline suspension of barium sulphate (BaSO₄). Warm the mixture gently on a water bath for 10 minutes to digest the precipitate and promote crystal ripening.',
      },
      {
        step: 2,
        title: 'Gravity Filtration Assembly',
        instruction: 'Fold a circular Whatman filter paper into quarters, open into a cone with 3 layers on one side and 1 layer on the other, and seat inside a standard 60° glass funnel. Moisten with deionized water so it adheres snugly to the glass walls without air channels.',
      },
      {
        step: 3,
        title: 'Gravity Filtration Run',
        instruction: 'Pour 50.0 mL of the well-mixed suspension down a glass stirring rod into the gravity funnel. Start a stopwatch. Collect filtrate and record the total time required for complete liquid drainage.',
      },
      {
        step: 4,
        title: 'Vacuum Filtration Assembly',
        instruction: 'Fit a Büchner funnel into a heavy-walled filter flask using a neoprene rubber adapter ring. Connect the flask side-arm to a water aspirator via thick-walled vacuum tubing. Place a flat filter paper disc over the perforated plate (it must cover all perforations without creasing up the sides).',
      },
      {
        step: 5,
        title: 'Vacuum Filtration Run',
        instruction: 'Turn on the water aspirator to seat the paper with a small jet of distilled water. Pour the remaining 50.0 mL of suspension into the center of the funnel. Start the stopwatch and record the time required for complete filtration until the cake surface cracks.',
      },
      {
        step: 6,
        title: 'Washing and Disconnection',
        instruction: 'Wash the filter cake with two 10 mL portions of hot deionized water under suction to remove soluble NaCl salts. IMPORTANT: Disconnect the vacuum hose from the flask side-arm BEFORE turning off the water faucet to prevent water back-suction into the filtrate.',
      },
    ],
    observationTable: {
      headers: ['Filtration Method', 'Suspension Volume (mL)', 'Time to Complete (seconds)', 'Filtrate Clarity', 'Cake Moisture Condition', 'Relative Rate'],
      sampleRows: [
        ['Gravity Filtration (Conical)', '50.0', '485 s (~8.1 mins)', 'Clear / Transparent', 'Wet, pasty sludge', '1.0× (Baseline)'],
        ['Vacuum Filtration (Büchner)', '50.0', '52 s (~0.87 mins)', 'Clear / Transparent', 'Firm, semi-dry compact cake', '9.3× faster'],
      ],
      concordantValue: 'Vacuum rate = 9.3× faster than gravity',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Whatman No. 42 filter paper used for fine BaSO₄ retention.',
    },
    formulae: [
      {
        name: 'Filtration Rate (R)',
        formula: 'R = Volume of Filtrate (mL) / Filtration Time (s)',
        variables: 'V = 50.0 mL, t = measured seconds',
      },
      {
        name: 'Relative Acceleration Factor',
        formula: 'Acceleration = R_vacuum / R_gravity',
        variables: 'Ratio of volumetric throughput rates',
      },
    ],
    calculations: [
      'R_gravity = 50.0 mL / 485 s = 0.103 mL/s',
      'R_vacuum = 50.0 mL / 52 s = 0.962 mL/s',
      'Acceleration Factor = 0.962 / 0.103 = 9.34× faster throughput with Büchner vacuum assembly',
    ],
    result: {
      summary: 'Barium sulphate precipitate was quantitatively separated from aqueous suspension.',
      values: [
        { label: 'Gravity Filtration Rate', value: '0.103 mL/s (485 s)' },
        { label: 'Vacuum Filtration Rate', value: '0.962 mL/s (52 s)' },
        { label: 'Suction Enhancement', value: '9.34-fold rate increase' },
      ],
      interpretation: 'Vacuum filtration provides substantial throughput acceleration for crystalline precipitates while maintaining equivalent filtrate clarity and yielding a drier filter cake ready for desiccation.',
    },
    safetyPrecautions: [
      'Always inspect the Büchner flask for star cracks or scratches before applying vacuum. Defective glass under vacuum pressure can implode violently.',
      'Always break the vacuum seal by pulling the hose off the side-arm before closing the water aspirator faucet to prevent back-suction of tap water.',
      'Barium salts are toxic if swallowed. Avoid skin contact and dispose of barium waste in designated heavy metal disposal containers.',
    ],
    quiz: [
      {
        id: 'flt-q1',
        question: 'What is the critical safety rule before turning off a water aspirator vacuum source?',
        options: [
          'Disconnect the vacuum tubing from the flask side-arm first to prevent water back-suction',
          'Pour hot water into the aspirator',
          'Cap the Büchner funnel immediately',
          'Turn off the faucet as slowly as possible',
        ],
        correctAnswer: 0,
        explanation: 'Turning off the water tap while the flask is still under negative pressure creates a siphon that draws tap water back through the side-arm into the filter flask, contaminating the filtrate.',
      },
      {
        id: 'flt-q2',
        question: 'Why must filter paper in a Büchner funnel lie completely flat without riding up the sidewalls?',
        options: [
          'To prevent suspension from bypassing the filter paper and leaking into the filtrate',
          'Because folded paper will tear under pressure',
          'To reduce the porcelain weight',
          'To keep the suction noise low',
        ],
        correctAnswer: 0,
        explanation: 'If the paper disc curls up against the vertical walls, an unsealed gap forms allowing the solid precipitate to leak directly into the flask, ruining filtrate clarity.',
      },
      {
        id: 'flt-q3',
        question: 'Why is gravity filtration preferred over vacuum filtration when filtering hot, volatile recrystallization solutions?',
        options: [
          'Because vacuum suction causes rapid solvent evaporation and premature crystallization in the funnel pores',
          'Because gravity filters have higher volume capacity',
          'Because vacuum melts porcelain funnels',
          'Because gravity filters heat the solvent automatically',
        ],
        correctAnswer: 0,
        explanation: 'The reduced pressure inside a vacuum flask lowers the boiling point of hot solvents, causing rapid flash evaporation, cooling, and premature crystallization that chokes the filter pores.',
      },
    ],
  },
  {
    id: 'crystallization-recrystallization',
    number: 5,
    title: 'Crystallization and Recrystallization',
    category: 'separation',
    categoryLabel: 'Separation & Purification',
    duration: '50 mins',
    difficulty: 'Intermediate',
    icon: '💎',
    aim: 'To purify an impure crude sample of benzoic acid contaminated with insoluble and soluble colored impurities by single-solvent recrystallization from water, and determine percentage recovery and purity.',
    principle: `Recrystallization is the premier purification technique for solid organic compounds based on differential solubility at varying temperatures.

An ideal recrystallization solvent must satisfy four criteria:
1. Low solubility for the solute at room temperature / freezing point (0–20°C).
2. High solubility for the solute at elevated temperatures near the boiling point (80–100°C).
3. Insoluble impurities remain undissolved at boiling point (removed by hot filtration).
4. Soluble impurities remain completely dissolved even upon chilling in the mother liquor (separated by cold suction filtration).

Benzoic acid (C₆H₅COOH) satisfies this with water: its solubility is only 1.7 g/L at 0°C (due to hydrophobic benzene ring), but surges to 68.0 g/L at 95°C (as hydrogen bonding becomes dominant). Activated decolorizing charcoal is added to adsorb high-molecular-weight colored resins.`,
    apparatus: [
      'Erlenmeyer Flasks (100 mL and 250 mL)',
      'Electric Hot Plate with magnetic stirring',
      'Stemless Glass Funnel (prevents premature neck crystallization)',
      'Fluted Filter Paper (enhances filtration surface area)',
      'Büchner Funnel and Suction Flask Assembly',
      'Watch Glass and Melting Point Apparatus (Thiele Tube or Digital)',
    ],
    chemicals: [
      'Impure Benzoic acid sample (contains ~10% sand/insoluble dirt and trace organic dye)',
      'Activated Decolorizing Carbon powder (Charcoal)',
      'Deionized water (recrystallization solvent)',
      'Crushed ice bath',
    ],
    diagramType: 'recrystallization-process',
    procedureSteps: [
      {
        step: 1,
        title: 'Crude Sample Weighing',
        instruction: 'Weigh accurately 5.00 g of impure crude benzoic acid on a watch glass. Transfer completely into a 250 mL Erlenmeyer flask.',
      },
      {
        step: 2,
        title: 'Minimum Hot Solvent Dissolution',
        instruction: 'Add ~75 mL of deionized water to the flask. Heat to boiling on a hot plate with continuous swirling. Add additional boiling water in 5 mL increments only until the solute completely dissolves (total volume ~90–100 mL).',
      },
      {
        step: 3,
        title: 'Decolorization with Activated Charcoal',
        instruction: 'Remove the flask from heat and allow it to cool slightly below boiling (~85°C). Add ~0.2 g of activated charcoal (WARNING: Never add charcoal to an actively boiling solution as it causes violent eruptive foaming). Boil gently for 2 minutes.',
      },
      {
        step: 4,
        title: 'Hot Gravity Filtration',
        instruction: 'Pre-heat a stemless glass funnel and fluted filter paper by rinsing with boiling water. Pour the hot solution through the fluted paper into a receiving flask to remove insoluble grit and charcoal. Keep the flask warm during pouring to prevent premature crystallization.',
      },
      {
        step: 5,
        title: 'Controlled Cooling and Crystal Growth',
        instruction: 'Cover the clear filtrate with a watch glass and allow it to cool undisturbed on the benchtop to room temperature. Once ambient, transfer into an ice-water bath (0–4°C) for 15 minutes to maximize crystal precipitation.',
      },
      {
        step: 6,
        title: 'Cold Suction Filtration & Drying',
        instruction: 'Collect the glistening white needle-like crystals on a Büchner funnel under vacuum. Wash with two 5 mL portions of ice-cold deionized water. Draw air through the cake for 5 minutes, then dry to constant weight in a desiccator or warm drying oven at 60°C.',
      },
    ],
    observationTable: {
      headers: ['Parameter', 'Measured Value', 'Standard Reference', 'Status / Evaluation'],
      sampleRows: [
        ['Mass of crude impure sample taken (W₁)', '5.00 g', '5.00 g', 'Initial charge'],
        ['Mass of purified dry benzoic acid crystals (W₂)', '4.12 g', '—', 'Pure product'],
        ['Percentage Recovery Yield', '82.4%', '80–85% expected', 'High recovery'],
        ['Melting Point of crude sample', '114.0–118.5°C', 'Depressed & broad', 'Impure'],
        ['Melting Point of purified crystals', '121.5–122.5°C', '122.4°C (Lit.)', 'Sharp & Pure'],
        ['Crystal morphology', 'Lustrous white needles', 'White crystalline flakes', 'Conforms'],
      ],
      concordantValue: 'Recovery = 82.4%, MP = 122.0°C',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY.',
    },
    formulae: [
      {
        name: 'Percentage Recovery Yield',
        formula: '% Yield = (Mass of Purified Crystals / Mass of Crude Sample) × 100',
        variables: 'W₂ = 4.12 g, W₁ = 5.00 g',
      },
      {
        name: 'Purity Assessment via Melting Range',
        formula: 'ΔT_m = T_final - T_initial ≤ 1.0–1.5°C indicates high purity',
        variables: 'Pure organic compounds melt over narrow ranges (≤ 1°C)',
      },
    ],
    calculations: [
      '% Recovery Yield = (4.12 g / 5.00 g) × 100 = 82.40%',
      'Melting point depression of crude = 122.4°C - 114.0°C = 8.4°C depression',
      'Purified melting range = 121.5°C to 122.5°C (ΔT = 1.0°C), confirming analytical purity.',
    ],
    result: {
      summary: 'Benzoic acid was successfully purified by single-solvent recrystallization from water.',
      values: [
        { label: 'Purified Crystals Recovered', value: '4.12 g' },
        { label: 'Percentage Yield', value: '82.4%' },
        { label: 'Melting Point', value: '121.5–122.5°C (Literature 122.4°C)' },
      ],
      interpretation: 'The narrow 1.0°C melting range close to literature value (122.4°C) proves complete elimination of insoluble debris and colored contaminants with excellent 82.4% recovery.',
    },
    safetyPrecautions: [
      'Never add activated charcoal to a boiling solution; sudden boiling over can cause severe scalding burns.',
      'Use heat-resistant crucible tongs or thermal silicone grips when handling hot glassware.',
      'Use an electric heating plate; avoid open flames in the vicinity of organic chemicals.',
    ],
    quiz: [
      {
        id: 'crys-q1',
        question: 'Why is a STEMLESS funnel specifically recommended for hot filtration during recrystallization?',
        options: [
          'To prevent the hot solution from cooling in the stem and crystallizing prematurely, which plugs the funnel',
          'Because stemless funnels hold more liquid volume',
          'Because long stems break easily under vacuum',
          'To increase the filtration pressure',
        ],
        correctAnswer: 0,
        explanation: 'As a hot saturated solution passes down a long, cool glass stem, heat is rapidly lost to the glass, causing premature crystallization that blocks the stem and loses product.',
      },
      {
        id: 'crys-q2',
        question: 'Why should the hot saturated solution be allowed to cool slowly to room temperature before placing in an ice bath?',
        options: [
          'Slow cooling allows large, pure crystal lattices to form while excluding impurities from the crystal matrix',
          'Rapid cooling causes the solvent to evaporate instantly',
          'Slow cooling turns the crystals yellow',
          'Ice baths decompose benzoic acid',
        ],
        correctAnswer: 0,
        explanation: 'Rapid chilling causes rapid precipitation of tiny microcrystals that trap solvent and impurities within their rapidly formed lattices. Slow cooling allows orderly, pure crystal lattice growth.',
      },
      {
        id: 'crys-q3',
        question: 'What effect do impurities generally have on the melting point of an organic compound?',
        options: [
          'They depress (lower) the melting point and broaden the melting range',
          'They elevate the melting point and narrow the range',
          'They make the substance sublimable without melting',
          'They have zero effect on melting behavior',
        ],
        correctAnswer: 0,
        explanation: 'Impurities disrupt the intermolecular forces in the regular crystalline lattice, requiring less thermal energy to break the lattice (melting point depression) and causing melting over a broad temperature span.',
      },
    ],
  },
];
