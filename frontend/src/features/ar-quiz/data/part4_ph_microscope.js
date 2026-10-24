/**
 * Part 4: pH Measurement Instruments & Microscope (Items 61–63)
 * All items contain exact official names, main uses, operating instructions,
 * handling guidance, safety precautions, and 5 curated quiz questions.
 *
 * CRITICAL REQUIREMENT: Laboratory pH Meter (Item 61) and Digital / Portable pH Meter (Item 62)
 * are maintained as separate, distinct database entries.
 */

export const PART4_EQUIPMENT = [
  {
    id: 'laboratory-ph-meter',
    number: 61,
    name: 'Laboratory pH Meter',
    category: 'ph-instruments',
    mainUse: 'Measuring solution pH using an electrode.',
    operatingInstructions: [
      'Power on benchtop meter and allow electronics to stabilize for 10 minutes.',
      'Rinse the combined glass electrode thoroughly with deionized water; blot gently with lint-free tissue (never rub glass bulb).',
      'Perform standard two-point calibration using standard pH 7.00 buffer and pH 4.01 (or pH 10.01) buffer with automatic temperature compensation (ATC) enabled.',
      'Submerge electrode into test solution, ensuring the delicate pH bulb and porous reference liquid junction are completely immersed.',
      'Stir gently (manual or low-speed magnetic stir bar) and wait for the stability indicator before recording pH to two decimal places.',
      'Rinse electrode with deionized water and store immediately in 3M KCl electrode storage solution.',
    ],
    handlingGuidance: [
      'Never allow the glass electrode to dry out; store in 3M KCl or designated pH 4 buffer storage cap.',
      'Never store electrodes in pure deionized water (leaches reference ions out through the porous junction).',
    ],
    safetyPrecautions: [
      'Handle delicate glass bulb with extreme care; thin hydrated gel layer is fragile and breaks easily if struck by stir bar.',
      'Wear safety goggles when calibrating with buffer standards and measuring caustic acids or alkalis.',
    ],
    quiz: [
      {
        id: 'laboratory-ph-meter-q1',
        question: 'What is the primary scientific function of a benchtop Laboratory pH Meter?',
        options: [
          'Measuring hydrogen ion activity (-log[H⁺]) in aqueous solutions with high precision (±0.01 pH) using a glass combined electrode',
          'Measuring the boiling point elevation of volatile organic hydrocarbons',
          'Separating pigments using thin-layer chromatography',
          'Measuring the total hardness of solid steel specimens',
        ],
        correctAnswer: 0,
        explanation: 'A benchtop pH meter measures millivolt potentials across a thin glass membrane to report hydrogen ion activity (pH) with high accuracy.',
      },
      {
        id: 'laboratory-ph-meter-q2',
        question: 'Why should the glass bulb of a pH electrode NEVER be wiped or rubbed vigorously with abrasive paper towels?',
        options: [
          'Rubbing scratches the thin hydrated gel layer and induces static electrical charges that cause severe measurement drift',
          'Rubbing converts the glass into pure carbon diamond',
          'Rubbing causes the electrode to discharge high-voltage lightning',
          'Rubbing makes the buffer turn into solid ice',
        ],
        correctAnswer: 0,
        explanation: 'The glass bulb relies on a microscopic hydrated gel layer; rubbing creates static charges and damages the sensitive membrane.',
      },
      {
        id: 'laboratory-ph-meter-q3',
        question: 'What is the proper chemical solution for long-term storage of a laboratory glass pH electrode?',
        options: [
          '3 Molar Potassium Chloride (3M KCl) solution or dedicated commercial electrode storage solution',
          'Pure distilled or deionized water',
          'Concentrated hydrochloric acid (12 M HCl)',
          'Dry open air inside a sunny cardboard drawer',
        ],
        correctAnswer: 0,
        explanation: 'Storing in 3M KCl maintains electrolyte equilibrium across the reference junction; pure water leaches electrolyte ions out.',
      },
      {
        id: 'laboratory-ph-meter-q4',
        question: 'What standard calibration procedure is required before conducting an analytical pH titration?',
        options: [
          'Two-point calibration using standard reference buffers (pH 7.00 and pH 4.01 or pH 10.01) spanning the expected experimental range',
          'Boiling the electrode in pure water for 30 minutes',
          'Dipping the electrode into concentrated nitric acid once',
          'Placing the meter in direct sunlight for one hour',
        ],
        correctAnswer: 0,
        explanation: 'Calibration establishes the Nernstian slope (mV per pH unit) and zero-potential offset, ensuring accurate measurement.',
      },
      {
        id: 'laboratory-ph-meter-q5',
        question: 'What role does Automatic Temperature Compensation (ATC) play in a laboratory pH meter?',
        options: [
          'It mathematically adjusts the Nernst equation slope (-2.303 RT/F) for the exact solution temperature measured by the sensor',
          'It heats or cools the beaker to exactly 25.0°C automatically',
          'It converts basic solutions into neutral water',
          'It calculates the room air conditioner efficiency',
        ],
        correctAnswer: 0,
        explanation: 'The Nernst potential is directly temperature-dependent (T in Kelvin); ATC compensates the conversion slope for current temperature.',
      },
    ],
  },
  {
    id: 'digital-portable-ph-meter',
    number: 62,
    name: 'Digital / Portable pH Meter',
    category: 'ph-instruments',
    mainUse: 'Portable electronic measurement of solution pH.',
    operatingInstructions: [
      'Remove protective storage cap containing moistening sponge/KCl.',
      'Power on the compact handheld or pocket pen-type digital meter.',
      'Rinse electrode tip with deionized water from a wash bottle; blot gently.',
      'Dip sensor into sample solution in field or beaker; swirl gently to ensure good contact.',
      'Read stabilized digital LCD display; note temperature and pH value.',
      'Rinse probe thoroughly, add a few drops of storage solution to the cap, and recap firmly before transporting.',
    ],
    handlingGuidance: [
      'Designed for field testing, environmental streams, water treatment, and quick bench checks.',
      'Ensure battery is charged or replaced before taking into the field.',
    ],
    safetyPrecautions: [
      'Do not submerge the meter casing beyond the maximum immersion line (unless rated fully submersible IP67).',
      'Always replace the protective cap with storage fluid so the glass sensor never dries out in transit.',
    ],
    quiz: [
      {
        id: 'digital-portable-ph-meter-q1',
        question: 'What is the primary role of a Digital / Portable (pocket/handheld) pH Meter?',
        options: [
          'Enabling on-site, rapid electronic pH measurement in the field, environmental streams, water plants, and mobile lab benches',
          'Heating reaction solutions under magnetic stirring in the field',
          'Measuring the refractive index of organic solvents under vacuum',
          'Centrifuging soil samples at 10,000 RPM',
        ],
        correctAnswer: 0,
        explanation: 'Portable pH meters provide battery-operated, compact electronic measurement for rapid field and bench testing.',
      },
      {
        id: 'digital-portable-ph-meter-q2',
        question: 'How does a Digital / Portable pH meter differ fundamentally from a benchtop Laboratory pH meter in construction?',
        options: [
          'It features a compact, battery-powered integrated handheld body designed for mobility, rather than a stationary AC-powered bench chassis',
          'It does not measure hydrogen ions',
          'It only operates when submerged in boiling oil',
          'It is made entirely of carved wood',
        ],
        correctAnswer: 0,
        explanation: 'Portable units are integrated, ruggedized, battery-operated meters optimized for portability rather than stationary multi-electrode setups.',
      },
      {
        id: 'digital-portable-ph-meter-q3',
        question: 'Why must the protective cap of a portable pocket pH meter contain a few drops of 3M KCl or buffer solution during storage?',
        options: [
          'To prevent the sensitive glass electrode and reference junction from drying out and losing electrochemical response',
          'To keep the battery charged through chemical osmosis',
          'To prevent the plastic casing from melting in air',
          'To turn the sensor tip into metallic platinum',
        ],
        correctAnswer: 0,
        explanation: 'If the hydrated gel layer on the glass bulb dries out, the electrode responds sluggishly and can be permanently damaged.',
      },
      {
        id: 'digital-portable-ph-meter-q4',
        question: 'When dipping a portable pen-style pH meter into an environmental stream or beaker, how deep should it be submerged?',
        options: [
          'Only deep enough to cover the electrode glass bulb and reference junction, below the marked maximum immersion line',
          'Completely submerged to the bottom of the lake, including the battery cap and buttons',
          'Only the plastic lanyard cord should touch the water',
          'Held 20 centimeters above the surface without touching the water',
        ],
        correctAnswer: 0,
        explanation: 'Only the probe sensor is meant for liquid immersion; submerging battery compartments or unsealed electronics causes water damage.',
      },
      {
        id: 'digital-portable-ph-meter-q5',
        question: 'What should you do before taking a portable digital pH meter out into the field for water testing?',
        options: [
          'Check battery life, calibrate with fresh standard pH buffer solutions, and ensure storage cap fluid is present',
          'Boil the entire meter in vinegar for 2 hours',
          'Freeze the meter overnight in a home freezer',
          'Remove the glass electrode bulb with pliers',
        ],
        correctAnswer: 0,
        explanation: 'Pre-trip calibration and battery verification ensure reliable, accurate measurements at remote sampling locations.',
      },
    ],
  },
  {
    id: 'microscope',
    number: 63,
    name: 'Microscope',
    category: 'accessories',
    mainUse: 'Magnifying small objects and specimens for observation.',
    operatingInstructions: [
      'Carry with two hands: one grasping the curved arm, the other supporting the flat heavy base.',
      'Place on a level bench, plug into grounded power, and turn on the substage illuminator lamp.',
      'Rotate the revolving nosepiece to click the lowest-power objective lens (4x or 10x) into place.',
      'Place prepared glass specimen slide on stage, securing under mechanical stage clips.',
      'Use coarse focus knob to bring stage up close to lens while watching from the side, then look through ocular eyepiece and focus downward.',
      'Use fine focus knob to sharpen image resolution; adjust iris diaphragm to optimize optical contrast.',
      'When increasing to higher magnification (40x or 100x oil immersion), use ONLY the fine focus knob.',
    ],
    handlingGuidance: [
      'Clean optical glass lenses ONLY with special lint-free lens paper (never paper towels or lab coats).',
      'Wipe immersion oil off 100x lens immediately after use with lens cleaner.',
    ],
    safetyPrecautions: [
      'Never use the coarse focus knob while viewing through high-power objectives (40x or 100x) (will crush slide and crack expensive lens).',
      'Lower stage completely and return to lowest objective before removing slides or storing.',
    ],
    quiz: [
      {
        id: 'microscope-q1',
        question: 'What is the primary function of an optical compound laboratory microscope?',
        options: [
          'Magnifying microscopic objects, crystal structures, and biological specimens that cannot be resolved by the naked human eye',
          'Measuring the mass of subatomic particles',
          'Filtering bacteria out of drinking water through glass lenses',
          'Heating slides with high-energy laser beams',
        ],
        correctAnswer: 0,
        explanation: 'Compound microscopes combine objective and ocular lenses to achieve 40x to 1,000x visual magnification of micro-structures.',
      },
      {
        id: 'microscope-q2',
        question: 'What is the correct two-handed technique for carrying an optical laboratory microscope across the room?',
        options: [
          'One hand firmly gripping the curved metal arm and the other hand supporting the heavy bottom base',
          'Holding it by the stage clips with one hand',
          'Carrying it upside down by the electrical power cord',
          'Balancing it on top of your head',
        ],
        correctAnswer: 0,
        explanation: 'Two-handed support (arm and base) prevents drops and protects delicate internal optical prism alignments.',
      },
      {
        id: 'microscope-q3',
        question: 'Why should you NEVER use the COARSE focus adjustment knob when viewing through high-power objective lenses (40x or 100x)?',
        options: [
          'The short working distance means the heavy lens can easily crash into the glass slide, shattering the specimen and cracking the expensive lens',
          'The coarse knob reverses the microscope lighting system',
          'The lens will turn into an eyepiece',
          'It causes the microscope to lose all electrical power',
        ],
        correctAnswer: 0,
        explanation: 'High-power objectives hover fractions of a millimeter above the cover slip; only the fine focus knob provides safe micro-adjustments.',
      },
      {
        id: 'microscope-q4',
        question: 'If a microscope has a 10x ocular eyepiece and a 40x objective lens clicked into position, what is the total magnification?',
        options: [
          '400x magnification (10 × 40)',
          '50x magnification (10 + 40)',
          '4x magnification (40 ÷ 10)',
          '4,000x magnification',
        ],
        correctAnswer: 0,
        explanation: 'Total compound magnification is the mathematical product of the ocular lens power multiplied by the objective lens power (10 × 40 = 400x).',
      },
      {
        id: 'microscope-q5',
        question: 'What material should be used to clean dust, moisture, or immersion oil off delicate microscope optical lenses?',
        options: [
          'Dedicated optical lens paper with approved lens cleaning solution; never rough paper towels or clothing fabric',
          'A rough abrasive scouring pad',
          'A dirty cotton lab coat sleeve',
          'Sandpaper grit 200',
        ],
        correctAnswer: 0,
        explanation: 'Ordinary paper towels contain wood cellulose fibers that scratch anti-reflective optical lens coatings; specialized lens paper is non-abrasive.',
      },
    ],
  },
];
