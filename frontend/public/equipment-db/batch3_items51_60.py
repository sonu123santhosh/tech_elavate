# -*- coding: utf-8 -*-
"""
Batch 3 Items 51-60:
51. centrifuge
52. ph-indicator-solution
53. conductivity-meter
54. colorimeter
55. spectrophotometer
56. hydrometer
57. refractometer
58. forceps
59. test-tube-brush
60. rubber-stopper
"""

ITEMS_51_TO_60 = [
    # 51. Centrifuge
    {
        "id": "centrifuge",
        "pdfNumber": 51,
        "pdfName": "Centrifuge",
        "pdfMainUse": "Separating components by spinning",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Centrifuge",
        "category": "Separation Equipment",
        "purpose": "Accelerates the settling and separation of suspended solids from liquids using high centrifugal force.",
        "image": {
            "src": "assets/images/equipment/centrifuge.svg",
            "alt": "Benchtop laboratory clinical centrifuge with safety locking lid, digital speed timer, and angled rotor",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/centrifuge.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An electromechanical separation device that rotates liquid samples at high angular velocities inside an enclosed rotor chamber. The resulting centrifugal acceleration forces denser suspended particulates and precipitates outward and downward to the bottom of tubes, leaving a clear supernatant liquid.",
        "alternativeNames": ["Benchtop centrifuge", "Clinical centrifuge", "Microcentrifuge (microfuge)"],
        "commonUses": [
            "Separating fine chemical precipitates from reaction supernatants prior to decanting",
            "Pelleting cellular debris, bacteria, and macromolecules in biochemistry assays",
            "Separating blood plasma or serum from cellular blood components",
            "Breaking difficult emulsions that do not separate cleanly by gravity"
        ],
        "types": [
            "Fixed-angle rotor centrifuge (holds tubes at rigid 45° angle; compact pellet forms along lower tube wall)",
            "Swinging-bucket rotor centrifuge (buckets swing horizontally during spin; pellet forms flat at very bottom)",
            "Microcentrifuge (high-speed benchtop unit designed for 1.5/2.0 mL microcentrifuge tubes up to 15,000 rpm)"
        ],
        "specifications": {
            "material": ["Cast aluminum or carbon-fiber rotor", "Heavy steel safety containment bowl", "Impact-resistant polycarbonate/steel lid"],
            "capacity": {
                "value": "6 to 12",
                "unit": "tubes",
                "notes": "Standard student bench model accommodates 6 to 12 tubes (15 mL conical or round-bottom centrifuge tubes); speeds up to 4000-6000 rpm."
            },
            "dimensions": "Footprint ~300 × 350 mm, Height ~260 mm (typical bench model)",
            "mainParts": ["High-speed central electric motor drive", "Symmetrical multi-bore rotor", "Armored safety containment shield", "Electromechanical lid safety interlock", "Digital speed and timer control panel"],
            "partsAndFunctions": [
                {
                    "partName": "Symmetrical multi-bore rotor",
                    "function": "Spins tubes at balanced radial positions around the central spindle shaft",
                    "handlingNotes": "MUST be strictly counterbalanced before spinning."
                },
                {
                    "partName": "Electromechanical lid safety interlock",
                    "function": "Prevents the lid from being opened while the rotor is spinning and blocks motor activation if lid is ajar",
                    "handlingNotes": "Never attempt to override or bypass safety lid latches."
                },
                {
                    "partName": "Armored safety containment shield",
                    "function": "Heavy steel inner liner designed to contain shattered glass and flying fragments during rotor crash",
                    "handlingNotes": "Inspect chamber for cleanliness and debris."
                }
            ],
            "measurementAccuracy": {
                "value": 50.0,
                "unit": "rpm",
                "notes": "Digital tachometer regulates rotational speed to ±50 rpm; Relative Centrifugal Force (RCF / g-force) calculated based on rotor radius."
            },
            "limitations": [
                "Strict balancing is mandatory: spinning an unbalanced rotor can wreck the spindle bearings and cause violent physical destruction",
                "Standard thin-walled glass test tubes will crush under centrifugal g-force (must use thick-walled centrifuge tubes)",
                "Creates dangerous aerosols if tubes with infectious or volatile contents are spun uncapped"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect rotor chamber to confirm it is clean, dry, and free from glass shards or spilled liquids",
                "Use only dedicated, thick-walled centrifuge tubes designed to withstand high RCF",
                "Mandatory Balance Check: fill a counterbalance tube with water until its mass matches your sample tube to within 0.1 g on a balance"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Loading Balanced Pairs",
                    "instruction": "Place the sample tube in a rotor well, and place the identical-mass counterbalance tube directly opposite (180 degrees apart) in the rotor."
                },
                {
                    "step": 2,
                    "title": "Lid Closure",
                    "instruction": "Close the centrifuge lid firmly until the mechanical safety interlock clicks shut."
                },
                {
                    "step": 3,
                    "title": "Parameter Setting and Run",
                    "instruction": "Set desired speed (e.g. 3000 rpm) and run time (e.g. 5 minutes). Press START. Remain at the unit for the first 30 seconds to verify smooth, quiet acceleration."
                },
                {
                    "step": 4,
                    "title": "Braking and Unloading",
                    "instruction": "Allow rotor to come to a complete stop on its own. Listen for the unlock click, open the lid, and remove tubes carefully without disturbing the settled pellet."
                }
            ],
            "handlingTips": [
                "If the centrifuge begins vibrating, shaking, or rumbling, abort immediately by pressing the STOP button",
                "Never use your hands or an object to slow down a spinning rotor; wait for the automated brake"
            ],
            "shutdown": [
                "Remove all tubes and counterbalances from the rotor",
                "Wipe chamber with a damp disinfectant cloth if any liquid droplet spilled",
                "Leave lid slightly ajar to allow moisture to evaporate, or close per lab policy"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Mechanical rotor explosion from severe imbalance", "Flying glass and aerosol discharge from tube breakage", "High-speed entangling rotating parts"],
            "warnings": [
                "NEVER operate a centrifuge without an exact mass counterbalance tube loaded directly opposite",
                "NEVER attempt to bypass the lid safety interlock or reach into a spinning rotor"
            ],
            "actionsToAvoid": [
                "Do not spin ordinary thin-walled reaction test tubes (they will crush under centrifugal force)",
                "Do not spin open, unstoppered tubes containing hazardous or volatile chemicals"
            ],
            "emergencyGuidance": [
                "If violent shaking, screeching, or thumping occurs, hit the STOP button immediately and pull the wall plug",
                "If a tube breaks, keep lid closed for 30 minutes to allow aerosols to settle, then decontaminate with forceps and disinfectant"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Unplug the centrifuge before cleaning the rotor and bowl",
                "Remove rotor (if detachable) and wash with neutral detergent; rinse thoroughly with DI water and dry",
                "Disinfect chamber bowl with 70% isopropanol or quaternary ammonium disinfectant; avoid bleach on aluminum rotors (causes corrosion pitting)"
            ],
            "storageInstructions": [
                "Keep installed on a level, heavy, vibration-free workbench with at least 30 cm clearance around the unit",
                "Keep power cord routed away from walk paths"
            ],
            "maintenanceChecks": [
                "Inspect aluminum rotor bores monthly for corrosion pitting, hairline stress cracks, or chemical etching",
                "Check that the lid safety latch locks firmly and cannot be opened during rotation"
            ],
            "troubleshooting": [
                {
                    "problem": "Centrifuge vibrates intensely and 'walks' across the benchtop when started",
                    "possibleCauses": ["Tubes loaded without equal mass counterbalance; tubes not placed 180° opposite"],
                    "solution": ["Hit STOP immediately. Weigh both tubes on a balance to ensure identical masses and reload directly opposite"],
                    "prevention": ["Always weigh opposing tube pairs on a top-pan balance before loading"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Glass tube shatters inside the rotor during spinning",
                    "possibleCauses": ["Used non-centrifuge thin-walled glass tube; spun above maximum rated RCF"],
                    "solution": ["Wait 30 minutes for aerosols to settle, don heavy gloves, use forceps to pick out glass into sharps bin, and sponge bowl with disinfectant"],
                    "prevention": ["Use dedicated polypropylene or rated borosilicate centrifuge tubes"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Lid remains locked and will not open after cycle ends",
                    "possibleCauses": ["Rotor has not come to a complete zero-rpm stop; safety solenoid stuck"],
                    "solution": ["Wait until zero speed is confirmed; use emergency mechanical manual pin release only if instructed"],
                    "prevention": ["Allow unit to cycle to complete standstill"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Balancing tubes by 'visual liquid height' instead of weighing on a balance",
                    "whyItMatters": "Liquids of different densities (e.g. water vs concentrated salt solution) have wildly different masses at identical volumes, creating massive high-speed imbalance",
                    "howToAvoid": "Always weigh opposing tubes on a laboratory balance to ensure equal mass"
                },
                {
                    "mistake": "Trying to stop a spinning rotor with your fingers or a folded paper towel",
                    "whyItMatters": "A rotor spinning at thousands of rpm has tremendous kinetic energy that instantly fractures bones, severs fingers, and tears skin",
                    "howToAvoid": "Never touch a moving rotor; allow the automated electric brake to bring it to a complete standstill"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "test-tube",
                "relationship": "alternative",
                "reason": "Standard test tubes cannot be centrifuged at high speeds; specialized centrifuge tubes must be used.",
                "difference": "Standard test tubes are thin-walled for heating; centrifuge tubes are thick-walled to resist g-forces."
            },
            {
                "equipmentId": "top-pan-balance",
                "relationship": "complementary",
                "reason": "Opposing centrifuge tubes are weighed on a top-pan balance to ensure exact counterbalance mass.",
                "difference": "The balance verifies equal mass; the centrifuge performs the centrifugal separation."
            },
            {
                "equipmentId": "dropper",
                "relationship": "complementary",
                "reason": "Used to carefully aspirate and remove the clear supernatant liquid above the centrifuged pellet.",
                "difference": "The centrifuge settles the pellet; the dropper collects the supernatant."
            }
        ],
        "metadata": {
            "difficultyLevel": "Intermediate",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "IEC 61010-2-020: Safety Requirements for Laboratory Centrifuges",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Rotor containment engineering, lid interlock standards, balance limits"]
                },
                {
                    "title": "Biosafety in Microbiological and Biomedical Laboratories (CDC/NIH 6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Manual",
                    "supports": ["Aerosol containment, safety cups, decontamination protocols"]
                }
            ]
        }
    },

    # 52. pH Indicator Solution
    {
        "id": "ph-indicator-solution",
        "pdfNumber": 52,
        "pdfName": "pH Indicator Solution",
        "pdfMainUse": "Indicating acidity or alkalinity by color",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "pH Indicator Solution",
        "category": "pH and Analytical Instruments",
        "purpose": "Indicates solution acidity or alkalinity through vivid visual color changes across specific pH transition intervals.",
        "image": {
            "src": "assets/images/equipment/ph-indicator-solution.svg",
            "alt": "Amber dropper bottle of universal chemical pH indicator solution showing full spectrum colors",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/ph-indicator-solution.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An aqueous or ethanolic solution of a weak organic acid or base dye that exhibits distinct, reversible structural color shifts between its protonated (acid) and deprotonated (conjugate base) forms. Used in dropwise amounts to signal titration endpoints or determine sample pH.",
        "alternativeNames": ["Acid-base indicator", "Universal indicator solution", "Titration indicator", "Colorimetric indicator"],
        "commonUses": [
            "Signaling the equivalence point in acid-base titrations by sharp color transition (e.g. phenolphthalein pink endpoint)",
            "Determining approximate pH of clear solutions across a continuous spectrum using universal indicator",
            "Observing chemical equilibrium shifts in acid-base buffer systems",
            "Educational demonstrations of neutralization reactions and ocean acidification"
        ],
        "types": [
            "Universal indicator solution (blend of thymol blue, methyl red, bromothymol blue, phenolphthalein; red=acid, green=neutral, violet=base)",
            "Phenolphthalein solution (colorless in acid pH < 8.2; vibrant magenta/pink in alkaline pH > 10.0)",
            "Methyl orange solution (red below pH 3.1; yellow above pH 4.4; ideal for strong acid/weak base titrations)",
            "Bromothymol blue solution (yellow below pH 6.0; green at neutral pH 7.0; blue above pH 7.6)"
        ],
        "specifications": {
            "material": ["Organic indicator dye solutes (dissolved in aqueous ethanol solution)", "Amber glass dropper bottle with polyethylene cap"],
            "capacity": {
                "value": "50 to 100",
                "unit": "mL",
                "notes": "Standard laboratory dropper bottles contain 50 mL or 100 mL of 0.1% w/v indicator solution."
            },
            "dimensions": "Dropper bottle height ~110 mm, Diameter ~45 mm",
            "mainParts": ["Amber glass storage bottle", "Integrated glass/plastic dropper pipette", "Calibrated pH-color reference card"],
            "partsAndFunctions": [
                {
                    "partName": "Amber glass storage bottle",
                    "function": "Shields photosensitive organic indicator dyes from UV degradation",
                    "handlingNotes": "Keep tightly capped when not in use."
                },
                {
                    "partName": "Integrated glass/plastic dropper pipette",
                    "function": "Dispenses controlled micro-drops (typically 2 to 3 drops per 25 mL sample)",
                    "handlingNotes": "Avoid touching dropper tip to reaction solutions."
                },
                {
                    "partName": "Calibrated pH-color reference card",
                    "function": "Provides visual color comparison standards across the pH spectrum",
                    "handlingNotes": "View under diffuse white light against white background."
                }
            ],
            "measurementAccuracy": {
                "value": 0.5,
                "unit": "pH",
                "notes": "Visual colorimetric determination accurate to approximately ±0.5 pH unit (or ±0.1 mL titrant volume at titration endpoint)."
            },
            "limitations": [
                "Indicators are themselves weak acids or bases; adding too many drops consumes titrant and introduces systematic analytical titration error",
                "Cannot be used in dark, turbid, or intensely colored solutions where visual color transitions are obscured",
                "Does not provide continuous digital numerical readings (use electronic pH meter instead)"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Select the indicator whose pKa and transition range match the equivalence point of your specific titration",
                "Inspect the indicator solution to ensure it is clear, fresh, and free from microbial mold or precipitates",
                "Have white background tile in place under your reaction flask"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Minimal Dosage",
                    "instruction": "Add exactly 2 to 3 drops of indicator solution to the analyte solution in the conical flask. Do NOT add squirts or excessive drops."
                },
                {
                    "step": 2,
                    "title": "Initial Observation",
                    "instruction": "Swirl the flask to mix thoroughly. Note the initial starting color (e.g. clear for phenolphthalein in acid, or red for universal indicator)."
                },
                {
                    "step": 3,
                    "title": "Titration to Endpoint",
                    "instruction": "Titrate with titrant from the burette while swirling continuously until the color transition persists throughout the entire solution for at least 30 seconds."
                },
                {
                    "step": 4,
                    "title": "Color Matching (for Universal Indicator)",
                    "instruction": "If determining pH with universal indicator, compare the resulting liquid color against the provided printed reference chart over a white tile."
                }
            ],
            "handlingTips": [
                "The '2-drop rule': adding more than 2-3 drops of indicator introduces excess weak acid into your flask, altering titration stoichiometry",
                "Always place a white ceramic tile or sheet of clean white paper under the conical flask to see faint color shifts clearly"
            ],
            "shutdown": [
                "Cap the indicator dropper bottle securely immediately after dispensing",
                "Return bottle to designated bench reagent rack",
                "Dispose of titrated indicator mixtures in assigned chemical waste carboys"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Eye irritation from solvent carrier (ethanol)", "Dye staining of skin and clothing", "Toxic ingestion"],
            "warnings": [
                "Phenolphthalein indicator is classified as a suspected carcinogen; handle with gloves and avoid inhalation/ingestion",
                "Keep flammable ethanolic indicator solutions away from open burner flames"
            ],
            "actionsToAvoid": [
                "Do not add excessive volume (more than 3-4 drops) to an analytical titration",
                "Do not use expired, clouded, or precipitate-laden indicator solutions"
            ],
            "emergencyGuidance": [
                "If indicator solution splashes into eyes, immediately flush at eyewash station for 15 minutes",
                "Wash stained skin with soap and warm water; stain fades over 24-48 hours"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe dropper bottle neck and cap with an ethanol wipe if crusted dye accumulates",
                "Wash stained glassware with warm water, detergent, and ethanol rinse to dissolve organic dyes"
            ],
            "storageInstructions": [
                "Store in amber glass bottles in a dark, cool reagent cabinet",
                "Keep away from direct heat and strong oxidizers"
            ],
            "maintenanceChecks": [
                "Check solution clarity; discard if mold growth or insoluble dye precipitates appear",
                "Verify color response periodically by testing drops against pH 4, 7, and 10 reference buffers"
            ],
            "troubleshooting": [
                {
                    "problem": "Titration endpoint is sluggish and color change takes several milliliters to occur",
                    "possibleCauses": ["Wrong indicator chosen; indicator transition range does not match titration pH equivalence jump"],
                    "solution": ["Check titration curve: for strong acid/strong base use phenolphthalein or bromothymol blue; for strong acid/weak base use methyl orange"],
                    "prevention": ["Always calculate expected equivalence point pH before selecting indicator"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Analyte solution requires significantly more titrant than theoretical calculation",
                    "possibleCauses": ["Added 10-20 drops of indicator solution instead of 2 drops, consuming excess titrant"],
                    "solution": ["Re-do titration adding strictly 2 drops of indicator"],
                    "prevention": ["Always adhere strictly to the 2-drop rule"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Phenolphthalein color fades and turns colorless again after standing for 2 minutes",
                    "possibleCauses": ["Atmospheric carbon dioxide dissolved into the open flask, forming carbonic acid that neutralizes the slight excess base"],
                    "solution": ["The true endpoint is reached when the faint pink color persists for 30 seconds; ignore slow fading after several minutes"],
                    "prevention": ["Swirl gently and take reading as soon as 30-second persistence is confirmed"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Adding half a dropper-full (1-2 mL) of indicator solution to a titration flask",
                    "whyItMatters": "Indicators are weak organic acids; adding excessive amounts consumes significant titrant volume, creating massive experimental error",
                    "howToAvoid": "Strictly add only 2 to 3 drops per 25-50 mL of titration solution"
                },
                {
                    "mistake": "Titrating without a white ceramic tile underneath the flask",
                    "whyItMatters": "The faint first appearance of pale pink (phenolphthalein) or yellow-to-orange is invisible against dark black or wooden benchtops, causing over-titration",
                    "howToAvoid": "Always place a clean white porcelain tile or white sheet of paper beneath the conical flask"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "ph-indicator-paper",
                "relationship": "alternative",
                "reason": "Both use colorimetric dyes, but indicator paper tests external droplets without adding dye into the reaction.",
                "difference": "Indicator solution is added directly into the flask; indicator paper tests an external droplet."
            },
            {
                "equipmentId": "burette",
                "relationship": "complementary",
                "reason": "pH indicator solutions signal the visual endpoint when dispensing titrant from a burette.",
                "difference": "The indicator provides the visual signal; the burette measures the volume of delivered titrant."
            },
            {
                "equipmentId": "conical-flask",
                "relationship": "complementary",
                "reason": "Indicator drops are added directly into the conical flask containing analyte solution.",
                "difference": "The indicator is the colorimetric reagent; the conical flask is the mixing vessel."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Indicator pKa values, transition intervals, titration selection criteria"]
                },
                {
                    "title": "Quantitative Chemical Analysis (Harris, 9th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Equivalence point indicators, 30-second endpoint rule, indicator error calculation"]
                }
            ]
        }
    },

    # 53. Conductivity Meter
    {
        "id": "conductivity-meter",
        "pdfNumber": 53,
        "pdfName": "Conductivity Meter",
        "pdfMainUse": "Measuring electrical conductivity",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Conductivity Meter",
        "category": "pH and Analytical Instruments",
        "purpose": "Measures the electrical conductivity of aqueous solutions to determine ionic concentration and purity.",
        "image": {
            "src": "assets/images/equipment/conductivity-meter.svg",
            "alt": "Digital benchtop conductivity meter with 2-electrode platinum probe and digital LCD display",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/conductivity-meter.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An analytical electrochemical instrument consisting of an electronic meter console and a submerged probe containing two or four platinized or graphite electrode plates. Applies an alternating electrical voltage to measure electrolytic conductance in microSiemens per centimeter (µS/cm) or milliSiemens per centimeter (mS/cm).",
        "alternativeNames": ["EC meter", "Conductance meter", "TDS meter (total dissolved solids)", "Salinity meter"],
        "commonUses": [
            "Verifying the purity of deionized and distilled laboratory water (pure DI water < 1.0 µS/cm)",
            "Conductometric titrations (monitoring conductance changes to find equivalence points in cloudy mixtures)",
            "Determining total dissolved solids (TDS) and salinity in environmental water samples",
            "Monitoring dissolution kinetics of ionic electrolytes in aqueous solutions"
        ],
        "types": [
            "Benchtop digital conductivity meter (precision 4-electrode probe with automatic temperature compensation, ATC)",
            "Handheld portable field conductivity pen (compact, battery-powered waterproof tester for field ecology)",
            "Inductive / toroidal conductivity meter (electrodeless toroid coil probe for highly corrosive or dirty industrial streams)"
        ],
        "specifications": {
            "material": ["Platinized platinum or graphite electrode plates", "Epoxy or glass probe body", "Impact-resistant ABS meter console"],
            "capacity": {
                "value": "0.01 µS/cm to 200 mS/cm",
                "unit": "µS/cm",
                "notes": "Dynamic measuring range typically covers 0.01 µS/cm (ultrapure water) up to 200 mS/cm (concentrated brine)."
            },
            "dimensions": "Console ~210 × 160 × 65 mm; Probe length ~140 mm, Diameter ~12 mm",
            "mainParts": ["Electrode sensing probe with protective guard", "Two or four parallel platinized/graphite electrode plates", "Built-in NTC/PT100 temperature compensation sensor", "Microprocessor meter console with digital LCD", "Articulated probe stand"],
            "partsAndFunctions": [
                {
                    "partName": "Electrode sensing probe",
                    "function": "Submerges into test solution with precisely defined cell constant (K, typically 1.0 cm⁻¹)",
                    "handlingNotes": "Rinse thoroughly with DI water between tests; do not touch platinum black surfaces."
                },
                {
                    "partName": "Platinized/graphite electrode plates",
                    "function": "Conducts alternating current across the liquid gap to prevent electrochemical electrode polarization",
                    "handlingNotes": "Keep clean and free from oil films."
                },
                {
                    "partName": "Built-in NTC temperature sensor",
                    "function": "Measures solution temperature to normalize readings to standard 20 °C or 25 °C reference baseline",
                    "handlingNotes": "Ensure sensor is submerged."
                }
            ],
            "measurementAccuracy": {
                "value": 0.5,
                "unit": "%",
                "notes": "Accuracy typically ±0.5% of full scale reading; resolution 0.01 µS/cm to 0.1 mS/cm depending on range."
            },
            "limitations": [
                "Measures total ionic conductance indiscriminately; cannot identify specific individual ion species (e.g. Na⁺ vs K⁺)",
                "Temperature has huge impact (~2% conductance change per °C); must use automatic temperature compensation (ATC)",
                "Air bubbles trapped between electrode plates cause severe measurement errors"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect probe to confirm electrode plates are clean and cell guard is properly seated",
                "Calibrate with a certified potassium chloride (KCl) standard conductivity solution (e.g. 1413 µS/cm at 25 °C)",
                "Rinse probe thoroughly with fresh deionized water and blot dry with a lint-free tissue (do not rub)"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Submersion",
                    "instruction": "Submerge the probe into the sample solution ensuring both electrode plates and the temperature sensor hole are completely covered by at least 2 cm of liquid."
                },
                {
                    "step": 2,
                    "title": "Bubble Clearance",
                    "instruction": "Tap the probe gently against the side or swirl smoothly in the solution to dislodge any air bubbles trapped between the electrode plates."
                },
                {
                    "step": 3,
                    "title": "Stabilization",
                    "instruction": "Hold or clamp the probe motionless in the center of the beaker. Wait 15 to 30 seconds for the temperature sensor and conductance reading to stabilize."
                },
                {
                    "step": 4,
                    "title": "Recording",
                    "instruction": "When the stability indicator icon locks on the LCD, record the conductivity value and unit (µS/cm or mS/cm) along with the sample temperature."
                }
            ],
            "handlingTips": [
                "Always tap the probe gently to dislodge air bubbles from between the electrode plates before reading",
                "Never rub the platinum electrode faces with abrasive paper; blot gently with lint-free wipes"
            ],
            "shutdown": [
                "Rinse probe thoroughly with deionized water from a wash bottle",
                "Store probe in pure deionized water or dry according to manufacturer probe instructions",
                "Power down the meter console and cover with dust cover"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical splash when immersing probe", "Cross-contamination of solutions", "Electrical shock if console gets wet"],
            "warnings": [
                "Never immerse the meter console or cable connector in liquid (probe body only is waterproof)",
                "Do not test solutions containing concentrated hydrofluoric acid with glass probes"
            ],
            "actionsToAvoid": [
                "Do not wipe or scrub platinum black electrode coatings with abrasive materials",
                "Do not let samples dry out on the probe surface"
            ],
            "emergencyGuidance": [
                "If chemical splashes occur during probe insertion, immediately flush affected areas under running water for 15 minutes",
                "Unplug meter console immediately if liquid enters the chassis"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Rinse immediately after every measurement with deionized water",
                "For organic grease or oil films, soak probe in warm detergent water or ethanol for 5 minutes, then rinse exhaustively with DI water",
                "For calcium carbonate mineral scaling, soak in 0.1 M hydrochloric acid for 2 minutes, then rinse with DI water"
            ],
            "storageInstructions": [
                "Store probe in deionized water (short-term) or dry with protective guard cap installed (long-term, per manufacturer specification)",
                "Keep console on dry benchtop away from liquid sinks and heat sources"
            ],
            "maintenanceChecks": [
                "Calibrate weekly against standard 1413 µS/cm or 12.88 mS/cm KCl reference standards",
                "Inspect platinum black coating; if grey or peeling, probe requires professional replatinizing"
            ],
            "troubleshooting": [
                {
                    "problem": "Conductivity readings are erratically low and jump when probe is shaken",
                    "possibleCauses": ["Air bubble trapped between the electrode plates inside the probe guard"],
                    "solution": ["Tap the probe gently against the beaker wall while submerged to dislodge trapped air bubbles"],
                    "prevention": ["Always swirl and tap probe upon immersion"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Calibration with 1413 µS/cm standard fails or gives error",
                    "possibleCauses": ["Electrodes dirty or coated with grease film; calibration standard expired or diluted"],
                    "solution": ["Clean probe with ethanol and dilute acid, rinse thoroughly with DI water, and use fresh unopened KCl standard"],
                    "prevention": ["Never pour used calibration standard back into the stock bottle"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Conductivity drifts continuously with temperature changes",
                    "possibleCauses": ["Automatic Temperature Compensation (ATC) turned off or wrong temperature coefficient set"],
                    "solution": ["Enable ATC on the meter menu and verify temperature coefficient is set to standard 2.0% / °C"],
                    "prevention": ["Confirm ATC icon is active on display before taking data"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Failing to tap the probe to clear trapped air bubbles after immersion",
                    "whyItMatters": "Air is an electrical insulator; bubbles blocking the electrode plates cause massive false low conductivity readings",
                    "howToAvoid": "Always swirl and tap the probe against the beaker wall to dislodge bubbles before taking a reading"
                },
                {
                    "mistake": "Scrubbing the delicate platinum electrode plates with paper towels to clean them",
                    "whyItMatters": "Scrapes off the spongy microscopic 'platinum black' coating that provides surface area, permanently ruining calibration",
                    "howToAvoid": "Never scrub or scrape electrodes; rinse with DI water and blot gently with a lint-free tissue"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "laboratory-ph-meter",
                "relationship": "similar",
                "reason": "Both are benchtop electrochemical analytical meters that use immersion probes to measure solution properties.",
                "difference": "A conductivity meter measures total ionic conductance; a pH meter measures specific hydrogen ion activity."
            },
            {
                "equipmentId": "wash-bottle",
                "relationship": "complementary",
                "reason": "Essential for thoroughly rinsing conductivity electrode plates with deionized water between measurements.",
                "difference": "The wash bottle provides the rinse water; the conductivity meter takes the measurement."
            },
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Solutions are held in clean glass beakers while the conductivity probe is submerged.",
                "difference": "The beaker contains the fluid sample; the meter measures the conductance."
            }
        ],
        "metadata": {
            "difficultyLevel": "Intermediate",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ASTM D1125 - Standard Test Methods for Electrical Conductivity and Resistivity of Water",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Cell constants, temperature compensation coefficients, calibration standard solutions"]
                },
                {
                    "title": "Standard Methods for the Examination of Water and Wastewater (Method 2510 Conductivity)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Analytical Compendium",
                    "supports": ["Electrolytic conductivity measurement protocols, electrode maintenance"]
                }
            ]
        }
    },

    # 54. Colorimeter
    {
        "id": "colorimeter",
        "pdfNumber": 54,
        "pdfName": "Colorimeter",
        "pdfMainUse": "Measuring color intensity",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Colorimeter",
        "category": "pH and Analytical Instruments",
        "purpose": "Measures the absorbance of specific wavelengths of light in a colored solution to determine chemical concentration via Beer-Lambert law.",
        "image": {
            "src": "assets/images/equipment/colorimeter.svg",
            "alt": "Digital benchtop laboratory colorimeter with cuvette chamber, filter selector, and digital LCD display",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/colorimeter.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An optical analytical instrument that passes light of a specific selected wavelength (using optical glass filters or multi-wavelength LEDs) through a liquid cuvette onto a silicon photodiode detector. Measures optical absorbance (A) and percent transmittance (%T) to quantify chemical concentration based on the Beer-Lambert law.",
        "alternativeNames": ["Filter photometer", "Absorption colorimeter", "Photoelectric colorimeter"],
        "commonUses": [
            "Determining the concentration of colored chemical solutes (e.g. copper sulfate, potassium permanganate)",
            "Monitoring reaction kinetics by tracking color intensity changes over time",
            "Quantifying biological assays (e.g. Bradford protein assay, glucose oxidase assay)",
            "Testing phosphate, nitrate, and iron levels in environmental water testing"
        ],
        "types": [
            "Digital LED multi-wavelength colorimeter (standard student model with 4 to 8 selectable wavelength LEDs: 430, 470, 565, 635 nm)",
            "Filter wheel colorimeter (classic laboratory model utilizing gelatin or glass bandpass optical filters)",
            "Handheld portable colorimeter (waterproof field unit pre-programmed for specific water testing parameters)"
        ],
        "specifications": {
            "material": ["ABS plastic housing", "Optical glass or polystyrene cuvettes (10 mm pathlength)", "Silicon photodiode detector"],
            "capacity": {
                "value": "3.5",
                "unit": "mL",
                "notes": "Standard standard cuvette volume is 3.5 mL (10 × 10 mm pathlength); micro-cuvettes hold ~1.0 mL."
            },
            "dimensions": "Overall footprint ~180 × 150 × 60 mm; Cuvette slot 12.5 × 12.5 mm",
            "mainParts": ["Light source (tungsten lamp or multi-colored LEDs)", "Optical filter / wavelength selector", "Light-tight cuvette sample chamber with hinged lid", "Silicon photodetector", "Digital LCD display", "CAL / ZERO button"],
            "partsAndFunctions": [
                {
                    "partName": "Optical filter / wavelength selector",
                    "function": "Selects the complementary color wavelength most strongly absorbed by the colored chemical solution",
                    "handlingNotes": "Choose filter complementary to solution color (e.g., use red filter for blue copper solution)."
                },
                {
                    "partName": "Light-tight cuvette sample chamber with hinged lid",
                    "function": "Holds the optical cuvette and blocks stray ambient laboratory room light from striking the detector",
                    "handlingNotes": "Always close the chamber lid completely before taking a reading."
                },
                {
                    "partName": "CAL / ZERO button",
                    "function": "Calibrates 0.000 Absorbance (100% Transmittance) using a blank solvent cuvette",
                    "handlingNotes": "Zero with pure solvent blank before measuring samples."
                }
            ],
            "measurementAccuracy": {
                "value": 0.01,
                "unit": "Abs",
                "notes": "Absorbance measurement accuracy typically ±0.01 Abs; range from 0.000 to 2.000 Abs (0.1% to 100% T)."
            },
            "limitations": [
                "Limited to discrete broadband wavelengths (bandwidth ~20-40 nm); lacks the continuous narrow spectrum of a spectrophotometer",
                "Cannot measure clear, colorless solutions (requires a colored complexing reagent)",
                "Fingerprints or scratches on optical cuvette faces cause false high absorbance readings"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Power on colorimeter and allow 10-15 minutes for light source and electronics to thermally stabilize",
                "Select the complementary wavelength filter (e.g. 630 nm red filter for blue copper solution; 430 nm blue filter for yellow solution)",
                "Prepare a 'blank' cuvette filled with the pure solvent (e.g. distilled water) without solute"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Blank Preparation",
                    "instruction": "Fill a clean optical cuvette three-quarters full with pure blank solvent. Wipe the two smooth optical faces with a lint-free Kimwipe tissue to remove fingerprints."
                },
                {
                    "step": 2,
                    "title": "Zeroing the Instrument",
                    "instruction": "Insert blank cuvette into the chamber, orienting clear optical faces toward the light path. Close the chamber lid and press CAL / ZERO until display reads 0.000 Abs."
                },
                {
                    "step": 3,
                    "title": "Sample Measurement",
                    "instruction": "Rinse a second clean cuvette with the test sample, fill three-quarters full, wipe optical faces clean, insert into chamber with identical orientation, and close lid."
                },
                {
                    "step": 4,
                    "title": "Recording Absorbance",
                    "instruction": "Record the absorbance value immediately from the digital display. Plot on a Beer-Lambert calibration curve (Absorbance vs Concentration) to determine concentration."
                }
            ],
            "handlingTips": [
                "Handle optical cuvettes ONLY by their frosted or ribbed side faces; touching optical windows leaves greasy fingerprints that absorb light",
                "Always align the cuvette with the triangular arrow index mark pointing in the direction of the light beam"
            ],
            "shutdown": [
                "Remove cuvettes from sample chamber; never leave liquid inside the instrument",
                "Rinse cuvettes thoroughly with deionized water and dry",
                "Turn off colorimeter power switch and cover with dust cover"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical contamination of cuvette slot", "Electrical damage from liquid spills inside optics", "Exposure to toxic reagents"],
            "warnings": [
                "Never spill liquid inside the cuvette sample compartment; corrodes photodetector and optical filters",
                "Always wipe the outside of cuvettes bone-dry before inserting into the instrument"
            ],
            "actionsToAvoid": [
                "Do not leave the sample chamber lid open during reading (stray light invalidates data)",
                "Do not clean optical cuvettes with abrasive paper towels that cause scratching"
            ],
            "emergencyGuidance": [
                "If liquid spills into the cuvette holder, turn off power, pull plug, and soak up liquid with Kimwipes immediately",
                "In case of chemical skin contact, rinse with water for 15 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Clean exterior instrument housing with a damp cloth; never spray liquids directly into cuvette chamber",
                "Wash cuvettes with warm soapy water and a soft foam swab; rinse exhaustively with deionized water",
                "Store optical cuvettes in padded boxes to prevent scratching"
            ],
            "storageInstructions": [
                "Store on dry benchtop covered with a dust cover",
                "Keep optical filters stored in velvet-lined boxes away from moisture and dust"
            ],
            "maintenanceChecks": [
                "Check optical filter glass for scratches, fading, or cloudiness",
                "Verify linearity using standard potassium dichromate or food dye calibration solutions"
            ],
            "troubleshooting": [
                {
                    "problem": "Absorbance reading drifts or fluctuates wildly",
                    "possibleCauses": ["Instrument not warmed up", "Cuvette chamber lid is open or cracked letting in room light", "Air bubbles in cuvette"],
                    "solution": ["Allow 15-minute warm up; close lid completely; tap cuvette to release micro-bubbles"],
                    "prevention": ["Always warm up instrument and inspect cuvettes for bubbles"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Absorbance is unexpectedly high (>2.0 Abs) and flatlines",
                    "possibleCauses": ["Sample is too concentrated and absorbs >99% of incident light; outside Beer-Lambert linear range"],
                    "solution": ["Dilute the sample quantitatively by a factor of 2 or 5, re-measure, and multiply by dilution factor"],
                    "prevention": ["Keep absorbance values within the linear range between 0.1 and 1.0 Abs"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Blank will not zero; display flashes error",
                    "possibleCauses": ["Light source bulb burned out; wrong wavelength filter installed; cuvette inserted with opaque faces blocking beam"],
                    "solution": ["Rotate cuvette so clear optical faces align with light path; check bulb; replace filter"],
                    "prevention": ["Verify clear optical path before zeroing"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Touching the clear optical faces of the cuvette with bare fingers",
                    "whyItMatters": "Skin oils and fingerprints scatter and absorb light, adding 0.05 to 0.20 false absorbance error to every reading",
                    "howToAvoid": "Hold cuvettes strictly by the frosted or grooved side faces, and wipe optical windows with a Kimwipe before inserting"
                },
                {
                    "mistake": "Taking absorbance readings with the cuvette chamber lid open",
                    "whyItMatters": "Bright room ambient light floods into the photodetector, completely blinding the detector and destroying reading accuracy",
                    "howToAvoid": "Always ensure the hinged chamber lid is fully closed before recording measurements"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "spectrophotometer",
                "relationship": "alternative",
                "reason": "Spectrophotometers offer continuously tunable monochromatic light (190-1100 nm) with diffraction gratings.",
                "difference": "A colorimeter uses broad filters/LEDs for visible light; a spectrophotometer uses diffraction gratings across UV and visible ranges."
            },
            {
                "equipmentId": "volumetric-flask",
                "relationship": "complementary",
                "reason": "Serial standard calibration solutions are accurately diluted in volumetric flasks prior to colorimetric measurement.",
                "difference": "The volumetric flask prepares known concentrations; the colorimeter measures optical absorbance."
            },
            {
                "equipmentId": "pipette",
                "relationship": "complementary",
                "reason": "Pipettes transfer exact volumes of color-developing reagents and samples into cuvettes.",
                "difference": "The pipette transfers the aliquot; the colorimeter analyzes the optical absorbance."
            }
        ],
        "metadata": {
            "difficultyLevel": "Intermediate",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Beer-Lambert law, filter selection, colorimetric calibration methods"]
                },
                {
                    "title": "ASTM E275 - Standard Practice for Describing and Measuring Performance of Ultraviolet, Visible, and Near-Infrared Spectrophotometers",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Photometric linearity, stray light limitations, cuvette pathlength standards"]
                }
            ]
        }
    },

    # 55. Spectrophotometer
    {
        "id": "spectrophotometer",
        "pdfNumber": 55,
        "pdfName": "Spectrophotometer",
        "pdfMainUse": "Measuring light absorbance",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Spectrophotometer",
        "category": "pH and Analytical Instruments",
        "purpose": "Measures the precise absorbance or transmission of light as a continuous function of wavelength across the UV and visible spectrum.",
        "image": {
            "src": "assets/images/equipment/spectrophotometer.svg",
            "alt": "UV-Visible benchtop spectrophotometer with digital screen, monochromator grating, and cuvette carriage",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/spectrophotometer.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An advanced optical instrument utilizing dual light sources (deuterium and tungsten lamps) and a holographic diffraction grating monochromator to generate narrow, continuously selectable monochromatic light beams across the ultraviolet and visible spectrum (190 nm to 1100 nm). Measures precise absorption spectra and quantitative analyte concentrations.",
        "alternativeNames": ["UV-Vis spectrophotometer", "UV-Visible spectrophotometer", "Absorption spectrometer"],
        "commonUses": [
            "Recording full ultraviolet-visible absorption spectra to identify molecular chromophores (lambda max)",
            "Quantifying nucleic acid (DNA/RNA at 260 nm) and protein (280 nm) concentrations in biochemistry",
            "Measuring enzyme reaction kinetics continuously over time at specific wavelengths",
            "Quantitative trace chemical analysis of pharmaceuticals, metal complexes, and environmental pollutants"
        ],
        "types": [
            "Single-beam UV-Vis spectrophotometer (compact, requires manual zeroing with blank before each sample)",
            "Double-beam UV-Vis spectrophotometer (splits light beam into sample and reference paths, compensating in real time for lamp drift)",
            "Diode array / CCD spectrophotometer (measures the entire 190-1100 nm spectrum simultaneously in milliseconds)"
        ],
        "specifications": {
            "material": ["Powder-coated die-cast aluminum chassis", "Optical quartz cuvettes (UV transparent)", "Blazed holographic diffraction grating"],
            "capacity": {
                "value": "190 to 1100",
                "unit": "nm",
                "notes": "Full UV-Vis spectral wavelength range typically 190 nm (deep UV) to 1100 nm (near-IR); spectral bandwidth ~1.0 to 2.0 nm."
            },
            "dimensions": "Overall footprint ~450 × 380 × 210 mm, Weight ~14 kg",
            "mainParts": ["Dual light sources (Deuterium UV lamp + Tungsten-halogen visible lamp)", "Holographic diffraction grating monochromator", "Collimating mirrors and slit optics", "Cuvette sample carriage compartment", "Photomultiplier tube (PMT) or silicon photodiode detector", "Embedded microcomputer controller with graphic LCD"],
            "partsAndFunctions": [
                {
                    "partName": "Holographic diffraction grating monochromator",
                    "function": "Disperses white light into a continuous rainbow spectrum and rotates to select precise 1 nm monochromatic bands",
                    "handlingNotes": "Precision optical component; avoid sudden mechanical impacts to unit."
                },
                {
                    "partName": "Dual light sources (Deuterium + Tungsten)",
                    "function": "Deuterium lamp provides continuous UV light (190-350 nm); tungsten lamp provides visible/NIR light (350-1100 nm)",
                    "handlingNotes": "Allow 20 minutes warm-up; instrument automatically switches lamps around 340 nm."
                },
                {
                    "partName": "Cuvette sample carriage compartment",
                    "function": "Holds optical cuvettes precisely aligned in the monochromatic beam path",
                    "handlingNotes": "Must use quartz cuvettes below 340 nm (plastic and glass absorb UV light)."
                }
            ],
            "measurementAccuracy": {
                "value": 0.002,
                "unit": "Abs",
                "notes": "Photometric accuracy typically ±0.002 to ±0.004 Abs at 1.0 Abs; wavelength accuracy ±0.5 nm."
            },
            "limitations": [
                "Standard glass and disposable polystyrene cuvettes are opaque to UV light (<340 nm); expensive quartz cuvettes must be used in the UV region",
                "Complex expensive instrument sensitive to ambient temperature changes, vibration, and dust",
                "High chemical concentrations (>2.0 Abs) cause severe deviations from Beer-Lambert linearity"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Turn on main power switch and allow 20 to 30 minutes for deuterium and tungsten lamps to thermally stabilize",
                "Confirm that self-calibration initialization diagnostic passes on the startup screen",
                "Select appropriate cuvettes: use QUARTZ (silica) cuvettes if measuring below 340 nm; glass/plastic acceptable for visible range (>350 nm)"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Method Configuration",
                    "instruction": "Select operating mode (Photometric for single wavelength, or Spectrum for wavelength scan). Set wavelength (e.g. 280.0 nm)."
                },
                {
                    "step": 2,
                    "title": "Blank Calibration (Autozero)",
                    "instruction": "Fill a matched quartz cuvette three-quarters full with pure solvent blank. Wipe optical faces with a Kimwipe. Insert into sample slot, close lid, and press BLANK / AUTOZERO (0.000 Abs)."
                },
                {
                    "step": 3,
                    "title": "Sample Measurement",
                    "instruction": "Rinse matching cuvette with sample solution, fill three-quarters full, wipe optical faces clean, insert into sample carriage, and close lid."
                },
                {
                    "step": 4,
                    "title": "Data Capture",
                    "instruction": "Press START / MEASURE. Record absorbance value, or inspect printed/scanned absorption spectrum for peak absorption wavelength (lambda max)."
                }
            ],
            "handlingTips": [
                "Always use matched pairs of quartz cuvettes for UV measurements; quartz is transparent down to 190 nm, whereas glass blocks UV light",
                "Wipe cuvette optical windows with lint-free lens paper in a single downward stroke; never rub back and forth"
            ],
            "shutdown": [
                "Remove cuvettes immediately from the sample compartment",
                "Rinse quartz cuvettes with deionized water, followed by spectroscopic ethanol, and store in velvet-lined boxes",
                "Power down lamps and instrument; replace dust cover once chassis cools"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles (UV blocking)", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Harmful UV radiation exposure from open lamp housing", "Explosion hazard of high-pressure deuterium lamps", "Ozone generation"],
            "warnings": [
                "NEVER look directly into the open lamp compartment or UV beam (intense UV causes corneal burn and blindness)",
                "Deuterium lamps operate under high internal pressure and become extremely hot; allow 30 minutes cooling before servicing"
            ],
            "actionsToAvoid": [
                "Do not touch quartz optical faces with bare fingers",
                "Do not spill corrosive acid solutions into the interior sample carriage"
            ],
            "emergencyGuidance": [
                "In case of chemical spill inside the compartment, power down instrument immediately and absorb with lens paper",
                "Report UV eye exposure to campus health center immediately"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe sample compartment carriage with a damp cloth; ensure drainage weep hole is open",
                "Clean quartz cuvettes by soaking in 3 M nitric acid or specialized cuvette cleaner; never use ultrasonic baths on glued quartz cuvettes",
                "Rinse cuvettes with copious deionized water and dry inverted"
            ],
            "storageInstructions": [
                "Install on a rigid, vibration-isolated benchtop in an air-conditioned laboratory",
                "Store optical quartz cuvettes in matched pairs inside cushioned cases"
            ],
            "maintenanceChecks": [
                "Monitor lamp operating hour counters (deuterium lamp life ~1000-2000 hours; replace when energy drops)",
                "Verify wavelength calibration annually using the intrinsic 656.1 nm deuterium emission peak or holmium oxide filter"
            ],
            "troubleshooting": [
                {
                    "problem": "Absorbance reading is pegged at maximum (>3.0 Abs) in the UV range (260 nm)",
                    "possibleCauses": ["Accidentally used a standard glass or plastic cuvette which is completely opaque to UV light below 340 nm"],
                    "solution": ["Switch immediately to a specialized quartz (fused silica) cuvette designed for UV operation"],
                    "prevention": ["Always check that cuvettes for UV work are marked with a 'Q' or 'QS' quartz insignia"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Instrument fails startup diagnostic: 'D2 LAMP ENERGY LOW'",
                    "possibleCauses": ["Deuterium UV lamp has exceeded its 1500-hour operational lifetime"],
                    "solution": ["Notify laboratory technician or supervisor to replace deuterium lamp assembly and recalibrate optical alignment"],
                    "prevention": ["Turn off UV lamp when only visible range is needed to extend lamp life"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Baseline drifts continuously during wavelength scanning",
                    "possibleCauses": ["Lamps were not allowed sufficient warm-up time before scanning"],
                    "solution": ["Allow instrument lamps to warm up for a full 30 minutes before running critical quantitative baselines"],
                    "prevention": ["Power on spectrophotometer at the start of the lab session"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Using ordinary glass or disposable plastic cuvettes to measure DNA or protein in the UV spectrum (260/280 nm)",
                    "whyItMatters": "Glass and ordinary plastic absorb 100% of UV light below 340 nm, giving an absolute false maximum absorbance reading regardless of sample",
                    "howToAvoid": "Always verify you are using genuine fused quartz (silica) cuvettes (marked 'Q') for all UV work"
                },
                {
                    "mistake": "Leaving chemical solutions inside cuvettes resting in the instrument overnight",
                    "whyItMatters": "Volatile vapors evaporate into the optical chamber, coating delicate collimating mirrors with chemical haze that permanently ruins optical throughput",
                    "howToAvoid": "Always remove cuvettes immediately after measuring and leave the compartment empty"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "colorimeter",
                "relationship": "similar",
                "reason": "Both measure light absorbance, but spectrophotometers provide continuous scanning across UV and visible spectra.",
                "difference": "A colorimeter uses broad filters in the visible range; a spectrophotometer uses diffraction gratings across 190-1100 nm."
            },
            {
                "equipmentId": "volumetric-flask",
                "relationship": "complementary",
                "reason": "Standard calibration solutions are accurately diluted in volumetric flasks prior to spectrophotometric measurement.",
                "difference": "The volumetric flask creates precise solution dilutions; the spectrophotometer measures absorbance."
            },
            {
                "equipmentId": "pipette",
                "relationship": "complementary",
                "reason": "Micropipettes or volumetric pipettes dispense micro-aliquots into spectrophotometer cuvettes.",
                "difference": "The pipette transfers the aliquot; the spectrophotometer performs optical analysis."
            }
        ],
        "metadata": {
            "difficultyLevel": "Advanced",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ASTM E275 - Standard Practice for Describing and Measuring Performance of Ultraviolet and Visible Spectrophotometers",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Wavelength accuracy, stray radiant energy limits, photometric repeatability"]
                },
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["UV-Vis spectroscopy principles, Beer's law deviations, quartz cuvette protocols"]
                }
            ]
        }
    },

    # 56. Hydrometer
    {
        "id": "hydrometer",
        "pdfNumber": 56,
        "pdfName": "Hydrometer",
        "pdfMainUse": "Measuring liquid relative density",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Hydrometer",
        "category": "Measuring Instruments",
        "purpose": "Measures the specific gravity (relative density) of liquids by flotation based on Archimedes' principle.",
        "image": {
            "src": "assets/images/equipment/hydrometer.svg",
            "alt": "Glass hydrometer with weighted lead shot bulb, cylindrical float body, and graduated stem scale",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/hydrometer.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A sealed glass instrument consisting of a weighted bottom bulb loaded with lead shot or mercury, an expanded cylindrical buoyancy chamber, and a narrow graduated stem. When floated freely in a liquid cylinder, the depth of submersion directly indicates the liquid's specific gravity (relative to water at a calibrated temperature).",
        "alternativeNames": ["Specific gravity hydrometer", "Density hydrometer", "Baumé hydrometer", "Brix hydrometer"],
        "commonUses": [
            "Measuring battery acid electrolyte density (sulfuric acid state of charge in lead-acid batteries)",
            "Determining sugar concentration in brewing, fermentation, and food processing (Brix hydrometer)",
            "Checking antifreeze (ethylene glycol) concentration and freeze point in coolant mixtures",
            "Measuring salinity, brine concentration, and petroleum fuel density"
        ],
        "types": [
            "Standard specific gravity hydrometer (calibrated for liquids lighter or heavier than water, e.g. 1.000 to 1.200)",
            "Brix / Saccharometer (calibrated directly in percentage of dissolved sucrose by weight)",
            "Baumé hydrometer (calibrated in degrees Baumé for industrial acids and syrups)",
            "Thermohydrometer (combines a hydrometer with an integral thermometer inside the body for instant temperature correction)"
        ],
        "specifications": {
            "material": ["Soda-lime or borosilicate glass tube", "Lead shot or steel ballast set in wax/resin", "Paper graduated scale"],
            "capacity": {
                "value": "0.700 to 2.000",
                "unit": "g/cm³",
                "notes": "Standard laboratory sets divide specific gravity into narrow ranges (e.g. 0.700-0.800, 1.000-1.200, 1.200-1.400)."
            },
            "dimensions": "Overall length ~250 mm to 300 mm, Bulb diameter ~18 mm, Stem diameter ~5 mm",
            "mainParts": ["Weighted ballast bulb (lead shot)", "Expanded cylindrical buoyancy float", "Narrow calibrated glass stem", "Internal paper scale"],
            "partsAndFunctions": [
                {
                    "partName": "Weighted ballast bulb",
                    "function": "Provides low counterweight that keeps the instrument floating strictly vertical in the liquid",
                    "handlingNotes": "Handle gently; do not drop onto hard surfaces."
                },
                {
                    "partName": "Expanded cylindrical buoyancy float",
                    "function": "Displaces liquid volume equal to the total weight of the hydrometer per Archimedes' principle",
                    "handlingNotes": "Inspect for cracks or ballast shift."
                },
                {
                    "partName": "Narrow calibrated glass stem",
                    "function": "Projects above the liquid surface where the liquid meniscus indicates specific gravity on the internal scale",
                    "handlingNotes": "Keep clean and grease-free so liquid wets the glass evenly."
                }
            ],
            "measurementAccuracy": {
                "value": 0.001,
                "unit": "g/cm³",
                "notes": "Resolution typically ±0.001 to ±0.0005 specific gravity units when read at the reference temperature (typically 15.6 °C / 60 °F or 20 °C)."
            },
            "limitations": [
                "Requires a relatively large liquid sample volume (typically 250 mL to 500 mL inside a tall cylinder)",
                "Readings are heavily temperature-dependent; temperature correction formulas must be applied if not at reference temperature",
                "If the hydrometer touches the inner wall of the cylinder, surface tension pins it and gives an erroneous reading"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Select a clean, dry, tall glass measuring cylinder of sufficient depth (hydrometer must float freely with at least 3 cm clearance beneath)",
                "Inspect hydrometer to confirm ballast has not shifted and the paper scale is firmly anchored inside the stem",
                "Measure liquid temperature with a thermometer to determine temperature correction"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Cylinder Filling",
                    "instruction": "Fill the tall cylinder three-quarters full with the test liquid. Stir gently with a glass rod to ensure uniform density and eliminate temperature gradients."
                },
                {
                    "step": 2,
                    "title": "Gentle Immersion",
                    "instruction": "Grasp the top stem of the hydrometer and lower it slowly into the liquid until it floats near its equilibrium level. Never drop it in."
                },
                {
                    "step": 3,
                    "title": "Spinning and Centering",
                    "instruction": "Give the stem a gentle twirl between your fingers as you release it. The spin dislodges air bubbles and centers the hydrometer away from the cylinder walls."
                },
                {
                    "step": 4,
                    "title": "Reading the Meniscus",
                    "instruction": "Lower your eye level until the elliptical surface becomes a straight horizontal line. Read the scale where the plane of the liquid surface intersects the stem."
                }
            ],
            "handlingTips": [
                "Give the hydrometer a gentle spin upon release to break surface tension and dislodge adhering air bubbles",
                "Confirm that the hydrometer is floating freely in the exact center and is NOT clinging to the cylinder glass wall"
            ],
            "shutdown": [
                "Lift hydrometer out of liquid, rinse thoroughly with deionized water, and wipe dry with a soft cloth",
                "Return hydrometer to its protective rigid storage tube",
                "Pour sample liquid into appropriate waste or return to stock container"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Glass breakage lacerations", "Chemical splashes from overflowing cylinder", "Lead shot exposure if bulb shatters"],
            "warnings": [
                "Never drop a hydrometer into an empty glass cylinder; it will strike the bottom and shatter",
                "Beware of liquid displacement: inserting the large hydrometer raises the liquid level and can overflow the cylinder"
            ],
            "actionsToAvoid": [
                "Do not read the scale while the hydrometer is clinging to the cylinder wall",
                "Do not use in boiling or violently agitated liquids"
            ],
            "emergencyGuidance": [
                "If a hydrometer shatters, treat liquid as hazardous waste and sweep glass and lead shot into sharps container",
                "Rinse chemical skin splashes under running water for 15 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wash glass stem and body with warm soapy water and a soft sponge",
                "Rinse with tap water, followed by a final rinse with deionized water",
                "Dry carefully with a soft lint-free towel before storing"
            ],
            "storageInstructions": [
                "Store vertically or horizontally in original foam-lined rigid cardboard or plastic storage cases",
                "Never store loose in drawers where rolling can cause breakage"
            ],
            "maintenanceChecks": [
                "Verify that the internal paper scale has not slipped or loosened from its alignment mark on the glass",
                "Check 1.000 reading in pure distilled water at 20 °C (should read exactly 1.000)"
            ],
            "troubleshooting": [
                {
                    "problem": "Hydrometer clings to the cylinder wall and will not float freely in center",
                    "possibleCauses": ["Surface tension pulling stem to wall; cylinder is tilted or too narrow"],
                    "solution": ["Give the stem a quick spin to center it; ensure cylinder is standing perfectly vertical"],
                    "prevention": ["Use a cylinder with diameter at least 25 mm wider than the hydrometer bulb"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Reading in pure distilled water is 1.006 instead of 1.000",
                    "possibleCauses": ["Water temperature is colder than calibrated reference temperature; paper scale slipped"],
                    "solution": ["Check temperature and apply standard temperature correction formula; inspect scale anchor mark"],
                    "prevention": ["Always note liquid temperature and compare against hydrometer calibration temperature"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Hydrometer sinks straight to the bottom of the cylinder",
                    "possibleCauses": ["Liquid density is lower than the minimum range of the hydrometer (e.g. ether in water hydrometer)"],
                    "solution": ["Select a hydrometer designed for 'Liquids Lighter than Water' (range 0.700 to 1.000)"],
                    "prevention": ["Check expected specific gravity before selecting hydrometer"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Dropping the hydrometer into the cylinder from several inches above the liquid",
                    "whyItMatters": "The weighted glass bulb plunges to the bottom of the glass cylinder with high momentum, shattering the base of both vessels",
                    "howToAvoid": "Always hold the stem and gently lower the hydrometer until it floats, then release"
                },
                {
                    "mistake": "Taking the reading while the hydrometer is stuck against the inner cylinder wall",
                    "whyItMatters": "Capillary surface tension drags the stem downward or holds it artificially high, causing massive specific gravity errors",
                    "howToAvoid": "Spin the hydrometer so it rotates freely in the center of the liquid without touching the glass walls"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "measuring-cylinder",
                "relationship": "complementary",
                "reason": "A tall glass measuring cylinder holds the liquid column in which the hydrometer floats.",
                "difference": "The cylinder contains the liquid column; the hydrometer measures the liquid's relative density."
            },
            {
                "equipmentId": "thermometer",
                "relationship": "complementary",
                "reason": "Used in tandem to measure liquid temperature and apply specific gravity temperature corrections.",
                "difference": "The thermometer measures temperature; the hydrometer measures relative density."
            },
            {
                "equipmentId": "refractometer",
                "relationship": "alternative",
                "reason": "Refractometers measure density/sugar concentration using micro-drops, avoiding large hydrometer liquid volumes.",
                "difference": "A hydrometer requires a large 250 mL liquid column; a refractometer requires only 2 drops of liquid."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ASTM E100 - Standard Specification for ASTM Hydrometers",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Scale ranges, ballast encapsulation, reference temperatures, stem dimensions"]
                },
                {
                    "title": "ASTM E126 - Standard Test Method for Inspection, Calibration, and Verification of Hydrometers",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Meniscus reading methods, temperature corrections, flotation verification"]
                }
            ]
        }
    },

    # 57. Refractometer
    {
        "id": "refractometer",
        "pdfNumber": 57,
        "pdfName": "Refractometer",
        "pdfMainUse": "Measuring refractive index",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Refractometer",
        "category": "Measuring Instruments",
        "purpose": "Measures the refractive index and dissolved solute concentration (Brix) of liquids using optical light bending.",
        "image": {
            "src": "assets/images/equipment/refractometer.svg",
            "alt": "Handheld optical Abbe-style refractometer with blue daylight cover plate and focusing eyepiece",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/refractometer.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An optical analytical instrument that measures the critical angle of total internal reflection and refractive index (nD) of a liquid sample. Requires only 2 to 3 drops of liquid placed on a high-refractive-index optical prism, providing instant determination of purity, dissolved solids (Brix), and concentration via Snell's law.",
        "alternativeNames": ["Brix refractometer", "Optical refractometer", "Handheld refractometer", "Abbe refractometer"],
        "commonUses": [
            "Measuring dissolved sugar concentration (°Brix) in fruit juices, honey, and beverages",
            "Determining the purity and identity of synthetic organic solvents and essential oils",
            "Measuring salinity and specific gravity in marine aquaria and seawater",
            "Checking engine coolant glycol concentration and battery acid density with micro-samples"
        ],
        "types": [
            "Handheld optical refractometer (traditional analog prism with daylight plate and focusing eyepiece)",
            "Digital handheld refractometer (LED light source with linear CCD sensor and digital LCD readout)",
            "Abbe benchtop refractometer (high-precision laboratory standard with water-jacketed prisms for ±0.0001 nD accuracy)"
        ],
        "specifications": {
            "material": ["Flint glass optical measuring prism", "Plated brass or aluminum alloy chassis", "Polycarbonate daylight cover plate", "Rubber eye-cup"],
            "capacity": {
                "value": "0.1 to 0.2",
                "unit": "mL",
                "notes": "Requires only 2 to 3 drops (~0.1 mL) of liquid spread across the prism face."
            },
            "dimensions": "Overall length ~160 mm to 200 mm, Diameter ~40 mm, Weight ~250 g",
            "mainParts": ["Optical glass measuring prism", "Hinged daylight cover plate", "Calibration adjustment zero screw", "Internal optical scale reticle", "Focusable rubber-cushioned eyepiece"],
            "partsAndFunctions": [
                {
                    "partName": "Optical glass measuring prism",
                    "function": "High-index optical glass substrate where total internal reflection occurs at the sample boundary",
                    "handlingNotes": "Extremely sensitive to scratches; never touch with metal spatulas."
                },
                {
                    "partName": "Hinged daylight cover plate",
                    "function": "Flattens the liquid drops into a thin, uniform bubble-free film across the prism face",
                    "handlingNotes": "Press down gently; do not force."
                },
                {
                    "partName": "Focusable rubber-cushioned eyepiece",
                    "function": "Adjusts focus onto the internal circular scale to view the sharp boundary between light and dark fields",
                    "handlingNotes": "Rotate ring until scale lines are crisp."
                }
            ],
            "measurementAccuracy": {
                "value": 0.0002,
                "unit": "nD",
                "notes": "Refractive index accuracy is typically ±0.0002 nD (or ±0.1% to 0.2% Brix on sugar scales); automatic temperature compensation (ATC) from 10-30 °C."
            },
            "limitations": [
                "Prism glass is soft and easily scratched by grit or metal tools, permanently destroying optical sharpness",
                "Volatile solvents (e.g. ether, pentane) evaporate from the prism before the cover plate can be closed, distorting readings",
                "Not suitable for abrasive slurries or hydrofluoric acid solutions"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the optical prism to ensure it is clean, dry, and free from scratches or dried residue",
                "Calibrate with 2 drops of pure distilled water: the shadow line must align exactly with 0.0% Brix (or nD 1.3330 at 20 °C); adjust calibration screw if off",
                "Wipe prism with a soft lens tissue and deionized water"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Sample Application",
                    "instruction": "Open the daylight cover plate. Using a plastic dropper, place 2 to 3 drops of sample liquid onto the center of the clean glass prism."
                },
                {
                    "step": 2,
                    "title": "Cover Plate Closure",
                    "instruction": "Gently close the daylight plate so the liquid spreads evenly across the entire prism surface without dry spots or trapped air bubbles."
                },
                {
                    "step": 3,
                    "title": "Light Alignment",
                    "instruction": "Hold the refractometer up toward a bright natural window or overhead laboratory light source."
                },
                {
                    "step": 4,
                    "title": "Focusing and Reading",
                    "instruction": "Look through the eyepiece, rotate the focus ring until the circular scale is sharp, and record the value where the distinct light/blue shadow boundary intersects the scale."
                }
            ],
            "handlingTips": [
                "Never use a glass stirring rod or metal spatula directly against the soft optical prism; use a plastic dropper to apply liquid",
                "Wipe the prism clean immediately after every measurement with a wet Kimwipe, followed by a dry wipe"
            ],
            "shutdown": [
                "Clean prism and daylight plate with distilled water and a soft lens tissue",
                "Never submerge the refractometer body in water",
                "Store inside its padded foam carrying case with calibration screwdriver"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical eye contact if rubbing eye after handling", "Prism scratching", "Solvent vapor inhalation"],
            "warnings": [
                "Never use concentrated hydrofluoric acid or strong alkalis on optical glass prisms (etches and dissolves glass)",
                "Never immerse the entire refractometer in a water bath or sink"
            ],
            "actionsToAvoid": [
                "Do not wipe the prism with abrasive paper towels or coarse laboratory wipes",
                "Do not drop or mechanically shock the optical barrel"
            ],
            "emergencyGuidance": [
                "If test chemical splashes into eyes while viewing, immediately flush at eyewash station for 15 minutes",
                "Clean chemical spills on the prism mount immediately with damp tissue"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Rinse prism with a few drops of deionized water from a wash bottle",
                "Gently wipe dry with optical lens tissue or clean Kimwipe in one direction",
                "For sticky sugar or oil films, use a drop of ethanol, then rinse with water and dry"
            ],
            "storageInstructions": [
                "Store inside original foam-padded plastic or wooden carrying case",
                "Keep in dry, temperature-stable environment with desiccant pouch to protect internal optics from mold"
            ],
            "maintenanceChecks": [
                "Verify zero calibration with pure deionized water before each experimental session",
                "Inspect prism surface under angled light for scratches or chips"
            ],
            "troubleshooting": [
                {
                    "problem": "The boundary line between light and dark is fuzzy, blurry, or arched",
                    "possibleCauses": ["Air bubbles trapped beneath cover plate", "Sample liquid did not cover full prism", "Prism is dirty or scratched"],
                    "solution": ["Re-apply sample; press cover plate gently to eliminate bubbles; wipe prism with ethanol"],
                    "prevention": ["Always ensure 2 full drops cover 100% of the prism area without bubbles"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "View through eyepiece is completely dark or completely white",
                    "possibleCauses": ["Not enough light entering prism; or sample refractive index is outside scale range"],
                    "solution": ["Point daylight plate directly toward a bright light source; verify sample range"],
                    "prevention": ["Aim instrument toward bright illumination when taking readings"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Calibration with distilled water reads 0.5% Brix instead of 0.0%",
                    "possibleCauses": ["Zero calibration screw drifted due to temperature change or mechanical vibration"],
                    "solution": ["Use small jeweler's screwdriver to turn calibration screw until boundary line aligns exactly with 0.0%"],
                    "prevention": ["Check zero point with DI water daily"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Touching the glass prism with a glass stirring rod or metal spatula when applying drops",
                    "whyItMatters": "The optical flint glass is soft; hard tools cause permanent scratches that ruin optical shadow line definition forever",
                    "howToAvoid": "Always dispense drops from a plastic transfer pipette or dropper held suspended 5 mm above the prism"
                },
                {
                    "mistake": "Submerging the handheld refractometer in a beaker of water to clean it",
                    "whyItMatters": "Non-waterproof analog refractometers flood internally with water, destroying internal reticle optics and prisms",
                    "howToAvoid": "Wipe only the external prism face with a damp lens tissue; never submerge the barrel"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "hydrometer",
                "relationship": "alternative",
                "reason": "Both determine liquid density/sugar content, but refractometers require only 2 drops instead of 250 mL.",
                "difference": "A refractometer uses optical refraction on 0.1 mL; a hydrometer uses physical flotation in 250 mL."
            },
            {
                "equipmentId": "dropper",
                "relationship": "complementary",
                "reason": "Used to transfer the 2 to 3 drops of liquid sample onto the optical prism safely without touching glass.",
                "difference": "The dropper delivers the micro-drops; the refractometer measures the refractive index."
            },
            {
                "equipmentId": "wash-bottle",
                "relationship": "complementary",
                "reason": "Provides the deionized water stream to clean and rinse the prism face between measurements.",
                "difference": "The wash bottle cleans the sensor; the refractometer takes the measurement."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ASTM D1218 - Standard Test Method for Refractive Index and Refractive Dispersion of Hydrocarbon Liquids",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Prism temperature control, calibration standards, refractive index calculations"]
                },
                {
                    "title": "ICUMSA GS4/3-13: The Determination of Sugar Content by Refractometry",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Metrology Standard",
                    "supports": ["Brix scale conversion, optical refractometer protocols"]
                }
            ]
        }
    },

    # 58. Forceps
    {
        "id": "forceps",
        "pdfNumber": 58,
        "pdfName": "Forceps",
        "pdfMainUse": "Picking up small objects",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Forceps",
        "category": "Basic Tools and Consumables",
        "purpose": "Grasps, manipulates, and picks up small, delicate, hot, or chemically hazardous objects without finger contact.",
        "image": {
            "src": "assets/images/equipment/forceps.svg",
            "alt": "Stainless steel laboratory forceps with serrated blunt tips and ribbed finger grip shafts",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/forceps.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A handheld spring-steel tweezer instrument featuring two tapered metal prongs joined at one end that spring open automatically when released. Provides precision finger-like gripping for handling small items, analytical weights, filter paper discs, and sodium metal chunks safely.",
        "alternativeNames": ["Lab tweezers", "Dissecting forceps", "Analytical balance forceps", "Filter forceps"],
        "commonUses": [
            "Handling precision analytical balance calibration weights without transferring skin oils",
            "Placing and retrieving circular filter paper discs in Büchner funnels",
            "Handling small pieces of reactive sodium or potassium metal in mineral oil",
            "Retrieving dropped stir bars, boiling stones, or small glass stoppers from vessels"
        ],
        "types": [
            "Blunt serrated forceps (general laboratory utility; serrated tips provide secure grip on solid items)",
            "Pointed fine micro-forceps (needle-sharp tips for precision electronics and micro-sampling)",
            "PTFE-coated or plastic-tipped forceps (chemically inert, non-scratching, non-magnetic)",
            "Filter forceps (broad flat spatula-like paddle tips designed to handle delicate membrane filter papers without tearing)"
        ],
        "specifications": {
            "material": ["Surgical-grade stainless steel (AISI 304 or 410)", "PTFE coating", "Nickel-plated steel"],
            "capacity": {
                "value": "Up to ~30",
                "unit": "mm",
                "notes": "Spring prongs span ~20 mm to 35 mm at rest; handles delicate items from 0.1 mm up to 30 mm."
            },
            "dimensions": "Overall length ~125 mm to 160 mm; Tip width ~1 mm to 3 mm",
            "mainParts": ["Spring weld joint at base", "Ribbed non-slip finger grips", "Flexible tapered prongs", "Serrated inner gripping tips"],
            "partsAndFunctions": [
                {
                    "partName": "Spring weld joint at base",
                    "function": "Maintains continuous spring tension to return tips open automatically when finger pressure is released",
                    "handlingNotes": "Do not bend prongs backward."
                },
                {
                    "partName": "Ribbed non-slip finger grips",
                    "function": "Provides secure tactile control even when wearing slick nitrile gloves",
                    "handlingNotes": "Hold like a pencil between thumb and index finger."
                },
                {
                    "partName": "Serrated inner gripping tips",
                    "function": "Provides non-slip friction grip on smooth glass, paper, or metal surfaces",
                    "handlingNotes": "Ensure tips meet parallel when closed."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring physical gripping tool."
            },
            "limitations": [
                "Sharp-tipped models can puncture filter paper discs or skin if used carelessly",
                "Stainless steel is attacked by concentrated hydrochloric acid and halogens (iodine)",
                "Not designed for lifting heavy beakers or large reaction vessels (use beaker/crucible tongs)"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect forceps tips to ensure they align squarely and meet cleanly without crossing over",
                "Verify tips are clean, dry, and free from grease or chemical residues",
                "Select paddle-tip forceps for filter membranes, or plastic-tipped forceps for balance weights"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Grip Position",
                    "instruction": "Hold the forceps like a pencil, resting the ribbed shaft between thumb and forefinger."
                },
                {
                    "step": 2,
                    "title": "Item Alignment",
                    "instruction": "Position the open tips on either side of the object to be picked up (e.g. edge of a filter paper disc, or a balance weight)."
                },
                {
                    "step": 3,
                    "title": "Compression and Lift",
                    "instruction": "Squeeze fingers gently to close tips firmly around the object, and lift smoothly without jerky motions."
                },
                {
                    "step": 4,
                    "title": "Placement and Release",
                    "instruction": "Lower the item into the target vessel and relax finger pressure; the spring prongs will open automatically."
                }
            ],
            "handlingTips": [
                "Always use plastic-tipped or ivory-tipped forceps when handling analytical balance calibration weights; never touch weights with bare metal or bare fingers",
                "Grasp filter paper membranes strictly by the non-filtering outer rim edge"
            ],
            "shutdown": [
                "Wipe metal tips clean with an alcohol wipe or wash with soap and water",
                "Dry thoroughly to prevent corrosion at the welded spring joint",
                "Store flat in instrument trays or protective plastic sleeves"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Puncture wounds from sharp tips", "Dropping chemical solids or hot objects", "Cross-contamination"],
            "warnings": [
                "Never pick up hot objects beyond the thermal rating of the forceps (use insulated crucible tongs)",
                "Handle reactive alkali metals (sodium) only with dry, clean forceps under inert mineral oil"
            ],
            "actionsToAvoid": [
                "Do not use sharp pointed forceps to handle fragile wet filter papers (punctures paper)",
                "Do not use metal forceps to handle certified analytical weights without protective tips"
            ],
            "emergencyGuidance": [
                "In case of accidental puncture wound, wash wound with soap and water, apply antiseptic dressing, and report to supervisor",
                "If a dropped reactive chemical reacts, clear perimeter immediately"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wash with warm water and laboratory detergent",
                "Rinse with deionized water, followed by an ethanol wipe for rapid drying",
                "Autoclave if used for sterile microbiological manipulations"
            ],
            "storageInstructions": [
                "Store flat in organized tool trays lined with silicone matting",
                "Keep plastic protective sleeve over pointed tips to prevent blunting and puncture hazards"
            ],
            "maintenanceChecks": [
                "Check tip alignment: squeeze tips together; tips must meet squarely without overlapping",
                "Inspect spring joint for rust or fatigue micro-cracks"
            ],
            "troubleshooting": [
                {
                    "problem": "Tips cross over each other when squeezed, dropping small objects",
                    "possibleCauses": ["Prongs were bent mechanically by dropping or heavy sideways leverage"],
                    "solution": ["Carefully bend prongs back with pliers until tips meet parallel, or replace instrument"],
                    "prevention": ["Do not use forceps to pry or twist jammed stoppers"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Analytical balance calibration weight shows greasy film after handling",
                    "possibleCauses": ["Forceps were handled with oily gloves, or bare metal tips transferred metal salts"],
                    "solution": ["Clean weights with pure ethanol per metrology standards; use only dedicated weight forceps"],
                    "prevention": ["Dedicate one pair of plastic-tipped forceps exclusively for balance weights"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Tips develop rust spots around the spring weld",
                    "possibleCauses": ["Stored wet in acid vapor environment"],
                    "solution": ["Polish with fine steel wool, wash, dry, and apply microscopic film of mineral oil"],
                    "prevention": ["Always dry forceps completely before storing"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Picking up brass or stainless steel analytical calibration weights with bare fingers or bare metal forceps",
                    "whyItMatters": "Skin oils and scratches permanently alter the calibrated mass of precision weights, ruining balance accuracy",
                    "howToAvoid": "Always handle analytical weights exclusively with dedicated plastic- or velvet-tipped forceps"
                },
                {
                    "mistake": "Using sharp-pointed forceps to lift wet filter paper out of a Büchner funnel",
                    "whyItMatters": "The sharp tips easily rip through wet cellulose, spilling the crystal cake into the receiver",
                    "howToAvoid": "Use broad flat paddle-tip filter forceps or a flat microspatula to lift paper edges gently"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "filter-paper",
                "relationship": "complementary",
                "reason": "Forceps are used to seat and lift delicate filter paper discs in funnels without tearing.",
                "difference": "The forceps is the handling tool; the filter paper is the separation medium."
            },
            {
                "equipmentId": "analytical-balance",
                "relationship": "complementary",
                "reason": "Forceps handle small objects and certified calibration weights used with the analytical balance.",
                "difference": "The forceps prevents hand oil contamination; the balance measures precision mass."
            },
            {
                "equipmentId": "spatula",
                "relationship": "alternative",
                "reason": "Both manipulate small laboratory items, but spatulas scoop powders while forceps grasp solid objects.",
                "difference": "A spatula scoops and dispenses bulk powder; forceps pinch and grasp individual solid items."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ASTM E617 - Standard Specification for Laboratory Weights and Precision Mass Standards",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Non-magnetic forceps handling rules, prevention of mass standard contamination"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Handling reactive metals, filter paper manipulation"]
                }
            ]
        }
    },

    # 59. Test Tube Brush
    {
        "id": "test-tube-brush",
        "pdfNumber": 59,
        "pdfName": "Test Tube Brush",
        "pdfMainUse": "Cleaning test tubes",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Test Tube Brush",
        "category": "Cleaning and Storage",
        "purpose": "Cleans the narrow interior walls and rounded bottoms of test tubes and cylindrical glassware.",
        "image": {
            "src": "assets/images/equipment/test-tube-brush.svg",
            "alt": "Twisted galvanized wire laboratory test tube brush with nylon bristles and radial tufted tip",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/test-tube-brush.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A specialized cleaning utensil featuring stiff nylon or natural animal bristles wound spirally into a twisted galvanized steel wire shaft. Features a radial tufted bristle end or looped wire tip designed to thoroughly scrub the curved internal walls and hemispherical base of test tubes without scratching the glass.",
        "alternativeNames": ["Tube brush", "Glassware cleaning brush", "Cylinder brush"],
        "commonUses": [
            "Scrubbing chemical residues and precipitates from test tubes and boiling tubes",
            "Cleaning narrow-mouthed volumetric flasks, measuring cylinders, and centrifuge tubes",
            "Removing dried salt crusts from glassware interiors with laboratory detergent",
            "Cleaning condenser inner tubes and burette barrels (using specialized long-handled variants)"
        ],
        "types": [
            "Radial-tufted tip brush (bristles flare outward at tip to cushion and scrub the hemispherical tube bottom)",
            "Tied-wool / sponge tip brush (soft absorbent yarn/sponge tip eliminates metal wire scratching)",
            "Burette brush (very long flexible wire shaft, ~750 mm, for long graduated barrels)",
            "Babcock / flask brush (angled hinged bristles for cleaning conical and round flask shoulders)"
        ],
        "specifications": {
            "material": ["Twisted galvanized steel or stainless steel wire handle", "Chemical-resistant nylon bristles", "Cotton/wool yarn tip cushion (on some models)"],
            "capacity": {
                "value": "12 to 25",
                "unit": "mm",
                "notes": "Bristle diameter ~20 mm to 30 mm; sized to clean tubes from 12 mm to 25 mm diameter."
            },
            "dimensions": "Total length ~250 mm to 300 mm; Bristle head length ~80 mm to 100 mm, Bristle diameter ~25 mm",
            "mainParts": ["Hanging loop handle", "Twisted flexible steel wire core shaft", "Radial cylindrical bristle head", "Cushioned radial-tuft tip"],
            "partsAndFunctions": [
                {
                    "partName": "Hanging loop handle",
                    "function": "Allows comfortable manual twisting and hanging on sink drying pegs",
                    "handlingNotes": "Store hung up to dry."
                },
                {
                    "partName": "Twisted flexible steel wire core shaft",
                    "function": "Provides structural reach while flexing slightly to accommodate curved vessel contours",
                    "handlingNotes": "Do not bend at sharp 90-degree angles (causes metal wire fatigue)."
                },
                {
                    "partName": "Cushioned radial-tuft tip",
                    "function": "Prevents the sharp bare end of the twisted wire from gouging or punching through the curved glass bottom",
                    "handlingNotes": "Inspect tip regularly; discard if bare wire is exposed."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring cleaning and maintenance utensil."
            },
            "limitations": [
                "If the protective tuft at the tip wears away, the bare twisted wire core will score, scratch, and crack glass bottoms",
                "Nylon bristles can flick soapy chemical droplets into the user's face when pulled abruptly out of narrow tubes",
                "Attacked by concentrated sulfuric acid and organic solvents if soaked long term"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the brush tip to ensure the bristle tuft or yarn cushion completely covers the wire end without exposed sharp metal",
                "Wet the brush bristles in warm water containing laboratory-grade glassware detergent",
                "Empty bulk chemical waste from the test tube into the waste carboy before washing"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Insertion",
                    "instruction": "Insert the soapy brush gently into the mouth of the test tube, rotating slightly as it slides downward."
                },
                {
                    "step": 2,
                    "title": "Scrubbing Walls",
                    "instruction": "Move the brush up and down with gentle rotational strokes to scrub all interior sidewall surfaces."
                },
                {
                    "step": 3,
                    "title": "Scrubbing Bottom",
                    "instruction": "Press the cushioned tip gently against the hemispherical bottom, rotating the handle to dislodge clinging precipitates. Do NOT force or hammer."
                },
                {
                    "step": 4,
                    "title": "Careful Extraction",
                    "instruction": "Withdraw the brush slowly from the tube mouth. Do NOT yank it out quickly, as springing bristles will flick soapy droplets into the air."
                }
            ],
            "handlingTips": [
                "Withdraw the brush slowly: when bristles clear the narrow tube lip, they spring open and can flick chemical droplets into your face",
                "Always point the tube mouth down toward the sink basin while pulling the brush out"
            ],
            "shutdown": [
                "Rinse the cleaned test tube three times with tap water, followed by a final rinse with deionized water",
                "Rinse the brush under warm tap water to remove all detergent and residues",
                "Shake excess water off and hang the brush by its handle loop on the drying rack"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles (critical to protect against bristle flicking)", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical droplet flicking into eyes from springing bristles", "Glass breakage puncture if wire punches through tube bottom", "Aerosolized soap/chemical mist"],
            "warnings": [
                "ALWAYS wear safety goggles while washing glassware; springing brush bristles are a leading cause of chemical eye splashes",
                "Never use a brush with exposed bare metal wire at the tip (punches through the glass bottom)"
            ],
            "actionsToAvoid": [
                "Do not yank the brush out of narrow tubes with a violent fast motion",
                "Do not hammer the brush into the bottom of test tubes like a ramrod"
            ],
            "emergencyGuidance": [
                "If soapy wash water or chemical residue is flicked into eyes, immediately flush at eyewash station for 15 minutes",
                "Sweep broken glass fragments with a brush into sharps bin"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Rinse brush bristles thoroughly with clean warm tap water after each washing session",
                "Shake out excess water and hang vertically by the handle loop to air dry",
                "Soak in dilute bleach or disinfectant periodically if used for biological culture cleaning"
            ],
            "storageInstructions": [
                "Hang on pegboards or hooks above the laboratory washing sink",
                "Avoid storing crushed in drawers, which permanently flattens and bends bristles"
            ],
            "maintenanceChecks": [
                "Inspect the tip tuft before each use: if the wire core has poked through the bristles, discard the brush immediately",
                "Check twisted wire shaft for rust or metal fatigue"
            ],
            "troubleshooting": [
                {
                    "problem": "The brush punched through the bottom of the test tube, breaking glass into the sink",
                    "possibleCauses": ["Applied excessive downward force; bristle tip cushion was worn away, exposing bare wire"],
                    "solution": ["Turn off water, carefully clear broken glass with tongs into sharps bin, and discard defective brush"],
                    "prevention": ["Rotate brush gently without pounding; inspect tip tufts regularly"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Soapy droplets continuously flick into face and lab coat during washing",
                    "possibleCauses": ["Withdrawing brush too rapidly from the narrow neck of the tube"],
                    "solution": ["Slow down withdrawal; tilt the tube mouth downward toward the sink bottom as bristles exit"],
                    "prevention": ["Always wear safety goggles and extract brushes slowly"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Bristles are permanently flattened and no longer make contact with tube walls",
                    "possibleCauses": ["Brush was stored crushed under heavy equipment in a drawer"],
                    "solution": ["Dip bristles into hot water (~80 °C) for 1 minute to restore nylon memory shape; if ineffective, replace brush"],
                    "prevention": ["Always hang brushes by their handle loops"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Yanking the test tube brush rapidly out of the narrow tube mouth",
                    "whyItMatters": "As the compressed nylon bristles clear the rim, they violently spring open, flicking soapy, chemical-laden droplets directly into the eyes and face",
                    "howToAvoid": "Withdraw the brush slowly and steadily, keeping the mouth of the tube angled down toward the sink"
                },
                {
                    "mistake": "Continuing to use a test tube brush after the tufted bristle tip has worn away",
                    "whyItMatters": "The sharp twisted steel wire core gouges the thin glass bottom, causing sudden catastrophic glass failure and severe hand puncture wounds",
                    "howToAvoid": "Inspect brush tips regularly and discard any brush where the metal wire end is exposed"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "test-tube",
                "relationship": "complementary",
                "reason": "Test tube brushes are specifically designed to clean the interior of test tubes.",
                "difference": "The test tube is the reaction glassware; the brush is the dedicated cleaning tool."
            },
            {
                "equipmentId": "wash-bottle",
                "relationship": "complementary",
                "reason": "Wash bottles provide the deionized water for the final rinses following brush scrubbing.",
                "difference": "The brush scrubs mechanical residues; the wash bottle flushes clean water."
            },
            {
                "equipmentId": "test-tube-rack",
                "relationship": "complementary",
                "reason": "Cleaned test tubes are inverted onto the drying pegs of the test tube rack after brush washing.",
                "difference": "The brush cleans the tube; the rack supports and dries the tube."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "Laboratory Safety Guidance (OSHA 3404-11R)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Document",
                    "supports": ["Glassware washing safety, eye protection during cleaning, broken glass avoidance"]
                },
                {
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Glassware cleaning protocols, decontamination procedures"]
                }
            ]
        }
    },

    # 60. Rubber Stopper
    {
        "id": "rubber-stopper",
        "pdfNumber": 60,
        "pdfName": "Rubber Stopper",
        "pdfMainUse": "Closing compatible flasks and test tubes",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Rubber Stopper",
        "category": "Basic Tools and Consumables",
        "purpose": "Seals test tubes, flasks, and bottles hermetically to contain liquids, exclude air, or connect gas tubing.",
        "image": {
            "src": "assets/images/equipment/rubber-stopper.svg",
            "alt": "Tapered black natural rubber laboratory stoppers (solid, 1-hole, and 2-hole varieties)",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/rubber-stopper.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A truncated conical plug molded from resilient natural or synthetic rubber. Tapers from a wide top to a narrower base to fit firmly inside the cylindrical necks of test tubes, flasks, and bottles, forming an airtight, liquid-tight seal under gentle hand pressure.",
        "alternativeNames": ["Rubber bung", "Lab stopper", "Rubber plug", "Neoprene stopper"],
        "commonUses": [
            "Sealing test tubes and conical flasks for storage or gentle mixing",
            "Connecting glass delivery tubing and thermometers in gas-evolution assemblies (using 1-hole or 2-hole stoppers)",
            "Mounting filtration adapters and funnels into vacuum filter flasks",
            "Sealing chemical bottles to exclude atmospheric moisture and oxygen"
        ],
        "types": [
            "Solid rubber stopper (no holes; for complete hermetic sealing and storage)",
            "1-hole rubber stopper (pre-drilled central bore for thermometer or gas delivery tube)",
            "2-hole rubber stopper (two parallel bores for gas washing, aeration, or distillation trains)",
            "Neoprene / silicone stopper (superior chemical resistance against organic solvents and high temperatures up to 200 °C)"
        ],
        "specifications": {
            "material": ["Compounded natural rubber (NR)", "Chloroprene (neoprene)", "Silicone rubber (high temp)"],
            "capacity": {
                "value": "Size #00 to #10",
                "unit": "size",
                "notes": "Standard laboratory sizes range from #00 (top diameter 15 mm, base 10 mm) to #10 (top 50 mm, base 42 mm)."
            },
            "dimensions": "Height ~25 mm to 30 mm; Taper angle ~10° to 12°",
            "mainParts": ["Tapered cylindrical body", "Flat upper crown surface", "Flat lower base surface", "Pre-drilled bore hole(s) (in 1-hole/2-hole variants)"],
            "partsAndFunctions": [
                {
                    "partName": "Tapered cylindrical body",
                    "function": "Wedges into glassware necks to compress rubber against glass walls, forming an airtight seal",
                    "handlingNotes": "Insert with gentle twisting motion; do not hammer."
                },
                {
                    "partName": "Pre-drilled bore hole(s)",
                    "function": "Holds glass delivery tubes, thermometers, or funnels firmly in gas trains",
                    "handlingNotes": "Lubricate bore with glycerol or soapy water before inserting glass."
                },
                {
                    "partName": "Resilient elastomeric matrix",
                    "function": "Flexes to accommodate slight glassware irregularities and maintains seal under pressure/vacuum",
                    "handlingNotes": "Inspect for hardening, brittleness, or sticky chemical degradation."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring mechanical closure consumable."
            },
            "limitations": [
                "Natural rubber is attacked and dissolved by organic solvents (acetone, toluene, chloroform, ether)",
                "Natural rubber degrades, hardens, and cracks when exposed to ozone, UV light, or elevated temperatures (>85 °C)",
                "Forcing glass tubing through unlubricated stopper bores causes glass breakage and severe puncture wounds"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Select a stopper size where the narrow bottom enters the vessel neck easily, but the wide top cannot enter (stopper should seat halfway down its height)",
                "Inspect rubber for elasticity; discard stoppers that are rock-hard, cracked, or sticky",
                "If inserting glass tubing or thermometers into bored stoppers: LUBRICATE BORE AND GLASS WITH GLYCEROL OR WATER"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Safe Glass Tubing Insertion",
                    "instruction": "Lubricate the glass tube and bore hole with a drop of glycerol or water. Wrap the glass tube in a thick folded cloth or towel near the insertion point. Hold tube 1-2 cm from stopper and twist gently into the hole. NEVER push from far down the tube."
                },
                {
                    "step": 2,
                    "title": "Seating in Vessel",
                    "instruction": "Press the stopper into the vessel neck with a slight clockwise twisting motion until snug and sealed."
                },
                {
                    "step": 3,
                    "title": "Verification",
                    "instruction": "Confirm that approximately one-third to one-half of the stopper height remains protruding above the glassware rim so it can be easily removed."
                },
                {
                    "step": 4,
                    "title": "Removal",
                    "instruction": "Grasp the protruding top of the stopper and twist back and forth while pulling upward to remove."
                }
            ],
            "handlingTips": [
                "THE GOLDEN RULE OF STOPPERS: Always lubricate glass tubing and use a towel or cloth when inserting glass through rubber stoppers to prevent severe puncture wounds",
                "Never force a stopper down flush with the glass rim, or it will be impossible to remove without breaking the glass"
            ],
            "shutdown": [
                "Remove stoppers before heating reactions (unless connected to open vent tubes)",
                "Disassemble glass tubing from stoppers before long-term storage to prevent rubber seizing to glass",
                "Wash with warm soapy water, rinse, dry, and store in size-sorted bins"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Folded cloth/towel (for glass insertion)"],
            "hazards": ["Severe glass puncture wounds and tendon lacerations from snapped tubing during insertion", "Explosion if heating a sealed vessel", "Chemical solvent dissolution"],
            "warnings": [
                "NEVER force glass tubing or thermometers into rubber stoppers with bare hands; use lubrication and hold glass with a thick towel",
                "NEVER heat a tightly stoppered closed vessel (creates an explosive pressure bomb)"
            ],
            "actionsToAvoid": [
                "Do not use natural rubber stoppers with organic solvents like acetone or dichloromethane (use PTFE/cork)",
                "Do not hammer or force stoppers flush with the rim of flasks"
            ],
            "emergencyGuidance": [
                "If a snapped glass tube punctures your hand, do not twist or yank; apply direct pressure with a clean pad and seek immediate emergency medical care",
                "Clean broken glass with dustpan and broom into sharps receptacle"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wash with warm water and mild laboratory detergent",
                "Rinse with clean tap water, followed by a quick DI water rinse",
                "Dry with clean paper towels or air dry; do not bake in high-temperature drying ovens"
            ],
            "storageInstructions": [
                "Store in compartmentalized storage drawers sorted by stopper number (#00 to #10)",
                "Keep in a cool, dark cabinet away from direct sunlight, UV sources, and ozone-generating electric motors"
            ],
            "maintenanceChecks": [
                "Flex stoppers periodically: discard any that have become brittle, stiff, cracked, or gummy",
                "Check that pre-drilled bore holes are smooth and free of torn rubber ridges"
            ],
            "troubleshooting": [
                {
                    "problem": "Glass tubing is seized inside the rubber stopper bore and will not budge",
                    "possibleCauses": ["Stored for months with glass inserted; rubber vulcanized/bonded to glass surface"],
                    "solution": ["Work a lubricated cork borer slightly larger than the tube over the glass to release the rubber bond, or discard and replace"],
                    "prevention": ["Always disassemble glass tubing from stoppers after completing experiments"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Rubber stopper turns into a sticky, black gummy tar",
                    "possibleCauses": ["Exposed to incompatible organic solvent vapors (e.g. toluene, DCM, acetone)"],
                    "solution": ["Discard gummy stopper into chemical solid waste; clean glass neck with acetone; switch to neoprene, silicone, or PTFE"],
                    "prevention": ["Consult elastomer chemical compatibility charts before sealing solvent vessels"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Stopper pops out of the flask during gentle warming",
                    "possibleCauses": ["Thermal air expansion inside sealed flask; or stopper inserted wet into oily glass neck"],
                    "solution": ["Dry glass neck and stopper before inserting; ensure system has a pressure vent if heating"],
                    "prevention": ["Never seal a vessel completely air-tight while heating"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Pushing unlubricated glass tubing through a rubber stopper with bare hands",
                    "whyItMatters": "The high friction causes the thin glass tube to snap suddenly, driving jagged razor-sharp glass deep into the palm and severing tendons and nerves (the most common severe injury in chemistry labs)",
                    "howToAvoid": "Always lubricate the tube with glycerol or water, wrap the tube in a thick folded towel, and hold glass within 1 cm of the stopper while twisting gently"
                },
                {
                    "mistake": "Using a rubber stopper that is too small so it falls inside the flask neck",
                    "whyItMatters": "The stopper becomes trapped inside the flask and is difficult to remove without chemical contamination",
                    "howToAvoid": "Choose a stopper where the top diameter is significantly larger than the vessel opening, leaving 1/3 of the stopper visible"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "test-tube",
                "relationship": "complementary",
                "reason": "Rubber stoppers seal test tubes for inverted mixing, gas generation, or temporary storage.",
                "difference": "The test tube is the reaction vessel; the rubber stopper is the temporary elastomeric closure."
            },
            {
                "equipmentId": "conical-flask",
                "relationship": "complementary",
                "reason": "Rubber stoppers fit into conical flasks to seal solutions or connect gas delivery tubes.",
                "difference": "The conical flask contains the solution; the rubber stopper seals the neck opening."
            },
            {
                "equipmentId": "buchner-funnel",
                "relationship": "complementary",
                "reason": "Rubber adapter cones (plugs) seal the Büchner funnel stem into the neck of the filter flask.",
                "difference": "The rubber adapter forms the vacuum seal; the Büchner funnel performs the filtration."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ASTM D395 - Standard Test Methods for Rubber Property—Compression Set",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Rubber resilience, taper dimensions, compression sealing standards"]
                },
                {
                    "title": "Laboratory Safety Guidance (OSHA 3404-11R)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Document",
                    "supports": ["Safe insertion of glass tubing into stoppers, puncture wound prevention"]
                }
            ]
        }
    }
]

print(f"Items 51-60 loaded: {len(ITEMS_51_TO_60)}")
