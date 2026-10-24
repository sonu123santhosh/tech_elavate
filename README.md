#  AI-Powered Smart Lab Equipment Assistant — Unified Platform
## Tech Elevate • Team UNEMPLOYED 004

A state-of-the-art interactive chemistry laboratory platform unifying **15 curriculum experiments**, **8 interactive 2D simulations**, a **62-tool ground truth equipment catalog**, **custom Google Teachable Machine AI camera detection**, **AR quizzes**, and a **Gemini-powered AI voice lab assistant**.

---

##  Platform Capabilities

| Module | URL Hash | Description |
| :--- | :--- | :--- |
| ** AI Equipment Scanner** | `#scanner` | Live camera stream or document/image upload classified using custom **Google Teachable Machine model** (`BlF4tNf8j`). Instant detection feedback and equipment lookup. |
| ** Virtual Lab (15 Experiments)** | `#experiments` | Complete 15 engineering chemistry experiments with step checklists, dynamic observation tables, formulas, and auto-graded quizzes. |
| ** 2D Lab Simulator** | `#simulator` | Playable 2D simulation workbench with 8 setups (Titration, Simple Distillation, Gravity & Vacuum Filtration, Recrystallization, Paper Chromatography, Standard Solution Preparation, pH Determination, pH-Metric Titration). |
| ** 62 Equipment Database** | `#equipment` | Ground truth technical specifications, high-res photos, thermal limits, precision tolerances, safety warnings, and maintenance for 62 lab tools. |
| ** AR Lab & Quizzes** | `#ar-quiz` | Interactive equipment flashcards and multiple-choice quizzes with instant feedback. |
| ** AI Lab Assistant** | `#chat` | Conversational voice and chat assistant powered by Google Gemini, equipped with safety guards and LaTeX chemical formula rendering. |

---

##  Quick Start (One Command)

### Prerequisites
* **Node.js** v18+ (tested on Node v24)
* **npm** v9+

### 1. Install & Launch Everything Concurrently
From the project root:
```bash
# Starts both Backend Express API (port 5000) and Frontend Vite App (port 5173)
npm run dev
```

### 2. Access the Application
* **Frontend Application:** [http://localhost:5173/](http://localhost:5173/)
* **Backend REST API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

##  Full Architecture & Tech Stack

```
tech_elevate/
├── backend/                       # Express REST API (Port 5000)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── chatController.js            # Gemini AI chat handler
│   │   │   ├── equipmentCatalogController.js# 62 tools & simulator API
│   │   │   ├── experimentController.js      # 15 virtual experiments API
│   │   │   └── quizController.js            # Authoritative quiz evaluation
│   │   ├── routes/                          # Express route definitions
│   │   └── server.js                        # Server entry with CORS & rate limiting
│   └── .env.example                         # Port & Gemini API key configuration
│
├── frontend/                      # Vite Single Page Application (Port 5173)
│   ├── public/
│   │   ├── assets/equipment/                # High-res photos for all 62 lab tools
│   │   ├── equipment-db/                    # Ground truth equipment.json & categories
│   │   ├── simulator/                       # Content definitions for 2D simulator
│   │   └── simulator.html                   # Interactive 2D simulator canvas
│   ├── src/
│   │   ├── features/
│   │   │   ├── camera-scanner/              # Google Teachable Machine Camera Scanner
│   │   │   │   └── CameraScannerView.js
│   │   │   ├── equipment-viewer/            # 62 Tools Database & AI Scanner
│   │   │   │   └── EquipmentDatabaseView.js
│   │   │   ├── simulator/                   # 2D Interactive Simulator Workbench
│   │   │   │   └── SimulatorView.js
│   │   │   ├── virtual-lab/                 # 15 Virtual Chemistry Experiments
│   │   │   │   ├── VirtualLabDashboardView.js
│   │   │   │   ├── ExperimentDetailView.js
│   │   │   │   └── VirtualLabController.js
│   │   │   ├── ph-titration/                # pH-Metric Titration Simulator
│   │   │   ├── conductometric-titration/    # Conductometric Titration Simulator
│   │   │   ├── ar-quiz/                     # AR Quizzes & Flashcards
│   │   │   └── ai-assistant/                # Gemini Voice & Markdown Chat Assistant
│   │   └── main.js                          # SPA Router & state machine
│   └── vite.config.js                       # Proxying /api to http://localhost:5000
│
└── tests/                                   # Unit & Integration Tests (55 test cases)
```

---

##  Testing
Run the authoritative test suite:
```bash
npm test
```
All 55 tests covering backend API endpoints, calculation math, quiz state machines, chat rendering, voice synthesis, and safety checks pass.

---

##  Team
**Tech Elevate • Team UNEMPLOYED 004**
