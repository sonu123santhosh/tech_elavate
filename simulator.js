/**
 * Virtual Chemistry Lab — Interactive 2D Simulator & Playable Game Engine
 * Features:
 * 1. Step-gated playable game engine for 3 experiments:
 *    - Acid-Base Titration (assembly, bubble expulsion, indicator dispensing, stopcock valve titration, pale-pink endpoint, overshoot detection)
 *    - Filtration (paper seating, solvent moistening, slurry decantation, stirring rod guidance, overflow detection, filtrate drainage)
 *    - Paper Chromatography (pencil baseline vs pen ink mistake, sample spot, solvent depth check, capillary ascent, Rf ratio)
 * 2. Real-time apparatus inspector with live equipment.json lookups & equipmentRoles.json mappings.
 * 3. Mistake feedback alerts with star rating penalties (⭐⭐⭐), safe-path Hint (💡) and Skip (⏭) buttons.
 * 4. Full 2D SVG vector animations with pointer events, keyboard accessibility, and prefers-reduced-motion support.
 * 5. 3-question conceptual quiz per experiment with score summary and retry capabilities.
 */

// ==============================================================================
// EXPERIMENT DEFINITIONS & SCHEMAS (Matches data/experiments.json)
// ==============================================================================

const SIMULATOR_EXPERIMENTS = {
  "acid-base-titration": {
    "id": "acid-base-titration",
    "name": "Acid–Base Titration",
    "category": "Volumetric Analysis",
    "difficulty": "Intermediate",
    "objective": "Determine the unknown concentration of an acid or base solution by neutralizing it with a standard titrant in the presence of a visual indicator.",
    "principle": "Acid-base titration relies on a quantitative neutralization reaction between hydronium and hydroxide ions to form water. A standard solution of known concentration is delivered from a burette into an analyte of unknown concentration until the stoichiometric equivalence point is reached. A chemical indicator is selected whose color transition interval closely matches the equivalence point pH. The volume of titrant consumed at the endpoint allows calculation of the analyte concentration using stoichiometric mole ratios.",
    "equipment": [
      "burette", "pipette", "conical-flask", "retort-stand", "clamp-and-boss-head",
      "glass-funnel", "wash-bottle", "beaker", "dropper", "ph-indicator-solution",
      "safety-goggles", "laboratory-coat", "chemical-resistant-gloves", "chemical-waste-container"
    ],
    "procedure": [
      "Rinse the burette thoroughly with distilled water from a wash bottle, followed by a small portion of the standard titrant solution, and discard the rinse into chemical waste.",
      "Clamp the burette vertically to the retort stand using the clamp and boss head, then fill it with standard titrant through a glass funnel above the zero mark.",
      "Remove the funnel, place a waste beaker under the tip, and open the stopcock briefly to expel any trapped air bubble in the burette tip, then adjust the meniscus to the zero or initial graduation line at eye level.",
      "Rinse a volumetric pipette with a portion of the analyte solution, then accurately draw and transfer the specified aliquot into a clean conical flask.",
      "Add the prescribed number of drops of the appropriate pH indicator solution to the conical flask using a dropper and gently swirl the mixture.",
      "Record the initial burette reading to two decimal places, viewing the bottom of the meniscus at eye level.",
      "Add the titrant slowly into the conical flask while continuously swirling the flask with one hand and controlling the stopcock with the other.",
      "Slow the addition to drop-by-drop delivery as the transient color flashes take longer to dissipate, rinsing the inner walls of the flask with a minimal stream of distilled water.",
      "Stop titrant delivery immediately when a single drop produces a permanent color change throughout the solution that persists for at least 30 seconds.",
      "Record the final burette reading to two decimal places, calculate the titre volume by difference, and repeat the titration until concordant titres within 0.1 mL are obtained."
    ],
    "safety": [
      "Wear safety goggles, a laboratory coat, and chemical-resistant gloves at all times when handling corrosive acids and alkalis.",
      "Never pipette chemical solutions by mouth; always use a mechanical pipette filler or bulb.",
      "Fill the burette below eye level or lower the retort stand while pouring with a glass funnel to prevent chemical splashes to the face.",
      "In case of chemical contact with skin or eyes, flush immediately with copious amounts of running water for at least 15 minutes and seek assistance.",
      "Dispose of all neutralized titration mixtures and unused reagents into the designated chemical waste container."
    ],
    "quiz": [
      {
        "question": "Why must the air bubble in the burette tip be removed before recording the initial reading?",
        "options": [
          "An air bubble causes the indicator to change color prematurely.",
          "If the bubble dislodges during titration, its volume is counted as delivered titrant, introducing a positive error.",
          "The bubble prevents titrant from exiting the stopcock entirely.",
          "Air reacts chemically with the acid solution and alters its stoichiometric ratio."
        ],
        "correct_answer": "If the bubble dislodges during titration, its volume is counted as delivered titrant, introducing a positive error.",
        "explanation": "Air bubbles trapped below the stopcock occupy volume inside the tip. When liquid flows, the bubble escapes and the liquid drops, leading to an erroneously high calculated volume of delivered titrant."
      },
      {
        "question": "What is the primary difference between the equivalence point and the endpoint of a titration?",
        "options": [
          "The equivalence point occurs before titration begins, while the endpoint occurs after washing the burette.",
          "The equivalence point is the theoretical stoichiometric neutrality, while the endpoint is the experimentally observed signal, such as an indicator color change.",
          "The equivalence point requires an instrumental pH meter, whereas the endpoint can only be observed with litmus paper.",
          "The endpoint represents zero volume delivered, while the equivalence point is always at exactly 25.0 mL."
        ],
        "correct_answer": "The equivalence point is the theoretical stoichiometric neutrality, while the endpoint is the experimentally observed signal, such as an indicator color change.",
        "explanation": "The equivalence point is the exact point where chemically equivalent quantities of acid and base have reacted. The endpoint is the physical change (such as an indicator color change) observed by the analyst."
      },
      {
        "question": "How should the liquid level in a glass burette or pipette be read accurately?",
        "options": [
          "From the top edge of the liquid curvature from an angle above the line.",
          "At eye level with the horizontal plane aligned with the bottom of the curved meniscus for clear solutions.",
          "From whichever angle makes the volume reading match the anticipated theoretical value.",
          "By holding the burette up horizontally against bright sunlight."
        ],
        "correct_answer": "At eye level with the horizontal plane aligned with the bottom of the curved meniscus for clear solutions.",
        "explanation": "Aligning your eye horizontally with the bottom of the meniscus eliminates parallax error and provides consistent, accurate volumetric readings."
      }
    ]
  },

  "filtration": {
    "id": "filtration",
    "name": "Filtration",
    "category": "Separation and Purification",
    "difficulty": "Beginner",
    "objective": "Separate an insoluble solid precipitate from a liquid suspension using gravity filtration and suction filtration techniques.",
    "principle": "Filtration is a mechanical physical separation technique based on particle size discrimination through a porous barrier. In gravity filtration, hydrostatic head pressure drives the liquid phase (filtrate) through the pores of folded cellulose filter paper, while insoluble solid particles (residue) are retained on the paper cone. In vacuum or suction filtration, a reduced pressure generated below a porous ceramic plate inside a Büchner funnel accelerates the flow rate and yields a significantly drier solid cake. Quantitative separation requires washing the retained solid to remove adhering soluble impurities.",
    "equipment": [
      "glass-funnel", "filter-paper", "beaker", "conical-flask", "glass-stirring-rod",
      "wash-bottle", "retort-stand", "clamp-and-boss-head", "buchner-funnel",
      "safety-goggles", "laboratory-coat", "chemical-resistant-gloves"
    ],
    "procedure": [
      "Fold a circular sheet of filter paper in half, then into quarters, tear off an outer corner to ensure a tight seal, and open it into a conical pocket.",
      "Place the folded filter paper cone into a glass funnel supported in a ring clamp or funnel rack on the retort stand.",
      "Moisten the filter paper with a small jet of distilled water from a wash bottle and press the paper gently against the glass rim to seat it and eliminate air gaps.",
      "Position a clean receiving beaker or conical flask beneath the funnel stem, ensuring the bevel tip of the funnel touches the inner vessel wall to prevent splashing.",
      "Allow the suspension to settle, then hold a glass stirring rod across the lip of the beaker containing the mixture.",
      "Decant the supernatant liquid down the glass rod into the center of the filter cone without disturbing the sediment, never filling the cone more than two-thirds full.",
      "Swirl the remaining precipitate with a small volume of solvent and wash the solid slurry quantitatively into the filter paper cone.",
      "Rinse the precipitate retained on the filter paper with small portions of cold distilled water from the wash bottle to displace mother liquor.",
      "Allow all liquid to drain completely through the funnel stem under gravity until dripping stops.",
      "Examine the collected filtrate for clarity and retain the isolated solid residue on the filter paper for drying or subsequent analysis."
    ],
    "safety": [
      "Wear safety goggles, lab coat, and gloves to protect against liquid splashes and potential particulate contact.",
      "Never overfill the filter paper cone; liquid rising above the top edge will bypass the filter paper and contaminate the filtrate with solid particles.",
      "Ensure the glassware assembly is stable and securely clamped on the retort stand before pouring liquids.",
      "When using vacuum filtration, always inspect the thick-walled receiving flask for hairline cracks or stars before applying suction.",
      "Dispose of used filter paper and chemical precipitates into the approved solid chemical waste receptacle."
    ],
    "quiz": [
      {
        "question": "Why is the filter paper cone moistened with solvent before pouring the suspension?",
        "options": [
          "To chemically react with the paper fibers and expand the pore size.",
          "To adhere the paper firmly to the glass funnel walls and create an airtight hydraulic seal that prevents liquid bypass.",
          "To prevent the funnel from cracking due to sudden temperature shifts.",
          "To make the paper completely transparent so the precipitate is visible."
        ],
        "correct_answer": "To adhere the paper firmly to the glass funnel walls and create an airtight hydraulic seal that prevents liquid bypass.",
        "explanation": "Moistening the paper seats it smoothly against the funnel wall and fills the stem with liquid, establishing a continuous column of filtrate that exerts a gentle suction pulling liquid through."
      },
      {
        "question": "What is the primary function of pouring the liquid down a glass stirring rod during filtration?",
        "options": [
          "To cool the liquid down to room temperature during transfer.",
          "To direct the stream smoothly into the center of the filter cone without splashing or running down the exterior of the beaker.",
          "To electrically ground the glass beaker and prevent static discharge.",
          "To dissolve the solid precipitate before it reaches the paper."
        ],
        "correct_answer": "To direct the stream smoothly into the center of the filter cone without splashing or running down the exterior of the beaker.",
        "explanation": "Guiding liquid along a glass rod harnesses surface tension, preventing liquid from dribbling down the beaker's outer wall and targeting the stream directly into the filter cone without splashing."
      },
      {
        "question": "Why should the liquid level never rise above the top rim of the folded filter paper in the funnel?",
        "options": [
          "Liquid above the rim will overflow down the sides, allowing unfiltered solid to bypass the paper and contaminate the filtrate.",
          "The filter paper will dissolve instantly in contact with excessive liquid.",
          "High liquid levels cause the glass funnel to shatter from hydrostatic pressure.",
          "The liquid will evaporate before it can pass through the stem."
        ],
        "correct_answer": "Liquid above the rim will overflow down the sides, allowing unfiltered solid to bypass the paper and contaminate the filtrate.",
        "explanation": "If the suspension rises above the paper rim, unfiltered liquid flows between the paper and the glass wall directly into the stem, contaminating the collected filtrate with solid residue."
      }
    ]
  },

  "paper-chromatography": {
    "id": "paper-chromatography",
    "name": "Paper Chromatography",
    "category": "Separation and Purification",
    "difficulty": "Beginner",
    "objective": "Separate and identify components of a dye mixture or amino acid solution using ascending paper chromatography and determine retention factors (Rf).",
    "principle": "Paper chromatography is a planar separation method governed by partition chromatography principles between two phases. High-purity cellulose chromatography paper acts as a stationary support holding a stationary aqueous film bound to cellulose fibers. An organic solvent or solvent mixture ascends the paper strip by capillary action as the mobile phase. Components of the applied sample partition continuously between the stationary water layer and the moving organic phase according to their relative distribution coefficients. Substances with greater affinity for the mobile phase migrate faster, producing resolved spots characterized by a constant retention factor (Rf).",
    "equipment": [
      "filter-paper", "beaker", "watch-glass", "dropper", "forceps", "measuring-cylinder",
      "safety-goggles", "laboratory-coat", "chemical-resistant-gloves"
    ],
    "procedure": [
      "Cut a uniform strip of high-grade chromatography or filter paper, handling the edges exclusively with clean forceps or gloved hands to avoid finger grease contamination.",
      "Draw a faint horizontal origin baseline using a graphite pencil approximately 1.5 to 2.0 centimeters above the bottom edge of the paper strip.",
      "Apply a tiny concentrated drop of the sample solution onto the origin line using a fine capillary tube or dropper tip, and allow the spot to dry thoroughly.",
      "Re-apply the sample to the same spot if necessary to build up sufficient solute concentration while keeping the spot diameter under 2 to 3 millimeters.",
      "Pour the specified developing solvent into a clean glass beaker using a measuring cylinder to a depth of approximately 0.5 to 1.0 centimeter, ensuring the liquid level is well below the pencil origin line.",
      "Cover the beaker with a watch glass and allow the chamber to stand undisturbed for several minutes to achieve vapor-phase saturation.",
      "Suspend the prepared paper strip vertically into the beaker using a clip or resting against the rim, verifying that the bottom is submerged in solvent while the sample spot remains above the liquid level.",
      "Cover the beaker tightly with the watch glass and allow the mobile phase to ascend the paper undisturbed by capillary action.",
      "When the solvent front nears within 1 to 2 centimeters of the top edge of the paper strip, remove the strip using forceps.",
      "Immediately mark the solvent front line across the strip with a pencil before the volatile solvent evaporates, and allow the chromatogram to dry completely.",
      "Circle the centers of maximum density for each separated colored spot with a pencil and measure the migration distance of each spot and the solvent front from the origin line to calculate Rf values."
    ],
    "safety": [
      "Wear safety goggles, laboratory coat, and chemical-resistant gloves when handling organic chromatography solvents.",
      "Conduct the development inside a well-ventilated fume hood if volatile organic solvents (such as acetone, alcohols, or petroleum ether) are employed.",
      "Never mark the baseline with a ballpoint ink pen; inks contain organic dyes that will dissolve and migrate in the developing solvent.",
      "Do not inhale solvent vapors escaping from developing chambers.",
      "Dispose of used chromatography developing solvents into designated organic chemical waste receptacles."
    ],
    "quiz": [
      {
        "question": "Why must the origin baseline be drawn with a graphite pencil instead of an ink pen?",
        "options": [
          "Pencil graphite reacts chemically with the solvent to accelerate capillary climb.",
          "Ink contains soluble organic dyes that will dissolve in the mobile phase and separate, ruining the chromatogram.",
          "Pencil marks absorb ultraviolet light needed to see the spots.",
          "Ink burns through cellulose fibers when moistened with water."
        ],
        "correct_answer": "Ink contains soluble organic dyes that will dissolve in the mobile phase and separate, ruining the chromatogram.",
        "explanation": "Pen inks are mixtures of soluble dyes that dissolve in the developing solvent and migrate up the paper, obscuring the sample spots. Graphite is insoluble carbon that remains fixed at the origin."
      },
      {
        "question": "Why must the solvent level in the chromatography chamber remain below the pencil origin line where sample spots are placed?",
        "options": [
          "If the solvent covers the spots, the sample will dissolve directly into the bulk solvent reservoir rather than migrating up the paper.",
          "Excess solvent creates a siphon that empties the beaker.",
          "The paper will tear under the buoyant force of the solvent.",
          "High solvent levels cause the cellulose fibers to fuse together."
        ],
        "correct_answer": "If the solvent covers the spots, the sample will dissolve directly into the bulk solvent reservoir rather than migrating up the paper.",
        "explanation": "If the sample spots are submerged, they dissolve into the bottom solvent pool, washing away the analyte and leaving nothing to separate along the paper."
      },
      {
        "question": "How is the retention factor (Rf) calculated in paper chromatography?",
        "options": [
          "Rf = (Distance traveled by solvent front) / (Distance traveled by solute spot)",
          "Rf = (Distance traveled by solute spot from origin) / (Distance traveled by solvent front from origin)",
          "Rf = (Weight of chromatography paper) x (Concentration of sample)",
          "Rf = (Time taken for solvent to rise) / (Total volume of developing solvent)"
        ],
        "correct_answer": "Rf = (Distance traveled by solute spot from origin) / (Distance traveled by solvent front from origin)",
        "explanation": "The retention factor (Rf) is the ratio of the migration distance of the solute spot center relative to the origin baseline divided by the migration distance of the solvent front from the baseline."
      }
    ]
  },
  "ph-determination": {
  "id": "ph-determination",
  "name": "pH Determination",
  "category": "Instrumental Analysis",
  "difficulty": "Beginner",
  "objective": "Determine the pH and acidic or alkaline nature of various aqueous solutions using universal pH indicator paper, indicator solutions, and a calibrated pH meter.",
  "principle": "The pH of an aqueous solution is a logarithmic measure of the concentration of free hydronium ions, defined mathematically as pH = -log10[H3O+]. Visual methods utilize indicator dyes that undergo reversible protonation reactions accompanied by characteristic color changes across specific pH intervals. Instrumental methods employ a glass-membrane combination electrode that develops a phase boundary potential proportional to the hydronium ion activity according to the Nernst equation. Calibrating the pH meter with standard buffer solutions of known pH ensures accurate and quantitative instrumental readings.",
  "equipment": [
    "ph-indicator-paper",
    "ph-indicator-solution",
    "laboratory-ph-meter",
    "portable-ph-meter",
    "beaker",
    "wash-bottle",
    "glass-stirring-rod",
    "dropper",
    "watch-glass",
    "safety-goggles",
    "laboratory-coat",
    "chemical-resistant-gloves"
  ],
  "procedure": [
    "Arrange clean, dry watch glasses and small beakers on the laboratory bench and label each container with the name of the test solution.",
    "Transfer a small volume of each sample solution into its respective labeled beaker using a clean dropper.",
    "Place a strip of universal pH indicator paper on a clean watch glass and touch a clean glass stirring rod moistened with the sample solution onto the strip.",
    "Observe the color developed on the pH paper immediately and compare it against the standard manufacturer color comparator chart to record an estimated pH value.",
    "Rinse the glass stirring rod thoroughly with distilled water from a wash bottle and wipe it clean before testing subsequent solutions.",
    "Power on the pH meter and calibrate the instrument using fresh reference buffer solutions (such as pH 4.00, 7.00, and 10.00) following the manufacturer's protocol.",
    "Rinse the pH electrode thoroughly with distilled water over a waste beaker and gently blot it dry using lint-free tissue without rubbing the glass bulb.",
    "Immerse the sensing tip of the electrode into the test solution in the beaker, ensuring the bulb and reference junction are fully submerged.",
    "Swirl the solution gently or allow the reading to stabilize until the meter display indicates a steady, drift-free pH value.",
    "Record the stabilized instrumental pH reading to two decimal places, then rinse the electrode with distilled water and return it to its designated electrode storage solution."
  ],
  "safety": [
    "Wear safety goggles, chemical-resistant gloves, and a lab coat to guard against splashes from unknown or strong acidic and alkaline solutions.",
    "Handle glass pH electrodes with extreme care; the thin glass bulb is fragile and susceptible to shattering.",
    "Never wipe or rub the pH electrode glass bulb vigorously, as electrostatic charges or mechanical breakage can damage the sensing membrane.",
    "Store pH electrodes in the recommended electrode storage solution; never store them dry or in distilled water for extended periods.",
    "Neutralize or collect hazardous chemical test solutions in designated chemical waste receptacles according to laboratory rules."
  ],
  "quiz": [
    {
      "question": "Why must a pH meter be calibrated with standard buffer solutions before measuring unknown samples?",
      "options": [
        "Calibration cleans accumulated salts off the surface of the glass bulb.",
        "Calibration establishes the instrument's electrical response slope and offset relative to known hydronium ion activities.",
        "Calibration converts the electrical signal from alternating current to direct current.",
        "Calibration adjusts the physical temperature of the test solution to exactly room temperature."
      ],
      "correct_answer": "Calibration establishes the instrument's electrical response slope and offset relative to known hydronium ion activities.",
      "explanation": "pH electrodes develop asymmetry potentials and slight slope variations over time. Two- or three-point calibration with standard buffers establishes the true Nernstian slope and zero offset for accurate measurements."
    },
    {
      "question": "What is a key limitation of universal pH indicator paper compared to a calibrated glass-electrode pH meter?",
      "options": [
        "Indicator paper cannot distinguish between acidic and alkaline solutions under any circumstances.",
        "Indicator paper provides only an approximate, semi-quantitative visual estimate (usually within 1 to 2 pH units) and is subjective.",
        "Indicator paper only works at temperatures exceeding 80 degrees Celsius.",
        "Indicator paper destroys the chemical composition of the remaining solution in the beaker."
      ],
      "correct_answer": "Indicator paper provides only an approximate, semi-quantitative visual estimate (usually within 1 to 2 pH units) and is subjective.",
      "explanation": "pH paper relies on human visual color comparison against printed charts, making it semi-quantitative and subjective, whereas a calibrated pH meter yields digital precision to 0.01 pH units."
    },
    {
      "question": "Why should the glass bulb of a pH electrode never be blotted vigorously or rubbed with paper towels?",
      "options": [
        "Rubbing alters the pH of the distilled water permanently.",
        "Vigorous rubbing can scratch the delicate hydrated gel layer and generate static electrical charges that cause severe measurement drift.",
        "The glass bulb will dissolve when exposed to friction.",
        "Paper towels contain strong acids that permanently contaminate the reference electrolyte."
      ],
      "correct_answer": "Vigorous rubbing can scratch the delicate hydrated gel layer and generate static electrical charges that cause severe measurement drift.",
      "explanation": "The pH-sensitive glass membrane relies on a hydrated gel layer. Wiping or rubbing causes static charge accumulation and can mechanically damage this delicate layer, leading to erratic or drifting readings."
    },
    {
      "question": "What does a pH value of 3.0 indicate about the nature of an aqueous solution at 25 °C?",
      "options": [
        "The solution is neutral with equal hydronium and hydroxide concentrations.",
        "The solution is basic with a predominance of free hydroxide ions.",
        "The solution is acidic, having a hydronium ion concentration greater than 1.0 x 10^-7 mol/L.",
        "The solution contains no ions and is purely non-conductive."
      ],
      "correct_answer": "The solution is acidic, having a hydronium ion concentration greater than 1.0 x 10^-7 mol/L.",
      "explanation": "At 25 °C, a pH lower than 7.0 signifies an acidic solution, where the concentration of hydronium ions [H3O+] exceeds [OH-]."
    }
  ]
},
  "standard-solution-preparation": {
  "id": "standard-solution-preparation",
  "name": "Preparation of a Standard Solution",
  "category": "Solution Preparation",
  "difficulty": "Beginner",
  "objective": "Prepare an accurate standard solution of a primary standard substance by precision analytical weighing and quantitative volumetric dilution.",
  "principle": "A standard solution is a chemical solution containing an accurately known concentration of an element or a substance. In direct preparation, a primary standard compound exhibiting high purity, known stoichiometry, atmospheric stability, and high molar mass is accurately weighed using an analytical balance. The weighed substance is completely dissolved in solvent within a beaker, quantitatively transferred to a volumetric flask with repeated rinsings, and diluted precisely to the graduation mark. Thorough inversion and mixing produce a homogeneous solution with a precisely calculable molar concentration.",
  "equipment": [
    "analytical-balance",
    "weighing-boat",
    "spatula",
    "volumetric-flask",
    "beaker",
    "glass-funnel",
    "glass-stirring-rod",
    "wash-bottle",
    "dropper",
    "reagent-bottle",
    "safety-goggles",
    "laboratory-coat",
    "chemical-resistant-gloves"
  ],
  "procedure": [
    "Inspect the analytical balance, ensure the balance pan is clean, check the leveling bubble, close the draft doors, and press tare to zero the display.",
    "Place a clean, dry weighing boat on the balance pan, close the doors, tare the balance, and use a clean spatula to transfer the required mass of primary standard solid.",
    "Record the exact mass displayed on the analytical balance to four decimal places.",
    "Carefully transfer the solid from the weighing boat into a clean beaker, and rinse the weighing boat with a small stream of distilled water into the beaker to ensure complete transfer.",
    "Add a portion of distilled water to the beaker and stir gently with a glass stirring rod until all solute crystals are completely dissolved at room temperature.",
    "Place a clean glass funnel into the neck of a volumetric flask and pour the dissolved solution down the glass stirring rod into the flask.",
    "Rinse the inner walls of the beaker, the stirring rod, and the funnel several times with small portions of distilled water from the wash bottle, collecting all washings in the volumetric flask.",
    "Remove the funnel and add distilled water directly into the volumetric flask until the liquid level reaches approximately one centimeter below the engraved graduation mark.",
    "Use a dropper to add distilled water dropwise until the bottom of the meniscus rests exactly on the horizontal graduation line when viewed at eye level.",
    "Insert the stopper firmly into the volumetric flask, invert the flask repeatedly with a rocking motion at least 15 to 20 times to achieve complete homogeneity, and transfer the solution into a labeled reagent bottle."
  ],
  "safety": [
    "Wear safety goggles, laboratory coat, and chemical-resistant gloves to protect eyes and skin during chemical weighing and handling.",
    "Never handle chemicals directly with your fingers; always use a clean, dry spatula.",
    "Keep the draft doors of the analytical balance closed during measurement, and clean any spilled powder immediately using a soft camel-hair brush.",
    "Never heat a volumetric flask or dissolve solids in hot water directly inside it, as thermal expansion permanently alters the certified calibrated volume.",
    "Ensure the volumetric flask stopper is held securely in place with your thumb or palm while inverting to prevent leaks and accidental spills."
  ],
  "quiz": [
    {
      "question": "What is an essential characteristic of a primary standard substance in analytical chemistry?",
      "options": [
        "It must be a volatile liquid that evaporates rapidly without residue.",
        "It must possess high purity, known chemical formula, stability in air without absorbing moisture, and preferably high molar mass.",
        "It must be an intensely colored dye so that its concentration can be seen visually.",
        "It must be highly hygroscopic so that it absorbs atmospheric moisture readily."
      ],
      "correct_answer": "It must possess high purity, known chemical formula, stability in air without absorbing moisture, and preferably high molar mass.",
      "explanation": "A primary standard must be extraordinarily pure, stable against atmospheric CO2 and water (non-hygroscopic), non-toxic, inexpensive, and have a high formula weight to minimize relative weighing errors."
    },
    {
      "question": "Why should solid solutes not be dissolved directly inside a volumetric flask?",
      "options": [
        "Solids will chemically etch and dissolve the flask's borosilicate glass walls.",
        "Dissolution can be slow and may produce significant endothermic or exothermic volume changes that distort calibration.",
        "The narrow neck of a volumetric flask prevents any water from entering.",
        "Solids react with air inside the flask and turn into insoluble gases."
      ],
      "correct_answer": "Dissolution can be slow and may produce significant endothermic or exothermic volume changes that distort calibration.",
      "explanation": "Dissolving solids in a beaker first ensures complete dissolution at ambient temperature. Heats of solution can alter temperature and volume, and undissolved crystals lodged in flask crevices lead to inaccurate dilution."
    },
    {
      "question": "Why are the beaker, funnel, and stirring rod rinsed multiple times with distilled water into the volumetric flask?",
      "options": [
        "To clean the glassware for the next student without having to use the sink.",
        "To ensure quantitative transfer so that no solute molecules remain behind on the transfer tools.",
        "To dilute the standard solution beyond the marked calibration volume.",
        "To lower the temperature of the volumetric flask rapidly."
      ],
      "correct_answer": "To ensure quantitative transfer so that no solute molecules remain behind on the transfer tools.",
      "explanation": "Quantitative transfer requires that every trace of dissolved solute from the beaker, rod, and funnel is rinsed into the volumetric flask so the calculated mass matches the actual solution content."
    },
    {
      "question": "What is the purpose of inverting the stoppered volumetric flask repeatedly after bringing it to the mark?",
      "options": [
        "To introduce air bubbles that improve the shelf life of the reagent.",
        "To ensure complete homogeneity of the solution, as water added last forms an unmixed layer on top.",
        "To test whether the stopper has an airtight and leakproof fit.",
        "To increase the internal pressure of the flask."
      ],
      "correct_answer": "To ensure complete homogeneity of the solution, as water added last forms an unmixed layer on top.",
      "explanation": "Because pure water is added last to bring the meniscus to the mark, concentration stratification occurs. Inversion (15–20 times) thoroughly mixes the dense bottom layer with the top water to make the solution perfectly uniform."
    }
  ]
},
  "simple-distillation": {
  "id": "simple-distillation",
  "name": "Simple Distillation",
  "category": "Separation and Purification",
  "difficulty": "Advanced",
  "objective": "Separate a volatile liquid from a non-volatile substance or separate two miscible liquids with significantly different boiling points using simple distillation.",
  "principle": "Simple distillation is a thermal separation process based on differences in vapor pressures and boiling points of liquid mixture components. When a homogeneous liquid mixture is heated to boiling, the resulting vapor phase is significantly enriched in the more volatile component with lower boiling point according to Raoult's and Dalton's laws. The ascending vapors pass the thermometer bulb, enter the inner tube of a water-cooled Liebig condenser, and condense back into liquid distillate that collects in a receiving vessel. Effective simple distillation requires that the components differ in boiling point by at least 40 to 50 degrees Celsius.",
  "equipment": [
    "round-bottom-flask",
    "condenser",
    "distillation-apparatus",
    "thermometer",
    "hot-plate",
    "retort-stand",
    "clamp-and-boss-head",
    "rubber-stopper",
    "beaker",
    "measuring-cylinder",
    "safety-goggles",
    "laboratory-coat",
    "chemical-resistant-gloves"
  ],
  "procedure": [
    "Assemble the distillation apparatus by securely clamping a round-bottom boiling flask to a retort stand above a controllable heating mantle or hot plate.",
    "Add the liquid mixture to the round-bottom flask through a funnel, ensuring the flask is filled to between one-half and two-thirds of its capacity.",
    "Add two or three clean boiling chips or a magnetic stir bar to the flask to ensure smooth, uniform boiling and prevent explosive superheating.",
    "Attach the three-way distillation adapter head to the flask neck and position a thermometer through a rubber stopper or adapter at the top.",
    "Adjust the thermometer position so that the top of its mercury or alcohol bulb aligns exactly with the bottom of the side-arm vapor outlet leading to the condenser.",
    "Connect the Liebig condenser to the distillation head, clamping it securely to a second retort stand with an appropriate downward slope.",
    "Attach water hoses to the condenser jackets, connecting the water inlet to the lower condenser nozzle and the outlet hose from the upper nozzle to the sink drain.",
    "Turn on the cold water tap to maintain a gentle, steady, bubble-free flow of cooling water through the outer condenser jacket.",
    "Place a clean receiving beaker or measuring cylinder beneath the condenser vacuum adapter outlet to collect the condensed distillate.",
    "Apply heat gradually to the round-bottom flask until the liquid boils smoothly, adjusting the heat source to maintain a distillation rate of approximately 1 to 2 drops per second.",
    "Monitor and record the temperature on the thermometer continuously as the boiling plateau is reached and fractions are collected.",
    "Cease heating immediately before the distillation flask boils dry, leaving a small residual volume of liquid to prevent thermal cracking or hazardous residue decomposition."
  ],
  "safety": [
    "Wear safety goggles, laboratory coat, and chemical-resistant gloves throughout the distillation procedure.",
    "Never heat a completely closed or sealed distillation apparatus; ensure the system is open to atmospheric pressure at the receiver adapter to prevent catastrophic explosion.",
    "Never distill a flask to dryness; concentrating residues can cause severe thermal cracking or detonate explosive organic peroxides.",
    "Always add boiling chips or a stir bar before applying heat; never drop boiling chips into a hot or boiling liquid, as it can cause sudden, violent boiling eruption.",
    "Never use an open flame to heat flammable organic liquids; use a temperature-controlled heating mantle, oil bath, or hot plate.",
    "Check all glassware joints for tight fits and ensure water hoses are clamped firmly to prevent water leaks onto electrical heating appliances."
  ],
  "quiz": [
    {
      "question": "Where should the thermometer bulb be positioned in a simple distillation setup for accurate vapor temperature readings?",
      "options": [
        "Immersed directly in the boiling liquid mixture at the bottom of the flask.",
        "Suspended high in the neck above the ground glass joint.",
        "Just below the level of the side-arm outlet so the bulb is completely surrounded by passing vapor.",
        "Inside the condenser jacket in direct contact with cooling water."
      ],
      "correct_answer": "Just below the level of the side-arm outlet so the bulb is completely surrounded by passing vapor.",
      "explanation": "The thermometer bulb must be immersed in the vapor stream flowing into the condenser side arm. If placed too high, it reads low; if immersed in liquid, it reads liquid superheat rather than distilling vapor temperature."
    },
    {
      "question": "Why must cooling water enter the condenser at the lower nozzle and exit at the upper nozzle?",
      "options": [
        "To counteract gravity and ensure the cooling jacket remains completely filled with water without air pockets.",
        "To warm the water up before it reaches the boiling flask.",
        "To reduce water pressure so the glass condenser does not burst.",
        "To make the water flow in the same direction as the condensing vapor."
      ],
      "correct_answer": "To counteract gravity and ensure the cooling jacket remains completely filled with water without air pockets.",
      "explanation": "Entering from the bottom forces water uphill, expelling air bubbles and ensuring the entire condenser jacket remains full of cold water for maximum heat exchange efficiency."
    },
    {
      "question": "What is the purpose of adding boiling chips or anti-bumping stones to the distillation flask?",
      "options": [
        "They chemically bind with impurities to clarify the distillate.",
        "They provide nucleation sites for smooth bubble formation, preventing dangerous bumping and superheating.",
        "They raise the boiling point of the mixture so it distills faster.",
        "They neutralize acidic vapors before they reach the condenser."
      ],
      "correct_answer": "They provide nucleation sites for smooth bubble formation, preventing dangerous bumping and superheating.",
      "explanation": "Boiling chips contain microscopic trapped air pockets that serve as nucleation sites for smooth, continuous bubble formation, preventing superheating and violent boiling eruptions ('bumping')."
    },
    {
      "question": "Why is it dangerous to heat a distillation apparatus that is completely sealed from the atmosphere?",
      "options": [
        "Vapors will escape through the glass walls via osmosis.",
        "Pressure will rapidly build inside the rigid glassware as vapors form, leading to violent rupture or explosion.",
        "The cooling water will reverse flow and flood the laboratory.",
        "The thermometer liquid will chemically degrade."
      ],
      "correct_answer": "Pressure will rapidly build inside the rigid glassware as vapors form, leading to violent rupture or explosion.",
      "explanation": "Heating a closed system causes thermal expansion of trapped gases and vapor generation, rapidly elevating internal pressure until the glassware shatters explosively."
    }
  ]
},
  "recrystallization": {
  "id": "recrystallization",
  "name": "Crystallization and Recrystallization",
  "category": "Separation and Purification",
  "difficulty": "Intermediate",
  "objective": "Purify an impure solid organic compound based on differential temperature-dependent solubility and isolate pure crystals.",
  "principle": "Recrystallization is a premier purification technique for solids that exploits differences in solute solubility across varying temperatures. An impure solid is dissolved in a minimum volume of near-boiling solvent in which the desired compound has high solubility at elevated temperatures but minimal solubility when cold. Insoluble contaminants are removed while hot by rapid gravity filtration. As the hot saturated solution cools slowly to ambient temperature and then in an ice bath, solute molecules assemble into an orderly crystalline lattice that excludes foreign impurity molecules. The purified crystals are isolated by vacuum filtration and washed with ice-cold solvent.",
  "equipment": [
    "beaker",
    "conical-flask",
    "hot-plate",
    "bunsen-burner",
    "tripod-stand",
    "wire-gauze",
    "evaporating-dish",
    "glass-funnel",
    "filter-paper",
    "buchner-funnel",
    "glass-stirring-rod",
    "watch-glass",
    "thermometer",
    "microscope",
    "safety-goggles",
    "laboratory-coat",
    "chemical-resistant-gloves"
  ],
  "procedure": [
    "Place the crude solid sample into a clean conical flask and assemble an appropriate heating source (such as a hot plate or water bath).",
    "Heat a separate beaker containing the chosen recrystallization solvent until it is near its boiling point.",
    "Add small increments of the hot solvent to the conical flask containing the solid, swirling the flask continuously over heat until the solid just completely dissolves.",
    "Avoid adding excessive solvent to maintain a concentrated, near-saturated solution at the boiling point.",
    "If insoluble suspended impurities remain, perform a rapid hot filtration through fluted filter paper in a pre-warmed glass funnel into a clean receiver.",
    "Cover the conical flask containing the clear hot solution with a watch glass to prevent solvent evaporation.",
    "Allow the flask to sit undisturbed on the benchtop to cool slowly to room temperature, permitting initial nucleation and slow crystal growth.",
    "Once room temperature is reached, transfer the flask into an ice-water bath to maximize crystal yield by further decreasing solute solubility.",
    "Collect the formed crystals using vacuum filtration on a Büchner funnel fitted with suitable filter paper.",
    "Rinse the crystal cake with a small volume of ice-cold pure solvent to wash away mother liquor without dissolving the product, then draw air through to dry.",
    "Examine a sample of the dried crystals under a laboratory microscope to assess crystalline morphology and purity."
  ],
  "safety": [
    "Wear safety goggles, laboratory coat, and chemical-resistant gloves throughout heating and filtration procedures.",
    "Never heat flammable organic solvents with an open Bunsen burner flame; always use a hot plate or steam bath in a well-ventilated fume hood.",
    "Never stopper a hot flask tightly; cooling creates a vacuum that may cause glassware implosion or make the stopper impossible to remove.",
    "Use heat-resistant crucible tongs or insulated gloves when handling hot beakers and flasks.",
    "Discard the mother liquor and solvent washes into the designated organic or aqueous chemical waste container."
  ],
  "quiz": [
    {
      "question": "Why should an impure solid be dissolved in the minimum volume of boiling solvent during recrystallization?",
      "options": [
        "To prevent the glass conical flask from cracking due to excessive liquid mass.",
        "To ensure the solution is saturated at elevated temperatures, maximizing crystal recovery upon cooling.",
        "To completely evaporate all solvent before the cooling step begins.",
        "To dissolve the impurities while leaving the desired compound permanently insoluble."
      ],
      "correct_answer": "To ensure the solution is saturated at elevated temperatures, maximizing crystal recovery upon cooling.",
      "explanation": "Using excess solvent keeps the solution undersaturated even at low temperatures, resulting in poor or zero crystal yield because the solute remains dissolved in the mother liquor."
    },
    {
      "question": "What is the consequence of cooling a hot saturated recrystallization solution too rapidly in an ice bath?",
      "options": [
        "Crystals will not form under any circumstances.",
        "Small, imperfect crystals precipitate rapidly, trapping solvent and soluble impurities within the crystal matrix.",
        "The solvent will freeze into a solid block of ice instantly.",
        "The compound decomposes chemically into its constituent elements."
      ],
      "correct_answer": "Small, imperfect crystals precipitate rapidly, trapping solvent and soluble impurities within the crystal matrix.",
      "explanation": "Slow cooling allows large, highly ordered crystalline lattices to form that exclude foreign molecules. Rapid chilling causes crash precipitation, trapping impurities within the lattice."
    },
    {
      "question": "Why must the solvent used to wash the collected crystals on the Büchner funnel be ice-cold?",
      "options": [
        "Cold solvent freezes the filter paper to make it sturdier.",
        "Warm solvent would redissolve significant amounts of the purified crystals, severely lowering the product yield.",
        "Ice-cold solvent neutralizes hazardous acid vapors on contact.",
        "The suction pump only works if the liquid is below 4 degrees Celsius."
      ],
      "correct_answer": "Warm solvent would redissolve significant amounts of the purified crystals, severely lowering the product yield.",
      "explanation": "The purified solid is soluble in warm solvent. Washing with cold solvent effectively rinses away residual mother liquor clinging to the crystal surfaces with minimal dissolution loss."
    },
    {
      "question": "What role can a compound microscope play in evaluating recrystallization results?",
      "options": [
        "It determines the exact quantitative percentage yield of the product.",
        "It enables visual inspection of crystal habit, uniformity, and the presence of amorphous or occluded contaminants.",
        "It measures the boiling point of the mother liquor.",
        "It replaces the need for weighing the dried crystals."
      ],
      "correct_answer": "It enables visual inspection of crystal habit, uniformity, and the presence of amorphous or occluded contaminants.",
      "explanation": "Microscopic observation reveals crystal morphology, sharpness of edges, uniformity of size, and whether foreign amorphous particles or inclusions are present."
    }
  ]
},
  "ph-metric-titration": {
  "id": "ph-metric-titration",
  "name": "pH-Metric Titration",
  "category": "Instrumental Analysis",
  "difficulty": "Intermediate",
  "objective": "Determine the equivalence point and pKa of an acid by tracking continuous pH changes during potentiometric neutralization with a standard base.",
  "principle": "A pH-metric (potentiometric) titration tracks the change in hydronium ion activity throughout a neutralization reaction using a glass combination electrode and a pH meter. As titrant is delivered, the pH changes gradually in buffered regions, exhibits a steep inflection jump at the equivalence point where buffering capacity collapses, and levels off in the post-equivalence region. The equivalence point can be determined from the inflection point of the sigmoidal pH versus volume curve or from the maximum peak of the first derivative plot (dpH/dV). For a weak acid, the pH at the half-equivalence point equals its acid dissociation constant (pKa).",
  "equipment": [
    "laboratory-ph-meter",
    "burette",
    "beaker",
    "retort-stand",
    "clamp-and-boss-head",
    "magnetic-stirrer",
    "pipette",
    "wash-bottle",
    "glass-funnel",
    "safety-goggles",
    "laboratory-coat",
    "chemical-resistant-gloves",
    "chemical-waste-container"
  ],
  "procedure": [
    "Calibrate the laboratory pH meter using standard buffer solutions (typically pH 4.00, 7.00, and 10.00) following the standard calibration procedure.",
    "Mount a clean burette filled with standardized sodium hydroxide titrant onto the retort stand using the clamp and boss head.",
    "Pipette an exact volume of the acid analyte solution into a clean beaker, add a magnetic stir bar, and add sufficient distilled water so the electrode bulb will be fully submerged.",
    "Position the beaker on the magnetic stirrer platform and clamp the pH electrode securely into the solution, ensuring the stir bar spins freely without striking the electrode.",
    "Record the initial pH of the solution before adding any titrant.",
    "Add titrant from the burette in convenient 1.0 mL increments during the initial flat region, stirring constantly, and record the stabilized pH after each addition.",
    "Reduce the increment size to 0.1 mL or 0.2 mL as the pH begins to change more rapidly approaching the steep equivalence inflection region.",
    "Continue titrating with small increments through the sharp pH jump until the curve flattens out into the basic plateau region.",
    "Add several additional 1.0 mL increments past the inflection to establish the final horizontal portion of the titration curve.",
    "Construct a plot of measured pH on the y-axis versus cumulative titrant volume on the x-axis to generate the sigmoidal titration curve.",
    "Determine the equivalence volume from the midpoint of the steepest inflection or by plotting the first derivative (dpH/dV versus volume), and identify the pKa at half-equivalence."
  ],
  "safety": [
    "Wear safety goggles, lab coat, and chemical-resistant gloves to protect against acid and caustic base splashes.",
    "Exercise extreme care when positioning the pH electrode in the beaker; ensure the rotating magnetic stir bar cannot contact the thin glass bulb.",
    "Never allow the pH electrode sensing bulb to remain dry in air; rinse and return to storage buffer immediately after use.",
    "Keep all electrical wiring and meter consoles away from water sinks and liquid spills.",
    "Transfer all neutralized titration mixtures to the designated laboratory chemical waste container."
  ],
  "quiz": [
    {
      "question": "How is the equivalence point recognized on a classic sigmoidal pH-metric titration curve?",
      "options": [
        "It is the point where the pH reaches zero.",
        "It is the point of inflection where the slope of the pH curve is steepest (maximum rate of pH change with added volume).",
        "It is the exact starting point of the titration before base is added.",
        "It is the point where the solution begins to boil."
      ],
      "correct_answer": "It is the point of inflection where the slope of the pH curve is steepest (maximum rate of pH change with added volume).",
      "explanation": "At the equivalence point, the solution's buffer capacity is minimal and hydronium concentration changes by orders of magnitude with minimal titrant addition, creating the steepest inflection on the curve."
    },
    {
      "question": "What significant chemical property of a weak acid can be determined directly from its pH value at the half-equivalence point?",
      "options": [
        "Its boiling point at standard atmospheric pressure.",
        "Its acid dissociation constant exponent (pKa), because [HA] = [A-] at that point.",
        "Its molecular weight in grams per mole.",
        "Its total density in water."
      ],
      "correct_answer": "Its acid dissociation constant exponent (pKa), because [HA] = [A-] at that point.",
      "explanation": "According to the Henderson-Hasselbalch equation (pH = pKa + log([A-]/[HA])), when half the weak acid is neutralized, [A-] equals [HA], making log(1) = 0 and therefore pH = pKa."
    },
    {
      "question": "Why should the titrant volume increments be reduced to 0.1–0.2 mL near the equivalence region?",
      "options": [
        "To prevent the burette stopcock from wearing out.",
        "To accurately capture the steep pH jump and pinpoint the inflection volume with high precision.",
        "To allow the magnetic stirrer to cool down.",
        "Because chemical reactions stop if titrant is added too rapidly."
      ],
      "correct_answer": "To accurately capture the steep pH jump and pinpoint the inflection volume with high precision.",
      "explanation": "The pH changes drastically over a very small volume range near equivalence. Large volume increments could bypass the steep jump entirely, introducing major error in locating the equivalence point."
    },
    {
      "question": "What is the primary benefit of plotting the first derivative curve (dpH/dV versus volume) for a potentiometric titration?",
      "options": [
        "It replaces the need to calibrate the pH meter.",
        "It transforms the sigmoidal inflection into a sharp, easily identified peak whose apex corresponds exactly to the equivalence volume.",
        "It eliminates all need for adding standard base.",
        "It converts acidic solutions into basic solutions mathematically."
      ],
      "correct_answer": "It transforms the sigmoidal inflection into a sharp, easily identified peak whose apex corresponds exactly to the equivalence volume.",
      "explanation": "The first derivative represents the rate of change of pH with volume. The inflection point of the original curve becomes a well-defined maximum peak on the derivative plot, removing subjective visual interpolation."
    }
  ]
}
};

