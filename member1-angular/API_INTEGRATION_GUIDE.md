# SmartLab AI — Scanner Integration Guide for External Websites
**Team UNEMPLOYED 004 | Tech Elevate Hackathon**

This guide provides instructions and copy-paste code snippets for integrating the SmartLab AI Equipment Scanner into any external website, mobile app, or frontend framework (HTML/JS, React, Next.js, Vue, Angular, Python, etc.).

---

## 1. Quick Overview

Your SmartLab AI backend runs as an Express API service with **CORS enabled by default** (`app.use(cors())`), allowing external domains to make direct requests without cross-origin blocks.

- **Local Endpoint:** `http://localhost:3000/api/identify-equipment`
- **Production Endpoint:** `https://your-domain.com/api/identify-equipment`
- **Method:** `POST`
- **Content-Type:** `application/json`

---

## 2. What to Send (Request Format)

Send an HTTP `POST` request with a JSON body containing a base64-encoded image string:

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "mimeType": "image/jpeg"
}
```

### Parameters:
| Field | Type | Required | Description |
|---|---|---|---|
| `image` | `string` | **Yes** | Either a Base64 Data URL (`data:image/jpeg;base64,...`) or raw base64 string. Supports JPEG, PNG, and WebP (up to 10MB). |
| `mimeType` | `string` | Optional | MIME type of the image (`image/jpeg`, `image/png`, or `image/webp`). Defaults to `image/jpeg`. |

---

## 3. What You Receive Back (Response Format)

The SmartLab AI backend passes the image to the **Google Gemini Multimodal Vision API** (`@google/genai`), extracts visual attributes, and auto-matches the identified apparatus against our **73-apparatus chemistry catalog**.

### Success Response (`200 OK`):
```json
{
  "success": true,
  "source": "gemini",
  "geminiOutput": {
    "equipmentName": "Burette",
    "alternativeNames": ["Buret", "Titration Burette", "Volumetric Burette"],
    "visualDescription": "A long, vertical graduated glass tube with milliliter volumetric markings and a PTFE stopcock valve at the delivery tip.",
    "uncertaintyNote": null
  },
  "matchedCatalog": {
    "equipmentId": "burette",
    "matchedName": "Burette",
    "isConfident": true,
    "details": {
      "id": "burette",
      "name": "Burette",
      "category": "volumetric",
      "tagline": "Vertical calibrated glass column with PTFE stopcock for titrant delivery",
      "safetyPrecautions": [
        "Lower burette to chest level when filling to avoid pouring caustic reagents overhead.",
        "Clamp gently using padded burette clamps."
      ],
      "specifications": [
        { "label": "Nominal Capacity", "value": "50.00 mL (0.10 mL subdivisions)" },
        { "label": "Class / Tolerance", "value": "Class A: ±0.05 mL (ISO 385)" }
      ],
      "operatingInstructions": [
        "Rinse twice with 5 mL portions of titrant before filling.",
        "Fill above 0.00 mL using a small funnel, then remove the funnel immediately.",
        "Expel trapped air bubbles from jet tip into waste before setting meniscus."
      ],
      "commonMistakes": [
        "Leaving an air bubble in the jet tip during titration.",
        "Leaving the filling funnel in the top during delivery."
      ],
      "cleaningAndStorage": "Drain immediately after use, rinse with distilled water, store inverted with stopcock open.",
      "accuracyLevel": "High Analytical (Class A)"
    }
  },
  "timestamp": "03:45 PM"
}
```

---

## 4. Integration Code Snippets

### Option A: Vanilla JavaScript / Fetch (Any Webpage)
```javascript
// 1. Read image from <input type="file" id="photoInput">
const fileInput = document.getElementById('photoInput');
const file = fileInput.files[0];

const reader = new FileReader();
reader.onload = async function(event) {
  const base64DataUrl = event.target.result; // "data:image/jpeg;base64,..."

  // 2. Send to SmartLab AI Scanner
  const response = await fetch('http://localhost:3000/api/identify-equipment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: base64DataUrl
    })
  });

  const result = await response.json();
  console.log('Identified Apparatus:', result.geminiOutput.equipmentName);
  console.log('Safety Precautions:', result.matchedCatalog?.details?.safetyPrecautions);
};
reader.readAsDataURL(file);
```

---

### Option B: React / Next.js Hook
```tsx
import { useState } from 'react';

export function useEquipmentScanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const scanImage = async (file: File) => {
    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/identify-equipment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result })
        });
        const data = await res.json();
        setResult(data);
      } catch (err) {
        setError('Failed to connect to scanner API');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return { scanImage, loading, result, error };
}
```

---

### Option C: Webcam / Live Camera Snapshot
If the other website wants to capture live video from the user's camera:
```javascript
// 1. Get webcam stream
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
const videoEl = document.querySelector('video');
videoEl.srcObject = stream;

// 2. Capture a single snapshot frame
function captureSnapshot() {
  const canvas = document.createElement('canvas');
  canvas.width = videoEl.videoWidth;
  canvas.height = videoEl.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoEl, 0, 0);

  // Convert frame to Base64 JPEG
  const base64Image = canvas.toDataURL('image/jpeg', 0.85);

  // 3. Post to SmartLab AI
  fetch('http://localhost:3000/api/identify-equipment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64Image })
  })
  .then(res => res.json())
  .then(data => console.log('Scanned Equipment:', data));
}
```

---

### Option D: Zero-Code Embedding via `<iframe>`
If the other website simply wants to display the full SmartLab Scanner UI inside their page without coding:
```html
<iframe
  src="http://localhost:4200/scanner"
  width="100%"
  height="750px"
  style="border: none; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);"
  allow="camera; microphone">
</iframe>
```

---

## 5. Additional Endpoints Available

The other website can also access the full 73-apparatus chemistry database:

| Endpoint | Method | Purpose |
|---|---|---|
| `GET /api/equipment` | `GET` | Returns list of all 73 equipment items (supports `?category=heating` and `?search=flask`) |
| `GET /api/equipment/:id` | `GET` | Returns full specifications, safety rules, and cleaning guides for any item (e.g. `/api/equipment/burette`) |
| `GET /api/health` | `GET` | Check API health, uptime, and Gemini key configuration |
