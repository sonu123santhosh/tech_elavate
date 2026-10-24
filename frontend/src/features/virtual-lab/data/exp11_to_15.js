/**
 * Virtual Chemistry Lab — Experiments 11 to 15
 *
 * 11. Chloride Estimation in Water
 * 12. Dissolved Oxygen in Water
 * 13. Viscosity Measurement
 * 14. Beer–Lambert Law
 * 15. Qualitative Salt Analysis
 */

export const EXPERIMENTS_11_TO_15 = [
  {
    id: 'chloride-estimation-in-water',
    number: 11,
    title: 'Chloride Estimation in Water',
    category: 'titrimetric',
    categoryLabel: 'Titrimetric Analysis',
    duration: '45 mins',
    difficulty: 'Intermediate',
    icon: '',
    aim: 'To determine the concentration of chloride ions (Cl⁻) in a municipal / environmental water sample by argentometric precipitation titration using Mohr\'s method.',
    principle: `Mohr's method is an argentometric precipitation titration for estimating halides (Cl⁻, Br⁻) using standard silver nitrate (AgNO₃) titrant and potassium chromate (K₂CrO₄) as indicator.

Precipitation Reactions:
1. Primary Precipitation (White):
Ag⁺(aq) + Cl⁻(aq) ⇌ AgCl(s)↓  [Solubility Product K_sp = 1.82 × 10⁻¹⁰ at 25°C]
Because AgCl has a very low solubility product, silver chloride precipitates selectively as a white curdy solid as long as Cl⁻ ions remain in solution.

2. Indicator Precipitation (Brick-Red End-Point):
Once all Cl⁻ ions are stoichiometrically precipitated, the slightest excess of Ag⁺ reacts with chromate ions (CrO₄²⁻) to precipitate silver chromate:
2Ag⁺(aq) + CrO₄²⁻(aq) ⇌ Ag₂CrO₄(s)↓  [K_sp = 1.12 × 10⁻¹² at 25°C]
Silver chromate is an insoluble brick-red / reddish-brown precipitate that imparts an unmistakable color shift to the yellowish suspension, marking the end-point.

Critical pH Condition:
The titration must be strictly conducted in the neutral or slightly alkaline pH range of 6.5 to 9.0:
- If pH < 6.5 (acidic): Chromate ions convert to dichromate (2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O), which does not form the Ag₂CrO₄ precipitate at the correct equivalence point (delayed end-point).
- If pH > 9.0 (strongly basic): Silver ions precipitate as silver oxide / hydroxide: 2Ag⁺ + 2OH⁻ → 2AgOH → Ag₂O↓ + H₂O, competing with titration.
A small pinch of solid CaCO₃ or NaHCO₃ is added to buffer slightly acidic water samples to pH 7–8.`,
    apparatus: [
      'Amber Burette (50 mL, 0.1 mL subdivisions) to protect light-sensitive AgNO₃',
      'Volumetric Pipette (50.0 mL) with safety bulb',
      'Conical Flask (250 mL Erlenmeyer)',
      'White ceramic tile (for sharp viewing of brick-red end-point)',
      'Measuring Cylinder (10 mL)',
    ],
    chemicals: [
      'Standard Silver Nitrate solution (0.0141 N or 0.0200 N AgNO₃, standardized against pure NaCl)',
      'Potassium Chromate indicator solution (5% w/v K₂CrO₄ in deionized water, chloride-free)',
      'Calcium Carbonate (CaCO₃, analytical grade powder for pH adjustment)',
      'Deionized water (for reagent blank determination)',
      'Water sample (tap / lake / groundwater)',
    ],
    diagramType: 'argentometric-titration',
    procedureSteps: [
      {
        step: 1,
        title: 'Burette Preparation',
        instruction: 'Rinse an amber glass burette with ~5 mL of standard 0.0141 N AgNO₃ solution. Fill the burette, purge the tip of bubbles, and adjust the meniscus to 0.00 mL.',
      },
      {
        step: 2,
        title: 'Sample Aliquot & pH Buffering',
        instruction: 'Pipette accurately 50.0 mL of the water sample into a clean 250 mL conical flask. Check sample pH with indicator paper; if pH is below 6.5, add a small pinch (~0.1 g) of pure CaCO₃ powder to buffer the solution to pH 7.0–8.0.',
      },
      {
        step: 3,
        title: 'Indicator Addition',
        instruction: 'Add exactly 1.0 mL of 5% K₂CrO₄ indicator solution using a 1 mL pipette or calibrated dropper. The solution will turn clear bright lemon-yellow.',
      },
      {
        step: 4,
        title: 'Titration to Brick-Red End-Point',
        instruction: 'Titrate with standard 0.0141 N AgNO₃ from the amber burette against a white background, swirling vigorously. White AgCl precipitate forms immediately. Slow additions to drop-by-drop as local red flashes take longer to dispel. Stop when a permanent, faint reddish-brown/brick-red tinge persists throughout the yellowish-white suspension.',
      },
      {
        step: 5,
        title: 'Reagent Blank Titration',
        instruction: 'Perform an identical blank titration using 50.0 mL of deionized water and 1.0 mL of K₂CrO₄ indicator. Titrate with AgNO₃ until the identical brick-red tint appears. Record the blank volume V_blank (typically 0.20–0.30 mL).',
      },
      {
        step: 6,
        title: 'Concordant Trials',
        instruction: 'Repeat sample titration to obtain concordant titre values (V_sample) agreeing within ±0.10 mL. Subtract the blank volume: V_net = V_sample - V_blank.',
      },
    ],
    observationTable: {
      headers: ['Trial No.', 'Sample Volume (V_s, mL)', 'Initial Burette (mL)', 'Final Burette (mL)', 'AgNO₃ Volume (mL)', 'Net Titre Volume (mL)'],
      sampleRows: [
        ['1 (Water Sample)', '50.00', '0.00', '4.45', '4.45', '4.25 (V_net)'],
        ['2 (Water Sample - Concordant)', '50.00', '4.45', '8.90', '4.45', '4.25 (V_net)'],
        ['3 (Reagent Blank)', '50.00 (DI Water)', '0.00', '0.20', '0.20 (V_blank)', '—'],
      ],
      concordantValue: 'V_net = 4.25 mL 0.0141 N AgNO₃',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Blank correction of 0.20 mL applied.',
    },
    formulae: [
      {
        name: 'Chloride Concentration (mg/L or ppm Cl⁻)',
        formula: 'Chloride (mg/L) = [(V_sample - V_blank) · N_AgNO₃ · 35.453 · 1000] / V_sample_mL',
        variables: 'V_sample = 4.45 mL, V_blank = 0.20 mL, N_AgNO₃ = 0.0141 N, Equivalent weight of Cl⁻ = 35.453 g/equiv, V_sample_mL = 50.00 mL',
      },
      {
        name: 'Simplified Formula for 0.0141 N AgNO₃ on 50 mL sample',
        formula: 'Chloride (mg/L) = (V_sample - V_blank) × 10.0',
        variables: '0.0141 × 35.453 × 1000 / 50.00 ≈ 10.00 (Standard Environmental Water factor)',
      },
    ],
    calculations: [
      'V_net = 4.45 mL - 0.20 mL = 4.25 mL',
      'Chloride (mg/L) = (4.25 mL × 0.0141 N × 35.453 g/equiv × 1000 mg/g) / 50.00 mL',
      'Chloride (mg/L) = 2124.5 / 50.00 = 42.49 mg/L (ppm)',
    ],
    result: {
      summary: 'The chloride concentration of the water sample was determined by Mohr\'s argentometric method.',
      values: [
        { label: 'Net Titre Volume', value: '4.25 mL of 0.0141 N AgNO₃' },
        { label: 'Chloride Content', value: '42.5 mg/L (ppm Cl⁻)' },
        { label: 'WHO / BIS Permissible Limit', value: '250 mg/L (Acceptable) / 1000 mg/L (Permissible)' },
      ],
      interpretation: 'The measured chloride concentration (42.5 mg/L) is well below the desirable drinking water threshold of 250 mg/L, indicating low salinity and no sewage or saltwater intrusion.',
    },
    safetyPrecautions: [
      'Silver nitrate (AgNO₃) causes permanent black stains on skin and clothing due to photoreduction to metallic silver. Wear nitrile gloves and clean up spills immediately.',
      'Potassium chromate is classified as a toxic oxidizer and suspected carcinogen. Avoid inhalation of dust, never pipette by mouth, and dispose of silver-chromate wastes in designated hazardous chemical receptacles.',
      'Never wash silver residues down municipal drains; silver is an aquatic ecotoxin.',
    ],
    quiz: [
      {
        id: 'chl-q1',
        question: 'Why must Mohr\'s argentometric titration be conducted strictly within the neutral pH range of 6.5 to 9.0?',
        options: [
          'In acidic solutions chromate converts to dichromate (preventing Ag₂CrO₄ precipitation), while in basic solutions AgOH/Ag₂O precipitates',
          'Because silver chloride evaporates at pH 4',
          'Because water boils at pH 10',
          'Because potassium chromate explodes in acid',
        ],
        correctAnswer: 0,
        explanation: 'At pH < 6.5, H⁺ protonates CrO₄²⁻ into Cr₂O₇²⁻, suppressing Ag₂CrO₄ formation and causing severe overtitration. At pH > 9.0, Ag⁺ reacts with OH⁻ to precipitate brown silver oxide (Ag₂O), interfering with titration.',
      },
      {
        id: 'chl-q2',
        question: 'What is the purpose of conducting a reagent blank titration in Mohr\'s method?',
        options: [
          'To determine the volume of AgNO₃ needed to react with the indicator to produce the visible brick-red tint in chloride-free water',
          'To clean the burette',
          'To calibrate the thermometer',
          'To measure the atmospheric humidity',
        ],
        correctAnswer: 0,
        explanation: 'A measurable concentration of Ag⁺ is required to exceed the solubility product of Ag₂CrO₄ before the human eye detects the brick-red tint. The blank volume quantifies this indicator error so it can be subtracted from the sample titre.',
      },
      {
        id: 'chl-q3',
        question: 'Why does white AgCl precipitate before brick-red Ag₂CrO₄ during the titration?',
        options: [
          'Because AgCl has a much lower solubility than Ag₂CrO₄ and precipitates at a lower Ag⁺ concentration',
          'Because chromate reacts with chloride first',
          'Because AgCl is heavier and sinks faster',
          'Because the indicator is added after the acid',
        ],
        correctAnswer: 0,
        explanation: 'Although K_sp(Ag₂CrO₄) appears smaller, calculating molar solubility (S = (K_sp/4)^(1/3) = 6.5 × 10⁻⁵ M for Ag₂CrO₄ vs S = 1.35 × 10⁻⁵ M for AgCl) proves that AgCl is five times less soluble and precipitates first.',
      },
    ],
  },
  {
    id: 'dissolved-oxygen-in-water',
    number: 12,
    title: 'Dissolved Oxygen in Water',
    category: 'titrimetric',
    categoryLabel: 'Titrimetric Analysis',
    duration: '55 mins',
    difficulty: 'Advanced',
    icon: '',
    aim: 'To determine the Dissolved Oxygen (DO) concentration in an environmental water sample using the Azide modification of the Winkler iodometric titration method.',
    principle: `Dissolved Oxygen (DO) is a critical water quality index essential for sustaining aerobic aquatic ecosystems (healthy streams require DO ≥ 5–6 mg/L).

Winkler Method Reaction Sequence:
1. Fixation of Oxygen (Precipitation):
In an airtight BOD bottle, manganous sulphate (MnSO₄) and alkaline-iodide-azide reagent (NaOH + NaI + NaN₃) are added. Divalent Mn²⁺ reacts with dissolved oxygen to precipitate higher-valent brown basic manganic oxide:
Mn²⁺ + 2OH⁻ → Mn(OH)₂ (white precipitate, if no DO)
2Mn(OH)₂ + O₂ → 2MnO(OH)₂↓ (brown precipitate, quantitatively proportional to DO)

2. Acidification and Iodine Liberation:
Upon addition of concentrated H₂SO₄, the brown precipitate dissolves, and oxidized Mn(IV) quantitatively oxidizes iodide (I⁻) to elemental iodine (I₂):
MnO(OH)₂ + 2I⁻ + 4H⁺ → Mn²⁺ + I₂ + 3H₂O

3. Titration:
The liberated golden-brown iodine (exactly equivalent to the original dissolved oxygen) is titrated against standard 0.0250 N sodium thiosulphate (Na₂S₂O₃):
I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (tetrathionate)
Starch indicator is added near the end-point (turning deep blue with residual I₂) and disappears completely at the equivalence point.

Role of Sodium Azide (NaN₃):
Eliminates nitrite (NO₂⁻) interference commonly found in wastewater:
2NaN₃ + H₂SO₄ → 2HN₃ + Na₂SO₄
HNO₂ + HN₃ → N₂O↑ + N₂↑ + H₂O`,
    apparatus: [
      'BOD Incubation Bottle (300 mL capacity with flared ground glass pennyhead stopper)',
      'Burette (25 mL or 50 mL, 0.1 mL graduations)',
      'Volumetric Pipettes (2.0 mL graduated, 200.0 mL volumetric)',
      'Conical Flask (250 mL or 500 mL)',
      'Rubber safety suction bulbs (pipetting by mouth strictly prohibited)',
    ],
    chemicals: [
      'Manganous Sulphate solution (480 g MnSO₄·4H₂O in 1 L deionized water)',
      'Alkaline-Iodide-Azide reagent (500 g NaOH + 150 g NaI + 10 g NaN₃ in 1 L water)',
      'Concentrated Sulphuric Acid (H₂SO₄, specific gravity 1.84, 98%)',
      'Standard Sodium Thiosulphate solution (0.0250 N Na₂S₂O₃·5H₂O, stabilized with 0.1 g/L Na₂CO₃)',
      'Fresh 1% Starch Indicator solution (prepared daily)',
    ],
    diagramType: 'winkler-do-setup',
    procedureSteps: [
      {
        step: 1,
        title: 'Sampling Without Aeration',
        instruction: 'Collect the water sample in a clean 300 mL BOD bottle by overflowing gently, avoiding any splashing or air bubble entrapment. Insert the stopper smoothly so no air bubble is trapped beneath the glass stopper.',
      },
      {
        step: 2,
        title: 'Chemical Fixation of Oxygen',
        instruction: 'Remove the stopper. Submerge the pipette tip just beneath the liquid surface and inject 2.0 mL of Manganous Sulphate solution, followed by 2.0 mL of Alkaline-Iodide-Azide reagent. Stopper carefully (excess liquid overflows), and invert the bottle 15–20 times. A flocculent brown precipitate [MnO(OH)₂] forms.',
      },
      {
        step: 3,
        title: 'Flocculation Settlement',
        instruction: 'Place the bottle in the dark for 10–15 minutes until the brown floc settles down to the lower half of the bottle, leaving a clear supernatant layer.',
      },
      {
        step: 4,
        title: 'Acid Dissolution and Iodine Release',
        instruction: 'Carefully remove the stopper and add 2.0 mL of concentrated H₂SO₄ down the inner neck of the bottle. Re-stopper and invert smoothly several times until the brown precipitate completely dissolves, yielding a clear, brilliant golden-brown/amber iodine solution.',
      },
      {
        step: 5,
        title: 'Aliquoting for Titration',
        instruction: 'Because adding 2.0 mL of MnSO₄ + 2.0 mL of alkali reagent displaced 4.0 mL of the original 300 mL sample, measuring 203.0 mL of the acidified solution corresponds to exactly 200.0 mL of original raw water sample.',
      },
      {
        step: 6,
        title: 'Titration with Thiosulphate',
        instruction: 'Pour the 203.0 mL aliquot into a 500 mL conical flask. Titrate with standard 0.0250 N Na₂S₂O₃ until the dark brown color lightens to a pale straw-yellow. Add 1.0–2.0 mL of starch indicator (solution turns deep ink-blue). Continue dropwise titration until the blue color turns completely colorless. Record volume V.',
      },
    ],
    observationTable: {
      headers: ['Trial No.', 'Volume of Sample Titrated (mL)', 'Initial Burette Reading (mL)', 'Final Burette Reading (mL)', 'Volume of 0.025 N Na₂S₂O₃ (V, mL)', 'Dissolved Oxygen (mg/L)'],
      sampleRows: [
        ['1 (Water Sample)', '203.0 (≡ 200.0 mL raw)', '0.00', '6.80', '6.80', '6.80 mg/L'],
        ['2 (Concordant)', '203.0 (≡ 200.0 mL raw)', '6.80', '13.60', '6.80', '6.80 mg/L'],
        ['3 (Verification)', '203.0 (≡ 200.0 mL raw)', '13.60', '20.40', '6.80', '6.80 mg/L'],
      ],
      concordantValue: 'Titre Volume V = 6.80 mL 0.0250 N Na₂S₂O₃',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Sample collected at 22.0°C.',
    },
    formulae: [
      {
        name: 'Dissolved Oxygen Concentration (mg/L or ppm)',
        formula: 'DO (mg/L) = (V · N_thiosulphate · 8 · 1000) / V_actual_sample',
        variables: 'V = 6.80 mL, N_thiosulphate = 0.0250 N, Equivalent weight of Oxygen = 8.00 g/equiv, 1000 = conversion factor to mg, V_actual_sample = 200.0 mL',
      },
      {
        name: 'Direct Equivalence Relationship',
        formula: 'DO (mg/L) = V (mL of 0.025 N titrant consumed on 200 mL aliquot)',
        variables: 'Since (0.0250 × 8 × 1000) / 200.0 = 1.000, 1.00 mL of titrant = 1.00 mg/L DO',
      },
    ],
    calculations: [
      'DO (mg/L) = (6.80 mL × 0.0250 N × 8000) / 200.0 mL',
      'DO (mg/L) = (6.80 × 200.0) / 200.0 = 6.80 mg/L (ppm)',
      'Theoretical Saturation DO at 22°C = 8.74 mg/L',
      '% Oxygen Saturation = (6.80 / 8.74) × 100 = 77.8% saturation',
    ],
    result: {
      summary: 'Dissolved oxygen was quantitatively determined by the azide-modified Winkler iodometric method.',
      values: [
        { label: 'Dissolved Oxygen (DO)', value: '6.80 mg/L (ppm)' },
        { label: 'Saturation Percentage', value: '77.8% at 22.0°C' },
        { label: 'Aquatic Quality Class', value: 'Good (Healthy river/lake support standard ≥ 5.0 mg/L)' },
      ],
      interpretation: 'A DO level of 6.80 mg/L indicates active photosynthetic aeration and low biochemical oxygen demand (BOD) organic loading, well capable of sustaining fish and biodiversity.',
    },
    safetyPrecautions: [
      'Concentrated Sulphuric Acid (H₂SO₄) is severely corrosive and reacts exothermically. Dispense carefully down the flask neck wearing thick nitrile gloves and face shield.',
      'Sodium Azide (NaN₃) is extremely toxic and emits lethal hydrazoic acid gas if combined with strong acids in open air. Never pipette reagents by mouth.',
      'Always submerge pipette tips below the liquid level when adding Winkler reagents to prevent atmospheric oxygen introduction.',
    ],
    quiz: [
      {
        id: 'do-q1',
        question: 'Why is starch indicator added only NEAR the end-point (when solution turns pale straw-yellow) rather than at the beginning?',
        options: [
          'Because high concentrations of iodine irreversibly decompose and bind to starch, preventing sharp color discharge',
          'Because starch evaporates in dark brown solutions',
          'Because starch turns red at high concentrations',
          'Because starch dissolves oxygen',
        ],
        correctAnswer: 0,
        explanation: 'At high iodine concentrations, iodine forms a stable, quasi-irreversible inclusion complex with helical amylose in starch that desorbs very slowly, making the end-point sluggish and inaccurate. Adding it at pale yellow ensures instantaneous desorption and sharp decolorization.',
      },
      {
        id: 'do-q2',
        question: 'What is the role of sodium azide (NaN₃) in the modified Winkler method?',
        options: [
          'To destroy nitrite ions (NO₂⁻) that would otherwise catalyze cyclic oxidation of iodide and cause falsely high DO readings',
          'To speed up the dissolving of the precipitate',
          'To color the solution purple',
          'To act as the primary titrant',
        ],
        correctAnswer: 0,
        explanation: 'Nitrites commonly present in polluted water react with iodide to liberate extra iodine and are reformed by atmospheric oxygen in a cyclic catalytic loop. Sodium azide decomposes nitrite into inert N₂ and N₂O gases, eliminating this interference.',
      },
      {
        id: 'do-q3',
        question: 'What does a pure white precipitate upon addition of MnSO₄ and alkali indicate about the water sample?',
        options: [
          'The sample contains zero dissolved oxygen (anoxic / anaerobic conditions)',
          'The sample is supersaturated with oxygen',
          'The sample is extremely acidic',
          'The reagents have expired',
        ],
        correctAnswer: 0,
        explanation: 'In the absence of dissolved oxygen, Mn²⁺ precipitates only as white manganous hydroxide [Mn(OH)₂]. Oxidation to brown basic oxide [MnO(OH)₂] requires the presence of dissolved molecular oxygen.',
      },
    ],
  },
  {
    id: 'viscosity-measurement',
    number: 13,
    title: 'Viscosity Measurement',
    category: 'instrumental',
    categoryLabel: 'Instrumental Chemistry',
    duration: '45 mins',
    difficulty: 'Intermediate',
    icon: '',
    aim: 'To determine the relative and dynamic (absolute) viscosity of an unknown organic liquid (or ethanol solution) with respect to water at 25°C using an Ostwald viscometer.',
    principle: `Viscosity is a fundamental transport property that measures a fluid's internal resistance to flow under an applied shear stress.

For laminar flow of a Newtonian fluid through a narrow capillary of radius r and length l, the volumetric flow rate is governed by Poiseuille’s Law:
V = (π · P · r⁴ · t) / (8 · η · l)
Where:
- V = Volume of liquid passing through capillary in time t
- P = Hydrostatic driving pressure = h · ρ · g (where h is mean liquid head, ρ is density, g is gravitational acceleration)
- η = Coefficient of dynamic viscosity (Pa·s or Poise; 1 cP = 1 mPa·s = 10⁻³ Pa·s)

Relative Viscosity via Ostwald Viscometer:
For a fixed viscometer geometry, the dimensions r, l, V, and mean height h are identical for both test liquid and reference water:
η₁ = (π · h · ρ₁ · g · r⁴ · t₁) / (8 · V · l)
η₂ = (π · h · ρ₂ · g · r⁴ · t₂) / (8 · V · l)

Dividing the two equations eliminates geometric constants, yielding the relative viscosity relationship:
η_liquid / η_water = (ρ_liquid · t_liquid) / (ρ_water · t_water)

Where η_water at 25°C = 0.8904 cP (0.8904 mPa·s) and ρ_water = 0.9970 g/cm³.`,
    apparatus: [
      'Ostwald Viscometer (capillary diameter ~0.5 mm, with upper mark A and lower mark B)',
      'Specific Gravity Bottle (Pycnometer, 25 mL capacity with thermometer stopper)',
      'Digital Stopwatch (resolution 0.01 seconds)',
      'Constant-Temperature Water Bath maintained at 25.0 ± 0.1°C',
      'Analytical Balance (0.1 mg precision)',
      'Retort Stand with precision vertical leveling clamp',
      'Suction rubber bulb and Chromic acid cleaning solution',
    ],
    chemicals: [
      'Pure deionized reference water',
      'Test organic liquid (Ethanol or 20% v/v Glycerol aqueous solution)',
      'Acetone (for rapid drying of viscometer capillary)',
    ],
    diagramType: 'ostwald-viscometer',
    procedureSteps: [
      {
        step: 1,
        title: 'Viscometer Cleaning & Clamping',
        instruction: 'Clean the Ostwald viscometer thoroughly with warm chromic acid solution, rinse copiously with deionized water, and dry by flushing with acetone. Clamp the viscometer strictly vertically in the 25.0°C water bath (vertical alignment is critical; any tilt alters the hydrostatic head h).',
      },
      {
        step: 2,
        title: 'Charging the Viscometer',
        instruction: 'Pipette an exact, reproducible volume (e.g. 10.0 mL) of deionized water into the broad reservoir arm (bulb C). Allow 10 minutes for thermal equilibration with the water bath at 25.0°C.',
      },
      {
        step: 3,
        title: 'Reference Water Flow Time Measurement',
        instruction: 'Attach a rubber tube to the narrow capillary arm. Gently aspirate water until the meniscus rises ~5 mm above the upper fiducial mark A. Release suction and allow water to flow freely down under gravity. Start the stopwatch the moment the bottom of the meniscus crosses mark A, and stop it when it crosses lower mark B. Record efflux time t_w. Repeat 3 times (must agree within ±0.2 s).',
      },
      {
        step: 4,
        title: 'Test Liquid Flow Time Measurement',
        instruction: 'Drain the viscometer, rinse with small aliquots of the test liquid, and dry. Charge with the exact same volume (10.0 mL) of the test liquid. Equilibrate at 25°C. Measure the efflux time t_l from mark A to mark B in triplicate. Calculate mean time.',
      },
      {
        step: 5,
        title: 'Density Determination by Pycnometer',
        instruction: 'Weigh clean, dry 25 mL pycnometer (w₁). Fill with deionized water at 25°C and weigh (w₂). Empty, dry, fill with test liquid at 25°C and weigh (w₃). Calculate densities: ρ_water = (w₂ - w₁)/V and ρ_liquid = (w₃ - w₁)/V.',
      },
      {
        step: 6,
        title: 'Viscosity Calculation',
        instruction: 'Calculate the relative viscosity (η_rel) and absolute viscosity (η_liquid) in centipoise (cP) and mPa·s using Poiseuille’s ratio formula.',
      },
    ],
    observationTable: {
      headers: ['Liquid Sample', 'Trial 1 Time (s)', 'Trial 2 Time (s)', 'Trial 3 Time (s)', 'Mean Flow Time (t, s)', 'Density ρ (g/cm³ at 25°C)'],
      sampleRows: [
        ['Deionized Water (Reference)', '62.40', '62.20', '62.30', '62.30', '0.9970'],
        ['Test Liquid (Ethanol solution)', '118.50', '118.80', '118.20', '118.50', '0.8845'],
      ],
      concordantValue: 't_water = 62.30 s, t_liquid = 118.50 s',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Measured at 25.0°C.',
    },
    formulae: [
      {
        name: 'Relative Viscosity (η_rel)',
        formula: 'η_rel = (ρ_liquid · t_liquid) / (ρ_water · t_water)',
        variables: 'ρ_l = 0.8845 g/cm³, t_l = 118.50 s, ρ_w = 0.9970 g/cm³, t_w = 62.30 s',
      },
      {
        name: 'Absolute Viscosity (η_liquid)',
        formula: 'η_liquid = η_rel · η_water',
        variables: 'η_water at 25°C = 0.8904 cP (0.8904 mPa·s)',
      },
    ],
    calculations: [
      'η_rel = (0.8845 g/cm³ × 118.50 s) / (0.9970 g/cm³ × 62.30 s) = 104.813 / 62.113 = 1.6874',
      'η_liquid = 1.6874 × 0.8904 cP = 1.5025 cP = 1.503 mPa·s = 1.503 × 10⁻³ Pa·s',
    ],
    result: {
      summary: 'The dynamic viscosity of the test liquid was determined at 25°C using an Ostwald viscometer.',
      values: [
        { label: 'Relative Viscosity (η_rel)', value: '1.687 (dimensionless)' },
        { label: 'Absolute Viscosity (η)', value: '1.503 cP (1.503 mPa·s or 1.503 × 10⁻³ Pa·s)' },
        { label: 'Density of Liquid', value: '0.8845 g/cm³' },
      ],
      interpretation: 'The higher viscosity of the ethanol solution compared to pure water arises from extensive intermolecular hydrogen bonding and steric entanglement in the mixed solvent system.',
    },
    safetyPrecautions: [
      'Ostwald viscometers are crafted from precision capillary glass; handle with extreme care to prevent breakage, especially at the U-bend.',
      'Never suck volatile organic liquids into the viscometer using your mouth; always use a rubber suction pipette bulb.',
      'Ensure the capillary is free of microscopic dust or fibers; a single particulate caught in the narrow bore causes severe timing errors.',
    ],
    quiz: [
      {
        id: 'vis-q1',
        question: 'Why must the exact same volume of liquid be pipetted into the viscometer for both water and test liquid runs?',
        options: [
          'To ensure the initial hydrostatic liquid head (height h) and driving pressure are identical in both measurements',
          'Because the viscometer has only 10 mL total capacity',
          'To prevent the water bath from overflowing',
          'Because density increases if volume changes',
        ],
        correctAnswer: 0,
        explanation: 'The hydrostatic pressure driving fluid through the capillary depends directly on the difference in liquid heights between the two arms (P = h·ρ·g). Using identical volumes ensures h is constant and cancels out mathematically in the relative viscosity ratio.',
      },
      {
        id: 'vis-q2',
        question: 'How does the viscosity of a liquid typically change as temperature increases?',
        options: [
          'Viscosity decreases exponentially as thermal kinetic energy weakens intermolecular cohesive forces',
          'Viscosity increases linearly',
          'Viscosity remains completely constant',
          'Viscosity drops instantly to zero at 50°C',
        ],
        correctAnswer: 0,
        explanation: 'In liquids, viscosity is dictated by intermolecular attraction forces (hydrogen bonding, van der Waals). Increasing temperature supplies thermal kinetic energy that overcomes these cohesive forces, allowing molecules to slip past one another more readily (described by the Andrade equation η = A·e^(E/RT)).',
      },
      {
        id: 'vis-q3',
        question: 'What is the relationship between the CGS unit centipoise (cP) and the SI unit millipascal-second (mPa·s)?',
        options: [
          '1 cP = 1 mPa·s exactly',
          '1 cP = 1000 mPa·s',
          '1 cP = 0.001 mPa·s',
          'They measure completely different physical quantities',
        ],
        correctAnswer: 0,
        explanation: '1 Poise = 0.1 Pa·s = 100 mPa·s. Therefore, 1 centipoise (1 cP = 0.01 Poise) equals exactly 0.001 Pa·s = 1 mPa·s.',
      },
    ],
  },
  {
    id: 'beer-lambert-law',
    number: 14,
    title: 'Beer–Lambert Law',
    category: 'instrumental',
    categoryLabel: 'Instrumental Chemistry',
    duration: '50 mins',
    difficulty: 'Intermediate',
    icon: '',
    aim: 'To verify the Beer–Lambert Law across a concentration series of Copper Sulphate (or Potassium Permanganate) solutions and determine the molar absorptivity (ε) and concentration of an unknown test solution using a UV-Visible Spectrophotometer.',
    principle: `The Beer–Lambert Law combines two fundamental optical absorption laws:
1. Lambert's Law: The fraction of monochromatic light absorbed by a homogeneous medium is proportional to the optical path length (l), independent of incident light intensity.
2. Beer's Law: The fraction of monochromatic light absorbed is directly proportional to the molar concentration (c) of absorbing species.

Combined Formulation:
I = I₀ · 10^(-ε · c · l)

Taking the negative logarithm:
Absorbance (A) = -log₁₀(I / I₀) = log₁₀(I₀ / I) = -log₁₀(T) = 2 - log₁₀(%T)
A = ε · c · l

Where:
- A = Absorbance (Optical Density, dimensionless)
- I₀ = Incident light intensity through solvent blank
- I = Transmitted light intensity through sample solution
- T = Transmittance (I / I₀) and %T = (I / I₀) × 100
- ε = Molar absorptivity (molar extinction coefficient, L·mol⁻¹·cm⁻¹ or M⁻¹·cm⁻¹), a constant characteristic of the absorbing chromophore at a specific wavelength
- c = Molar concentration of analyte (mol/L or M)
- l = Optical path length through the cuvette (standard 1.00 cm)

According to the law, a plot of Absorbance (A, y-axis) versus Concentration (c, x-axis) yields a straight line passing through the origin with slope = ε · l.`,
    apparatus: [
      'UV-Visible Spectrophotometer / Digital Colorimeter (wavelength range 340–1000 nm, 1 nm accuracy)',
      'Matched Optical Glass Cuvettes (1.00 cm path length, optical face transmission matched within ±0.005 A)',
      'Volumetric Flasks (50.0 mL Class A, 5 units)',
      'Graduated Pipettes (1.0 mL, 5.0 mL, 10.0 mL) with safety filler',
      'Lint-free optical lens cleaning paper',
    ],
    chemicals: [
      'Analytical stock solution of Copper Sulphate pentahydrate [0.100 M CuSO₄·5H₂O in 0.05 M H₂SO₄ to prevent hydrolysis]',
      'Unknown Copper Sulphate test solution',
      'Deionized water (reagent optical blank)',
    ],
    diagramType: 'spectrophotometer-optics',
    procedureSteps: [
      {
        step: 1,
        title: 'Wavelength Selection (λ_max Determination)',
        instruction: 'Turn on the spectrophotometer and allow 20 minutes warm-up for the tungsten-halogen lamp. Copper(II) aqua-complex [Cu(H₂O)₆]²⁺ exhibits a broad d-d transition absorption maximum at λ_max = 620 nm (or 810 nm in NIR; colorimeter red filter ~620–640 nm). Set monochromator wavelength to 620 nm.',
      },
      {
        step: 2,
        title: 'Preparation of Standard Calibration Series',
        instruction: 'From the standard 0.100 M CuSO₄ stock solution, pipette 2.0, 4.0, 6.0, 8.0, and 10.0 mL into five separate 50.0 mL volumetric flasks. Dilute each to the mark with deionized water and invert 10 times. This yields standards of 0.004 M, 0.008 M, 0.012 M, 0.016 M, and 0.020 M.',
      },
      {
        step: 3,
        title: 'Blank Calibration (Zeroing the Instrument)',
        instruction: 'Rinse a clean cuvette with deionized water, fill ~3/4 full, and wipe the optical clear faces with optical lens paper. Insert into the sample holder ensuring the clear faces align with the optical light beam. Close the sample lid and press "ZERO / AUTO-ZERO" to set Absorbance = 0.000 (%T = 100.0%).',
      },
      {
        step: 4,
        title: 'Standard Absorbance Measurements',
        instruction: 'Rinse the second matched cuvette with the lowest concentration standard (0.004 M), fill, wipe faces, and place in the cell holder. Record Absorbance (A). Repeat sequentially for all standard solutions from lowest to highest concentration, re-checking the blank between readings.',
      },
      {
        step: 5,
        title: 'Unknown Sample Measurement',
        instruction: 'Rinse the cuvette with the unknown CuSO₄ test solution, insert into the holder, and record its absorbance A_unknown.',
      },
      {
        step: 6,
        title: 'Calibration Graph & Unknown Determination',
        instruction: 'Plot Absorbance A (y-axis) against Concentration c (x-axis, M). Perform linear regression: A = m·c. Verify linearity (R² ≥ 0.998). Interpolate or calculate c_unknown = A_unknown / slope.',
      },
    ],
    observationTable: {
      headers: ['Standard Flask No.', 'Volume of 0.1 M Stock (mL)', 'Concentration c (mol/L)', 'Transmittance (%T)', 'Absorbance A (Measured)', 'Calculated ε (L·mol⁻¹·cm⁻¹)'],
      sampleRows: [
        ['Blank', '0.00', '0.0000', '100.0%', '0.000', '—'],
        ['Std 1', '2.00', '0.0040', '88.3%', '0.054', '13.50'],
        ['Std 2', '4.00', '0.0080', '78.0%', '0.108', '13.50'],
        ['Std 3', '6.00', '0.0120', '68.9%', '0.162', '13.50'],
        ['Std 4', '8.00', '0.0160', '60.8%', '0.216', '13.50'],
        ['Std 5', '10.00', '0.0200', '53.7%', '0.270', '13.50'],
        ['Unknown Sample', '—', 'c_unknown', '64.9%', '0.188', '—'],
      ],
      concordantValue: 'Slope (ε·l) = 13.50 L·mol⁻¹·cm⁻¹, R² = 0.9999',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Wavelength λ = 620 nm, path length l = 1.00 cm.',
    },
    formulae: [
      {
        name: 'Beer–Lambert Equation',
        formula: 'A = ε · c · l  =>  c = A / (ε · l)',
        variables: 'A = Absorbance, ε = Molar absorptivity, c = Molar concentration, l = 1.00 cm',
      },
      {
        name: 'Absorbance from Transmittance',
        formula: 'A = 2 - log₁₀(%T) = -log₁₀(T)',
        variables: '%T = Percentage transmittance (0–100%)',
      },
    ],
    calculations: [
      'Slope of calibration curve m = ΔA / Δc = (0.270 - 0.054) / (0.0200 - 0.0040) = 0.216 / 0.0160 = 13.50 L·mol⁻¹·cm⁻¹',
      'Since path length l = 1.00 cm, Molar Absorptivity ε = 13.50 L·mol⁻¹·cm⁻¹ at 620 nm',
      'For Unknown Sample with A = 0.188:',
      'c_unknown = A_unknown / slope = 0.188 / 13.50 = 0.01393 M (mol/L)',
      'Strength of Unknown = 0.01393 mol/L × 249.68 g/mol (CuSO₄·5H₂O) = 3.478 g/L',
    ],
    result: {
      summary: 'The Beer–Lambert Law was verified with excellent linearity, and the unknown solution was quantified.',
      values: [
        { label: 'Correlation Coefficient (R²)', value: '0.9999 (Confirms ideal Beer–Lambert linearity)' },
        { label: 'Molar Absorptivity (ε)', value: '13.50 L·mol⁻¹·cm⁻¹ at 620 nm' },
        { label: 'Unknown Concentration', value: '0.0139 M (Strength = 3.48 g/L CuSO₄·5H₂O)' },
      ],
      interpretation: 'Absorbance displays a direct proportional relationship with concentration (A ∝ c) over the examined range. Deviations occur only at very high concentrations (> 0.1 M) due to electrostatic inter-ionic interactions.',
    },
    safetyPrecautions: [
      'Handle optical cuvettes ONLY by their grooved / frosted sidewalls. Never touch optical clear faces with fingers as skin oils absorb UV-Vis radiation.',
      'Always wipe the outside of cuvettes with soft optical lens paper before inserting into the spectrophotometer sample compartment.',
      'Copper sulphate is toxic to aquatic organisms and causes eye irritation. Dispose of copper waste in designated heavy metal disposal bottles.',
    ],
    quiz: [
      {
        id: 'blr-q1',
        question: 'What is the relationship between Absorbance (A) and Percentage Transmittance (%T)?',
        options: [
          'A = 2 - log₁₀(%T)',
          'A = log₁₀(%T) / 2',
          'A = 100 - %T',
          'A = %T / 100',
        ],
        correctAnswer: 0,
        explanation: 'Transmittance T = I / I₀ = %T / 100. Absorbance A = -log₁₀(T) = -log₁₀(%T / 100) = -(log₁₀%T - log₁₀100) = -(log₁₀%T - 2) = 2 - log₁₀(%T).',
      },
      {
        id: 'blr-q2',
        question: 'What causes chemical deviations from Beer–Lambert linearity at high solute concentrations (> 0.05–0.1 M)?',
        options: [
          'Inter-ionic electrostatic interactions alter the charge distribution and molar absorptivity ε of the chromophore',
          'The cuvette glass dissolves',
          'The light bulb runs out of photons',
          'The wavelength changes automatically',
        ],
        correctAnswer: 0,
        explanation: 'At high solute concentrations, close proximity between absorbing ions/molecules induces electrostatic perturbation of electron cloud energy levels, altering the molar absorptivity ε and causing negative curvature.',
      },
      {
        id: 'blr-q3',
        question: 'Why should measurements be conducted at the wavelength of maximum absorbance (λ_max)?',
        options: [
          'Because sensitivity is highest and small wavelength calibration errors cause negligible change in absorbance (flat slope)',
          'Because the instrument lamp is brightest at λ_max',
          'Because cuvettes are transparent only at λ_max',
          'Because absorbance drops to zero at λ_max',
        ],
        correctAnswer: 0,
        explanation: 'At λ_max, the rate of change of absorbance with wavelength is zero (dA/dλ = 0, peak top). This maximizes analytical sensitivity and minimizes instrument wavelength calibration errors.',
      },
    ],
  },
  {
    id: 'qualitative-salt-analysis',
    number: 15,
    title: 'Qualitative Salt Analysis',
    category: 'qualitative',
    categoryLabel: 'Qualitative & Analytical Chemistry',
    duration: '60 mins',
    difficulty: 'Advanced',
    icon: '',
    aim: 'To perform systematic semi-micro qualitative inorganic analysis to identify the one cation and one anion present in an unknown simple inorganic salt sample.',
    principle: `Qualitative inorganic salt analysis involves the systematic identification of the constituent basic radical (cation) and acidic radical (anion) through sequential dry tests, group separation, and confirmatory wet chemical reactions.

1. Anion Classification:
- Dilute H₂SO₄ Group: Carbonate (CO₃²⁻, effervescence of CO₂), Sulphite (SO₃²⁻, pungent SO₂), Nitrite (NO₂⁻, brown NO₂), Sulphide (S²⁻, rotten egg H₂S).
- Concentrated H₂SO₄ Group: Chloride (Cl⁻, white pungent HCl fumes giving dense NH₄Cl smoke), Nitrate (NO₃⁻, brown NO₂ fumes accelerated by copper turnings), Bromide (Br⁻, reddish-brown Br₂), Iodide (I⁻, violet I₂).
- Independent Special Group: Sulphate (SO₄²⁻, white BaSO₄ insoluble in acids), Phosphate (PO₄³⁻, yellow ammonium phosphomolybdate precipitate).

2. Cation Classification & Group Separation:
Cations are separated into analytical groups based on differential solubility products (K_sp) using specific group reagents:
- Group 0 (NH₄⁺): No group reagent. Tested with Nessler’s reagent [K₂HgI₄] to yield brown precipitate of iodide of Millon's base.
- Group I (Pb²⁺): Group reagent dilute HCl. Forms insoluble white chloride precipitate: Pb²⁺ + 2Cl⁻ → PbCl₂↓ (soluble in boiling water, recrystallizes on cooling as glistening needles).
- Group II (Cu²⁺, As³⁺): Group reagent H₂S gas in 0.3 M HCl medium. Forms insoluble sulphides with very low K_sp (CuS black).
- Group III (Fe³⁺, Al³⁺): Group reagent NH₄Cl + NH₄OH (pH ~9). Forms insoluble hydroxides (Fe(OH)₃ reddish-brown, Al(OH)₃ gelatinous white).
- Group IV (Zn²⁺, Ni²⁺, Mn²⁺): Group reagent H₂S in alkaline ammoniacal medium.
- Group V (Ba²⁺, Sr²⁺, Ca²⁺): Group reagent (NH₄)₂CO₃ in presence of NH₄Cl + NH₄OH. Forms insoluble carbonates.
- Group VI (Mg²⁺): Disodium hydrogen phosphate gives white crystalline precipitate of Mg(NH₄)PO₄.`,
    apparatus: [
      'Semi-micro Test Tubes (12 × 75 mm and 15 × 125 mm, Pyrex glass, 12 units)',
      'Test Tube Rack, Wooden Holder, and Test Tube Brush',
      'Platinum Wire / Nichrome Wire Loop (sealed in glass rod for flame test)',
      'Porcelain Spot Plate and Watch Glass',
      'Micro-spatula, Droppers with rubber bulbs',
      'Bunsen Burner with gas control and blue non-luminous flame',
      'Boiling Water Bath and Centrifuge (optional for semi-micro separation)',
    ],
    chemicals: [
      'Unknown Inorganic Salt Sample (Lead Nitrate, Pb(NO₃)₂, white crystalline)',
      'Dilute Sulphuric Acid (2 M H₂SO₄) and Concentrated H₂SO₄ (18 M)',
      'Freshly prepared Ferrous Sulphate solution (FeSO₄·7H₂O, unoxidized green crystals)',
      'Dilute Hydrochloric Acid (2 M HCl) and Dilute Nitric Acid (2 M HNO₃)',
      'Potassium Chromate solution (5% K₂CrO₄) and Potassium Iodide solution (0.1 M KI)',
      'Copper metal turnings, Ammonium hydroxide (NH₄OH), Deionized water',
    ],
    diagramType: 'qualitative-salt-analysis',
    procedureSteps: [
      {
        step: 1,
        title: 'Physical Examination & Dry Heating',
        instruction: 'Record physical state (crystalline solid), color (pure white; rules out Fe³⁺, Cu²⁺, Ni²⁺), and odor (odorless; rules out NH₄⁺, S²⁻). Heat ~0.1 g of dry salt in a dry ignition tube: observe decrepitation (crackling noise), evolution of pungent reddish-brown fumes (NO₂), and yellow residue when hot, turning buff white on cooling (PbO).',
      },
      {
        step: 2,
        title: 'Flame Test',
        instruction: 'Clean a nichrome loop in concentrated HCl until it imparts no color to a non-luminous Bunsen flame. Moisten with conc. HCl, touch to salt powder, and introduce into the non-luminous blue flame zone. Observe a dull bluish-white flame characteristic of Lead (Pb²⁺).',
      },
      {
        step: 3,
        title: 'Anion Preliminary Identification',
        instruction: 'Add 1 mL of dilute H₂SO₄ to 0.1 g salt: no reaction (rules out carbonate, sulphite, sulphide). To a fresh sample, add 1 mL of concentrated H₂SO₄: upon warming, pale brown fumes evolve. Add copper turnings and heat: brown NO₂ gas evolves intensely, turning solution pale blue. Indicates Nitrate (NO₃⁻).',
      },
      {
        step: 4,
        title: 'Anion Confirmatory Test — Brown Ring Test',
        instruction: 'Prepare an aqueous extract of the salt in deionized water. Add 2 mL of freshly prepared saturated FeSO₄ solution and mix well. Incline the test tube at 45° and carefully add 1 mL of concentrated H₂SO₄ down the inner wall without shaking. A distinct, dark brown ring forms at the liquid-liquid junction.',
      },
      {
        step: 5,
        title: 'Preparation of Original Solution (O.S.) & Cation Group Separation',
        instruction: 'Dissolve 0.5 g of salt in ~15 mL of deionized water (dissolves readily to form clear, colorless Original Solution). To 2 mL of O.S., add 1 mL of dilute HCl: a heavy white crystalline precipitate forms, indicating Group I (Pb²⁺).',
      },
      {
        step: 6,
        title: 'Cation Confirmatory Tests for Lead (Pb²⁺)',
        instruction: 'Boil the white precipitate with deionized water: it dissolves completely. Divide into two portions: 1. To portion A, add potassium chromate (K₂CrO₄): brilliant yellow precipitate of lead chromate (PbCrO₄) forms. 2. To portion B, add potassium iodide (KI): bright yellow precipitate of lead iodide (PbI₂) forms, which dissolves on boiling and recrystallizes on cooling as sparkling golden spangles ("golden rain").',
      },
    ],
    observationTable: {
      headers: ['Experiment / Test Performed', 'Observation', 'Inference / Chemical Radical'],
      sampleRows: [
        ['Physical appearance', 'White crystalline solid, odorless', 'Absence of colored transition ions (Cu²⁺, Fe³⁺, Ni²⁺)'],
        ['Dry heating test in ignition tube', 'Decrepitation; reddish-brown fumes evolve; yellow residue PbO', 'Nitrate (NO₃⁻) and Lead (Pb²⁺) suspected'],
        ['Flame test with conc. HCl', 'Dull bluish-white flame', 'Lead (Pb²⁺) indicated'],
        ['Salt + Dilute H₂SO₄', 'No gas evolution or effervescence', 'Absence of Dil. H₂SO₄ group (CO₃²⁻, SO₃²⁻, S²⁻)'],
        ['Salt + Conc. H₂SO₄ + Cu turnings', 'Dense brown gas (NO₂) turning starch-iodide paper blue', 'Nitrate (NO₃⁻) indicated'],
        ['Brown Ring Test (O.S. + FeSO₄ + Conc. H₂SO₄)', 'Dark brown ring formed at junction of two liquids', 'Nitrate (NO₃⁻) confirmed'],
        ['O.S. + Dilute HCl (Group I test)', 'Dense white precipitate of PbCl₂ formed', 'Group I Cation (Pb²⁺) present'],
        ['White ppt + boiling water + K₂CrO₄', 'Bright yellow precipitate of PbCrO₄', 'Lead (Pb²⁺) confirmed'],
        ['White ppt + boiling water + KI', 'Bright yellow PbI₂; forms golden spangles on cooling', 'Lead (Pb²⁺) definitively confirmed'],
      ],
      concordantValue: 'Cation: Pb²⁺ (Group I), Anion: NO₃⁻',
      note: 'SAMPLE OBSERVATION DATA — FOR ILLUSTRATIVE PURPOSES ONLY. Semi-micro qualitative systematic analysis.',
    },
    formulae: [
      {
        name: 'Brown Ring Complex Chemical Reaction',
        formula: '2NO₃⁻ + 4H₂SO₄ + 6Fe²⁺ → 6Fe³⁺ + 2NO + 4SO₄²⁻ + 4H₂O\n[Fe(H₂O)₆]²⁺ + NO → [Fe(H₂O)₅(NO)]²⁺ (Brown Ring) + H₂O',
        variables: 'Pentaaquanitrosyliron(II) complex cation',
      },
      {
        name: 'Lead Confirmatory Precipitation Reactions',
        formula: 'Pb²⁺ + 2Cl⁻ → PbCl₂↓ (White)\nPb²⁺ + K₂CrO₄ → PbCrO₄↓ (Yellow) + 2K⁺\nPb²⁺ + 2KI → PbI₂↓ (Golden Yellow) + 2K⁺',
        variables: 'Characteristic selective precipitation',
      },
    ],
    calculations: [
      'Chemical Formula: Pb(NO₃)₂ (Lead(II) Nitrate)',
      'Cation: Pb²⁺ (Valency = +2, Lead ion, Group I)',
      'Anion: NO₃⁻ (Valency = -1, Nitrate radical, Conc. H₂SO₄ group)',
      'Stoichiometry: 1 Pb²⁺ : 2 NO₃⁻ => Molecular formula Pb(NO₃)₂',
    ],
    result: {
      summary: 'The systematic qualitative analysis of the inorganic salt sample was successfully completed.',
      values: [
        { label: 'Basic Radical (Cation)', value: 'Lead ion (Pb²⁺, Analytical Group I)' },
        { label: 'Acidic Radical (Anion)', value: 'Nitrate ion (NO₃⁻, Conc. H₂SO₄ group)' },
        { label: 'Identified Compound', value: 'Lead(II) Nitrate [Pb(NO₃)₂]' },
      ],
      interpretation: 'The unknown inorganic salt is Lead Nitrate [Pb(NO₃)₂], conclusively verified by the brown ring test for nitrate and chromate/iodide precipitation for lead.',
    },
    safetyPrecautions: [
      'Lead compounds are cumulative heavy metal toxins that affect the nervous system. Avoid all skin contact, do not ingest, and wash hands thoroughly after the experiment.',
      'Concentrated H₂SO₄ generates intense heat when added to water/extracts. Always pour acid gently down the tilted test tube wall; never add water into acid.',
      'Brown nitrogen dioxide (NO₂) fumes are toxic respiratory irritants. Perform copper turnings heating under a local fume exhaust.',
    ],
    quiz: [
      {
        id: 'salt-q1',
        question: 'What is the exact chemical composition of the "brown ring" formed in the confirmatory test for nitrate?',
        options: [
          '[Fe(H₂O)₅(NO)]SO₄ — Pentaaquanitrosyliron(II) sulphate',
          'Fe₂(SO₄)₃ — Ferric sulphate',
          'Fe(NO₃)₃ — Iron(III) nitrate',
          'NO₂ gas bubbles trapped in water',
        ],
        correctAnswer: 0,
        explanation: 'Ferrous ions reduce nitrate to nitric oxide (NO), which then coordinates with unreacted hydrated ferrous ions to form the brown coordination complex [Fe(H₂O)₅(NO)]²⁺ at the density interface between acid and aqueous layers.',
      },
      {
        id: 'salt-q2',
        question: 'Why does the white precipitate of PbCl₂ dissolve upon heating in water and reappear on cooling?',
        options: [
          'Because the solubility product of PbCl₂ increases dramatically with temperature (~3.3× increase from 20°C to 100°C)',
          'Because PbCl₂ evaporates into air when boiled',
          'Because lead decomposes into liquid mercury',
          'Because water reacts with PbCl₂ to form gaseous HCl',
        ],
        correctAnswer: 0,
        explanation: 'Lead(II) chloride has a high positive enthalpy of solution (endothermic dissolution). Its solubility jumps from 9.9 g/L at 20°C to 33.4 g/L at 100°C, causing it to dissolve in hot water and recrystallize as shiny needles upon cooling.',
      },
      {
        id: 'salt-q3',
        question: 'Why must freshly prepared FeSO₄ solution be used for the brown ring test?',
        options: [
          'Because atmospheric oxygen rapidly oxidizes Fe²⁺ (ferrous) to Fe³⁺ (ferric), which cannot form the brown nitrosyl complex',
          'Because old FeSO₄ turns into solid rock',
          'Because old FeSO₄ loses its water of crystallization',
          'Because FeSO₄ evaporates within 1 hour',
        ],
        correctAnswer: 0,
        explanation: 'Aqueous Fe²⁺ is readily oxidized by air to Fe³⁺ (giving yellow-brown basic ferric salts). Fe³⁺ cannot reduce nitrate to NO nor coordinate to form the [Fe(H₂O)₅(NO)]²⁺ complex, causing the test to fail.',
      },
    ],
  },
];