// ==============================================================================
// APPARATUS METADATA: Explicit mapping to real 63-item equipment IDs & visual props
// ==============================================================================

const APPARATUS_METADATA = {
  "acid-base-titration": {
    "burette": {
      "name": "Burette",
      "dbId": "burette",
      "isProp": false,
      "purpose": "Dispenses precise, variable volumes of titrant solution controlled by a stopcock valve for volumetric titrations.",
      "role": "Holds standard titrant and dispenses it drop-by-drop into the analyte flask until exact stoichiometric neutralization.",
      "safety": "Fill below eye level using a glass funnel; verify that the stopcock is firmly seated to prevent corrosive leaks."
    },
    "retort-stand": {
      "name": "Retort Stand",
      "dbId": "retort-stand",
      "isProp": false,
      "purpose": "Provides a heavy, stable base and vertical rod for mounting laboratory equipment and glassware assemblies.",
      "role": "Anchors and stabilizes the burette vertically at an adjustable height directly above the conical flask on the workbench.",
      "safety": "Ensure the heavy rectangular base faces forward toward you so the center of gravity prevents tipping when supporting filled glassware."
    },
    "clamp-and-boss-head": {
      "name": "Clamp and Boss Head",
      "dbId": "clamp-and-boss-head",
      "isProp": false,
      "purpose": "Attaches to a retort stand rod to securely hold and position glassware assemblies.",
      "role": "Grips the cylindrical glass burette barrel securely without crushing the glass, holding it perfectly plumb.",
      "safety": "Tighten thumbscrews finger-tight only; overtightening metal clamps against thin glass barrels can cause stress fractures."
    },
    "conical-flask": {
      "name": "Conical Flask (Erlenmeyer Flask)",
      "dbId": "conical-flask",
      "isProp": false,
      "purpose": "Facilitates splash-free manual swirling, titration receptions, and boiling with its flat base and tapered neck.",
      "role": "Contains the measured analyte volume plus chemical indicator and allows vigorous manual swirling without splashing.",
      "safety": "Inspect flask for star cracks or chips prior to use; swirl with smooth wrist motions to prevent aerosol ejection."
    },
    "dropper": {
      "name": "Dropper (Medicine Dropper)",
      "dbId": "dropper",
      "isProp": false,
      "purpose": "Adds or transfers small liquid quantities drop by drop for tests, indicator dispensing, and volume adjustments.",
      "role": "Dispenses 2 to 3 drops of indicator solution into the conical flask before starting titrant addition.",
      "safety": "Never invert a dropper with liquid inside; corrosive vapors or liquid will enter and chemically degrade the rubber suction bulb."
    }
  },

  "filtration": {
    "beaker": {
      "name": "Beaker (Slurry Container)",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Holds the insoluble solid-liquid suspension and decants the slurry smoothly into the filter cone along the glass stirring rod.",
      "safety": "Pour slowly along a glass rod to prevent liquid from dribbling down the beaker's outer wall and splashing."
    },
    "glass-funnel": {
      "name": "Glass Funnel",
      "dbId": "glass-funnel",
      "isProp": false,
      "purpose": "Channels liquids into narrow openings and supports filter paper during gravity filtration.",
      "role": "Seats and supports the folded filter paper cone and directs the drained filtrate downward into the receiving vessel.",
      "safety": "Ensure the bevel tip of the funnel stem rests against the inner wall of the receiving vessel to eliminate splashing."
    },
    "filter-paper": {
      "name": "Filter Paper",
      "dbId": "filter-paper",
      "isProp": false,
      "purpose": "Separates suspended insoluble solid particles from liquids during gravity or suction filtration.",
      "role": "Porous cellulose barrier that retains solid precipitate particles (residue) while allowing clear liquid (filtrate) to pass.",
      "safety": "Never fill liquid higher than two-thirds of the filter paper cone; overflow bypasses the filter and contaminates the filtrate."
    },
    "conical-flask": {
      "name": "Conical Flask (Filtrate Receiver)",
      "dbId": "conical-flask",
      "isProp": false,
      "purpose": "Facilitates splash-free manual swirling, titration receptions, and boiling with its flat base and tapered neck.",
      "role": "Collects the clear gravity filtrate dripping smoothly from the glass funnel stem.",
      "safety": "Position the flask stably on the benchtop directly beneath the funnel; do not move while filtration is active."
    },
    "glass-stirring-rod": {
      "name": "Glass Stirring Rod",
      "dbId": "glass-stirring-rod",
      "isProp": false,
      "purpose": "Stirs liquid solutions, induces crystallization, and guides liquid streams during decantation.",
      "role": "Held across the lip of the pouring beaker to guide the liquid stream smoothly into the center of the filter cone via surface tension.",
      "safety": "Do not strike or tap the glass rod against the bottom of glass beakers or the paper cone to avoid puncturing the paper."
    },
    "retort-stand": {
      "name": "Retort Stand & Ring Clamp",
      "dbId": "retort-stand",
      "isProp": false,
      "purpose": "Provides a heavy, stable base and vertical rod for mounting laboratory equipment and glassware assemblies.",
      "role": "Elevates and supports the ring clamp holding the glass funnel above the conical receiving flask.",
      "safety": "Ensure clamp screws are tightened firmly so the funnel cannot slip downward during liquid pouring."
    }
  },

  "paper-chromatography": {
    "beaker": {
      "name": "Beaker (Developing Chamber)",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Serves as the developing chamber holding the shallow reservoir of mobile phase solvent at the bottom.",
      "safety": "Keep the chamber covered to prevent inhalation of volatile solvent fumes and avoid placing near open flames."
    },
    "watch-glass": {
      "name": "Watch Glass (Chamber Cover)",
      "dbId": "watch-glass",
      "isProp": false,
      "purpose": "Holds small solid samples, covers beakers to reduce evaporation, and acts as an evaporating dish.",
      "role": "Covers the developing beaker to ensure the internal vapor phase remains saturated, preventing non-uniform solvent evaporation.",
      "safety": "Handle by the rim; inspect for chip marks on the glass edge to prevent cut injuries."
    },
    "filter-paper": {
      "name": "Filter Paper (Chromatography Strip)",
      "dbId": "filter-paper",
      "isProp": false,
      "purpose": "Separates suspended insoluble solid particles from liquids during gravity or suction filtration.",
      "role": "High-purity cellulose strip acting as the stationary phase whose bound water molecules partition migrating solute components.",
      "safety": "Handle the paper strip exclusively with clean forceps or by the upper dry edge to prevent finger grease contamination."
    },
    "dropper": {
      "name": "Dropper (Sample Spotter)",
      "dbId": "dropper",
      "isProp": false,
      "purpose": "Adds or transfers small liquid quantities drop by drop for tests, indicator dispensing, and volume adjustments.",
      "role": "Applies a tiny, concentrated sample spot onto the pencil baseline before chamber insertion.",
      "safety": "Touch the tip very lightly to the paper surface to keep the spot diameter under 2 to 3 mm."
    },
    "pencil": {
      "name": "Graphite Pencil",
      "dbId": null,
      "isProp": true,
      "purpose": "General writing and marking tool with insoluble carbon graphite core.",
      "role": "Draws the origin baseline 1.5–2.0 cm above the bottom edge. Insoluble graphite will not dissolve or migrate in mobile phase solvents.",
      "safety": "Never use ink pens; commercial pen inks contain soluble dyes that will dissolve in developing solvents and ruin the chromatogram."
    }
  },
  "ph-determination": {
    "ph-indicator-paper": {
      "name": "pH Indicator Paper",
      "dbId": "ph-indicator-paper",
      "isProp": false,
      "purpose": "Impregnated paper strips that change color depending on solution acidity or alkalinity for rapid semi-quantitative pH testing.",
      "role": "Provides quick estimation of solution pH by matching strip color against standard calibrated reference chart.",
      "safety": "Handle strips with dry forceps or by clean dry edges; never touch wet chemical paper with bare fingers."
    },
    "ph-indicator-solution": {
      "name": "pH Indicator Solution",
      "dbId": "ph-indicator-solution",
      "isProp": false,
      "purpose": "Aqueous or alcoholic dye mixtures exhibiting distinct color transitions across defined pH ranges.",
      "role": "Added in small drop quantities to sample solutions to visually identify acid/base transitions.",
      "safety": "Keep indicator bottles tightly capped away from open flames and heat sources."
    },
    "laboratory-ph-meter": {
      "name": "Laboratory pH Meter",
      "dbId": "laboratory-ph-meter",
      "isProp": false,
      "purpose": "High-precision benchtop potentiometric instrument measuring hydronium ion activity with a glass combination electrode.",
      "role": "Provides exact electrometric pH readings following standard two-point buffer calibration.",
      "safety": "Keep glass electrode bulb hydrated in 3M KCl storage solution; never allow membrane to dry out."
    },
    "beaker": {
      "name": "Sample Beaker",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Holds illustrative sample solution (Sample A) for pH determination and testing.",
      "safety": "Inspect glassware for cracks; dispose of tested samples into designated chemical waste."
    },
    "wash-bottle": {
      "name": "Wash Bottle",
      "dbId": "wash-bottle",
      "isProp": false,
      "purpose": "Dispenses controlled streams of distilled water to rinse glassware walls, burette tips, and electrodes.",
      "role": "Rinses combination glass electrode thoroughly between calibration buffers and samples to prevent cross-contamination.",
      "safety": "Fill only with pure deionized or distilled water; never use wash bottles for chemical reagents."
    },
    "glass-stirring-rod": {
      "name": "Glass Stirring Rod",
      "dbId": "glass-stirring-rod",
      "isProp": false,
      "purpose": "Stirs liquid solutions, induces crystallization, and guides liquid streams during decantation.",
      "role": "Transfers single droplets of sample solution onto indicator paper strips without immersing the stock.",
      "safety": "Wipe clean between samples; do not use chipped or scratched glass rods."
    }
  },

  "standard-solution-preparation": {
    "analytical-balance": {
      "name": "Analytical Balance",
      "dbId": "analytical-balance",
      "isProp": false,
      "purpose": "Measures solid primary standard mass with high analytical precision inside an enclosed draft shield.",
      "role": "Weighs primary standard solid accurately to ±0.0001 g on tared weighing boat.",
      "safety": "Keep draft shield doors closed during reading; clean balance pan immediately if chemicals spill."
    },
    "weighing-boat": {
      "name": "Weighing Boat",
      "dbId": "weighing-boat",
      "isProp": false,
      "purpose": "Holds solid chemical samples securely during balance weighing, preventing reagent contact with the pan.",
      "role": "Contains primary standard solid during weighing and facilitates smooth pour transfer into dissolution beaker.",
      "safety": "Handle by the rim; never reuse contaminated disposable boats for different chemical reagents."
    },
    "spatula": {
      "name": "Spatula",
      "dbId": "spatula",
      "isProp": false,
      "purpose": "Transfers small crystalline solid portions into the weighing boat during mass adjustment.",
      "role": "Transfers solid reagent crystals in small controlled increments into the weighing boat.",
      "safety": "Use clean, dry stainless steel spatulas; do not return excess reagent from boat back into stock bottle."
    },
    "beaker": {
      "name": "Dissolution Beaker",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Dissolves primary standard solid completely in minimal solvent before quantitative flask transfer.",
      "safety": "Stir gently with glass rod; ensure solid is 100% dissolved before pouring into volumetric flask."
    },
    "glass-funnel": {
      "name": "Glass Funnel",
      "dbId": "glass-funnel",
      "isProp": false,
      "purpose": "Channels liquids into narrow openings and supports filter paper during gravity filtration.",
      "role": "Guides dissolved standard solution into narrow volumetric flask neck without loss.",
      "safety": "Rinse funnel interior with wash bottle into flask during quantitative transfer."
    },
    "glass-stirring-rod": {
      "name": "Glass Stirring Rod",
      "dbId": "glass-stirring-rod",
      "isProp": false,
      "purpose": "Stirs liquid solutions, induces crystallization, and guides liquid streams during decantation.",
      "role": "Directs solution stream into funnel and stirs solid in beaker to accelerate dissolution.",
      "safety": "Rinse rod with wash bottle into flask before removing to prevent analyte loss."
    },
    "volumetric-flask": {
      "name": "Volumetric Flask (250 mL)",
      "dbId": "volumetric-flask",
      "isProp": false,
      "purpose": "Calibrated to contain an exact volume of solution at 20°C when filled to the engraved neck meniscus ring mark.",
      "role": "Accurately defines the final standard solution volume (250.0 mL ± 0.15 mL) at 20°C.",
      "safety": "Never heat volumetric flasks; thermal expansion alters calibrated volume permanently."
    },
    "wash-bottle": {
      "name": "Wash Bottle",
      "dbId": "wash-bottle",
      "isProp": false,
      "purpose": "Dispenses controlled streams of distilled water to rinse glassware walls, burette tips, and electrodes.",
      "role": "Provides quantitative rinsings and fills volumetric flask up to ~1 cm below calibration mark.",
      "safety": "Control jet pressure to prevent splashing drops out of the flask neck."
    },
    "dropper": {
      "name": "Dropper (Fine Meniscus Adjustment)",
      "dbId": "dropper",
      "isProp": false,
      "purpose": "Adds or transfers small liquid quantities drop by drop for tests, indicator dispensing, and volume adjustments.",
      "role": "Adds final solvent drops drop-by-drop until bottom of curved meniscus aligns with calibration line at eye level.",
      "safety": "Deliver drops into center of neck without wetting walls above the calibration mark."
    }
  },

  "simple-distillation": {
    "round-bottom-flask": {
      "name": "Round-Bottom Boiling Flask",
      "dbId": "round-bottom-flask",
      "isProp": false,
      "purpose": "Holds boiling liquid mixtures during distillation, ensuring uniform heat distribution without hot spots.",
      "role": "Contains distillation mixture and boiling chips directly above the hot plate heating surface.",
      "safety": "Never fill past half to two-thirds capacity; always add boiling chips before heating begins."
    },
    "distillation-apparatus": {
      "name": "Distillation Head & Adapter",
      "dbId": "distillation-apparatus",
      "isProp": false,
      "purpose": "Integrated glassware system comprising distillation head, condenser, and vacuum adapter for fractional or simple separations.",
      "role": "Channels ascending hot vapors toward the condenser and provides open vent adapter to atmosphere.",
      "safety": "Ensure system is OPEN to atmosphere at receiving adapter; heating a closed system causes explosive rupture!"
    },
    "condenser": {
      "name": "Liebig Condenser",
      "dbId": "condenser",
      "isProp": false,
      "purpose": "Cools ascending vapor into liquid distillate using a counter-current cooling water jacket.",
      "role": "Condenses hot vapors into liquid distillate via counter-current water flow (water in bottom, out top).",
      "safety": "Secure hose clamps firmly to prevent water hoses slipping off and flooding the laboratory bench."
    },
    "thermometer": {
      "name": "Laboratory Thermometer",
      "dbId": "thermometer",
      "isProp": false,
      "purpose": "Monitors vapor temperature at the side-arm outlet to detect constant-boiling fractions.",
      "role": "Measures distilling vapor temperature; bulb must sit directly at or below side-arm takeoff.",
      "safety": "Insert through rubber stopper using lubricant; never force glass thermometer stems with bare hands."
    },
    "hot-plate": {
      "name": "Hot Plate Heat Source",
      "dbId": "hot-plate",
      "isProp": false,
      "purpose": "Provides controllable, flameless electrical heat for boiling mixtures, dissolving solids, and gentle evaporations.",
      "role": "Supplies safe flameless heating to vaporize the lower-boiling liquid component.",
      "safety": "Never touch hot plate top; keep electrical cords away from hot heating surfaces."
    },
    "retort-stand": {
      "name": "Retort Stand & 3-Finger Clamps",
      "dbId": "retort-stand",
      "isProp": false,
      "purpose": "Provides a heavy, stable base and vertical rod for mounting laboratory equipment and glassware assemblies.",
      "role": "Secures distillation boiling flask and condenser assembly firmly at proper incline angle.",
      "safety": "Support both boiling flask neck and condenser jacket with separate secure clamps."
    },
    "conical-flask": {
      "name": "Receiving Flask (Distillate Collector)",
      "dbId": "conical-flask",
      "isProp": false,
      "purpose": "Facilitates splash-free manual swirling, titration receptions, and boiling with its flat base and tapered neck.",
      "role": "Collects purified condensed liquid distillate drops from the condenser delivery adapter.",
      "safety": "Ensure receiver rests firmly on bench or lab jack below delivery adapter."
    }
  },

  "recrystallization": {
    "conical-flask": {
      "name": "Erlenmeyer Dissolution Flask",
      "dbId": "conical-flask",
      "isProp": false,
      "purpose": "Facilitates splash-free manual swirling, titration receptions, and boiling with its flat base and tapered neck.",
      "role": "Contains crude solid and solvent on hot plate, swirling to dissolve solute in minimal boiling liquid.",
      "safety": "Use flask tongs or heat-resistant gloves when handling hot Erlenmeyer flasks."
    },
    "hot-plate": {
      "name": "Hot Plate",
      "dbId": "hot-plate",
      "isProp": false,
      "purpose": "Provides controllable, flameless electrical heat for boiling mixtures, dissolving solids, and gentle evaporations.",
      "role": "Heats solvent and solution to boiling point safely without open gas flames.",
      "safety": "Operate inside fume hood when heating flammable organic recrystallization solvents."
    },
    "glass-funnel": {
      "name": "Glass Funnel (Hot Filtration)",
      "dbId": "glass-funnel",
      "isProp": false,
      "purpose": "Channels liquids into narrow openings and supports filter paper during gravity filtration.",
      "role": "Supports pre-warmed fluted filter paper to quickly separate insoluble dust before cooling.",
      "safety": "Pre-warm funnel with hot solvent vapor to prevent premature crystal crystallization in the stem."
    },
    "filter-paper": {
      "name": "Fluted Filter Paper",
      "dbId": "filter-paper",
      "isProp": false,
      "purpose": "Separates suspended insoluble solid particles from liquids during gravity or suction filtration.",
      "role": "Fluted accordion folds maximize surface area for rapid hot gravity filtration.",
      "safety": "Do not tear paper folds; keep hot liquid level below paper rim."
    },
    "buchner-funnel": {
      "name": "Büchner Funnel & Suction Flask",
      "dbId": "buchner-funnel",
      "isProp": false,
      "purpose": "Ceramic perforated plate funnel used in vacuum filtration for rapid liquid-solid separation.",
      "role": "Isolates purified recrystallized solid under gentle vacuum suction from cold mother liquor.",
      "safety": "Inspect thick-walled vacuum receiving flask for hairline stars before applying suction."
    },
    "beaker": {
      "name": "Ice-Water Cooling Bath",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Contains ice-water slurry to chill recrystallization flask after slow room-temp cooling to maximize crystal yield.",
      "safety": "Never plunge boiling hot glassware directly into ice; allow room-temp cooling first to avoid thermal shattering."
    },
    "watch-glass": {
      "name": "Watch Glass (Drying Dish)",
      "dbId": "watch-glass",
      "isProp": false,
      "purpose": "Holds small solid samples, covers beakers to reduce evaporation, and acts as an evaporating dish.",
      "role": "Holds moist isolated crystals for final air-drying or desiccator storage.",
      "safety": "Avoid scraping porcelain or glass surfaces vigorously with metal spatulas."
    },
    "microscope": {
      "name": "Laboratory Microscope",
      "dbId": "microscope",
      "isProp": false,
      "purpose": "Magnifies crystal habits and face morphologies to evaluate purity and crystalline structure.",
      "role": "Allows inspection of sharp prismatic crystal habits to verify purity and crystallinity.",
      "safety": "Handle glass slides by the edges; lower objective lens carefully to avoid cracking cover slips."
    }
  },

  "ph-metric-titration": {
    "burette": {
      "name": "Burette (Titrant Delivery)",
      "dbId": "burette",
      "isProp": false,
      "purpose": "Dispenses precise, variable volumes of titrant solution controlled by a stopcock valve for volumetric titrations.",
      "role": "Delivers standard titrant in controlled 2.0 mL and dropwise 0.2 mL increments into analyte beaker.",
      "safety": "Expel air bubbles from tip before starting titration; read meniscus at eye level."
    },
    "laboratory-ph-meter": {
      "name": "pH Meter & Combination Glass Electrode",
      "dbId": "laboratory-ph-meter",
      "isProp": false,
      "purpose": "High-precision benchtop potentiometric instrument measuring hydronium ion activity with a glass combination electrode.",
      "role": "Measures solution pH potentiometrically after each incremental titrant addition, plotting the sigmoidal curve.",
      "safety": "Ensure spinning magnetic stir bar does not strike the thin glass bulb of the electrode."
    },
    "magnetic-stirrer": {
      "name": "Magnetic Stirrer & Teflon Stir Bar",
      "dbId": "magnetic-stirrer",
      "isProp": false,
      "purpose": "Rotates an internal Teflon-coated magnetic stir bar to provide continuous uniform agitation without manual swirling.",
      "role": "Provides smooth, continuous mixing of titrant and analyte without manual flask swirling.",
      "safety": "Center beaker on stirrer plate before turning on speed dial; adjust rotation to avoid vigorous splashing vortex."
    },
    "beaker": {
      "name": "Analyte Titration Beaker",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Contains measured acid analyte volume, magnetic stir bar, and immersed pH electrode.",
      "safety": "Position burette tip directly inside beaker lip without touching the glass wall."
    },
    "retort-stand": {
      "name": "Retort Stand & Electrode Clamp",
      "dbId": "retort-stand",
      "isProp": false,
      "purpose": "Provides a heavy, stable base and vertical rod for mounting laboratory equipment and glassware assemblies.",
      "role": "Supports burette and electrode holder at adjustable heights above the magnetic stirrer.",
      "safety": "Tighten boss head firmly to prevent sudden slipping of electrode into beaker."
    },
    "wash-bottle": {
      "name": "Wash Bottle (Electrode Rinsing)",
      "dbId": "wash-bottle",
      "isProp": false,
      "purpose": "Dispenses controlled streams of distilled water to rinse glassware walls, burette tips, and electrodes.",
      "role": "Rinses combination glass electrode before immersion into analyte solution.",
      "safety": "Catch rinse effluent into a designated waste beaker."
    }
  }
};

