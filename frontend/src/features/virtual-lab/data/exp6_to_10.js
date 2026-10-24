/**
 * Virtual Chemistry Lab — Experiments 6 to 10
 *
 * 6. Paper Chromatography
 * 7. Simple Distillation
 * 8. Determination of Water Hardness
 * 9. Conductometric Titration
 * 10. pH-Metric Titration
 */

export const EXPERIMENTS_6_TO_10 = [
  {
    id: 'paper-chromatography',
    number: 6,
    title: 'Paper Chromatography',
    category: 'separation',
    categoryLabel: 'Separation & Purification',
    duration: '45 mins',
    difficulty: 'Beginner',
    icon: '',
    aim: 'To separate the constituents of a dye mixture (or leaf extract pigments) using ascending paper chromatography and determine their characteristic Retardation Factor (Rf) values.',
    principle: `Paper chromatography is an analytical partition chromatography technique based on differential distribution of solutes between two immiscible phases:
1. Stationary Phase: Water molecules hydrogen-bonded to the porous cellulose fibers of Whatman No. 1 chromatography paper.
2. Mobile Phase: An organic solvent mixture (e.g. n-butanol : acetic acid : water or ethanol : water) ascending the paper strip by capillary action.

As the mobile phase sweeps upward, solute components partition dynamically between the stationary water film and ascending organic eluent based on polarity:
- More polar solutes interact strongly with stationary water molecules and migrate slowly (low Rf).
- Less polar (more lipophilic) solutes dissolve preferentially in the ascending mobile phase and travel faster (high Rf).

The Retardation Factor (Rf) is an intensive property characteristic of each component under defined solvent and temperature conditions:
Rf = Distance travelled by solute spot center (d_s) / Distance travelled by solvent front (d_f)
Rf is dimensionless and strictly bounded: 0.0 ≤ Rf ≤ 1.0.`,
    apparatus: [
      'Chromatography Developing Chamber / Glass Jar with airtight ground glass lid',
      'Whatman No. 1 Chromatography Paper strips (18 cm × 3.5 cm)',
      'Fine glass capillary tubes (micro-applicators, ~1 μL)',
      'Precision metric ruler (1 mm graduations) and 2B graphite pencil',
      'Hair dryer / warm air blower (for rapid spot drying)',
      'Glass spray bottle / UV viewing cabinet (for colorless visualization)',
    ],
    chemicals: [
      'Developing Mobile Phase: n-Butanol : Glacial Acetic Acid : Water (4:1:5 v/v/v organic top phase)',
      'Test Mixture: Binary/Ternary synthetic dye mixture containing Fluorescein (yellow), Methyl Orange (orange), and Methylene Blue (blue)',
      'Individual pure reference dye solutions (0.1% w/v each)',
    ],
    diagramType: 'chromatography-chamber',
    procedureSteps: [
      {
        step: 1,
        title: 'Chamber Vapor Saturation',
        instruction: 'Pour ~15 mL of developing solvent into the chromatography chamber to achieve a liquid depth of 0.8–1.0 cm. Cover tightly with the glass lid and allow 20–30 minutes for the vapor space to become completely saturated with solvent vapor (prevents edge evaporation effects).',
      },
      {
        step: 2,
        title: 'Stationary Phase Preparation',
        instruction: 'Handle a clean Whatman No. 1 paper strip (18 × 3.5 cm) only by the top edges or with tweezers (finger oils interfere with partition). Using a soft graphite pencil, lightly rule an origin baseline 2.0 cm from the bottom edge. Mark spot locations spaced ≥ 1.0 cm apart.',
      },
      {
        step: 3,
        title: 'Sample Application (Spotting)',
        instruction: 'Dip a micro-capillary into the test dye solution. Touch the tip perpendicularly onto the origin mark to form a tiny droplet (diameter ≤ 2–3 mm). Dry with a warm air blower. Repeat 2–3 times on the exact same center to build adequate concentration without enlarging spot diameter.',
      },
      {
        step: 4,
        title: 'Ascending Development',
        instruction: 'Suspend the strip vertically inside the saturated chamber so that the bottom edge dips ~0.5 cm into the solvent, ensuring the origin pencil line is strictly at least 1.0 cm ABOVE the solvent liquid level. Replace the lid immediately without shaking.',
      },
      {
        step: 5,
        title: 'Solvent Front Tracking',
        instruction: 'Allow the solvent front to ascend smoothly by capillary action until it reaches approximately 2.0 cm below the top edge (~12–14 cm ascent, taking ~35–45 minutes).',
      },
      {
        step: 6,
        title: 'Detection and Rf Quantification',
        instruction: 'Quickly remove the strip, immediately mark the wet solvent front with a pencil line before it dries, and dry the strip in a fume hood. Circle the visual centers of each separated colored spot and measure the exact distance from origin to spot center with a metric ruler.',
      },
    ],
    observationTable: {
      headers: ['Separated Component', 'Color of Developed Spot', 'Solvent Front Distance (d_f, cm)', 'Solute Migration Distance (d_s, cm)', 'Calculated Rf Value', 'Reference Identity'],
      sampleRows: [
        ['Spot 1 (Lower)', 'Yellow', '12.50', '4.00', '0.320', 'Fluorescein'],
        ['Spot 2 (Middle)', 'Orange-Red', '12.50', '7.25', '0.580', 'Methyl Orange'],
        ['Spot 3 (Upper)', 'Blue', '12.50', '10.75', '0.860', 'Methylene Blue'],
      ],
      concordantValue: 'Rf₁ = 0.32, Rf₂ = 0.58, Rf₃ = 0.86',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Temperature = 25°C.',
    },
    formulae: [
      {
        name: 'Retardation Factor (Rf)',
        formula: 'Rf = Distance travelled by solute spot center (d_s) / Distance travelled by solvent front (d_f)',
        variables: 'Both distances measured from origin baseline in cm',
      },
      {
        name: 'Relative Retention (Separation Factor, α)',
        formula: 'α = Rf₂ / Rf₁ > 1.0',
        variables: 'Indicates chromatographic resolution between adjacent spots',
      },
    ],
    calculations: [
      'Rf (Fluorescein) = 4.00 cm / 12.50 cm = 0.320',
      'Rf (Methyl Orange) = 7.25 cm / 12.50 cm = 0.580',
      'Rf (Methylene Blue) = 10.75 cm / 12.50 cm = 0.860',
      'Resolution factor α(3/2) = 0.860 / 0.580 = 1.48 (distinct baseline separation)',
    ],
    result: {
      summary: 'The unknown dye mixture was successfully resolved into three distinct chemical components.',
      values: [
        { label: 'Fluorescein Rf', value: '0.32 (Hydrophilic, strong stationary retention)' },
        { label: 'Methyl Orange Rf', value: '0.58 (Intermediate polarity)' },
        { label: 'Methylene Blue Rf', value: '0.86 (Lipophilic, high mobile phase affinity)' },
      ],
      interpretation: 'The large differences in Rf values confirm effective chromatographic resolution with no tailing or overlap.',
    },
    safetyPrecautions: [
      'Developing solvents contain volatile organic compounds (butanol, acetic acid). Always prepare and develop chromatograms in a well-ventilated fume hood.',
      'Never use an open flame near chromatography tanks containing flammable organic solvents.',
      'Always use graphite pencil for baseline markings; ballpoint or fountain pen ink contains soluble dyes that dissolve and ruin the chromatogram.',
    ],
    quiz: [
      {
        id: 'chr-q1',
        question: 'Why must the sample origin line be drawn with a pencil rather than an ink pen?',
        options: [
          'Because ink consists of organic dyes that dissolve in the mobile phase and travel up the paper',
          'Because pencil graphite dissolves into the solvent',
          'Because ink tears the filter paper',
          'Because pencil conducts electrical currents',
        ],
        correctAnswer: 0,
        explanation: 'Graphite in pencil is insoluble carbon that remains inert at the origin. Pen ink contains soluble dyes that would dissolve and separate, completely obscuring the test analyte spots.',
      },
      {
        id: 'chr-q2',
        question: 'What error occurs if the mobile phase solvent level in the chamber is higher than the sample spot line?',
        options: [
          'The sample spots will dissolve directly into the solvent reservoir at the bottom instead of ascending',
          'The spots will travel twice as fast',
          'The paper will turn completely transparent',
          'The Rf values will automatically equal 1.0',
        ],
        correctAnswer: 0,
        explanation: 'If the solvent covers the spots, the solutes simply wash out and dissolve into the bulk solvent pool at the bottom of the beaker, resulting in no chromatographic development.',
      },
      {
        id: 'chr-q3',
        question: 'What is the theoretical maximum value possible for a Retardation Factor (Rf)?',
        options: [
          '1.00',
          '10.0',
          '0.50',
          'Infinity',
        ],
        correctAnswer: 0,
        explanation: 'Because a solute can at most travel as far as the advancing solvent front (d_s ≤ d_f), the ratio d_s / d_f can never exceed 1.00.',
      },
    ],
  },
  {
    id: 'simple-distillation',
    number: 7,
    title: 'Simple Distillation',
    category: 'separation',
    categoryLabel: 'Separation & Purification',
    duration: '60 mins',
    difficulty: 'Intermediate',
    icon: '',
    aim: 'To separate and purify ethanol from a binary ethanol–water mixture using simple distillation apparatus, and evaluate distillation recovery and boiling point behavior.',
    principle: `Distillation is a thermal separation technique based on differences in vapor pressure and boiling points of liquid components.

When a binary homogeneous liquid mixture of a volatile component A (Ethanol, Tb = 78.3°C) and a less volatile component B (Water, Tb = 100.0°C) is heated:
1. The vapor phase is significantly enriched in the lower-boiling, higher-vapor-pressure component (Raoult's Law & Dalton's Law):
y_A = (P_A° · x_A) / P_total
Where y_A is vapor mole fraction, x_A is liquid mole fraction, and P_A° is saturation vapor pressure (P_ethanol° > P_water° at any given T).

2. The ascending vapor passes into a water-cooled Liebig condenser where thermal energy is extracted, condensing vapor back into pure liquid distillate.
3. Simple distillation is effective when boiling points differ by at least 25–30°C. For closer boiling points or azeotropes (e.g. ethanol–water 95.6% azeotrope at 78.15°C), fractional distillation with a fractionating column is required.`,
    apparatus: [
      'Round-Bottom Distillation Flask (250 mL, 24/40 ground-glass joint)',
      'Distillation Still Head (three-way adapter with 75° side-arm)',
      'Precision Mercury Thermometer (-10°C to +150°C, 0.5°C divisions) with Neoprene adapter',
      'Liebig Condenser (300 mm jacket length) with silicone water hoses',
      'Vacuum Take-off / Receiver Adapter',
      'Receiving Erlenmeyer Flasks (100 mL, 3 units for fractions)',
      'Electric Heating Mantle (250 mL capacity with variable energy regulator)',
      'Retort Stands, Clamps, and Anti-bumping Porous Boiling Chips',
    ],
    chemicals: [
      'Ethanol–Water binary mixture (100 mL of 40% v/v ethanol and 60% v/v water)',
      'Porous porcelain boiling chips (anti-bumping granules)',
      'Tap water cooling circulation line',
    ],
    diagramType: 'distillation-apparatus',
    procedureSteps: [
      {
        step: 1,
        title: 'Apparatus Assembly',
        instruction: 'Clamp the round-bottom flask securely to a retort stand over the heating mantle. Attach the three-way still head. Insert the thermometer so that the top of its mercury bulb is positioned slightly below the bottom edge of the side-arm outlet (ensures immersion in dynamic vapor stream).',
      },
      {
        step: 2,
        title: 'Condenser Alignment',
        instruction: 'Attach the Liebig condenser to the still head side-arm. Connect water tubing so that cooling water enters at the LOWEST nozzle (bottom) and exits at the HIGHEST nozzle (top). This ensures counter-current cooling and guarantees the water jacket remains filled without air pockets.',
      },
      {
        step: 3,
        title: 'Sample Charging & Boiling Stones',
        instruction: 'Using a funnel, charge 100 mL of the 40% ethanol mixture into the flask. Add 2–3 porous boiling chips (anti-bumping granules) to promote nucleation and prevent hazardous eruptive superheating.',
      },
      {
        step: 4,
        title: 'Heating Regulation',
        instruction: 'Turn on the cooling water to a steady, gentle flow. Switch on the heating mantle at medium power (~50%). As the mixture approaches boiling, observe liquid reflux ascending the flask neck.',
      },
      {
        step: 5,
        title: 'Fractions Collection',
        instruction: 'Record the temperature when the first drop falls from the condenser tip (~78°C). Regulate heating to maintain a steady distillation rate of 1 to 2 drops per second. Collect the main ethanol-rich fraction between 78.0°C and 82.0°C. Switch receiving flasks when temperature rises past 85°C.',
      },
      {
        step: 6,
        title: 'Shutdown Protocol',
        instruction: 'Turn off the heating mantle when ~15–20 mL of liquid remains in the flask. NEVER distill to complete dryness as concentrated organic residues can decompose or ignite. Allow apparatus to cool before disassembly.',
      },
    ],
    observationTable: {
      headers: ['Distillation Fraction', 'Boiling Temperature Range (°C)', 'Volume Collected (mL)', 'Density at 20°C (g/cm³)', 'Estimated % Ethanol (v/v)'],
      sampleRows: [
        ['Fore-run (Trace Volatiles)', '74.0–78.0°C', '2.5', '0.815', '92%'],
        ['Main Fraction (Enriched Ethanol)', '78.0–82.0°C', '34.0', '0.835', '85%'],
        ['Tail Fraction (Water Carryover)', '82.0–96.0°C', '8.5', '0.942', '40%'],
        ['Pot Residue (Aqueous)', '> 96.0°C (Remains)', '54.0', '0.992', '< 4%'],
      ],
      concordantValue: 'Ethanol Recovery = 85.0% purity in main cut',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Initial feed = 100 mL 40% v/v ethanol.',
    },
    formulae: [
      {
        name: 'Percentage Volumetric Recovery',
        formula: '% Recovery = (Volume of Pure Fraction / Initial Volume of Component) × 100',
        variables: 'Initial pure ethanol in feed = 40.0 mL, Main fraction = 34.0 mL @ 85% = 28.9 mL pure ethanol',
      },
      {
        name: 'Boiling Point Separation Criterion',
        formula: 'ΔTb = Tb(Water) - Tb(Ethanol) = 100.0°C - 78.3°C = 21.7°C',
        variables: 'ΔTb > 20°C permits simple distillation for rough cuts',
      },
    ],
    calculations: [
      'Total volume collected in main fraction = 34.0 mL',
      'Actual pure ethanol in main fraction = 34.0 mL × 0.85 = 28.9 mL',
      '% Ethanol Recovery = (28.9 mL / 40.0 mL) × 100 = 72.25% recovery in single stage simple distillation',
    ],
    result: {
      summary: 'Ethanol was successfully separated from aqueous solution by simple distillation.',
      values: [
        { label: 'Main Fraction Yield', value: '34.0 mL' },
        { label: 'Main Boiling Plateau', value: '78.2°C – 80.5°C' },
        { label: 'Ethanol Purity of Cut', value: '~85% v/v (Density = 0.835 g/cm³)' },
      ],
      interpretation: 'The steady temperature plateau near 78.3°C confirms distillation of volatile ethanol, followed by a steep temperature rise as water concentration in the vapor increases.',
    },
    safetyPrecautions: [
      'Ethanol is a volatile, highly flammable solvent (flash point 13°C). NEVER use open Bunsen burner flames; only use an electric heating mantle.',
      'NEVER distill a flask to complete dryness. Dry residue heating can cause explosive glass failure or peroxide detonation.',
      'Ensure the distillation apparatus is NOT closed to the atmosphere. The vacuum receiver adapter must remain open to atmospheric pressure to avoid hazardous overpressurization.',
    ],
    quiz: [
      {
        id: 'dst-q1',
        question: 'Why must cooling water enter the Liebig condenser at the bottom and exit at the top?',
        options: [
          'To ensure the water jacket is completely flooded without air bubbles and maximizes counter-current cooling',
          'Because water cannot flow downward against gravity',
          'To prevent the condenser glass from cracking',
          'To heat up the distillate before it enters the receiver',
        ],
        correctAnswer: 0,
        explanation: 'Entering at the lowest point forces water to fill the entire cylindrical jacket before overflowing at the top, eliminating air bubbles that create hot spots and ensuring maximum heat transfer efficiency.',
      },
      {
        id: 'dst-q2',
        question: 'Where should the thermometer bulb be positioned in a simple distillation apparatus?',
        options: [
          'Just below the side-arm opening of the three-way distillation head',
          'Submerged completely into the boiling liquid in the bottom flask',
          'At the very top of the condenser tube',
          'Inside the collection flask',
        ],
        correctAnswer: 0,
        explanation: 'The thermometer must measure the true temperature of the equilibrium vapor entering the condenser side-arm, not the hotter boiling liquid in the pot.',
      },
      {
        id: 'dst-q3',
        question: 'What is the function of adding porous porcelain boiling chips before heating?',
        options: [
          'To provide nucleation sites that release tiny vapor bubbles continuously, preventing violent bumping and superheating',
          'To chemically react with impurities',
          'To catalyze the evaporation of ethanol',
          'To color the solution',
        ],
        correctAnswer: 0,
        explanation: 'Boiling chips contain microscopic air-filled pores that release steady streams of tiny bubbles, preventing localized superheating and violent eruption ("bumping") of boiling liquid into the condenser.',
      },
    ],
  },
  {
    id: 'determination-of-water-hardness',
    number: 8,
    title: 'Determination of Water Hardness',
    category: 'titrimetric',
    categoryLabel: 'Titrimetric Analysis',
    duration: '50 mins',
    difficulty: 'Intermediate',
    icon: '',
    aim: 'To determine the Total, Permanent, and Temporary hardness of a municipal water sample by complexometric titration against standard 0.0100 M Disodium EDTA solution using Eriochrome Black T (EBT) indicator.',
    principle: `Water hardness is caused by dissolved polyvalent metallic cations, predominantly Calcium (Ca²⁺) and Magnesium (Mg²⁺), expressed in parts per million (ppm or mg/L) equivalent to CaCO₃.

Disodium ethylenediaminetetraacetate (Na₂EDTA, H₂Y²⁻) is a hexadentate chelating agent that forms extremely stable, soluble 1:1 octahedral chelate complexes with Ca²⁺ and Mg²⁺:
Ca²⁺ + [H₂EDTA]²⁻ → [Ca–EDTA]²⁻ + 2H⁺
Mg²⁺ + [H₂EDTA]²⁻ → [Mg–EDTA]²⁻ + 2H⁺

Titration Mechanism:
1. At pH 10.0 (maintained by NH₄Cl + NH₄OH ammonia buffer), Eriochrome Black T (EBT) indicator forms an unstable, wine-red complex with trace Mg²⁺:
Mg²⁺ + EBT (blue at pH 10) → [Mg–EBT]²⁻ (wine-red)

2. As EDTA titrant is added, it binds free Ca²⁺ first (higher stability constant K_f = 10^10.7), then free Mg²⁺ (K_f = 10^8.7).
3. At the equivalence point, EDTA displaces EBT from the wine-red complex because EDTA has higher affinity for Mg²⁺ than EBT:
[Mg–EBT]²⁻ (wine-red) + EDTA⁴⁻ → [Mg–EDTA]²⁻ (colorless) + EBT (steel blue)
The solution turns sharply from wine-red to clear steel blue with no reddish tinge.

Hardness Types:
- Total Hardness: Titration of raw sample.
- Permanent Hardness: Titration after boiling sample and filtering off precipitated bicarbonates: Ca(HCO₃)₂ → CaCO₃↓ + CO₂ + H₂O.
- Temporary Hardness = Total Hardness - Permanent Hardness.`,
    apparatus: [
      'Burette (50 mL, 0.1 mL divisions) with stand',
      'Volumetric Pipette (20.0 mL or 50.0 mL)',
      'Conical Flask (250 mL Erlenmeyer)',
      'Hot Plate with magnetic stirrer (for boiling sample)',
      'Whatman No. 1 Filter paper and funnel',
      'Graduated Cylinder (10 mL)',
    ],
    chemicals: [
      'Standard Disodium EDTA solution (0.0100 M Na₂H₂Y·2H₂O)',
      'Ammonia-Ammonium Chloride Buffer solution (pH 10.0, 67.5 g NH₄Cl + 570 mL conc. NH₄OH diluted to 1 L)',
      'Eriochrome Black T (EBT) indicator (0.5% in ethanol or 1:100 w/w solid grind in NaCl)',
      'Standard Hard Water (1.00 mg/mL CaCO₃ equivalent)',
      'Municipal / Borewell water test sample',
    ],
    diagramType: 'complexometric-titration',
    procedureSteps: [
      {
        step: 1,
        title: 'Burette Filling & Standardization Check',
        instruction: 'Rinse and fill the burette with standard 0.0100 M Disodium EDTA solution. Adjust the initial meniscus to 0.00 mL, ensuring no bubbles remain in the tip.',
      },
      {
        step: 2,
        title: 'Total Hardness Sample Aliquot',
        instruction: 'Pipette accurately 50.0 mL of the raw water sample into a 250 mL conical flask. Add 2.0 mL of ammonia buffer (pH 10.0) using a graduated cylinder.',
      },
      {
        step: 3,
        title: 'Indicator Addition',
        instruction: 'Add 3 to 4 drops of Eriochrome Black T indicator solution (or a small pinch of solid EBT-NaCl powder). The solution will develop an unmistakable wine-red / purplish-red color.',
      },
      {
        step: 4,
        title: 'Titration to Steel-Blue End-Point',
        instruction: 'Titrate with 0.0100 M EDTA while swirling continuously. Near the end-point, the reddish color lightens to violet. Add titrant dropwise until a sharp, distinct change to clear steel-blue occurs without any reddish or purple tint. Record volume V₁.',
      },
      {
        step: 5,
        title: 'Permanent Hardness Sample Preparation',
        instruction: 'Measure 100.0 mL of water sample into a 250 mL beaker. Boil gently on a hot plate for 20 minutes to precipitate temporary bicarbonate hardness. Cool to room temperature and filter through Whatman No. 1 filter paper into a 100 mL volumetric flask, washing the filter paper with boiled deionized water.',
      },
      {
        step: 6,
        title: 'Permanent Hardness Titration',
        instruction: 'Pipette 50.0 mL of the filtered boiled water into a conical flask. Add 2.0 mL ammonia buffer and EBT indicator. Titrate with 0.0100 M EDTA until the steel-blue end-point is reached. Record volume V₂.',
      },
    ],
    observationTable: {
      headers: ['Trial / Sample Type', 'Sample Volume (V_s, mL)', 'Initial Burette (mL)', 'Final Burette (mL)', 'Volume of 0.01 M EDTA (mL)', 'Calculated Hardness (ppm)'],
      sampleRows: [
        ['Total Hardness Trial 1', '50.00', '0.00', '14.20', '14.20', '284.0 ppm'],
        ['Total Hardness Trial 2 (Concordant)', '50.00', '14.20', '28.40', '14.20', '284.0 ppm'],
        ['Permanent Hardness Trial 1', '50.00', '0.00', '9.80', '9.80', '196.0 ppm'],
        ['Permanent Hardness Trial 2 (Concordant)', '50.00', '9.80', '19.60', '9.80', '196.0 ppm'],
      ],
      concordantValue: 'V₁(Total) = 14.20 mL, V₂(Permanent) = 9.80 mL',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Expressed as CaCO₃ equivalent.',
    },
    formulae: [
      {
        name: 'Total Hardness (mg/L or ppm CaCO₃)',
        formula: 'Total Hardness = (V₁ · M_EDTA · 100,000) / V_sample',
        variables: 'V₁ = 14.20 mL, M_EDTA = 0.0100 M, 100,000 = MW of CaCO₃ (100.086 g/mol) × 1000 mg/g, V_sample = 50.00 mL',
      },
      {
        name: 'Permanent Hardness (mg/L CaCO₃)',
        formula: 'Permanent Hardness = (V₂ · M_EDTA · 100,000) / V_sample',
        variables: 'V₂ = 9.80 mL EDTA consumed for boiled & filtered sample',
      },
      {
        name: 'Temporary (Carbonate) Hardness',
        formula: 'Temporary Hardness = Total Hardness - Permanent Hardness',
        variables: 'Hardness removable by boiling',
      },
    ],
    calculations: [
      'Total Hardness = (14.20 mL × 0.0100 M × 100,000) / 50.00 mL = 14,200 / 50 = 284.0 mg/L (ppm)',
      'Permanent Hardness = (9.80 mL × 0.0100 M × 100,000) / 50.00 mL = 9,800 / 50 = 196.0 mg/L (ppm)',
      'Temporary Hardness = 284.0 ppm - 196.0 ppm = 88.0 mg/L (ppm)',
    ],
    result: {
      summary: 'Water hardness parameters were quantitatively evaluated against BIS / WHO drinking water standards.',
      values: [
        { label: 'Total Hardness', value: '284.0 mg/L (ppm as CaCO₃)' },
        { label: 'Permanent Hardness', value: '196.0 mg/L (ppm as CaCO₃)' },
        { label: 'Temporary Hardness', value: '88.0 mg/L (ppm as CaCO₃)' },
      ],
      interpretation: 'The sample is classified as "Hard Water" (150–300 mg/L category). It complies with the BIS acceptable limit (200–600 mg/L) but requires softening for industrial boiler feed to prevent scaling.',
    },
    safetyPrecautions: [
      'Ammonia buffer releases strong, irritating ammonia fumes. Dispense under a fume hood and keep bottles tightly stoppered.',
      'Disodium EDTA is an eye irritant. Wear chemical safety goggles and protective gloves.',
      'Never boil water samples in a volumetric flask; always use an open Erlenmeyer flask or beaker.',
    ],
    quiz: [
      {
        id: 'hrd-q1',
        question: 'Why must the EDTA complexometric titration be strictly maintained at pH 10.0 using ammonia buffer?',
        options: [
          'Because the Ca-EDTA and Mg-EDTA complexes are stable at pH 10, and EBT shows distinct wine-red to blue color shift',
          'Because EDTA decomposes in neutral water',
          'Because calcium evaporates at lower pH',
          'Because ammonia buffer acts as the titrant',
        ],
        correctAnswer: 0,
        explanation: 'At pH < 8, the metal-EDTA complexes dissociate prematurely; at pH > 12, magnesium precipitates out as Mg(OH)₂ before titration. pH 10 provides optimal conditional stability and sharp indicator transition.',
      },
      {
        id: 'hrd-q2',
        question: 'What is the sharp color transition observed at the end-point of total water hardness titration?',
        options: [
          'Wine-red to clear steel blue',
          'Colorless to pink',
          'Blue to bright yellow',
          'Red to green',
        ],
        correctAnswer: 0,
        explanation: 'The free Eriochrome Black T indicator is sky/steel blue at pH 10. Once all Ca²⁺ and Mg²⁺ ions are bound into colorless EDTA complexes, free EBT dye is liberated, turning the solution steel blue.',
      },
      {
        id: 'hrd-q3',
        question: 'Why does boiling a water sample remove temporary hardness but not permanent hardness?',
        options: [
          'Boiling thermally decomposes soluble bicarbonates into insoluble CaCO₃ precipitate, while chlorides and sulphates remain soluble',
          'Boiling evaporates calcium chloride',
          'Boiling breaks the EDTA bonds',
          'Boiling changes the pH to 2',
        ],
        correctAnswer: 0,
        explanation: 'Heat decomposes soluble calcium and magnesium bicarbonates: Ca(HCO₃)₂ → CaCO₃↓ + CO₂↑ + H₂O. Chlorides and sulphates (CaCl₂, MgSO₄) are thermally stable and stay in solution as permanent hardness.',
      },
    ],
  },
  {
    id: 'conductometric-titration',
    number: 9,
    title: 'Conductometric Titration',
    category: 'instrumental',
    categoryLabel: 'Instrumental Chemistry',
    duration: '50 mins',
    difficulty: 'Intermediate',
    icon: '',
    hasSimulator: true,
    simulatorType: 'conductometric',
    simulatorTitle: 'Conductometric Titration Simulator',
    keywords: [
      'conductometric titration',
      'conductometric simulator',
      'conductometry',
      'conductivity meter',
      'electrolytic conductance',
      'linear regression',
      'trendline intersection',
      'hcl vs naoh',
    ],
    aim: 'To determine the concentration and strength of a hydrochloric acid (HCl) solution by conductometric titration against standard 0.500 M sodium hydroxide (NaOH) solution.',
    principle: `Conductometric titration determines the equivalence point by monitoring changes in electrolytic conductance during neutralization.

Electrolytic conductance (G, measured in Siemens or mS) depends on:
1. The total concentration of ions present in solution.
2. The individual charge and ionic mobility (limiting ionic conductance, λ°) of each ion species.

In aqueous solution at 25°C, limiting ionic conductances (Ω⁻¹·cm²·mol⁻¹) are:
- H⁺: 349.8 (extremely fast via Grotthuss proton-hopping mechanism)
- OH⁻: 198.6 (second fastest mobility)
- Na⁺: 50.1
- Cl⁻: 76.3

Titration Curve Mechanism:
1. Before Equivalence: Adding NaOH causes the neutralization:
H⁺ + Cl⁻ + Na⁺ + OH⁻ → Na⁺ + Cl⁻ + H₂O
Fast H⁺ ions (349.8) are progressively replaced by much slower Na⁺ ions (50.1). Consequently, conductance decreases sharply and linearly.

2. At Equivalence Point: The solution contains only NaCl. Conductance reaches a distinct minimum.

3. Beyond Equivalence: Adding excess NaOH introduces additional Na⁺ (50.1) and fast OH⁻ ions (198.6) into solution with no acid left to consume them. Conductance increases sharply and linearly.

Plotting Conductance (or volume-corrected conductance) vs Volume of NaOH yields two straight lines. Their sharp intersection identifies the exact stoichiometric equivalence point volume (V_e).`,
    apparatus: [
      'Digital Conductivity Meter (resolution 0.01 mS/cm) with cell constant calibration',
      'Conductivity Cell with dual platinized platinum electrode plates (cell constant ~1.0 cm⁻¹)',
      'Micro-burette (10.0 mL or 25.0 mL, 0.05 mL divisions)',
      'Glass Beaker (100 mL tall form)',
      'Magnetic Stirrer with micro Teflon stir bar',
      'Wash bottle with high-purity deionized water (conductivity < 2 μS/cm)',
    ],
    chemicals: [
      'Standard 0.500 M Sodium Hydroxide (NaOH) titrant (higher concentration minimizes volume dilution distortion)',
      'Unknown Hydrochloric Acid (HCl, ~0.05 M to 0.1 M)',
      'Standard 0.0100 M Potassium Chloride (KCl) calibration standard (κ = 1.413 mS/cm at 25°C)',
      'Deionized water',
    ],
    diagramType: 'conductometry-setup',
    procedureSteps: [
      {
        step: 1,
        title: 'Conductivity Meter Calibration',
        instruction: 'Turn on the conductivity meter and warm up for 10 minutes. Rinse the conductivity cell with deionized water, submerge in standard 0.0100 M KCl solution at 25°C, and adjust the cell constant control until display reads 1.413 mS/cm.',
      },
      {
        step: 2,
        title: 'Analyte Dilution and Immersion',
        instruction: 'Pipette accurately 20.0 mL of unknown HCl into a clean 100 mL beaker. Add 40.0 mL of deionized water to ensure the electrode platinum plates are completely submerged with ≥ 1 cm liquid above the plates. Add a magnetic stir bar.',
      },
      {
        step: 3,
        title: 'Initial Reading',
        instruction: 'Fill a micro-burette with standard 0.500 M NaOH. Clamp the conductivity cell vertically in the beaker away from the rotating stir bar. Turn on gentle stirring. Switch off stirring momentarily and record initial conductance at V = 0.00 mL.',
      },
      {
        step: 4,
        title: 'Stepwise Titrant Additions',
        instruction: 'Add 0.50 mL of NaOH from the burette. Stir for 15 seconds to homogenize, switch off the stirrer (to eliminate magnetic field noise), wait 10 seconds for stability, and record the conductance reading in mS.',
      },
      {
        step: 5,
        title: 'Crossing the Equivalence Region',
        instruction: 'Continue adding NaOH in 0.50 mL increments. Notice conductance falling steadily, reaching a minimum near 4.0–4.5 mL, and then rising continuously. Continue additions until at least 4–5 points past the minimum are recorded (~8.0 mL total).',
      },
      {
        step: 6,
        title: 'Graphical Intersection Analysis',
        instruction: 'Plot Volume of NaOH (x-axis, mL) against Conductance G (y-axis, mS). Fit linear regression trendlines to the descending and ascending limbs. The x-coordinate of their point of intersection gives the equivalence volume V_e.',
      },
    ],
    observationTable: {
      headers: ['Volume of NaOH (mL)', 'Measured Conductance G (mS)', 'Volume Correction Factor (V₀+V)/V₀', 'Corrected Conductance G_corr (mS)', 'Trendline Regime'],
      sampleRows: [
        ['0.00', '18.40', '1.000', '18.40', 'Descending (H⁺ replaced by Na⁺)'],
        ['1.00', '15.10', '1.017', '15.35', 'Descending'],
        ['2.00', '11.80', '1.033', '12.19', 'Descending'],
        ['3.00', '8.50', '1.050', '8.92', 'Descending'],
        ['4.00', '5.20', '1.067', '5.55', 'Descending (Near equivalence)'],
        ['4.20 (Min)', '4.60', '1.070', '4.92', 'Equivalence Minimum Zone'],
        ['5.00', '6.80', '1.083', '7.36', 'Ascending (Excess Na⁺ + OH⁻)'],
        ['6.00', '9.70', '1.100', '10.67', 'Ascending'],
        ['7.00', '12.60', '1.117', '14.07', 'Ascending'],
        ['8.00', '15.50', '1.133', '17.56', 'Ascending'],
      ],
      concordantValue: 'Equivalence Volume V_e = 4.20 mL NaOH',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. V₀ = 60.0 mL total initial volume.',
    },
    formulae: [
      {
        name: 'Equivalence Molarity Calculation',
        formula: 'M_acid = (M_base · V_e) / V_acid',
        variables: 'M_base = 0.500 M NaOH, V_e = 4.20 mL, V_acid = 20.00 mL HCl pipetted',
      },
      {
        name: 'Strength of HCl (g/L)',
        formula: 'Strength = M_acid · 36.46 g/mol',
        variables: 'Molar mass of HCl = 36.46 g/mol',
      },
    ],
    calculations: [
      'Descending line equation: G = -4.385 · V + 23.42',
      'Ascending line equation: G = +2.900 · V - 7.18',
      'Intersection: -4.385·V + 23.42 = 2.900·V - 7.18  =>  7.285·V = 30.60  =>  V_e = 4.200 mL',
      'M_HCl = (0.500 M × 4.20 mL) / 20.00 mL = 0.1050 M',
      'Strength of HCl = 0.1050 mol/L × 36.46 g/mol = 3.828 g/L',
    ],
    result: {
      summary: 'The equivalence point was precisely located via the intersection of linear regression branches.',
      values: [
        { label: 'Equivalence Volume (V_e)', value: '4.20 mL NaOH' },
        { label: 'Molarity of HCl', value: '0.1050 M' },
        { label: 'Strength of HCl', value: '3.828 g/L' },
      ],
      interpretation: 'Conductometric titration eliminates human visual indicator subjectivity and is fully operational in turbid, dark, or highly colored solutions where chemical dyes cannot be seen.',
    },
    safetyPrecautions: [
      'Do not touch or scrub the delicate black platinized platinum electrode plates; abrasion degrades cell constant calibration.',
      'Always switch off the magnetic stirrer while recording conductance readings to avoid electromagnetic induction fluctuation.',
      'Wear protective gloves and goggles when handling caustic 0.5 M NaOH and concentrated acids.',
    ],
    quiz: [
      {
        id: 'cnd-q1',
        question: 'Why does conductance decrease sharply during the titration of HCl with NaOH prior to the equivalence point?',
        options: [
          'Because fast H⁺ ions (mobility 349.8) are replaced by slower Na⁺ ions (mobility 50.1)',
          'Because NaCl precipitates out of solution',
          'Because temperature falls by 20 degrees',
          'Because water evaporates',
        ],
        correctAnswer: 0,
        explanation: 'Hydronium ions have an extraordinarily high equivalent ionic mobility (349.8) due to the Grotthuss proton jumping mechanism. As NaOH is added, H⁺ reacts to form non-conducting H₂O, replaced by Na⁺ which has seven times lower mobility (50.1).',
      },
      {
        id: 'cnd-q2',
        question: 'What is a major advantage of conductometric titration over classical indicator titration?',
        options: [
          'It can be accurately performed in deeply colored, turbid, or opaque solutions without visual indicators',
          'It requires no glassware',
          'It completes in 2 seconds',
          'It does not require standard solutions',
        ],
        correctAnswer: 0,
        explanation: 'Because endpoint detection relies on electronic conductance measurement rather than visual color transitions, conductometric titrations work reliably in cloudy, milky, or colored solutions (e.g. food, industrial effluents).',
      },
      {
        id: 'cnd-q3',
        question: 'Why is a concentrated titrant (e.g. 0.5 M NaOH) preferred when titrating a dilute analyte (0.05 M HCl)?',
        options: [
          'To minimize volume dilution distortion of conductance during titration',
          'To make the reaction happen faster',
          'To prevent the beaker from overflowing',
          'Because dilute NaOH does not react',
        ],
        correctAnswer: 0,
        explanation: 'Adding large volumes of titrant causes significant dilution of the solution, curving the straight lines. Using concentrated titrant keeps total volume change negligible (< 5%), preserving linear regression accuracy.',
      },
    ],
  },
  {
    id: 'ph-metric-titration',
    number: 10,
    title: 'pH-Metric Titration',
    category: 'instrumental',
    categoryLabel: 'Instrumental Chemistry',
    duration: '50 mins',
    difficulty: 'Intermediate',
    icon: '',
    hasSimulator: true,
    simulatorType: 'ph-metric',
    simulatorTitle: 'pH Titration Simulator (pH-Metric)',
    keywords: [
      'ph-metric titration',
      'ph titration simulator',
      'ph titration',
      'potentiometric titration',
      'first derivative',
      'second derivative',
      'ph meter calibration',
      'titration curve',
      'equivalence point',
      'ch3cooh vs naoh',
      'hcl vs naoh',
    ],
    aim: 'To determine the concentration of an unknown hydrochloric acid solution and compare graphical inflection versus first-derivative (ΔpH/ΔV) methods using a digital pH meter.',
    principle: `A pH-metric (potentiometric) titration monitors the change in solution pH as titrant is added from a burette.

In a strong acid–strong base titration (HCl vs NaOH):
1. Initial Buffer Region: Prior to equivalence, pH changes slowly as excess H⁺ buffers the system:
pH = -log₁₀[H⁺_remaining]

2. Equivalence Inflection Zone: Near the equivalence point (where moles of acid ≈ moles of base), [H⁺] plummets exponentially. Adding a minute volume of titrant (e.g. 0.05 mL) causes an abrupt pH jump of 5 to 6 full pH units (from pH ~3.5 to ~9.5).

3. Post-Equivalence Region: The solution becomes basic; pH is governed by excess [OH⁻] and flattens out:
pH = 14 + log₁₀[OH⁻_excess]

Endpoint Determination Techniques:
- Direct Titration Curve: S-shaped sigmoid curve of pH vs V. The midpoint of the steep vertical inflection corresponds to equivalence.
- First Derivative Curve (ΔpH / ΔV vs V_avg): Plotting the rate of change of pH per increment of volume produces a sharp, symmetric peak whose mathematical maximum pinpoints V_e with ±0.02 mL precision.`,
    apparatus: [
      'Digital pH Meter with 0.01 pH sensitivity and millivolt mode',
      'Combined Glass-Reference pH Electrode with temperature sensor (ATC)',
      'Precision Micro-burette (25.0 mL, 0.05 mL divisions)',
      'Glass Beaker (150 mL tall form)',
      'Magnetic Stirrer with Teflon flea',
      'Standard Buffers (pH 4.01, 7.00, 9.20)',
    ],
    chemicals: [
      'Standardized Sodium Hydroxide solution (0.100 M NaOH)',
      'Unknown Hydrochloric Acid solution (HCl, ~0.1 M)',
      'Deionized water (neutral)',
      '3 M KCl electrode storage solution',
    ],
    diagramType: 'ph-metric-setup',
    procedureSteps: [
      {
        step: 1,
        title: 'Two-Point Meter Calibration',
        instruction: 'Calibrate the pH meter using pH 7.00 and pH 4.01 standard buffers at 25°C. Verify that the electrode slope is between 98% and 101%.',
      },
      {
        step: 2,
        title: 'Titration Cell Setup',
        instruction: 'Pipette accurately 20.0 mL of unknown HCl into a 150 mL beaker. Add 30 mL of deionized water so that the combined glass bulb and ceramic liquid junction are fully submerged. Position the beaker on the magnetic stirrer.',
      },
      {
        step: 3,
        title: 'Electrode Positioning',
        instruction: 'Clamp the pH electrode securely so the glass bulb is well immersed but positioned safely away from the rotating magnetic flea to prevent mechanical collision.',
      },
      {
        step: 4,
        title: 'Initial & Pre-inflection Titration',
        instruction: 'Record initial pH at V = 0.00 mL. Add 0.100 M NaOH from the burette in 1.0 mL increments initially. Stir continuously, pause stirring, and record the stabilized pH reading.',
      },
      {
        step: 5,
        title: 'High-Density Inflection Region',
        instruction: 'When pH starts rising more quickly (near pH 3.0, around 18 mL), reduce titrant addition increments to 0.10 mL (or dropwise). Continue through the sharp inflection jump (pH 4 to 10) until additions level off at pH ~11.5.',
      },
      {
        step: 6,
        title: 'First Derivative Analysis',
        instruction: 'Calculate the first derivative for each adjacent step: ΔpH = pH_(n) - pH_(n-1), ΔV = V_(n) - V_(n-1), and ΔpH/ΔV at V_avg = (V_(n) + V_(n-1))/2. Plot ΔpH/ΔV vs V_avg to identify the peak maximum.',
      },
    ],
    observationTable: {
      headers: ['Volume V (mL)', 'Measured pH', 'ΔV (mL)', 'ΔpH', 'First Derivative ΔpH/ΔV (mL⁻¹)', 'Average Volume V_avg (mL)'],
      sampleRows: [
        ['0.00', '1.30', '—', '—', '—', '—'],
        ['10.00', '1.60', '10.00', '0.30', '0.03', '5.00'],
        ['18.00', '2.28', '8.00', '0.68', '0.08', '14.00'],
        ['19.00', '2.60', '1.00', '0.32', '0.32', '18.50'],
        ['19.50', '3.12', '0.50', '0.52', '1.04', '19.25'],
        ['19.80', '3.65', '0.30', '0.53', '1.77', '19.65'],
        ['19.90', '4.35', '0.10', '0.70', '7.00', '19.85'],
        ['20.00 (Peak)', '7.00', '0.10', '2.65', '26.50 (Max)', '19.95'],
        ['20.10', '9.65', '0.10', '2.65', '26.50 (Max)', '20.05'],
        ['20.20', '10.35', '0.10', '0.70', '7.00', '20.15'],
        ['20.50', '10.88', '0.30', '0.53', '1.77', '20.35'],
        ['21.00', '11.40', '0.50', '0.52', '1.04', '20.75'],
      ],
      concordantValue: 'Peak Equivalence Volume V_e = 20.00 mL',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Distinct derivative maximum at 20.00 mL.',
    },
    formulae: [
      {
        name: 'First Derivative Formula',
        formula: 'ΔpH / ΔV = (pH_i - pH_{i-1}) / (V_i - V_{i-1})',
        variables: 'Evaluated at average volume V_avg = (V_i + V_{i-1}) / 2',
      },
      {
        name: 'Molarity of Unknown Acid',
        formula: 'M_acid = (M_base · V_e) / V_acid',
        variables: 'M_base = 0.100 M NaOH, V_e = 20.00 mL from derivative peak, V_acid = 20.00 mL',
      },
    ],
    calculations: [
      'Derivative peak observed exactly across 19.90 mL to 20.10 mL interval (ΔpH/ΔV = 26.50 mL⁻¹)',
      'Equivalence Volume V_e = 20.00 mL NaOH',
      'M_HCl = (0.1000 M × 20.00 mL) / 20.00 mL = 0.1000 M',
      'Strength of HCl = 0.1000 M × 36.46 g/mol = 3.646 g/L',
    ],
    result: {
      summary: 'The equivalence point was determined with high precision using the first-derivative peak method.',
      values: [
        { label: 'Equivalence Volume (V_e)', value: '20.00 mL' },
        { label: 'Inflection pH Jump', value: 'pH 4.35 to 9.65 within 0.20 mL' },
        { label: 'Calculated Acid Molarity', value: '0.1000 M (Strength = 3.646 g/L)' },
      ],
      interpretation: 'The first derivative method provides unambiguous mathematical identification of the equivalence point without relying on graphical estimation of the inflection center.',
    },
    safetyPrecautions: [
      'Never allow the magnetic stirring bar to collide with the fragile glass bulb of the pH electrode.',
      'Always rinse the electrode with deionized water between trials and store in 3 M KCl.',
      'Wear safety glasses and gloves when titrating strong acids and bases.',
    ],
    quiz: [
      {
        id: 'phm-q1',
        question: 'What mathematical feature on a first-derivative plot (ΔpH/ΔV vs V) corresponds to the titration equivalence point?',
        options: [
          'A sharp maximum peak',
          'A zero crossing point',
          'A horizontal plateau',
          'A downward valley',
        ],
        correctAnswer: 0,
        explanation: 'The inflection point of an S-shaped sigmoid titration curve represents the point of maximum slope (steepest rate of pH change per volume), which mathematically translates to a sharp maximum peak in the first derivative.',
      },
      {
        id: 'phm-q2',
        question: 'Why should titrant addition increments be reduced to 0.1 mL near the inflection region?',
        options: [
          'Because pH changes rapidly with tiny additions of base, requiring dense data points to accurately define the derivative peak',
          'To prevent the beaker from heating up',
          'Because the pH meter turns off if additions are too large',
          'To neutralize the glass bulb',
        ],
        correctAnswer: 0,
        explanation: 'Near the equivalence point, a single drop changes pH by several units. Taking small, uniform increments (0.10 mL) ensures high resolution around the inflection point to accurately locate the peak maximum.',
      },
      {
        id: 'phm-q3',
        question: 'What is the theoretical pH at the equivalence point of a strong acid–strong base titration at 25°C?',
        options: [
          '7.00',
          '1.00',
          '14.00',
          '8.50',
        ],
        correctAnswer: 0,
        explanation: 'Neutralization of strong acid (HCl) by strong base (NaOH) produces water and neutral NaCl. Neither Na⁺ nor Cl⁻ undergoes hydrolysis, so the pH at 25°C is governed solely by water autoionization: pH = 7.00.',
      },
    ],
  },
];
