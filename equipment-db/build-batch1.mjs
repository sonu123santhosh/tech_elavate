import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const batch1 = [
  {
    id: "beaker",
    pdfNumber: 1,
    pdfName: "Beaker",
    pdfMainUse: "Holding and mixing liquids",
    pdfGroup: "Essential glassware and basics",
    name: "Beaker",
    category: "Glassware",
    purpose: "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
    image: {
      src: "assets/images/equipment/beaker.svg",
      alt: "Borosilicate glass laboratory beaker with volume markings and pouring spout",
      credit: "Laboratory Standard Vector Assets",
      status: "fallback"
    },
    ar: {
      modelFile: "assets/models/beaker.glb",
      modelStatus: "missing",
      interactions: ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
    },
    description: "A simple cylindrical glass container with a flat bottom and a small pouring spout (beak). Beakers are standard laboratory workhorses designed for stirring, mixing, collecting filtrates, and general liquid handling, but their graduation marks are purely approximate.",
    alternativeNames: ["Griffin beaker", "Low-form beaker", "Berzelius beaker"],
    commonUses: [
      "Mixing reagents and dissolving chemical solutes using a stirring rod",
      "Receiving liquid fractions or filtrates beneath a funnel",
      "Heating non-volatile aqueous solutions over a hot plate or wire gauze",
      "Temporary holding vessel for aliquots before measurement"
    ],
    types: [
      "Griffin (low-form) beaker with height roughly 1.4 times the diameter",
      "Berzelius (tall-form) beaker with high walls, ideal for titrations and minimal splattering",
      "Plastic (polypropylene/PMP) beaker for hydrofluoric acid or impact resistance"
    ],
    specifications: {
      material: ["Borosilicate glass 3.3", "Polypropylene (plastic variants)"],
      capacity: {
        value: "250",
        unit: "mL",
        notes: "Typical bench size is 250 mL; standard commercial sizes range from 10 mL to 5000 mL."
      },
      dimensions: "Diameter ~70 mm, Height ~95 mm (typical 250 mL Griffin beaker)",
      mainParts: ["Pouring spout", "Cylindrical body", "Graduated volume scale", "Marking spot", "Flat base"],
      partsAndFunctions: [
        {
          partName: "Pouring spout",
          function: "Directs liquid stream neatly into receiving vessels without dripping down the outer wall",
          handlingNotes: "Keep spout clean and check for small chips before pouring."
        },
        {
          partName: "Graduated volume scale",
          function: "Provides a quick visual estimate of contained liquid volume",
          handlingNotes: "Never use for quantitative analytical volume delivery."
        },
        {
          partName: "Marking spot",
          function: "Matte ceramic enamel patch allowing pencil or lab marker labeling",
          handlingNotes: "Erase or wipe clean with ethanol or acetone after use."
        }
      ],
      measurementAccuracy: {
        value: null,
        unit: "%",
        notes: "Nominal graduations are only accurate to approximately ±5% to ±10%; beakers must not be used for precision volumetry."
      },
      limitations: [
        "Unsuitable for precise volumetric measurements (use volumetric flask or graduated cylinder)",
        "Open mouth allows rapid solvent evaporation and vapor escape if uncovered",
        "Subject to thermal shock cracking if chilled suddenly while hot"
      ]
    },
    operatingInstructions: {
      preparation: [
        "Inspect the beaker rim, spout, and base for cracks, star-fractures, or chips",
        "Verify cleanliness; rinse with distilled water if trace contaminants could compromise the reaction",
        "Confirm that the beaker volume is roughly 1.5 to 2 times the liquid volume being handled to prevent splashing"
      ],
      steps: [
        {
          step: 1,
          title: "Positioning",
          instruction: "Place the beaker firmly on a flat, stable, level lab bench or support surface."
        },
        {
          step: 2,
          title: "Liquid Addition",
          instruction: "Pour liquids down the inside wall or guide them with a glass stirring rod to avoid splashback."
        },
        {
          step: 3,
          title: "Agitation",
          instruction: "Stir contents smoothly using a glass stirring rod or magnetic stir bar without striking the bottom glass forcefully."
        },
        {
          step: 4,
          title: "Pouring",
          instruction: "Lift the beaker by its upper body (using heat-resistant gloves or beaker tongs if hot) and pour steadily from the spout."
        }
      ],
      handlingTips: [
        "Never carry a full beaker solely by the rim with fingertips; support the side and base",
        "Cover with a clean watch glass when standing for extended periods to prevent dust ingress and solvent loss"
      ],
      shutdown: [
        "Transfer residual solution to appropriate waste or storage containers",
        "Rinse thoroughly and wash according to the lab detergent protocol",
        "Invert on a drying rack or pegboard to air dry completely"
      ]
    },
    safetyPrecautions: {
      requiredPPE: ["Safety goggles with side shields", "Standard lab coat", "Nitrile gloves"],
      hazards: ["Glass breakage lacerations", "Chemical splashes from vigorous mixing", "Thermal burns from heated liquids"],
      warnings: [
        "Never heat an empty beaker dry on a hot burner or hot plate",
        "Do not use cracked or chipped beakers under any circumstances"
      ],
      actionsToAvoid: [
        "Do not clamp a beaker tightly with a metal utility clamp around the middle",
        "Do not plunge a hot beaker into an ice bath or cold water"
      ],
      emergencyGuidance: [
        "In case of broken glass, sweep up using a dustpan and broom; never use bare hands",
        "For chemical skin splashes, immediately flush the affected area with copious water for 15 minutes"
      ]
    },
    maintenanceAndTroubleshooting: {
      cleaningSteps: [
        "Wash with warm water and a laboratory-grade phosphate-free detergent using a soft sponge",
        "Rinse three times with tap water, followed by a final rinse with deionized or distilled water",
        "Air dry inverted or bake in a glassware drying oven up to 100 °C"
      ],
      storageInstructions: [
        "Store in a clean glassware cabinet or shelf grouped by volume size",
        "Avoid stacking heavy beakers inside each other unless cushioned with lint-free paper"
      ],
      maintenanceChecks: [
        "Inspect before every laboratory session under good lighting for hairline cracks and rim chips",
        "Check that printed volume graduation lines remain legible"
      ],
      troubleshooting: [
        {
          problem: "Liquid dribbles down the outside of the beaker during pouring",
          possibleCauses: ["Pouring too hesitantly", "Damaged or chipped pouring spout", "Surface tension bridging across rim"],
          solution: ["Pour with a swift, steady motion or hold a glass stirring rod vertically across the spout to direct flow"],
          prevention: ["Check spout integrity and practice pouring technique with water"],
          requiresSupervisor: false
        },
        {
          problem: "Persistent white residue on the inner wall",
          possibleCauses: ["Mineral salt precipitate from hard tap water", "Insoluble metal hydroxide scale"],
          solution: ["Soak with dilute (0.1 M) hydrochloric acid or lab glass cleaner, then rinse thoroughly with DI water"],
          prevention: ["Always perform a final rinse with distilled or deionized water"],
          requiresSupervisor: false
        },
        {
          problem: "Visible crack develops while heating",
          possibleCauses: ["Pre-existing mechanical flaw", "Uneven heat distribution from direct flame contact"],
          solution: ["Immediately cut heat source, inform lab partners to step back, allow cooling, and treat vessel contents as waste"],
          prevention: ["Always use a ceramic-centered wire gauze when heating over an open flame"],
          requiresSupervisor: true
        }
      ],
      commonMistakes: [
        {
          mistake: "Using beaker volume markings to measure quantitative analytical solutions",
          whyItMatters: "Beaker graduation tolerances (±5% to ±10%) introduce massive systematic experimental errors",
          howToAvoid: "Use a graduated cylinder, volumetric pipette, or volumetric flask for quantitative measurement"
        },
        {
          mistake: "Picking up a hot beaker bare-handed or with thin nitrile gloves",
          whyItMatters: "Causes severe thermal burns and involuntary dropping of boiling chemicals",
          howToAvoid: "Always use dedicated insulated beaker tongs or heat-resistant silicone grips"
        }
      ]
    },
    relatedEquipment: [
      {
        equipmentId: "conical-flask",
        relationship: "alternative",
        reason: "Both are standard bench reaction vessels, but conical flasks reduce splash risk during swirling.",
        difference: "A beaker has straight vertical walls and an open mouth; a conical flask tapers inward to facilitate vigorous swirling."
      },
      {
        equipmentId: "measuring-cylinder",
        relationship: "complementary",
        reason: "Used when liquid volumes need to be measured before transferring into the beaker.",
        difference: "A measuring cylinder has calibrated precision graduations (typically ±1%), whereas a beaker offers only rough volume estimates."
      },
      {
        equipmentId: "glass-stirring-rod",
        relationship: "complementary",
        reason: "Used directly inside beakers to mix solutions and dissolve reagents safely.",
        difference: "The stirring rod is a solid glass rod for agitation, whereas the beaker is the containment vessel."
      }
    ],
    metadata: {
      difficultyLevel: "Beginner",
      lastReviewed: "",
      reviewStatus: "needs-review",
      completeness: {
        schema: "valid",
        content: "complete-applicable",
        evidence: "unverified"
      },
      references: [
        {
          title: "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
          url: "",
          urlChecked: false,
          sourceType: "Academic Textbook",
          supports: ["General glassware usage", "Laboratory heating safety"]
        },
        {
          title: "ASTM E960 - Standard Specification for Laboratory Glass Beakers",
          url: "",
          urlChecked: false,
          sourceType: "Technical Standard",
          supports: ["Dimensions, Griffin vs Berzelius forms, capacity tolerances"]
        }
      ]
    }
  },
  {
    id: "test-tube",
    pdfNumber: 2,
    pdfName: "Test Tube",
    pdfMainUse: "Small-scale chemical reactions",
    pdfGroup: "Essential glassware and basics",
    name: "Test Tube",
    category: "Glassware",
    purpose: "Holds small chemical volumes for qualitative testing, color observations, and heating.",
    image: {
      src: "assets/images/equipment/test-tube.svg",
      alt: "Cylindrical clear glass test tube with rounded bottom and flared rim",
      credit: "Laboratory Standard Vector Assets",
      status: "fallback"
    },
    ar: {
      modelFile: "assets/models/test-tube.glb",
      modelStatus: "missing",
      interactions: ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
    },
    description: "A narrow, open-topped cylindrical glass tube with a U-shaped rounded bottom. Designed for micro- and semi-microscale chemistry, qualitative analysis, precipitation tests, and observing color shifts or gas evolution with minimal reagent consumption.",
    alternativeNames: ["Culture tube", "Sample tube", "Boiling tube (larger variant)"],
    commonUses: [
      "Performing qualitative precipitation and cation/anion spot tests",
      "Heating small volumes of solution over a gentle micro-burner flame",
      "Observing color changes and gas evolution in screening experiments",
      "Holding biological cultures or small centrifuged samples"
    ],
    types: [
      "Standard test tube (typically 16 × 150 mm, borosilicate or soda-lime glass)",
      "Boiling tube (wide-diameter 25 × 150 mm, designed for vigorous boiling)",
      "Rimless culture tube (smooth lip for bacteriological closures)"
    ],
    specifications: {
      material: ["Borosilicate glass 3.3 (heat-resistant)", "Soda-lime glass (disposable/non-heating)"],
      capacity: {
        value: "20 to 30",
        unit: "mL",
        notes: "Typical 16 × 150 mm tube holds approx 25 mL nominal total volume; standard boiling tubes hold ~50 mL."
      },
      dimensions: "Diameter ~16 mm, Length ~150 mm (standard size)",
      mainParts: ["Flared rim", "Cylindrical tube body", "Hemispherical rounded base"],
      partsAndFunctions: [
        {
          partName: "Flared rim",
          function: "Provides structural rigidity to prevent cracking and facilitates pouring and stopper fitting",
          handlingNotes: "Check rim for micro-chips before inserting stoppers or clamping."
        },
        {
          partName: "Cylindrical tube body",
          function: "Enables clear optical observation of color, turbidity, and phase interfaces",
          handlingNotes: "Keep outer walls free of fingerprints and smudges for accurate observations."
        },
        {
          partName: "Hemispherical rounded base",
          function: "Eliminates sharp corners where precipitates could lodge and allows even heat distribution",
          handlingNotes: "Must be supported in a rack; cannot stand upright independently."
        }
      ],
      measurementAccuracy: {
        value: null,
        unit: "",
        notes: "Not applicable: ungraduated reaction vessel without volumetric calibration."
      },
      limitations: [
        "Cannot stand upright on a flat surface without a test tube rack",
        "Narrow opening makes vigorous boiling prone to violent liquid ejection (bumping)",
        "Soda-lime variants will shatter if subjected to direct burner flame"
      ]
    },
    operatingInstructions: {
      preparation: [
        "Select a borosilicate glass tube if heating is required; confirm by manufacturer markings",
        "Inspect tube for cracks or scratches along the length and around the rounded base",
        "Place tubes in a clean test tube rack prior to adding any chemicals"
      ],
      steps: [
        {
          step: 1,
          title: "Filling Reagents",
          instruction: "Add reagents using a dropper or pipette, filling to no more than one-third of the tube height (especially if heating)."
        },
        {
          step: 2,
          title: "Mixing",
          instruction: "Gently tap the lower side of the tube with a finger to swirl contents, or vortex smoothly. Never cover the mouth with your bare thumb."
        },
        {
          step: 3,
          title: "Heating (if required)",
          instruction: "Grip the upper third of the tube with a wooden or metal test-tube holder. Angle the tube at roughly 45° and move continuously through the flame."
        },
        {
          step: 4,
          title: "Cooling & Settling",
          instruction: "Return the tube to a test tube rack to cool; never place a hot glass tube directly onto a cold bench or plastic surface."
        }
      ],
      handlingTips: [
        "When heating, always point the open mouth of the test tube away from yourself and all nearby lab partners",
        "Never fill more than one-third full when intending to boil or heat"
      ],
      shutdown: [
        "Dispose of reaction mixtures into the assigned chemical waste container",
        "Clean immediately with a test tube brush and laboratory detergent",
        "Invert tubes on peg racks or rack drying pins to dry"
      ]
    },
    safetyPrecautions: {
      requiredPPE: ["Safety goggles with side shields", "Standard lab coat", "Nitrile gloves"],
      hazards: ["Liquid ejection (bumping) during heating", "Thermal shock glass shattering", "Corrosive chemical skin contact"],
      warnings: [
        "Never point the mouth of a test tube at anyone while heating or adding reagents",
        "Never heat a sealed or tightly stoppered test tube"
      ],
      actionsToAvoid: [
        "Do not hold a test tube with bare hands while heating in a flame",
        "Do not shake a test tube vertically while holding a finger or thumb over the open end"
      ],
      emergencyGuidance: [
        "If hot liquid erupts onto skin, immediately flush under cold emergency running water for 15 minutes",
        "If a test tube shatters in a rack, use tongs and a brush to collect fragments into a sharps container"
      ]
    },
    maintenanceAndTroubleshooting: {
      cleaningSteps: [
        "Insert a appropriately sized test tube brush moistened with detergent water",
        "Gently scrub inner walls, ensuring the wire tip does not force-puncture the rounded bottom",
        "Rinse thoroughly three times with tap water and once with deionized water"
      ],
      storageInstructions: [
        "Store inverted in a clean wooden or plastic test tube drying rack",
        "For long-term storage, keep in partitioned drawer trays or clean storage boxes"
      ],
      maintenanceChecks: [
        "Check that tubes are borosilicate before placing in heating kits",
        "Discard tubes with etched, clouded, or severely scratched inner surfaces"
      ],
      troubleshooting: [
        {
          problem: "Superheated liquid erupts violently from the tube (bumping)",
          possibleCauses: ["Heating too rapidly in one spot", "Tube filled beyond safe capacity", "Absence of smooth thermal convection"],
          solution: ["Immediately remove from heat, let cool slightly, and ensure gentle continuous wave agitation while heating"],
          prevention: ["Keep the tube moving constantly through the flame and keep volume below one-third total height"],
          requiresSupervisor: false
        },
        {
          problem: "Precipitate clings stubbornly to the bottom curve",
          possibleCauses: ["Insoluble metal salts dried into glass surface", "Improper brush size leaving base unreached"],
          solution: ["Add 1-2 mL of dilute acid or specific solvent, soak for 5 minutes, then scrub with a curved-tip test tube brush"],
          prevention: ["Rinse reaction tubes promptly after completing observations before precipitates dry"],
          requiresSupervisor: false
        },
        {
          problem: "Tube cracks immediately upon flame contact",
          possibleCauses: ["Accidentally used non-borosilicate soda-lime tube", "Pre-existing micro-fracture from dropping"],
          solution: ["Extinguish burner, treat contents as spill/waste, and sweep broken glass into sharps bin"],
          prevention: ["Verify manufacturer borosilicate stamp and inspect glass before heating"],
          requiresSupervisor: true
        }
      ],
      commonMistakes: [
        {
          mistake: "Pointing the open tube mouth toward oneself or a neighbor while heating",
          whyItMatters: "Rapid steam formation can blast boiling acid or caustic reagents directly into eyes and face",
          howToAvoid: "Always tilt the tube at 45 degrees pointing into an empty corner of the workspace or fume hood"
        },
        {
          mistake: "Placing a hot tube directly onto a cold countertop or plastic rack",
          whyItMatters: "Causes immediate thermal shock shattering or melts plastic rack pegs",
          howToAvoid: "Use a heat-tolerant metal or wooden test tube rack and let cool gradually"
        }
      ]
    },
    relatedEquipment: [
      {
        equipmentId: "test-tube-rack",
        relationship: "complementary",
        reason: "Test tubes have rounded bottoms and cannot stand upright without a rack.",
        difference: "The test tube is the reaction vessel; the rack is the static support structure."
      },
      {
        equipmentId: "test-tube-holder",
        relationship: "complementary",
        reason: "Essential tool for safely holding the tube while heating in a flame.",
        difference: "The holder is a clamp-like handling device; the test tube is the glassware."
      },
      {
        equipmentId: "test-tube-brush",
        relationship: "complementary",
        reason: "Designed specifically to reach the narrow interior and rounded bottom for cleaning.",
        difference: "The brush is a dedicated maintenance tool for cleaning test tubes."
      }
    ],
    metadata: {
      difficultyLevel: "Beginner",
      lastReviewed: "",
      reviewStatus: "needs-review",
      completeness: {
        schema: "valid",
        content: "complete-applicable",
        evidence: "unverified"
      },
      references: [
        {
          title: "Laboratory Safety Guidance (OSHA 3404-11R)",
          url: "",
          urlChecked: false,
          sourceType: "Government Safety Document",
          supports: ["Safe heating techniques", "PPE requirements"]
        },
        {
          title: "ISO 4142 - Laboratory glassware — Test tubes",
          url: "",
          urlChecked: false,
          sourceType: "International Standard",
          supports: ["Standard dimensions", "Borosilicate thermal specifications"]
        }
      ]
    }
  }
];

fs.writeFileSync(path.join(__dirname, 'data', 'batch1_partial.json'), JSON.stringify(batch1, null, 2));
console.log('Batch 1 seed created successfully');