// ==============================================================================
// GAME CONTENT & SCENE CONFIGURATIONS (Loaded or Fallback)
// ==============================================================================

const EXPERIMENT_CONTENT = {
  "acid-base-titration": {
    steps: [
      {
        stepIndex: 0,
        actionId: "assemble_stand",
        prompt: "Step 1: Set up the apparatus. Click or tap the Retort Stand & Clamp to mount the burette.",
        hint: "Click the Retort Stand or Clamp on the workbench to mount the glassware securely.",
        targetElement: "retort-stand",
        feedback: "Retort stand and clamp securely assembled. Burette is held plumb."
      },
      {
        stepIndex: 1,
        actionId: "fill_burette_remove_bubble",
        prompt: "Step 2: Fill burette & clear tip. Click the Burette Stopcock to expel trapped air bubbles.",
        hint: "Trapped air bubbles below the stopcock introduce positive volume errors. Tap the burette to clear it.",
        targetElement: "burette",
        feedback: "Burette filled with titrant to initial graduation; tip air bubble successfully expelled."
      },
      {
        stepIndex: 2,
        actionId: "add_analyte_indicator",
        prompt: "Step 3: Prepare analyte. Click the Dropper to add 2–3 drops of indicator into the conical flask.",
        hint: "Click the indicator dropper or the conical flask to dispense indicator drops into the solution.",
        targetElement: "dropper",
        feedback: "Indicator drops added to conical flask. Solution is clear and ready for titration."
      },
      {
        stepIndex: 3,
        actionId: "run_titration",
        prompt: "Step 4: Titrate! Hold or click '💧 Open Stopcock (Titrate)'. Observe transient pink flashes.",
        hint: "Hold or click the valve control below the stage. Drip rate is fast initially, but prepare to slow down!",
        targetElement: "btn-valve-control",
        feedback: "Titrant delivered into the flask. Transient color flashes indicate the endpoint is near."
      },
      {
        stepIndex: 4,
        actionId: "reach_endpoint",
        prompt: "Step 5: Dropwise approach! Release the valve when a faint persistent pale pink color appears.",
        hint: "Stop adding titrant immediately when a faint permanent pale pink hue lasts at least 30 seconds. Avoid overshoot!",
        targetElement: "btn-valve-control",
        feedback: "Perfect! Faint pale pink stoichiometric endpoint reached and maintained for 30 seconds."
      },
      {
        stepIndex: 5,
        actionId: "read_volume",
        prompt: "Step 6: Record observation. Click the Burette Meniscus to read the illustrative volume at eye level.",
        hint: "Align your eye horizontally with the bottom of the curved meniscus to eliminate parallax error.",
        targetElement: "burette",
        feedback: "Illustrative titre volume recorded: 22.40 mL ± 0.05 mL. Titration successfully completed!"
      }
    ]
  },

  "filtration": {
    steps: [
      {
        stepIndex: 0,
        actionId: "seat_filter_paper",
        prompt: "Step 1: Seat filter paper. Click the Filter Paper to place it in the Funnel, then moisten it.",
        hint: "Moistening the paper with solvent creates an airtight hydraulic seal against the funnel wall.",
        targetElement: "filter-paper",
        feedback: "Filter paper cone seated and moistened. Airtight hydraulic seal established."
      },
      {
        stepIndex: 1,
        actionId: "align_stem",
        prompt: "Step 2: Position receiver. Click the Conical Flask so the funnel bevel tip touches the glass wall.",
        hint: "Touching the bevel tip to the inner vessel wall allows liquid to slide smoothly without splashing.",
        targetElement: "conical-flask",
        feedback: "Receiving vessel positioned with funnel tip resting against inner glass wall."
      },
      {
        stepIndex: 2,
        actionId: "decant_slurry",
        prompt: "Step 3: Decant mixture! Click or hold '🥣 Pour Slurry' to guide suspension down the glass rod.",
        hint: "Use surface tension along the stirring rod to direct liquid into the cone. Keep rate safe!",
        targetElement: "btn-pour-control",
        feedback: "Slurry poured smoothly along stirring rod without overflowing the filter rim."
      },
      {
        stepIndex: 3,
        actionId: "drain_filtrate",
        prompt: "Step 4: Gravity drainage. Watch clear liquid drain through cellulose pores into the receiver.",
        hint: "Hydrostatic head pressure drives the liquid phase (filtrate) through while solid residue is retained.",
        targetElement: "glass-funnel",
        feedback: "Filtration in progress: clear liquid collects in receiver; solid precipitate stays on paper cone."
      },
      {
        stepIndex: 4,
        actionId: "observe_residue",
        prompt: "Step 5: Inspection. Click the Filter Paper cone to inspect the isolated solid residue cake.",
        hint: "Notice that the liquid in the receiving flask is completely transparent. Dissolved salts remain in solution.",
        targetElement: "filter-paper",
        feedback: "Separation complete: insoluble solid residue isolated on paper; clear filtrate in receiver. Teaching note: filtration does not remove dissolved solutes."
      }
    ]
  },

  "paper-chromatography": {
    steps: [
      {
        stepIndex: 0,
        actionId: "draw_baseline",
        prompt: "Step 1: Draw origin line. Ensure '✏️ Pencil' is selected, then click the Paper Strip to mark baseline.",
        hint: "Always use an insoluble graphite pencil! Pen inks dissolve in mobile phase and ruin the chromatogram.",
        targetElement: "filter-paper",
        feedback: "Graphite baseline drawn 1.5 cm from bottom edge. Insoluble carbon line will not bleed."
      },
      {
        stepIndex: 1,
        actionId: "apply_sample_spot",
        prompt: "Step 2: Spot the sample. Click the Dropper to place a concentrated sample dot on the pencil baseline.",
        hint: "Keep the sample spot tiny (under 2–3 mm) so separated zones remain sharp and clear.",
        targetElement: "dropper",
        feedback: "Sample mixture applied neatly on the origin line and allowed to dry."
      },
      {
        stepIndex: 2,
        actionId: "add_solvent_check_level",
        prompt: "Step 3: Solvent check. Click the Beaker to verify solvent depth is strictly below the pencil baseline.",
        hint: "The solvent surface MUST stay below the pencil line so the spot does not dissolve into the beaker pool.",
        targetElement: "beaker",
        feedback: "Solvent reservoir filled to safe 0.8 cm depth, strictly below the pencil baseline."
      },
      {
        stepIndex: 3,
        actionId: "insert_strip_cover",
        prompt: "Step 4: Chamber development. Click the Watch Glass to suspend paper and cover the beaker.",
        hint: "Covering the beaker saturates internal vapor pressure, preventing non-uniform solvent evaporation.",
        targetElement: "watch-glass",
        feedback: "Chamber closed with watch glass lid. Mobile phase begins ascending cellulose fibers by capillary action."
      },
      {
        stepIndex: 4,
        actionId: "animate_separation",
        prompt: "Step 5: Capillary separation. Watch the mobile phase ascend and resolve solute components.",
        hint: "Components partition between stationary water film and moving solvent according to relative affinities.",
        targetElement: "filter-paper",
        feedback: "Chromatographic resolution achieved: yellow dye (low affinity), red dye (medium), blue dye (high affinity)."
      },
      {
        stepIndex: 5,
        actionId: "mark_solvent_front",
        prompt: "Step 6: Mark solvent front & calculate Rf. Click the Paper Strip before solvent reaches the top.",
        hint: "Immediately pencil-mark the solvent front before volatile solvent evaporates. Rf = Distance spot / Distance solvent.",
        targetElement: "filter-paper",
        feedback: "Solvent front marked! Illustrative Rf values: Blue = 0.82, Red = 0.55, Yellow = 0.28. Great job!"
      }
    ]
  },
  "ph-determination": {
  "experimentId": "ph-determination",
  "name": "pH Determination",
  "teachingNotes": "pH measurement quantifies the hydrogen ion activity (-log10[H+]). Test papers offer quick semi-quantitative estimates (±1 pH unit), while calibrated glass electrodes measure potentiometrically with high precision (±0.02 pH units).",
  "steps": [
    {
      "stepIndex": 0,
      "actionId": "select_method",
      "prompt": "Step 1: Choose measurement method. Select between 'pH Indicator Paper', 'Indicator Solution', or 'Calibrated pH Meter'.",
      "hint": "Click one of the method tabs on the workbench action bar to choose your analytical technique.",
      "targetElement": "method-selector",
      "completionText": "Method selected. In this lab, we will demonstrate indicator paper estimation and calibrated electrometric meter measurement."
    },
    {
      "stepIndex": 1,
      "actionId": "dip_test_paper",
      "prompt": "Step 2: Indicator Paper: Touch a drop of sample liquid onto the paper strip using a clean glass rod or dropper.",
      "hint": "Do NOT dunk the whole strip into the reagent stock! Touch a single drop onto the test paper using the glass stirring rod.",
      "targetElement": "glass-stirring-rod",
      "completionText": "Sample droplet transferred to indicator paper strip. Chemical dyes react and develop color."
    },
    {
      "stepIndex": 2,
      "actionId": "match_color_chart",
      "prompt": "Step 3: Compare against standard chart. Drag or select the matching color band to estimate pH.",
      "hint": "Compare the developed strip color against the standard reference chart under good lighting. Note: this provides an estimate only!",
      "targetElement": "color-chart",
      "completionText": "Color matched! Illustrative estimated pH: ~3.0 (Acidic). Indicator paper provides a fast screening estimate."
    },
    {
      "stepIndex": 3,
      "actionId": "calibrate_meter",
      "prompt": "Step 4: pH Meter: Rinse the combination electrode with wash bottle, then immerse in standard pH 7.0 buffer.",
      "hint": "Click 'Rinse & Calibrate' to rinse the electrode with distilled water and calibrate against standard buffer solution.",
      "targetElement": "btn-calibrate-meter",
      "completionText": "Electrode rinsed and calibrated against standard buffer (offset and slope calibrated per manufacturer protocol)."
    },
    {
      "stepIndex": 4,
      "actionId": "rinse_and_measure",
      "prompt": "Step 5: Rinse electrode with wash bottle and immerse in illustrative Sample A to take digital reading.",
      "hint": "Always rinse the electrode with distilled water between buffer and sample to prevent cross-contamination.",
      "targetElement": "btn-measure-sample",
      "completionText": "Illustrative digital pH reading stabilized: 2.85 ± 0.02. Technique verified!"
    }
  ],
  "mistakes": {
    "dunk_stock": {
      "message": "Contamination mistake: Never immerse test paper strips directly into the main sample bottle. Transfer a droplet using a clean glass rod or spot plate.",
      "penalty": 1
    },
    "skip_calibration": {
      "message": "Analytical error: Attempting to measure sample pH without first calibrating the meter against standard buffers yields uncalibrated, inaccurate readings.",
      "penalty": 1
    },
    "no_rinse": {
      "message": "Cross-contamination: Forgetting to rinse the electrode with distilled water carries over buffer salts into the sample, skewing the pH measurement.",
      "penalty": 1
    }
  }
},
  "standard-solution-preparation": {
  "experimentId": "standard-solution-preparation",
  "name": "Preparation of a Standard Solution",
  "teachingNotes": "A standard solution requires quantitative transfer of accurately weighed primary standard into a calibrated volumetric flask, dissolved and brought to the meniscus calibration mark at 20°C.",
  "steps": [
    {
      "stepIndex": 0,
      "actionId": "weigh_primary_standard",
      "prompt": "Step 1: Weigh solid. Place weighing boat on the balance, press 'Tare / Zero', then add solid using the spatula.",
      "hint": "Tare the balance with the boat on the pan first. The digital mass display shows an illustrative value (e.g. 2.1200 g).",
      "targetElement": "analytical-balance",
      "completionText": "Analytical balance tared and illustrative solid mass recorded: 2.1200 g ± 0.0001 g."
    },
    {
      "stepIndex": 1,
      "actionId": "dissolve_in_beaker",
      "prompt": "Step 2: Dissolve in beaker. Transfer solid into a beaker, add ~30 mL distilled water, and stir with glass rod.",
      "hint": "Always dissolve solids in a beaker first! Never pour dry solid powder directly into a narrow volumetric flask neck.",
      "targetElement": "beaker",
      "completionText": "Solid completely dissolved in beaker with distilled water; solution is clear and uniform."
    },
    {
      "stepIndex": 2,
      "actionId": "quantitative_transfer",
      "prompt": "Step 3: Quantitative transfer. Insert funnel into volumetric flask, pour solution along glass rod, and rinse.",
      "hint": "Rinse beaker, glass rod, and funnel 3 times with wash bottle to ensure zero analyte is left behind.",
      "targetElement": "volumetric-flask",
      "completionText": "Solution quantitatively transferred into volumetric flask along stirring rod; rinsings collected."
    },
    {
      "stepIndex": 3,
      "actionId": "fill_near_mark",
      "prompt": "Step 4: Dilute near mark. Add distilled water from wash bottle until liquid is ~1 cm below the calibration line.",
      "hint": "Stop bulk addition below the etched line to avoid accidentally overshooting the calibrated volume.",
      "targetElement": "wash-bottle",
      "completionText": "Volumetric flask filled with solvent to approximately 1 cm below neck calibration line."
    },
    {
      "stepIndex": 4,
      "actionId": "meniscus_adjustment",
      "prompt": "Step 5: Meniscus mini-game! Click the Dropper to add final drops until bottom of meniscus touches mark.",
      "hint": "Align eye level horizontally with the calibration line. Deliver drop-by-drop until bottom of meniscus aligns exactly.",
      "targetElement": "dropper",
      "completionText": "Calibration mark reached! Curved liquid meniscus rests precisely on the ring mark at eye level."
    },
    {
      "stepIndex": 5,
      "actionId": "stopper_and_invert",
      "prompt": "Step 6: Invert to mix. Insert ground-glass stopper and invert flask repeatedly to achieve uniform concentration.",
      "hint": "Hold stopper firmly with thumb and index finger, then invert the flask 10 times to ensure thorough homogeneity.",
      "targetElement": "volumetric-flask",
      "completionText": "Standard solution inverted and thoroughly homogenized. Prepared solution is ready for analysis!"
    }
  ],
  "mistakes": {
    "direct_flask_pour": {
      "message": "Technique error: Never pour dry solid directly into a volumetric flask! Solid cakes in the narrow neck and resists dissolving. Always dissolve in a beaker first.",
      "penalty": 1
    },
    "overshoot_mark": {
      "message": "Irreversible error: Meniscus rose above the etched calibration mark! The solution is over-diluted and concentration is ruined. In real practice you must discard and re-weigh.",
      "penalty": 1
    },
    "untared_balance": {
      "message": "Measurement error: Solid was added to the weighing boat without pressing Tare, introducing the mass of the plastic boat into the reading.",
      "penalty": 1
    }
  }
},
  "simple-distillation": {
  "experimentId": "simple-distillation",
  "name": "Simple Distillation",
  "teachingNotes": "Simple distillation separates liquids with significantly different boiling points (>40–50°C difference). Key safeguards: open system (never closed), proper condenser water counter-current flow, and stopping before boiling to dryness.",
  "steps": [
    {
      "stepIndex": 0,
      "actionId": "assemble_glassware",
      "prompt": "Step 1: Assemble distillation rig. Mount round-bottom flask, distillation head, condenser, and receiver.",
      "hint": "Ensure boiling chips are in the flask and all ground-glass joints are seated snug and greased/clamped.",
      "targetElement": "distillation-apparatus",
      "completionText": "Glassware securely assembled with clamps on retort stand; boiling chips present."
    },
    {
      "stepIndex": 1,
      "actionId": "verify_open_system",
      "prompt": "Step 2: Safety check. Inspect thermometer bulb position and verify system is OPEN to the atmosphere.",
      "hint": "Thermometer bulb must sit at the side-arm outlet. The receiving adapter must be vented; NEVER heat a closed sealed system!",
      "targetElement": "thermometer",
      "completionText": "Thermometer bulb positioned at side-arm; adapter vent confirmed open to prevent dangerous pressure build-up."
    },
    {
      "stepIndex": 2,
      "actionId": "connect_cooling_water",
      "prompt": "Step 3: Connect condenser water hoses. Connect Water IN at the bottom and Water OUT at the top.",
      "hint": "Water must enter at the lower jacket port and exit from the upper port to ensure the jacket fills completely without air bubbles.",
      "targetElement": "condenser",
      "completionText": "Counter-current cooling water connected and running smoothly without air pockets."
    },
    {
      "stepIndex": 3,
      "actionId": "apply_heat",
      "prompt": "Step 4: Heat gently. Turn on the hot plate to begin vaporization of the lower-boiling liquid fraction.",
      "hint": "Adjust heat to achieve steady boiling. Thermometer displays an illustrative temperature plateau (~78°C).",
      "targetElement": "hot-plate",
      "completionText": "Steady vapor reflux established; vapor condenses into liquid drops dripping into the receiver flask."
    },
    {
      "stepIndex": 4,
      "actionId": "stop_before_dryness",
      "prompt": "Step 5: Collect distillate & stop before dryness! Turn off heat when ~5 mL residue remains.",
      "hint": "NEVER distill to complete dryness! Residual tars can decompose, shatter glass, or concentrate explosive peroxides.",
      "targetElement": "btn-stop-heat",
      "completionText": "Heat turned off safely leaving non-volatile residue in the boiling flask; distillate collected in receiver."
    },
    {
      "stepIndex": 5,
      "actionId": "shutdown_sequence",
      "prompt": "Step 6: Cool and shutdown. Allow the apparatus to cool to room temperature before turning off water.",
      "hint": "Always remove heat first, let the glassware cool, and finally turn off the condenser cooling water.",
      "targetElement": "btn-shutdown",
      "completionText": "Apparatus safely cooled and shutdown completed. Distillate fraction isolated!"
    }
  ],
  "mistakes": {
    "sealed_system": {
      "message": "CATASTROPHIC HAZARD: Attempted to heat a closed/sealed distillation assembly! Thermal expansion will generate severe internal pressure and cause explosive glassware rupture. Always ensure the system is vented to atmosphere.",
      "penalty": 1
    },
    "wrong_water_direction": {
      "message": "Cooling defect: Connecting water in at the top causes water to run down one side leaving a large air pocket, drastically reducing condensation efficiency.",
      "penalty": 1
    },
    "distill_to_dryness": {
      "message": "Thermal hazard: Distilling to dryness causes severe overheating of the empty flask bottom, risking glass cracking and thermal ignition of concentrated peroxide residues.",
      "penalty": 1
    }
  }
},
  "recrystallization": {
  "experimentId": "recrystallization",
  "name": "Crystallization and Recrystallization",
  "teachingNotes": "Recrystallization purifies crystalline organic compounds based on solubility differences in hot vs cold solvent. Impurities are either insoluble in hot solvent (filtered hot) or remain dissolved in cold solvent after crystallization.",
  "steps": [
    {
      "stepIndex": 0,
      "actionId": "dissolve_minimal_solvent",
      "prompt": "Step 1: Dissolve crude solid. Heat flask on hot plate and add boiling solvent incrementally until dissolved.",
      "hint": "Add solvent in minimal portions while swirling on hot plate until the solute just dissolves. Do NOT add too much!",
      "targetElement": "hot-plate",
      "completionText": "Crude solid dissolved in the minimum volume of boiling solvent; solution is saturated at elevated temperature."
    },
    {
      "stepIndex": 1,
      "actionId": "hot_filtration",
      "prompt": "Step 2: Hot filtration. Pour hot solution through a pre-warmed fluted filter to remove insoluble dust.",
      "hint": "Pre-warm the funnel and flask so premature crystallization does not block the filter paper pores during transfer.",
      "targetElement": "glass-funnel",
      "completionText": "Insoluble particulates trapped on filter paper; clear hot saturated solution collected in conical flask."
    },
    {
      "stepIndex": 2,
      "actionId": "slow_cooling",
      "prompt": "Step 3: Slow cooling mini-game! Remove flask from heat and let it cool undisturbed at room temperature.",
      "hint": "Undisturbed slow cooling allows solute molecules to arrange into large, highly ordered, pure crystal lattices.",
      "targetElement": "conical-flask",
      "completionText": "Slow room-temperature cooling complete; pure crystal prisms have nucleated and grown steadily."
    },
    {
      "stepIndex": 3,
      "actionId": "ice_bath_chill",
      "prompt": "Step 4: Ice bath chill. Place the cooled flask into an ice-water bath to maximize crystal yield.",
      "hint": "Chilling after room-temperature crystallization drives down solute solubility to maximize recovered crystalline yield.",
      "targetElement": "beaker",
      "completionText": "Solution chilled in ice bath; crystallization completed with high yield."
    },
    {
      "stepIndex": 4,
      "actionId": "vacuum_filtration_wash",
      "prompt": "Step 5: Isolate crystals. Filter using Büchner funnel, then wash with a small portion of ICE-COLD solvent.",
      "hint": "Wash with ice-cold solvent to displace yellow mother liquor without redissolving your pure crystals.",
      "targetElement": "buchner-funnel",
      "completionText": "Crystals isolated on filter paper; washed with ice-cold solvent and air-dried under gentle suction."
    },
    {
      "stepIndex": 5,
      "actionId": "microscope_observation",
      "prompt": "Step 6: Crystal habit observation. Examine crystal morphology under the microscope to evaluate purity.",
      "hint": "Pure recrystallized product shows clean, defined prismatic crystal needles free from occluded impurity particles.",
      "targetElement": "microscope",
      "completionText": "Microscopic examination reveals sharp, uniform prismatic crystals. Recrystallization procedure complete!"
    }
  ],
  "mistakes": {
    "excess_solvent": {
      "message": "Dilution error: Adding too much solvent prevents saturation upon cooling! Crystals will fail to nucleate or yield will be severely compromised. Always add the minimum volume of boiling solvent.",
      "penalty": 1
    },
    "rapid_ice_plunge": {
      "message": "Crystallization defect: Plunging hot solution directly into ice induces flash precipitation, trapping impure mother liquor inside tiny irregular crystal aggregates instead of forming pure crystal lattices.",
      "penalty": 1
    },
    "warm_wash": {
      "message": "Yield loss: Washing crystals with room-temperature or warm solvent redissolves the product into the filtrate waste. Always use minimal ice-cold solvent.",
      "penalty": 1
    }
  }
},
  "ph-metric-titration": {
  "experimentId": "ph-metric-titration",
  "name": "pH-Metric Titration",
  "teachingNotes": "pH-metric titration monitors electrometric pH as a function of delivered titrant volume. The inflection point on the sigmoidal titration curve identifies the exact stoichiometric equivalence point without relying on visual indicator color transitions.",
  "steps": [
    {
      "stepIndex": 0,
      "actionId": "calibrate_and_assemble",
      "prompt": "Step 1: Setup & calibration. Calibrate the pH meter with standard buffers and lower electrode into beaker.",
      "hint": "Immerse the combination glass electrode into analyte on the magnetic stirrer, ensuring the stir bar rotates freely.",
      "targetElement": "laboratory-ph-meter",
      "completionText": "pH meter calibrated; glass electrode safely positioned in analyte beaker above rotating stir bar."
    },
    {
      "stepIndex": 1,
      "actionId": "record_initial_ph",
      "prompt": "Step 2: Initial measurement. Record initial analyte pH before adding any titrant (V = 0.00 mL).",
      "hint": "Check the digital pH meter readout with continuous magnetic stirring. Initial pH point is plotted on the live curve.",
      "targetElement": "btn-plot-point",
      "completionText": "Initial baseline reading recorded (V = 0.00 mL, illustrative pH = 2.80). Live graph initialized."
    },
    {
      "stepIndex": 2,
      "actionId": "titrate_buffer_region",
      "prompt": "Step 3: Titrate buffer region. Add titrant in 1.0–2.0 mL portions and plot data points on the live graph.",
      "hint": "In the flat buffer region, pH changes gradually. Add 1.0–2.0 mL increments and record the reading after each addition.",
      "targetElement": "btn-add-increment",
      "completionText": "Titrant delivered through buffer zone; steady gradual pH rise plotted on sigmoidal curve."
    },
    {
      "stepIndex": 3,
      "actionId": "dropwise_steep_region",
      "prompt": "Step 4: Steep inflection zone! Near the equivalence point, deliver titrant dropwise in 0.1–0.2 mL portions.",
      "hint": "pH changes sharply near the equivalence point (pH 4 to 10). Add very small increments (0.1–0.2 mL) to locate the inflection point accurately!",
      "targetElement": "btn-add-dropwise",
      "completionText": "Dropwise additions recorded across the steep inflection region. S-curve inflection point captured!"
    },
    {
      "stepIndex": 4,
      "actionId": "identify_equivalence_point",
      "prompt": "Step 5: Identify equivalence point. Click on the steepest inflection point on the titration curve graph.",
      "hint": "The equivalence point corresponds to the maximum first derivative (dpH/dV) on the sigmoidal curve.",
      "targetElement": "ph-curve-graph",
      "completionText": "Equivalence point identified at V_eq = 22.40 mL (illustrative pH = 8.40). Potentiometric analysis complete!"
    }
  ],
  "mistakes": {
    "coarse_steep_addition": {
      "message": "Analytical flaw: Delivered a large 2.0–5.0 mL jump directly across the steep inflection region! In pH-metric titration, large increments obscure the inflection point, making accurate determination of the equivalence volume impossible.",
      "penalty": 1
    },
    "stirrer_electrode_impact": {
      "message": "Equipment hazard: Lowering the glass electrode too far into the beaker causes the spinning magnetic stir bar to collide with the fragile glass bulb, risking breakage. Always maintain at least 5 mm clearance.",
      "penalty": 1
    },
    "unrinsed_electrode": {
      "message": "Contamination: Inserting unrinsed electrode into analyte introduces foreign ions and disturbs the ionic strength of the solution.",
      "penalty": 1
    }
  }
}
};

