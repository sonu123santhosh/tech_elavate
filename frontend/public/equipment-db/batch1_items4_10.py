# -*- coding: utf-8 -*-
"""
Batch 1 Items 4-10:
4. conical-flask
5. volumetric-flask
6. pipette
7. burette
8. glass-funnel
9. glass-stirring-rod
10. watch-glass
"""

ITEMS_4_TO_10 = [
    # 4. Conical Flask
    {
        "id": "conical-flask",
        "pdfNumber": 4,
        "pdfName": "Conical Flask",
        "pdfMainUse": "Mixing solutions and titration",
        "pdfGroup": "Essential glassware and basics",
        "name": "Conical Flask",
        "category": "Glassware",
        "purpose": "Facilitates splash-free manual swirling, titration receptions, and boiling of liquids.",
        "image": {
            "src": "assets/images/equipment/conical-flask.svg",
            "alt": "Borosilicate glass conical Erlenmeyer flask with narrow neck and flat base",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/conical-flask.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A flat-bottomed laboratory flask with a conical body and narrow cylindrical neck. The sloping walls allow vigorous orbital swirling without risk of spilling, making it the premier receiver vessel for titrations, recrystalizations, and microbiological cultures.",
        "alternativeNames": ["Erlenmeyer flask", "Titration flask"],
        "commonUses": [
            "Receiving analyte solutions beneath a burette during acid-base titrations",
            "Swirling and dissolving solids in liquids manually without splashing",
            "Heating and recrystallizing organic compounds from solvents",
            "Aerating liquid microbial cell cultures on orbital shaker tables"
        ],
        "types": [
            "Narrow-neck standard Erlenmeyer flask (standard titration format)",
            "Wide-neck conical flask (for easy addition of solid solids and tablets)",
            "Screw-cap conical flask (for sterile microbial cultures and storage)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3"],
            "capacity": {
                "value": "250",
                "unit": "mL",
                "notes": "250 mL is the worldwide standard size for analytical titrations; ranges from 25 mL to 5000 mL."
            },
            "dimensions": "Base diameter ~85 mm, Top rim diameter ~34 mm, Height ~145 mm (250 mL size)",
            "mainParts": ["Narrow neck with reinforced rim", "Conical sloping walls", "Flat base", "Graduation scale", "Enamel marking spot"],
            "partsAndFunctions": [
                {
                    "partName": "Narrow neck with reinforced rim",
                    "function": "Minimizes vapor loss, prevents liquid splashing during swirling, and fits standard stoppers",
                    "handlingNotes": "Avoid gripping solely by the rim when hot."
                },
                {
                    "partName": "Conical sloping walls",
                    "function": "Directs droplets bouncing upward back into the bulk liquid mixture",
                    "handlingNotes": "Permits smooth continuous circular orbital swirling."
                },
                {
                    "partName": "Flat base",
                    "function": "Stands stably on benchtops, magnetic stir plates, and wire gauzes",
                    "handlingNotes": "Inspect for thermal stress cracks or star chips."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "%",
                "notes": "Graduation markings are nominal estimates only (tolerance approximately ±5%); uncalibrated for precise volumetry."
            },
            "limitations": [
                "Not calibrated for volumetric accuracy (do not use in place of a volumetric flask)",
                "Narrow neck makes mechanical scrubbing of inside corners more difficult than beakers",
                "Should not be subjected to high vacuum filtration (use thick-walled Büchner filter flask instead)"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the neck rim and flat base for chips or micro-fractures",
                "Rinse with deionized water; for titrations, dry outer base and place over a white background tile",
                "Verify required stopper size if closure is necessary"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Placement",
                    "instruction": "Set the flask directly below the burette tip on top of a white ceramic tile or paper sheet to contrast the endpoint color."
                },
                {
                    "step": 2,
                    "title": "Reagent Introduction",
                    "instruction": "Transfer the measured aliquot into the flask using a volumetric pipette touched against the inner neck wall."
                },
                {
                    "step": 3,
                    "title": "Swirling Technique",
                    "instruction": "Hold the upper neck lightly between thumb and index finger, moving your wrist in a gentle continuous horizontal orbit."
                },
                {
                    "step": 4,
                    "title": "Titration Endpoint",
                    "instruction": "Swirl continuously as titrant enters drop by drop until the indicator persists for at least 30 seconds."
                }
            ],
            "handlingTips": [
                "Swirl strictly using your wrist with the flask base resting lightly on or hovering just above the white tile",
                "Wash down splashes on the inner neck with a brief squirt of distilled water from a wash bottle"
            ],
            "shutdown": [
                "Neutralize or discard titrated contents into the designated chemical waste carboy",
                "Wash with detergent using a flexible angled flask brush",
                "Invert on a peg rack to dry"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical splash from vigorous swirling", "Glass lacerations if cracked", "Steam burns during boiling"],
            "warnings": [
                "Never connect a standard thin-walled conical flask to a high-vacuum pump; implosion hazard",
                "Never boil liquids in a sealed or firmly stoppered conical flask"
            ],
            "actionsToAvoid": [
                "Do not heat the flask dry over a naked burner flame",
                "Do not use as a vacuum receiver (use heavy-walled Büchner filter flask)"
            ],
            "emergencyGuidance": [
                "If acid or alkali splashes occur while swirling, flush eyes or skin immediately for 15 minutes",
                "Sweep broken glass with broom and dustpan into the dedicated glass disposal container"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Fill one-third with warm detergent solution and scrub with a bendable flask brush",
                "Rinse three times with warm tap water to remove all surfactant residue",
                "Rinse inside and neck with distilled water and allow to dry inverted"
            ],
            "storageInstructions": [
                "Store upright in dedicated glassware cupboards grouped by volume capacity",
                "Do not stack conical flasks on top of one another"
            ],
            "maintenanceChecks": [
                "Inspect the bottom corner perimeter where internal stresses frequently induce cracks",
                "Ensure neck rim is smooth without jagged micro-fractures"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid splashes out over the neck while swirling",
                    "possibleCauses": ["Swirling too violently with an elliptical or vertical motion", "Flask is filled past half capacity"],
                    "solution": ["Adopt a gentle planar circular wrist motion and ensure liquid volume is below half the total flask capacity"],
                    "prevention": ["Practice smooth wrist rotations with plain water before titrating"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Titration endpoint is consistently overshot",
                    "possibleCauses": ["Poor swirl mixing allowing local titrant pooling", "Absence of a white background tile under flask"],
                    "solution": ["Place a white tile beneath the flask and slow delivery to single drop additions while swirling constantly"],
                    "prevention": ["Rinse neck walls with DI water wash bottle when nearing endpoint"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Flask implodes or cracks when connected to aspirator",
                    "possibleCauses": ["Standard thin-walled Erlenmeyer flask used under vacuum instead of heavy-walled filter flask"],
                    "solution": ["Immediately disconnect vacuum source, isolate broken glass and chemicals, and report to supervisor"],
                    "prevention": ["Always verify that glassware has heavy walls and side-arm for vacuum filtration"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Titrating without a white ceramic tile or paper beneath the conical flask",
                    "whyItMatters": "Dark or wooden bench surfaces obscure faint indicator color transitions (e.g. pale pink phenolphthalein)",
                    "howToAvoid": "Always position a clean white tile or piece of white paper directly beneath the flask"
                },
                {
                    "mistake": "Swirling with large arm swings instead of isolated wrist movement",
                    "whyItMatters": "Causes uncontrolled sloshing that sends corrosive chemicals out through the neck",
                    "howToAvoid": "Rest the flask base lightly against the tile and rotate only your wrist"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "burette",
                "relationship": "complementary",
                "reason": "The conical flask sits directly under the burette to receive delivered titrant during titrations.",
                "difference": "The burette measures and delivers titrant; the conical flask contains and swirls the analyte."
            },
            {
                "equipmentId": "beaker",
                "relationship": "alternative",
                "reason": "Both are reaction vessels, but beakers are prone to spilling when swirled.",
                "difference": "Conical flasks taper toward a narrow mouth to prevent splash; beakers have wide vertical walls."
            },
            {
                "equipmentId": "pipette",
                "relationship": "complementary",
                "reason": "Used to deliver the exact volume of analyte sample into the conical flask prior to titration.",
                "difference": "The pipette transfers a calibrated precision volume; the flask is the mixing vessel."
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
                    "title": "ISO 1773 - Laboratory glassware: Narrow-necked boiling flasks (Erlenmeyer)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Dimensions and thermal specifications of conical flasks"]
                },
                {
                    "title": "Quantitative Chemical Analysis (Harris, 9th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Titration vessel selection and swirling technique"]
                }
            ]
        }
    },

    # 5. Volumetric Flask
    {
        "id": "volumetric-flask",
        "pdfNumber": 5,
        "pdfName": "Volumetric Flask",
        "pdfMainUse": "Preparing solutions to a precise volume",
        "pdfGroup": "Essential glassware and basics",
        "name": "Volumetric Flask",
        "category": "Glassware",
        "purpose": "Prepares standard solutions and accurate chemical dilutions to an exact calibrated volume.",
        "image": {
            "src": "assets/images/equipment/volumetric-flask.svg",
            "alt": "Pear-shaped volumetric flask with elongated neck, single calibration ring, and ground glass stopper",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/volumetric-flask.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A flat-bottomed, pear-shaped flask with an elongated narrow neck marked with a single etched circular calibration line (ring). Calibrated 'to contain' (TC / In) a specific volume at 20 °C, it is the primary vessel for standard solution synthesis and quantitative dilutions.",
        "alternativeNames": ["Graduated flask", "Measuring flask", "Class A volumetric flask"],
        "commonUses": [
            "Preparing primary standard solutions of precisely known molarity",
            "Quantitative dilution of concentrated stock standard solutions",
            "Dissolving weighed solid analytical reagents to exact total volumes",
            "Preparing calibration curves for spectrophotometry and chromatography"
        ],
        "types": [
            "Class A volumetric flask (high accuracy, serialized, meeting ISO/ASTM standards)",
            "Class B volumetric flask (general student lab accuracy, twice the Class A tolerance)",
            "Amber (actinic) volumetric flask (protects light-sensitive compounds like silver nitrate)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "Amber low-actinic borosilicate glass"],
            "capacity": {
                "value": "250",
                "unit": "mL",
                "notes": "250 mL is standard; common capacities include 10 mL, 25 mL, 50 mL, 100 mL, 500 mL, and 1000 mL."
            },
            "dimensions": "Bulb diameter ~85 mm, Neck diameter ~15 mm, Total height ~220 mm (typical 250 mL size)",
            "mainParts": ["Ground glass or polyethylene stopper", "Narrow neck with single etched ring mark", "Pear-shaped body", "Flat base"],
            "partsAndFunctions": [
                {
                    "partName": "Ground glass or polyethylene stopper",
                    "function": "Hermetically seals the flask during inverted homogenization mixing",
                    "handlingNotes": "Hold firmly in place with your index finger during inversion."
                },
                {
                    "partName": "Narrow neck with single etched ring mark",
                    "function": "Precisely defines the calibrated volume; small meniscus changes correspond to tiny volume increments",
                    "handlingNotes": "Align eye level strictly with the 360-degree ring to avoid parallax."
                },
                {
                    "partName": "Pear-shaped body",
                    "function": "Provides maximum volume capacity with a low center of gravity and stable base",
                    "handlingNotes": "Swirl to dissolve solutes before filling the narrow neck."
                }
            ],
            "measurementAccuracy": {
                "value": 0.12,
                "unit": "mL",
                "notes": "Class A 250 mL volumetric flask tolerance is ±0.12 mL (±0.048% relative) at 20 °C per ISO 1042."
            },
            "limitations": [
                "Calibrated for exactly one specific volume only (no intermediate measurement capability)",
                "Must never be heated over flames or hot plates; thermal expansion permanently destroys Class A calibration",
                "Cannot store concentrated alkaline solutions long-term as hydroxide etches the glass"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the etched graduation ring, neck, and ground socket for chips",
                "Ensure flask is clean and rinsed with distilled water; drying the interior is not required because it is calibrated to contain",
                "Pre-dissolve solid solutes completely in a beaker with a minimal volume of solvent before transferring"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Quantitative Transfer",
                    "instruction": "Pour pre-dissolved solution into the flask through a clean glass funnel. Rinse the beaker and funnel multiple times with DI water into the flask."
                },
                {
                    "step": 2,
                    "title": "Bulk Dilution",
                    "instruction": "Add solvent until the liquid level reaches approximately 1 cm below the etched ring mark, swirling gently to mix."
                },
                {
                    "step": 3,
                    "title": "Meniscus Final Adjustment",
                    "instruction": "Using a dropper or Pasteur pipette, add solvent dropwise at eye level until the bottom of the meniscus rests exactly on the etched line."
                },
                {
                    "step": 4,
                    "title": "Homogenization",
                    "instruction": "Insert the stopper firmly. Invert the flask completely and invert back 10 to 15 times, allowing the air bubble to traverse the full neck each time."
                }
            ],
            "handlingTips": [
                "Never add solid dry chemical crystals directly into the narrow neck of the volumetric flask",
                "Allow solutions undergoing exothermic dissolution to cool back to 20 °C before bringing to the final mark"
            ],
            "shutdown": [
                "Pour standard solution into a labeled reagent bottle if required for long-term storage",
                "Rinse flask thoroughly with deionized water immediately after use",
                "Store with stopper loose or separated by a paper strip to prevent glass seizure"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical splash during inverted shaking", "Thermal shock rupture if hot liquid added", "Toxic solvent vapor release"],
            "warnings": [
                "Never bake volumetric flasks in high-temperature drying ovens (>100 °C)",
                "Always hold the stopper securely with a finger while inverting the flask"
            ],
            "actionsToAvoid": [
                "Do not heat directly over a Bunsen burner flame or hot plate",
                "Do not store concentrated sodium hydroxide inside ground-glass stoppered flasks"
            ],
            "emergencyGuidance": [
                "If the stopper loosens and chemicals leak over hands during inversion, immediately wash hands under running water for 15 minutes",
                "Clean broken glassware with brush and dustpan into sharps receptacle"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Rinse immediately after use with warm water and mild neutral detergent",
                "Rinse four times with tap water, followed by three rinses with deionized water",
                "Allow to air-dry at room temperature on a clean drying rack"
            ],
            "storageInstructions": [
                "Store upright on dedicated analytical glassware shelves",
                "Insert a strip of paper between the ground-glass stopper and neck socket to prevent jamming"
            ],
            "maintenanceChecks": [
                "Verify that the calibration etched line is distinct and unbroken around the neck",
                "Check ground glass joint for smooth liquid-tight sealing without rocking"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid level rises or falls above the line after inverting",
                    "possibleCauses": ["Solution was warm when filled and expanded or contracted upon cooling", "Incomplete initial mixing"],
                    "solution": ["Always equilibrate solutions to room temperature (20 °C) before making up to the final mark"],
                    "prevention": ["Check temperature of solution with a thermometer before final meniscus adjustment"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Meniscus was accidentally filled past the etched calibration mark",
                    "possibleCauses": ["Added solvent too aggressively without switching to a fine dropper"],
                    "solution": ["The solution concentration is spoiled; discard completely and prepare fresh from the beginning"],
                    "prevention": ["Stop pouring 1 cm below line and use a Pasteur pipette for final dropwise adjustment"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Ground-glass stopper is firmly seized in the neck socket",
                    "possibleCauses": ["Alkaline solution dried in the joint", "Stopper inserted wet and stored without paper strip"],
                    "solution": ["Soak neck in warm soapy water or tap gently with a wooden block; ask supervisor for assistance"],
                    "prevention": ["Never store flasks with stoppers wedged in tightly"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Filling past the calibration mark and attempting to pipette out the excess liquid",
                    "whyItMatters": "Removing liquid also removes dissolved solute, making the true concentration unknown and invalid",
                    "howToAvoid": "Never pipette out excess; if overfilled, dump the solution and start the preparation again"
                },
                {
                    "mistake": "Heating a volumetric flask to speed up solid solute dissolution",
                    "whyItMatters": "Thermal expansion of volumetric glass induces irreversible volume drift that invalidates Class A accuracy",
                    "howToAvoid": "Dissolve solids at room temperature in a beaker first, using a magnetic stirrer if necessary"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "analytical-balance",
                "relationship": "complementary",
                "reason": "Solutes are weighed accurately on the analytical balance before dilution in the volumetric flask.",
                "difference": "The balance measures mass; the volumetric flask defines total dissolved solution volume."
            },
            {
                "equipmentId": "glass-funnel",
                "relationship": "complementary",
                "reason": "A clean funnel is placed in the narrow neck to guide quantitative liquid transfers without loss.",
                "difference": "The funnel is a pouring conduit; the volumetric flask is the calibrated vessel."
            },
            {
                "equipmentId": "dropper",
                "relationship": "complementary",
                "reason": "Used to add the final drops of solvent to bring the meniscus precisely to the etched line.",
                "difference": "The dropper delivers dropwise increments; the flask measures the final combined volume."
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
                    "title": "ISO 1042 - Laboratory glassware: One-mark volumetric flasks",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Class A tolerances", "Dimensions and calibration protocols"]
                },
                {
                    "title": "ASTM E288 - Standard Specification for Laboratory Glass Volumetric Flasks",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Capacity tolerances and testing requirements"]
                }
            ]
        }
    },

    # 6. Pipette
    {
        "id": "pipette",
        "pdfNumber": 6,
        "pdfName": "Pipette",
        "pdfMainUse": "Transferring measured liquid",
        "pdfGroup": "Essential glassware and basics",
        "name": "Pipette",
        "category": "Glassware",
        "purpose": "Transfers precisely measured liquid volumes with high analytical accuracy.",
        "image": {
            "src": "assets/images/equipment/pipette.svg",
            "alt": "Glass volumetric bulb pipette with central reservoir and single upper calibration line",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/pipette.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A slender glass tube calibrated to transfer or deliver a specific volume of liquid. Standard laboratory pipettes include volumetric (transfer) pipettes with a central expansion bulb and single ring mark, and graduated (Mohr or serological) pipettes with graduated scale markings.",
        "alternativeNames": ["Volumetric pipette", "Transfer pipette", "Bulb pipette", "Graduated pipette"],
        "commonUses": [
            "Dispensing exact analytical aliquots of standard solutions for titrations",
            "Transferring accurate sample volumes during serial dilutions",
            "Measuring precise volumes of biological serum, culture media, or reagents",
            "Calibrating secondary volumetric glassware"
        ],
        "types": [
            "Volumetric (bulb) pipette (highest precision, single fixed volume like 10 mL or 25 mL)",
            "Graduated Mohr pipette (graduations stop before the tip)",
            "Graduated Serological pipette (graduated to the tip, blowout type)",
            "Micropipette (piston-driven adjustable mechanical pipette for microliter ranges)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "Soda-lime glass"],
            "capacity": {
                "value": "25",
                "unit": "mL",
                "notes": "25 mL and 10 mL are standard for titrations; standard sizes range from 1 mL to 100 mL."
            },
            "dimensions": "Overall length ~440 mm, Bulb diameter ~20 mm (standard 25 mL volumetric pipette)",
            "mainParts": ["Suction mouth end", "Upper suction stem with calibration ring", "Central expansion bulb", "Delivery jet tip"],
            "partsAndFunctions": [
                {
                    "partName": "Suction mouth end",
                    "function": "Connects to a rubber bulb, three-way pipette filler, or mechanical pipetting aid",
                    "handlingNotes": "Never mouth-pipette under any circumstances."
                },
                {
                    "partName": "Upper suction stem with calibration ring",
                    "function": "Fine bore tube with single etched ring calibrated 'to deliver' (TD / Ex) at 20 °C",
                    "handlingNotes": "View meniscus at direct eye level."
                },
                {
                    "partName": "Central expansion bulb",
                    "function": "Holds the majority of liquid capacity while keeping stem narrow for sensitivity",
                    "handlingNotes": "Inspect for cracks or inner grime."
                },
                {
                    "partName": "Delivery jet tip",
                    "function": "Tapered nozzle controlling liquid drainage rate and residual droplet retention",
                    "handlingNotes": "Inspect tip for chips; do not blow out residual drop in Class A pipettes."
                }
            ],
            "measurementAccuracy": {
                "value": 0.03,
                "unit": "mL",
                "notes": "Class A 25 mL volumetric pipette has a tolerance of ±0.03 mL per ISO 648."
            },
            "limitations": [
                "Volumetric pipettes deliver only one fixed volume; cannot dispense arbitrary fractions",
                "Viscous or foaming liquids alter drainage film thickness and cause measurement error",
                "Fragile narrow tip easily chips if bumped against bottom of beakers"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the jet tip and suction stem under light for chips or cracks",
                "Rinse the clean pipette with two small aliquots of the solution to be measured (conditioning)",
                "Attach a suitable rubber bulb or pipette filler; never use your mouth"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Drawing Liquid",
                    "instruction": "Submerge tip into liquid, operate the pipette filler, and draw liquid roughly 2 cm above the etched mark."
                },
                {
                    "step": 2,
                    "title": "Meniscus Adjustment",
                    "instruction": "Remove filler, quickly seal the top with your index finger, wipe the outside of the tip with a lint-free tissue, and drain slowly until the meniscus touches the mark."
                },
                {
                    "step": 3,
                    "title": "Transfer",
                    "instruction": "Move the pipette into the receiving vessel and release your finger, holding the pipette vertical."
                },
                {
                    "step": 4,
                    "title": "Drainage and Touch-off",
                    "instruction": "Allow gravity drainage, wait 3 seconds, and touch the tip once against the inner vessel wall. Do not blow out the residual droplet."
                }
            ],
            "handlingTips": [
                "Use your dry index finger—never your thumb—for controlling drainage in manual finger-pipetting",
                "Keep the tip immersed beneath the liquid surface while drawing to avoid aspirating air bubbles into the bulb"
            ],
            "shutdown": [
                "Rinse immediately with deionized water after delivering chemical solutions",
                "Soak in a vertical pipette washing cylinder if contaminated",
                "Store horizontally in clean pipette trays or vertically in a carousel rack"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical ingestion if mouth-pipetted", "Glass puncture from snapping stem during filler insertion", "Chemical aerosols"],
            "warnings": [
                "NEVER pipette by mouth under any circumstances; always use a mechanical filler or rubber bulb",
                "Do not force pipettes into rubber fillers with excessive axial force"
            ],
            "actionsToAvoid": [
                "Do not blow out the small droplet remaining in the jet tip of Class A transfer pipettes",
                "Do not lay a filled pipette horizontally on the lab bench"
            ],
            "emergencyGuidance": [
                "If liquid is accidentally aspirated or contacts mucous membranes, rinse immediately and seek medical attention",
                "In case of a broken glass stem puncture, wash wound, apply pressure, and report to instructor"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Place in an automatic siphon pipette washer charged with laboratory glassware cleaner",
                "Cycle with tap water siphon flushes, followed by multiple deionized water rinses",
                "Dry vertically in a warm-air drying canister or dust-free cabinet"
            ],
            "storageInstructions": [
                "Store in designated lined drawer trays or revolving rotary pipette stands",
                "Ensure tips do not rest directly on hard metallic surfaces"
            ],
            "maintenanceChecks": [
                "Inspect jet tips for micro-chipping using a magnifying lens",
                "Check drainage flow time against nominal factory specifications (~15-25 seconds)"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid slips continuously down the stem while holding finger on top",
                    "possibleCauses": ["Index finger or top rim is wet", "Grease or oil preventing seal", "Chipped top rim"],
                    "solution": ["Dry your index finger thoroughly and wipe the top glass opening; re-inspect for chips"],
                    "prevention": ["Always ensure dry hands and clean rim before finger sealing"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Droplets cling in patches to the inner wall after drainage",
                    "possibleCauses": ["Contamination by hydrophobic grease, silicone, or organic films"],
                    "solution": ["Soak in warm alkaline lab detergent or acid cleaning bath, then rinse exhaustively with DI water"],
                    "prevention": ["Never leave chemical solutions drying inside pipettes"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Jet tip is chipped or jagged",
                    "possibleCauses": ["Struck forcefully against bottom of glass beaker during filling"],
                    "solution": ["Retire pipette immediately; chipped tip alters capillary retention and spoils volumetric calibration"],
                    "prevention": ["Never jab pipette tips against vessel bottoms"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Using a thumb instead of an index finger to seal the top of the pipette",
                    "whyItMatters": "The thumb lacks fine motor sensitivity and easily allows premature liquid leakage",
                    "howToAvoid": "Always use a slightly damp or dry index finger rolled across the opening for sensitive control"
                },
                {
                    "mistake": "Blowing out the last droplet of liquid from a Class A volumetric pipette",
                    "whyItMatters": "Class A volumetric pipettes are calibrated 'to deliver' (TD) with that specific droplet retained by capillarity",
                    "howToAvoid": "Simply touch the tip to the receiver wall for 3 seconds and leave the residual droplet in the tip"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "conical-flask",
                "relationship": "complementary",
                "reason": "The pipette dispenses accurate aliquots directly into conical flasks for titration analysis.",
                "difference": "The pipette measures and transfers the liquid; the flask receives and swirls it."
            },
            {
                "equipmentId": "burette",
                "relationship": "complementary",
                "reason": "Pipettes deliver the fixed analyte volume; burettes deliver the variable titrant volume.",
                "difference": "A pipette dispenses a single fixed volume; a burette dispenses variable volumes via a stopcock."
            },
            {
                "equipmentId": "measuring-cylinder",
                "relationship": "alternative",
                "reason": "Both transfer liquid volumes, but pipettes provide superior analytical accuracy.",
                "difference": "A volumetric pipette has ±0.03 mL tolerance; a 25 mL measuring cylinder has ±0.25 mL tolerance."
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
                    "title": "ISO 648 - Laboratory glassware: Single-volume pipettes",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Class A tolerances, drainage times, TD calibration rules"]
                },
                {
                    "title": "ASTM E969 - Standard Specification for Glass Volumetric (Transfer) Pipets",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Dimensions, flow times, volumetric tolerances"]
                }
            ]
        }
    },

    # 7. Burette
    {
        "id": "burette",
        "pdfNumber": 7,
        "pdfName": "Burette",
        "pdfMainUse": "Delivering liquid during titration",
        "pdfGroup": "Essential glassware and basics",
        "name": "Burette",
        "category": "Glassware",
        "purpose": "Dispenses precise, variable volumes of titrant solution controlled by a stopcock valve.",
        "image": {
            "src": "assets/images/equipment/burette.svg",
            "alt": "Long graduated glass burette tube with PTFE stopcock valve and fine delivery tip",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/burette.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A long, uniform glass graduated tube with fine millimeter calibrations and a precision stopcock valve at the bottom. Calibrated 'to deliver' (TD) variable liquid volumes, it is the fundamental tool of titrimetric (volumetric) chemical analysis.",
        "alternativeNames": ["Buret", "Titration burette", "Class A burette"],
        "commonUses": [
            "Delivering titrant drop by drop into analyte solutions during acid-base titrations",
            "Performing redox, complexometric, and precipitation titrations",
            "Determining water hardness, chemical oxygen demand, and acidity levels",
            "Measuring accurate variable liquid volumes for reaction kinetics"
        ],
        "types": [
            "Straight-bore burette with PTFE (Teflon) stopcock (modern, self-lubricating, no grease needed)",
            "Ground-glass stopcock burette (traditional format requiring silicone or hydrocarbon stopcock grease)",
            "Automatic zeroing burette with integrated reservoir bottle (for high-throughput testing)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "PTFE (polytetrafluoroethylene) stopcock plug"],
            "capacity": {
                "value": "50",
                "unit": "mL",
                "notes": "50 mL graduated in 0.1 mL intervals is standard; 25 mL and microburettes (10 mL / 5 mL) also common."
            },
            "dimensions": "Length ~750 mm, Outer tube diameter ~14 mm (typical 50 mL burette)",
            "mainParts": ["Funnel top opening", "Graduated cylindrical barrel (0.00 to 50.00 mL)", "PTFE stopcock valve", "Fine delivery jet tip"],
            "partsAndFunctions": [
                {
                    "partName": "Funnel top opening",
                    "function": "Allows easy filling of titrant solution using a small glass funnel",
                    "handlingNotes": "Always remove the funnel after filling to avoid stray drips into the barrel."
                },
                {
                    "partName": "Graduated cylindrical barrel",
                    "function": "Displays etched volume scale reading from 0.00 mL at the top to 50.00 mL at the bottom",
                    "handlingNotes": "Read with eye strictly perpendicular to eliminate parallax error."
                },
                {
                    "partName": "PTFE stopcock valve",
                    "function": "Regulates liquid delivery rate from a rapid stream down to tiny individual micro-drops",
                    "handlingNotes": "Adjust tension nut to ensure smooth turn without leaking or binding."
                },
                {
                    "partName": "Fine delivery jet tip",
                    "function": "Produces small, uniform droplets for precise endpoint detection",
                    "handlingNotes": "Inspect for air bubbles trapped inside the tip before beginning titration."
                }
            ],
            "measurementAccuracy": {
                "value": 0.05,
                "unit": "mL",
                "notes": "Class A 50 mL burette tolerance is ±0.05 mL per ISO 385; interpolation enables readings to ±0.01 mL."
            },
            "limitations": [
                "Air bubbles trapped beneath the stopcock lead to severe volumetric errors if not expelled",
                "Height requires careful clamping on a heavy retort stand to prevent tipping",
                "Prolonged storage of strong alkali in glass-stopcock models causes joint seizure"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Clamp burette vertically in a burette clamp attached to a sturdy retort stand",
                "Condition the burette by rinsing with three 5 mL portions of the titrant solution",
                "Fill with titrant above the 0.00 mL mark using a clean, dry funnel; remove the funnel immediately"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Air Bubble Clearance",
                    "instruction": "Open the stopcock fully to flush a fast stream of liquid through the tip, clearing all trapped air bubbles. Ensure tip is completely filled."
                },
                {
                    "step": 2,
                    "title": "Initial Reading",
                    "instruction": "Drain liquid until the meniscus is at or below 0.00 mL. Record the initial reading to two decimal places (e.g. 0.42 mL) at eye level."
                },
                {
                    "step": 3,
                    "title": "Titrant Delivery",
                    "instruction": "Manipulate the stopcock with your non-dominant hand reaching around the barrel, while your dominant hand continuously swirls the conical flask."
                },
                {
                    "step": 4,
                    "title": "Final Reading",
                    "instruction": "At the persistent endpoint color, close the stopcock, wait 20 seconds for wall drainage, and record final volume to 0.01 mL."
                }
            ],
            "handlingTips": [
                "Use a white paper card with a black horizontal bar held behind the scale to highlight the meniscus bottom sharply",
                "Wrap your left hand around the stopcock so your fingers pull the plug inward toward the barrel while turning"
            ],
            "shutdown": [
                "Drain remaining titrant into designated waste carboy",
                "Rinse burette three times with deionized water, leaving stopcock open to drain",
                "Store inverted in a burette clamp with stopcock open or fill with distilled water if in daily use"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical splash in eyes when filling above eye level", "Glass breakage from over-tightening clamp", "Corrosive chemical leaks"],
            "warnings": [
                "Always lower the burette on the stand or use a step stool when filling to keep the top rim below eye level",
                "Never leave a funnel resting in the burette top during titration"
            ],
            "actionsToAvoid": [
                "Do not overtighten metal clamp screws against the glass barrel",
                "Do not grease PTFE Teflon stopcocks"
            ],
            "emergencyGuidance": [
                "If titrant acid or base splashes into eyes while filling, immediately flush at eyewash station for 15 minutes",
                "Neutralize chemical leaks on bench with appropriate spill neutralizing agent"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Fill with warm detergent solution and clean barrel using a long-handled wire burette brush",
                "Open stopcock to allow detergent to pass through and clean the jet tip",
                "Rinse repeatedly with tap water, followed by three complete rinses with deionized water"
            ],
            "storageInstructions": [
                "Store clamped vertically in a dedicated burette rack, inverted with stopcock open and dust cap on tip",
                "Loosen PTFE stopcock tension nut slightly during prolonged storage to prevent barrel deformation"
            ],
            "maintenanceChecks": [
                "Inspect jet tip under light for chips or cracks",
                "Fill with water, close stopcock, and confirm zero drops leak over 10 minutes"
            ],
            "troubleshooting": [
                {
                    "problem": "An air bubble remains trapped in the jet tip beneath the stopcock",
                    "possibleCauses": ["Filled too slowly without opening stopcock wide", "Surface tension trapping air in tip taper"],
                    "solution": ["Open the stopcock wide open over a waste beaker and gently tap the tip with your fingernail during rapid flow"],
                    "prevention": ["Always flush a rapid jet of titrant through the stopcock immediately after filling"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Burette leaks from the stopcock joint during titration",
                    "possibleCauses": ["PTFE tension nut is too loose", "Worn O-ring or scratched PTFE plug"],
                    "solution": ["Tighten the stopcock retaining nut a quarter turn; if leak persists, replace PTFE plug assembly"],
                    "prevention": ["Regularly verify stopcock nut tightness before filling with corrosive titrant"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Solution drains leaving scattered droplets adhering to the inner glass wall",
                    "possibleCauses": ["Grease or dirty organic film inside the barrel altering wetting behavior"],
                    "solution": ["Clean with specialized glassware detergent or ethanolic potassium hydroxide, followed by thorough DI water rinse"],
                    "prevention": ["Never leave titrant solutions sitting in burettes overnight"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Leaving the funnel sitting in the top of the burette while taking titration readings",
                    "whyItMatters": "Residual droplets clinging to the funnel will drip into the burette during titration, altering volume readings",
                    "howToAvoid": "Always remove the funnel immediately after completing the liquid filling step"
                },
                {
                    "mistake": "Titrating with an air bubble trapped in the tip beneath the stopcock",
                    "whyItMatters": "The bubble dislodges during titration, counting as delivered titrant volume and causing large errors",
                    "howToAvoid": "Always inspect the tip before taking the initial reading and flush until bubble-free"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "conical-flask",
                "relationship": "complementary",
                "reason": "The conical flask sits directly under the burette to catch and mix titrant during titration.",
                "difference": "The burette dispenses titrant; the conical flask holds and swirls the reaction mixture."
            },
            {
                "equipmentId": "retort-stand",
                "relationship": "complementary",
                "reason": "Provides the heavy, rigid vertical support base needed to hold the burette upright.",
                "difference": "The retort stand is the structural metal support; the burette is the calibrated glassware."
            },
            {
                "equipmentId": "clamp-and-boss-head",
                "relationship": "complementary",
                "reason": "Fastens the burette securely to the vertical rod of the retort stand.",
                "difference": "The clamp holds the equipment; the burette is the volumetric dispensing tube."
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
                    "title": "ISO 385 - Laboratory glassware: Burettes",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Class A tolerances, scale dimensions, delivery times"]
                },
                {
                    "title": "ASTM E287 - Standard Specification for Laboratory Glass Graduated Burets",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Stopcock leakage tests, volumetric accuracy limits"]
                }
            ]
        }
    },

    # 8. Glass Funnel
    {
        "id": "glass-funnel",
        "pdfNumber": 8,
        "pdfName": "Glass Funnel",
        "pdfMainUse": "Pouring and filtration",
        "pdfGroup": "Essential glassware and basics",
        "name": "Glass Funnel",
        "category": "Glassware",
        "purpose": "Channels liquids into narrow openings and supports filter paper during gravity filtration.",
        "image": {
            "src": "assets/images/equipment/glass-funnel.svg",
            "alt": "Conical glass funnel with 60-degree cone angle and narrow beveled stem",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/glass-funnel.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A conical glass device with a wide mouth tapering into a narrow cylindrical stem. Designed for neat transfer of liquids into containers with small openings and for supporting folded filter paper during gravity filtration separations.",
        "alternativeNames": ["Conical funnel", "Filter funnel", "Gravity filtration funnel"],
        "commonUses": [
            "Gravity filtration of solid precipitates from liquid reaction mixtures",
            "Transferring liquids cleanly into narrow-necked volumetric flasks and burettes",
            "Holding cotton wool plugs or glass wool for coarse filtration",
            "Supporting fluted filter paper for rapid filtration"
        ],
        "types": [
            "Short-stem glass funnel (ideal for quick liquid pouring into narrow necks)",
            "Long-stem glass funnel (designed for gravity filtration; creates liquid column suction)",
            "Powder funnel (features wide, short stem for transferring dry solids without clogging)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3"],
            "capacity": {
                "value": "75",
                "unit": "mm",
                "notes": "Diameter across top cone rim typically 75 mm (holding ~100 mL liquid); diameters range from 35 mm to 150 mm."
            },
            "dimensions": "Top diameter ~75 mm, Stem length ~75 mm (short stem) or ~150 mm (long stem), Stem OD ~8 mm",
            "mainParts": ["Conical bowl (60° angle)", "Reinforced rim", "Narrow cylindrical stem", "Beveled tip"],
            "partsAndFunctions": [
                {
                    "partName": "Conical bowl (60° angle)",
                    "function": "Matches the 60° angle of standard quarter-folded or fluted filter paper cones",
                    "handlingNotes": "Ensure paper fits snugly without gaps."
                },
                {
                    "partName": "Reinforced rim",
                    "function": "Provides structural strength against chipping during routine handling",
                    "handlingNotes": "Inspect rim for chips before resting in funnel rings."
                },
                {
                    "partName": "Narrow cylindrical stem",
                    "function": "Transfers liquid down into receiving vessel; creates continuous hydrostatic suction in long stems",
                    "handlingNotes": "Check for cracks where stem meets the cone body."
                },
                {
                    "partName": "Beveled tip",
                    "function": "Allows filtrate to drain smoothly down the receiver wall without splashing",
                    "handlingNotes": "Position bevel touching the inside wall of the receiving beaker."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring fluid transfer and filtration apparatus."
            },
            "limitations": [
                "Gravity filtration is relatively slow compared to vacuum filtration with a Büchner funnel",
                "Narrow liquid stems clog easily if used with coarse dry powders (use powder funnels instead)",
                "Standard glass funnels cannot withstand vacuum differential pressure"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect cone and stem for cracks, especially at the bowl-stem junction",
                "Clean and rinse with distilled water",
                "Mount securely in a funnel support ring on a retort stand"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Filter Paper Seating",
                    "instruction": "Fold circular filter paper into quarters, open into a cone, place inside the funnel, and wet lightly with solvent to seal against the glass."
                },
                {
                    "step": 2,
                    "title": "Receiver Alignment",
                    "instruction": "Position a receiving beaker beneath the funnel so the beveled stem tip rests against the inside wall of the beaker."
                },
                {
                    "step": 3,
                    "title": "Pouring Mixture",
                    "instruction": "Pour the suspension down a glass stirring rod directed into the center of the paper cone, keeping the level below the paper edge."
                },
                {
                    "step": 4,
                    "title": "Washing the Cake",
                    "instruction": "Rinse remaining precipitate from the reaction vessel with a wash bottle and wash the filter cake with fresh solvent."
                }
            ],
            "handlingTips": [
                "Never fill liquid above the top edge of the filter paper, as precipitate will bypass the paper down the stem",
                "Keep the stem tip touching the receiving beaker wall to eliminate noisy, splashing drips"
            ],
            "shutdown": [
                "Remove and dispose of spent filter paper in designated chemical solid waste bins",
                "Rinse funnel immediately with solvent and laboratory detergent",
                "Invert on a drying rack"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical splash from overfilling", "Glass stem breakage", "Exposure to hazardous filtrates"],
            "warnings": [
                "Never use a standard glass funnel for vacuum filtration; implosion risk",
                "Do not force an oversized stem into a tight rubber stopper"
            ],
            "actionsToAvoid": [
                "Do not pour liquid higher than the upper rim of the filter paper",
                "Do not leave the funnel resting unsupported in a loose flask neck"
            ],
            "emergencyGuidance": [
                "If corrosive filtrate splashes onto hands, flush under running water for 15 minutes",
                "Dispose of broken funnel fragments in dedicated sharps bin"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wash with warm soapy water using a narrow funnel stem brush",
                "Rinse with running tap water to remove all traces of detergent",
                "Final rinse with deionized water and dry inverted"
            ],
            "storageInstructions": [
                "Store in designated funnel racks or drawer compartments lined with clean paper",
                "Avoid storing with stems hanging where they can be snapped by passing objects"
            ],
            "maintenanceChecks": [
                "Inspect the cone-stem junction for hairline cracks",
                "Check beveled tip for sharp chipped edges"
            ],
            "troubleshooting": [
                {
                    "problem": "Filtration rate is extremely slow or stops completely",
                    "possibleCauses": ["Filter paper pores clogged by gelatinous precipitate", "Air lock under filter paper", "Unfluted filter paper used"],
                    "solution": ["Use fluted (pleated) filter paper for faster flow, or switch to vacuum filtration if precipitate is fine"],
                    "prevention": ["Decant clear supernatant liquid through the filter before transferring heavy slurry"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Filtrate comes through cloudy or dirty",
                    "possibleCauses": ["Liquid poured over the top edge of the filter paper", "Tear or hole in the filter paper cone"],
                    "solution": ["Re-filter the cloudy filtrate through a new, undamaged filter paper cone"],
                    "prevention": ["Never fill the filter cone more than two-thirds full"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Liquid stem clogs when transferring dry powder",
                    "possibleCauses": ["Used a narrow liquid funnel instead of a wide-stem powder funnel"],
                    "solution": ["Gently dislodge solid using a thin wire or spatula, or rinse down with minimal solvent"],
                    "prevention": ["Always use a wide-bore powder funnel for dry solids"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Filling liquid above the upper edge of the filter paper",
                    "whyItMatters": "Unfiltered suspension flows over the paper edge directly into the stem, contaminating the filtrate",
                    "howToAvoid": "Always maintain the liquid level at least 5 mm below the top edge of the filter paper"
                },
                {
                    "mistake": "Leaving the funnel stem hanging in mid-air above the receiver",
                    "whyItMatters": "Falling drops splash corrosive liquid droplets and aerosols around the bench",
                    "howToAvoid": "Rest the beveled stem tip directly against the inner wall of the receiving beaker"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "filter-paper",
                "relationship": "complementary",
                "reason": "Filter paper is folded and seated inside the glass funnel to trap solid precipitates.",
                "difference": "The glass funnel provides the rigid conical support; the filter paper is the porous filtration medium."
            },
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Beakers receive the filtered liquid draining from the funnel stem.",
                "difference": "The funnel filters and directs the flow; the beaker collects and holds the filtrate."
            },
            {
                "equipmentId": "buchner-funnel",
                "relationship": "alternative",
                "reason": "Büchner funnels perform rapid vacuum filtration compared to slow gravity filtration.",
                "difference": "A glass funnel operates by gravity alone; a Büchner funnel uses vacuum suction."
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
                    "title": "ISO 4798 - Laboratory glassware: Filter funnels",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Funnel angle, stem dimensions, borosilicate glass specifications"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Filtration techniques, fluting paper, stem drainage rules"]
                }
            ]
        }
    },

    # 9. Glass Stirring Rod
    {
        "id": "glass-stirring-rod",
        "pdfNumber": 9,
        "pdfName": "Glass Stirring Rod",
        "pdfMainUse": "Stirring solutions",
        "pdfGroup": "Essential glassware and basics",
        "name": "Glass Stirring Rod",
        "category": "Glassware",
        "purpose": "Manually mixes solutions, aids solute dissolution, and guides liquid pouring.",
        "image": {
            "src": "assets/images/equipment/glass-stirring-rod.svg",
            "alt": "Solid borosilicate glass rod with flame-polished rounded ends and rubber policeman",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/glass-stirring-rod.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A slender solid cylinder of borosilicate glass with rounded, flame-polished ends. Used to manually mix solutions, accelerate solid dissolution, guide splash-free liquid transfers, and scrape precipitates from vessel walls.",
        "alternativeNames": ["Stirring rod", "Glass rod", "Policeman rod (when fitted with rubber blade)"],
        "commonUses": [
            "Manually mixing liquids and dissolving chemical solutes in beakers",
            "Guiding liquid flow along the rod during decanting to avoid dribbling",
            "Scraping precipitates from container walls when fitted with a rubber policeman",
            "Touching drops onto pH test strips or starch indicator paper"
        ],
        "types": [
            "Standard plain glass rod (both ends rounded and fire-polished)",
            "Policeman glass rod (one end equipped with a flexible rubber scraper shoe)",
            "Flat-headed stirring rod (one end flattened into a disc for crushing soft crystals)"
        ],
        "specifications": {
            "material": ["Solid borosilicate glass 3.3", "Rubber or silicone (policeman tip)"],
            "capacity": {
                "value": "Not applicable",
                "unit": "",
                "notes": "Solid glass rod; contains zero fluid capacity."
            },
            "dimensions": "Diameter 5 to 6 mm, Length 200 mm to 300 mm (standard size)",
            "mainParts": ["Flame-polished upper tip", "Solid cylindrical glass body", "Flame-polished lower rounded tip"],
            "partsAndFunctions": [
                {
                    "partName": "Flame-polished upper tip",
                    "function": "Smooth rounded end providing comfortable and safe fingertip grip",
                    "handlingNotes": "Inspect for sharp chipped edges."
                },
                {
                    "partName": "Solid cylindrical glass body",
                    "function": "Rigid chemical-resistant shaft for mechanical agitation and guiding liquid streams",
                    "handlingNotes": "Do not exert excessive bending force."
                },
                {
                    "partName": "Flame-polished lower rounded tip",
                    "function": "Stirs liquids smoothly without scratching or scoring the bottom of glass beakers",
                    "handlingNotes": "Never strike against thin beaker bases."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring physical manipulation tool."
            },
            "limitations": [
                "Brittle; snaps easily if bent or subjected to excessive lateral leverage",
                "Cannot perform automatic continuous stirring during prolonged reactions (use magnetic stirrer)",
                "Rubber policeman tip is degraded by hot concentrated acids and organic solvents"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect both rounded ends to ensure they are smooth and free of sharp chips",
                "Rinse with deionized water and wipe with a clean lint-free tissue before use",
                "Choose a rod length at least 5 cm longer than the height of the vessel"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Stirring Technique",
                    "instruction": "Hold the rod lightly near the top and rotate in smooth circular paths through the liquid without banging against beaker walls."
                },
                {
                    "step": 2,
                    "title": "Decanting and Pouring",
                    "instruction": "Place the rod vertically across the beaker spout and pour liquid along the rod to guide the stream smoothly into the receiver."
                },
                {
                    "step": 3,
                    "title": "Spot Testing",
                    "instruction": "Dip the clean glass tip into the test solution and touch lightly onto pH paper or watch glass to transfer a micro-drop."
                },
                {
                    "step": 4,
                    "title": "Scraping Residue",
                    "instruction": "Attach a rubber policeman to the tip to scrape clinging precipitate from beaker walls into the filter cone."
                }
            ],
            "handlingTips": [
                "Never leave a long stirring rod standing upright in an empty, lightweight beaker where it can cause the beaker to tip over",
                "Rest the rod on a clean watch glass between stirs to avoid bench contamination"
            ],
            "shutdown": [
                "Rinse rod with deionized water and wipe dry",
                "Wash with laboratory detergent if oily or contaminated with chemical solids",
                "Store flat in a drawer tray or upright in a designated rod holder"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Glass puncture injury if the rod snaps under hand pressure", "Scratching glassware leading to thermal rupture", "Cross-contamination"],
            "warnings": [
                "Never use a glass stirring rod as a pry bar or heavy crushing hammer",
                "Do not use rods with jagged or broken ends; fire-polish before use"
            ],
            "actionsToAvoid": [
                "Do not vigorously bang the rod against the bottom of thin-walled beakers",
                "Do not push a glass rod into rubber tubing or stoppers without lubrication"
            ],
            "emergencyGuidance": [
                "If a snapped rod punctures skin, do not twist; seek first aid immediately and wash wound",
                "Sweep broken glass fragments with a broom into the sharps container"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe clean with a damp sponge and laboratory detergent",
                "Rinse thoroughly with tap water, then deionized water",
                "Dry with a clean lint-free cloth or air dry on pegboard"
            ],
            "storageInstructions": [
                "Store horizontally in compartmentalized drawer trays lined with soft matting",
                "Keep away from bench edges where rolling off could cause breakage"
            ],
            "maintenanceChecks": [
                "Inspect ends for micro-chipping; if jagged, round the tip over a Bunsen flame (fire-polishing)",
                "Inspect rubber policeman for hardening, cracking, or chemical degradation"
            ],
            "troubleshooting": [
                {
                    "problem": "Rod tip is jagged and scratched the bottom of a beaker",
                    "possibleCauses": ["End was chipped and not fire-polished", "Struck hard against quartz or porcelain"],
                    "solution": ["Retire chipped rod or have instructor fire-polish the tip over a hot burner flame"],
                    "prevention": ["Always run your finger visually/gently across tips before using"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Liquid dribbles down the outside of the beaker during pouring",
                    "possibleCauses": ["Pouring too hesitantly without guiding rod"],
                    "solution": ["Hold the glass rod against the pouring spout so liquid follows surface tension down the rod directly into the receiver"],
                    "prevention": ["Use rod-guided pouring technique for all quantitative transfers"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Rubber policeman dissolves or contaminates organic reaction",
                    "possibleCauses": ["Used rubber policeman with incompatible organic solvents like acetone or dichloromethane"],
                    "solution": ["Discard contaminated mixture; use bare all-glass or PTFE scrapers for organic solvents"],
                    "prevention": ["Reserve rubber policemen for aqueous suspensions only"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Leaving a tall glass rod leaning inside a small, lightweight beaker",
                    "whyItMatters": "The high center of gravity easily causes the beaker to tip over, spilling chemicals across the bench",
                    "howToAvoid": "Lay the rod horizontally across a watch glass when not actively stirring"
                },
                {
                    "mistake": "Using a glass rod like a pestle to vigorously crush large, hard crystals in a beaker",
                    "whyItMatters": "Easily punches a hole through the bottom of the beaker or snaps the rod into the hand",
                    "howToAvoid": "Crush crystals in a ceramic mortar and pestle before transferring to glassware"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Beakers are the primary vessel in which glass rods are used for stirring and dissolving.",
                "difference": "The stirring rod is the agitation tool; the beaker is the containment vessel."
            },
            {
                "equipmentId": "magnetic-stirrer",
                "relationship": "alternative",
                "reason": "Magnetic stirrers provide automated continuous mixing without manual rod stirring.",
                "difference": "A glass rod requires manual stirring; a magnetic stirrer uses an automated motor and stir bar."
            },
            {
                "equipmentId": "watch-glass",
                "relationship": "complementary",
                "reason": "Provides a clean, inert surface to rest the stirring rod between operations.",
                "difference": "The watch glass is a dish surface; the rod is a manual stirring utensil."
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
                    "title": "ASTM E890 - Standard Specification for Laboratory Glass Stirring Rods",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Dimensions, glass specifications, fire-polishing requirements"]
                },
                {
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Safe handling of glass rods", "Preventing puncture wounds"]
                }
            ]
        }
    },

    # 10. Watch Glass
    {
        "id": "watch-glass",
        "pdfNumber": 10,
        "pdfName": "Watch Glass",
        "pdfMainUse": "Holding small samples and evaporation",
        "pdfGroup": "Essential glassware and basics",
        "name": "Watch Glass",
        "category": "Glassware",
        "purpose": "Holds small solid samples, covers beakers to reduce evaporation, and allows gentle solvent evaporation.",
        "image": {
            "src": "assets/images/equipment/watch-glass.svg",
            "alt": "Circular shallow concave borosilicate watch glass with ground smooth edge",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/watch-glass.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A circular, shallow concave glass dish resembling an oversized antique pocket-watch crystal. Multipurpose bench equipment used as a beaker cover, evaporation surface for small volatile droplets, and clean holding dish for weighing non-reactive solids.",
        "alternativeNames": ["Clock glass", "Evaporating glass"],
        "commonUses": [
            "Covering beakers during heating or standing to prevent dust entry and reduce evaporation",
            "Evaporating small drops of liquid to observe residue or crystal formation",
            "Holding solid reagents while weighing on a balance",
            "Resting wet stirring rods, droppers, or pH strips during experiments"
        ],
        "types": [
            "Standard circular watch glass (diameter 50 mm to 150 mm)",
            "Ribbed watch glass (features molded ridges on convex underside to allow vapor escape when covering beakers)",
            "PTFE watch glass (unbreakable, chemically inert for hydrofluoric acid handling)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "Soda-lime glass"],
            "capacity": {
                "value": "15 to 30",
                "unit": "mL",
                "notes": "Shallow concave curvature holds approx 15 to 30 mL liquid pool on a 100 mm diameter glass."
            },
            "dimensions": "Diameter ~100 mm (typical size), Curvature radius ~100 mm, Thickness ~2 mm",
            "mainParts": ["Ground rounded edge", "Shallow concave upper surface", "Smooth convex lower surface"],
            "partsAndFunctions": [
                {
                    "partName": "Ground rounded edge",
                    "function": "Provides safety against cutting fingers and prevents edge chipping",
                    "handlingNotes": "Inspect edge for razor-sharp chipped spots."
                },
                {
                    "partName": "Shallow concave upper surface",
                    "function": "Retains small liquid pools or crystal powders centrally without spreading off the edge",
                    "handlingNotes": "Place convex side down when resting on a balance or bench."
                },
                {
                    "partName": "Smooth convex lower surface",
                    "function": "When placed concave-side down over a beaker, directs condensing droplets back into the solution",
                    "handlingNotes": "Keep clean and dry when covering boiling solutions."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring shallow vessel."
            },
            "limitations": [
                "Shallow depth means it cannot hold more than 15-30 mL without spilling over edges",
                "Cannot be heated with a direct torch or open burner flame (thermal stress fractures)",
                "Soda-lime versions are susceptible to thermal shock"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the circular edge under light for sharp chips or cracks",
                "Clean thoroughly and dry with a lint-free tissue",
                "Ensure size selected is slightly larger than the diameter of the beaker being covered"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Beaker Covering",
                    "instruction": "Place the watch glass with its convex side facing down over the beaker mouth to condense vapors back into the vessel while allowing gas to escape via the spout."
                },
                {
                    "step": 2,
                    "title": "Solid Sample Holding",
                    "instruction": "Tare the watch glass on a top-pan balance, add the solid chemical with a spatula, and record the mass."
                },
                {
                    "step": 3,
                    "title": "Evaporation Testing",
                    "instruction": "Deposit 2 to 3 drops of solution onto the center of the watch glass and allow solvent to evaporate spontaneously at room temperature or over a steam bath."
                },
                {
                    "step": 4,
                    "title": "Removal and Inspection",
                    "instruction": "Lift watch glass carefully using crucible tongs or gloved fingers and examine remaining crystals over a dark or light background."
                }
            ],
            "handlingTips": [
                "When covering a boiling beaker, leave the pouring spout exposed to allow steam pressure release",
                "Do not heat directly on an electric hot plate surface; use an indirect water bath"
            ],
            "shutdown": [
                "Wash with laboratory detergent and warm water",
                "Rinse with tap water, followed by deionized water",
                "Dry vertically in a slotted rack or lay flat on a clean towel"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Thermal shock fracture if heated direct", "Chemical contact from overflowing liquid", "Edge chipping cuts"],
            "warnings": [
                "Never apply an open Bunsen burner flame directly to a watch glass",
                "Do not place a hot watch glass on a cold or wet countertop"
            ],
            "actionsToAvoid": [
                "Do not use as a primary evaporation dish for large volumes (use an evaporating dish)",
                "Do not seal a beaker completely air-tight while heating"
            ],
            "emergencyGuidance": [
                "If cracked glass cuts skin, wash with soap and water and apply sterile bandage",
                "Sweep broken fragments into designated glass bin"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Scrub gently with a sponge soaked in neutral laboratory detergent",
                "Rinse thoroughly with tap water to clear detergent residue",
                "Rinse with deionized water and air dry"
            ],
            "storageInstructions": [
                "Store flat in organized stacks cushioned with paper or in vertical slotted drying racks",
                "Group by diameter size in dedicated cabinet drawers"
            ],
            "maintenanceChecks": [
                "Inspect perimeter edge for chips and hairline cracks",
                "Check for chemical etching or permanent clouding"
            ],
            "troubleshooting": [
                {
                    "problem": "Watch glass shatters when placed over a heating beaker",
                    "possibleCauses": ["Used non-borosilicate soda-lime glass", "Steam built up with no vent", "Extreme thermal gradient"],
                    "solution": ["Turn off heat source, allow to cool, clean up fragments, and replace with a genuine borosilicate glass"],
                    "prevention": ["Always ensure the beaker spout remains unblocked to relieve steam pressure"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Liquid creeps over the edge during evaporation",
                    "possibleCauses": ["Added too much liquid for the shallow curvature depth"],
                    "solution": ["Limit volume on watch glasses to a few drops; use an evaporating dish for larger volumes"],
                    "prevention": ["Never fill liquid past one-third the concave dish depth"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "White film remains after drying",
                    "possibleCauses": ["Evaporated tap water salts or hard mineral deposits"],
                    "solution": ["Wipe with dilute 0.1 M HCl, followed by thorough rinse with deionized water"],
                    "prevention": ["Perform final rinse with deionized water"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Placing a watch glass directly onto an electric hot plate surface to evaporate liquid",
                    "whyItMatters": "The uneven heat across the thin, curved glass causes immediate thermal shock cracking",
                    "howToAvoid": "Evaporate over an indirect steam/water bath, or use a ceramic evaporating dish"
                },
                {
                    "mistake": "Completely sealing a heating beaker mouth so steam cannot escape",
                    "whyItMatters": "Pressure buildup can violently lift and shatter the watch glass or blast hot liquid out",
                    "howToAvoid": "Position the watch glass so the beaker pouring spout remains open as a steam vent"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Watch glasses are commonly placed over beakers to prevent dust contamination and reduce evaporation.",
                "difference": "The beaker is the reaction/mixing vessel; the watch glass is a shallow cover or sample plate."
            },
            {
                "equipmentId": "evaporating-dish",
                "relationship": "alternative",
                "reason": "Both are used for solvent evaporation, but evaporating dishes handle much larger volumes and direct heat.",
                "difference": "An evaporating dish is a deep ceramic bowl for bulk heating; a watch glass is shallow glass for micro-droplets."
            },
            {
                "equipmentId": "weighing-boat",
                "relationship": "alternative",
                "reason": "Both hold solids for mass determination on balances.",
                "difference": "A watch glass is reusable glass; a weighing boat is flexible disposable plastic with pouring corners."
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
                    "title": "ISO 4803 - Laboratory glassware: Watch glasses",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Dimensions, curvature, edge finish specifications"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Laboratory bench techniques, evaporation observations"]
                }
            ]
        }
    }
]

print(f"Items 4-10 loaded: {len(ITEMS_4_TO_10)}")
