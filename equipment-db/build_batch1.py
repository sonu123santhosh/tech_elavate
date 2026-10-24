# -*- coding: utf-8 -*-
"""
Generates Batch 1 (Items 1-20): Essential glassware and basics
Strictly adheres to PDF ground truth, schema rules, and high chemical accuracy.
"""

import json
import os

BATCH1_RECORDS = [
    # 1. Beaker
    {
        "id": "beaker",
        "pdfNumber": 1,
        "pdfName": "Beaker",
        "pdfMainUse": "Holding and mixing liquids",
        "pdfGroup": "Essential glassware and basics",
        "name": "Beaker",
        "category": "Glassware",
        "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
        "image": {
            "src": "assets/images/equipment/beaker.svg",
            "alt": "Borosilicate glass laboratory beaker with volume markings and pouring spout",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/beaker.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A flat-bottomed cylindrical glass container featuring a small pouring lip. Beakers are universal laboratory vessels used for dissolving solutes, collecting filtrates, holding reaction mixtures, and general liquid handling, though their printed graduation marks are only approximate.",
        "alternativeNames": ["Griffin beaker", "Low-form beaker", "Berzelius beaker"],
        "commonUses": [
            "Mixing reagents and dissolving solutes using a magnetic stirrer or glass rod",
            "Collecting liquid filtrates below gravity filtration funnels",
            "Heating non-volatile aqueous solutions over hot plates or wire gauze",
            "Holding ice-water baths for cooling smaller reaction flasks"
        ],
        "types": [
            "Griffin (low-form) standard beaker with height roughly 1.4 times diameter",
            "Berzelius (tall-form) beaker with slender body ideal for titrations",
            "Polypropylene beaker for non-heated corrosive fluoride preparations"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "Polypropylene (plastic variants)"],
            "capacity": {
                "value": "250",
                "unit": "mL",
                "notes": "Typical student bench size is 250 mL; standard commercial capacities range from 10 mL to 5000 mL."
            },
            "dimensions": "Diameter ~70 mm, Height ~95 mm (typical 250 mL Griffin beaker)",
            "mainParts": ["Pouring spout", "Cylindrical body", "Graduated volume markings", "Frosted marking area", "Flat base"],
            "partsAndFunctions": [
                {
                    "partName": "Pouring spout",
                    "function": "Directs liquid stream neatly into receiving vessels without dripping down the outer wall",
                    "handlingNotes": "Check for micro-chips before pouring to avoid directional spray."
                },
                {
                    "partName": "Graduated volume markings",
                    "function": "Provides a quick visual estimate of contained liquid volume",
                    "handlingNotes": "Never rely on these graduations for analytical quantitative titrations."
                },
                {
                    "partName": "Frosted marking area",
                    "function": "Enamel patch allowing pencil or lab marker labeling of contents",
                    "handlingNotes": "Erase or wipe clean with ethanol after use."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "%",
                "notes": "Approximate graduations only (nominal tolerance ±5% to ±10%); not a calibrated volumetric measuring instrument."
            },
            "limitations": [
                "Unsuitable for quantitative volumetric measurements (use volumetric flask or graduated cylinder)",
                "Open mouth allows rapid solvent evaporation and vapor escape if uncovered",
                "Subject to thermal shock cracking if chilled suddenly while hot"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the beaker rim, spout, and base under good light for chips or star fractures",
                "Verify cleanliness and rinse with distilled water if trace contaminants could compromise the reaction",
                "Ensure beaker volume is 1.5 to 2 times the liquid volume to prevent splashing during agitation"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Positioning",
                    "instruction": "Place the beaker firmly on a flat, stable, level lab bench or support surface."
                },
                {
                    "step": 2,
                    "title": "Liquid Addition",
                    "instruction": "Pour liquids down the inside wall or guide them with a glass stirring rod to avoid splashback."
                },
                {
                    "step": 3,
                    "title": "Agitation",
                    "instruction": "Stir contents smoothly using a glass stirring rod or magnetic stir bar without striking the bottom glass forcefully."
                },
                {
                    "step": 4,
                    "title": "Pouring",
                    "instruction": "Lift the beaker by its upper body (using heat-resistant gloves or beaker tongs if hot) and pour steadily from the spout."
                }
            ],
            "handlingTips": [
                "Never carry a full beaker solely by the rim with fingertips; support the side and base",
                "Cover with a clean watch glass when standing for extended periods to prevent dust ingress and solvent loss"
            ],
            "shutdown": [
                "Transfer residual solution to appropriate waste or storage containers",
                "Rinse thoroughly and wash according to the lab detergent protocol",
                "Invert on a drying rack or pegboard to air dry completely"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles with side shields", "Standard lab coat", "Nitrile gloves"],
            "hazards": ["Glass breakage lacerations", "Chemical splashes from vigorous mixing", "Thermal burns from heated liquids"],
            "warnings": [
                "Never heat an empty beaker dry on a hot burner or hot plate",
                "Do not use cracked or chipped beakers under any circumstances"
            ],
            "actionsToAvoid": [
                "Do not clamp a beaker tightly with a bare metal utility clamp around the middle",
                "Do not plunge a hot beaker into an ice bath or cold water"
            ],
            "emergencyGuidance": [
                "In case of broken glass, sweep up using a dustpan and broom; never use bare hands",
                "For chemical skin splashes, immediately flush the affected area with copious water for 15 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wash with warm water and laboratory-grade phosphate-free detergent using a soft sponge",
                "Rinse three times with tap water, followed by a final rinse with deionized or distilled water",
                "Air dry inverted on a pegboard or place in a glassware drying oven up to 100 °C"
            ],
            "storageInstructions": [
                "Store in a clean glassware cabinet or shelf grouped by volume size",
                "Avoid stacking heavy beakers inside each other unless cushioned with lint-free paper"
            ],
            "maintenanceChecks": [
                "Inspect before every laboratory session under good lighting for hairline cracks and rim chips",
                "Check that printed volume graduation lines remain legible"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid dribbles down the outside of the beaker during pouring",
                    "possibleCauses": ["Pouring too hesitantly", "Damaged or chipped pouring spout", "Surface tension bridging across rim"],
                    "solution": ["Pour with a swift, steady motion or hold a glass stirring rod vertically across the spout to direct flow"],
                    "prevention": ["Check spout integrity and practice pouring technique with water"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Persistent white residue on the inner wall",
                    "possibleCauses": ["Mineral salt precipitate from hard tap water", "Insoluble metal hydroxide scale"],
                    "solution": ["Soak with dilute (0.1 M) hydrochloric acid or lab glass cleaner, then rinse thoroughly with DI water"],
                    "prevention": ["Always perform a final rinse with distilled or deionized water"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Visible crack develops while heating",
                    "possibleCauses": ["Pre-existing mechanical flaw", "Uneven heat distribution from direct flame contact"],
                    "solution": ["Immediately cut heat source, inform lab partners to step back, allow cooling, and treat vessel contents as waste"],
                    "prevention": ["Always use a ceramic-centered wire gauze when heating over an open flame"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Using beaker volume markings to measure quantitative analytical solutions",
                    "whyItMatters": "Beaker graduation tolerances (±5% to ±10%) introduce massive systematic experimental errors",
                    "howToAvoid": "Use a graduated cylinder, volumetric pipette, or volumetric flask for quantitative measurement"
                },
                {
                    "mistake": "Picking up a hot beaker bare-handed or with thin nitrile gloves",
                    "whyItMatters": "Causes severe thermal burns and involuntary dropping of boiling chemicals",
                    "howToAvoid": "Always use dedicated insulated beaker tongs or heat-resistant silicone grips"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "conical-flask",
                "relationship": "alternative",
                "reason": "Both are standard bench reaction vessels, but conical flasks reduce splash risk during swirling.",
                "difference": "A beaker has straight vertical walls and an open mouth; a conical flask tapers inward to facilitate vigorous swirling."
            },
            {
                "equipmentId": "measuring-cylinder",
                "relationship": "complementary",
                "reason": "Used when liquid volumes need to be measured before transferring into the beaker.",
                "difference": "A measuring cylinder has calibrated precision graduations (typically ±1%), whereas a beaker offers only rough volume estimates."
            },
            {
                "equipmentId": "glass-stirring-rod",
                "relationship": "complementary",
                "reason": "Used directly inside beakers to mix solutions and dissolve reagents safely.",
                "difference": "The stirring rod is a solid glass rod for agitation, whereas the beaker is the containment vessel."
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
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["General glassware usage", "Laboratory heating safety"]
                },
                {
                    "title": "ASTM E960 - Standard Specification for Laboratory Glass Beakers",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Dimensions, Griffin vs Berzelius forms, capacity tolerances"]
                }
            ]
        }
    },

    # 2. Test Tube
    {
        "id": "test-tube",
        "pdfNumber": 2,
        "pdfName": "Test Tube",
        "pdfMainUse": "Small-scale chemical reactions",
        "pdfGroup": "Essential glassware and basics",
        "name": "Test Tube",
        "category": "Glassware",
        "purpose": "Holds small chemical samples for qualitative testing, color observations, and heating.",
        "image": {
            "src": "assets/images/equipment/test-tube.svg",
            "alt": "Borosilicate glass test tube with rounded base and flared rim",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/test-tube.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A narrow, open-mouthed glass tube with a hemispherical closed bottom. Test tubes are standard for qualitative analytical chemistry, small-scale screening reactions, precipitation tests, and testing volatile gas evolution.",
        "alternativeNames": ["Culture tube", "Boiling tube", "Sample tube"],
        "commonUses": [
            "Performing qualitative spot tests, precipitation reactions, and colorimetric observations",
            "Gently heating small liquid volumes over a micro-burner flame or in a water bath",
            "Collecting small fractions during chromatographic separations",
            "Mixing miniature reaction volumes using a vortex mixer"
        ],
        "types": [
            "Standard test tube (typically 16 × 150 mm, borosilicate glass for heat resistance)",
            "Boiling tube (wider 25 × 150 mm for vigorous boiling with reduced bumping)",
            "Culture tube (rimless or screw-top for biological and clinical sampling)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "Soda-lime glass (disposable non-heat versions)"],
            "capacity": {
                "value": "20 to 30",
                "unit": "mL",
                "notes": "Standard 16 × 150 mm test tube holds ~25 mL nominal total capacity."
            },
            "dimensions": "Outer diameter 16 mm, Length 150 mm (standard size)",
            "mainParts": ["Flared lip / rim", "Cylindrical body", "Hemispherical rounded base"],
            "partsAndFunctions": [
                {
                    "partName": "Flared lip / rim",
                    "function": "Reinforces tube opening against chipping and facilitates neat pouring and stopper seating",
                    "handlingNotes": "Check rim for chips before pressing stoppers into place."
                },
                {
                    "partName": "Cylindrical body",
                    "function": "Allows unhindered optical inspection of precipitates, colors, and phase boundaries",
                    "handlingNotes": "Keep exterior free from greasy fingerprints during optical inspection."
                },
                {
                    "partName": "Hemispherical rounded base",
                    "function": "Prevents stress concentration and eliminates corners where solids could lodge",
                    "handlingNotes": "Cannot stand independently; must be kept in a test tube rack."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: uncalibrated reaction vessel without volume markings."
            },
            "limitations": [
                "Cannot stand upright on bench surfaces without a test tube rack",
                "Narrow diameter creates high risk of sudden boiling liquid eruption (bumping) if heated static",
                "Soda-lime disposable variants will shatter if exposed to direct flame"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Verify the tube is borosilicate glass if heat will be applied",
                "Inspect the tube walls and bottom for cracks or star scratches",
                "Rest tubes in a stable test tube rack before dispensing reagents"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Loading Reagents",
                    "instruction": "Add reagents with a dropper or pipette, filling to at most one-third total height."
                },
                {
                    "step": 2,
                    "title": "Mixing",
                    "instruction": "Gently tap the lower side of the tube with your forefinger to induce a swirling vortex. Never invert with your thumb over the mouth."
                },
                {
                    "step": 3,
                    "title": "Heating",
                    "instruction": "Clamp the upper third with a test tube holder, angle the tube at 45 degrees, and move continuously through the outer burner flame."
                },
                {
                    "step": 4,
                    "title": "Cooling",
                    "instruction": "Place heated tube into a heat-tolerant rack to cool down gradually to ambient temperature."
                }
            ],
            "handlingTips": [
                "Always aim the mouth of the test tube into an unoccupied space or toward the back of the fume hood",
                "Never fill more than one-third capacity if heating or boiling"
            ],
            "shutdown": [
                "Empty liquid contents into designated chemical waste receptacles",
                "Clean using a test tube brush and laboratory detergent",
                "Invert on a drying rack pegboard to drain completely"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Violent ejection of boiling liquid (bumping)", "Glass shattering from thermal shock", "Chemical skin burns"],
            "warnings": [
                "Never point a test tube opening toward yourself or other people",
                "Never heat a stoppered or sealed test tube"
            ],
            "actionsToAvoid": [
                "Do not hold a test tube in your bare fingers while heating in a flame",
                "Do not shake a test tube vertically while holding your bare finger or thumb over the open lip"
            ],
            "emergencyGuidance": [
                "If hot reagent splashes onto skin, flush continuously with water for 15 minutes",
                "Sweep up broken glass with a dustpan and brush; discard in dedicated broken glass bin"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Insert a narrow test tube brush wetted with detergent water",
                "Scrub interior walls gently without forcing the metal wire tip against the bottom dome",
                "Rinse thoroughly with tap water, followed by a distilled water rinse"
            ],
            "storageInstructions": [
                "Store inverted in test tube racks or clean storage drawers separated by size",
                "Keep away from bench edges where accidental arm movements can knock them over"
            ],
            "maintenanceChecks": [
                "Check for star cracks in the rounded base under bright backlight",
                "Discard tubes with etched or permanently frosted interior surfaces"
            ],
            "troubleshooting": [
                {
                    "problem": "Contents suddenly erupt or splash out when heated (bumping)",
                    "possibleCauses": ["Heated too intensely in one spot", "Tube filled beyond one-third capacity", "Lack of fluid convection"],
                    "solution": ["Immediately remove tube from flame, let calm, and wave tube continuously across flame when re-heating"],
                    "prevention": ["Keep tube moving constantly in the flame and maintain volume under one-third"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Precipitate sticks firmly to the rounded bottom",
                    "possibleCauses": ["Chemical precipitate dried out", "Brush bristles cannot reach deep corners"],
                    "solution": ["Soak with 1 mL of 1 M nitric or hydrochloric acid for 10 minutes, then scrub with a radial-tuft brush"],
                    "prevention": ["Wash test tubes immediately following precipitation tests before residues dry"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Tube cracks immediately when placed in flame",
                    "possibleCauses": ["Used disposable soda-lime glass instead of borosilicate", "Pre-existing micro-fracture"],
                    "solution": ["Turn off burner, let cool, neutralize/absorb any spill, and sweep broken glass into sharps bin"],
                    "prevention": ["Check manufacturer borosilicate mark before heating"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Heating a test tube while pointing its mouth directly at a lab partner",
                    "whyItMatters": "Thermal bumping can fire scalding corrosive chemical projectiles into someone's face or eyes",
                    "howToAvoid": "Angle tube at 45° pointing toward an empty wall or into the fume hood exhaust"
                },
                {
                    "mistake": "Placing a red-hot test tube directly on a wet cold countertop",
                    "whyItMatters": "Rapid localized cooling creates severe thermal shock that shatters the base",
                    "howToAvoid": "Place heated tubes exclusively in a heat-resistant metal or wooden test tube rack to cool"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "test-tube-rack",
                "relationship": "complementary",
                "reason": "Test tubes have rounded bases and require a rack to stand upright safely.",
                "difference": "The test tube is the reaction vessel; the rack is the static organizational support."
            },
            {
                "equipmentId": "test-tube-holder",
                "relationship": "complementary",
                "reason": "Used to hold the test tube securely while passing it through a burner flame.",
                "difference": "The holder is a spring-loaded clamp; the test tube is the glassware holding the liquid."
            },
            {
                "equipmentId": "test-tube-brush",
                "relationship": "complementary",
                "reason": "Specially shaped brush that cleans inside the narrow diameter and rounded base.",
                "difference": "The brush is a dedicated maintenance tool for cleaning test tubes."
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
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Safe heating techniques", "Small-scale reaction handling"]
                },
                {
                    "title": "ISO 4142 - Laboratory Glassware: Test Tubes",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Standard nominal dimensions", "Borosilicate thermal standards"]
                }
            ]
        }
    },

    # 3. Measuring Cylinder
    {
        "id": "measuring-cylinder",
        "pdfNumber": 3,
        "pdfName": "Measuring Cylinder",
        "pdfMainUse": "Measuring liquid volume",
        "pdfGroup": "Essential glassware and basics",
        "name": "Measuring Cylinder",
        "category": "Glassware",
        "purpose": "Measures liquid volumes with moderate accuracy for routine laboratory preparations.",
        "image": {
            "src": "assets/images/equipment/measuring-cylinder.svg",
            "alt": "Graduated glass measuring cylinder with hexagonal base and pouring spout",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/measuring-cylinder.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A tall, narrow cylindrical glass or plastic vessel calibrated with volumetric graduations along its vertical height. Graduated cylinders deliver general chemical volumes much more accurately than beakers or flasks, though with less precision than volumetric pipettes.",
        "alternativeNames": ["Graduated cylinder", "Graduate cylinder"],
        "commonUses": [
            "Measuring liquid reagents and solvents for synthetic preparations",
            "Dispensing buffer volumes, dilution water, and washing mixtures",
            "Measuring liquid density in combination with a balance (mass/volume)",
            "Determining solid volume displacement"
        ],
        "types": [
            "Class A calibrated measuring cylinder (high-precision borosilicate glass)",
            "Class B general student laboratory cylinder (standard tolerance)",
            "Polypropylene or PMP cylinder (unbreakable, chemical-resistant, flat meniscus)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "Polypropylene (plastic variants)"],
            "capacity": {
                "value": "100",
                "unit": "mL",
                "notes": "100 mL is the most common bench size; capacities range from 5 mL to 2000 mL."
            },
            "dimensions": "Inner diameter ~28 mm, Height ~250 mm (typical 100 mL glass cylinder)",
            "mainParts": ["Pouring spout", "Graduated vertical wall", "Bumper guard ring", "Hexagonal base"],
            "partsAndFunctions": [
                {
                    "partName": "Pouring spout",
                    "function": "Enables controlled transfer of measured liquid into target vessels",
                    "handlingNotes": "Pour slowly to prevent liquid clinging to the outer spout."
                },
                {
                    "partName": "Graduated vertical wall",
                    "function": "Displays volume graduations calibrated 'to contain' (In/TC) or 'to deliver' (Ex/TD) at 20 °C",
                    "handlingNotes": "Align eyesight perpendicular to the graduation line when reading the meniscus."
                },
                {
                    "partName": "Bumper guard ring",
                    "function": "Polyethylene collar placed near the top that absorbs impact if the cylinder tips over",
                    "handlingNotes": "Keep guard positioned near the top rim, never slid down to the base."
                },
                {
                    "partName": "Hexagonal base",
                    "function": "Provides a wide, stable footprint and prevents the cylinder from rolling on the bench",
                    "handlingNotes": "Keep the base flat and free from chemical spills."
                }
            ],
            "measurementAccuracy": {
                "value": 0.5,
                "unit": "mL",
                "notes": "Typical Class A 100 mL cylinder has a tolerance of ±0.5 mL; Class B tolerance is typically ±1.0 mL."
            },
            "limitations": [
                "Accuracy is moderate (±0.5% to ±1%); not suitable for primary analytical standards or quantitative microtitrations",
                "Must never be heated directly with a flame or placed on a hot plate as thermal expansion ruins calibration",
                "High center of gravity makes it prone to tipping over if bumped"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Select a cylinder size closest to the volume being measured (e.g., use a 50 mL cylinder for 35 mL)",
                "Check that the plastic bumper ring is positioned near the top of the neck",
                "Place on a level, vibration-free laboratory bench"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Rough Pouring",
                    "instruction": "Pour liquid steadily into the cylinder until the level is within a few milliliters below target."
                },
                {
                    "step": 2,
                    "title": "Fine Adjustment",
                    "instruction": "Use a Pasteur dropper or wash bottle to add the final drops until the bottom of the meniscus touches the line."
                },
                {
                    "step": 3,
                    "title": "Reading the Meniscus",
                    "instruction": "Lower your head so your eyes are directly horizontal with the calibration line to eliminate parallax error."
                },
                {
                    "step": 4,
                    "title": "Dispensing",
                    "instruction": "Pour the liquid into the target container, holding the cylinder inverted for ~15 seconds to allow full drainage."
                }
            ],
            "handlingTips": [
                "For clear aqueous liquids, read the bottom of the curved meniscus; for dark opaque liquids, read the top edge",
                "Never hold the cylinder suspended in mid-air by hand while taking a reading"
            ],
            "shutdown": [
                "Rinse immediately with deionized water after transferring chemical reagents",
                "Wash with mild detergent, avoiding abrasive brushes that scratch calibration marks",
                "Invert on a cylinder rack or store upright in a designated cupboard"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Glass breakage from tipping", "Chemical splash when pouring", "Chemical exposure from neck overflow"],
            "warnings": [
                "Never heat liquids directly inside a measuring cylinder",
                "Do not dissolve solid solutes inside a measuring cylinder with a glass rod"
            ],
            "actionsToAvoid": [
                "Do not leave the plastic safety bumper at the bottom of the cylinder",
                "Do not autoclave calibrated volumetric glassware unless specified by manufacturer"
            ],
            "emergencyGuidance": [
                "If a cylinder topples and shatters, contain the chemical spill with absorbent pads immediately",
                "Dispose of broken glass fragments using a broom and dustpan into the sharps bin"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wash with non-abrasive detergent and a soft sponge brush",
                "Rinse three times with deionized water",
                "Allow to air-dry at room temperature; do not heat dry in high-temperature ovens"
            ],
            "storageInstructions": [
                "Store upright in a clean storage cabinet away from edge aisles",
                "Ensure the plastic shock ring remains installed near the top rim"
            ],
            "maintenanceChecks": [
                "Inspect graduation markings for wear or fading",
                "Verify that the hexagonal base sits completely flat without wobbling"
            ],
            "troubleshooting": [
                {
                    "problem": "Water droplets cling irregularly to the inner glass wall above the meniscus",
                    "possibleCauses": ["Grease, oil, or organic residue contaminating the glass surface"],
                    "solution": ["Clean thoroughly with an alkaline laboratory glassware detergent or ethanol, followed by extensive DI water rinse"],
                    "prevention": ["Clean and rinse cylinders immediately after each use"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Different operators report significantly differing volume readings",
                    "possibleCauses": ["Parallax error caused by viewing from above or below eye level", "Reading top instead of bottom of meniscus"],
                    "solution": ["Position eye level strictly horizontal with the calibration ring line and read the lowest point of the concave meniscus"],
                    "prevention": ["Train students using colored water solutions against a white background card"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "The cylinder wobbles dangerously when placed on the bench",
                    "possibleCauses": ["Hexagonal base is warped or chipped", "Bench surface is uneven or contains debris"],
                    "solution": ["Wipe bench clean; if the glass base is uneven or chipped, retire cylinder from active service"],
                    "prevention": ["Do not bang cylinder base down on hard stone benchtops"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Reading the liquid level while holding the cylinder in your hand above the bench",
                    "whyItMatters": "Hand tremors and tilted orientation introduce substantial volume reading errors",
                    "howToAvoid": "Always place the cylinder on a flat, level bench surface before reading the meniscus"
                },
                {
                    "mistake": "Preparing a chemical solution by dissolving solid powders directly inside the cylinder",
                    "whyItMatters": "Vigorous stirring with a glass rod easily fractures the narrow cylinder wall, and heat of dissolution alters calibration",
                    "howToAvoid": "Dissolve solids in a beaker first, then transfer into volumetric equipment"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Liquids measured in the cylinder are frequently transferred into beakers for reaction.",
                "difference": "Cylinders have narrow calibrated walls for accurate volume measurement; beakers have wide walls for mixing."
            },
            {
                "equipmentId": "pipette",
                "relationship": "alternative",
                "reason": "Both transfer liquid volumes, but pipettes provide superior analytical accuracy.",
                "difference": "Pipettes deliver fixed precision aliquots (±0.1%); measuring cylinders measure general variable volumes (±1%)."
            },
            {
                "equipmentId": "dropper",
                "relationship": "complementary",
                "reason": "Used to add the final drops of liquid to bring the meniscus precisely to the calibration line.",
                "difference": "The dropper is a dispensing tool for fine adjustments; the cylinder is the measurement vessel."
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
                    "title": "ISO 4788 - Laboratory glassware: Graduated measuring cylinders",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Volumetric capacity tolerances", "Class A and B specifications"]
                },
                {
                    "title": "NIST Handbook 105-2: Specifications and Tolerances for Field Standard Glassware",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Metrology Standard",
                    "supports": ["Meniscus reading principles", "Temperature calibration norms"]
                }
            ]
        }
    }
]

print(f"Loaded {len(BATCH1_RECORDS)} items into Batch 1 seed generator.")