// ==============================================================================
// APPLICATION & GAME STATE MACHINE
// ==============================================================================

let activeExperimentId = "acid-base-titration";
function setActiveExperimentId(id) {
  activeExperimentId = id;
}
window.setActiveExperimentId = setActiveExperimentId;
let selectedApparatusKey = null;
let experimentsData = SIMULATOR_EXPERIMENTS;
let equipmentDatabase = [];
let equipmentRolesMap = {};

// Game Engine State (Step Gating, Mistakes, Hints, Stars)
const gameState = {
  stepIndex: 0,
  stars: 3,
  mistakesCount: 0,
  completedActions: new Set(),
  // Experiment 1 State
  titration: {
    standAssembled: false,
    bubbleCleared: false,
    indicatorAdded: false,
    valveOpen: false,
    flowRate: "fast", // 'fast' | 'dropwise'
    volumeDelivered: 0.0, // 0 to 26 mL
    endpointReached: false,
    overshot: false
  },
  // Experiment 2 State
  filtration: {
    paperSeated: false,
    moistened: false,
    stemPositioned: false,
    pourRate: "safe", // 'safe' | 'fast'
    slurryAmount: 0.0, // 0 to 1
    overflowed: false,
    filtrateCollected: 0.0
  },
  // Experiment 3 State
  chromatography: {
    chosenTool: "pencil", // 'pencil' | 'pen'
    baselineDrawn: false,
    spotPlaced: false,
    solventDepth: "safe", // 'safe' | 'excess'
    chamberCovered: false,
    separationProgress: 0.0,
    frontMarked: false
  },
  // Experiment 4 State
  phDetermination: {
    method: "paper", // 'paper' | 'meter'
    sampleDropletPlaced: false,
    matchedPh: null,
    meterCalibrated: false,
    electrodeRinsed: false,
    digitalReading: null
  },
  // Experiment 5 State
  standardSolution: {
    boatOnBalance: true,
    balanceTared: false,
    solidWeighed: false,
    massValue: "0.0000",
    dissolvedInBeaker: false,
    funnelSeated: false,
    quantitativelyTransferred: false,
    filledNearMark: false,
    meniscusZoom: false,
    meniscusLevel: 0.85,
    meniscusLocked: false,
    stoppered: false,
    invertedCount: 0
  },
  // Experiment 6 State
  distillation: {
    assembled: false,
    openSystemVerified: false,
    waterConnected: false,
    waterFlow: "correct", // 'correct' | 'wrong'
    heatingActive: false,
    tempC: 24,
    vaporRising: false,
    distillateDrops: 0,
    stoppedBeforeDryness: false,
    shutdownComplete: false
  },
  // Experiment 7 State
  recrystallization: {
    solventPortion: "minimal", // 'minimal' | 'excess'
    solidDissolved: false,
    hotFiltered: false,
    coolingMode: "slow", // 'slow' | 'flash_ice'
    slowCoolingComplete: false,
    iceBathChilled: false,
    vacuumFiltered: false,
    coldWashed: false,
    crystalsObserved: false
  },
  // Experiment 8 State
  phMetric: {
    calibrated: false,
    electrodePositioned: false,
    volumeAdded: 0.0,
    currentPh: 2.80,
    dataPoints: [{ v: 0.0, ph: 2.80 }],
    steepDropwise: true,
    equivalenceMarked: false
  }
};

// Passive Timeline Animation State
const animState = {
  isRunning: false,
  progress: 0.0,
  rafId: null,
  lastTimestamp: 0
};

// ==============================================================================
// INITIALIZATION
// ==============================================================================

document.addEventListener("DOMContentLoaded", async () => {
  await tryFetchLiveDatabase();
  initExperimentSelector();
  initTabNavigation();
  initPlaybackControls();
  initInspectorControls();
  initGameControlButtons();
  resetGameState();
  renderCurrentExperiment();
});

// Try fetching live databases if running on HTTP server
async function tryFetchLiveDatabase() {
  try {
    const [expResp, eqResp, rolesResp] = await Promise.allSettled([
      fetch("./data/experiments.json"),
      fetch("./equipment-db/equipment.json"),
      fetch("./simulator/equipmentRoles.json")
    ]);

    if (expResp.status === "fulfilled" && expResp.value.ok) {
      const liveList = await expResp.value.json();
      liveList.forEach(exp => {
        if (SIMULATOR_EXPERIMENTS[exp.id]) {
          const curatedQuiz = SIMULATOR_EXPERIMENTS[exp.id].quiz;
          experimentsData[exp.id] = {
            ...exp,
            quiz: curatedQuiz
          };
        }
      });
    }

    if (eqResp.status === "fulfilled" && eqResp.value.ok) {
      equipmentDatabase = await eqResp.value.json();
    }

    if (rolesResp.status === "fulfilled" && rolesResp.value.ok) {
      equipmentRolesMap = await rolesResp.value.json();
    }
  } catch (e) {
    console.info("Using embedded datasets for standalone preview.");
  }
}

// Initialize Experiment Selector
function initExperimentSelector() {
  const select = document.getElementById("experiment-select");
  if (!select) return;

  select.addEventListener("change", (e) => {
    pauseAnimation();
    activeExperimentId = e.target.value;
    resetGameState();
    renderCurrentExperiment();
  });
}

// Initialize Tab Navigation
function initTabNavigation() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const targetTabId = btn.getAttribute("data-tab");
      document.querySelectorAll(".tab-pane").forEach(pane => {
        pane.classList.remove("active");
      });
      const activePane = document.getElementById(targetTabId);
      if (activePane) activePane.classList.add("active");
    });
  });
}

// Initialize Playback Controls
function initPlaybackControls() {
  const controlButtons = document.querySelectorAll(".btn-ctrl");
  controlButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const actionName = btn.getAttribute("data-action");
      switch (actionName) {
        case "start":
          startAnimation();
          break;
        case "pause":
          pauseAnimation();
          break;
        case "reset":
          resetAnimation();
          break;
        case "prev":
          stepPrev();
          break;
        case "next":
          stepNext();
          break;
      }
    });
  });
}

// Initialize Inspector Close Button
function initInspectorControls() {
  const btnClose = document.getElementById("btn-close-inspector");
  if (btnClose) {
    btnClose.addEventListener("click", () => {
      dismissInspector();
    });
  }
}

// Initialize Hint and Skip Buttons
function initGameControlButtons() {
  const btnHint = document.getElementById("btn-hint");
  if (btnHint) {
    btnHint.addEventListener("click", showHint);
  }

  const btnSkip = document.getElementById("btn-skip-step");
  if (btnSkip) {
    btnSkip.addEventListener("click", skipStep);
  }
}

// ==============================================================================
// GAME STATE MANAGEMENT & STEP GATING ENGINE
// ==============================================================================

function resetGameState() {
  pauseAnimation();
  gameState.stepIndex = 0;
  gameState.stars = 3;
  gameState.mistakesCount = 0;
  gameState.completedActions.clear();
  selectedApparatusKey = null;

  // Reset Experiment 1
  gameState.titration.standAssembled = false;
  gameState.titration.bubbleCleared = false;
  gameState.titration.indicatorAdded = false;
  gameState.titration.valveOpen = false;
  gameState.titration.flowRate = "fast";
  gameState.titration.volumeDelivered = 0.0;
  gameState.titration.endpointReached = false;
  gameState.titration.overshot = false;

  // Reset Experiment 2
  gameState.filtration.paperSeated = false;
  gameState.filtration.moistened = false;
  gameState.filtration.stemPositioned = false;
  gameState.filtration.pourRate = "safe";
  gameState.filtration.slurryAmount = 0.0;
  gameState.filtration.overflowed = false;
  gameState.filtration.filtrateCollected = 0.0;

  // Reset Experiment 3
  gameState.chromatography.chosenTool = "pencil";
  gameState.chromatography.baselineDrawn = false;
  gameState.chromatography.spotPlaced = false;
  gameState.chromatography.solventDepth = "safe";
  gameState.chromatography.chamberCovered = false;
  gameState.chromatography.separationProgress = 0.0;
  gameState.chromatography.frontMarked = false;

  // Reset Experiment 4
  gameState.phDetermination.method = "paper";
  gameState.phDetermination.sampleDropletPlaced = false;
  gameState.phDetermination.matchedPh = null;
  gameState.phDetermination.meterCalibrated = false;
  gameState.phDetermination.electrodeRinsed = false;
  gameState.phDetermination.digitalReading = null;

  // Reset Experiment 5
  gameState.standardSolution.boatOnBalance = true;
  gameState.standardSolution.balanceTared = false;
  gameState.standardSolution.solidWeighed = false;
  gameState.standardSolution.massValue = "0.0000";
  gameState.standardSolution.dissolvedInBeaker = false;
  gameState.standardSolution.funnelSeated = false;
  gameState.standardSolution.quantitativelyTransferred = false;
  gameState.standardSolution.filledNearMark = false;
  gameState.standardSolution.meniscusZoom = false;
  gameState.standardSolution.meniscusLevel = 0.85;
  gameState.standardSolution.meniscusLocked = false;
  gameState.standardSolution.stoppered = false;
  gameState.standardSolution.invertedCount = 0;

  // Reset Experiment 6
  gameState.distillation.assembled = false;
  gameState.distillation.openSystemVerified = false;
  gameState.distillation.waterConnected = false;
  gameState.distillation.waterFlow = "correct";
  gameState.distillation.heatingActive = false;
  gameState.distillation.tempC = 24;
  gameState.distillation.vaporRising = false;
  gameState.distillation.distillateDrops = 0;
  gameState.distillation.stoppedBeforeDryness = false;
  gameState.distillation.shutdownComplete = false;

  // Reset Experiment 7
  gameState.recrystallization.solventPortion = "minimal";
  gameState.recrystallization.solidDissolved = false;
  gameState.recrystallization.hotFiltered = false;
  gameState.recrystallization.coolingMode = "slow";
  gameState.recrystallization.slowCoolingComplete = false;
  gameState.recrystallization.iceBathChilled = false;
  gameState.recrystallization.vacuumFiltered = false;
  gameState.recrystallization.coldWashed = false;
  gameState.recrystallization.crystalsObserved = false;

  // Reset Experiment 8
  gameState.phMetric.calibrated = false;
  gameState.phMetric.electrodePositioned = false;
  gameState.phMetric.volumeAdded = 0.0;
  gameState.phMetric.currentPh = 2.80;
  gameState.phMetric.dataPoints = [{ v: 0.0, ph: 2.80 }];
  gameState.phMetric.steepDropwise = true;
  gameState.phMetric.equivalenceMarked = false;

  animState.progress = 0.0;

  hideMistake();
  hideHint();
  updateStarsIndicator();
  resetQuizState();
}

function updateStarsIndicator() {
  const indicator = document.getElementById("stars-indicator");
  if (!indicator) return;
  const stars = Math.max(1, Math.min(3, gameState.stars));
  indicator.textContent = "⭐".repeat(stars);
  indicator.title = `${stars} / 3 Stars (${gameState.mistakesCount} mistakes)`;
}

function showMistake(message) {
  gameState.mistakesCount++;
  gameState.stars = Math.max(1, gameState.stars - 1);
  updateStarsIndicator();

  const banner = document.getElementById("mistake-feedback-banner");
  const textEl = document.getElementById("mistake-feedback-text");
  if (banner && textEl) {
    textEl.textContent = message;
    banner.classList.add("show");
  }
}

function hideMistake() {
  const banner = document.getElementById("mistake-feedback-banner");
  if (banner) banner.classList.remove("show");
}

function showHint() {
  const expConfig = EXPERIMENT_CONTENT[activeExperimentId];
  if (!expConfig) return;
  const currentStep = expConfig.steps[gameState.stepIndex];
  if (!currentStep) return;

  const hintBanner = document.getElementById("hint-banner");
  const hintText = document.getElementById("hint-text");
  if (hintBanner && hintText) {
    hintText.textContent = currentStep.hint;
    hintBanner.classList.add("show");
  }
}

function hideHint() {
  const hintBanner = document.getElementById("hint-banner");
  if (hintBanner) hintBanner.classList.remove("show");
}

