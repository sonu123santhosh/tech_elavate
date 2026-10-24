# -*- coding: utf-8 -*-
"""
Batch 1 Items 11-20:
11. reagent-bottle
12. dropper
13. wash-bottle
14. test-tube-rack
15. test-tube-holder
16. spatula
17. mortar-and-pestle
18. weighing-boat
19. filter-paper
20. evaporating-dish
"""

ITEMS_11_TO_20 = [
    # 11. Reagent Bottle
    {
        "id": "reagent-bottle",
        "pdfNumber": 11,
        "pdfName": "Reagent Bottle",
        "pdfMainUse": "Storing chemical reagents",
        "pdfGroup": "Essential glassware and basics",
        "name": "Reagent Bottle",
        "category": "Glassware",
        "purpose": "Stores liquid or solid chemical reagents safely with a protective ground stopper or screw cap.",
        "image": {
            "src": "assets/images/equipment/reagent-bottle.svg",
            "alt": "Amber glass reagent storage bottle with ground glass stopper and GHS hazard label",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/reagent-bottle.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A heavy-walled glass or plastic storage container featuring a ground-glass stopper or chemical-resistant screw cap. Designed for long-term containment, preservation, and bench dispensing of liquid reagents, stock acids, alkalis, and solid salts.",
        "alternativeNames": ["Media bottle", "Chemical storage bottle", "Boston round bottle"],
        "commonUses": [
            "Storing laboratory standard solutions, acids, and bases on reagent shelves",
            "Protecting light-sensitive chemicals from photochemical breakdown using amber glass",
            "Dispensing daily working volumes of chemical indicators and testing reagents",
            "Holding prepared media and buffers safely in cold storage"
        ],
        "types": [
            "Clear borosilicate reagent bottle (for non-photosensitive reagents)",
            "Amber (actinic) reagent bottle (filters UV/blue light to protect sensitive reagents like silver nitrate)",
            "Narrow-mouth bottle (for liquids, prevents accidental excessive pouring)",
            "Wide-mouth bottle (for solid salts, powders, and viscous materials)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "Soda-lime glass", "High-density polyethylene (HDPE)"],
            "capacity": {
                "value": "250 to 500",
                "unit": "mL",
                "notes": "Common bench sizes are 250 mL and 500 mL; range from 50 mL to 2000 mL."
            },
            "dimensions": "Diameter ~80 mm, Height ~170 mm (typical 500 mL bottle)",
            "mainParts": ["Ground glass stopper / polypropylene screw cap", "Narrow/wide neck socket", "Thick cylindrical bottle body", "Heavy base", "Chemical label area"],
            "partsAndFunctions": [
                {
                    "partName": "Ground glass stopper / screw cap",
                    "function": "Provides an airtight, leak-resistant seal preventing vapor escape and environmental contamination",
                    "handlingNotes": "Never place a stopper directly on a benchtop; rest it inverted on its flat head."
                },
                {
                    "partName": "Narrow/wide neck socket",
                    "function": "Ground internally to match standard taper stopper dimensions",
                    "handlingNotes": "Wipe neck rim before closing to prevent crystallized solids from binding the joint."
                },
                {
                    "partName": "Thick cylindrical bottle body",
                    "function": "Robust walls resist accidental bench impacts and withstand chemical corrosion",
                    "handlingNotes": "Always support with two hands when carrying."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: storage container, uncalibrated for precise volumetric measurement."
            },
            "limitations": [
                "Ground-glass stoppers easily fuse (freeze) shut if used with concentrated hydroxide (alkali) solutions",
                "Not designed for direct heating over flames or hot plates",
                "Glass bottles pose breakage and chemical spill hazards if dropped"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect bottle body and neck for chips, hairline cracks, or label degradation",
                "Read chemical label, concentration, preparation date, and GHS hazard pictograms before opening",
                "Wear recommended chemical-resistant gloves"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Label Alignment",
                    "instruction": "Pick up the bottle holding the label in the palm of your hand so any drips run down the opposite side, keeping the label legible."
                },
                {
                    "step": 2,
                    "title": "Stopper Removal",
                    "instruction": "Grasp the stopper between your little finger and palm of your pouring hand, or place it inverted (flat top down) on a clean watch glass. Never place the stopper ground-side down on the bench."
                },
                {
                    "step": 3,
                    "title": "Pouring",
                    "instruction": "Tilt the bottle smoothly and pour the needed amount into a secondary beaker. Never return excess unused reagent back into the stock bottle."
                },
                {
                    "step": 4,
                    "title": "Closing and Storage",
                    "instruction": "Wipe the neck with a damp paper towel if any droplet clings, replace the stopper firmly, and return the bottle to its designated shelf."
                }
            ],
            "handlingTips": [
                "Always pour with the label facing upward or shielded in your palm to prevent corrosive chemical drip damage to label text",
                "Never insert droppers or spatulas directly into stock reagent bottles; pour an aliquot into a small beaker first"
            ],
            "shutdown": [
                "Confirm cap or stopper is properly sealed before releasing grip",
                "Wipe outer surface if any chemical drips occurred",
                "Return bottle to appropriate hazard-classified storage cabinet (e.g. acid cabinet, flammables cabinet)"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Face shield (when handling concentrated acids)"],
            "hazards": ["Chemical vapors escaping from unsealed bottles", "Glass breakage spills", "Corrosive skin/eye damage"],
            "warnings": [
                "Never store concentrated sodium or potassium hydroxide in ground-glass stoppered bottles (joint will freeze permanently)",
                "Never store incompatible chemicals together (e.g., concentrated acids with organic solvents)"
            ],
            "actionsToAvoid": [
                "Do not carry multiple glass bottles by their necks with fingers; use a dedicated bottle carrier bucket",
                "Do not pour unused chemicals back into the stock reagent bottle (cross-contamination hazard)"
            ],
            "emergencyGuidance": [
                "If a reagent bottle shatters on the floor, alert others, evacuate the immediate perimeter, and deploy spill control kit",
                "In case of chemical skin contact, flush under emergency shower or sink for at least 15 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Neutralize and discard residual reagent into proper waste disposal container",
                "Rinse multiple times with compatible neutralizing solvent, then warm detergent water",
                "Perform four water rinses, finish with deionized water, and dry inverted"
            ],
            "storageInstructions": [
                "Store in designated chemical storage cabinets categorized by hazard class (acids, bases, oxidizers, solvents)",
                "Insert a strip of clean paper between ground glass stopper and neck socket if stored empty to prevent joint jamming"
            ],
            "maintenanceChecks": [
                "Inspect chemical labels annually for fading, lifting, or illegibility; replace promptly",
                "Check for white carbonate crusting around stopper necks indicating atmospheric CO2 infiltration"
            ],
            "troubleshooting": [
                {
                    "problem": "The ground glass stopper is frozen and cannot be removed by hand",
                    "possibleCauses": ["Alkaline hydroxide solution etched glass", "Salt crystallized inside joint"],
                    "solution": ["Soak the neck in warm water, tap gently with a wooden block, or use a commercial stopper puller; ask supervisor"],
                    "prevention": ["Use polyethylene or Teflon stoppers for alkaline solutions; wipe joints before sealing"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Reagent bottle label is stained and illegible",
                    "possibleCauses": ["Chemical dribbled down front during pouring because label was not held in palm"],
                    "solution": ["Report unknown bottle to supervisor for testing or safe disposal; re-label verified contents immediately"],
                    "prevention": ["Always pour with the label held in the palm of your hand"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "White precipitate forms in a clear stock solution",
                    "possibleCauses": ["Contamination from non-sterile tools introduced into the bottle", "Atmospheric CO2 reaction"],
                    "solution": ["Discard contaminated solution into chemical waste; clean and refill bottle with fresh reagent"],
                    "prevention": ["Never insert pipettes or spatulas directly into the stock bottle"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Placing the bottle stopper ground-side down on the benchtop",
                    "whyItMatters": "Picks up bench dust and contaminants that enter the bottle, ruining the entire chemical supply",
                    "howToAvoid": "Hold stopper between fingers or rest it inverted (flat top down) on a clean surface"
                },
                {
                    "mistake": "Pouring excess unreacted chemical back into the stock reagent bottle",
                    "whyItMatters": "Contaminates the entire stock batch, causing future experimental failures across the whole lab",
                    "howToAvoid": "Estimate quantities conservatively and discard excess chemical into assigned waste"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Reagents are poured from the storage bottle into beakers for bench use.",
                "difference": "The reagent bottle is a long-term sealed storage container; the beaker is an open working vessel."
            },
            {
                "equipmentId": "glass-funnel",
                "relationship": "complementary",
                "reason": "Used to pour solutions cleanly into narrow-neck reagent bottles without spilling.",
                "difference": "The funnel is a pouring guide; the reagent bottle is the containment vessel."
            },
            {
                "equipmentId": "dropper",
                "relationship": "complementary",
                "reason": "Used to extract small aliquots from an intermediate beaker poured from the reagent bottle.",
                "difference": "The dropper dispenses dropwise amounts; the reagent bottle stores bulk solution."
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
                    "title": "ISO 4796-1 - Laboratory glassware: Bottles (Screw-neck and ground-neck)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Bottle dimensions, glass durability, closure specifications"]
                },
                {
                    "title": "Prudent Practices in the Laboratory: Handling and Management of Chemical Hazards",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Chemical storage standards, bottle handling protocols"]
                }
            ]
        }
    },

    # 12. Dropper
    {
        "id": "dropper",
        "pdfNumber": 12,
        "pdfName": "Dropper",
        "pdfMainUse": "Adding liquids drop by drop",
        "pdfGroup": "Essential glassware and basics",
        "name": "Dropper",
        "category": "Basic Tools and Consumables",
        "purpose": "Adds or transfers small liquid quantities drop by drop for tests, indicators, and fine volume adjustments.",
        "image": {
            "src": "assets/images/equipment/dropper.svg",
            "alt": "Glass Pasteur pipette with flexible rubber bulb and tapered dispensing tip",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/dropper.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A glass or plastic tube with a narrow dispensing orifice at one end and a squeezable rubber bulb at the other. Used to dispense indicators, transfer small liquid aliquots, and bring liquid menisci to calibration marks dropwise.",
        "alternativeNames": ["Pasteur pipette", "Eye dropper", "Medicine dropper", "Transfer bulb pipette"],
        "commonUses": [
            "Adding chemical indicator solutions (e.g. phenolphthalein) to titration flasks dropwise",
            "Final meniscus adjustment in volumetric flasks and graduated cylinders",
            "Dispensing qualitative reagents in spot tests and microscale reactions",
            "Removing supernatants above settled precipitates without disturbing solid pellet"
        ],
        "types": [
            "Glass Pasteur dropper with removable natural rubber or silicone bulb",
            "One-piece disposable plastic (polyethylene) transfer pipette (integrated bulb)",
            "Dropping bottle assembly (glass dropper built directly into bottle screw cap)"
        ],
        "specifications": {
            "material": ["Soda-lime or borosilicate glass tube", "Natural rubber or silicone bulb", "Polyethylene (disposable plastic types)"],
            "capacity": {
                "value": "1 to 3",
                "unit": "mL",
                "notes": "Standard bulb displaces ~1 mL to 2 mL; typical single drop volume is approx 0.05 mL (20 drops/mL water)."
            },
            "dimensions": "Tube length ~150 mm to 230 mm, Tip outer diameter ~1.5 mm, Bulb diameter ~15 mm",
            "mainParts": ["Flexible elastomeric bulb", "Upper glass barrel", "Tapered capillary delivery tip"],
            "partsAndFunctions": [
                {
                    "partName": "Flexible elastomeric bulb",
                    "function": "Generates suction when released to draw liquid, and pressure when squeezed to expel drops",
                    "handlingNotes": "Squeeze before submerging tip; do not let liquid enter bulb."
                },
                {
                    "partName": "Upper glass barrel",
                    "function": "Transparent tube holding liquid and allowing visual monitoring of bubble-free fill",
                    "handlingNotes": "Keep vertical during transfer."
                },
                {
                    "partName": "Tapered capillary delivery tip",
                    "function": "Constricts fluid flow to generate uniform individual liquid droplets (~0.05 mL)",
                    "handlingNotes": "Inspect tip for chips or jagged glass edges."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: uncalibrated qualitative drop delivery tool (approx 0.04-0.05 mL per drop depending on surface tension)."
            },
            "limitations": [
                "Not a calibrated measuring instrument; drop volume varies with viscosity, temperature, and surface tension",
                "Holding dropper inverted allows corrosive chemicals to enter and destroy the rubber bulb",
                "Glass capillary tip breaks easily if pressed against hard surfaces"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect glass tube for cracks and ensure bulb is securely seated on the upper lip",
                "Ensure bulb is clean and free from dried chemical powder from previous misuse",
                "Have receiving vessel positioned within arm's reach"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Air Expulsion",
                    "instruction": "Squeeze the rubber bulb between thumb and forefinger BEFORE inserting the tip into the liquid."
                },
                {
                    "step": 2,
                    "title": "Aspiration",
                    "instruction": "Immerse tip 1 cm below the liquid surface and slowly release bulb compression to draw liquid smoothly into the glass barrel."
                },
                {
                    "step": 3,
                    "title": "Vertical Transfer",
                    "instruction": "Lift the dropper, holding it strictly vertical. Never tilt horizontal or invert upside down."
                },
                {
                    "step": 4,
                    "title": "Dropwise Dispensing",
                    "instruction": "Position tip directly above the receiving container (without touching receiver walls) and gently squeeze bulb to release drops one by one."
                }
            ],
            "handlingTips": [
                "Hold the dropper vertically; holding it at an angle alters drop size and increases risk of fluid entering the rubber bulb",
                "Count drops steadily while observing the solution reaction"
            ],
            "shutdown": [
                "Eject any remaining reagent into the appropriate waste container",
                "Disassemble rubber bulb, rinse glass barrel thoroughly with deionized water, and dry",
                "Discard single-use plastic droppers into designated chemical waste"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical splash from over-squeezing", "Glass tip breakage puncture", "Rubber bulb degradation by organic solvents"],
            "warnings": [
                "Never invert a dropper with liquid inside; corrosive liquids will attack the rubber bulb and contaminate future uses",
                "Do not use cracked or chipped glass droppers"
            ],
            "actionsToAvoid": [
                "Do not touch the dropper tip to the receiver liquid surface (causes cross-contamination)",
                "Do not squeeze the bulb while the tip is submerged in a precipitate slurry (stirs up settled solid)"
            ],
            "emergencyGuidance": [
                "If corrosive acid enters eyes from a dropper splash, immediately flush at eyewash station for 15 minutes",
                "Dispose of chipped glass dropper stems in the sharps container"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Remove rubber bulb and rinse glass barrel with water and mild detergent",
                "Rinse glass barrel three times with tap water, then deionized water",
                "Rinse bulb interior with water if contaminated, dry thoroughly, and reassemble"
            ],
            "storageInstructions": [
                "Store glass droppers in flat drawer trays lined with soft paper towels",
                "Store rubber bulbs in a dry, cool bin away from direct sunlight and ozone"
            ],
            "maintenanceChecks": [
                "Inspect rubber bulbs for brittleness, cracking, or sticky chemical degradation",
                "Inspect glass capillary tips for chips"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid fails to draw up into the dropper when bulb is released",
                    "possibleCauses": ["Poor seal between bulb and glass barrel", "Split or cracked rubber bulb", "Clogged tip"],
                    "solution": ["Push bulb further down onto glass lip, or replace defective rubber bulb"],
                    "prevention": ["Check bulb elasticity before starting transfer"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Liquid drips uncontrollably from tip without squeezing",
                    "possibleCauses": ["Hand warmth expanding air inside barrel", "Liquid has very high vapor pressure (e.g. diethyl ether)", "Loose bulb seal"],
                    "solution": ["Pre-wet dropper by drawing and expelling solvent twice to saturate vapor space; replace bulb if leaking"],
                    "prevention": ["Condition dropper with volatile solvent prior to transfer"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Black or brownish sludge appears inside liquid being dispensed",
                    "possibleCauses": ["Corrosive liquid entered rubber bulb during previous use and degraded the elastomer"],
                    "solution": ["Discard contaminated liquid; discard damaged bulb and clean glass barrel thoroughly"],
                    "prevention": ["Never hold droppers horizontally or inverted"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Inverting the dropper or laying it flat on the bench with liquid inside",
                    "whyItMatters": "Chemicals run into the rubber bulb, dissolving the elastomer and contaminating all future reagents",
                    "howToAvoid": "Always hold droppers strictly vertical with the tip pointing downward"
                },
                {
                    "mistake": "Touching the dropper tip directly to the inside wall or solution of the receiving vessel",
                    "whyItMatters": "Transfers chemical contaminants back into the reagent supply if reused",
                    "howToAvoid": "Hold the dropper tip suspended 1 to 2 cm above the receiver mouth without touching glass"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "measuring-cylinder",
                "relationship": "complementary",
                "reason": "Used to add the final drops of liquid to bring the meniscus precisely to the graduation line.",
                "difference": "The dropper delivers dropwise increments; the cylinder measures the accumulated volume."
            },
            {
                "equipmentId": "pipette",
                "relationship": "alternative",
                "reason": "Both transfer small liquid volumes, but volumetric pipettes offer precision analytical quantification.",
                "difference": "A dropper is uncalibrated for qualitative drops; a pipette delivers calibrated quantitative volumes."
            },
            {
                "equipmentId": "reagent-bottle",
                "relationship": "complementary",
                "reason": "Droppers are used to extract small working aliquots from reagent solutions.",
                "difference": "The dropper is a dispensing utensil; the reagent bottle is the bulk storage vessel."
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
                    "title": "ASTM E732 - Standard Specification for Disposable Pasteur-Type Pipet",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Capillary tip dimensions, glass requirements, drop volume norms"]
                },
                {
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Safe handling of Pasteur pipettes", "Sharps disposal rules"]
                }
            ]
        }
    },

    # 13. Wash Bottle
    {
        "id": "wash-bottle",
        "pdfNumber": 13,
        "pdfName": "Wash Bottle",
        "pdfMainUse": "Rinsing equipment",
        "pdfGroup": "Essential glassware and basics",
        "name": "Wash Bottle",
        "category": "Cleaning and Storage",
        "purpose": "Dispenses controlled streams of distilled water or solvents for rinsing glassware and washing precipitates.",
        "image": {
            "src": "assets/images/equipment/wash-bottle.svg",
            "alt": "Squeezable low-density polyethylene wash bottle with bent delivery tube and color-coded cap",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/wash-bottle.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A flexible, squeezable plastic bottle fitted with a screw cap and an internal dip tube extending to an angled nozzle. Compressing the bottle body forces liquid up the tube, creating a directional pressurized stream used for rinsing glassware, washing down precipitates, and topping up solutions.",
        "alternativeNames": ["Squeeze bottle", "Rinse bottle", "Laboratory wash bottle"],
        "commonUses": [
            "Performing final rinsing of washed glassware with deionized or distilled water",
            "Washing down precipitates clinging to the walls of beakers and conical flasks",
            "Rinsing pH electrodes and conductivity probes between sample measurements",
            "Dispensing volatile cleaning solvents like acetone, ethanol, or isopropanol (using solvent-vented bottles)"
        ],
        "types": [
            "Distilled water wash bottle (standard low-density polyethylene, clear or color-coded blue)",
            "Safety-vented solvent wash bottle (labeled with GHS pictograms, venting valve to prevent solvent dripping)",
            "Wide-mouth wash bottle (allows rapid, spill-free refilling without funnels)"
        ],
        "specifications": {
            "material": ["Low-density polyethylene (LDPE)", "Polypropylene (PP cap)", "PTFE (fluoropolymer variants for aggressive organics)"],
            "capacity": {
                "value": "500",
                "unit": "mL",
                "notes": "500 mL is the standard bench size; capacities range from 250 mL to 1000 mL."
            },
            "dimensions": "Bottle diameter ~75 mm, Height with nozzle ~240 mm (500 mL size)",
            "mainParts": ["Flexible squeezable LDPE reservoir body", "Threaded screw cap", "Internal dip tube", "Curved delivery nozzle with fine jet tip"],
            "partsAndFunctions": [
                {
                    "partName": "Flexible squeezable LDPE reservoir body",
                    "function": "Deforms smoothly under hand pressure to pressurize internal airspace and force liquid upward",
                    "handlingNotes": "Squeeze body smoothly to control jet velocity."
                },
                {
                    "partName": "Internal dip tube",
                    "function": "Draws liquid from the lowest point of the bottle upright",
                    "handlingNotes": "Ensure tube is firmly seated into cap underside."
                },
                {
                    "partName": "Curved delivery nozzle with fine jet tip",
                    "function": "Directs a concentrated fine jet of liquid at targeted surfaces or vessel corners",
                    "handlingNotes": "Can be trimmed with scissors if wider stream is needed."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring washing and rinsing dispensing device."
            },
            "limitations": [
                "Unvented bottles filled with volatile solvents (e.g. acetone) drip spontaneously due to internal vapor expansion",
                "Not suitable for hot liquids; LDPE softens and distorts above 70 °C",
                "Non-autoclavable (LDPE melts in standard autoclaves)"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Check label on the bottle to verify the contained fluid (e.g., DI Water, Acetone, Ethanol)",
                "Ensure cap is screwed on tightly to maintain airtight pressure seal",
                "Hold bottle upright in one hand"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Aiming the Nozzle",
                    "instruction": "Point the curved nozzle tip directly toward the surface or glassware wall requiring rinsing."
                },
                {
                    "step": 2,
                    "title": "Stream Generation",
                    "instruction": "Squeeze the flexible bottle body with your fingers to generate a steady, controlled stream."
                },
                {
                    "step": 3,
                    "title": "Washing Action",
                    "instruction": "Direct stream circularly around the inner rim of flasks or beakers to rinse down clinging chemical droplets or crystals."
                },
                {
                    "step": 4,
                    "title": "Release",
                    "instruction": "Release hand pressure to stop the liquid stream immediately without splashing."
                }
            ],
            "handlingTips": [
                "Always hold the bottle upright; tipping it upside down causes air instead of liquid to enter the dip tube",
                "Never put your mouth on the nozzle to blow or siphon liquid"
            ],
            "shutdown": [
                "Wipe nozzle tip clean after use",
                "Refill bottle with pure deionized water when fluid level drops below one-quarter",
                "Store upright on workbench reagent racks"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Solvent vapor discharge", "Misidentifying solvent vs water", "Flammability when spraying solvents near burners"],
            "warnings": [
                "Never fill an unlabeled wash bottle with hazardous chemical solvents",
                "NEVER spray flammable solvents (acetone, ethanol) near open flames or hot plates"
            ],
            "actionsToAvoid": [
                "Do not use standard unvented wash bottles for volatile solvents (they drip continuously)",
                "Do not fill with strong concentrated oxidizing acids (nitric/sulfuric)"
            ],
            "emergencyGuidance": [
                "If solvent is accidentally sprayed into eyes, immediately flush at eyewash station for 15 minutes",
                "If solvent wash bottle catches fire, smother immediately with fire blanket or dry chemical extinguisher"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Empty remaining water or solvent into appropriate receptacle",
                "Rinse bottle interior with fresh deionized water",
                "Allow to air-dry uncapped if changing solvent types"
            ],
            "storageInstructions": [
                "Store upright on dedicated bench racks away from direct sunlight and heat sources",
                "Store solvent bottles in ventilated flammable storage cabinets when not in active use"
            ],
            "maintenanceChecks": [
                "Inspect plastic bottle body for stress cracks or brittleness",
                "Verify printed chemical identity and hazard labels remain clear and legible"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid continuously drips from the nozzle when sitting undisturbed on bench",
                    "possibleCauses": ["Filled with volatile solvent in an unvented bottle; vapor pressure builds up in headspace", "Bottle placed in direct sunlight"],
                    "solution": ["Use a dedicated gas-venting solvent wash bottle with an integrated pressure-release valve"],
                    "prevention": ["Never store volatile solvents in standard unvented wash bottles"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Weak, sputtering stream when squeezed",
                    "possibleCauses": ["Dip tube loosened from cap underside", "Cap is cross-threaded or loose", "Fluid level too low"],
                    "solution": ["Tighten cap securely; push internal dip tube firmly back into the cap mounting socket"],
                    "prevention": ["Refill when level reaches bottom quarter"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Unlabeled wash bottle found on the bench",
                    "possibleCauses": ["Failure to apply label upon filling"],
                    "solution": ["Treat as hazardous unknown waste; discard contents into chemical waste and re-label bottle before reuse"],
                    "prevention": ["Never add fluid to an unlabeled bottle"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Using a plain unlabeled wash bottle for acetone or ethanol",
                    "whyItMatters": "Students mistake the solvent for distilled water and squirt flammable liquid into hot reactions or aqueous assays",
                    "howToAvoid": "Use dedicated pre-printed, color-coded GHS-compliant wash bottles for all solvents"
                },
                {
                    "mistake": "Spraying solvent wash bottles anywhere near a lit Bunsen burner",
                    "whyItMatters": "Solvent mist and vapors instantly flash-ignite, causing explosive fires and severe burns",
                    "howToAvoid": "Maintain strict separation between flammable wash bottles and open burner flames"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Wash bottles rinse residues and precipitates from beaker walls into filters.",
                "difference": "The wash bottle is the dispensing rinsing tool; the beaker is the reaction vessel."
            },
            {
                "equipmentId": "volumetric-flask",
                "relationship": "complementary",
                "reason": "Provides the gentle deionized water stream to bring volumetric flasks near their calibration marks.",
                "difference": "The wash bottle dispenses washing/dilution water; the volumetric flask defines total volume."
            },
            {
                "equipmentId": "laboratory-ph-meter",
                "relationship": "complementary",
                "reason": "Essential for thoroughly rinsing glass pH electrodes with deionized water between measurements.",
                "difference": "The wash bottle provides clean rinse water; the pH meter is the electronic measuring instrument."
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
                    "title": "OSHA Hazard Communication Standard 1910.1200",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Regulation",
                    "supports": ["Secondary container labeling", "GHS chemical wash bottle identification"]
                },
                {
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Solvent handling safety", "Rinsing and cleaning procedures"]
                }
            ]
        }
    },

    # 14. Test Tube Rack
    {
        "id": "test-tube-rack",
        "pdfNumber": 14,
        "pdfName": "Test Tube Rack",
        "pdfMainUse": "Holding test tubes upright",
        "pdfGroup": "Essential glassware and basics",
        "name": "Test Tube Rack",
        "category": "Support Equipment",
        "purpose": "Holds multiple test tubes upright in an organized, stable array for reactions, observations, and drying.",
        "image": {
            "src": "assets/images/equipment/test-tube-rack.svg",
            "alt": "Polypropylene multi-well test tube rack with tiered shelves and drying pegs",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/test-tube-rack.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A sturdy wooden, plastic, or coated metal framework containing holes or wells and drying pins. Because test tubes have rounded bottoms and cannot stand independently, racks are vital support equipment for organizing, viewing, and drying tubes safely.",
        "alternativeNames": ["Test tube stand", "Tube holder rack", "Peg rack"],
        "commonUses": [
            "Holding test tubes upright during qualitative chemical reactions and color observations",
            "Organizing serial dilutions and reagent arrays in sequential order",
            "Holding hot test tubes while cooling following flame heating",
            "Inverting washed test tubes on drying pegs to facilitate drainage"
        ],
        "types": [
            "Polypropylene molded rack (autoclavable, chemically resistant, submersible in water baths)",
            "Traditional wooden rack (classic laboratory timber with holes and drying pegs)",
            "Epoxy-coated wire rack (compact, highly durable, ideal for water bath submersion)"
        ],
        "specifications": {
            "material": ["Polypropylene (PP)", "Epoxy-coated stainless steel", "Hardwood"],
            "capacity": {
                "value": "12 to 24",
                "unit": "tubes",
                "notes": "Standard student bench racks hold 12 to 24 tubes (typically 16 mm or 20 mm diameter)."
            },
            "dimensions": "Length ~220 mm, Width ~80 mm, Height ~120 mm (typical 2-tier 12-place rack)",
            "mainParts": ["Upper hole shelf", "Lower alignment plate / recessed base wells", "Vertical support pillars", "Inverted drying pegs"],
            "partsAndFunctions": [
                {
                    "partName": "Upper hole shelf",
                    "function": "Secures the vertical alignment of the test tube body and prevents lateral tipping",
                    "handlingNotes": "Select hole diameter matching tube outer diameter."
                },
                {
                    "partName": "Lower alignment plate / recessed base wells",
                    "function": "Cradles the rounded bottom of each tube to prevent slipping",
                    "handlingNotes": "Keep wells clean and free from dried chemical crystals."
                },
                {
                    "partName": "Inverted drying pegs",
                    "function": "Vertical pins allowing washed tubes to be inverted for drainage and air drying",
                    "handlingNotes": "Do not place hot tubes on plastic drying pegs."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: structural organizational and support equipment."
            },
            "limitations": [
                "Hole size is fixed; tubes larger than the well diameter cannot fit, and undersized tubes lean loosely",
                "Wooden racks absorb spilled chemical acids and stain easily",
                "Plastic racks can float or melt if placed near open flames"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Select a rack with wells sized appropriately for your test tubes (e.g. 16 mm or 20 mm)",
                "Place rack stably in the center of the workbench away from the edge",
                "Verify rack is clean and level"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Arrangement",
                    "instruction": "Insert clean test tubes into the upper holes, letting the rounded bases settle securely into the bottom recesses."
                },
                {
                    "step": 2,
                    "title": "Labeling Sequence",
                    "instruction": "Arrange tubes in a logical sequential order (e.g., left to right, numbered or labeled) for systematic comparisons."
                },
                {
                    "step": 3,
                    "title": "Observation",
                    "instruction": "View color changes, precipitation, or gas evolution by standing back and looking horizontally across the rack."
                },
                {
                    "step": 4,
                    "title": "Post-wash Inversion",
                    "instruction": "After washing tubes, invert them over the drying pegs at the rear of the rack to drain completely."
                }
            ],
            "handlingTips": [
                "Lift and move the rack by holding both end support pillars with two hands; never lift by grabbing tubes",
                "Do not place test tube racks close to lit Bunsen burners"
            ],
            "shutdown": [
                "Remove and clean all test tubes",
                "Wipe rack surfaces with a damp sponge to remove any chemical droplets",
                "Store flat on storage shelving"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical contamination from dirty wells", "Rack tipping spilling multiple tubes", "Plastic melting near heat"],
            "warnings": [
                "Never carry a loaded rack by picking up the test tubes inside it",
                "Never place a plastic test tube rack directly in a burner flame"
            ],
            "actionsToAvoid": [
                "Do not crowd tubes into wells that are too tight (causes tube binding and breakage)",
                "Do not leave chemical spills pooling in base recesses"
            ],
            "emergencyGuidance": [
                "If multiple tubes spill when a rack is knocked over, immediately alert lab and contain with absorbent pads",
                "Sweep broken glass fragments with a broom into the sharps bin"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wash plastic and metal racks with warm soapy water and a sponge",
                "Rinse with running tap water to remove chemical residues",
                "Air dry or wipe dry with a clean paper towel"
            ],
            "storageInstructions": [
                "Store on clean shelving, stacked if interlocking design permits",
                "Keep wooden racks in dry storage to avoid warping or mold growth"
            ],
            "maintenanceChecks": [
                "Inspect epoxy wire racks for chipped coating and underlying rust",
                "Check that plastic wells are not cracked or distorted from heat"
            ],
            "troubleshooting": [
                {
                    "problem": "Test tubes lean at crooked angles and threaten to tip over",
                    "possibleCauses": ["Tubes have much smaller diameter than the rack wells (e.g., 10 mm tubes in 25 mm holes)"],
                    "solution": ["Switch to a rack designed specifically for the smaller tube size"],
                    "prevention": ["Match tube outer diameter to the rack well specification"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Liquid chemical pools in the bottom base depressions",
                    "possibleCauses": ["Chemical dribbled down the outside of test tubes during filling"],
                    "solution": ["Wipe wells dry with a clean paper towel moistened with detergent and neutralizing agent"],
                    "prevention": ["Wipe outside of test tubes before placing them into the rack"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Plastic pegs melt or warp",
                    "possibleCauses": ["Placed red-hot test tubes directly onto plastic drying pegs"],
                    "solution": ["Trim damaged peg or replace rack; let tubes cool in regular wells before inverting on pegs"],
                    "prevention": ["Allow tubes to reach room temperature before placing on drying pegs"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Moving a loaded rack across the room by holding only one end or picking up the tubes",
                    "whyItMatters": "The rack tilts or slips, dropping 10 to 20 tubes simultaneously and causing major chemical spills and glass breakage",
                    "howToAvoid": "Always carry the rack with two hands holding both side upright pillars securely"
                },
                {
                    "mistake": "Placing a plastic test tube rack within 10 cm of an active Bunsen burner",
                    "whyItMatters": "Radiant heat warps and melts polypropylene racks, destabilizing all contained chemical tubes",
                    "howToAvoid": "Position test tube racks on the non-heating side of your workstation"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "test-tube",
                "relationship": "complementary",
                "reason": "Test tubes cannot stand upright on flat surfaces and require a rack for stable holding.",
                "difference": "The test tube is the reaction glassware; the rack is the static support structure."
            },
            {
                "equipmentId": "test-tube-holder",
                "relationship": "complementary",
                "reason": "Used to lift individual tubes out of the rack to heat them in a flame.",
                "difference": "The rack holds multiple tubes static on the bench; the holder grips a single tube dynamically."
            },
            {
                "equipmentId": "test-tube-brush",
                "relationship": "complementary",
                "reason": "Used to clean test tubes before inverting them onto the rack pegs to dry.",
                "difference": "The brush is a cleaning tool; the rack is an organization and drying support."
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
                    "supports": ["Organization of reaction vessels", "Bench spill prevention"]
                },
                {
                    "title": "ISO 4142 - Laboratory Glassware: Test Tubes and Racks",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Standard well diameters and spacing norms"]
                }
            ]
        }
    },

    # 15. Test Tube Holder
    {
        "id": "test-tube-holder",
        "pdfNumber": 15,
        "pdfName": "Test Tube Holder",
        "pdfMainUse": "Holding test tubes safely",
        "pdfGroup": "Essential glassware and basics",
        "name": "Test Tube Holder",
        "category": "Support Equipment",
        "purpose": "Safely grips a test tube while heating in a flame or transferring hot solutions.",
        "image": {
            "src": "assets/images/equipment/test-tube-holder.svg",
            "alt": "Spring-loaded metal test tube clamp with finger-squeeze handle and curved gripping jaws",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/test-tube-holder.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A handheld clamp made of spring-tensioned brass/steel wire or wood with two jaws designed to securely encircle a test tube. Allows students and chemists to safely hold, position, and manipulate a test tube over an open flame without risking thermal burns.",
        "alternativeNames": ["Test tube clamp", "Handheld test tube tongs"],
        "commonUses": [
            "Holding test tubes safely while heating over a Bunsen burner flame",
            "Transferring hot test tubes out of a boiling water bath",
            "Holding tubes during exothermic additions or vigorous qualitative reactions",
            "Manipulating sample tubes without warming biological samples with hand heat"
        ],
        "types": [
            "Spring-loaded wire holder (steel or brass wire with integral spring squeeze loop)",
            "Wooden test tube holder (wooden clamp with metal slide collar or spring; does not conduct heat)",
            "Screw-clamp holder (features a knurled thumbscrew for adjustable grip pressure)"
        ],
        "specifications": {
            "material": ["Plated spring steel wire", "Brass wire", "Hardwood (wooden versions)"],
            "capacity": {
                "value": "11 to 25",
                "unit": "mm",
                "notes": "Jaws accommodate test tubes from 11 mm up to 25 mm outer diameter (standard and boiling tubes)."
            },
            "dimensions": "Overall length ~180 mm, Jaw span ~30 mm",
            "mainParts": ["Spring-action squeeze handle", "Curved gripping jaws", "Sliding tension collar (some models)"],
            "partsAndFunctions": [
                {
                    "partName": "Spring-action squeeze handle",
                    "function": "Opens the jaws when squeezed between thumb and fingers, and clamps tight when released",
                    "handlingNotes": "Test spring tension before gripping glassware."
                },
                {
                    "partName": "Curved gripping jaws",
                    "function": "Contoured to wrap around the cylindrical glass tube and hold it securely",
                    "handlingNotes": "Position on upper third of the test tube."
                },
                {
                    "partName": "Sliding tension collar (some models)",
                    "function": "Locks the jaws firmly shut so the tube cannot slip out accidentally",
                    "handlingNotes": "Slide collar forward to lock; slide back to release."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring physical handling tool."
            },
            "limitations": [
                "Metal wire handles conduct heat if held directly in the flame for extended periods",
                "Weak or worn springs can allow test tubes to slip and shatter",
                "Squeezing the handle accidentally while holding a tube will drop the tube"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the holder spring tension and ensure jaws close firmly and align evenly",
                "Verify the jaws are clean and free of oily residues",
                "Check that the tube to be held is clean and dry on the outside"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Positioning Clamp",
                    "instruction": "Squeeze the handle to open jaws. Position the clamp around the upper third of the test tube, approximately 2 to 3 cm below the flared lip."
                },
                {
                    "step": 2,
                    "title": "Securing Grip",
                    "instruction": "Release the squeeze handle gently so the jaws clamp firmly around the glass tube. If equipped with a slide collar, push it forward to lock."
                },
                {
                    "step": 3,
                    "title": "Orientation and Heating",
                    "instruction": "Angle the tube at approximately 45 degrees, aiming the open mouth away from yourself and others, and move continuously through the flame."
                },
                {
                    "step": 4,
                    "title": "Return to Rack",
                    "instruction": "Move the hot tube into a heat-resistant test tube rack, squeeze handle to release the tube, and withdraw the holder."
                }
            ],
            "handlingTips": [
                "Always clamp on the upper third of the tube; clamping near the bottom exposes the holder to direct flame and boiling liquids",
                "Remember: Squeezing the handle OPENS the jaws! Do not squeeze when carrying a hot tube"
            ],
            "shutdown": [
                "Allow the holder to cool down if it absorbed radiant heat",
                "Wipe metal or wood clean and store in designated tool drawers",
                "Check spring tension periodically"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Heat-resistant gloves (if prolonged heating)", "Nitrile gloves"],
            "hazards": ["Dropped hot glassware from accidental handle squeeze", "Thermal burns from conductive metal wire", "Chemical splash"],
            "warnings": [
                "Never point the mouth of a held test tube toward anyone while heating",
                "Never hold the test tube holder directly in the flame"
            ],
            "actionsToAvoid": [
                "Do not clamp near the bottom or middle of the test tube",
                "Do not squeeze the handle while transporting a hot tube across the bench"
            ],
            "emergencyGuidance": [
                "If a hot tube is dropped, step back immediately, warn others, and deploy spill control kit",
                "Treat minor contact burns by cooling under cold running water for at least 10 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe wire or wood clean with a damp cloth and mild detergent",
                "Dry thoroughly to prevent rusting of steel wire parts",
                "Do not submerge wooden holders in water for prolonged periods"
            ],
            "storageInstructions": [
                "Store flat in hardware drawers or hang on tool racks",
                "Keep in dry environment to prevent corrosion of steel springs"
            ],
            "maintenanceChecks": [
                "Test clamping force regularly; discard holders with loose or fatigued springs",
                "Ensure jaw tips align symmetrically without crossing over"
            ],
            "troubleshooting": [
                {
                    "problem": "The test tube slips or slides down through the jaws when tilted",
                    "possibleCauses": ["Spring tension is weakened from fatigue", "Tube clamped too loosely", "Outer glass tube surface is oily or wet"],
                    "solution": ["Wipe the tube dry; test spring force and replace holder if spring tension is weak"],
                    "prevention": ["Always ensure tube exterior is dry before clamping"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Metal handle becomes painfully hot to hold",
                    "possibleCauses": ["Holder positioned too close to the flame", "Heated continuously for too long without breaks"],
                    "solution": ["Immediately place tube in a rack and let holder cool; switch to a wooden holder for extended heating"],
                    "prevention": ["Keep holder clamped high on the neck and out of the hot plume of exhaust gas"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Jaws are twisted and do not close parallel",
                    "possibleCauses": ["Mechanical bending stress from being stepped on or crushed in a drawer"],
                    "solution": ["Carefully bend back with pliers or replace with a new holder"],
                    "prevention": ["Store in dedicated compartments without heavy equipment piled on top"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Instinctively squeezing the handle while carrying a hot test tube",
                    "whyItMatters": "Squeezing releases the jaws, dropping boiling acid or chemicals onto the floor or feet",
                    "howToAvoid": "Train your hand to hold the handle by its shaft without compressing the spring loop"
                },
                {
                    "mistake": "Clamping the holder around the middle or bottom of the test tube",
                    "whyItMatters": "The clamp gets charred by the flame, blocks boiling observations, and risks thermal stress rupture",
                    "howToAvoid": "Always clamp strictly on the upper third of the tube, 2 to 3 cm below the rim"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "test-tube",
                "relationship": "complementary",
                "reason": "Test tube holders are specifically shaped to grip cylindrical test tubes securely.",
                "difference": "The test tube is the reaction glassware; the holder is the manual gripping clamp."
            },
            {
                "equipmentId": "bunsen-burner",
                "relationship": "complementary",
                "reason": "The holder enables safe hand-positioning of tubes directly in the Bunsen flame.",
                "difference": "The Bunsen burner provides the heat source; the holder protects the user's hand."
            },
            {
                "equipmentId": "test-tube-rack",
                "relationship": "complementary",
                "reason": "Hot tubes held by the clamp are deposited safely into the rack to cool down.",
                "difference": "The holder is an active hand manipulation tool; the rack is static bench storage."
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
                    "supports": ["Safe heating of glassware", "Thermal protection guidelines"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Small-scale test tube manipulation techniques"]
                }
            ]
        }
    },

    # 16. Spatula
    {
        "id": "spatula",
        "pdfNumber": 16,
        "pdfName": "Spatula",
        "pdfMainUse": "Transferring solid chemicals",
        "pdfGroup": "Essential glassware and basics",
        "name": "Spatula",
        "category": "Basic Tools and Consumables",
        "purpose": "Transfers, scoops, and dispenses solid chemical powders, crystals, and granules.",
        "image": {
            "src": "assets/images/equipment/spatula.svg",
            "alt": "Stainless steel laboratory micro-spatula with flat blade and spoon scoop end",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/spatula.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A handheld stainless steel, nickel, or porcelain utensil featuring a flat blade, spoon scoop, or trough-shaped end. Essential for sampling, transferring, and dispensing precise micro- or macro-quantities of dry chemical reagents without direct skin contact.",
        "alternativeNames": ["Lab spatula", "Microspatula", "Spatula-spoon", "Chattaway spatula"],
        "commonUses": [
            "Transferring solid chemicals from reagent bottles into weighing boats on a balance",
            "Breaking up soft compacted crystal aggregates and salt cakes in reagent jars",
            "Adding small pinches or grain-sized quantities of catalyst to reaction mixtures",
            "Sampling powders for melting point determination and infrared spectroscopy"
        ],
        "types": [
            "Spatula-spoon (one flat blade end and one rounded spoon scoop end; universal format)",
            "Microspatula (very narrow 3-4 mm flat/pointed blade for milligrams and small vials)",
            "Porcelain spatula (chemically inert against concentrated acids and halogens that attack steel)",
            "Chattaway spatula (flat blade at one end and rolled cylindrical trough at the other)"
        ],
        "specifications": {
            "material": ["Stainless steel (AISI 304 or 316)", "Nickel alloy", "Glazed porcelain", "PTFE-coated steel"],
            "capacity": {
                "value": "0.1 to 2",
                "unit": "g",
                "notes": "Scoop carries ~0.5 g to 2 g of typical powder; micro-blade carries ~10 mg to 100 mg."
            },
            "dimensions": "Overall length ~150 mm to 200 mm, Blade width ~8 mm to 15 mm",
            "mainParts": ["Flat flexible blade end", "Central handle grip shaft", "Curved spoon or trough scoop end"],
            "partsAndFunctions": [
                {
                    "partName": "Flat flexible blade end",
                    "function": "Scrapes flat surfaces, levels powder beds, and dispenses fine grain increments",
                    "handlingNotes": "Tap lightly with index finger to dispense single crystals."
                },
                {
                    "partName": "Central handle grip shaft",
                    "function": "Provides ergonomic control for delicate weighing transfers",
                    "handlingNotes": "Hold like a pencil for precise motor control."
                },
                {
                    "partName": "Curved spoon or trough scoop end",
                    "function": "Scoops granular salts and powders out of deep reagent bottles without spilling",
                    "handlingNotes": "Keep clean and dry before entering stock bottles."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: uncalibrated physical solid sampling utensil."
            },
            "limitations": [
                "Stainless steel spatulas are attacked and corroded by iodine, hydrochloric acid, and ferric chloride",
                "Must be wiped meticulously clean between reagents to avoid cross-contaminating stock chemicals",
                "Not designed for heavy chiseling of rock-hard salt concretions"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Verify the spatula is clean, dry, and free of corrosion or residual powder",
                "Select appropriate size (microspatula for small quantities, spoon spatula for bulk)",
                "Place a clean weighing boat on the balance before sampling"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Sampling",
                    "instruction": "Insert the clean scoop end into the reagent bottle and collect a conservative portion of solid chemical."
                },
                {
                    "step": 2,
                    "title": "Transfer",
                    "instruction": "Carry the spatula horizontally over the mouth of the target container to prevent dropping powder on the bench."
                },
                {
                    "step": 3,
                    "title": "Fine Dispensing",
                    "instruction": "Hold the spatula 1 cm above the weighing boat and tap the handle gently with your index finger to shake crystals off grain by grain until target mass is reached."
                },
                {
                    "step": 4,
                    "title": "Cleaning",
                    "instruction": "Immediately wipe the spatula clean with a lint-free tissue; wash with solvent or water if required before touching another chemical."
                }
            ],
            "handlingTips": [
                "Tap your index finger lightly against the metal shaft to dispense tiny individual crystal increments onto the balance",
                "Never leave a dirty spatula resting inside a stock reagent bottle"
            ],
            "shutdown": [
                "Wash with water and detergent, followed by a quick ethanol or acetone rinse for rapid drying",
                "Wipe thoroughly dry to prevent corrosion",
                "Store flat in designated tool trays"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Dust mask (if handling toxic/irritant powders)"],
            "hazards": ["Chemical exposure from aerosolized powder", "Cross-contamination of reactive chemicals", "Skin contact"],
            "warnings": [
                "Never use bare fingers to guide or push chemical solids off a spatula",
                "Do not use metal spatulas with strong oxidizers or halogens (e.g. elemental iodine)"
            ],
            "actionsToAvoid": [
                "Do not return unused chemical powder from the spatula back into the stock reagent bottle",
                "Do not use the same uncleaned spatula in multiple different chemical bottles"
            ],
            "emergencyGuidance": [
                "If toxic chemical powder contacts skin, brush off dry particles first, then flush with water for 15 minutes",
                "Clean powder spills immediately with a brush and pan or designated hazardous waste vacuum"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe off loose powder with a clean laboratory tissue",
                "Wash with water and laboratory detergent using a sponge",
                "Rinse with deionized water, followed by an ethanol rinse, and dry completely with a clean cloth"
            ],
            "storageInstructions": [
                "Store flat in drawer organizers sorted by size (micro, standard, spoon)",
                "Ensure stainless steel spatulas are stored completely dry to prevent pitting corrosion"
            ],
            "maintenanceChecks": [
                "Inspect metal surface for pitting, black oxidation, or chemical corrosion",
                "Ensure blade remains straight and free of sharp bent burrs"
            ],
            "troubleshooting": [
                {
                    "problem": "Stainless steel blade shows pitting and rust spots",
                    "possibleCauses": ["Used with iodine, ferric salts, or concentrated acids without immediate washing"],
                    "solution": ["Polish with fine emery paper or replace; use a porcelain or PTFE-coated spatula for corrosive salts"],
                    "prevention": ["Wash and dry metal spatulas immediately after sampling corrosive salts"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Powder clings stubbornly to the metal spatula blade",
                    "possibleCauses": ["Static electricity on plastic coatings", "Residual moisture on metal surface"],
                    "solution": ["Wipe blade thoroughly with a dry antistatic tissue or ethanol wipe and let dry completely"],
                    "prevention": ["Always ensure spatula is bone dry before inserting into fine powders"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Dispensed mass repeatedly overshoots target on analytical balance",
                    "possibleCauses": ["Dumping powder in large heaps instead of tapping handle gently"],
                    "solution": ["Hold spatula horizontally close to boat and tap the metal shaft lightly with your forefinger"],
                    "prevention": ["Use a microspatula when nearing within 10 mg of target mass"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Returning excess scooped powder from the spatula back into the chemical bottle",
                    "whyItMatters": "Introduces atmospheric moisture and trace contaminants into the pure stock bottle",
                    "howToAvoid": "Weigh conservatively and discard excess chemical into solid chemical waste"
                },
                {
                    "mistake": "Using a wet or damp spatula to sample dry chemical powders",
                    "whyItMatters": "Moisture causes the powder in the bottle to cake, hydrolyze, or decompose",
                    "howToAvoid": "Always ensure the spatula is bone-dry before inserting into any reagent bottle"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "weighing-boat",
                "relationship": "complementary",
                "reason": "Spatulas transfer solid chemicals directly into weighing boats resting on balances.",
                "difference": "The spatula is the sampling and transfer tool; the weighing boat is the containment vessel."
            },
            {
                "equipmentId": "analytical-balance",
                "relationship": "complementary",
                "reason": "Used in tandem to dispense accurate milligram masses of solid reagents.",
                "difference": "The balance measures mass; the spatula manipulates the physical solid."
            },
            {
                "equipmentId": "mortar-and-pestle",
                "relationship": "complementary",
                "reason": "Spatulas scrape finely ground powders out of the mortar into collection containers.",
                "difference": "The mortar and pestle grinds solids; the spatula scrapes and transfers the powder."
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
                    "title": "ISO 28601 - Laboratory utensils: Spatulas",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Material grades, stainless steel specifications, dimensions"]
                },
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Solid reagent transfer techniques, balance weighing practices"]
                }
            ]
        }
    },

    # 17. Mortar and Pestle
    {
        "id": "mortar-and-pestle",
        "pdfNumber": 17,
        "pdfName": "Mortar and Pestle",
        "pdfMainUse": "Grinding solids into powder",
        "pdfGroup": "Essential glassware and basics",
        "name": "Mortar and Pestle",
        "category": "Basic Tools and Consumables",
        "purpose": "Grinds, crushes, and pulverizes solid chemicals into fine, uniform powders.",
        "image": {
            "src": "assets/images/equipment/mortar-and-pestle.svg",
            "alt": "Heavy unglazed porcelain mortar bowl with pouring lip and rounded pestle club",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/mortar-and-pestle.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A two-piece set consisting of a heavy, thick-walled bowl (mortar) with an unglazed interior and a baseball-bat shaped club (pestle) with a rounded unglazed grinding head. Crushes large crystals, granules, and biological tissues into fine powders through friction and compression.",
        "alternativeNames": ["Grinding mortar", "Laboratory mortar", "Agate mortar (mineral variant)"],
        "commonUses": [
            "Grinding large chemical crystals into fine powders to accelerate dissolution rates",
            "Homogenizing solid-solid mixtures for solid-state reactions and synthesis",
            "Preparing potassium bromide (KBr) powder matrices for infrared pellet pressing",
            "Crushing plant or biological tissues with sand or liquid nitrogen for biochemical extraction"
        ],
        "types": [
            "Glazed porcelain mortar (exterior glazed, interior unglazed; classic chemistry workhorse)",
            "Agate mortar and pestle (hard, non-porous microcrystalline quartz for analytical spectroscopy)",
            "Glass mortar and pestle (smooth, non-porous, ideal for non-staining suspensions)",
            "Alumina / Mullite mortar (extreme hardness and abrasion resistance)"
        ],
        "specifications": {
            "material": ["Dense porcelain (unglazed grinding zone)", "Natural agate quartz", "Borosilicate glass"],
            "capacity": {
                "value": "100 to 150",
                "unit": "mL",
                "notes": "Standard student size has internal bowl volume of ~120 mL (outer diameter ~100 mm)."
            },
            "dimensions": "Mortar outer diameter ~100 mm, Height ~60 mm; Pestle length ~115 mm, Head diameter ~30 mm",
            "mainParts": ["Heavy-walled mortar bowl", "Unglazed textured inner grinding basin", "Pouring spout", "Pestle shaft", "Rounded unglazed pestle grinding head"],
            "partsAndFunctions": [
                {
                    "partName": "Unglazed textured inner grinding basin",
                    "function": "Provides rough friction surface to grip and pulverize crystals during grinding",
                    "handlingNotes": "Avoid using metal spatulas that scratch or dislodge ceramic grit."
                },
                {
                    "partName": "Pouring spout",
                    "function": "Enables neat transfer of ground powder into paper or collection boats",
                    "handlingNotes": "Clean spout thoroughly before pouring."
                },
                {
                    "partName": "Rounded unglazed pestle grinding head",
                    "function": "Matches the internal curvature radius of the mortar bowl to maximize grinding contact area",
                    "handlingNotes": "Grind with circular downward motion; do not hammer aggressively."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring mechanical comminution apparatus."
            },
            "limitations": [
                "Porcelain is slightly porous and can absorb stains from intensely colored dyes or active organics",
                "Must NEVER be used to grind explosive, friction-sensitive, or oxidizing mixtures (e.g. chlorates with sulfur)",
                "Heavy and brittle; shatters if dropped on stone floors"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect mortar bowl and pestle head for cracks, chips, or residual colored powder",
                "Confirm that the chemicals being ground are non-explosive and safe for mechanical friction",
                "Place mortar on a non-slip rubber pad or bench mat to prevent sliding"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Loading Material",
                    "instruction": "Place coarse crystals into the mortar, filling to no more than one-third of the bowl depth."
                },
                {
                    "step": 2,
                    "title": "Coarse Crushing",
                    "instruction": "Grasp the pestle firmly and press downward with a gentle rocking motion to crack large chunks into smaller grains. Do not pound like a hammer."
                },
                {
                    "step": 3,
                    "title": "Circular Grinding",
                    "instruction": "Rotate the pestle head in firm, steady circular motions against the bowl walls and base, working outward from center to edge."
                },
                {
                    "step": 4,
                    "title": "Powder Collection",
                    "instruction": "Use a clean plastic or porcelain spatula to scrape powder from the pestle head and mortar walls toward the pouring spout, then pour into a weighing boat."
                }
            ],
            "handlingTips": [
                "Never hammer or strike the pestle forcefully downward; use smooth circular grinding and crushing pressure",
                "Place a piece of filter paper or weighing boat under the spout to catch powder when transferring"
            ],
            "shutdown": [
                "Scrape out all usable ground powder",
                "Wash mortar and pestle thoroughly with warm water and detergent, scrub with a stiff brush, and rinse with DI water",
                "Dry thoroughly in an oven or air dry before storage"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Dust mask (essential when grinding fine or toxic powders)"],
            "hazards": ["Explosive detonation from friction-sensitive chemical mixtures", "Aerosolized chemical dust inhalation", "Pestle chipping fragments"],
            "warnings": [
                "NEVER grind strong oxidizers (chlorates, perchlorates, nitrates) together with combustible materials (sulfur, carbon, organics); violent explosion hazard",
                "Never hammer or pound the pestle forcefully against the mortar base"
            ],
            "actionsToAvoid": [
                "Do not fill mortar more than one-third full (causes powder to spill over rim)",
                "Do not grind toxic heavy metal salts without operating inside a certified fume hood"
            ],
            "emergencyGuidance": [
                "If fine dust causes coughing or respiratory irritation, evacuate to fresh air immediately",
                "In case of friction spark or fire, cover immediately with sand or use Class ABC extinguisher"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wash with warm water and scouring powder or laboratory detergent using a stiff nylon brush",
                "For stubborn chemical stains, grind a small portion of clean white silica sand or potassium chloride to scour out the pores",
                "Rinse four times with tap water, finish with deionized water, and dry in an oven up to 100 °C"
            ],
            "storageInstructions": [
                "Store mortar with pestle resting inside it on low, sturdy shelves",
                "Place a piece of clean cloth or tissue between pestle and mortar to prevent ceramic abrasion"
            ],
            "maintenanceChecks": [
                "Inspect mortar bowl for hairline cracks under bright light",
                "Inspect pestle head for ceramic chipping or uneven flat spots"
            ],
            "troubleshooting": [
                {
                    "problem": "Mortar is permanently stained by previous colored chemical",
                    "possibleCauses": ["Chemical dye or metal complex soaked into unglazed ceramic pores"],
                    "solution": ["Grind a tablespoon of clean dry quartz sand or table salt in the mortar to physically scour the stained surface, then wash"],
                    "prevention": ["Use an agate or glass mortar for strongly staining dyes and indicators"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Powder dust flies out of the mortar during grinding",
                    "possibleCauses": ["Grinding too fast or vigorously; filled bowl beyond one-third capacity"],
                    "solution": ["Slow down grinding motion; cover mortar opening with a clean filter paper perforated for the pestle shaft"],
                    "prevention": ["Fill only to one-quarter capacity and grind gently"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Pestle head chips, leaving ceramic fragments in the powder",
                    "possibleCauses": ["Pounded pestle downward like a hammer instead of grinding smoothly"],
                    "solution": ["Discard contaminated powder batch; inspect pestle and retire if chipped"],
                    "prevention": ["Always use firm circular rolling motions, never hammering impacts"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Pounding the pestle vertically like a hammer onto large crystals",
                    "whyItMatters": "Easily fractures the ceramic mortar bowl, sends crystal projectiles into eyes, and chips the pestle head",
                    "howToAvoid": "Apply steady downward crushing pressure with a gentle rocking motion, followed by circular grinding"
                },
                {
                    "mistake": "Grinding an oxidizer and a fuel together in a mortar",
                    "whyItMatters": "Friction and localized heat will cause spontaneous catastrophic explosion and severe trauma",
                    "howToAvoid": "Never grind oxidizers with fuels; grind reagents separately and mix gently by tumbling on paper"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "spatula",
                "relationship": "complementary",
                "reason": "Spatulas are used to scrape ground powder out of the mortar into collection vessels.",
                "difference": "The mortar and pestle performs mechanical comminution; the spatula transfers the powder."
            },
            {
                "equipmentId": "weighing-boat",
                "relationship": "complementary",
                "reason": "Ground powders are poured through the mortar spout into weighing boats for mass measurement.",
                "difference": "The mortar is the crushing tool; the weighing boat is the balance receptacle."
            },
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Ground powders are transferred to beakers where their increased surface area accelerates dissolution.",
                "difference": "The mortar grinds dry solids; the beaker dissolves solids in liquids."
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
                    "supports": ["Comminution procedures, sample preparation rules"]
                },
                {
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Explosive friction hazards, dust inhalation controls"]
                }
            ]
        }
    },

    # 18. Weighing Boat
    {
        "id": "weighing-boat",
        "pdfNumber": 18,
        "pdfName": "Weighing Boat",
        "pdfMainUse": "Holding solids during weighing",
        "pdfGroup": "Essential glassware and basics",
        "name": "Weighing Boat",
        "category": "Basic Tools and Consumables",
        "purpose": "Holds dry chemical solids and powders during mass measurement on laboratory balances.",
        "image": {
            "src": "assets/images/equipment/weighing-boat.svg",
            "alt": "Square white polystyrene disposable weighing boat with sloping sides and pour-spout corners",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/weighing-boat.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A shallow, flexible disposable dish made of polystyrene or aluminum with a flat bottom and sloping sides. Designed to sit stably on balance pans to contain solids during weighing, featuring flexible corners that squeeze together to form a pouring spout for clean, spill-free transfer.",
        "alternativeNames": ["Weigh boat", "Weighing dish", "Disposable balance dish"],
        "commonUses": [
            "Containing solid chemical reagents while weighing on analytical and top-pan balances",
            "Transferring weighed powders cleanly into volumetric flasks and beakers by squeezing corners",
            "Holding small liquid or moisture samples for drying and moisture analysis (aluminum boats)",
            "Temporary bench tray for sorting small magnetic stir bars, stoppers, and test items"
        ],
        "types": [
            "Polystyrene standard square/diamond weigh boat (flexible, biologically inert, smooth non-stick surface)",
            "Antistatic weighing boat (treated to reduce static charge repulsion of fine fluffy powders)",
            "Aluminum weighing dish (heat-resistant for moisture balance drying ovens and organic solvents)"
        ],
        "specifications": {
            "material": ["High-impact polystyrene (HIPS)", "Antistatic polystyrene", "Aluminum foil"],
            "capacity": {
                "value": "20 to 100",
                "unit": "mL",
                "notes": "Small (~20 mL), Medium (~100 mL), Large (~250 mL); holds solid masses from 0.01 g up to 200 g."
            },
            "dimensions": "Small: ~45 × 45 mm, Medium: ~80 × 80 mm, Height ~20 mm",
            "mainParts": ["Flat square or diamond base", "Sloping sidewalls", "Deformable pouring corners"],
            "partsAndFunctions": [
                {
                    "partName": "Flat square or diamond base",
                    "function": "Rests flat and stably on the circular balance pan without rocking",
                    "handlingNotes": "Keep bottom clean and dry before placing on balance."
                },
                {
                    "partName": "Sloping sidewalls",
                    "function": "Contain powders securely while allowing easy spatula access",
                    "handlingNotes": "Do not overload past sidewall rim."
                },
                {
                    "partName": "Deformable pouring corners",
                    "function": "Flex inward when squeezed to create a funnel spout for neat powder transfer",
                    "handlingNotes": "Squeeze opposite sides gently to pour."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: consumable sample receptacle; balance provides all measurement accuracy."
            },
            "limitations": [
                "Polystyrene boats dissolve and melt if exposed to organic solvents (acetone, dichloromethane, toluene)",
                "Static electricity can cause very fine powders to scatter or cling to walls",
                "Cannot be heated in drying ovens above 80 °C (polystyrene deforms; use aluminum instead)"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Select appropriate size matching the quantity of chemical being weighed",
                "Inspect boat to ensure it is clean, dry, and dust-free",
                "Open the balance draft door and place the boat centrally on the balance pan"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Taring the Balance",
                    "instruction": "Close balance draft doors and press the TARE (or ZERO) button so the balance displays exactly 0.0000 g."
                },
                {
                    "step": 2,
                    "title": "Adding Chemical",
                    "instruction": "Using a clean spatula, transfer the solid reagent into the center of the boat until the target mass is reached."
                },
                {
                    "step": 3,
                    "title": "Mass Recording",
                    "instruction": "Close the draft doors, allow the balance stability indicator to illuminate, and record the final mass in your notebook."
                },
                {
                    "step": 4,
                    "title": "Dispensing",
                    "instruction": "Carefully remove the boat from the balance pan. Squeeze opposite sides to flex a corner into a pouring funnel, and tip the powder smoothly into the target vessel."
                }
            ],
            "handlingTips": [
                "Squeeze two diagonal or opposite corners together to form an instant funnel for pouring directly into narrow flask necks",
                "Tap the back of the boat lightly with a spatula to dislodge clinging particles into the target vessel"
            ],
            "shutdown": [
                "Dispose of single-use plastic weighing boats in the solid laboratory waste container",
                "Wipe balance pan with a soft brush if any powder grains spilled outside the boat",
                "Close balance draft shield doors"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical dust inhalation", "Spill on balance pan corroding load cell", "Solvent incompatibility fires"],
            "warnings": [
                "Never add chemicals to a weighing boat while it is resting on the balance pan if handling corrosive fuming reagents (weigh outside, or dispense carefully)",
                "Never put acetone or volatile solvents into polystyrene weighing boats"
            ],
            "actionsToAvoid": [
                "Do not blow with your breath on the balance pan to clear spilled powder (inhales dust and alters calibration)",
                "Do not reuse disposable plastic boats across different chemical reagents"
            ],
            "emergencyGuidance": [
                "If toxic chemical powder spills onto the balance or bench, sweep immediately with balance brush into waste",
                "In case of skin contact, wash thoroughly with soap and water"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Weighing boats are designed primarily as single-use disposable consumables",
                "If reusing for non-critical salt weighing, rinse with deionized water and dry with clean lint-free paper",
                "Discard if stained, scratched, or distorted"
            ],
            "storageInstructions": [
                "Store nested in original dispenser boxes to prevent airborne dust accumulation",
                "Store in a dry location away from heat and direct sunlight"
            ],
            "maintenanceChecks": [
                "Check that stored boats remain clean and free from environmental dust",
                "Verify antistatic coating effectiveness if handling fine powders"
            ],
            "troubleshooting": [
                {
                    "problem": "Balance reading drifts or jumps erratically when boat is placed on pan",
                    "possibleCauses": ["Static electricity charge on the polystyrene boat repelling balance frame"],
                    "solution": ["Use an antistatic weighing boat, an antistatic ionizer strip, or switch to an aluminum boat"],
                    "prevention": ["Avoid rubbing plastic boats against synthetic clothing or latex gloves"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Weighing boat softens, dissolves, or becomes sticky",
                    "possibleCauses": ["Added an organic solvent (acetone, ester, aromatic hydrocarbon) into polystyrene"],
                    "solution": ["Discard immediately into solvent waste; use glass weighing bottles or aluminum boats for organic liquids"],
                    "prevention": ["Never use polystyrene with non-aqueous solvents"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Powder clings to the plastic boat and will not pour into flask",
                    "possibleCauses": ["Electrostatic attraction on dry winter days; fine crystal particle size"],
                    "solution": ["Rinse residual powder from the boat into the receiver using a wash bottle of solvent, or use antistatic boats"],
                    "prevention": ["Use antistatic boats or weigh by difference using glass weighing bottles"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Adding chemical crystals directly from a bottle without using a weighing boat",
                    "whyItMatters": "Chemicals spill onto the metal balance pan, corroding the balance mechanism and ruining calibration",
                    "howToAvoid": "Always place a weighing boat or container on the pan and tare before dispensing chemicals"
                },
                {
                    "mistake": "Blowing with your mouth to clear spilled powder off the balance pan",
                    "whyItMatters": "Blows toxic chemical aerosols directly into your eyes and face and forces powder into delicate balance electronics",
                    "howToAvoid": "Use a soft camel-hair balance brush to sweep powder onto a piece of paper for disposal"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "analytical-balance",
                "relationship": "complementary",
                "reason": "Weighing boats sit directly on the analytical balance pan to contain chemicals during weighing.",
                "difference": "The balance measures the mass; the boat holds the chemical."
            },
            {
                "equipmentId": "spatula",
                "relationship": "complementary",
                "reason": "Spatulas transfer chemical powders from reagent bottles into weighing boats.",
                "difference": "The spatula is the transfer tool; the boat is the holding dish."
            },
            {
                "equipmentId": "volumetric-flask",
                "relationship": "complementary",
                "reason": "Powder weighed in the boat is funneled into the volumetric flask to prepare standard solutions.",
                "difference": "The weighing boat holds dry solid; the volumetric flask dissolves and measures total liquid volume."
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
                    "title": "ASTM E319 - Standard Practice for the Evaluation of Single-Pan Mechanical Balances",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Taring procedures, vessel mass constraints"]
                },
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Analytical weighing techniques, electrostatic avoidance"]
                }
            ]
        }
    },

    # 19. Filter Paper
    {
        "id": "filter-paper",
        "pdfNumber": 19,
        "pdfName": "Filter Paper",
        "pdfMainUse": "Separating solids from liquids",
        "pdfGroup": "Essential glassware and basics",
        "name": "Filter Paper",
        "category": "Basic Tools and Consumables",
        "purpose": "Separates suspended insoluble solid particles from liquids during gravity or vacuum filtration.",
        "image": {
            "src": "assets/images/equipment/filter-paper.svg",
            "alt": "Circular white cellulose filter paper disc folded in quarters and seated in a funnel",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/filter-paper.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A semi-permeable circular sheet composed of cellulose fibers or glass microfibers arranged randomly. Acts as a physical barrier that permits fluid permeation while retaining solid particulate matter, essential for gravimetric analysis and chemical separation.",
        "alternativeNames": ["Qualitative filter paper", "Quantitative ashless filter paper", "Filter disc"],
        "commonUses": [
            "Separating precipitates from supernatants during gravity filtration in a glass funnel",
            "Retaining crystal crops during vacuum filtration inside a Büchner funnel",
            "Gravimetric quantitative analysis using ashless filter paper ignited in crucibles",
            "Clarifying cloudy reaction solutions and removing drying agents (e.g. MgSO4)"
        ],
        "types": [
            "Qualitative filter paper (standard student lab grade, e.g. Whatman Grade 1, ~11 µm pore size)",
            "Quantitative ashless filter paper (acid-washed, burns away leaving <0.01% ash for gravimetric weighing)",
            "Glass microfiber filter paper (fast flow rate, high chemical and heat resistance up to 500 °C)"
        ],
        "specifications": {
            "material": ["Pure alpha-cellulose fibers", "Borosilicate glass microfibers", "PTFE membrane"],
            "capacity": {
                "value": "70 to 150",
                "unit": "mm",
                "notes": "Diameter ranges from 42.5 mm to 240 mm (110 mm and 125 mm are standard laboratory sizes)."
            },
            "dimensions": "Thickness ~0.18 mm, Typical particle retention ~11 µm (Whatman Grade 1 standard)",
            "mainParts": ["Randomly intertwined cellulose fiber matrix", "Microscopic pore network", "Outer circular perimeter"],
            "partsAndFunctions": [
                {
                    "partName": "Randomly intertwined cellulose fiber matrix",
                    "function": "Traps solid particles on the surface (cake filtration) and within fiber interstices (depth filtration)",
                    "handlingNotes": "Avoid tearing during folding."
                },
                {
                    "partName": "Microscopic pore network",
                    "function": "Permits liquid solvent molecules to pass freely under gravity or vacuum while stopping particles",
                    "handlingNotes": "Select pore size rating matching precipitate grain size."
                },
                {
                    "partName": "Outer circular perimeter",
                    "function": "Forms the top boundary of the filtration cone; must remain lower than funnel rim",
                    "handlingNotes": "Trim if paper exceeds funnel height."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: porous separation consumable; nominal pore size defines particle retention cutoff (e.g. 11 µm)."
            },
            "limitations": [
                "Degraded and weakened by concentrated acids, hot alkalis, and strong oxidizing reagents",
                "Gelatinous precipitates (e.g., iron hydroxide) rapidly blind and clog cellulose pores",
                "Cannot be weighed accurately for quantitative mass without drying to constant weight (hygroscopic)"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Choose correct grade and diameter (paper circle when folded must fit 1 cm below funnel rim)",
                "Ensure funnel is clean and mounted securely on a support ring or flask",
                "Have solvent wash bottle ready for wetting the paper"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Folding in Quarters",
                    "instruction": "Fold circular filter paper disc in half, then fold in half again to form a quarter-circle. Tear off a tiny corner from the outside fold to improve the seal."
                },
                {
                    "step": 2,
                    "title": "Cone Opening",
                    "instruction": "Open the quarter-circle into a cone (three thicknesses on one side, one thickness on the other)."
                },
                {
                    "step": 3,
                    "title": "Seating and Wetting",
                    "instruction": "Place cone into the glass funnel and wet lightly with a squirt of solvent (e.g. distilled water). Press edges gently against glass to form an airtight seal."
                },
                {
                    "step": 4,
                    "title": "Filtration",
                    "instruction": "Pour suspension into the center of the cone using a glass stirring rod. Always keep the liquid level at least 5 mm below the top edge of the paper."
                }
            ],
            "handlingTips": [
                "Tearing a small corner off the outer fold before opening into a cone helps establish a tighter vacuum seal along the funnel glass wall",
                "For faster gravity filtration, use fluted (pleated) filter paper to increase effective surface area"
            ],
            "shutdown": [
                "Allow all liquid to drain completely through the paper",
                "Carefully lift filter paper containing precipitate with forceps or a spatula",
                "Dispose of spent filter paper in designated solid waste or transfer to an oven/desiccator for drying"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical exposure from tearing during filtration", "Spill from funnel overfilling", "Acid degradation"],
            "warnings": [
                "Do not filter concentrated nitric or sulfuric acid through standard cellulose paper (paper oxidizes/chars)",
                "Never allow liquid to rise above the top edge of the filter paper"
            ],
            "actionsToAvoid": [
                "Do not poke stirring rods into the apex of the paper cone (punctures paper instantly)",
                "Do not apply high vacuum to standard thin cellulose filter paper without a support mesh"
            ],
            "emergencyGuidance": [
                "If filter paper tears and hazardous chemicals spill below, isolate the receiver and re-filter using a fresh paper",
                "Treat skin contact with filtrate by washing under running water for 15 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Filter paper is a single-use consumable and is never washed or reused",
                "Dispose of spent paper and trapped residues according to chemical waste guidelines"
            ],
            "storageInstructions": [
                "Store in original packaging boxes in a clean, dry cabinet to protect from moisture, dust, and laboratory acid fumes",
                "Keep away from open chemical reagent shelves"
            ],
            "maintenanceChecks": [
                "Inspect filter paper discs before use for tears, creases, or discoloration",
                "Verify correct grade (qualitative vs quantitative ashless) before critical gravimetric assays"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid drains extremely slowly through the filter paper",
                    "possibleCauses": ["Precipitate particles are fine or gelatinous and plugged the pores", "Unfluted smooth paper used"],
                    "solution": ["Flute (pleat) the filter paper before seating, or switch to a coarser pore grade or vacuum filtration"],
                    "prevention": ["Allow precipitate to digest (grow larger crystals) in warm solution before filtering"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Filtrate passes through cloudy instead of crystal clear",
                    "possibleCauses": ["Paper pore size is larger than precipitate particle diameter", "Liquid spilled over paper rim", "Paper cone torn at apex"],
                    "solution": ["Switch to a finer retention grade (e.g., Whatman Grade 5 or 42) and re-filter cloudy liquid"],
                    "prevention": ["Match paper pore rating to precipitate; never pour over the top paper rim"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Paper tears at the apex when liquid is poured in",
                    "possibleCauses": ["Poked with a glass stirring rod", "Poured heavy liquid stream directly into the point"],
                    "solution": ["Discard torn paper and re-filter mixture through a new, properly seated filter paper cone"],
                    "prevention": ["Direct the stream against the side of the cone using a glass rod, never dropping onto the tip"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Filling the liquid mixture past the top rim of the filter paper",
                    "whyItMatters": "Unfiltered suspension flows over the edge and behind the paper directly into the stem, ruining the filtration",
                    "howToAvoid": "Always maintain liquid level at least 5 mm below the top edge of the filter paper cone"
                },
                {
                    "mistake": "Poking the tip of a glass stirring rod into the bottom apex of the paper cone",
                    "whyItMatters": "Instantly punches a hole through the wet, fragile cellulose, dumping all precipitate into the filtrate",
                    "howToAvoid": "Keep the glass stirring rod hovering above the paper and pour down the rod gently"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "glass-funnel",
                "relationship": "complementary",
                "reason": "Filter paper is folded and seated inside the glass funnel to perform gravity filtration.",
                "difference": "The glass funnel provides the rigid cone support; the filter paper is the porous filtration medium."
            },
            {
                "equipmentId": "buchner-funnel",
                "relationship": "complementary",
                "reason": "Flat filter paper discs are placed flat over the perforated plate in Büchner vacuum filtration.",
                "difference": "The Büchner funnel is the vacuum filtration funnel; the filter paper is the retention filter."
            },
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Beakers collect the clarified filtrate draining through the filter paper.",
                "difference": "The filter paper performs the separation; the beaker collects and contains the filtrate."
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
                    "title": "ASTM E832 - Standard Specification for Laboratory Filter Papers",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Pore retention grades, flow rates, wet burst strength"]
                },
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Paper folding methods, gravimetric ashless filtration"]
                }
            ]
        }
    },

    # 20. Evaporating Dish
    {
        "id": "evaporating-dish",
        "pdfNumber": 20,
        "pdfName": "Evaporating Dish",
        "pdfMainUse": "Evaporating solvents",
        "pdfGroup": "Essential glassware and basics",
        "name": "Evaporating Dish",
        "category": "Heating Equipment",
        "purpose": "Evaporates excess solvents to concentrate solutions or recover dry crystalline solutes under direct heat.",
        "image": {
            "src": "assets/images/equipment/evaporating-dish.svg",
            "alt": "Shallow glazed porcelain evaporating dish with pouring spout and wide liquid surface",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/evaporating-dish.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A shallow, wide-mouthed porcelain or borosilicate ceramic dish with a pouring spout. Designed with a high surface-area-to-depth ratio to maximize solvent evaporation rates, capable of withstanding direct flame heating and high temperatures up to several hundred degrees Celsius.",
        "alternativeNames": ["Evaporating basin", "Crystallizing dish", "Porcelain basin"],
        "commonUses": [
            "Evaporating aqueous solvent to dryness to isolate inorganic salts",
            "Concentrating dilute solutions prior to fractional crystallization",
            "Drying moist solid precipitates over a steam or sand bath",
            "Testing for total dissolved solids (TDS) in water quality testing"
        ],
        "types": [
            "Porcelain evaporating dish (glazed inside and out except outside base; withstands direct flame up to 1050 °C)",
            "Flat-bottomed crystallizing dish (thick borosilicate glass for slow crystal growth at room temperature)",
            "PTFE evaporating dish (chemically inert against hydrofluoric acid and aggressive fluorides)"
        ],
        "specifications": {
            "material": ["High-fired laboratory porcelain", "Borosilicate glass 3.3", "PTFE"],
            "capacity": {
                "value": "75 to 100",
                "unit": "mL",
                "notes": "Typical student size holds ~80 mL to 100 mL; capacities range from 35 mL to 1000 mL."
            },
            "dimensions": "Top rim diameter ~90 mm, Depth ~35 mm (typical 100 mL dish)",
            "mainParts": ["Shallow hemispherical/flat basin", "Glazed inner surface", "Pouring spout", "Unglazed flat outer base"],
            "partsAndFunctions": [
                {
                    "partName": "Shallow basin with wide mouth",
                    "function": "Maximizes liquid surface area exposed to air, drastically accelerating evaporation rate",
                    "handlingNotes": "Do not fill past two-thirds depth."
                },
                {
                    "partName": "Glazed inner surface",
                    "function": "Smooth, non-stick, acid-resistant finish allowing easy scraping and recovery of dry crystals",
                    "handlingNotes": "Inspect for micro-cracks in glaze before heating."
                },
                {
                    "partName": "Pouring spout",
                    "function": "Allows neat decanting of hot concentrated mother liquor without dripping",
                    "handlingNotes": "Support with crucible tongs when pouring hot."
                },
                {
                    "partName": "Unglazed flat outer base",
                    "function": "Ensures stable seating on wire gauze or clay triangles and allows uniform heat conduction",
                    "handlingNotes": "Keep base dry before placing over flame."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring thermal concentration and evaporation vessel."
            },
            "limitations": [
                "Heating to dryness too quickly causes crystals to decrepitate (spatter and pop violently out of the dish)",
                "Porcelain retains heat for a long time; difficult to tell if it is hot purely by sight",
                "Susceptible to thermal shock if placed directly on cold surfaces while hot"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect dish for cracks or deep glaze chips",
                "Ensure outer base is clean and completely dry",
                "Set up a tripod stand with wire gauze or place over a steam water bath"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Filling",
                    "instruction": "Pour the solution into the evaporating dish, filling to no more than one-half to two-thirds capacity to prevent boiling over."
                },
                {
                    "step": 2,
                    "title": "Heating",
                    "instruction": "Heat gently with a Bunsen burner flame through a wire gauze, or place over a boiling water bath for gentle indirect heating."
                },
                {
                    "step": 3,
                    "title": "Monitoring Concentration",
                    "instruction": "As solvent volume decreases, reduce burner flame intensity. Stir gently with a glass rod to prevent crystal crust formation."
                },
                {
                    "step": 4,
                    "title": "Drying and Cooling",
                    "instruction": "Turn off flame before the liquid is completely gone; use residual dish heat to finish drying. Transfer dish using crucible tongs to a heat-resistant tile or desiccator."
                }
            ],
            "handlingTips": [
                "Use crucible tongs or heat-resistant gloves to handle evaporating dishes; never touch bare-handed",
                "Turn off heat when only a small film of liquid remains; latent heat will evaporate the rest without spattering crystals"
            ],
            "shutdown": [
                "Allow dish to cool completely to room temperature before washing",
                "Scrape out recovered dry crystal product using a spatula",
                "Wash with detergent and water, rinse with DI water, and dry"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Heat-resistant gloves", "Crucible tongs"],
            "hazards": ["Violent crystal spattering (decrepitation) into face/eyes", "Severe thermal burns from hot porcelain", "Thermal shock fracture"],
            "warnings": [
                "Never peer directly down into an evaporating dish while heating; hot liquid and crystals can spatter violently",
                "Do not place a hot evaporating dish onto a cold, wet countertop (thermal shock will shatter it)"
            ],
            "actionsToAvoid": [
                "Do not pick up a hot evaporating dish with bare fingers or thin nitrile gloves",
                "Do not evaporate flammable organic solvents over an open burner flame"
            ],
            "emergencyGuidance": [
                "If hot solution spatters into eyes, flush immediately at eyewash station for 15 minutes",
                "Treat contact burns by holding under cool running water for at least 10 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Let dish cool completely to room temperature",
                "Soak in warm water and scrub with laboratory detergent and a sponge",
                "For baked-on mineral residues, soak with dilute 1 M hydrochloric acid, then rinse four times with tap water and once with DI water"
            ],
            "storageInstructions": [
                "Store stacked in organized drawers or cupboards, separated by size",
                "Place paper towels between dishes to prevent glaze scratching"
            ],
            "maintenanceChecks": [
                "Inspect glaze under strong light for fine network cracks (crazing)",
                "Tap gently with a wooden pencil; a clear ring indicates sound ceramic, a dull thud indicates a hidden crack"
            ],
            "troubleshooting": [
                {
                    "problem": "Crystals violently spatter and pop out of the dish as dryness approaches",
                    "possibleCauses": ["Heated too strongly near dryness; steam trapped under crystal crust expands explosively"],
                    "solution": ["Turn off flame early and finish evaporation over a gentle steam bath or with residual heat"],
                    "prevention": ["Reduce heat significantly once crystals begin forming on liquid surface"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Porcelain dish cracks during heating",
                    "possibleCauses": ["Applied intense flame to wet base", "Pre-existing hairline fracture in ceramic"],
                    "solution": ["Extinguish flame immediately, allow to cool, and treat contents as waste"],
                    "prevention": ["Always ensure outer base is dry and use a wire gauze to diffuse heat"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Stained residue cannot be removed with detergent",
                    "possibleCauses": ["Metal oxide or salt baked into ceramic micro-pores"],
                    "solution": ["Soak in warm dilute nitric or hydrochloric acid for 30 minutes, then scrub with scouring pad"],
                    "prevention": ["Do not overheat salts beyond their decomposition temperature"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Looking directly down into the evaporating dish while heating strongly",
                    "whyItMatters": "Decrepitating salt crystals pop out like hot shrapnel, striking eyes and face",
                    "howToAvoid": "View from an angle from behind safety goggles or place a watch glass loosely over the dish with a gap"
                },
                {
                    "mistake": "Setting a red-hot porcelain dish directly onto a cold laminated bench",
                    "whyItMatters": "The sudden thermal shock cracks the dish in half and scorches the benchtop",
                    "howToAvoid": "Always place hot porcelain dishes onto a ceramic-centered wire gauze or heat-resistant ceramic tile"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "bunsen-burner",
                "relationship": "complementary",
                "reason": "Provides the heat source to drive off solvents from the evaporating dish.",
                "difference": "The Bunsen burner produces the flame; the evaporating dish holds the liquid being concentrated."
            },
            {
                "equipmentId": "wire-gauze",
                "relationship": "complementary",
                "reason": "Diffuses burner flame heat evenly across the base of the evaporating dish.",
                "difference": "The wire gauze distributes heat; the evaporating dish contains the solution."
            },
            {
                "equipmentId": "watch-glass",
                "relationship": "alternative",
                "reason": "Both evaporate solvents, but evaporating dishes handle bulk volumes and high temperatures.",
                "difference": "An evaporating dish is a deep ceramic dish for direct heating; a watch glass is a shallow glass plate for drops."
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
                    "title": "ISO 1772 - Laboratory glassware and porcelain: Evaporating dishes",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Dimensions, ceramic glaze specifications, thermal shock limits"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Evaporation and crystallization bench techniques"]
                }
            ]
        }
    }
]

print(f"Items 11-20 loaded: {len(ITEMS_11_TO_20)}")
