import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient = null;

export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null;
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }

  return aiClient;
}

export const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

export const FALLBACK_MODELS = [
  DEFAULT_MODEL,
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3.8-flash',
];