function skipStep() {
  const expConfig = EXPERIMENT_CONTENT[activeExperimentId];
  if (!expConfig) return;

  if (gameState.stepIndex < expConfig.steps.length - 1) {
    gameState.stepIndex++;
    animState.progress = gameState.stepIndex / (expConfig.steps.length - 1);
    hideMistake();
    hideHint();
    applyAnimationProgress(activeExperimentId, animState.progress);
    updateStepGuideDisplay();
    renderSceneControls(activeExperimentId);
  }
}

// Central Interactive Dispatcher
window.onApparatusClick = function(itemKey) {
  // 1. Always inspect clicked equipment
  selectApparatus(itemKey);

  // 2. Process game step action
  handleGameAction(itemKey);
};

// Main Game Action Handler with Step Gating
window.handleGameAction = function(actionId) {
  hideMistake();
  hideHint();

  const expConfig = EXPERIMENT_CONTENT[activeExperimentId];
  if (!expConfig) return;
  const currentStep = expConfig.steps[gameState.stepIndex];
  if (!currentStep) return;

  // Check if action matches current step's target
  const isMatch = (actionId === currentStep.actionId || actionId === currentStep.targetElement);

  if (activeExperimentId === "acid-base-titration") {
    handleTitrationAction(actionId, isMatch);
  } else if (activeExperimentId === "filtration") {
    handleFiltrationAction(actionId, isMatch);
  } else if (activeExperimentId === "paper-chromatography") {
    handleChromatographyAction(actionId, isMatch);
  } else if (activeExperimentId === "ph-determination") {
    handlePhDeterminationAction(actionId, isMatch);
  } else if (activeExperimentId === "standard-solution-preparation") {
    handleStandardSolutionAction(actionId, isMatch);
  } else if (activeExperimentId === "simple-distillation") {
    handleDistillationAction(actionId, isMatch);
  } else if (activeExperimentId === "recrystallization") {
    handleRecrystallizationAction(actionId, isMatch);
  } else if (activeExperimentId === "ph-metric-titration") {
    handlePhMetricAction(actionId, isMatch);
  }
};

// Titration Action Logic
function handleTitrationAction(actionId, isMatch) {
  if (gameState.stepIndex === 0) {
    if (actionId === "retort-stand" || actionId === "clamp-and-boss-head" || actionId === "assemble_stand") {
      gameState.titration.standAssembled = true;
      advanceGameStep();
    } else {
      showMistake("Assemble the retort stand and clamp first to hold the burette stably.");
    }
  } else if (gameState.stepIndex === 1) {
    if (actionId === "burette" || actionId === "fill_burette_remove_bubble" || actionId === "btn-clear-bubble") {
      gameState.titration.bubbleCleared = true;
      advanceGameStep();
    } else {
      showMistake("Expel the trapped air bubble from the burette tip before continuing.");
    }
  } else if (gameState.stepIndex === 2) {
    if (actionId === "dropper" || actionId === "conical-flask" || actionId === "add_analyte_indicator" || actionId === "btn-add-indicator") {
      gameState.titration.indicatorAdded = true;
      advanceGameStep();
    } else {
      showMistake("Add indicator drops to the analyte flask before opening the burette stopcock.");
    }
  } else if (gameState.stepIndex === 3 || gameState.stepIndex === 4) {
    if (actionId === "run_titration" || actionId === "btn-valve-control" || actionId === "reach_endpoint") {
      toggleTitrationDrip();
    }
  } else if (gameState.stepIndex === 5) {
    if (actionId === "burette" || actionId === "read_volume") {
      advanceGameStep();
    }
  }
}

// Filtration Action Logic
function handleFiltrationAction(actionId, isMatch) {
  if (gameState.stepIndex === 0) {
    if (actionId === "filter-paper" || actionId === "glass-funnel" || actionId === "seat_filter_paper" || actionId === "btn-seat-paper") {
      gameState.filtration.paperSeated = true;
      gameState.filtration.moistened = true;
      advanceGameStep();
    } else {
      showMistake("Fold and seat the filter paper into the funnel first.");
    }
  } else if (gameState.stepIndex === 1) {
    if (actionId === "conical-flask" || actionId === "align_stem" || actionId === "btn-align-stem") {
      gameState.filtration.stemPositioned = true;
      advanceGameStep();
    } else {
      showMistake("Position the receiving flask beneath the funnel stem to catch filtrate.");
    }
  } else if (gameState.stepIndex === 2) {
    if (actionId === "decant_slurry" || actionId === "btn-pour-control" || actionId === "beaker" || actionId === "glass-stirring-rod") {
      if (gameState.filtration.pourRate === "fast") {
        gameState.filtration.overflowed = true;
        showMistake("Overflow warning! Slurry poured too fast and rose above the filter paper rim! Unfiltered liquid bypassed the filter.");
      } else {
        gameState.filtration.slurryAmount = 1.0;
        advanceGameStep();
      }
    }
  } else if (gameState.stepIndex === 3) {
    advanceGameStep();
  } else if (gameState.stepIndex === 4) {
    if (actionId === "filter-paper" || actionId === "observe_residue") {
      advanceGameStep();
    }
  }
}

// Paper Chromatography Action Logic
function handleChromatographyAction(actionId, isMatch) {
  if (gameState.stepIndex === 0) {
    if (actionId === "btn-choice-pen") {
      gameState.chromatography.chosenTool = "pen";
      showMistake("Mistake! Ballpoint pen ink dissolves in the mobile phase and runs up the paper, masking your sample! Always use an insoluble graphite pencil.");
      renderSceneControls(activeExperimentId);
    } else if (actionId === "btn-choice-pencil") {
      gameState.chromatography.chosenTool = "pencil";
      renderSceneControls(activeExperimentId);
    } else if (actionId === "filter-paper" || actionId === "draw_baseline" || actionId === "pencil") {
      if (gameState.chromatography.chosenTool === "pen") {
        showMistake("Cannot draw baseline with ink pen! Select '✏️ Graphite Pencil' first.");
      } else {
        gameState.chromatography.baselineDrawn = true;
        advanceGameStep();
      }
    }
  } else if (gameState.stepIndex === 1) {
    if (actionId === "dropper" || actionId === "apply_sample_spot") {
      gameState.chromatography.spotPlaced = true;
      advanceGameStep();
    } else {
      showMistake("Apply a tiny sample spot onto the graphite baseline using the dropper.");
    }
  } else if (gameState.stepIndex === 2) {
    if (actionId === "btn-depth-toggle") {
      gameState.chromatography.solventDepth = (gameState.chromatography.solventDepth === "safe") ? "excess" : "safe";
      if (gameState.chromatography.solventDepth === "excess") {
        showMistake("Mistake! The solvent level submerged the baseline! The sample spot will dissolve directly into the reservoir pool instead of climbing the paper.");
      }
      renderSceneControls(activeExperimentId);
    } else if (actionId === "beaker" || actionId === "add_solvent_check_level") {
      if (gameState.chromatography.solventDepth === "excess") {
        showMistake("Adjust solvent depth to 'Safe (0.8 cm)' before lowering the paper!");
      } else {
        advanceGameStep();
      }
    }
  } else if (gameState.stepIndex === 3) {
    if (actionId === "watch-glass" || actionId === "insert_strip_cover" || actionId === "btn-cover-chamber") {
      gameState.chromatography.chamberCovered = true;
      advanceGameStep();
    } else {
      showMistake("Cover the developing chamber with the watch glass to ensure saturated solvent vapor.");
    }
  } else if (gameState.stepIndex === 4) {
    advanceGameStep();
  } else if (gameState.stepIndex === 5) {
    if (actionId === "filter-paper" || actionId === "mark_solvent_front" || actionId === "btn-mark-front") {
      gameState.chromatography.frontMarked = true;
      advanceGameStep();
    }
  }
}

// Advance game step safely
function advanceGameStep() {
  const expConfig = EXPERIMENT_CONTENT[activeExperimentId];
  if (!expConfig) return;

  hideMistake();
  hideHint();

  if (gameState.stepIndex < expConfig.steps.length - 1) {
    gameState.stepIndex++;
    animState.progress = gameState.stepIndex / (expConfig.steps.length - 1);
  } else {
    // Experiment complete!
    animState.progress = 1.0;
  }

  applyAnimationProgress(activeExperimentId, animState.progress);
  updateStepGuideDisplay();
  renderSceneControls(activeExperimentId);
}

// Titration Stopcock Valve Delivery Loop
let dripInterval = null;

function toggleTitrationDrip() {
  if (dripInterval) {
    stopTitrationDrip();
  } else {
    startTitrationDrip();
  }
}

function startTitrationDrip() {
  if (dripInterval) return;
  gameState.titration.valveOpen = true;

  const btnValve = document.getElementById("btn-valve-control");
  if (btnValve) btnValve.textContent = "⏸ Close Stopcock";

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const increment = (gameState.titration.flowRate === "fast") ? 0.6 : 0.15;
  const intervalSpeed = isReducedMotion ? 400 : 80;

  dripInterval = setInterval(() => {
    gameState.titration.volumeDelivered += increment;

    // Check endpoint (~22.4 mL)
    if (gameState.titration.volumeDelivered >= 22.0 && gameState.titration.volumeDelivered <= 23.5) {
      gameState.titration.endpointReached = true;
      if (gameState.stepIndex === 3) {
        gameState.stepIndex = 4;
      }
    }

    // Check overshoot (> 24.5 mL)
    if (gameState.titration.volumeDelivered > 24.5) {
      gameState.titration.overshot = true;
      stopTitrationDrip();
      showMistake("Overshoot! Titrant was added past the stoichiometric equivalence point. Indicator has turned dark magenta. Titrate dropwise near the endpoint. Click Reset to retry.");
    }

    const maxVol = 25.0;
    animState.progress = Math.min(1.0, gameState.titration.volumeDelivered / maxVol);
    applyAnimationProgress(activeExperimentId, animState.progress);
    updateStepGuideDisplay();
  }, intervalSpeed);
}

function stopTitrationDrip() {
  if (dripInterval) {
    clearInterval(dripInterval);
    dripInterval = null;
  }
  gameState.titration.valveOpen = false;

  const btnValve = document.getElementById("btn-valve-control");
  if (btnValve) btnValve.textContent = "💧 Open Stopcock (Titrate)";

  if (gameState.titration.endpointReached && !gameState.titration.overshot && gameState.stepIndex === 4) {
    advanceGameStep();
  }
}

// ==============================================================================
// SCENE ACTION CONTROLS BAR (Interactive Game Buttons)
// ==============================================================================

function renderSceneControls(expId) {
  const container = document.getElementById("scene-custom-controls");
  if (!container) return;

  if (expId === "acid-base-titration") {
    const isDropwise = (gameState.titration.flowRate === "dropwise");
    container.innerHTML = `
      <button id="btn-valve-control" class="btn-scene-action" onclick="handleGameAction('btn-valve-control')" title="Hold or click to titrate">
        ${gameState.titration.valveOpen ? '⏸ Close Stopcock' : '💧 Open Stopcock (Titrate)'}
      </button>
      <button id="btn-rate-toggle" class="btn-scene-action-sm ${isDropwise ? 'active' : ''}" onclick="toggleTitrationRate()">
        Rate: ${isDropwise ? 'Dropwise Delivery' : 'Fast Flow'}
      </button>
      <button id="btn-clear-bubble" class="btn-scene-action-sm" onclick="handleGameAction('btn-clear-bubble')">
        🫧 Clear Air Bubble
      </button>
      <button id="btn-add-indicator" class="btn-scene-action-sm" onclick="handleGameAction('btn-add-indicator')">
        🧪 Add Indicator
      </button>
    `;
  } else if (expId === "filtration") {
    const isSafe = (gameState.filtration.pourRate === "safe");
    container.innerHTML = `
      <button id="btn-seat-paper" class="btn-scene-action" onclick="handleGameAction('btn-seat-paper')">
        📄 Seat & Moisten Paper
      </button>
      <button id="btn-pour-control" class="btn-scene-action" onclick="handleGameAction('btn-pour-control')">
        🥣 Pour Slurry Down Rod
      </button>
      <button id="btn-pour-rate" class="btn-scene-action-sm ${isSafe ? 'active' : ''}" onclick="togglePourRate()">
        Rate: ${isSafe ? 'Safe (Slow)' : 'Fast (Risk Overflow)'}
      </button>
      <button id="btn-align-stem" class="btn-scene-action-sm" onclick="handleGameAction('btn-align-stem')">
        📐 Align Funnel Stem
      </button>
    `;
  } else if (expId === "paper-chromatography") {
    const isPencil = (gameState.chromatography.chosenTool === "pencil");
    const isSafeDepth = (gameState.chromatography.solventDepth === "safe");
    container.innerHTML = `
      <div style="display: inline-flex; align-items: center; gap: 0.35rem;">
        <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Marker:</span>
        <button id="btn-choice-pencil" class="btn-scene-action-sm ${isPencil ? 'active' : ''}" onclick="handleGameAction('btn-choice-pencil')">✏️ Pencil</button>
        <button id="btn-choice-pen" class="btn-scene-action-sm ${!isPencil ? 'active' : ''}" onclick="handleGameAction('btn-choice-pen')">🖊️ Pen</button>
      </div>
      <button id="btn-draw-baseline" class="btn-scene-action" onclick="handleGameAction('draw_baseline')">
        📏 Draw Baseline
      </button>
      <button id="btn-spot-sample" class="btn-scene-action-sm" onclick="handleGameAction('apply_sample_spot')">
        💧 Apply Spot
      </button>
      <button id="btn-depth-toggle" class="btn-scene-action-sm ${isSafeDepth ? 'active' : ''}" onclick="handleGameAction('btn-depth-toggle')">
        Depth: ${isSafeDepth ? 'Safe (0.8 cm)' : 'Excess (2.5 cm)'}
      </button>
      <button id="btn-cover-chamber" class="btn-scene-action-sm" onclick="handleGameAction('insert_strip_cover')">
        🫙 Lower Paper & Cover
      </button>
      <button id="btn-mark-front" class="btn-scene-action-sm" onclick="handleGameAction('mark_solvent_front')">
        📐 Mark Solvent Front
      </button>
    `;
  } else if (expId === "ph-determination") {
    renderPhDeterminationControls(container);
  } else if (expId === "standard-solution-preparation") {
    renderStandardSolutionControls(container);
  } else if (expId === "simple-distillation") {
    renderDistillationControls(container);
  } else if (expId === "recrystallization") {
    renderRecrystallizationControls(container);
  } else if (expId === "ph-metric-titration") {
    renderPhMetricControls(container);
  }
}

window.toggleTitrationRate = function() {
  gameState.titration.flowRate = (gameState.titration.flowRate === "fast") ? "dropwise" : "fast";
  renderSceneControls(activeExperimentId);
};

window.togglePourRate = function() {
  gameState.filtration.pourRate = (gameState.filtration.pourRate === "safe") ? "fast" : "safe";
  renderSceneControls(activeExperimentId);
};

// ==============================================================================
// MAIN EXPERIMENT RENDERER
// ==============================================================================

function renderCurrentExperiment() {
  const exp = experimentsData[activeExperimentId];
  if (!exp) return;

  // 1. Header Badges & Titles
  const titleEl = document.getElementById("current-exp-title");
  if (titleEl) titleEl.textContent = exp.name;

  const catBadge = document.getElementById("badge-category");
  if (catBadge) catBadge.textContent = exp.category;

  const diffBadge = document.getElementById("badge-difficulty");
  if (diffBadge) diffBadge.textContent = exp.difficulty;

  // 2. Render Step Guide & Action Pill
  updateStepGuideDisplay();

  // 3. Render Apparatus Quick-Select Chips
  renderApparatusChips(activeExperimentId);

  // 4. Render 2D SVG Apparatus on the Workbench
  renderWorkbenchApparatus(activeExperimentId);

  // 5. Update Interactive Scene Controls
  renderSceneControls(activeExperimentId);

  // 6. Apparatus Inspector state
  if (selectedApparatusKey) {
    selectApparatus(selectedApparatusKey);
  } else {
    dismissInspector();
  }

  // 7. Apply Current Animation Progress
  applyAnimationProgress(activeExperimentId, animState.progress);

  // 8. Sidebar Info
  const objEl = document.getElementById("info-objective");
  if (objEl) objEl.textContent = exp.objective;

  const princEl = document.getElementById("info-principle");
  if (princEl) princEl.textContent = exp.principle;

  const equipContainer = document.getElementById("info-equipment-tags");
  if (equipContainer) {
    equipContainer.innerHTML = exp.equipment
      .map(id => `<span class="equip-tag">${id}</span>`)
      .join("");
  }

  // 9. Procedure & Safety
  const procContainer = document.getElementById("procedure-list-container");
  if (procContainer) {
    procContainer.innerHTML = exp.procedure
      .map((step, idx) => `
        <li class="procedure-item ${idx === gameState.stepIndex ? 'active-step-highlight' : ''}">
          <div class="step-num">${idx + 1}</div>
          <div class="step-text">${step}</div>
        </li>
      `).join("");
  }

  const safetyContainer = document.getElementById("safety-list-container");
  if (safetyContainer) {
    safetyContainer.innerHTML = exp.safety
      .map(rule => `
        <li class="safety-item">
          <span class="safety-icon">⚠️</span>
          <div>${rule}</div>
        </li>
      `).join("");
  }

  const procEquipContainer = document.getElementById("procedure-equipment-links");
  if (procEquipContainer) {
    procEquipContainer.innerHTML = exp.equipment
      .map(id => {
        const prettyName = formatEquipName(id);
        return `<a href="index.html#detail/${id}" target="_blank" class="equip-link" title="View ${prettyName} in Equipment Catalog">📖 ${prettyName} ↗</a>`;
      })
      .join("");
  }

  // 10. Render Quiz
  renderQuiz(exp.quiz || []);
}

// Update Step Guide Bar & Target Pulse
function updateStepGuideDisplay() {
  const expConfig = EXPERIMENT_CONTENT[activeExperimentId];
  const steps = expConfig ? expConfig.steps : [];
  const totalSteps = steps.length || 6;
  const currentNum = gameState.stepIndex + 1;
  const currentStep = steps[gameState.stepIndex];

  // Tab 1 Step Badges & Text
  const counterBadge = document.getElementById("step-counter-badge");
  if (counterBadge) {
    counterBadge.textContent = `Step ${currentNum} of ${totalSteps}`;
  }

  const instructionText = document.getElementById("step-instruction-text");
  if (instructionText && currentStep) {
    instructionText.textContent = currentStep.prompt;
  }

  const promptPill = document.getElementById("action-prompt-pill");
  if (promptPill && currentStep) {
    promptPill.textContent = `🎯 Action: ${currentStep.targetElement || 'Click apparatus'}`;
  }

  // Tab 2 Step Focus Viewer
  const docBadge = document.getElementById("doc-step-badge");
  if (docBadge) {
    docBadge.textContent = `Step ${currentNum} of ${totalSteps}`;
  }

  const docInstruction = document.getElementById("doc-step-instruction");
  if (docInstruction && currentStep) {
    docInstruction.textContent = currentStep.prompt;
  }

  // Highlight active step in checklist
  const procItems = document.querySelectorAll("#procedure-list-container .procedure-item");
  procItems.forEach((item, idx) => {
    if (idx === gameState.stepIndex) {
      item.classList.add("active-step-highlight");
    } else {
      item.classList.remove("active-step-highlight");
    }
  });

  // Animation status badge
  const statusBadge = document.getElementById("animation-status-badge");
  if (statusBadge) {
    if (animState.isRunning || gameState.titration.valveOpen) {
      statusBadge.textContent = "▶ Action in Progress";
      statusBadge.style.color = "var(--accent-teal)";
    } else if (animState.progress >= 1.0) {
      statusBadge.textContent = "✓ Experiment Completed";
      statusBadge.style.color = "var(--accent-cyan)";
    } else {
      statusBadge.textContent = "Ready (Perform Action)";
      statusBadge.style.color = "var(--text-muted)";
    }
  }

  // Navigation button states
  const prevButtons = document.querySelectorAll('.btn-ctrl[data-action="prev"], .step-focus-nav button:first-child');
  const nextButtons = document.querySelectorAll('.btn-ctrl[data-action="next"], .step-focus-nav button:last-child');
  prevButtons.forEach(btn => btn.disabled = (gameState.stepIndex <= 0));
  nextButtons.forEach(btn => btn.disabled = (gameState.stepIndex >= totalSteps - 1));

  // Pulse currently required target in SVG
  updateTargetPulse();
}

function updateTargetPulse() {
  const expConfig = EXPERIMENT_CONTENT[activeExperimentId];
  if (!expConfig) return;
  const currentStep = expConfig.steps[gameState.stepIndex];
  if (!currentStep) return;

  document.querySelectorAll(".interactive-apparatus").forEach(el => {
    el.classList.remove("target-pulse");
  });

  const targetEl = document.querySelector(`.interactive-apparatus[data-item="${currentStep.targetElement}"]`);
  if (targetEl) {
    targetEl.classList.add("target-pulse");
  }
}

// ==============================================================================
// PLAYBACK ENGINE
// ==============================================================================

function startAnimation() {
  if (activeExperimentId === "acid-base-titration") {
    startTitrationDrip();
  } else {
    advanceGameStep();
  }
}

function pauseAnimation() {
  if (activeExperimentId === "acid-base-titration") {
    stopTitrationDrip();
  }
  animState.isRunning = false;
  if (animState.rafId) {
    cancelAnimationFrame(animState.rafId);
    animState.rafId = null;
  }
}

function resetAnimation() {
  stopTitrationDrip();
  resetGameState();
  renderCurrentExperiment();
}

function stepNext() {
  skipStep();
}

function stepPrev() {
  const expConfig = EXPERIMENT_CONTENT[activeExperimentId];
  if (!expConfig) return;

  if (gameState.stepIndex > 0) {
    gameState.stepIndex--;
    animState.progress = gameState.stepIndex / (expConfig.steps.length - 1);
    applyAnimationProgress(activeExperimentId, animState.progress);
    updateStepGuideDisplay();
    renderSceneControls(activeExperimentId);
  }
}

function animationLoop(timestamp) {
  // Handled smoothly by game state loop
}

// ==============================================================================
// 2D SVG VISUAL UPDATES & ANIMATION PROGRESS
// ==============================================================================

function applyAnimationProgress(expId, p) {
  const clamped = Math.max(0, Math.min(1, p));

  if (expId === "acid-base-titration") {
    applyTitrationVisuals(clamped);
  } else if (expId === "filtration") {
    applyFiltrationVisuals(clamped);
  } else if (expId === "paper-chromatography") {
    applyChromatographyVisuals(clamped);
  } else if (expId === "ph-determination") {
    applyPhDeterminationVisuals(clamped);
  } else if (expId === "standard-solution-preparation") {
    applyStandardSolutionVisuals(clamped);
  } else if (expId === "simple-distillation") {
    applyDistillationVisuals(clamped);
  } else if (expId === "recrystallization") {
    applyRecrystallizationVisuals(clamped);
  } else if (expId === "ph-metric-titration") {
    applyPhMetricVisuals(clamped);
  }
}

// Titration Visual Pipeline
function applyTitrationVisuals(p) {
  const buretteLiquid = document.getElementById("anim-burette-liquid");
  const buretteMeniscus = document.getElementById("anim-burette-meniscus");
  const titrantDrop = document.getElementById("anim-titrant-drop");
  const flaskLiquid = document.getElementById("anim-flask-liquid");
  const flaskSurface = document.getElementById("anim-flask-surface");
  const readout = document.getElementById("anim-titration-readout");
  const endpointPill = document.getElementById("sim-endpoint-pill");

  const startY = 90;
  const maxDrain = 160;
  const currentY = startY + (p * maxDrain);
  const remainingH = Math.max(18, 178 - (p * maxDrain));

  if (buretteLiquid) {
    buretteLiquid.setAttribute("y", currentY);
    buretteLiquid.setAttribute("height", remainingH);
  }

  if (buretteMeniscus) {
    buretteMeniscus.setAttribute("d", `M 212 ${currentY} Q 221 ${currentY + 5} 230 ${currentY}`);
  }

  // Droplet drop loop
  if (titrantDrop) {
    if (gameState.titration.valveOpen) {
      titrantDrop.setAttribute("opacity", "0.9");
      const dropY = 310 + ((Date.now() / 25) % 35);
      titrantDrop.setAttribute("cy", dropY);
    } else {
      titrantDrop.setAttribute("opacity", "0");
    }
  }

  // Flask Liquid rise and color transition
  const baseFlaskY = 358;
  const maxRise = 25;
  const currentFlaskY = baseFlaskY - (p * maxRise);

  const leftX = 186 - (p * 8);
  const rightX = 256 + (p * 8);

  if (flaskLiquid && flaskSurface) {
    flaskLiquid.setAttribute("points", `${leftX},${currentFlaskY} ${rightX},${currentFlaskY} 272,374 170,374`);
    flaskSurface.setAttribute("d", `M ${leftX} ${currentFlaskY} Q 221 ${currentFlaskY + 4} ${rightX} ${currentFlaskY}`);

    // Color transition: clear -> pale pink -> dark magenta (overshoot)
    if (gameState.titration.overshot) {
      flaskLiquid.setAttribute("fill", "#be185d"); // Intense dark magenta
      flaskLiquid.setAttribute("opacity", "0.95");
      flaskSurface.setAttribute("fill", "#9d174d");
      flaskSurface.setAttribute("opacity", "0.95");
    } else if (p >= 0.85 || gameState.titration.endpointReached) {
      flaskLiquid.setAttribute("fill", "#f472b6"); // Faint permanent pale pink
      flaskLiquid.setAttribute("opacity", "0.75");
      flaskSurface.setAttribute("fill", "#ec4899");
      flaskSurface.setAttribute("opacity", "0.85");
    } else if (p > 0.4) {
      flaskLiquid.setAttribute("fill", "#a5f3fc");
      flaskLiquid.setAttribute("opacity", "0.45");
      flaskSurface.setAttribute("fill", "#67e8f9");
    } else {
      flaskLiquid.setAttribute("fill", "#38bdf8");
      flaskLiquid.setAttribute("opacity", "0.25");
      flaskSurface.setAttribute("fill", "#38bdf8");
    }
  }

  if (readout) {
    const vol = (p * 25.0).toFixed(2);
    readout.textContent = `Illustrative Titre: ${vol} mL (Endpoint ~ 22.40 mL)`;
  }

  if (endpointPill) {
    if (gameState.titration.endpointReached) {
      endpointPill.classList.add("visible");
      endpointPill.textContent = gameState.titration.overshot ? "⚠️ Titration Overshot!" : "★ Simulated Endpoint Reached!";
    } else {
      endpointPill.classList.remove("visible");
    }
  }
}

