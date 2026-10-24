import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ASSISTANT_DEFAULT_FALLBACK,
  ASSISTANT_KNOWLEDGE_BASE,
  ASSISTANT_SUGGESTED_PROMPTS
} from '../data/assistant-kb.data';
import { ChatMessage } from '../models/assistant.model';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  getSuggestedPrompts(): string[] {
    return [...ASSISTANT_SUGGESTED_PROMPTS];
  }

  /**
   * Process a user query against the offline demonstration knowledge base.
   * 
   * GEMINI API INTEGRATION POINT:
   * To switch from Demo Mode to live Gemini AI:
   * 1. Call Google Gemini 1.5 Flash via REST endpoint or @google/genai SDK:
   *    const response = await ai.models.generateContent({
   *      model: 'gemini-1.5-flash',
   *      contents: userPrompt,
   *      systemInstruction: 'You are an expert laboratory equipment safety and protocol assistant...'
   *    });
   * 2. Return response.text in the ChatMessage format below.
   */
  askQuestion(userPrompt: string): Observable<ChatMessage> {
    const cleanPrompt = userPrompt.toLowerCase().trim();

    // Scan knowledge base for best keyword match score
    let bestMatch: typeof ASSISTANT_KNOWLEDGE_BASE[0] | null = null;
    let highestScore = 0;

    for (const entry of ASSISTANT_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (cleanPrompt.includes(kw.toLowerCase())) {
          score += kw.length; // weight longer specific keywords higher
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    let responseText: string;
    let relatedEquipmentId: string | undefined;

    if (bestMatch && highestScore > 0) {
      responseText = bestMatch.answer;
      relatedEquipmentId = bestMatch.relatedEquipmentId;
    } else {
      responseText = ASSISTANT_DEFAULT_FALLBACK(userPrompt);
    }

    // Realistic typing latency simulation (700ms)
    return timer(700).pipe(
      map(() => ({
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemoResponse: true,
        relatedEquipmentId,
        suggestedTopics: [
          'Reading a burette meniscus',
          'Acid dilution safety rules',
          'Taring an analytical balance'
        ]
      }))
    );
  }
}
