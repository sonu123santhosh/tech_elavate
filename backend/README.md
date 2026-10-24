# 🧪 Smart Lab Assistant — Backend Service

Created by **Person 4** (Team UNEMPLOYED 004).

## Overview
This backend service provides a validated, secure endpoint for the **AI Lab Assistant**, built using Express and the official Google Gen AI JavaScript SDK (`@google/genai`).

## Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/):
   ```env
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   GEMINI_API_KEY=AIzaSy...
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Production start:
   ```bash
   npm start
   ```

## Endpoints

### `GET /api/health`
Checks server status and whether Gemini API key is configured.
```json
{
  "status": "ok",
  "service": "Smart Lab Equipment Assistant API",
  "geminiConfigured": true,
  "model": "gemini-2.5-flash",
  "timestamp": "2026-10-24T04:15:00.000Z"
}
```

### `POST /api/chat`
Sends a message to the AI Assistant with rate limiting and laboratory system prompt enforcement.
- **Request Body:**
  ```json
  {
    "message": "Why does pH rise sharply near the equivalence point?",
    "history": [
      { "role": "user", "text": "What is acetic acid?" },
      { "role": "assistant", "text": "Acetic acid (CH3COOH) is a weak monobasic acid..." }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "reply": "Near the equivalence point, the buffering capacity of the acetate buffer system is exhausted...",
    "model": "gemini-2.5-flash",
    "timestamp": "2026-10-24T04:15:02.000Z"
  }
  ```