// Filtration Visual Pipeline
function applyFiltrationVisuals(p) {
  const beakerGroup = document.getElementById("anim-beaker-group");
  const slurryStream = document.getElementById("anim-slurry-stream");
  const filterResidue = document.getElementById("anim-filter-residue");
  const funnelDrop = document.getElementById("anim-funnel-drop");
  const filtrateLiquid = document.getElementById("anim-filtrate-liquid");

  // Beaker tilt
  if (beakerGroup) {
    const tiltDeg = Math.min(45, p * 55);
    beakerGroup.setAttribute("transform", `rotate(-${tiltDeg} 360 120)`);
  }

  // Pouring stream
  if (slurryStream) {
    if (p > 0.15 && p < 0.9) {
      slurryStream.setAttribute("opacity", "0.85");
    } else {
      slurryStream.setAttribute("opacity", "0");
    }
  }

  // Precipitate residue cake
  if (filterResidue) {
    const residueOpacity = Math.min(1.0, 0.2 + (p * 0.8));
    const residueRadius = Math.min(22, 10 + (p * 15));
    filterResidue.setAttribute("opacity", residueOpacity);
    filterResidue.setAttribute("rx", residueRadius);
    filterResidue.setAttribute("fill", "#64748b");
  }

  // Draining drop
  if (funnelDrop) {
    if (p > 0.2 && p < 0.95) {
      funnelDrop.setAttribute("opacity", "0.85");
      const dropY = 280 + ((Date.now() / 20) % 50);
      funnelDrop.setAttribute("cy", dropY);
    } else {
      funnelDrop.setAttribute("opacity", "0");
    }
  }

  // Filtrate collection in receiver
  if (filtrateLiquid) {
    const baseReceiverY = 372;
    const currentReceiverY = baseReceiverY - (p * 28);
    filtrateLiquid.setAttribute("y", currentReceiverY);
    filtrateLiquid.setAttribute("height", p * 28);
    filtrateLiquid.setAttribute("fill", "#38bdf8");
    filtrateLiquid.setAttribute("opacity", "0.35");
  }
}

// Chromatography Visual Pipeline
function applyChromatographyVisuals(p) {
  const solventFront = document.getElementById("anim-solvent-front");
  const paperWet = document.getElementById("anim-paper-wet");
  const spotOrigin = document.getElementById("anim-spot-origin");
  const spotYellow = document.getElementById("anim-spot-yellow");
  const spotRed = document.getElementById("anim-spot-red");
  const spotBlue = document.getElementById("anim-spot-blue");

  const originY = 280;
  const maxY = 130;
  const currentFrontY = originY - (p * (originY - maxY));

  if (solventFront) {
    solventFront.setAttribute("y1", currentFrontY);
    solventFront.setAttribute("y2", currentFrontY);
    solventFront.setAttribute("opacity", p > 0.05 ? "0.9" : "0");
  }

  if (paperWet) {
    paperWet.setAttribute("y", currentFrontY);
    paperWet.setAttribute("height", Math.max(0, 310 - currentFrontY));
  }

  if (spotOrigin) {
    spotOrigin.setAttribute("opacity", (1.0 - p * 0.6).toFixed(2));
  }

  // Separating resolved dye spots
  if (spotYellow) {
    const yYellow = originY - (p * 0.28 * (originY - maxY));
    spotYellow.setAttribute("cy", yYellow);
    spotYellow.setAttribute("opacity", (p * 0.9).toFixed(2));
  }

  if (spotRed) {
    const yRed = originY - (p * 0.55 * (originY - maxY));
    spotRed.setAttribute("cy", yRed);
    spotRed.setAttribute("opacity", (p * 0.9).toFixed(2));
  }

  if (spotBlue) {
    const yBlue = originY - (p * 0.82 * (originY - maxY));
    spotBlue.setAttribute("cy", yBlue);
    spotBlue.setAttribute("opacity", (p * 0.95).toFixed(2));
  }
}

// ==============================================================================
// APPARATUS CHIPS & INSPECTOR
// ==============================================================================

function renderApparatusChips(expId) {
  const container = document.getElementById("chips-list");
  if (!container) return;

  const metadata = APPARATUS_METADATA[expId] || {};
  const keys = Object.keys(metadata);

  container.innerHTML = keys.map(key => {
    const item = metadata[key];
    const isPropBadge = item.isProp ? `<span class="chip-prop-badge">Prop</span>` : "";
    return `
      <button class="apparatus-chip ${selectedApparatusKey === key ? 'active' : ''}" 
              data-key="${key}" 
              onclick="onApparatusClick('${key}')"
              title="Inspect ${item.name}">
        <span>${item.name}</span>
        ${isPropBadge}
      </button>
    `;
  }).join("");
}

window.selectApparatus = function(itemKey) {
  const metadata = APPARATUS_METADATA[activeExperimentId] || {};
  const info = metadata[itemKey];
  if (!info) return;

  selectedApparatusKey = itemKey;

  // Highlight in SVG
  document.querySelectorAll(".interactive-apparatus").forEach(el => {
    el.classList.remove("selected");
  });
  const svgTarget = document.querySelector(`.interactive-apparatus[data-item="${itemKey}"]`);
  if (svgTarget) {
    svgTarget.classList.add("selected");
  }

  // Highlight chip
  document.querySelectorAll(".apparatus-chip").forEach(chip => {
    if (chip.getAttribute("data-key") === itemKey) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });

  // Populate Inspector Card with Real DB lookup if available
  const inspectorName = document.getElementById("inspector-name");
  const inspectorBadges = document.getElementById("inspector-badges");
  const inspectorBody = document.getElementById("inspector-body");
  const btnClose = document.getElementById("btn-close-inspector");

  if (inspectorName) inspectorName.textContent = info.name;
  if (btnClose) btnClose.style.display = "flex";

  // Check role in equipmentRoles.json or metadata
  const roleFromMap = equipmentRolesMap[info.dbId] ? equipmentRolesMap[info.dbId].role : info.role;

  if (inspectorBadges) {
    if (info.isProp) {
      inspectorBadges.innerHTML = `
        <span class="badge-prop">Visual Prop (No DB ID)</span>
        <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-muted);">Lab Consumable</span>
      `;
    } else {
      inspectorBadges.innerHTML = `
        <span class="badge-db">✓ Verified DB ID: <code>${info.dbId}</code></span>
        <a href="index.html#detail/${info.dbId}" target="_blank" class="badge badge-cyan" title="Open full specs in Equipment Catalog">📖 Full Specs ↗</a>
      `;
    }
  }

  if (inspectorBody) {
    inspectorBody.innerHTML = `
      <div class="inspector-field">
        <span class="field-label">General Laboratory Purpose:</span>
        <span class="field-value">${info.purpose}</span>
      </div>
      <div class="inspector-field">
        <span class="field-label">Role in this Experiment:</span>
        <span class="field-value" style="color: var(--accent-cyan); font-weight: 500;">${roleFromMap}</span>
      </div>
      <div class="inspector-field">
        <span class="field-label">Essential Safety Precaution:</span>
        <div class="field-safety">
          <span>⚠️</span>
          <span>${info.safety}</span>
        </div>
      </div>
    `;
  }
};

window.dismissInspector = function() {
  selectedApparatusKey = null;

  document.querySelectorAll(".interactive-apparatus").forEach(el => {
    el.classList.remove("selected");
  });

  document.querySelectorAll(".apparatus-chip").forEach(chip => {
    chip.classList.remove("active");
  });

  const inspectorName = document.getElementById("inspector-name");
  const inspectorBadges = document.getElementById("inspector-badges");
  const inspectorBody = document.getElementById("inspector-body");
  const btnClose = document.getElementById("btn-close-inspector");

  if (inspectorName) inspectorName.textContent = "🔍 Equipment Inspector";
  if (btnClose) btnClose.style.display = "none";
  if (inspectorBadges) {
    inspectorBadges.innerHTML = `<span class="badge badge-cyan">Click Apparatus to Inspect</span>`;
  }
  if (inspectorBody) {
    inspectorBody.innerHTML = `
      <div class="inspector-placeholder">
        <span>👈</span>
        <span>Click or tap any laboratory apparatus illustration on the workbench to inspect its purpose, experiment role, and safety rules.</span>
      </div>
    `;
  }
};

// ==============================================================================
// 2D SVG APPARATUS RENDERERS
// Clean shapes, no overlapping blocking rects, pointer & keyboard events
// ==============================================================================

function renderWorkbenchApparatus(expId) {
  const stage = document.getElementById("apparatus-stage");
  if (!stage) return;

  if (expId === "acid-base-titration") {
    stage.innerHTML = `
      <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
        <defs>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>
            <stop offset="50%" stop-color="#ffffff" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.3"/>
          </linearGradient>
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="50%" stop-color="#94a3b8"/>
            <stop offset="100%" stop-color="#334155"/>
          </linearGradient>
          <linearGradient id="titrantGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0.75"/>
          </linearGradient>
        </defs>

        <!-- RETORT STAND (Clickable) -->
        <g class="interactive-apparatus" data-item="retort-stand" onclick="onApparatusClick('retort-stand')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('retort-stand')" role="button" tabindex="0" aria-label="Retort Stand">
          <rect x="70" y="355" width="200" height="30" rx="4" fill="url(#metalGrad)" stroke="#1e293b" stroke-width="2"/>
          <rect x="135" y="35" width="14" height="325" rx="2" fill="url(#metalGrad)"/>
        </g>

        <!-- CLAMP AND BOSS HEAD (Clickable) -->
        <g class="interactive-apparatus" data-item="clamp-and-boss-head" onclick="onApparatusClick('clamp-and-boss-head')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('clamp-and-boss-head')" role="button" tabindex="0" aria-label="Clamp and Boss Head">
          <rect x="130" y="135" width="90" height="18" rx="3" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
          <circle cx="137" cy="144" r="9" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
          <path d="M 195 137 C 205 125, 230 125, 235 137" fill="none" stroke="#64748b" stroke-width="7"/>
        </g>

        <!-- BURETTE (Clickable with Dynamic Liquid & Meniscus) -->
        <g class="interactive-apparatus" data-item="burette" onclick="onApparatusClick('burette')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('burette')" role="button" tabindex="0" aria-label="Burette">
          <rect x="210" y="50" width="22" height="220" rx="3" fill="url(#glassGrad)" stroke="#38bdf8" stroke-width="2"/>
          
          <!-- Animated Titrant Column -->
          <rect id="anim-burette-liquid" x="212" y="90" width="18" height="178" fill="url(#titrantGrad)"/>
          <path id="anim-burette-meniscus" d="M 212 90 Q 221 95 230 90" fill="#0284c7" opacity="0.85"/>

          <!-- Graduation markings -->
          <line x1="224" y1="70" x2="231" y2="70" stroke="#94a3b8" stroke-width="1.5"/>
          <line x1="226" y1="80" x2="231" y2="80" stroke="#94a3b8" stroke-width="1"/>
          <line x1="224" y1="90" x2="231" y2="90" stroke="#94a3b8" stroke-width="1.5"/>
          <line x1="224" y1="110" x2="231" y2="110" stroke="#94a3b8" stroke-width="1.5"/>
          <line x1="224" y1="130" x2="231" y2="130" stroke="#94a3b8" stroke-width="1.5"/>
          <line x1="224" y1="150" x2="231" y2="150" stroke="#94a3b8" stroke-width="1.5"/>
          <line x1="224" y1="170" x2="231" y2="170" stroke="#94a3b8" stroke-width="1.5"/>

          <!-- Stopcock -->
          <rect x="217" y="270" width="8" height="15" fill="url(#glassGrad)" stroke="#38bdf8"/>
          <rect x="205" y="273" width="32" height="8" rx="2" fill="#ef4444" stroke="#991b1b" style="cursor: pointer;"/>
          <!-- Tip -->
          <polygon points="218,285 224,285 222,305 220,305" fill="url(#glassGrad)" stroke="#38bdf8"/>
        </g>

        <!-- Dynamic Falling Titrant Droplet -->
        <ellipse id="anim-titrant-drop" cx="221" cy="315" rx="2.5" ry="4" fill="#38bdf8" opacity="0"/>

        <!-- CONICAL FLASK (Clickable with Dynamic Liquid & Indicator Color) -->
        <g class="interactive-apparatus" data-item="conical-flask" onclick="onApparatusClick('conical-flask')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('conical-flask')" role="button" tabindex="0" aria-label="Conical Flask">
          <polygon points="208,325 234,325 275,375 167,375" fill="url(#glassGrad)" stroke="#38bdf8" stroke-width="2"/>
          <rect x="208" y="318" width="26" height="8" rx="2" fill="url(#glassGrad)" stroke="#38bdf8" stroke-width="1.5"/>
          
          <!-- Animated Flask Liquid -->
          <polygon id="anim-flask-liquid" points="186,355 256,355 272,374 170,374" fill="#38bdf8" opacity="0.25"/>
          <path id="anim-flask-surface" d="M 186 355 Q 221 359 256 355" fill="#38bdf8" opacity="0.35"/>
        </g>

        <!-- DROPPER (Clickable, resting to the right) -->
        <g class="interactive-apparatus" data-item="dropper" onclick="onApparatusClick('dropper')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('dropper')" role="button" tabindex="0" aria-label="Dropper">
          <g transform="rotate(45 380 340)">
            <rect x="370" y="300" width="8" height="60" rx="2" fill="url(#glassGrad)" stroke="#38bdf8" stroke-width="1.5"/>
            <polygon points="371,360 377,360 375,375 373,375" fill="url(#glassGrad)" stroke="#38bdf8"/>
            <rect x="367" y="280" width="14" height="22" rx="6" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
            <ellipse cx="374" cy="378" rx="2" ry="3" fill="#f43f5e"/>
          </g>
        </g>

        <!-- Real-time Live Readout -->
        <g font-family="Inter, sans-serif" font-size="11">
          <text id="anim-titration-readout" x="300" y="370" fill="#38bdf8" font-weight="600">Titre: 0.00 mL (Simulated Dropwise Addition)</text>
          <text x="248" y="80" fill="#38bdf8">Burette [Click]</text>
          <text x="248" y="148" fill="#94a3b8">Clamp & Boss Head [Click]</text>
          <text x="135" y="25" text-anchor="middle" fill="#94a3b8">Retort Stand [Click]</text>
        </g>
      </svg>
    `;
  } else if (expId === "filtration") {
    stage.innerHTML = `
      <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
        <defs>
          <linearGradient id="glassGradF" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>
            <stop offset="50%" stop-color="#ffffff" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.3"/>
          </linearGradient>
          <linearGradient id="metalGradF" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="50%" stop-color="#94a3b8"/>
            <stop offset="100%" stop-color="#334155"/>
          </linearGradient>
        </defs>

        <!-- RETORT STAND (Clickable) -->
        <g class="interactive-apparatus" data-item="retort-stand" onclick="onApparatusClick('retort-stand')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('retort-stand')" role="button" tabindex="0" aria-label="Retort Stand">
          <rect x="70" y="355" width="200" height="30" rx="4" fill="url(#metalGradF)" stroke="#1e293b" stroke-width="2"/>
          <rect x="135" y="35" width="14" height="325" rx="2" fill="url(#metalGradF)"/>
          <rect x="130" y="195" width="130" height="12" rx="3" fill="#64748b"/>
          <ellipse cx="260" cy="201" rx="45" ry="10" fill="none" stroke="#64748b" stroke-width="5"/>
        </g>

        <!-- GLASS FUNNEL (Clickable) -->
        <g class="interactive-apparatus" data-item="glass-funnel" onclick="onApparatusClick('glass-funnel')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('glass-funnel')" role="button" tabindex="0" aria-label="Glass Funnel">
          <polygon points="215,145 305,145 264,215 256,215" fill="url(#glassGradF)" stroke="#38bdf8" stroke-width="2"/>
          <rect x="256" y="215" width="8" height="65" fill="url(#glassGradF)" stroke="#38bdf8" stroke-width="1.5"/>
        </g>

        <!-- FILTER PAPER CONE (Clickable with Dynamic Precipitate Residue Cake) -->
        <g class="interactive-apparatus" data-item="filter-paper" onclick="onApparatusClick('filter-paper')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('filter-paper')" role="button" tabindex="0" aria-label="Filter Paper">
          <polygon points="220,150 300,150 260,210" fill="#f8fafc" opacity="0.9" stroke="#cbd5e1" stroke-width="1.5"/>
          <!-- Dynamic Precipitate Cake -->
          <ellipse id="anim-filter-residue" cx="260" cy="190" rx="12" ry="5" fill="#cbd5e1" stroke="#94a3b8" stroke-dasharray="2 2" opacity="0.3"/>
        </g>

        <!-- CONICAL FLASK / RECEIVER (Clickable with Dynamic Clear Filtrate) -->
        <g class="interactive-apparatus" data-item="conical-flask" onclick="onApparatusClick('conical-flask')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('conical-flask')" role="button" tabindex="0" aria-label="Receiving Conical Flask">
          <polygon points="248,270 272,270 310,375 210,375" fill="url(#glassGradF)" stroke="#38bdf8" stroke-width="2"/>
          <rect x="246" y="265" width="28" height="6" rx="2" fill="url(#glassGradF)" stroke="#38bdf8" stroke-width="1.5"/>
          
          <!-- Animated Clear Filtrate Level -->
          <rect id="anim-filtrate-liquid" x="220" y="372" width="80" height="0" rx="2" fill="#38bdf8" opacity="0.35"/>
        </g>

        <!-- Falling Filtrate Drop -->
        <ellipse id="anim-funnel-drop" cx="260" cy="285" rx="2" ry="4" fill="#38bdf8" opacity="0"/>

        <!-- BEAKER & GLASS STIRRING ROD (Clickable & Rotatable pouring animation) -->
        <g id="anim-beaker-group" class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Beaker with Slurry">
          <!-- Stirring Rod -->
          <line id="anim-stirring-rod" x1="330" y1="50" x2="265" y2="160" stroke="#e2e8f0" stroke-width="4.5" stroke-linecap="round"/>
          
          <!-- Beaker Body -->
          <rect x="330" y="90" width="70" height="90" rx="4" fill="url(#glassGradF)" stroke="#38bdf8" stroke-width="2"/>
          <path d="M 330 90 L 320 85 L 330 98" fill="url(#glassGradF)" stroke="#38bdf8" stroke-width="1.5"/>
          <rect x="332" y="130" width="66" height="48" fill="#475569" opacity="0.5"/>
          <!-- Slurry suspension particles -->
          <circle cx="345" cy="145" r="2.5" fill="#94a3b8"/>
          <circle cx="365" cy="155" r="3" fill="#cbd5e1"/>
          <circle cx="380" cy="140" r="2" fill="#94a3b8"/>
        </g>

        <!-- Dynamic Pouring Slurry Stream -->
        <path id="anim-slurry-stream" d="M 320 85 Q 285 110 262 155" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="4 2" opacity="0"/>

        <!-- Clickable Glass Stirring Rod -->
        <g class="interactive-apparatus" data-item="glass-stirring-rod" onclick="onApparatusClick('glass-stirring-rod')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('glass-stirring-rod')" role="button" tabindex="0" aria-label="Glass Stirring Rod">
          <line x1="335" y1="45" x2="270" y2="155" stroke="transparent" stroke-width="16"/>
        </g>

        <!-- Labels -->
        <g font-family="Inter, sans-serif" font-size="11" fill="#94a3b8">
          <text x="365" y="75" fill="#38bdf8" font-weight="600">Beaker &amp; Rod [Click]</text>
          <text x="315" y="165" fill="#f8fafc" font-weight="600">Filter Paper [Click]</text>
          <text x="315" y="215" fill="#38bdf8">Glass Funnel [Click]</text>
          <text x="318" y="340" fill="#2dd4bf">Receiver Flask [Click]</text>
          <text x="135" y="25" text-anchor="middle" fill="#94a3b8">Retort Stand [Click]</text>
        </g>
      </svg>
    `;
  } else if (expId === "paper-chromatography") {
    stage.innerHTML = `
      <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
        <defs>
          <linearGradient id="glassChamber" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2"/>
            <stop offset="50%" stop-color="#ffffff" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.25"/>
          </linearGradient>
          <linearGradient id="solventLiquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#0f766e" stop-opacity="0.6"/>
          </linearGradient>
        </defs>

        <!-- DEVELOPING BEAKER (Clickable Chamber) -->
        <g class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Beaker Developing Chamber">
          <rect x="220" y="80" width="160" height="280" rx="8" fill="url(#glassChamber)" stroke="#38bdf8" stroke-width="2.5"/>
          <line x1="210" y1="80" x2="390" y2="80" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
          
          <!-- Solvent Reservoir at Bottom (Depth is 0.8 cm or 2.5 cm) -->
          <rect id="anim-solvent-bed" x="222" y="320" width="156" height="38" rx="4" fill="url(#solventLiquid)"/>
          <line x1="222" y1="320" x2="378" y2="320" stroke="#2dd4bf" stroke-width="2"/>
        </g>

        <!-- CHROMATOGRAPHY PAPER STRIP (Clickable) -->
        <g class="interactive-apparatus" data-item="filter-paper" onclick="onApparatusClick('filter-paper')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('filter-paper')" role="button" tabindex="0" aria-label="Chromatography Paper Strip">
          <rect x="260" y="100" width="80" height="235" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" rx="1"/>
          
          <!-- Capillary Wetting Mask Layer -->
          <rect id="anim-paper-wet" x="260" y="310" width="80" height="25" fill="#bae6fd" opacity="0.3"/>

          <!-- Pencil Origin Baseline (y=280) -->
          <line x1="265" y1="280" x2="335" y2="280" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3 2"/>
          <text x="250" y="284" font-family="Inter, sans-serif" font-size="9" fill="#94a3b8" text-anchor="end">Origin</text>

          <!-- Dynamic Solvent Front -->
          <line id="anim-solvent-front" x1="265" y1="280" x2="335" y2="280" stroke="#0284c7" stroke-width="2" opacity="0"/>

          <!-- Sample Spot at Origin -->
          <circle id="anim-spot-origin" cx="300" cy="280" r="4" fill="#0f172a" stroke="#475569" stroke-width="1"/>

          <!-- Resolved Component Spots -->
          <circle id="anim-spot-yellow" cx="300" cy="280" r="4.5" fill="#eab308" opacity="0"/>
          <circle id="anim-spot-red" cx="300" cy="280" r="4" fill="#ef4444" opacity="0"/>
          <circle id="anim-spot-blue" cx="300" cy="280" r="3.5" fill="#3b82f6" opacity="0"/>
        </g>

        <!-- WATCH GLASS COVER LID (Clickable) -->
        <g class="interactive-apparatus" data-item="watch-glass" onclick="onApparatusClick('watch-glass')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('watch-glass')" role="button" tabindex="0" aria-label="Watch Glass Lid">
          <path d="M 200 75 Q 300 60 400 75 Q 300 80 200 75 Z" fill="url(#glassChamber)" stroke="#38bdf8" stroke-width="2"/>
        </g>

        <!-- GRAPHITE PENCIL (Visual Prop & Clickable) -->
        <g class="interactive-apparatus" data-item="pencil" onclick="onApparatusClick('pencil')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('pencil')" role="button" tabindex="0" aria-label="Graphite Pencil">
          <g transform="translate(450, 220) rotate(-30)">
            <polygon points="0,0 120,0 110,12 0,12" fill="#f59e0b" stroke="#b45309" stroke-width="1"/>
            <polygon points="120,0 140,6 120,12" fill="#fed7aa" stroke="#d97706"/>
            <polygon points="135,4.5 140,6 135,7.5" fill="#334155"/>
            <rect x="0" y="0" width="18" height="12" rx="2" fill="#f43f5e"/>
            <rect x="18" y="0" width="6" height="12" fill="#94a3b8"/>
          </g>
        </g>

        <!-- DROPPER (Clickable) -->
        <g class="interactive-apparatus" data-item="dropper" onclick="onApparatusClick('dropper')" onkeydown="if(event.key==='Enter'||event.key===' ')onApparatusClick('dropper')" role="button" tabindex="0" aria-label="Dropper Spotter">
          <g transform="translate(80, 260) rotate(-35)">
            <rect x="0" y="20" width="8" height="60" rx="2" fill="url(#glassChamber)" stroke="#38bdf8" stroke-width="1.5"/>
            <polygon points="1,80 7,80 5,95 3,95" fill="url(#glassChamber)" stroke="#38bdf8"/>
            <rect x="-3" y="0" width="14" height="22" rx="6" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
            <circle cx="4" cy="98" r="2" fill="#3b82f6"/>
          </g>
        </g>

        <!-- Labels -->
        <g font-family="Inter, sans-serif" font-size="11" fill="#94a3b8">
          <text x="300" y="55" text-anchor="middle" fill="#38bdf8" font-weight="600">Watch Glass Lid [Click]</text>
          <text x="355" y="198" fill="#f8fafc" font-weight="600">Paper Strip [Click]</text>
          <text x="430" y="345" fill="#2dd4bf" font-weight="600">Beaker Chamber [Click]</text>
          <text x="475" y="360" fill="#f59e0b" font-weight="600">Pencil (Prop) [Click]</text>
          <text x="75" y="340" fill="#38bdf8" font-weight="600">Spotter Dropper [Click]</text>
        </g>
      </svg>
    `;
  } else if (expId === "ph-determination") {
    renderPhDeterminationSVG(stage);
  } else if (expId === "standard-solution-preparation") {
    renderStandardSolutionSVG(stage);
  } else if (expId === "simple-distillation") {
    renderDistillationSVG(stage);
  } else if (expId === "recrystallization") {
    renderRecrystallizationSVG(stage);
  } else if (expId === "ph-metric-titration") {
    renderPhMetricSVG(stage);
  }
}

// ==============================================================================
// QUIZ ENGINE
// ==============================================================================

let quizState = {
  answeredCount: 0,
  score: 0,
  answers: {}
};

function resetQuizState() {
  quizState = {
    answeredCount: 0,
    score: 0,
    answers: {}
  };
  const badge = document.getElementById("quiz-progress-badge");
  if (badge) badge.textContent = "0 of 3 Answered";

  const scoreContainer = document.getElementById("quiz-score-container");
  if (scoreContainer) {
    scoreContainer.style.display = "none";
    scoreContainer.innerHTML = "";
  }
}

function renderQuiz(quizList) {
  resetQuizState();
  const container = document.getElementById("quiz-list-container");
  if (!container) return;

  const questions = (quizList || []).slice(0, 3);
  if (questions.length === 0) {
    container.innerHTML = `<div class="quiz-card"><p>No quiz questions available for this experiment.</p></div>`;
    return;
  }

  container.innerHTML = questions.map((q, qIdx) => `
    <div class="quiz-card" data-qidx="${qIdx}">
      <div class="quiz-question">Question ${qIdx + 1}: ${escapeHtml(q.question)}</div>
      <div class="quiz-options">
        ${q.options.map((opt, optIdx) => `
          <button class="quiz-opt-btn" onclick="handleQuizAnswer(${qIdx}, ${optIdx})">
            ${escapeHtml(opt)}
          </button>
        `).join("")}
      </div>
      <div class="quiz-explanation" id="quiz-exp-${qIdx}">
        <strong>Scientific Explanation:</strong> ${escapeHtml(q.explanation)}
      </div>
    </div>
  `).join("");
}

