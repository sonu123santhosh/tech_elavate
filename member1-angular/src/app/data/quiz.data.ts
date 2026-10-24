import { QuizQuestion } from '../models/quiz.model';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'When reading the volume of a colorless aqueous solution in a burette or measuring cylinder, which part of the liquid curve should align with the graduation line at eye level?',
    options: [
      'The highest point of the upper outer edges',
      'The lowest point (bottom) of the concave meniscus',
      'The exact geometric midpoint between top and bottom',
      'It does not matter as long as you are consistent across trials'
    ],
    correctAnswerIndex: 1,
    explanation: 'Aqueous solutions wet glass walls, forming a concave meniscus due to capillary adhesion. By scientific convention and calibration standards (ISO 385/4787), volumetric measurements are always recorded at the lowest point (bottom) of the concave curve at horizontal eye level.',
    category: 'measurement',
    difficulty: 'beginner'
  },
  {
    id: 2,
    question: 'Why must you remove the small filling funnel from the top of the burette prior to performing a titration?',
    options: [
      'The weight of the funnel alters the burette calibration temperature',
      'Residual droplets clinging to the funnel stem can slowly drip down into the titrant, causing erratic volume readings',
      'It blocks air pressure necessary for gravity drainage through the stopcock',
      'Funnels generate electrostatic charges that attract glass contaminants'
    ],
    correctAnswerIndex: 1,
    explanation: 'Leaving a funnel in place permits stray titrant droplets adhering to the funnel cone or stem to detach during the titration run, artificially adding unmeasured volume into the burette and invalidating precision calculations.',
    category: 'apparatus',
    difficulty: 'intermediate'
  },
  {
    id: 3,
    question: 'What is the critical initial step after filling a burette with titrant and before recording the initial volume?',
    options: [
      'Boil the burette gently to expel dissolved gases',
      'Shake the burette horizontally to ensure uniform density',
      'Open the stopcock rapidly to expel any trapped air bubble in the jet tip',
      'Add indicator drops directly down into the burette column'
    ],
    correctAnswerIndex: 2,
    explanation: 'Air pockets frequently get trapped in the constricted jet tip below the stopcock when filling. If not expelled before taking the initial reading, the bubble will dislodge during titration, counting as delivered titrant volume and causing a significant positive error.',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 4,
    question: 'When heating a chemical mixture inside a glass test tube over a Bunsen burner flame, what is the safest technique?',
    options: [
      'Hold the test tube completely vertical and stationary in the hottest blue flame cone',
      'Angle the test tube at 45°, point the open mouth away from everyone, and move it continuously through the flame',
      'Stopper the test tube tightly with a rubber bung to prevent hazardous vapor release',
      'Fill the test tube completely to the rim so no air pocket is present'
    ],
    correctAnswerIndex: 1,
    explanation: 'Holding the tube at 45° with the open mouth directed away from yourself and neighboring peers, combined with constant gentle movement, prevents localized boiling (known as "bumping"), which can explosively eject boiling corrosive liquid.',
    category: 'safety',
    difficulty: 'beginner'
  },
  {
    id: 5,
    question: 'Which piece of laboratory glassware is calibrated with the highest analytical precision for preparing exactly 250.0 mL of a primary standard molar solution?',
    options: [
      'A 250 mL Griffin Beaker',
      'A 250 mL Graduated Measuring Cylinder',
      'A 250 mL Erlenmeyer Conical Flask',
      'A 250 mL Class A Volumetric Flask'
    ],
    correctAnswerIndex: 3,
    explanation: 'Volumetric flasks are manufactured to rigorous Class A tolerances (e.g. ±0.15 mL for 250 mL), calibrated specifically "To Contain" (TC/In) at standard temperature. Beakers and conical flasks are reaction vessels whose markings have approximate errors of 5% to 10%.',
    category: 'apparatus',
    difficulty: 'intermediate'
  },
  {
    id: 6,
    question: 'What is the universally accepted safety rule when preparing a dilute aqueous solution from concentrated sulfuric or hydrochloric acid?',
    options: [
      'Always add acid slowly into water with continuous stirring (AA - Add Acid)',
      'Always add water quickly into concentrated acid to quench the reaction',
      'Mix both simultaneously in equal volumes using an airtight container',
      'It does not matter which is added first as long as ice is present'
    ],
    correctAnswerIndex: 0,
    explanation: 'The dissolution of concentrated acid is violently exothermic. Adding water to acid causes the initial drops of water to boil instantaneously, spraying concentrated acid into the air. Always add Acid into Water (remember: "A&W" or "Do what you oughta, add acid to the water").',
    category: 'safety',
    difficulty: 'beginner'
  },
  {
    id: 7,
    question: 'When delivering liquid using a Class A volumetric transfer pipette marked "TD" (To Deliver) or "Ex", what should you do with the small droplet remaining in the jet tip?',
    options: [
      'Blow it out vigorously using the pipette bulb mechanism',
      'Touch the pipette tip against the inner vessel wall and allow capillary retention (do NOT blow it out)',
      'Shake the pipette up and down until the drop falls into the flask',
      'Heat the glass tip gently with a match to evaporate the residue into the flask'
    ],
    correctAnswerIndex: 1,
    explanation: 'Class A volumetric transfer pipettes are calibrated to account for the specific liquid volume naturally retained in the tip due to surface tension. Touching the tip to the vessel wall finishes standard delivery; forcing this drop out causes an over-delivery error.',
    category: 'technique',
    difficulty: 'advanced'
  },
  {
    id: 8,
    question: 'Why should you never place a freshly heated crucible, beaker, or reagent bottle directly onto an analytical electronic balance pan?',
    options: [
      'It permanently demagnetizes the internal digital display',
      'Convection air currents and thermal buoyancy will cause erratic, fluctuating, and falsely low mass readings',
      'Analytical balances can only register weights of substances below 0°C',
      'The electronic balance automatically rejects items above room humidity'
    ],
    correctAnswerIndex: 1,
    explanation: 'Hot objects create warm rising convection air currents inside the draft chamber that push upward against the weighing pan, generating unstable and artificially light readings, while also risking thermal damage to the precision sensor.',
    category: 'measurement',
    difficulty: 'intermediate'
  },
  {
    id: 9,
    question: 'In an acid-base titration using phenolphthalein indicator, what observable physical change signifies the true stoichiometric endpoint?',
    options: [
      'The solution turns dark vibrant purple immediately upon adding the first drop',
      'The solution shifts from colorless to a persistent faint pale pink that lasts for at least 30 seconds',
      'The appearance of a dense white crystalline precipitate at the bottom',
      'The solution begins boiling vigorously and effervescing carbon dioxide gas'
    ],
    correctAnswerIndex: 1,
    explanation: 'Phenolphthalein transitions from colorless in acidic media to faint pink between pH 8.2 and 10.0. The optimal titration endpoint is reached when a single half-drop imparts a persistent faint pink blush that remains visible against a white background for 30 seconds.',
    category: 'technique',
    difficulty: 'beginner'
  },
  {
    id: 10,
    question: 'What is the purpose of pressing the "Tare" button on an electronic balance before adding a sample?',
    options: [
      'It switches the units from grams to ounces',
      'It resets the balance reading to zero, subtracting the mass of the weighing boat or container',
      'It initiates automatic factory recalibration against internal weights',
      'It locks the display so measurements cannot be overwritten'
    ],
    correctAnswerIndex: 1,
    explanation: 'Taring the balance zeroes the readout with the empty weighing container (boat, watch glass, or beaker) on the pan, allowing direct measurement of only the net chemical sample mass added subsequently.',
    category: 'measurement',
    difficulty: 'beginner'
  },
  {
    id: 11,
    question: 'Why is an Erlenmeyer (conical) flask preferred over a cylindrical beaker as the receiving vessel during titrations?',
    options: [
      'The tapered sloping walls prevent splashing and allow vigorous circular swirling without losing sample droplets',
      'Conical flasks have more accurate volumetric graduations than beakers',
      'The narrow neck allows a thermometer to be held tightly in place during reactions',
      'Erlenmeyer flasks are transparent to ultraviolet light for indicator activation'
    ],
    correctAnswerIndex: 0,
    explanation: 'The conical geometry and narrow neck allow continuous swirling of the analyte solution as titrant drops fall from the burette, preventing droplets from splashing out of the vessel.',
    category: 'apparatus',
    difficulty: 'beginner'
  },
  {
    id: 12,
    question: 'What type of paper must be used to clean delicate optical microscope lenses and objectives?',
    options: [
      'Standard brown laboratory paper towels',
      'Cotton fabric handkerchief or lab coat cuff',
      'Specialized lint-free optical lens tissue paper',
      'Coarse sandpaper to strip away bacterial biofilm'
    ],
    correctAnswerIndex: 2,
    explanation: 'Microscope lenses have anti-reflective optical coatings and precision ground glass. Standard tissues, paper towels, and fabrics contain abrasive wood fibers or dust that permanently scratch optical surfaces. Only lint-free lens paper (with isopropanol if specified) should be used.',
    category: 'safety',
    difficulty: 'beginner'
  }
];
