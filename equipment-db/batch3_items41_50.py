# -*- coding: utf-8 -*-
"""
Batch 3 Items 41-50:
41. safety-goggles
42. laboratory-coat
43. chemical-resistant-gloves
44. fume-hood
45. eyewash-station
46. safety-shower
47. fire-extinguisher
48. first-aid-kit
49. chemical-waste-container
50. ph-indicator-paper
"""

ITEMS_41_TO_50 = [
    # 41. Safety Goggles
    {
        "id": "safety-goggles",
        "pdfNumber": 41,
        "pdfName": "Safety Goggles",
        "pdfMainUse": "Protecting eyes from splashes",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Safety Goggles",
        "category": "Safety Equipment",
        "purpose": "Shields the eyes and surrounding facial tissue from liquid chemical splashes, flying debris, and vapor hazards.",
        "image": {
            "src": "assets/images/equipment/safety-goggles.svg",
            "alt": "Chemical splash safety goggles with clear polycarbonate lens, soft elastomer body, and indirect ventilation ports",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/safety-goggles.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "Personal protective equipment (PPE) fitting closely around the eyes with a full facial seal and indirect ventilation ports. Unlike standard safety glasses, splash goggles block liquid droplets from entering from above, below, or the sides, providing primary defense against chemical eye injuries.",
        "alternativeNames": ["Chemical splash goggles", "Lab goggles", "Indirect-vent safety goggles"],
        "commonUses": [
            "Mandatory eye protection during chemical handling, mixing, heating, and titrations",
            "Protecting eyes from pressurized liquid sprays, aerosol droplets, and boiling splashes",
            "Shielding against shattered glass fragments from apparatus implosions or explosions",
            "Guarding eyes during chemical waste consolidation and acid bath operations"
        ],
        "types": [
            "Indirect-vented chemical splash goggles (angled hooded vents exclude liquid droplets while reducing fogging; ANSI Z87.1 D3 rated)",
            "Non-vented gas-tight goggles (hermetically sealed against hazardous toxic gases and vapors)",
            "OTG (Over-the-Glasses) splash goggles (deeper frame contoured to fit comfortably over prescription eyeglasses)"
        ],
        "specifications": {
            "material": ["Optical-grade impact-resistant polycarbonate lens", "Flexible PVC or silicone facial skirt", "Adjustable neoprene or elastic headband"],
            "capacity": {
                "value": "Not applicable",
                "unit": "",
                "notes": "Personal protective eyewear; capacity metric is not applicable."
            },
            "dimensions": "Frame width ~160 mm, Height ~80 mm; Optical thickness ~2 mm",
            "mainParts": ["Clear polycarbonate panoramic lens", "Flexible contoured facial seal skirt", "Indirect baffled ventilation ports (D3 rated)", "Adjustable elastic headband"],
            "partsAndFunctions": [
                {
                    "partName": "Clear polycarbonate panoramic lens",
                    "function": "Provides distortion-free impact protection meeting ANSI Z87.1 high-velocity impact standards",
                    "handlingNotes": "Clean only with microfiber cloth; avoid abrasive paper towels that scratch optical coating."
                },
                {
                    "partName": "Flexible contoured facial seal skirt",
                    "function": "Forms a continuous, gap-free seal against the user's face to prevent liquid ingress from any direction",
                    "handlingNotes": "Adjust strap tension to eliminate gaps around nose and temples."
                },
                {
                    "partName": "Indirect baffled ventilation ports",
                    "function": "Allows air circulation to reduce lens fogging while forcing liquid droplets through an angled labyrinth that blocks ingress",
                    "handlingNotes": "Do not remove or alter plastic vent caps."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: personal protective safety equipment."
            },
            "limitations": [
                "Does not protect the lower face, neck, or ears from massive explosions (requires full face shield)",
                "Lenses can fog in warm, humid conditions if antifog coating is degraded",
                "Polycarbonate lens is attacked and clouded by direct contact with acetone or chlorinated solvents"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect lens for deep scratches, cracks, or chemical etching that compromises visibility",
                "Check elastic headband elasticity and ensure facial skirt is supple without hardening",
                "Clean lens with designated optical lens cleaner and microfiber wipe"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Donning",
                    "instruction": "Place the goggles firmly over your eyes and pull the elastic strap over the crown of your head before entering the lab workspace."
                },
                {
                    "step": 2,
                    "title": "Strap Adjustment",
                    "instruction": "Tighten or loosen the headband sliders so the flexible skirt rests snugly against your forehead, cheeks, and nose bridge without painful pressure."
                },
                {
                    "step": 3,
                    "title": "Seal Check",
                    "instruction": "Run a finger around the perimeter to verify there are no gaps where chemical splashes could enter, especially around the temples."
                },
                {
                    "step": 4,
                    "title": "Continuous Wear",
                    "instruction": "Keep goggles on your eyes at all times while in the laboratory. Never push them up onto your forehead or hang them around your neck."
                }
            ],
            "handlingTips": [
                "Never wear safety goggles on your forehead; forehead sweat degrades the seal and moving them back to eyes transfers chemicals",
                "If goggles fog up, step completely outside the laboratory before removing them to wipe the lens"
            ],
            "shutdown": [
                "Remove goggles only AFTER stepping completely out of the active laboratory",
                "Wash with mild soap and warm water, rinse, and dry with a soft cloth",
                "Store in a clean pouch or UV sanitizing cabinet"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles (primary eye protection)", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical splash blindness", "Flying glass shrapnel", "Corrosive vapor irritation"],
            "warnings": [
                "Standard prescription eyeglasses or ordinary spectacle-style safety glasses do NOT provide adequate splash protection against hazardous liquids",
                "Goggles must be worn continuously by everyone in the room whenever any chemical work is active"
            ],
            "actionsToAvoid": [
                "Do not remove goggles inside the laboratory to wipe sweat or fog",
                "Do not use direct-vent goggles (with open holes) for liquid chemical work"
            ],
            "emergencyGuidance": [
                "If chemicals breach the goggles into the eye, immediately yell for help and go to the eyewash station",
                "Hold eyelids wide open with fingers and flush eyes continuously for at least 15 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wash lens and flexible frame under lukewarm running water with a mild dishwashing soap",
                "Rinse thoroughly to remove all soap film",
                "Pat dry with a soft microfiber lens cloth; avoid coarse brown laboratory paper towels"
            ],
            "storageInstructions": [
                "Store in a clean, dry locker, desk drawer, or protective microfiber sleeve",
                "Do not store under heavy books or sharp tools that deform the flexible skirt or scratch lenses"
            ],
            "maintenanceChecks": [
                "Inspect headband elasticity; replace strap if stretched out and loose",
                "Check that ANSI Z87.1 D3 marking is legible on the frame"
            ],
            "troubleshooting": [
                {
                    "problem": "Goggles fog up continuously during experiments, blinding vision",
                    "possibleCauses": ["Antifog coating on inner lens is worn off", "Vent ports blocked", "Headband pulled too tight"],
                    "solution": ["Step outside the lab, apply commercial antifog spray wipe, allow to dry, and re-don"],
                    "prevention": ["Use premium antifog-coated goggles and keep indirect vents clean"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Painful gaps exist around the nose bridge or temples over eyeglasses",
                    "possibleCauses": ["Standard compact goggles worn over bulky prescription glasses"],
                    "solution": ["Switch to dedicated OTG (Over-The-Glasses) splash goggles designed with temple channels"],
                    "prevention": ["Select goggle model sized to fit individual facial structure"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Lens becomes hazy, frosted, or sticky after cleaning",
                    "possibleCauses": ["Wiped with acetone or ethyl acetate solvent that chemically dissolved polycarbonate"],
                    "solution": ["Discard ruined goggles immediately; polycarbonate optical properties cannot be restored"],
                    "prevention": ["Clean goggles ONLY with water, mild soap, or approved lens wipes; never organic solvents"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Pushing safety goggles up onto the forehead when taking a break or writing notes",
                    "whyItMatters": "Chemical vapors and splashes from neighboring benches strike unprotected eyes, and forehead sweat transfers chemicals down onto lenses",
                    "howToAvoid": "Keep goggles over eyes continuously until completely exiting the laboratory doors"
                },
                {
                    "mistake": "Cleaning polycarbonate goggle lenses with coarse brown paper towels or acetone",
                    "whyItMatters": "Acetone dissolves polycarbonate into a cloudy opaque mess, and paper towel fibers cause permanent scratch haze",
                    "howToAvoid": "Clean only with mild liquid soap, water, and soft microfiber cloths"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "eyewash-station",
                "relationship": "complementary",
                "reason": "If chemicals bypass goggles, the eyewash station provides immediate 15-minute emergency decontamination.",
                "difference": "Goggles prevent chemical entry into eyes; the eyewash flushes chemicals after an accidental splash."
            },
            {
                "equipmentId": "laboratory-coat",
                "relationship": "complementary",
                "reason": "Forms standard personal protective equipment (PPE) ensemble with goggles to protect body and eyes.",
                "difference": "Goggles protect eyes and face; the lab coat protects skin and torso clothing."
            },
            {
                "equipmentId": "fume-hood",
                "relationship": "complementary",
                "reason": "Working inside a fume hood with goggles provides dual primary and secondary splash protection.",
                "difference": "The fume hood contains airborne vapors; safety goggles provide personal facial splash barrier."
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
                    "title": "ANSI/ISEA Z87.1-2020: American National Standard for Occupational and Educational Personal Eye and Face Protection Devices",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "National Standard",
                    "supports": ["Splash rating (D3), impact resistance, optical clarity criteria"]
                },
                {
                    "title": "OSHA 29 CFR 1910.133: Eye and Face Protection",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Regulation",
                    "supports": ["Mandatory eye protection mandates in chemical laboratories"]
                }
            ]
        }
    },

    # 42. Laboratory Coat
    {
        "id": "laboratory-coat",
        "pdfNumber": 42,
        "pdfName": "Laboratory Coat",
        "pdfMainUse": "Protecting skin and clothing",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Laboratory Coat",
        "category": "Safety Equipment",
        "purpose": "Shields the wearer's arms, torso, and street clothing from chemical splashes, spills, and accidental burns.",
        "image": {
            "src": "assets/images/equipment/laboratory-coat.svg",
            "alt": "White 100% cotton knee-length chemical laboratory coat with snap closures and knit cuffs",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/laboratory-coat.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A knee-length protective garment made of chemically treated 100% cotton or flame-resistant barrier fabric featuring long sleeves, quick-release snap closures, and knitted cuffs. Provides a sacrificial barrier that absorbs and slows liquid penetration, allowing rapid removal before chemicals contact bare skin.",
        "alternativeNames": ["Lab coat", "White coat", "Chemical barrier coat", "FR lab coat"],
        "commonUses": [
            "Mandatory barrier protection worn during chemical, biological, and analytical procedures",
            "Preventing chemical splashes from contacting personal clothing and bare skin",
            "Providing flame resistance when working near open Bunsen burner flames",
            "Preventing transfer of laboratory contamination out into public spaces"
        ],
        "types": [
            "100% white cotton lab coat (standard chemistry lab standard; does not melt when exposed to flame)",
            "Flame-resistant (FR) Nomex / treated cotton coat (for handling pyrophoric chemicals like organolithiums)",
            "Fluid-resistant barrier coat (polyester-cotton with barrier laminate for biohazards and large aqueous splashes)"
        ],
        "specifications": {
            "material": ["100% twill-weave cotton (untreated or flame-retardant treated)", "Nomex / Aramid fibers (pyrophoric work)"],
            "capacity": {
                "value": "Not applicable",
                "unit": "",
                "notes": "Protective wearable garment; capacity metric is not applicable."
            },
            "dimensions": "Knee-length (approx 100 cm to 115 cm length depending on size S to XXL)",
            "mainParts": ["High-closure collar lapels", "Long sleeves with knitted elastic/snap cuffs", "Quick-release front snap fasteners", "Reinforced waist and chest pockets"],
            "partsAndFunctions": [
                {
                    "partName": "Quick-release front snap fasteners",
                    "function": "Allows instant, one-pull ripping off of the coat in the event of a major chemical spill or fire",
                    "handlingNotes": "Always keep completely snapped up; never wear open like a jacket."
                },
                {
                    "partName": "Long sleeves with knitted elastic/snap cuffs",
                    "function": "Prevents loose fabric from dragging through chemicals and seals neatly under or over gloves",
                    "handlingNotes": "Never roll up sleeves while handling hazardous chemicals."
                },
                {
                    "partName": "100% twill cotton fabric",
                    "function": "Charred by flames rather than melting into skin (unlike synthetic polyester or nylon)",
                    "handlingNotes": "Wash frequently; replace when stained or worn thin."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: personal protective textile garment."
            },
            "limitations": [
                "A lab coat is permeable to liquids over time; it slows chemical penetration but does not stop it indefinitely",
                "Synthetic polyester-blend coats will melt and fuse to human skin if ignited (must use 100% cotton or Nomex)",
                "Must NEVER be worn into public cafeterias, libraries, or outside areas to prevent community contamination"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Select a coat that fits comfortably with full arm extension and extends down to the knees",
                "Verify fabric is 100% cotton or flame-resistant (check inner manufacturer label)",
                "Ensure all front snap buttons function smoothly for emergency removal"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Donning",
                    "instruction": "Put arms through sleeves upon entering the laboratory anteroom."
                },
                {
                    "step": 2,
                    "title": "Fastening",
                    "instruction": "Fasten EVERY front snap button all the way up to the neck. Never wear a lab coat unbuttoned."
                },
                {
                    "step": 3,
                    "title": "Cuff Alignment",
                    "instruction": "Pull knit cuffs down to wrists and tuck inside the gauntlets of chemical-resistant gloves."
                },
                {
                    "step": 4,
                    "title": "Doffing",
                    "instruction": "Before leaving the laboratory, unfasten snaps, peel coat off rolling it inside-out, and hang on assigned coat pegs inside the lab."
                }
            ],
            "handlingTips": [
                "Always fasten all snaps; an unbuttoned lab coat provides zero chest protection and loose flaps easily catch on burners",
                "Never take your lab coat home to wash in a family washing machine; use institutional laundry services"
            ],
            "shutdown": [
                "Remove coat before exiting laboratory doors into public corridors",
                "Hang on personal coat hook inside the lab; never lay on clean computer desks",
                "Submit to professional laboratory laundering service if soiled"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Laboratory coat", "Safety goggles", "Chemical-resistant gloves", "Closed-toe leather shoes"],
            "hazards": ["Chemical absorption into skin through clothing", "Clothing ignition near open burners", "Cross-contamination of public areas"],
            "warnings": [
                "NEVER wear a lab coat made of 100% polyester or nylon near open flames (synthetics melt into skin)",
                "Never wear lab coats outside the laboratory into food areas, offices, or public restrooms"
            ],
            "actionsToAvoid": [
                "Do not wear lab coat unbuttoned or with sleeves rolled up past forearms",
                "Do not store food, pens that touch lips, or personal phones in contaminated lab coat pockets"
            ],
            "emergencyGuidance": [
                "If a large chemical spill saturates the coat, immediately grab front snaps and rip coat off, then step into safety shower",
                "If lab coat catches fire, Drop and Roll immediately or use emergency safety shower / fire blanket"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Launder regularly using an approved professional commercial laboratory laundry service",
                "Do not wash with household personal laundry (prevents transferring chemical residues to family clothing)",
                "Spot-treat acid or dye stains per institutional laundry protocol"
            ],
            "storageInstructions": [
                "Hang on assigned wall hooks inside the laboratory changing zone",
                "Keep away from clean street coats and backpacks"
            ],
            "maintenanceChecks": [
                "Inspect fabric for acid holes, frayed cuffs, or missing snap fasteners",
                "Retire coats that have thinned or developed large chemical burn holes"
            ],
            "troubleshooting": [
                {
                    "problem": "Front snaps jam or will not pop open during simulated emergency drill",
                    "possibleCauses": ["Corrosion or lint inside snap female sockets"],
                    "solution": ["Clean sockets or replace snaps; do not use coat if emergency release fails"],
                    "prevention": ["Test snap release regularly"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Small round holes appear in cotton fabric after washing",
                    "possibleCauses": ["Unnoticed splashes of concentrated sulfuric or hydrochloric acid degraded cellulose fibers"],
                    "solution": ["Retire coat if multiple holes compromise barrier protection"],
                    "prevention": ["Rinse acid splashes with water immediately during lab sessions"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Sleeves are too long and drag across benchtop and chemicals",
                    "possibleCauses": ["Coat size too large; loose straight cuffs without elastic"],
                    "solution": ["Switch to correct coat size or a model equipped with knitted elastic storm cuffs"],
                    "prevention": ["Try on coat sizes before starting laboratory courses"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Wearing a lab coat open and unbuttoned like a casual jacket",
                    "whyItMatters": "An unbuttoned coat provides zero protection to chest and abdomen, and fluttering fabric easily catches on Bunsen flames or knocks over glassware",
                    "howToAvoid": "Always fasten all front snap buttons completely from bottom to neck"
                },
                {
                    "mistake": "Wearing a lab coat out into the campus cafeteria, library, or public bus",
                    "whyItMatters": "Transfers toxic chemical residues, carcinogens, and biohazards onto public dining tables and seats",
                    "howToAvoid": "Always take off your lab coat and hang it inside the lab before stepping outside"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "chemical-resistant-gloves",
                "relationship": "complementary",
                "reason": "Gloves overlap the knitted cuffs of the lab coat to provide continuous hand-to-arm barrier protection.",
                "difference": "The lab coat protects arms and torso; gloves protect hands and fingers."
            },
            {
                "equipmentId": "safety-shower",
                "relationship": "complementary",
                "reason": "In massive chemical spill emergencies, the lab coat is ripped off under the safety shower.",
                "difference": "The lab coat is the passive barrier; the safety shower is the active deluge decontamination station."
            },
            {
                "equipmentId": "safety-goggles",
                "relationship": "complementary",
                "reason": "Together with goggles, the lab coat forms the universal foundational laboratory safety uniform.",
                "difference": "Goggles protect eyes; the lab coat protects skin and street clothes."
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
                    "title": "NFPA 45: Standard on Fire Protection for Laboratories Using Chemicals",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "National Safety Standard",
                    "supports": ["Flame resistance requirements, natural fiber mandates, snap closure rules"]
                },
                {
                    "title": "OSHA 29 CFR 1910.132: General Requirements for Personal Protective Equipment",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Regulation",
                    "supports": ["Protective clothing selection, laundering regulations"]
                }
            ]
        }
    },

    # 43. Chemical-resistant Gloves
    {
        "id": "chemical-resistant-gloves",
        "pdfNumber": 43,
        "pdfName": "Chemical-resistant Gloves",
        "pdfMainUse": "Protecting hands",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Chemical-resistant Gloves",
        "category": "Safety Equipment",
        "purpose": "Shields hands and skin from direct chemical absorption, corrosive burns, and biological contact.",
        "image": {
            "src": "assets/images/equipment/chemical-resistant-gloves.svg",
            "alt": "Disposable blue textured nitrile laboratory examination gloves",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/chemical-resistant-gloves.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "Elastomeric protective handwear made of synthetic nitrile, neoprene, butyl, or natural latex rubber. Provides a chemical permeation barrier shielding skin from organic solvents, concentrated acids, alkalis, and toxic reagents during laboratory operations.",
        "alternativeNames": ["Nitrile gloves", "Lab gloves", "Protective gloves", "Heavy-duty chemical gloves"],
        "commonUses": [
            "Protecting skin when dispensing, measuring, and handling liquid reagents",
            "Preventing chemical absorption through the skin during synthesis and extraction",
            "Cleaning contaminated glassware and consolidating hazardous chemical waste",
            "Handling biological specimens, cell cultures, and staining reagents"
        ],
        "types": [
            "Disposable nitrile gloves (standard general chemistry PPE; latex-free, excellent puncture and oil resistance)",
            "Heavy-duty neoprene / butyl rubber gloves (thick reusable gauntlets for concentrated acids and aggressive organics)",
            "Viton gloves (premium fluoropolymer gloves for chlorinated and aromatic solvents like DCM and toluene)"
        ],
        "specifications": {
            "material": ["Acrylonitrile butadiene (nitrile)", "Chloroprene (neoprene)", "Butyl rubber", "Natural rubber latex"],
            "capacity": {
                "value": "Thickness ~4 to 8",
                "unit": "mil",
                "notes": "Standard disposable nitrile is 4 mil to 6 mil thick (0.10 mm to 0.15 mm); heavy gauntlets are 15 mil to 30 mil."
            },
            "dimensions": "Length ~240 mm (wrist-length) to ~300 mm (extended cuff); Sizes XS to XL",
            "mainParts": ["Textured grip fingertips", "Seamless palm and fingers", "Rolled beaded cuff"],
            "partsAndFunctions": [
                {
                    "partName": "Textured grip fingertips",
                    "function": "Enhances tactile friction to prevent wet or slippery glassware from slipping out of hands",
                    "handlingNotes": "Inspect for micro-tears when pulling on."
                },
                {
                    "partName": "Seamless elastomeric barrier body",
                    "function": "Provides molecular permeation barrier against chemical solutes and fluids",
                    "handlingNotes": "Select glove material compatible with specific chemical handled."
                },
                {
                    "partName": "Rolled beaded cuff",
                    "function": "Prevents tearing during donning and channels drips away from wrist",
                    "handlingNotes": "Pull over or tuck beneath lab coat cuffs."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: personal protective barrier handwear."
            },
            "limitations": [
                "No single glove material resists all chemicals; nitrile provides poor barrier against dichloromethane, acetone, and ethyl acetate (permeates in seconds)",
                "Disposable thin gloves are splash-protection only; they do not permit prolonged immersion in chemicals",
                "Does not provide thermal protection against open flames or red-hot glassware"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Check a chemical glove compatibility chart (e.g. Ansell or Cole-Parmer guide) for the specific chemicals you are using",
                "Inspect gloves for pinholes by blowing air into the glove and rolling the cuff closed to test for leaks",
                "Ensure hands are clean, dry, and fingernails are trimmed"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Donning",
                    "instruction": "Insert clean dry hands into the gloves, pulling gently on the beaded cuff until fingers seat comfortably without stretching tightly."
                },
                {
                    "step": 2,
                    "title": "Cuff Overlap",
                    "instruction": "Overlap the glove cuffs with the knitted cuffs of your lab coat so no wrist skin is exposed."
                },
                {
                    "step": 3,
                    "title": "Chemical Task Execution",
                    "instruction": "Conduct chemical manipulation. If chemicals splash onto your gloves, change them immediately (peel off, wash hands, and put on fresh gloves)."
                },
                {
                    "step": 4,
                    "title": "Safe Doffing (Beak Method)",
                    "instruction": "Pinch the outside of one glove near the wrist with the other gloved hand, peel it inside-out away from your body. Hold the balled-up glove in the remaining gloved hand, slide bare fingers under the wrist of the second glove, and peel inside-out over the first glove."
                }
            ],
            "handlingTips": [
                "Gloves are 'splash protection', not immersion suits: if a chemical splashes on your glove, treat it as contaminated and replace it immediately",
                "Never touch personal items (phone, door handles, computer keyboards, your face) with gloved hands"
            ],
            "shutdown": [
                "Dispose of contaminated disposable gloves in the hazardous solid laboratory waste bin",
                "Wash hands thoroughly with soap and warm water immediately after removing gloves",
                "Apply hand moisturizer if frequent washing causes skin dryness"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Chemical-resistant gloves", "Safety goggles", "Laboratory coat"],
            "hazards": ["Chemical skin permeation and absorption", "Dermatitis from prolonged sweat accumulation", "Latex protein allergies"],
            "warnings": [
                "Thin disposable nitrile gloves offer virtually ZERO protection against dichloromethane, chloroform, or acetone (breakthrough occurs in under 30 seconds)",
                "Never wear chemical gloves outside the laboratory or on building exit door handles"
            ],
            "actionsToAvoid": [
                "Do not reuse single-use disposable gloves",
                "Do not touch door knobs, elevator buttons, or cell phones with gloved hands"
            ],
            "emergencyGuidance": [
                "If a chemical penetrates through a glove, rip glove off immediately, and flush hand under running water for at least 15 minutes",
                "Report chemical exposure to lab instructor"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Disposable nitrile gloves are single-use consumables and must never be washed or reused",
                "Heavy-duty reusable gauntlets: wash exterior with soap and water while still on hands, rinse, dry, and inspect before removing"
            ],
            "storageInstructions": [
                "Store in original dispenser boxes in a cool, dry place away from direct sunlight, UV lamps, and electric motors (ozone degrades elastomers)",
                "Keep boxes organized by size (S, M, L, XL)"
            ],
            "maintenanceChecks": [
                "Check shelf-life expiration dates on glove boxes (elastomers degrade over 3-5 years)",
                "Perform water or air leak test on heavy reusable gloves before each use"
            ],
            "troubleshooting": [
                {
                    "problem": "Glove tears across palm while pulling it on",
                    "possibleCauses": ["Selected a size that is too small for hand", "Hands were damp during donning", "Glove box is aged and degraded"],
                    "solution": ["Dry hands completely; step up one size (e.g. from Medium to Large)"],
                    "prevention": ["Always ensure hands are completely dry before donning gloves"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Glove fingers feel cold, tingle, or become sticky during solvent work",
                    "possibleCauses": ["Chemical solvent penetrated through the glove polymer (chemical breakthrough)"],
                    "solution": ["Immediately remove gloves, wash hands thoroughly with soap and water for 15 minutes, and check glove compatibility chart"],
                    "prevention": ["Consult chemical resistance matrix before handling organic solvents; switch to Norfoil or Silver Shield gloves"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Hands develop red, itchy, sweating rash after wearing gloves",
                    "possibleCauses": ["Contact dermatitis from trapped perspiration; or accelerator chemical sensitivity in synthetic rubber"],
                    "solution": ["Switch to accelerator-free nitrile gloves or wear thin cotton glove liners underneath"],
                    "prevention": ["Wash and dry hands thoroughly before and after glove use"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Touching door handles, computer mice, pens, or smartphones with gloved hands",
                    "whyItMatters": "Transfers invisible toxic and carcinogenic chemical residues onto surfaces that unsuspecting colleagues touch with bare hands",
                    "howToAvoid": "Adopt the 'one-glove rule' or remove gloves completely before touching communal items"
                },
                {
                    "mistake": "Assuming nitrile gloves protect against all chemical solvents",
                    "whyItMatters": "Common organic solvents like acetone and dichloromethane permeate thin nitrile in under 30 seconds without visible changes, delivering chemicals directly to skin",
                    "howToAvoid": "Check manufacturer chemical resistance permeation tables before handling solvents"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "laboratory-coat",
                "relationship": "complementary",
                "reason": "Gloves seal against the cuffs of the lab coat to protect wrists from chemical drips.",
                "difference": "Gloves protect hands; the lab coat protects arms and torso."
            },
            {
                "equipmentId": "safety-goggles",
                "relationship": "complementary",
                "reason": "Gloves and goggles together protect the primary exposure sites (eyes and hands).",
                "difference": "Gloves shield skin from direct contact; goggles shield eyes from airborne droplets."
            },
            {
                "equipmentId": "spatula",
                "relationship": "complementary",
                "reason": "Gloves are worn while handling spatulas to prevent accidental contact with solid chemical reagents.",
                "difference": "The spatula transfers the chemical; gloves protect the user's skin."
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
                    "title": "ASTM D6319 - Standard Specification for Nitrile Examination Gloves for Medical and Laboratory Application",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Tensile strength, pinhole defect limits, physical dimensions"]
                },
                {
                    "title": "Prudent Practices in the Laboratory: Handling and Management of Chemical Hazards",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Glove permeation rates, chemical degradation resistance, doffing techniques"]
                }
            ]
        }
    },

    # 44. Fume Hood
    {
        "id": "fume-hood",
        "pdfNumber": 44,
        "pdfName": "Fume Hood",
        "pdfMainUse": "Controlling hazardous vapors when used correctly",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Fume Hood",
        "category": "Safety Equipment",
        "purpose": "Captures, contains, and exhausts toxic, volatile, flammable, and foul-smelling chemical vapors away from the laboratory.",
        "image": {
            "src": "assets/images/equipment/fume-hood.svg",
            "alt": "Chemical laboratory fume hood with vertical sliding glass sash, airflow baffle, and internal services",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/fume-hood.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A large, ventilated bench containment enclosure equipped with an adjustable counterweighted transparent sash, aerodynamic airfoil sill, internal exhaust baffles, and a dedicated high-velocity exhaust blower. Draws room air through the sash face to contain and safely discharge hazardous fumes.",
        "alternativeNames": ["Chemical fume hood", "Laboratory hood", "Fume cupboard", "Exhaust hood"],
        "commonUses": [
            "Conducting chemical reactions that generate toxic, flammable, corrosive, or foul-smelling vapors",
            "Handling volatile organic solvents (e.g. diethyl ether, chloroform, benzene)",
            "Heating concentrated acids (hydrochloric, nitric, sulfuric) during digestions",
            "Safe dispensing of pyrophoric, moisture-sensitive, or malodorous reagents (thiols/mercaptans)"
        ],
        "types": [
            "Constant Air Volume (CAV) fume hood (exhausts fixed volume; face velocity increases as sash is lowered)",
            "Variable Air Volume (VAV) fume hood (adjusts blower speed to maintain constant 100 fpm face velocity at any sash height)",
            "Perchloric acid fume hood (features dedicated water washdown system to prevent explosive perchlorate salt buildup)"
        ],
        "specifications": {
            "material": ["Chemical-resistant resin liner (phenolic or epoxy)", "Laminated safety glass sash", "Stainless steel / epoxy work surface"],
            "capacity": {
                "value": "Face velocity ~80 to 100",
                "unit": "fpm",
                "notes": "Standard face velocity is 80 to 100 feet per minute (0.4 to 0.5 m/s) at operating sash height."
            },
            "dimensions": "Width ~1.2 m to 1.8 m (4 ft to 6 ft), Depth ~0.9 m, Height ~1.5 m",
            "mainParts": ["Vertical sliding safety glass sash", "Aerodynamic airfoil entry sill", "Rear exhaust baffles (top and bottom)", "Digital airflow monitor / velocity alarm", "Recessed epoxy work surface"],
            "partsAndFunctions": [
                {
                    "partName": "Vertical sliding safety glass sash",
                    "function": "Serves as an adjustable physical shield between the chemist and the reaction, and regulates airflow opening",
                    "handlingNotes": "Keep sash lowered to the designated operational height (usually 45 cm / 18 in) or lower."
                },
                {
                    "partName": "Aerodynamic airfoil entry sill",
                    "function": "Smooths airflow entering the bottom of the hood to eliminate turbulent reverse eddys that spill fumes",
                    "handlingNotes": "Never block the airfoil slot with equipment or paper."
                },
                {
                    "partName": "Digital airflow monitor / velocity alarm",
                    "function": "Continuously measures face velocity and triggers audio-visual alarms if airflow drops below safe limits (<80 fpm)",
                    "handlingNotes": "Do not silence alarm without resolving the airflow fault."
                }
            ],
            "measurementAccuracy": {
                "value": 10.0,
                "unit": "fpm",
                "notes": "Face velocity sensor displays airflow velocity accurate to ±10 fpm (typically calibrated at 100 fpm)."
            },
            "limitations": [
                "Does NOT provide protection against high-energy explosive detonations (provides moderate barrier against splashes only)",
                "Walking rapidly past the open sash generates wake eddies that pull fumes out into the room",
                "Not a storage cabinet; cluttering hoods with chemical bottles severely disrupts laminar airflow"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Check the digital airflow monitor to verify face velocity is green and safe (~100 fpm; no alarm)",
                "Ensure sash moves smoothly and the operational height arrow (usually ~45 cm / 18 in) is marked",
                "Clear unnecessary glassware and clutter from the hood basin"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Equipment Placement",
                    "instruction": "Set up apparatus at least 15 cm (6 inches) deep behind the plane of the sash. Never work right at the front edge."
                },
                {
                    "step": 2,
                    "title": "Airfoil Clearance",
                    "instruction": "Elevate large bulky equipment (such as hot plates or baths) 5 cm on lab jacks or blocks to allow air to sweep beneath them toward rear baffles."
                },
                {
                    "step": 3,
                    "title": "Sash Positioning",
                    "instruction": "Lower the glass sash so it serves as a physical barrier between your face/torso and the apparatus, working with hands reaching beneath the sash."
                },
                {
                    "step": 4,
                    "title": "Smooth Movements",
                    "instruction": "Move arms slowly in and out of the hood to prevent creating turbulent wake vortices that draw fumes into the laboratory."
                }
            ],
            "handlingTips": [
                "The 15 cm (6-inch) rule: always place equipment at least 15 cm inside the sash face for complete containment",
                "When leaving an active reaction unattended, pull the sash down completely to its lowest closed position"
            ],
            "shutdown": [
                "Clean up any spills on the epoxy worktop immediately",
                "Close chemical containers and return stock bottles to designated flammable or acid cabinets",
                "Pull the sliding sash down completely to the closed position to conserve laboratory HVAC energy"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Chemical-resistant gloves"],
            "hazards": ["Inhalation of toxic/carcinogenic vapors", "Chemical splash from reaction runaway", "Flash fire inside enclosure"],
            "warnings": [
                "NEVER put your head inside the fume hood while chemicals are present; only your hands should enter",
                "Never operate a fume hood when the digital airflow alarm is sounding or red"
            ],
            "actionsToAvoid": [
                "Do not use the fume hood as a long-term chemical storage cabinet",
                "Do not block the bottom airfoil or rear exhaust baffles with reagent bottles or paper"
            ],
            "emergencyGuidance": [
                "If the airflow alarm sounds during an experiment, cover reactions, pull sash all the way down, and notify instructor",
                "In case of fire inside the hood, pull sash down completely and activate building fire alarm"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe interior epoxy walls and worktop with a damp cloth and mild neutral detergent",
                "Clean laminated safety glass sash with standard window cleaner",
                "Decontaminate rear baffles during scheduled maintenance shutdowns"
            ],
            "storageInstructions": [
                "The fume hood must NOT be used for general chemical storage",
                "Keep working area clear of unused apparatus to preserve aerodynamic containment"
            ],
            "maintenanceChecks": [
                "Annual face velocity certification by HVAC safety inspectors (calibrated with hot-wire anemometer per ASHRAE 110)",
                "Inspect sash counterweight cables and pulleys annually for wear or binding"
            ],
            "troubleshooting": [
                {
                    "problem": "Digital airflow monitor is sounding a continuous alarm with a red warning light",
                    "possibleCauses": ["Exhaust blower fan failure on the roof", "Sash opened above maximum certified height", "Duct damper closed"],
                    "solution": ["Lower sash below certified line; if alarm continues, stop work, seal containers, and evacuate hood area"],
                    "prevention": ["Always operate sash at or below marked certification line"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Chemical odors are noticeable in the laboratory outside the hood",
                    "possibleCauses": ["Apparatus positioned within 15 cm of the sash edge", "Rapid room drafts or walking turbulence pulling fumes out", "Blocked rear baffles"],
                    "solution": ["Push equipment back at least 15 cm from sash; lower sash; remove clutter blocking rear lower baffle"],
                    "prevention": ["Maintain the 15 cm working buffer and minimize rapid traffic past open hoods"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Sash glass is cracked or counterweight cable snapped",
                    "possibleCauses": ["Mechanical impact; cable fatigue"],
                    "solution": ["Post 'OUT OF SERVICE - DO NOT USE' sign; lock sash in place and submit work order to facilities"],
                    "prevention": ["Slide sash smoothly without slamming"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Sticking one's head inside the fume hood opening to get a closer look at a reaction",
                    "whyItMatters": "Puts the chemist's breathing zone directly into the concentrated toxic vapor cloud being drawn toward the exhaust",
                    "howToAvoid": "Keep head strictly outside the plane of the sash; look through the transparent safety glass"
                },
                {
                    "mistake": "Cluttering the fume hood with dozens of stored chemical bottles",
                    "whyItMatters": "Bottles block the lower rear exhaust baffles and airfoil, creating turbulent eddies that spill fumes out into the room",
                    "howToAvoid": "Store chemicals in dedicated storage cabinets; keep only active experiment vessels inside the hood"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "chemical-waste-container",
                "relationship": "complementary",
                "reason": "Chemical waste carboys are frequently kept inside fume hoods during solvent transfers to capture vapors.",
                "difference": "The fume hood provides the ventilated air containment; the waste container holds liquid waste."
            },
            {
                "equipmentId": "distillation-apparatus",
                "relationship": "complementary",
                "reason": "Distillations of volatile or toxic solvents are constructed inside fume hoods for vapor containment.",
                "difference": "The distillation apparatus separates the chemicals; the fume hood exhausts stray vapors."
            },
            {
                "equipmentId": "safety-goggles",
                "relationship": "complementary",
                "reason": "Safety goggles must be worn even when working at a fume hood because turbulent eddies can escape.",
                "difference": "The fume hood is an engineering control; goggles are personal protective equipment."
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
                    "title": "ANSI/ASHRAE Standard 110-2016: Methods of Testing Performance of Laboratory Fume Hoods",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "National Standard",
                    "supports": ["Face velocity criteria, tracer gas containment tests, sash aerodynamic standards"]
                },
                {
                    "title": "NFPA 45: Standard on Fire Protection for Laboratories Using Chemicals",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "National Fire Protection Standard",
                    "supports": ["Exhaust duct requirements, airflow monitoring, chemical storage limitations"]
                }
            ]
        }
    },

    # 45. Eyewash Station
    {
        "id": "eyewash-station",
        "pdfNumber": 45,
        "pdfName": "Eyewash Station",
        "pdfMainUse": "Flushing exposed eyes",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Eyewash Station",
        "category": "Safety Equipment",
        "purpose": "Flushes hazardous chemical splashes from eyes and face with continuous aerated water for 15 minutes.",
        "image": {
            "src": "assets/images/equipment/eyewash-station.svg",
            "alt": "Emergency plumbed eyewash station with stainless steel bowl, push-paddle activator, and twin aerated nozzles",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/eyewash-station.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An emergency first-aid decontamination fixture consisting of twin aerated spray nozzles mounted over a drainage bowl with a stay-open push paddle. Activated in a single motion, it provides a gentle, continuous stream of tepid water (16-38 °C) to irrigate both eyes simultaneously for a mandatory 15 minutes.",
        "alternativeNames": ["Emergency eye wash", "Eye wash fountain", "Eye wash unit"],
        "commonUses": [
            "Immediate emergency flushing of chemical acid, alkali, or solvent splashes in the eyes",
            "Rinsing particulate debris or broken glass dust from exposed facial tissue",
            "Diluting and decontaminating corrosive eye contact before emergency medical transport",
            "Weekly routine water flushing checks to clear stagnant plumbing lines"
        ],
        "types": [
            "Plumbed emergency eyewash station (permanently connected to potable water supply, minimum 1.5 L/min / 0.4 gpm)",
            "Combination safety shower and eyewash unit (integrated overhead shower and waist-height eyewash)",
            "Self-contained gravity-fed portable eyewash (contains 30-60 L buffered preserved saline for remote areas)"
        ],
        "specifications": {
            "material": ["Stainless steel or high-visibility yellow impact-resistant plastic bowl", "Chrome-plated brass spray head assembly", "Neoprene flip-off dust caps"],
            "capacity": {
                "value": "Min 1.5",
                "unit": "L/min",
                "notes": "ANSI/ISEA Z358.1 mandates delivering at least 1.5 L/min (0.4 gpm) of tepid water for a full 15 minutes."
            },
            "dimensions": "Height from floor ~840 to 1140 mm, Bowl diameter ~300 mm",
            "mainParts": ["Twin aerated spray heads with dust covers", "Stainless steel / plastic catch bowl", "Large 'PUSH' paddle actuator handle", "Stay-open brass ball valve", "Drainage plumbing pipe"],
            "partsAndFunctions": [
                {
                    "partName": "Twin aerated spray heads with dust covers",
                    "function": "Delivers gentle, non-injurious aerated water streams to both eyes simultaneously; dust caps pop off automatically with water pressure",
                    "handlingNotes": "Keep dust covers in place during routine times to keep nozzles clean."
                },
                {
                    "partName": "Large 'PUSH' paddle actuator handle",
                    "function": "Activates water flow instantly in a single simple physical motion (can be pushed by blind/panicked user with forearm)",
                    "handlingNotes": "Valve stays open automatically without holding."
                },
                {
                    "partName": "Stay-open brass ball valve",
                    "function": "Ensures water continues flowing hands-free so the victim can use both hands to hold eyelids wide open",
                    "handlingNotes": "Must be manually pulled back to shut off."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: emergency first-aid life safety equipment."
            },
            "limitations": [
                "Water pressure that is too high can cause mechanical eye injury; must be gentle aerated flow",
                "Does not neutralize chemicals; works strictly through continuous hydraulic dilution and mechanical washing",
                "Cold tap water (<16 °C) causes thermal shock and prevents victims from completing the full 15-minute flush (tepid water 16-38 °C required)"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Know the exact location of the eyewash station before beginning any laboratory work (must be reachable in 10 seconds)",
                "Ensure pathway to the eyewash station is completely clear of obstacles, chairs, and backpacks",
                "Verify weekly inspection tag is current"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Immediate Navigation",
                    "instruction": "In an emergency, shout for help and go directly to the eyewash station immediately. Keep eyes open as much as possible."
                },
                {
                    "step": 2,
                    "title": "Activation",
                    "instruction": "Push the large 'PUSH' paddle handle firmly forward. Water will begin flowing instantly hands-free; dust covers will pop off."
                },
                {
                    "step": 3,
                    "title": "Positioning and Eye Flushing",
                    "instruction": "Lower your face into the twin streams. Use your fingers to hold both upper and lower eyelids wide open so water flushes behind the eyelids."
                },
                {
                    "step": 4,
                    "title": "Continuous 15-Minute Flush",
                    "instruction": "Roll eyes continuously up, down, and in circles to flush all surfaces. Continue flushing for a full 15 minutes by the clock while a lab partner calls emergency medical services."
                }
            ],
            "handlingTips": [
                "The natural reflex is to squeeze eyelids tightly shut; the victim MUST use their fingers to force eyelids open into the water streams",
                "Do not stop after 2 or 3 minutes because eyes feel better; corrosive chemicals linger in conjunctival sacs and require a full 15-minute flush"
            ],
            "shutdown": [
                "After 15 minutes of continuous flushing, seek immediate emergency medical evaluation",
                "Pull the push-paddle backward to turn off the stay-open valve",
                "Replace dust covers over the nozzles and report the incident"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles (prevention is primary)", "Emergency eyewash access"],
            "hazards": ["Permanent corneal blindness from chemical burns", "Secondary infection from dirty stagnant eyewash water"],
            "warnings": [
                "MUST BE ACCESSIBLE WITHIN 10 SECONDS from any chemical work area with an unobstructed pathway",
                "Never store boxes, carts, trash cans, or chairs in front of an eyewash station"
            ],
            "actionsToAvoid": [
                "Do not stop flushing before 15 minutes have elapsed",
                "Do not rub eyes with hands or cloth during or after flushing"
            ],
            "emergencyGuidance": [
                "Call 911 / campus emergency services immediately while the victim is actively flushing",
                "Provide the Safety Data Sheet (SDS) of the splashed chemical to the responding medical team"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Clean stainless steel or plastic bowl with mild disinfectant weekly",
                "Wipe spray nozzles with alcohol wipes to prevent bacterial biofilm growth",
                "Ensure drain line is clear and does not back up"
            ],
            "storageInstructions": [
                "Installed permanently on wall or pedestal in high-visibility location marked with emergency signage",
                "Keep yellow dust caps seated on spray heads between uses"
            ],
            "maintenanceChecks": [
                "Activate and flush weekly for 1 to 3 minutes to clear rust, sediment, and microbial growth from plumbing lines",
                "Verify water temperature is tepid (16 °C to 38 °C / 60 °F to 100 °F) and record on inspection tag"
            ],
            "troubleshooting": [
                {
                    "problem": "Water runs brown and rusty when activated during weekly test",
                    "possibleCauses": ["Sediment and rust accumulated in stagnant dead-leg plumbing pipes"],
                    "solution": ["Run water continuously for 3 minutes until stream is crystal clear; document on inspection card"],
                    "prevention": ["Conduct mandatory weekly flushes without skipping"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "One nozzle has low pressure while the other sprays normally",
                    "possibleCauses": ["Clogged aerator screen in the weak nozzle"],
                    "solution": ["Unscrew nozzle aerator cap, rinse sediment from mesh screen, and reassemble"],
                    "prevention": ["Keep dust caps in place to prevent bench dust entering nozzles"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Access path to the eyewash station is blocked by equipment carts or chairs",
                    "possibleCauses": ["Poor laboratory housekeeping and safety non-compliance"],
                    "solution": ["Immediately remove all obstacles; maintain mandatory 1-meter clear perimeter at all times"],
                    "prevention": ["Enforce zero-tolerance policy on blocking emergency equipment"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Stopping the eyewash flush after only 1 or 2 minutes because the initial burning sensation decreased",
                    "whyItMatters": "Corrosive acids and strong bases (especially alkalis) penetrate deep into corneal tissue, causing permanent delayed blindness if not rinsed for 15 minutes",
                    "howToAvoid": "Have a lab partner time the full 15 minutes with a clock and insist on keeping eyes in the water"
                },
                {
                    "mistake": "Allowing laboratory chairs, trash cans, or boxes to be placed in front of the eyewash station",
                    "whyItMatters": "A blinded, panicked student running with chemical burning their eyes will trip or be delayed, losing precious seconds",
                    "howToAvoid": "Maintain an unobstructed, direct line of travel to all emergency stations at all times"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "safety-shower",
                "relationship": "complementary",
                "reason": "Often built as a combined emergency station for simultaneous eye and body decontamination.",
                "difference": "The eyewash flushes delicate eyes at gentle flow; the safety shower deluges the entire body."
            },
            {
                "equipmentId": "safety-goggles",
                "relationship": "complementary",
                "reason": "Wearing safety goggles is the primary prevention that avoids the need for emergency eyewash flushing.",
                "difference": "Goggles prevent chemical contact; the eyewash treats chemical contact after an accident."
            },
            {
                "equipmentId": "first-aid-kit",
                "relationship": "complementary",
                "reason": "First aid kits contain sterile eye dressings applied after the mandatory 15-minute water flush.",
                "difference": "The eyewash decontaminates the eye; the first aid kit provides subsequent protective bandaging."
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
                    "title": "ANSI/ISEA Z358.1-2014 (R2020): Emergency Eyewash and Shower Equipment",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "National Standard",
                    "supports": ["Flow rate (1.5 L/min), 15-minute duration, 10-second travel distance, tepid water range"]
                },
                {
                    "title": "OSHA 29 CFR 1910.151(c): Medical Services and First Aid - Drenching and Flushing Facilities",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Regulation",
                    "supports": ["Mandatory availability of eyewash equipment where corrosive materials are handled"]
                }
            ]
        }
    },

    # 46. Safety Shower
    {
        "id": "safety-shower",
        "pdfNumber": 46,
        "pdfName": "Safety Shower",
        "pdfMainUse": "Rinsing chemical spills from the body",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Safety Shower",
        "category": "Safety Equipment",
        "purpose": "Deluges the body with a high-volume torrent of water to wash away massive chemical spills and extinguish clothing fires.",
        "image": {
            "src": "assets/images/equipment/safety-shower.svg",
            "alt": "Emergency drench safety shower with overhead stainless steel head and triangular pull-rod actuator",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/safety-shower.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An emergency deluge drench station connected to a high-capacity potable water main, featuring an overhead shower head activated by pulling an overhead triangular pull-rod handle. Delivers a massive, continuous torrent of at least 75.7 L/min (20 gpm) of water to rapidly dilute and rinse large chemical spills from skin and clothing.",
        "alternativeNames": ["Emergency drench shower", "Deluge shower", "Emergency shower"],
        "commonUses": [
            "Emergency full-body decontamination following a major chemical spill, splash, or container rupture",
            "Rapidly extinguishing clothing fires on a person when stop-drop-and-roll is insufficient",
            "Flushing corrosive acid or alkali spills covering torso, arms, and legs",
            "Diluting hazardous pesticide or toxic chemical skin contamination"
        ],
        "types": [
            "Plumbed emergency overhead shower (permanently piped into high-flow building water line)",
            "Combination shower and eyewash station (integrated overhead deluge head and waist-level eye/face wash)",
            "Barrier-free ADA-compliant safety shower (configured with extended pull-chains for wheelchair accessibility)"
        ],
        "specifications": {
            "material": ["Cast brass or stainless steel shower head", "Epoxy-coated galvanized steel pipe", "Stay-open brass ball valve with stainless steel pull-rod"],
            "capacity": {
                "value": "Min 75.7",
                "unit": "L/min",
                "notes": "ANSI/ISEA Z358.1 mandates delivering at least 75.7 L/min (20 gpm) of tepid water (16-38 °C) for a minimum of 15 minutes."
            },
            "dimensions": "Shower head height ~2100 to 2400 mm above floor, Spray pattern diameter ~500 mm at 1500 mm height",
            "mainParts": ["Overhead deluge drench head", "Vertical supply pipe column", "Rigid triangular pull-rod handle", "Stay-open heavy-duty ball valve"],
            "partsAndFunctions": [
                {
                    "partName": "Overhead deluge drench head",
                    "function": "Disperses a high-volume, continuous column of water soaking the user from head to toe",
                    "handlingNotes": "Keep clean and unobstructed."
                },
                {
                    "partName": "Rigid triangular pull-rod handle",
                    "function": "Allows easy grabbing and pulling downward in panic to activate water deluge in a single motion",
                    "handlingNotes": "Must hang no higher than 175 cm above the floor."
                },
                {
                    "partName": "Stay-open heavy-duty ball valve",
                    "function": "Locks in the full-open position when pulled, allowing hands-free operation so victim can strip off clothing",
                    "handlingNotes": "Must be pushed up manually to turn off."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: emergency high-volume life safety decontamination equipment."
            },
            "limitations": [
                "Produces massive water flow (over 1000 liters in 15 minutes); creates floor flooding unless room has a dedicated floor drain",
                "Does not neutralize chemicals; relies strictly on physical mechanical flushing and dilution",
                "Water is tepid or cold; victims will experience hypothermia if kept in shower without warmth after 15 minutes"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Locate the safety shower upon entering the laboratory; verify path is completely clear of obstacles",
                "Ensure inspection tag shows current testing status",
                "In emergency: do not hesitate due to fear of water damage or modesty"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Immediate Positioning",
                    "instruction": "Step directly beneath the overhead shower head immediately following a major chemical spill or clothing fire."
                },
                {
                    "step": 2,
                    "title": "Activation",
                    "instruction": "Pull the triangular handle downward firmly. A massive torrent of water will cascade down instantly. The valve stays open hands-free."
                },
                {
                    "step": 3,
                    "title": "Clothing Removal",
                    "instruction": "WHILE UNDER THE WATER, immediately strip off all contaminated clothing, lab coat, shoes, and jewelry. Do not let modesty delay removal of chemical-soaked fabric."
                },
                {
                    "step": 4,
                    "title": "Continuous 15-Minute Rinse",
                    "instruction": "Remain under the deluge of water for a minimum of 15 minutes, massaging skin to flush all chemical residues. Have someone call 911 immediately and provide privacy blankets."
                }
            ],
            "handlingTips": [
                "Modesty is secondary to preventing life-altering chemical burns; contaminated clothing must be removed while water is flowing",
                "Lab partners should provide modesty screens, blankets, and assist the victim while standing clear of the toxic runoff"
            ],
            "shutdown": [
                "Push the pull-rod upward to close the stay-open valve after 15 minutes of continuous flushing",
                "Wrap the victim in clean blankets or clean lab coats to prevent hypothermia while awaiting emergency medical responders",
                "Notify laboratory safety officer and clean up floor water"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Chemical-resistant gloves"],
            "hazards": ["Chemical absorption causing systemic toxicity or third-degree acid burns", "Hypothermia during prolonged rinse", "Slip and fall hazard from flooding floor"],
            "warnings": [
                "MUST BE REACHABLE WITHIN 10 SECONDS from any hazardous chemical workstation",
                "Do NOT hesitate to pull the shower handle out of concern for laboratory floor water damage"
            ],
            "actionsToAvoid": [
                "Do not leave contaminated clothing on the body while showering (traps chemicals against skin)",
                "Do not store equipment or furniture underneath the shower footprint"
            ],
            "emergencyGuidance": [
                "Call 911 / emergency services immediately upon activating the shower",
                "Have the Safety Data Sheet (SDS) ready for emergency paramedics"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe shower head and pull rod with mild disinfectant cloth",
                "Ensure floor area beneath shower is clean, dry, and marked with high-visibility floor tape"
            ],
            "storageInstructions": [
                "Permanently installed fixture in designated safety zones",
                "Maintain a minimum 1-meter clear radius around the shower at all times"
            ],
            "maintenanceChecks": [
                "Perform scheduled monthly or weekly flow activation test using a drench shower test cart/funnel bucket",
                "Verify minimum flow rate of 75.7 L/min and record test date on inspection tag"
            ],
            "troubleshooting": [
                {
                    "problem": "Pulling handle produces weak trickle instead of high-volume drench",
                    "possibleCauses": ["Supply pipe valve partially closed", "Clogged strainer in water line", "Building water pressure drop"],
                    "solution": ["Ensure main supply shutoff valve is locked fully open; submit emergency repair ticket to facilities"],
                    "prevention": ["Conduct regular monthly bucket-flow tests"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Water continues to flow and will not shut off when handle is pushed up",
                    "possibleCauses": ["Debris jammed in ball valve seal; mechanical linkage disconnected"],
                    "solution": ["Locate and close the overhead manual isolation valve on the supply line; call facilities immediately"],
                    "prevention": ["Inspect mechanical valve linkage during routine testing"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Items, chairs, or carts found parked underneath the safety shower",
                    "possibleCauses": ["Poor laboratory safety culture and spatial awareness"],
                    "solution": ["Immediately remove all items; outline floor perimeter with yellow-and-black hazard tape"],
                    "prevention": ["Strict enforcement by laboratory instructors"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Hesitating to pull the safety shower handle out of fear of causing water damage to the floor",
                    "whyItMatters": "Corrosive acids like nitric or sulfuric acid cause irreversible third-degree chemical burns within 15 seconds; water is easily mopped up, skin is not",
                    "howToAvoid": "Never hesitate: pull the handle immediately whenever chemicals splash on clothing or body"
                },
                {
                    "mistake": "Refusing to remove chemical-soaked clothing under the shower due to modesty",
                    "whyItMatters": "Clothing holds concentrated acid or caustic alkali against the skin like a soaked poultice, causing severe flesh burns",
                    "howToAvoid": "Strip off all contaminated clothing immediately under the running water; lab partners should hold up coats to provide privacy"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "eyewash-station",
                "relationship": "complementary",
                "reason": "Frequently integrated together into a dual emergency safety station.",
                "difference": "The safety shower decontaminates the full body; the eyewash gently flushes the eyes."
            },
            {
                "equipmentId": "laboratory-coat",
                "relationship": "complementary",
                "reason": "The lab coat is the sacrificial barrier ripped off under the safety shower during an emergency.",
                "difference": "The lab coat is passive wearable protection; the safety shower is active emergency washing."
            },
            {
                "equipmentId": "fire-extinguisher",
                "relationship": "complementary",
                "reason": "Both are critical emergency response equipment located along laboratory egress routes.",
                "difference": "The safety shower extinguishes clothing on people; the extinguisher fights equipment/structural fires."
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
                    "title": "ANSI/ISEA Z358.1-2014 (R2020): Emergency Eyewash and Shower Equipment",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "National Standard",
                    "supports": ["Flow rate (75.7 L/min), spray pattern diameter, valve stay-open mechanics, 10-second accessibility"]
                },
                {
                    "title": "OSHA 29 CFR 1910.151(c): Medical Services and First Aid",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Regulation",
                    "supports": ["Mandatory drenching facilities for corrosive chemical exposure"]
                }
            ]
        }
    },

    # 47. Fire Extinguisher
    {
        "id": "fire-extinguisher",
        "pdfNumber": 47,
        "pdfName": "Fire Extinguisher",
        "pdfMainUse": "Responding to suitable fires",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Fire Extinguisher",
        "category": "Safety Equipment",
        "purpose": "Suppresses small, incipient laboratory fires using specialized extinguishing agents.",
        "image": {
            "src": "assets/images/equipment/fire-extinguisher.svg",
            "alt": "Red dry-chemical Class ABC laboratory fire extinguisher with pressure gauge, pull pin, and squeeze handle",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/fire-extinguisher.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A high-pressure handheld steel cylinder filled with an extinguishing agent (such as dry chemical ammonium phosphate or compressed carbon dioxide) propelled by compressed gas. Designed for rapid emergency response to contain small, incipient-stage fires before they spread, operated using the PASS protocol.",
        "alternativeNames": ["Lab fire extinguisher", "ABC extinguisher", "CO2 fire extinguisher"],
        "commonUses": [
            "Extinguishing small, incipient fires on lab benches, trash cans, or heating equipment",
            "Suppressing flammable organic solvent fires (Class B)",
            "Extinguishing energized electrical equipment fires on stirrers, ovens, or computers (Class C)",
            "Smothering combustible solids like paper, wood, and cardboard (Class A)"
        ],
        "types": [
            "Class ABC dry chemical extinguisher (ammonium phosphate powder; multipurpose, non-conductive, standard lab unit)",
            "Class BC carbon dioxide (CO2) extinguisher (clean gas, leaves no residue, safe for delicate analytical electronics)",
            "Class D metal fire extinguisher (special dry powder for combustible reactive metals like Na, K, Li, Mg)"
        ],
        "specifications": {
            "material": ["Seamless drawn steel or aluminum pressure cylinder", "Forged brass valve assembly", "Reinforced rubber discharge hose and horn nozzle"],
            "capacity": {
                "value": "2.5 to 5",
                "unit": "kg",
                "notes": "Standard laboratory size contains 5 lb to 10 lb (~2.3 kg to 4.5 kg) of extinguishing agent."
            },
            "dimensions": "Height ~450 mm to 520 mm, Cylinder diameter ~150 mm",
            "mainParts": ["Steel pressure vessel cylinder", "Carrying handle and squeeze lever", "Safety pull-pin with tamper seal", "Bourdon tube pressure gauge (green zone)", "Discharge hose with horn/nozzle"],
            "partsAndFunctions": [
                {
                    "partName": "Safety pull-pin with tamper seal",
                    "function": "Prevents accidental discharge; must be pulled to break plastic seal and release operating lever",
                    "handlingNotes": "Pull ring pin firmly straight out."
                },
                {
                    "partName": "Carrying handle and squeeze lever",
                    "function": "Carries the unit and discharges extinguishing agent when squeezed together",
                    "handlingNotes": "Do not squeeze lever while pulling pin."
                },
                {
                    "partName": "Bourdon tube pressure gauge",
                    "function": "Indicates internal propellant nitrogen pressure; pointer must be in the green zone",
                    "handlingNotes": "Check indicator monthly; if in red recharge zone, service immediately."
                },
                {
                    "partName": "Discharge hose with horn/nozzle",
                    "function": "Directs the high-velocity stream of extinguishing agent precisely at the base of the flames",
                    "handlingNotes": "Hold by the insulated handle; on CO2 horns, do not touch cold plastic (frostbite)."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: emergency firefighting life safety equipment."
            },
            "limitations": [
                "Only suitable for SMALL, INCIPIENT fires (trash can or single beaker size); never attempt to fight large spreading fires",
                "Discharge duration is extremely brief: an average 5 lb extinguisher empties completely in 10 to 15 seconds",
                "Standard ABC or CO2 extinguishers must NEVER be used on combustible metal fires (Na, K, Mg); water and CO2 react violently with alkali metals"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Assess the fire: if it is larger than a wastebasket, spreading quickly, or blocking your exit, EVACUATE and pull building fire alarm",
                "Ensure your back is toward an unobstructed EXIT before approaching the fire",
                "Remember the universal firefighting protocol: P-A-S-S"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "P - Pull the Pin",
                    "instruction": "PULL the safety pin located at the top of the handle, breaking the plastic inspection tamper seal."
                },
                {
                    "step": 2,
                    "title": "A - Aim at Base",
                    "instruction": "Stand 2 to 3 meters (6 to 8 feet) back and AIM the discharge nozzle or horn directly at the BASE of the fire, not into the flames."
                },
                {
                    "step": 3,
                    "title": "S - Squeeze Lever",
                    "instruction": "SQUEEZE the operating lever slowly and evenly to release the pressurized extinguishing agent."
                },
                {
                    "step": 4,
                    "title": "S - Sweep Side-to-Side",
                    "instruction": "SWEEP the nozzle from side to side across the base of the fire until all flames are completely extinguished. Watch for re-ignition."
                }
            ],
            "handlingTips": [
                "Always aim at the fuel source at the base of the flames; spraying into the smoke or upper flame does not extinguish the fire",
                "If the fire does not go out after 10 seconds of discharge, immediately drop the extinguisher, evacuate, and close the lab door"
            ],
            "shutdown": [
                "Back away from the extinguished area; never turn your back on a fresh fire location in case of reflash",
                "Lay the discharged extinguisher horizontally on the floor to signal that it is empty",
                "Report immediately to laboratory safety officer for recharging and incident reporting"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Fire extinguisher access"],
            "hazards": ["Smoke and toxic gas inhalation", "Thermal burn injury", "Explosive re-ignition", "Frostbite from CO2 horns"],
            "warnings": [
                "NEVER use water or standard CO2 extinguishers on alkali metal fires (Sodium, Potassium, Lithium); causes violent hydrogen explosions (use Class D dry powder)",
                "Never let a fire get between you and your exit door"
            ],
            "actionsToAvoid": [
                "Do not squeeze the handle while trying to pull the safety pin (jams pin tight)",
                "Do not attempt to fight fires with toxic fuming gases without SCBA gear"
            ],
            "emergencyGuidance": [
                "If fire cannot be extinguished immediately, pull the nearest wall fire alarm station, evacuate the building, and call 911",
                "Close doors behind you as you evacuate to contain fire and smoke"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe cylinder body with a damp cloth",
                "Clean dry chemical residue from surfaces using a HEPA vacuum and damp wipes; powder is mildly corrosive to metals"
            ],
            "storageInstructions": [
                "Mount securely on wall brackets or in recessed cabinets at a height of 1 to 1.5 meters along primary escape corridors",
                "Keep area around extinguisher completely unobstructed"
            ],
            "maintenanceChecks": [
                "Monthly visual inspection: check that pressure gauge needle is in the green zone, pull pin and tamper seal are intact, and inspection tag is signed",
                "Annual certification and 6/12-year hydrostatic pressure testing by certified fire safety technicians"
            ],
            "troubleshooting": [
                {
                    "problem": "Pressure gauge needle is in the red 'RECHARGE' zone",
                    "possibleCauses": ["Slow nitrogen propellant leak; valve seal failure"],
                    "solution": ["Remove from service immediately and replace with a fully charged unit; send for professional recharge"],
                    "prevention": ["Perform monthly visual checks of pressure gauge"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Safety pin is jammed and cannot be pulled out",
                    "possibleCauses": ["Operator was squeezing the carrying handle tightly while pulling, jamming the pin against the lever"],
                    "solution": ["Release grip on top squeeze lever; carry by lower fixed handle only and pull pin straight out"],
                    "prevention": ["Train on PASS technique: never squeeze handle until ready to discharge"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Dry chemical powder failed to discharge when lever was squeezed",
                    "possibleCauses": ["Compacted powder at bottom from years of immobility; discharged cylinder"],
                    "solution": ["Invert extinguisher and shake firmly before operating, or deploy backup extinguisher"],
                    "prevention": ["Invert dry chemical extinguishers monthly during visual inspections"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Aiming the extinguisher spray into the middle of the flames or smoke",
                    "whyItMatters": "The extinguishing agent blows through the flames without smothering the burning fuel, wasting the 10-second charge",
                    "howToAvoid": "Always aim the discharge nozzle directly at the base of the fire where the fuel is burning"
                },
                {
                    "mistake": "Using a standard water or CO2 fire extinguisher on a burning sodium or potassium metal fire",
                    "whyItMatters": "Alkali metals react violently with water and CO2, causing immediate massive explosions and showering molten metal",
                    "howToAvoid": "Use only a certified Class D dry powder extinguisher or dry sand bucket on combustible metal fires"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "safety-shower",
                "relationship": "complementary",
                "reason": "If a person's clothing catches fire, the safety shower or fire blanket is used rather than spraying with chemical extinguishers.",
                "difference": "The safety shower extinguishes people; fire extinguishers fight equipment and structural fires."
            },
            {
                "equipmentId": "first-aid-kit",
                "relationship": "complementary",
                "reason": "Provides burn dressings and treatment supplies after fire suppression.",
                "difference": "The fire extinguisher suppresses the fire; the first aid kit treats resulting injuries."
            },
            {
                "equipmentId": "bunsen-burner",
                "relationship": "complementary",
                "reason": "Bunsen burners are a common open flame source requiring nearby fire extinguisher availability.",
                "difference": "The burner produces controlled flame; the extinguisher controls accidental fires."
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
                    "title": "NFPA 10: Standard for Portable Fire Extinguishers",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "National Fire Protection Standard",
                    "supports": ["Classification of fires (A, B, C, D), mounting heights, PASS protocol, monthly inspection rules"]
                },
                {
                    "title": "OSHA 29 CFR 1910.157: Portable Fire Suppression Equipment",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Regulation",
                    "supports": ["Laboratory employer training mandates, hydrostatic testing requirements"]
                }
            ]
        }
    },

    # 48. First-aid Kit
    {
        "id": "first-aid-kit",
        "pdfNumber": 48,
        "pdfName": "First-aid Kit",
        "pdfMainUse": "Providing basic first aid",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "First-aid Kit",
        "category": "Safety Equipment",
        "purpose": "Provides immediate medical supplies for treating minor cuts, burns, chemical splashes, and scrapes.",
        "image": {
            "src": "assets/images/equipment/first-aid-kit.svg",
            "alt": "Wall-mounted green and white metal emergency laboratory first aid cabinet with cross insignia",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/first-aid-kit.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A wall-mounted or portable moisture-proof case packed with standardized emergency first-aid supplies customized for chemical laboratory hazards. Stocked with sterile gauze pads, adhesive bandages, antiseptic wipes, burn gel dressings, eye pads, forceps, and chemical burn neutralizing rinses.",
        "alternativeNames": ["Emergency medical kit", "Lab first aid box", "First aid cabinet"],
        "commonUses": [
            "Dressing minor glass puncture wounds and cuts from chipped glassware",
            "Applying sterile hydrogel dressings to minor first-degree thermal contact burns",
            "Providing sterile eye pads to shield eyes after 15-minute emergency eyewash flushing",
            "Covering scrapes and minor skin abrasions before returning to non-hazardous work"
        ],
        "types": [
            "Class A / Class B ANSI-compliant industrial first aid cabinet (multi-shelf wall unit for 25-50 people)",
            "Portable first aid response kit (rugged, water-resistant plastic case with carrying handle)",
            "Specialized chemical burn response kit (includes calcium gluconate gel for hydrofluoric acid or Diphoterine)"
        ],
        "specifications": {
            "material": ["Powder-coated steel or high-impact polypropylene case", "Neoprene gasket seal"],
            "capacity": {
                "value": "25 to 50",
                "unit": "people",
                "notes": "Standard student laboratory cabinet is ANSI/ISEA Z308.1 Class B compliant for up to 50 lab occupants."
            },
            "dimensions": "~380 × 260 × 120 mm (standard 3-shelf wall cabinet)",
            "mainParts": ["Wall-mountable locking case with carry handle", "Interior organized shelf compartments", "Standardized contents checklist", "Emergency first-aid guidance booklet"],
            "partsAndFunctions": [
                {
                    "partName": "Sterile gauze pads and adhesive bandages",
                    "function": "Covers and protects minor glass cuts from chemical contamination and arrests minor bleeding",
                    "handlingNotes": "Keep packaging sterile until application."
                },
                {
                    "partName": "Burn relief hydrogel dressings",
                    "function": "Cools minor thermal contact burns and provides moist pain-relieving protection",
                    "handlingNotes": "Apply only after cooling burn under water for 10 minutes."
                },
                {
                    "partName": "Sterile eye pads and adhesive tape",
                    "function": "Shields injured eyes after full 15-minute flushing during transport to emergency medical facility",
                    "handlingNotes": "Do not apply pressure to the eyeball."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: emergency first aid treatment supply kit."
            },
            "limitations": [
                "Designed strictly for MINOR injuries; severe lacerations, deep chemical burns, or shock require immediate 911 emergency medical transport",
                "Contains NO prescription medications or oral drugs (aspirin, pain pills) per standard lab safety regulations",
                "Supplies expire and must be inspected and restocked regularly"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Know the location of the first aid kit upon entering the lab (usually mounted near the exit door)",
                "Ensure cabinet is unlocked and easily accessible without a key during working hours",
                "Check that the interior checklist and emergency numbers are visible"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Incident Assessment",
                    "instruction": "Assess the injury. If severe bleeding, chemical ingestion, or extensive burn occurs, call 911 immediately."
                },
                {
                    "step": 2,
                    "title": "Primary Decontamination First",
                    "instruction": "For chemical exposures or burns, ALWAYS complete the full 15-minute water flush (eyewash or shower) BEFORE applying any first aid kit supplies."
                },
                {
                    "step": 3,
                    "title": "Treatment of Minor Cuts",
                    "instruction": "Wash cut under clean water with mild soap, apply gentle pressure with a sterile gauze pad to stop bleeding, apply antiseptic, and dress with a sterile bandage."
                },
                {
                    "step": 4,
                    "title": "Reporting",
                    "instruction": "Report every laboratory injury, no matter how minor, to the instructor and fill out an institutional incident report form."
                }
            ],
            "handlingTips": [
                "Never apply burn creams or ointments to a chemical burn before washing; water flushing is the mandatory first step",
                "Always wear clean nitrile gloves when administering first aid to a bleeding lab partner to prevent bloodborne pathogen exposure"
            ],
            "shutdown": [
                "Close and latch the first aid cabinet door",
                "Note any consumed supplies on the restocking card",
                "Inform lab manager so used items are promptly replenished"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Clean nitrile gloves (for first aid administrator)", "Safety goggles"],
            "hazards": ["Bloodborne pathogen exposure", "Delayed treatment of deep chemical burns", "Expired medical supplies"],
            "warnings": [
                "First aid supplies do NOT replace professional emergency medical treatment for severe injuries",
                "NEVER apply burn ointments or butter to a fresh chemical burn; flush with water for 15 minutes first"
            ],
            "actionsToAvoid": [
                "Do not lock the first aid cabinet during active laboratory sessions",
                "Do not dispense oral medications (e.g. ibuprofen, Tylenol) to students"
            ],
            "emergencyGuidance": [
                "For severe arterial bleeding, apply continuous direct pressure with sterile trauma pad and call 911",
                "Notify emergency medical responders of the specific chemical identity involved"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe exterior metal or plastic case with disinfectant wipes monthly",
                "Discard any opened, soiled, or contaminated bandage packets"
            ],
            "storageInstructions": [
                "Mounted on wall near primary exit door at eye level with clear green cross signage",
                "Keep cabinet securely latched to protect contents from laboratory chemical fumes"
            ],
            "maintenanceChecks": [
                "Conduct monthly inventory inspection against the ANSI checklist; restock depleted items immediately",
                "Check expiration dates on sterile dressings, antiseptic wipes, and burn gels semi-annually"
            ],
            "troubleshooting": [
                {
                    "problem": "First aid kit is found locked during a laboratory session",
                    "possibleCauses": ["Locked by custodial staff or previous instructor"],
                    "solution": ["Unlock immediately; first aid kits must remain unlocked and accessible during all working hours"],
                    "prevention": ["Post policy: emergency medical equipment must never be locked"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Bandages or burn dressings are missing when needed",
                    "possibleCauses": ["Supplies used previously without reporting for restocking"],
                    "solution": ["Restock immediately from central safety stores; enforce logging of used items"],
                    "prevention": ["Conduct monthly mandatory inventory checks with sign-off card"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Antiseptic wipes or burn gel packets have dried out",
                    "possibleCauses": ["Packets exceeded manufacturer expiration shelf-life (typically 3-5 years)"],
                    "solution": ["Discard expired packets and restock with fresh certified supplies"],
                    "prevention": ["Log expiration dates on the internal door inspection card"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Applying burn cream or ointment to a chemical burn immediately instead of flushing with water",
                    "whyItMatters": "Creams seal the corrosive chemical into the skin, accelerating deep tissue necrosis and severe scarring",
                    "howToAvoid": "Always flush chemical burns under running water for at least 15 minutes before applying any dressing"
                },
                {
                    "mistake": "Treating a deep glass laceration in the lab without reporting to medical staff",
                    "whyItMatters": "Glass shards or chemical contaminants trapped in the wound cause severe delayed infections and nerve damage",
                    "howToAvoid": "Always report injuries to the instructor and seek professional campus health evaluation"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "eyewash-station",
                "relationship": "complementary",
                "reason": "Eye pads from the first aid kit protect the eye after the required 15-minute eyewash decontamination.",
                "difference": "The eyewash performs the active chemical wash; the first aid kit provides secondary wound dressing."
            },
            {
                "equipmentId": "safety-shower",
                "relationship": "complementary",
                "reason": "Used in tandem: after showering off a spill, first aid supplies are used for minor cuts or burns.",
                "difference": "The safety shower is the primary drench station; the first aid kit provides wound supplies."
            },
            {
                "equipmentId": "forceps",
                "relationship": "complementary",
                "reason": "Clean forceps are included in first aid kits to handle sterile dressings and remove superficial splinters.",
                "difference": "The forceps is an instrument tool; the first aid kit is the complete medical supply container."
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
                    "title": "ANSI/ISEA Z308.1-2021: American National Standard for Minimum Requirements for Workplace First Aid Kits and Supplies",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "National Standard",
                    "supports": ["Class A and B kit contents, burn dressing standards, packaging sterility rules"]
                },
                {
                    "title": "OSHA 29 CFR 1910.151: Medical Services and First Aid",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Regulation",
                    "supports": ["First aid supply availability, incident documentation mandates"]
                }
            ]
        }
    },

    # 49. Chemical Waste Container
    {
        "id": "chemical-waste-container",
        "pdfNumber": 49,
        "pdfName": "Chemical Waste Container",
        "pdfMainUse": "Collecting chemical waste",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "Chemical Waste Container",
        "category": "Safety Equipment",
        "purpose": "Collects and segregates spent chemical reaction wastes safely for regulatory hazardous disposal.",
        "image": {
            "src": "assets/images/equipment/chemical-waste-container.svg",
            "alt": "Heavy-duty HDPE chemical waste carboy with vapor-trapping safety funnel, secondary containment tub, and hazardous waste label",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/chemical-waste-container.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A heavy-duty, chemically compatible high-density polyethylene (HDPE) or glass jug equipped with a vapor-locking safety funnel, tightly sealing screw closure, hazardous waste labeling, and a spill-containment basin. Segregates incompatible waste streams (halogenated solvents, non-halogenated solvents, acids, heavy metals) to prevent catastrophic chemical reactions.",
        "alternativeNames": ["Waste carboy", "Hazardous waste bottle", "Solvent waste jug", "Chemical disposal carboy"],
        "commonUses": [
            "Collecting spent organic solvents (acetone, ether, ethanol, hexane) from reactions and washings",
            "Accumulating neutralized aqueous heavy metal waste solutions (e.g. copper, lead, chromium)",
            "Segregating halogenated solvents (dichloromethane, chloroform) from non-halogenated waste",
            "Holding spent acid and base titration residues prior to environmental treatment"
        ],
        "types": [
            "Non-halogenated organic solvent waste carboy (typically HDPE, 5 L to 20 L with flame arrestor safety funnel)",
            "Halogenated solvent waste carboy (dedicated specifically for DCM, chloroform; prevents high incineration disposal costs)",
            "Aqueous heavy metal / toxic waste carboy (for inorganic salts of silver, mercury, lead, copper)",
            "Solid chemical waste jar (wide-mouth plastic pail for contaminated filter paper, pipettes, and weighing boats)"
        ],
        "specifications": {
            "material": ["High-density polyethylene (HDPE)", "Fluorinated polyethylene", "Amber borosilicate glass (for corrosive oxidizers)", "Polypropylene secondary containment basin"],
            "capacity": {
                "value": "4 to 20",
                "unit": "L",
                "notes": "Standard student laboratory carboys hold 4 L, 10 L, or 20 L (5 gallons); must never be filled beyond 80% capacity."
            },
            "dimensions": "Height ~350 mm to 500 mm, Diameter ~250 mm (typical 10 L carboy)",
            "mainParts": ["HDPE heavy-walled carboy body", "Vapor-trapping hinged safety funnel with flame arrestor", "Tightly sealing threaded cap", "Secondary containment basin tray", "Hazardous chemical waste label"],
            "partsAndFunctions": [
                {
                    "partName": "Vapor-trapping hinged safety funnel",
                    "function": "Allows easy liquid pouring while automatic spring-loaded lid seals vapors inside when closed",
                    "handlingNotes": "Keep funnel lid latched shut whenever not actively pouring waste."
                },
                {
                    "partName": "Secondary containment basin tray",
                    "function": "Contains 110% of carboy volume in case the primary container leaks or punctures",
                    "handlingNotes": "Keep basin clean and dry; check for leaks."
                },
                {
                    "partName": "Hazardous chemical waste label",
                    "function": "Identifies exact chemical contents, accumulation start date, hazard warnings, and generator name per EPA/RCRA rules",
                    "handlingNotes": "Log every added chemical solvent and volume."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: environmental and safety waste containment vessel."
            },
            "limitations": [
                "Mixing incompatible chemicals (e.g. nitric acid into acetone) causes violent explosions and fires inside the carboy",
                "Must NEVER be filled to 100% full; requires 20% vapor headspace to prevent hydrostatic over-pressurization",
                "Standard polyethylene carboys are degraded by prolonged exposure to concentrated nitric acid"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Read the chemical waste label on the carboy to confirm exact waste stream (e.g., 'Non-Halogenated Organic Solvents')",
                "Verify the carboy is resting inside a secondary containment basin",
                "Confirm that the fluid level is below the 80% maximum fill line"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Compatibility Verification",
                    "instruction": "Confirm that your waste liquid is chemically compatible with the designated container. NEVER mix oxidizers with organics, or acids with cyanides/sulfides."
                },
                {
                    "step": 2,
                    "title": "Opening Funnel",
                    "instruction": "Unlatch the spring-loaded lid of the safety funnel."
                },
                {
                    "step": 3,
                    "title": "Pouring Waste",
                    "instruction": "Pour waste liquid steadily through the funnel into the carboy without splashing. Do not drop solid stir bars or paper inside."
                },
                {
                    "step": 4,
                    "title": "Re-sealing and Logging",
                    "instruction": "Immediately close and latch the funnel lid. Record the chemical name and approximate volume added on the waste log sheet."
                }
            ],
            "handlingTips": [
                "Keep the container tightly closed at all times except when actively pouring waste into it (strict EPA/OSHA regulation)",
                "Stop adding waste when the fluid level reaches the shoulder (80% capacity) to leave headspace for vapor expansion"
            ],
            "shutdown": [
                "Verify funnel lid is firmly latched and airtight",
                "Wipe down any drips from the funnel or neck",
                "Notify laboratory technician for removal when container reaches 80% fill line"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Operate under fume hood if vapors are volatile"],
            "hazards": ["Catastrophic carboy explosion from incompatible chemical reactions", "Toxic vapor accumulation in lab", "Chemical leakage onto floor"],
            "warnings": [
                "NEVER mix concentrated nitric acid with organic solvent waste (forms explosive organic nitrates that blow carboys apart)",
                "Never dump chemical waste down the laboratory sink drain"
            ],
            "actionsToAvoid": [
                "Do not leave the waste container open or unlatched",
                "Do not overfill past 80% capacity",
                "Do not mix halogenated and non-halogenated waste unless explicitly directed"
            ],
            "emergencyGuidance": [
                "If a waste carboy starts hissing, bulging, or fuming, immediately evacuate the room, pull sash down, and notify emergency responders",
                "Deploy spill response pillows if secondary containment basin breaches"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Chemical waste carboys are managed by certified environmental health and safety (EHS) waste contractors",
                "Wipe exterior bottle and secondary containment tray with damp cloth if drips occur"
            ],
            "storageInstructions": [
                "Store inside a dedicated, ventilated chemical waste storage area or fume hood",
                "Must sit inside secondary containment tubs at all times"
            ],
            "maintenanceChecks": [
                "Inspect containers weekly for bulging, stress cracking, discolored plastic, or leaks",
                "Check that hazardous waste labels are fully filled out with dates, hazard classes, and chemical names"
            ],
            "troubleshooting": [
                {
                    "problem": "Plastic waste carboy is bulging outward and warm to the touch",
                    "possibleCauses": ["Incompatible chemicals were mixed (e.g. acid + organic solvent, or bleach + ammonia), generating gas and heat"],
                    "solution": ["DO NOT TOUCH; immediately evacuate the room, pull fume hood sash down, alert instructor, and call hazardous materials response team"],
                    "prevention": ["Always double check waste compatibility before pouring"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Chemical waste container is completely filled to the brim",
                    "possibleCauses": ["Students continued adding waste past the 80% fill line without reporting full status"],
                    "solution": ["Cap container immediately; replace with a new empty carboy from stock and notify lab technician"],
                    "prevention": ["Monitor fill levels daily and retire containers at 80% capacity"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Liquid detected pooling inside the secondary containment tray",
                    "possibleCauses": ["Primary carboy has a seam leak or cracked base; liquid spilled during pouring"],
                    "solution": ["Determine if carboy is leaking; if leaking, transfer contents into fresh carboy and dispose of cracked container"],
                    "prevention": ["Inspect carboys for wear and handle gently"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Pouring concentrated nitric acid into an organic solvent waste carboy (e.g. acetone or ethanol)",
                    "whyItMatters": "Nitric acid oxidizes organics in an violently exothermic reaction, producing nitrogen dioxide gas that over-pressurizes and explodes the carboy in a fireball",
                    "howToAvoid": "Always neutralize and collect strong oxidizing acids in separate, dedicated inorganic acid waste containers"
                },
                {
                    "mistake": "Leaving the waste funnel lid open and unlatched all afternoon",
                    "whyItMatters": "Volatile toxic and carcinogenic solvent vapors evaporate continuously into the room, violating federal EPA air standards and sickening occupants",
                    "howToAvoid": "Close and latch the funnel lid immediately after every single liquid pour"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "fume-hood",
                "relationship": "complementary",
                "reason": "Chemical waste carboys are frequently housed inside fume hoods so solvent pouring fumes are exhausted safely.",
                "difference": "The fume hood provides the ventilated environment; the waste container stores the liquid waste."
            },
            {
                "equipmentId": "glass-funnel",
                "relationship": "complementary",
                "reason": "Used to guide waste liquids cleanly into narrow-mouth carboys without splashing.",
                "difference": "The funnel is a pouring guide; the waste carboy is the certified containment vessel."
            },
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Spent reaction solutions are collected in beakers at the bench before disposal in the central waste container.",
                "difference": "The beaker is an open temporary bench vessel; the waste carboy is the regulatory storage container."
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
                    "title": "EPA Resource Conservation and Recovery Act (RCRA) 40 CFR Part 262: Standards Applicable to Generators of Hazardous Waste",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Environmental Regulation",
                    "supports": ["Closed container rule, chemical segregation, secondary containment, labeling mandates"]
                },
                {
                    "title": "Prudent Practices in the Laboratory: Handling and Management of Chemical Hazards",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Chemical compatibility matrices, solvent waste handling, explosion prevention"]
                }
            ]
        }
    },

    # 50. pH Indicator Paper
    {
        "id": "ph-indicator-paper",
        "pdfNumber": 50,
        "pdfName": "pH Indicator Paper",
        "pdfMainUse": "Estimating acidity or alkalinity",
        "pdfGroup": "Safety, measurement and accessories",
        "name": "pH Indicator Paper",
        "category": "pH and Analytical Instruments",
        "purpose": "Estimates solution pH rapidly across a 1 to 14 scale by color comparison against a reference chart.",
        "image": {
            "src": "assets/images/equipment/ph-indicator-paper.svg",
            "alt": "Plastic dispenser reel of yellow universal pH indicator paper strip with 1-14 color comparison chart",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/ph-indicator-paper.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "Cellulose paper strips impregnated with a calibrated mixture of multiple pH-sensitive organic dye indicators (such as methyl red, bromothymol blue, and phenolphthalein). Changes color across the full pH range from 1 to 14, providing quick, inexpensive visual estimation of acidity or alkalinity by comparison to a printed reference chart.",
        "alternativeNames": ["Universal indicator paper", "Litmus paper", "pH test strips", "Hydrion paper"],
        "commonUses": [
            "Quickly estimating the pH of reaction mixtures, aqueous extractions, and washings",
            "Verifying neutralization of acidic or basic chemical waste prior to drain disposal",
            "Monitoring reaction progress in acid- or base-catalyzed syntheses",
            "Testing pool water, soil runoff, and environmental water samples"
        ],
        "types": [
            "Universal pH paper (full range pH 1 to 14, resolution ~1 pH unit)",
            "Narrow-range pH test strips (e.g. pH 4.0 to 7.0 or 6.0 to 8.0, resolution ~0.2 to 0.5 pH units with multiple test pads)",
            "Litmus paper (simple binary test: red litmus turns blue in base, blue litmus turns red in acid)"
        ],
        "specifications": {
            "material": ["High-purity cellulose paper", "Universal indicator dye formulation (thymol blue, methyl red, bromothymol blue, phenolphthalein)", "Plastic dispenser reel or vial"],
            "capacity": {
                "value": "1 to 14",
                "unit": "pH",
                "notes": "Full-range universal paper covers pH 1 through 14 in whole integer steps."
            },
            "dimensions": "Roll length ~5 meters × 7 mm wide (dispenser roll), or pre-cut strips ~50 × 6 mm",
            "mainParts": ["Impregnated yellow/orange cellulose test paper", "Plastic dispenser reel with serrated tear-off edge", "Calibrated 1-14 color matching chart"],
            "partsAndFunctions": [
                {
                    "partName": "Impregnated cellulose test paper",
                    "function": "Undergoes reversible chemical protonation/deprotonation, shifting color according to hydronium ion concentration",
                    "handlingNotes": "Keep dry; handle only with dry fingers at the non-test end."
                },
                {
                    "partName": "Calibrated color matching chart",
                    "function": "Provides standard reference colors corresponding to discrete pH integers (red=1, yellow=5, green=7, blue=10, purple=14)",
                    "handlingNotes": "Compare strip immediately while wet under natural or white light."
                },
                {
                    "partName": "Plastic dispenser reel",
                    "function": "Protects paper from laboratory ambient acid/base fumes and moisture",
                    "handlingNotes": "Pull and tear off ~3 cm strip per test."
                }
            ],
            "measurementAccuracy": {
                "value": 1.0,
                "unit": "pH",
                "notes": "Visual color estimation accuracy is typically ±1.0 pH unit for universal paper (±0.2 to 0.5 for multi-pad narrow range strips)."
            },
            "limitations": [
                "Provides only an estimate; cannot provide 2-decimal precision (use an electronic pH meter for analytical accuracy)",
                "Intensely colored, dark, or turbid solutions obscure the strip color change",
                "Strong bleaching agents (e.g. sodium hypochlorite) bleach the indicator dyes white, giving misleading results"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect dispenser to ensure paper has not been discolored by ambient laboratory acid vapors (should be uniform orange-yellow)",
                "Tear off a small 2 to 3 cm piece of test paper using the serrated dispenser edge",
                "Place the strip on a clean watch glass or dry paper towel"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Sampling with Glass Rod",
                    "instruction": "Dip the clean tip of a glass stirring rod into the test solution to pick up a small drop."
                },
                {
                    "step": 2,
                    "title": "Spotting the Paper",
                    "instruction": "Touch the wet tip of the glass rod onto the center of the pH paper strip. NEVER dip the paper strip directly into the main chemical reagent bottle."
                },
                {
                    "step": 3,
                    "title": "Color Development",
                    "instruction": "Allow 5 to 10 seconds for the color reaction to stabilize."
                },
                {
                    "step": 4,
                    "title": "Comparison",
                    "instruction": "Hold the wet strip next to the printed color chart on the dispenser under good white light, and read the matching pH number."
                }
            ],
            "handlingTips": [
                "Never dip the pH paper directly into your stock reaction flask; always touch a droplet onto the paper using a clean glass stirring rod",
                "Read the color match while the paper is still moist; as the paper dries out, colors shift and become inaccurate"
            ],
            "shutdown": [
                "Discard used test strips into solid laboratory waste",
                "Rinse glass stirring rod with deionized water",
                "Store the pH paper dispenser sealed inside its protective container"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical skin contact from wet test strips", "Misjudging strongly corrosive pH levels", "Cross-contamination"],
            "warnings": [
                "Never touch the wet, chemical-soaked portion of the test strip with bare fingers",
                "Do not rely on pH paper alone for critical toxic neutralization protocols"
            ],
            "actionsToAvoid": [
                "Do not dip the paper strip directly into stock chemical bottles (contaminates reagent)",
                "Do not store open pH paper rolls in acid or ammonia storage cabinets"
            ],
            "emergencyGuidance": [
                "If corrosive acid or base from a test strip contacts skin, wash immediately under running water for 15 minutes",
                "Dispose of chemical-soaked paper in solid hazardous waste"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "pH indicator paper is a single-use consumable and cannot be cleaned or reused",
                "Wipe plastic dispenser case with a damp cloth if soiled"
            ],
            "storageInstructions": [
                "Store in a tightly closed container in a cool, dry place away from direct sunlight",
                "Keep far away from acid or ammonia storage cabinets where atmospheric fumes turn paper red or blue"
            ],
            "maintenanceChecks": [
                "Examine unused paper roll before use: if roll shows red or blue edges, paper is contaminated and must be discarded",
                "Test response with a drop of 0.1 M HCl (should turn bright red) and 0.1 M NaOH (should turn deep violet)"
            ],
            "troubleshooting": [
                {
                    "problem": "Unused paper in dispenser is already discolored pink or blue before testing",
                    "possibleCauses": ["Dispenser was left open on the bench and absorbed ambient HCl or ammonia fumes"],
                    "solution": ["Discard contaminated portion of the roll until fresh orange-yellow paper is reached, or replace dispenser"],
                    "prevention": ["Always keep dispenser closed and store away from volatile chemical fumes"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "The paper strip turns white after a brief flash of color",
                    "possibleCauses": ["Solution contains a strong oxidizer or bleaching agent (chlorine, bleach, peroxide) that destroys dyes"],
                    "solution": ["Use a calibrated electronic glass-electrode pH meter for bleach/oxidizer solutions"],
                    "prevention": ["Recognize that strong oxidizers bleach indicator dyes"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Test strip color falls between two distinct color chart patches",
                    "possibleCauses": ["Solution pH is intermediate between integer steps (e.g. pH 6.5)"],
                    "solution": ["Estimate intermediate value (e.g. 6.5) or switch to a narrow-range pH test strip or pH meter"],
                    "prevention": ["Use narrow-range indicator strips for tighter pH windows"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Dipping the pH paper strip directly into the reaction beaker or stock reagent bottle",
                    "whyItMatters": "Chemical dyes and paper fibers leach into the reaction, contaminating the entire chemical solution",
                    "howToAvoid": "Always use a clean glass stirring rod to touch a single micro-drop onto the paper resting on a watch glass"
                },
                {
                    "mistake": "Waiting 10 minutes until the paper is completely dry before reading the color chart",
                    "whyItMatters": "Drying and atmospheric carbon dioxide shift the indicator colors significantly, giving completely false pH readings",
                    "howToAvoid": "Compare the strip against the color chart immediately while wet (within 10-30 seconds)"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "ph-indicator-solution",
                "relationship": "alternative",
                "reason": "Both use pH indicator dyes to estimate acidity, but paper does not contaminate the bulk solution.",
                "difference": "pH paper is applied to an external droplet; indicator solution is added directly into the reaction mixture."
            },
            {
                "equipmentId": "laboratory-ph-meter",
                "relationship": "alternative",
                "reason": "Laboratory pH meters provide precision digital readings (±0.01 pH) compared to approximate visual paper estimation.",
                "difference": "pH paper estimates to ±1 pH unit visually; a pH meter measures to 0.01 pH electronically."
            },
            {
                "equipmentId": "glass-stirring-rod",
                "relationship": "complementary",
                "reason": "The glass rod is used to transfer a small droplet of solution onto the pH paper safely.",
                "difference": "The glass rod transfers the droplet; the pH paper performs the colorimetric measurement."
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
                    "title": "ASTM E70 - Standard Test Method for pH of Aqueous Solutions with the Glass Electrode",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["pH definition, limitations of colorimetric indicator methods"]
                },
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Indicator color transitions, spotting techniques, pH paper ranges"]
                }
            ]
        }
    }
]

print(f"Items 41-50 loaded: {len(ITEMS_41_TO_50)}")