window.handleQuizAnswer = function(qIdx, optIdx) {
  const exp = experimentsData[activeExperimentId];
  if (!exp || !exp.quiz || !exp.quiz[qIdx]) return;
  if (quizState.answers[qIdx] !== undefined) return;

  const question = exp.quiz[qIdx];
  const selectedText = question.options[optIdx];
  const isCorrect = (selectedText.trim() === question.correct_answer.trim());

  quizState.answers[qIdx] = { selectedIndex: optIdx, isCorrect: isCorrect };
  quizState.answeredCount++;
  if (isCorrect) {
    quizState.score++;
  }

  const card = document.querySelector(`.quiz-card[data-qidx="${qIdx}"]`);
  if (card) {
    const buttons = card.querySelectorAll(".quiz-opt-btn");
    buttons.forEach((btn, bIdx) => {
      btn.disabled = true;
      if (bIdx === optIdx) {
        btn.classList.add(isCorrect ? "correct" : "incorrect");
      }
      if (!isCorrect && question.options[bIdx].trim() === question.correct_answer.trim()) {
        btn.classList.add("correct");
      }
    });

    const expBox = document.getElementById(`quiz-exp-${qIdx}`);
    if (expBox) expBox.classList.add("show");
  }

  const badge = document.getElementById("quiz-progress-badge");
  if (badge) {
    badge.textContent = `${quizState.answeredCount} of 3 Answered`;
  }

  if (quizState.answeredCount >= 3) {
    showQuizScoreCard();
  }
};

function showQuizScoreCard() {
  const container = document.getElementById("quiz-score-container");
  if (!container) return;

  const score = quizState.score;
  const pct = Math.round((score / 3) * 100);
  let message = "";
  if (score === 3) {
    message = "Outstanding! Perfect 100% score — you have mastered the conceptual principles, procedures, and safety rules for this experiment.";
  } else if (score === 2) {
    message = "Great effort! You answered 2 out of 3 questions correctly. Review the scientific explanations above to solidify your understanding.";
  } else if (score === 1) {
    message = "Good try! You answered 1 out of 3 questions correctly. Review the step-by-step procedure and safety guidelines before re-testing.";
  } else {
    message = "Review recommended. Re-read the scientific principle, inspect the clickable apparatus, and attempt the quiz again!";
  }

  container.innerHTML = `
    <div class="quiz-score-card">
      <div class="quiz-score-title">🏆 Quiz Complete — Results Summary</div>
      <div class="score-number">${score} / 3</div>
      <div style="font-weight: 600; color: var(--accent-cyan); margin-bottom: 0.5rem;">Score: ${pct}%</div>
      <p class="score-desc">${message}</p>
      <button class="btn-retry-quiz" onclick="retryQuiz()">↺ Retry Quiz</button>
    </div>
  `;
  container.style.display = "block";
}

window.retryQuiz = function() {
  const exp = experimentsData[activeExperimentId];
  if (exp && exp.quiz) {
    renderQuiz(exp.quiz);
  }
};

// ==============================================================================
// HELPERS & WINDOW EXPORTS
// ==============================================================================

function formatEquipName(id) {
  if (!id) return "";
  return id
    .split("-")
    .map(word => {
      if (word.toLowerCase() === "ph") return "pH";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Window Globals for HTML onclick bindings
window.stepPrev = stepPrev;
window.stepNext = stepNext;
window.resetQuizState = resetQuizState;
window.startAnimation = startAnimation;
window.pauseAnimation = pauseAnimation;
window.resetAnimation = resetAnimation;
window.showHint = showHint;
window.skipStep = skipStep;


// ==============================================================================
// EXPERIMENT 4: pH DETERMINATION IMPLEMENTATION
// ==============================================================================

function setPhMethod(method) {
  gameState.phDetermination.method = method;
  renderSceneControls(activeExperimentId);
}

function handlePhDeterminationAction(actionId, isMatch) {
  const g = gameState.phDetermination;

  if (actionId === "btn-method-paper" || actionId === "select_method") {
    setPhMethod("paper");
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "btn-method-meter") {
    setPhMethod("meter");
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "dip_test_paper" || actionId === "glass-stirring-rod" || actionId === "btn-dip-paper") {
    g.sampleDropletPlaced = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 1) advanceGameStep();
  } else if (actionId === "btn-dunk-stock" || actionId === "ph-indicator-paper") {
    if (!g.sampleDropletPlaced && gameState.stepIndex <= 1) {
      showMistake("Contamination mistake: Never immerse test paper strips directly into the main sample bottle! Transfer a droplet using a clean glass rod.");
    } else {
      selectApparatus("ph-indicator-paper");
    }
  } else if (actionId.startsWith("swatch-") || actionId === "match_color_chart") {
    const chosenVal = parseInt(actionId.replace("swatch-", ""), 10) || 3;
    if (chosenVal === 3 || chosenVal === 2 || chosenVal === 4) {
      g.matchedPh = 3.0;
      renderWorkbenchApparatus(activeExperimentId);
      if (gameState.stepIndex === 2) advanceGameStep();
    } else {
      showMistake(`Color mismatch: Strip color is orange-red (~pH 3.0, acidic), whereas swatch ${chosenVal} represents a different pH band.`);
    }
  } else if (actionId === "calibrate_meter" || actionId === "btn-calibrate-meter") {
    g.meterCalibrated = true;
    g.electrodeRinsed = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 3) advanceGameStep();
  } else if (actionId === "btn-skip-cal-test") {
    showMistake("Analytical error: Attempting to measure sample pH without first calibrating the meter against standard buffers yields uncalibrated, inaccurate readings.");
  } else if (actionId === "rinse_and_measure" || actionId === "btn-measure-sample" || actionId === "laboratory-ph-meter") {
    if (!g.meterCalibrated) {
      showMistake("Analytical error: Calibrate the pH meter with standard buffer solution first!");
    } else {
      g.digitalReading = 2.85;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 4) advanceGameStep();
    }
  } else if (actionId === "beaker") {
    selectApparatus("beaker");
  } else if (actionId === "wash-bottle") {
    selectApparatus("wash-bottle");
  }
}

function renderPhDeterminationControls(container) {
  const isPaper = (gameState.phDetermination.method === "paper");
  const samplePlaced = gameState.phDetermination.sampleDropletPlaced;
  const isCal = gameState.phDetermination.meterCalibrated;
  container.innerHTML = `
    <div style="display:inline-flex; align-items:center; gap:0.4rem;">
      <button id="btn-method-paper" class="btn-scene-action-sm ${isPaper ? 'active' : ''}" onclick="setPhMethod('paper')">📄 Indicator Paper</button>
      <button id="btn-method-meter" class="btn-scene-action-sm ${!isPaper ? 'active' : ''}" onclick="setPhMethod('meter')">⚡ pH Meter</button>
    </div>
    ${isPaper ? `
      <button id="btn-dip-paper" class="btn-scene-action" onclick="handleGameAction('dip_test_paper')">
        ${samplePlaced ? '✓ Sample Droplet Placed' : '🧪 Touch Droplet to Paper'}
      </button>
      <button id="btn-dunk-stock" class="btn-scene-action-sm" onclick="handleGameAction('btn-dunk-stock')" title="Test dunking whole strip">
        ⚠️ Dunk Strip in Stock
      </button>
      <div class="color-chart-strip" title="Click matching color band to estimate pH">
        <span style="font-size:0.75rem; color:#94a3b8; font-weight:600;">Chart:</span>
        ${[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(ph => {
          const colors = ['#ef4444','#f87171','#fb923c','#fbbf24','#fde047','#a3e635','#4ade80','#2dd4bf','#38bdf8','#60a5fa','#818cf8','#a78bfa','#c084fc','#a855f7'];
          const c = colors[ph-1];
          return `<button class="chart-swatch" style="background:${c};" onclick="handleGameAction('swatch-${ph}')">${ph}</button>`;
        }).join('')}
      </div>
    ` : `
      <button id="btn-calibrate-meter" class="btn-scene-action" onclick="handleGameAction('calibrate_meter')">
        ${isCal ? '✓ Electrode Calibrated (pH 7.0)' : '💧 Rinse & Calibrate Electrode'}
      </button>
      <button id="btn-measure-sample" class="btn-scene-action" onclick="handleGameAction('rinse_and_measure')">
        📊 Rinse & Measure Sample A
      </button>
      <button id="btn-skip-cal-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-skip-cal-test')">
        ⚠️ Measure Without Cal
      </button>
      <span class="digital-readout-pill" id="ph-digital-pill">pH: ${gameState.phDetermination.digitalReading ? gameState.phDetermination.digitalReading.toFixed(2) : (isCal ? '7.00 CAL' : '--.--')} (Illustrative)</span>
    `}
  `;
}

function renderPhDeterminationSVG(stage) {
  const g = gameState.phDetermination;
  const paperColor = g.sampleDropletPlaced ? "#fb923c" : "#fef08a";
  const meterVal = g.digitalReading ? g.digitalReading.toFixed(2) : (g.meterCalibrated ? "7.00" : "--.--");

  stage.innerHTML = `
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <defs>
        <linearGradient id="beakerGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.35"/>
        </linearGradient>
      </defs>

      <!-- COLOR CHART HEADER (Interactive) -->
      <g transform="translate(140, 20)">
        <rect x="0" y="0" width="320" height="36" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="10" y="22" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94a3b8">Standard pH Chart (Estimate Only):</text>
        ${[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((ph, idx) => {
          const colors = ['#ef4444','#f87171','#fb923c','#fbbf24','#fde047','#a3e635','#4ade80','#2dd4bf','#38bdf8','#60a5fa','#818cf8','#a78bfa','#c084fc','#a855f7'];
          return `<rect x="${170 + idx * 10}" y="8" width="9" height="20" rx="1" fill="${colors[idx]}" stroke="#1e293b"/>`;
        }).join('')}
      </g>

      <!-- WATCH GLASS & TEST PAPER STRIP (Clickable) -->
      <g class="interactive-apparatus" data-item="ph-indicator-paper" onclick="onApparatusClick('ph-indicator-paper')" role="button" tabindex="0" aria-label="pH Indicator Paper">
        <ellipse cx="90" cy="360" rx="50" ry="16" fill="rgba(255,255,255,0.06)" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Indicator Paper Strip -->
        <rect id="anim-ph-paper-strip" x="75" y="320" width="28" height="70" rx="2" fill="${paperColor}" stroke="#ca8a04" stroke-width="1"/>
        <text x="89" y="358" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#0f172a" text-anchor="middle">${g.matchedPh ? '~3.0' : 'pH'}</text>
      </g>

      <!-- SAMPLE BEAKER (Clickable) -->
      <g class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Sample Beaker">
        <rect x="180" y="240" width="110" height="135" rx="4" fill="url(#beakerGrad)" stroke="#38bdf8" stroke-width="2"/>
        <rect x="183" y="275" width="104" height="97" fill="#38bdf8" opacity="0.4"/>
        <text x="235" y="325" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#f8fafc" text-anchor="middle">Sample A</text>
        <text x="235" y="340" font-family="Inter, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle">(Illustrative)</text>
      </g>

      <!-- GLASS STIRRING ROD (Clickable) -->
      <g class="interactive-apparatus" data-item="glass-stirring-rod" onclick="onApparatusClick('glass-stirring-rod')" role="button" tabindex="0" aria-label="Glass Stirring Rod">
        <line x1="160" y1="210" x2="220" y2="330" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
        <line x1="160" y1="210" x2="220" y2="330" stroke="#f8fafc" stroke-width="1.5" stroke-linecap="round"/>
      </g>

      <!-- LABORATORY pH METER BASE (Clickable) -->
      <g class="interactive-apparatus" data-item="laboratory-ph-meter" onclick="onApparatusClick('laboratory-ph-meter')" role="button" tabindex="0" aria-label="Laboratory pH Meter">
        <rect x="360" y="230" width="130" height="90" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <rect x="375" y="245" width="100" height="35" rx="3" fill="#020617" stroke="#334155"/>
        <text id="anim-ph-meter-display" x="425" y="268" font-family="Courier New, monospace" font-size="16" font-weight="700" fill="#38bdf8" text-anchor="middle">${meterVal}</text>
        <circle cx="390" cy="298" r="6" fill="#22c55e"/>
        <circle cx="410" cy="298" r="6" fill="#0284c7"/>
        <text x="445" y="302" font-family="Inter, sans-serif" font-size="9" fill="#94a3b8">Cal / Mode</text>
      </g>

      <!-- COMBINATION ELECTRODE & STAND -->
      <g transform="translate(320, 180)">
        <rect x="0" y="0" width="8" height="150" rx="2" fill="#64748b"/>
        <line x1="-30" y1="40" x2="10" y2="40" stroke="#475569" stroke-width="4"/>
        <!-- Glass Electrode Body -->
        <rect x="-34" y="35" width="8" height="95" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
        <circle cx="-30" cy="132" r="4.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
      </g>

      <!-- WASH BOTTLE (Clickable) -->
      <g class="interactive-apparatus" data-item="wash-bottle" onclick="onApparatusClick('wash-bottle')" role="button" tabindex="0" aria-label="Wash Bottle">
        <rect x="510" y="260" width="45" height="110" rx="10" fill="#f8fafc" opacity="0.8" stroke="#94a3b8" stroke-width="1.5"/>
        <path d="M 525 260 L 525 235 Q 525 220 540 220 L 550 220" fill="none" stroke="#94a3b8" stroke-width="3"/>
      </g>

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="89" y="405" text-anchor="middle" fill="#facc15" font-weight="600">Indicator Paper</text>
        <text x="235" y="390" text-anchor="middle" fill="#38bdf8" font-weight="600">Sample Beaker</text>
        <text x="425" y="335" text-anchor="middle" fill="#2dd4bf" font-weight="600">Digital pH Meter</text>
        <text x="532" y="390" text-anchor="middle" fill="#94a3b8">Wash Bottle</text>
      </g>
    </svg>
  `;
}

function applyPhDeterminationVisuals(p) {
  // Driven directly by state
}


// ==============================================================================
// EXPERIMENT 5: STANDARD SOLUTION PREPARATION IMPLEMENTATION
// ==============================================================================

function handleStandardSolutionAction(actionId, isMatch) {
  const g = gameState.standardSolution;

  if (actionId === "btn-tare-balance" || actionId === "analytical-balance") {
    g.balanceTared = true;
    g.massValue = "0.0000";
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
  } else if (actionId === "weigh_primary_standard" || actionId === "spatula" || actionId === "weighing-boat") {
    if (!g.balanceTared) {
      showMistake("Measurement error: Solid was added to the weighing boat without pressing Tare, introducing boat weight error.");
    } else {
      g.solidWeighed = true;
      g.massValue = "2.1200";
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 0) advanceGameStep();
    }
  } else if (actionId === "dissolve_in_beaker" || actionId === "beaker" || actionId === "glass-stirring-rod") {
    if (!g.solidWeighed) {
      showMistake("Weigh the solid on the analytical balance first!");
    } else {
      g.dissolvedInBeaker = true;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 1) advanceGameStep();
    }
  } else if (actionId === "btn-pour-direct-flask") {
    showMistake("Technique error: Never pour dry solid directly into a volumetric flask! Solid cakes in the narrow neck. Always dissolve in a beaker first.");
  } else if (actionId === "quantitative_transfer" || actionId === "volumetric-flask" || actionId === "glass-funnel") {
    if (!g.dissolvedInBeaker) {
      showMistake("Dissolve the solid completely in the beaker before transferring!");
    } else {
      g.funnelSeated = true;
      g.quantitativelyTransferred = true;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 2) advanceGameStep();
    }
  } else if (actionId === "fill_near_mark" || actionId === "wash-bottle") {
    if (!g.quantitativelyTransferred) {
      showMistake("Perform quantitative transfer of the dissolved solution first!");
    } else {
      g.filledNearMark = true;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 3) advanceGameStep();
    }
  } else if (actionId === "meniscus_drop" || actionId === "dropper") {
    g.meniscusLevel += 0.04;
    if (g.meniscusLevel > 1.05) {
      showMistake("Irreversible error: Meniscus rose above the etched calibration mark! The solution is over-diluted and concentration is ruined.");
    }
    renderWorkbenchApparatus(activeExperimentId);
  } else if (actionId === "meniscus_adjustment" || actionId === "btn-meniscus-lock") {
    if (g.meniscusLevel >= 0.94 && g.meniscusLevel <= 1.04) {
      g.meniscusLocked = true;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 4) advanceGameStep();
    } else if (g.meniscusLevel < 0.94) {
      showMistake("Keep adding drops! Meniscus has not yet reached the ring calibration line.");
    } else {
      showMistake("Meniscus overshot calibration mark! Discard and restart in real practice.");
    }
  } else if (actionId === "stopper_and_invert" || actionId === "btn-stopper-invert") {
    g.stoppered = true;
    g.invertedCount = Math.min(3, g.invertedCount + 1);
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (g.invertedCount >= 3 && gameState.stepIndex === 5) {
      advanceGameStep();
    }
  }
}

function renderStandardSolutionControls(container) {
  const g = gameState.standardSolution;
  container.innerHTML = `
    <span class="digital-readout-pill" id="balance-mass-pill">Mass: ${g.massValue} g (Illustrative)</span>
    <button id="btn-tare-balance" class="btn-scene-action-sm ${g.balanceTared ? 'active' : ''}" onclick="handleGameAction('btn-tare-balance')">
      ⚖️ Tare Balance
    </button>
    <button id="btn-add-solid" class="btn-scene-action" onclick="handleGameAction('weigh_primary_standard')">
      🥄 Weigh Solid on Boat
    </button>
    <button id="btn-dissolve-beaker" class="btn-scene-action" onclick="handleGameAction('dissolve_in_beaker')">
      🥣 Dissolve in Beaker First
    </button>
    <button id="btn-pour-direct-flask" class="btn-scene-action-sm" onclick="handleGameAction('btn-pour-direct-flask')">
      ⚠️ Pour Solid into Flask
    </button>
    <button id="btn-quant-transfer" class="btn-scene-action" onclick="handleGameAction('quantitative_transfer')">
      🧪 Quantitative Transfer
    </button>
    <button id="btn-fill-near-mark" class="btn-scene-action-sm" onclick="handleGameAction('fill_near_mark')">
      💧 Fill Near Mark (~1 cm)
    </button>
    <button id="btn-meniscus-drop" class="btn-scene-action-sm" onclick="handleGameAction('meniscus_drop')">
      🔬 Add Drops
    </button>
    <button id="btn-meniscus-lock" class="btn-scene-action-sm" onclick="handleGameAction('meniscus_adjustment')">
      🎯 Align at Mark
    </button>
    <button id="btn-stopper-invert" class="btn-scene-action" onclick="handleGameAction('stopper_and_invert')">
      🔄 Stopper & Invert (${g.invertedCount}/3)
    </button>
  `;
}

function renderStandardSolutionSVG(stage) {
  const g = gameState.standardSolution;
  const flaskLiquidH = g.meniscusLocked ? 130 : (g.filledNearMark ? 115 : (g.quantitativelyTransferred ? 60 : 0));

  stage.innerHTML = `
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <defs>
        <linearGradient id="flaskGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4"/>
        </linearGradient>
      </defs>

      <!-- ANALYTICAL BALANCE (Clickable) -->
      <g class="interactive-apparatus" data-item="analytical-balance" onclick="onApparatusClick('analytical-balance')" role="button" tabindex="0" aria-label="Analytical Balance">
        <rect x="40" y="210" width="140" height="160" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        <rect x="55" y="225" width="110" height="100" fill="rgba(56, 189, 248, 0.05)" stroke="#64748b"/>
        <!-- Balance Pan -->
        <rect x="85" y="305" width="50" height="6" rx="2" fill="#94a3b8"/>
        <!-- Digital Mass LED -->
        <rect x="55" y="335" width="110" height="24" rx="3" fill="#020617"/>
        <text x="110" y="352" font-family="Courier New, monospace" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">${g.massValue} g</text>
        <!-- Weighing boat on pan -->
        <polygon points="92,305 128,305 133,296 87,296" fill="#f8fafc" opacity="0.9"/>
        ${g.solidWeighed ? `<circle cx="110" cy="301" r="5" fill="#facc15"/>` : ''}
      </g>

      <!-- SPATULA -->
      <g class="interactive-apparatus" data-item="spatula" onclick="onApparatusClick('spatula')" role="button" tabindex="0" aria-label="Spatula">
        <line x1="25" y1="365" x2="65" y2="365" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
        <polygon points="25,363 15,365 25,367" fill="#64748b"/>
      </g>

      <!-- DISSOLUTION BEAKER (Clickable) -->
      <g class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Dissolution Beaker">
        <rect x="210" y="260" width="95" height="110" rx="3" fill="url(#flaskGrad)" stroke="#38bdf8" stroke-width="2"/>
        ${g.dissolvedInBeaker ? `<rect x="212" y="310" width="91" height="58" fill="#38bdf8" opacity="0.35"/>` : ''}
        <!-- Glass stirring rod in beaker -->
        <line x1="230" y1="230" x2="275" y2="350" stroke="#f8fafc" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      </g>

      <!-- VOLUMETRIC FLASK (250 mL) (Clickable) -->
      <g class="interactive-apparatus" data-item="volumetric-flask" onclick="onApparatusClick('volumetric-flask')" role="button" tabindex="0" aria-label="Volumetric Flask">
        <!-- Neck -->
        <rect x="365" y="170" width="20" height="110" fill="url(#flaskGrad)" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Etched calibration mark at y=225 -->
        <line x1="362" y1="225" x2="388" y2="225" stroke="#ef4444" stroke-width="2"/>
        <!-- Pear-shaped bulb base -->
        <path d="M 365 280 C 340 310, 330 360, 345 370 L 405 370 C 420 360, 410 310, 385 280 Z" fill="url(#flaskGrad)" stroke="#38bdf8" stroke-width="2"/>
        <!-- Liquid in flask -->
        ${flaskLiquidH > 0 ? `<path d="M 366 280 C 345 310, 335 360, 348 368 L 402 368 C 415 360, 405 310, 384 280 Z" fill="#38bdf8" opacity="0.4"/>` : ''}
        ${flaskLiquidH >= 115 ? `<rect x="367" y="${370 - flaskLiquidH}" width="16" height="${flaskLiquidH - 90}" fill="#38bdf8" opacity="0.45"/>` : ''}
        <!-- Stopper -->
        ${g.stoppered ? `<polygon points="370,170 380,170 383,150 367,150" fill="#94a3b8" stroke="#475569"/>` : ''}
      </g>

      <!-- ZOOMED MENISCUS INSET (Visible during meniscus adjustment) -->
      <g transform="translate(430, 60)">
        <rect x="0" y="0" width="140" height="110" rx="5" fill="#090d16" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="70" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#38bdf8" text-anchor="middle">Meniscus View (Eye Level)</text>
        <!-- Zoomed neck walls -->
        <line x1="45" y1="28" x2="45" y2="100" stroke="#64748b" stroke-width="3"/>
        <line x1="95" y1="28" x2="95" y2="100" stroke="#64748b" stroke-width="3"/>
        <!-- Calibration Ring Mark -->
        <line x1="38" y1="65" x2="102" y2="65" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="3 2"/>
        <text x="105" y="68" font-family="Inter, sans-serif" font-size="8" fill="#ef4444">Mark</text>
        <!-- Curved Concave Meniscus -->
        <path d="M 45 ${85 - g.meniscusLevel * 20} Q 70 ${92 - g.meniscusLevel * 20} 95 ${85 - g.meniscusLevel * 20}" fill="none" stroke="#38bdf8" stroke-width="3"/>
      </g>

      <!-- DROPPER (Clickable) -->
      <g class="interactive-apparatus" data-item="dropper" onclick="onApparatusClick('dropper')" role="button" tabindex="0" aria-label="Dropper">
        <g transform="translate(450, 240) rotate(-30)">
          <rect x="0" y="15" width="7" height="50" rx="1" fill="#f8fafc" opacity="0.8" stroke="#38bdf8"/>
          <rect x="-2" y="0" width="11" height="16" rx="4" fill="#ef4444"/>
        </g>
      </g>

      <!-- WASH BOTTLE -->
      <g class="interactive-apparatus" data-item="wash-bottle" onclick="onApparatusClick('wash-bottle')" role="button" tabindex="0" aria-label="Wash Bottle">
        <rect x="515" y="270" width="45" height="100" rx="8" fill="#f8fafc" opacity="0.8" stroke="#94a3b8" stroke-width="1.5"/>
      </g>

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="110" y="388" text-anchor="middle" fill="#38bdf8" font-weight="600">Analytical Balance</text>
        <text x="257" y="388" text-anchor="middle" fill="#2dd4bf" font-weight="600">Dissolution Beaker</text>
        <text x="375" y="388" text-anchor="middle" fill="#facc15" font-weight="600">Volumetric Flask (250 mL)</text>
      </g>
    </svg>
  `;
}

function applyStandardSolutionVisuals(p) {
  // Driven directly by state
}


// ==============================================================================
// EXPERIMENT 6: SIMPLE DISTILLATION IMPLEMENTATION
// ==============================================================================

function handleDistillationAction(actionId, isMatch) {
  const d = gameState.distillation;

  if (actionId === "assemble_glassware" || actionId === "distillation-apparatus" || actionId === "round-bottom-flask") {
    d.assembled = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "verify_open_system" || actionId === "thermometer") {
    d.openSystemVerified = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 1) advanceGameStep();
  } else if (actionId === "btn-seal-system-test") {
    showMistake("CATASTROPHIC HAZARD: Attempted to heat a closed/sealed distillation assembly! Thermal expansion will generate severe internal pressure and cause explosive glassware rupture.");
  } else if (actionId === "connect_cooling_water" || actionId === "condenser") {
    d.waterConnected = true;
    d.waterFlow = "correct";
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 2) advanceGameStep();
  } else if (actionId === "btn-water-wrong") {
    showMistake("Cooling defect: Connecting water in at the top causes water to run down one side leaving a large air pocket, drastically reducing condensation efficiency.");
  } else if (actionId === "apply_heat" || actionId === "hot-plate") {
    if (!d.waterConnected) {
      showMistake("Connect cooling water hoses before heating the distillation flask!");
    } else {
      d.heatingActive = true;
      d.tempC = 78;
      d.vaporRising = true;
      d.distillateDrops = 25;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 3) advanceGameStep();
    }
  } else if (actionId === "stop_before_dryness" || actionId === "btn-stop-heat") {
    d.heatingActive = false;
    d.stoppedBeforeDryness = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 4) advanceGameStep();
  } else if (actionId === "btn-dryness-test") {
    showMistake("Thermal hazard: Distilling to dryness causes severe overheating of the empty flask bottom, risking glass cracking and thermal ignition of concentrated peroxide residues.");
  } else if (actionId === "shutdown_sequence" || actionId === "btn-shutdown") {
    d.shutdownComplete = true;
    d.tempC = 25;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 5) advanceGameStep();
  }
}

function renderDistillationControls(container) {
  const d = gameState.distillation;
  container.innerHTML = `
    <span class="temperature-readout-pill" id="distill-temp-pill">🌡️ ${d.tempC}°C (Illustrative)</span>
    <button id="btn-assemble-rig" class="btn-scene-action" onclick="handleGameAction('assemble_glassware')">
      🔧 ${d.assembled ? '✓ Rig Assembled' : 'Assemble Glassware & Stand'}
    </button>
    <button id="btn-check-open-vent" class="btn-scene-action-sm" onclick="handleGameAction('verify_open_system')">
      🔍 Verify Open Vent & Bulb
    </button>
    <button id="btn-seal-system-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-seal-system-test')">
      ⚠️ Seal Receiver Vent
    </button>
    <button id="btn-water-correct" class="btn-scene-action-sm ${d.waterConnected && d.waterFlow === 'correct' ? 'active' : ''}" onclick="handleGameAction('connect_cooling_water')">
      🌊 Water: In Bottom / Out Top
    </button>
    <button id="btn-water-wrong" class="btn-scene-action-sm" onclick="handleGameAction('btn-water-wrong')">
      ⚠️ Water: In Top / Out Bottom
    </button>
    <button id="btn-apply-heat" class="btn-scene-action" onclick="handleGameAction('apply_heat')">
      ${d.heatingActive ? '🔥 Heating Active (~78°C)' : '🔥 Turn On Hot Plate'}
    </button>
    <button id="btn-stop-heat" class="btn-scene-action-sm" onclick="handleGameAction('stop_before_dryness')">
      🛑 Stop Heat (~5 mL Left)
    </button>
    <button id="btn-dryness-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-dryness-test')">
      ⚠️ Distill to Complete Dryness
    </button>
    <button id="btn-shutdown" class="btn-scene-action-sm" onclick="handleGameAction('shutdown_sequence')">
      ❄️ Cool & Shutdown
    </button>
  `;
}

function renderDistillationSVG(stage) {
  const d = gameState.distillation;

  stage.innerHTML = `
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <defs>
        <linearGradient id="distillGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.35"/>
        </linearGradient>
      </defs>

      <!-- HOT PLATE BASE (Clickable) -->
      <g class="interactive-apparatus" data-item="hot-plate" onclick="onApparatusClick('hot-plate')" role="button" tabindex="0" aria-label="Hot Plate">
        <rect x="70" y="330" width="140" height="40" rx="4" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <rect x="75" y="325" width="130" height="8" rx="2" fill="${d.heatingActive ? '#ef4444' : '#64748b'}"/>
        <circle cx="100" cy="350" r="7" fill="#020617"/>
        <circle cx="120" cy="350" r="4" fill="${d.heatingActive ? '#ef4444' : '#334155'}"/>
      </g>

      <!-- ROUND-BOTTOM FLASK (Clickable) -->
      <g class="interactive-apparatus" data-item="round-bottom-flask" onclick="onApparatusClick('round-bottom-flask')" role="button" tabindex="0" aria-label="Round-Bottom Flask">
        <!-- Bulb -->
        <circle cx="140" cy="285" r="40" fill="url(#distillGlass)" stroke="#38bdf8" stroke-width="2"/>
        <!-- Liquid in flask -->
        <path d="M 103 295 A 40 40 0 0 0 177 295 Z" fill="#38bdf8" opacity="0.45"/>
        <!-- Boiling chips -->
        <circle cx="130" cy="315" r="3" fill="#0f172a"/>
        <circle cx="145" cy="318" r="2.5" fill="#0f172a"/>
        <circle cx="152" cy="312" r="3" fill="#0f172a"/>
        <!-- Flask neck -->
        <rect x="131" y="210" width="18" height="40" fill="url(#distillGlass)" stroke="#38bdf8" stroke-width="1.5"/>
      </g>

      <!-- DISTILLATION HEAD (Clickable) -->
      <g class="interactive-apparatus" data-item="distillation-apparatus" onclick="onApparatusClick('distillation-apparatus')" role="button" tabindex="0" aria-label="Distillation Apparatus">
        <path d="M 131 210 L 131 150 L 149 150 L 149 175 L 200 200 L 195 210 L 149 187 L 149 210 Z" fill="url(#distillGlass)" stroke="#38bdf8" stroke-width="1.5"/>
      </g>

      <!-- THERMOMETER (Clickable) -->
      <g class="interactive-apparatus" data-item="thermometer" onclick="onApparatusClick('thermometer')" role="button" tabindex="0" aria-label="Thermometer">
        <rect x="137" y="90" width="6" height="85" rx="3" fill="#f8fafc" opacity="0.9" stroke="#94a3b8"/>
        <!-- Red Mercury / Alcohol Column -->
        <line x1="140" y1="175" x2="140" y2="${d.heatingActive ? '110' : '160'}" stroke="#ef4444" stroke-width="2"/>
        <circle cx="140" cy="175" r="3.5" fill="#ef4444"/>
      </g>

      <!-- LIEBIG CONDENSER (Clickable) -->
      <g class="interactive-apparatus" data-item="condenser" onclick="onApparatusClick('condenser')" role="button" tabindex="0" aria-label="Liebig Condenser">
        <!-- Outer Jacket -->
        <polygon points="198,198 335,275 345,260 208,183" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Inner Vapor Tube -->
        <line x1="195" y1="205" x2="350" y2="290" stroke="#f8fafc" stroke-width="5" opacity="0.6"/>
        <!-- Water Nipple IN (Bottom, at x=330, y=285) -->
        <rect x="325" y="280" width="12" height="15" rx="2" fill="#0284c7"/>
        <text x="320" y="305" font-family="Inter, sans-serif" font-size="8" fill="#38bdf8">Water IN</text>
        <!-- Water Nipple OUT (Top, at x=210, y=175) -->
        <rect x="210" y="170" width="12" height="15" rx="2" fill="#0284c7"/>
        <text x="210" y="165" font-family="Inter, sans-serif" font-size="8" fill="#38bdf8">Water OUT</text>
      </g>

      <!-- VACUUM TAKEOFF ADAPTER WITH OPEN VENT -->
      <g transform="translate(345, 280)">
        <polygon points="0,5 20,20 12,25 0,12" fill="#38bdf8" opacity="0.3"/>
        <!-- Open Vent Nipple -->
        <line x1="8" y1="8" x2="15" y2="0" stroke="#38bdf8" stroke-width="2.5"/>
        <text x="18" y="2" font-family="Inter, sans-serif" font-size="8" fill="#22c55e" font-weight="700">Open Vent (Safe)</text>
      </g>

      <!-- RECEIVING CONICAL FLASK (Clickable) -->
      <g class="interactive-apparatus" data-item="conical-flask" onclick="onApparatusClick('conical-flask')" role="button" tabindex="0" aria-label="Receiving Flask">
        <polygon points="360,305 375,305 400,365 335,365" fill="url(#distillGlass)" stroke="#38bdf8" stroke-width="1.5"/>
        ${d.distillateDrops > 0 ? `<polygon points="345,365 390,365 385,350 350,350" fill="#38bdf8" opacity="0.4"/>` : ''}
      </g>

      <!-- VAPOR & CONDENSATE ANIMATION -->
      ${d.heatingActive ? `
        <circle cx="140" cy="235" r="2" fill="#bae6fd" opacity="0.8"/>
        <circle cx="142" cy="190" r="2.5" fill="#bae6fd" opacity="0.8"/>
        <circle cx="240" cy="225" r="2" fill="#38bdf8" opacity="0.8"/>
        <circle cx="310" cy="265" r="2.5" fill="#38bdf8" opacity="0.8"/>
        <circle cx="367" cy="325" r="2" fill="#38bdf8"/>
      ` : ''}

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="140" y="388" text-anchor="middle" fill="#ef4444" font-weight="600">Boiling Flask on Hot Plate</text>
        <text x="270" y="225" text-anchor="middle" fill="#38bdf8" font-weight="600">Liebig Condenser</text>
        <text x="368" y="388" text-anchor="middle" fill="#2dd4bf" font-weight="600">Receiving Flask</text>
      </g>
    </svg>
  `;
}

function applyDistillationVisuals(p) {
  // Driven directly by state
}


// ==============================================================================
// EXPERIMENT 7: RECRYSTALLIZATION IMPLEMENTATION
// ==============================================================================

function handleRecrystallizationAction(actionId, isMatch) {
  const r = gameState.recrystallization;

  if (actionId === "dissolve_minimal_solvent" || actionId === "conical-flask" || actionId === "hot-plate") {
    r.solventPortion = "minimal";
    r.solidDissolved = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "btn-solvent-excess-test") {
    showMistake("Dilution error: Adding too much solvent prevents saturation upon cooling! Crystals will fail to nucleate or yield will be severely compromised.");
  } else if (actionId === "hot_filtration" || actionId === "glass-funnel" || actionId === "filter-paper") {
    r.hotFiltered = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 1) advanceGameStep();
  } else if (actionId === "slow_cooling" || actionId === "btn-slow-cooling") {
    r.coolingMode = "slow";
    r.slowCoolingComplete = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 2) advanceGameStep();
  } else if (actionId === "btn-ice-plunge-test") {
    showMistake("Crystallization defect: Plunging hot solution directly into ice induces flash precipitation, trapping impure mother liquor in tiny irregular crystal aggregates.");
  } else if (actionId === "ice_bath_chill" || actionId === "beaker") {
    r.iceBathChilled = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 3) advanceGameStep();
  } else if (actionId === "vacuum_filtration_wash" || actionId === "buchner-funnel") {
    r.vacuumFiltered = true;
    r.coldWashed = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 4) advanceGameStep();
  } else if (actionId === "microscope_observation" || actionId === "microscope" || actionId === "watch-glass") {
    r.crystalsObserved = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 5) advanceGameStep();
  }
}

function renderRecrystallizationControls(container) {
  const r = gameState.recrystallization;
  container.innerHTML = `
    <button id="btn-dissolve-minimal" class="btn-scene-action" onclick="handleGameAction('dissolve_minimal_solvent')">
      ☕ Dissolve in Minimal Hot Solvent
    </button>
    <button id="btn-solvent-excess-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-solvent-excess-test')">
      ⚠️ Add Excess Solvent
    </button>
    <button id="btn-hot-filter" class="btn-scene-action-sm" onclick="handleGameAction('hot_filtration')">
      ☕ Hot Gravity Filtration
    </button>
    <button id="btn-slow-cooling" class="btn-scene-action" onclick="handleGameAction('slow_cooling')">
      ⏳ Slow Cooling (Room Temp)
    </button>
    <button id="btn-ice-plunge-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-ice-plunge-test')">
      ⚠️ Plunge Hot Flask into Ice
    </button>
    <button id="btn-ice-chill" class="btn-scene-action-sm" onclick="handleGameAction('ice_bath_chill')">
      🧊 Ice-Bath Chill (Max Yield)
    </button>
    <button id="btn-vacuum-filter" class="btn-scene-action" onclick="handleGameAction('vacuum_filtration_wash')">
      🌀 Suction Filter & Cold Wash
    </button>
    <button id="btn-view-microscope" class="btn-scene-action-sm" onclick="handleGameAction('microscope_observation')">
      🔬 Examine Crystal Habit
    </button>
  `;
}

function renderRecrystallizationSVG(stage) {
  const r = gameState.recrystallization;

  stage.innerHTML = `
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <!-- HOT PLATE & DISSOLUTION FLASK -->
      <g class="interactive-apparatus" data-item="hot-plate" onclick="onApparatusClick('hot-plate')" role="button" tabindex="0" aria-label="Hot Plate">
        <rect x="40" y="330" width="110" height="35" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
        <rect x="45" y="325" width="100" height="6" fill="#f59e0b"/>
      </g>
      <g class="interactive-apparatus" data-item="conical-flask" onclick="onApparatusClick('conical-flask')" role="button" tabindex="0" aria-label="Conical Dissolution Flask">
        <polygon points="80,240 110,240 135,325 55,325" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/>
        <polygon points="63,325 127,325 120,295 70,295" fill="#facc15" opacity="0.4"/>
      </g>

      <!-- HOT GRAVITY FILTRATION FUNNEL -->
      <g class="interactive-apparatus" data-item="glass-funnel" onclick="onApparatusClick('glass-funnel')" role="button" tabindex="0" aria-label="Hot Filtration Funnel">
        <polygon points="170,230 220,230 198,270 192,270" fill="rgba(255,255,255,0.15)" stroke="#38bdf8" stroke-width="1.5"/>
        <rect x="193" y="270" width="4" height="25" fill="#38bdf8" opacity="0.6"/>
        <!-- Fluted filter paper inside -->
        <polygon points="175,233 215,233 195,268" fill="#f8fafc" opacity="0.8"/>
      </g>

      <!-- ICE BATH BEAKER -->
      <g class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Ice Bath Beaker">
        <rect x="250" y="270" width="100" height="100" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="2"/>
        <rect x="253" y="295" width="94" height="72" fill="#bae6fd" opacity="0.45"/>
        <!-- Floating ice cubes -->
        <rect x="260" y="298" width="14" height="14" rx="2" fill="#f8fafc" stroke="#38bdf8"/>
        <rect x="285" y="302" width="15" height="15" rx="2" fill="#f8fafc" stroke="#38bdf8"/>
        <rect x="315" y="296" width="14" height="14" rx="2" fill="#f8fafc" stroke="#38bdf8"/>
      </g>

      <!-- BUCHNER FUNNEL & SUCTION FLASK -->
      <g class="interactive-apparatus" data-item="buchner-funnel" onclick="onApparatusClick('buchner-funnel')" role="button" tabindex="0" aria-label="Büchner Funnel">
        <polygon points="390,265 410,265 435,365 365,365" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/>
        <!-- Porcelain Buchner top cylinder -->
        <rect x="375" y="215" width="50" height="30" rx="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="375,245 425,245 403,265 397,265" fill="#f8fafc" stroke="#cbd5e1"/>
        <!-- Crystal cake on filter disc -->
        ${r.vacuumFiltered ? `<rect x="380" y="238" width="40" height="6" fill="#fef08a"/>` : ''}
      </g>

      <!-- MICROSCOPE OBSERVATION VIEWPORT (Top right) -->
      <g class="interactive-apparatus" data-item="microscope" onclick="onApparatusClick('microscope')" role="button" tabindex="0" aria-label="Microscope">
        <rect x="460" y="60" width="125" height="125" rx="6" fill="#020617" stroke="#38bdf8" stroke-width="2"/>
        <text x="522" y="80" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#38bdf8" text-anchor="middle">Microscope Field</text>
        <circle cx="522" cy="120" r="35" fill="#090d16" stroke="#475569"/>
        <!-- Pure sharp prismatic crystal needles -->
        ${r.slowCoolingComplete ? `
          <polygon points="505,115 535,110 537,114 507,119" fill="#f8fafc" stroke="#38bdf8"/>
          <polygon points="515,100 528,135 531,134 518,99" fill="#f8fafc" stroke="#38bdf8"/>
          <polygon points="510,128 538,126 539,129 511,131" fill="#f8fafc" stroke="#38bdf8"/>
        ` : `
          <circle cx="520" cy="118" r="3" fill="#facc15"/>
          <circle cx="525" cy="123" r="2.5" fill="#facc15"/>
        `}
      </g>

      <!-- WATCH GLASS DRYING DISH -->
      <g class="interactive-apparatus" data-item="watch-glass" onclick="onApparatusClick('watch-glass')" role="button" tabindex="0" aria-label="Watch Glass">
        <ellipse cx="510" cy="345" rx="45" ry="14" fill="rgba(255,255,255,0.08)" stroke="#38bdf8" stroke-width="1.5"/>
        ${r.vacuumFiltered ? `<ellipse cx="510" cy="343" rx="20" ry="6" fill="#fef08a"/>` : ''}
      </g>

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="95" y="385" text-anchor="middle" fill="#facc15" font-weight="600">Dissolution Flask</text>
        <text x="195" y="385" text-anchor="middle" fill="#38bdf8">Hot Filtration</text>
        <text x="300" y="385" text-anchor="middle" fill="#2dd4bf" font-weight="600">Ice Bath</text>
        <text x="400" y="385" text-anchor="middle" fill="#f8fafc" font-weight="600">Büchner Funnel</text>
      </g>
    </svg>
  `;
}

function applyRecrystallizationVisuals(p) {
  // Driven directly by state
}


// ==============================================================================
// EXPERIMENT 8: pH-METRIC TITRATION IMPLEMENTATION
// ==============================================================================

function handlePhMetricAction(actionId, isMatch) {
  const p = gameState.phMetric;

  if (actionId === "calibrate_and_assemble" || actionId === "laboratory-ph-meter" || actionId === "btn-calibrate-electrode") {
    p.calibrated = true;
    p.electrodePositioned = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "record_initial_ph" || actionId === "btn-baseline-ph") {
    p.volumeAdded = 0.0;
    p.currentPh = 2.80;
    p.dataPoints = [{ v: 0.0, ph: 2.80 }];
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 1) advanceGameStep();
  } else if (actionId === "titrate_buffer_region" || actionId === "btn-add-2ml") {
    p.volumeAdded = Math.min(18.0, p.volumeAdded + 2.0);
    // Sigmoidal buffer formula: pH rises gently from 2.80 to ~4.80
    p.currentPh = 2.80 + (p.volumeAdded / 22.4) * 2.2;
    p.dataPoints.push({ v: p.volumeAdded, ph: p.currentPh });
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (p.volumeAdded >= 16.0 && gameState.stepIndex === 2) {
      advanceGameStep();
    }
  } else if (actionId === "dropwise_steep_region" || actionId === "btn-add-02ml") {
    p.volumeAdded = Math.min(26.0, p.volumeAdded + 0.5);
    // Steep sigmoidal transition
    const sigmoid = 1 / (1 + Math.exp(-(p.volumeAdded - 22.4) * 1.8));
    p.currentPh = 3.5 + sigmoid * 7.5;
    p.dataPoints.push({ v: p.volumeAdded, ph: p.currentPh });
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (p.volumeAdded >= 23.5 && gameState.stepIndex === 3) {
      advanceGameStep();
    }
  } else if (actionId === "btn-add-5ml-jump") {
    showMistake("Analytical flaw: Delivered a large 5.0 mL jump directly across the steep inflection region! In pH-metric titration, large increments obscure the inflection point, making accurate equivalence volume determination impossible.");
  } else if (actionId === "identify_equivalence_point" || actionId === "btn-mark-eq" || actionId === "ph-curve-graph") {
    p.equivalenceMarked = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 4) advanceGameStep();
  } else if (actionId === "burette" || actionId === "beaker" || actionId === "magnetic-stirrer") {
    selectApparatus(actionId);
  }
}

function renderPhMetricControls(container) {
  const p = gameState.phMetric;
  container.innerHTML = `
    <span class="digital-readout-pill" id="ph-metric-pill">pH: ${p.currentPh.toFixed(2)} | V: ${p.volumeAdded.toFixed(1)} mL (Illustrative)</span>
    <button id="btn-calibrate-electrode" class="btn-scene-action" onclick="handleGameAction('calibrate_and_assemble')">
      ⚡ ${p.calibrated ? '✓ Calibrated & Lowered' : 'Calibrate & Position Electrode'}
    </button>
    <button id="btn-baseline-ph" class="btn-scene-action-sm" onclick="handleGameAction('record_initial_ph')">
      📍 Record Baseline (0.0 mL)
    </button>
    <button id="btn-add-2ml" class="btn-scene-action" onclick="handleGameAction('titrate_buffer_region')">
      💧 Add 2.0 mL (Buffer Zone)
    </button>
    <button id="btn-add-02ml" class="btn-scene-action" onclick="handleGameAction('dropwise_steep_region')">
      💧 Add 0.5 mL (Dropwise Steep Zone)
    </button>
    <button id="btn-add-5ml-jump" class="btn-scene-action-sm" onclick="handleGameAction('btn-add-5ml-jump')">
      ⚠️ Add 5.0 mL Jump in Steep Zone
    </button>
    <button id="btn-mark-eq" class="btn-scene-action" onclick="handleGameAction('identify_equivalence_point')">
      🎯 Mark Equivalence Point
    </button>
  `;
}

function renderPhMetricSVG(stage) {
  const p = gameState.phMetric;

  // Generate SVG path for live titration curve
  const pointsStr = p.dataPoints.map(pt => {
    const x = 360 + (pt.v / 30.0) * 190;
    const y = 200 - (pt.ph / 14.0) * 140;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  stage.innerHTML = `
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <!-- BURETTE & RETORT STAND (Left) -->
      <g class="interactive-apparatus" data-item="retort-stand" onclick="onApparatusClick('retort-stand')" role="button" tabindex="0" aria-label="Retort Stand">
        <rect x="40" y="360" width="140" height="25" rx="3" fill="#475569" stroke="#334155"/>
        <rect x="80" y="40" width="10" height="320" rx="2" fill="#64748b"/>
      </g>
      <g class="interactive-apparatus" data-item="burette" onclick="onApparatusClick('burette')" role="button" tabindex="0" aria-label="Burette">
        <rect x="140" y="60" width="18" height="200" rx="3" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="1.5"/>
        <rect x="142" y="80" width="14" height="175" fill="#38bdf8" opacity="0.6"/>
        <circle cx="149" cy="265" r="4" fill="#0284c7"/>
      </g>

      <!-- MAGNETIC STIRRER & BEAKER -->
      <g class="interactive-apparatus" data-item="magnetic-stirrer" onclick="onApparatusClick('magnetic-stirrer')" role="button" tabindex="0" aria-label="Magnetic Stirrer">
        <rect x="100" y="340" width="120" height="35" rx="4" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <circle cx="120" cy="358" r="6" fill="#020617"/>
      </g>
      <g class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Analyte Beaker">
        <rect x="110" y="260" width="100" height="80" rx="3" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/>
        <rect x="113" y="285" width="94" height="53" fill="#38bdf8" opacity="0.35"/>
        <!-- Spinning stir bar -->
        <rect x="148" y="332" width="24" height="4" rx="2" fill="#f8fafc" stroke="#64748b"/>
      </g>

      <!-- GLASS pH ELECTRODE SUSPENDED IN BEAKER -->
      <g class="interactive-apparatus" data-item="laboratory-ph-meter" onclick="onApparatusClick('laboratory-ph-meter')" role="button" tabindex="0" aria-label="pH Electrode">
        <rect x="175" y="190" width="7" height="120" rx="2" fill="#e2e8f0" stroke="#64748b"/>
        <circle cx="178.5" cy="312" r="4.5" fill="#38bdf8" stroke="#0284c7"/>
      </g>

      <!-- DIGITAL pH METER CONSOLE (Center-bottom) -->
      <g transform="translate(230, 310)">
        <rect x="0" y="0" width="100" height="65" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <rect x="10" y="10" width="80" height="25" rx="2" fill="#020617"/>
        <text x="50" y="27" font-family="Courier New, monospace" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">${p.currentPh.toFixed(2)}</text>
        <text x="50" y="52" font-family="Inter, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">pH Meter</text>
      </g>

      <!-- LIVE TITRATION CURVE GRAPH (Top-right) -->
      <g id="ph-curve-graph" onclick="handleGameAction('identify_equivalence_point')" style="cursor:pointer;">
        <!-- Graph Box -->
        <rect x="340" y="45" width="240" height="185" rx="5" fill="#090d16" stroke="#1e293b" stroke-width="1.5"/>
        <text x="460" y="62" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">Live Sigmoidal pH Curve</text>
        <!-- Axes -->
        <line x1="360" y1="200" x2="560" y2="200" stroke="#475569" stroke-width="1.5"/>
        <line x1="360" y1="200" x2="360" y2="70" stroke="#475569" stroke-width="1.5"/>
        <!-- Labels -->
        <text x="560" y="214" font-family="Inter, sans-serif" font-size="8" fill="#94a3b8" text-anchor="end">Volume (mL)</text>
        <text x="355" y="75" font-family="Inter, sans-serif" font-size="8" fill="#94a3b8" text-anchor="end">pH 14</text>
        <text x="355" y="135" font-family="Inter, sans-serif" font-size="8" fill="#94a3b8" text-anchor="end">pH 7</text>
        <!-- pH 7 Neutral Guideline -->
        <line x1="360" y1="130" x2="560" y2="130" stroke="#334155" stroke-dasharray="2 2"/>
        
        <!-- Plotted Curve -->
        ${p.dataPoints.length > 1 ? `<polyline points="${pointsStr}" fill="none" stroke="#38bdf8" stroke-width="2.5"/>` : ''}

        <!-- Plotted Points -->
        ${p.dataPoints.map(pt => {
          const x = 360 + (pt.v / 30.0) * 190;
          const y = 200 - (pt.ph / 14.0) * 140;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#2dd4bf"/>`;
        }).join('')}

        <!-- Equivalence Point Marker -->
        ${p.equivalenceMarked ? `
          <circle cx="502" cy="116" r="6" fill="#f43f5e" stroke="#fff" stroke-width="2"/>
          <text x="502" y="105" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#f43f5e" text-anchor="middle">V_eq (22.4 mL)</text>
        ` : ''}
      </g>

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="149" y="45" text-anchor="middle" fill="#38bdf8" font-weight="600">Burette Titrant</text>
        <text x="160" y="388" text-anchor="middle" fill="#2dd4bf" font-weight="600">Stirred Analyte</text>
      </g>
    </svg>
  `;
}

function applyPhMetricVisuals(p) {
  // Driven directly by state
}

// Window Globals for Interactive & Testing Bindings
window.gameState = gameState;
window.resetGameState = resetGameState;
window.showMistake = showMistake;
window.hideMistake = hideMistake;
window.showHint = showHint;
window.skipStep = skipStep;
window.handleGameAction = handleGameAction;
window.setPhMethod = setPhMethod;
window.renderWorkbenchApparatus = renderWorkbenchApparatus;
window.renderSceneControls = renderSceneControls;
window.renderCurrentExperiment = renderCurrentExperiment;
window.stepPrev = stepPrev;
window.stepNext = stepNext;
window.resetQuizState = resetQuizState;
window.startAnimation = startAnimation;
window.pauseAnimation = pauseAnimation;
window.resetAnimation = resetAnimation;

