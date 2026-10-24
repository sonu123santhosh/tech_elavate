export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isDemoResponse?: boolean;
  relatedEquipmentId?: string;
  suggestedTopics?: string[];
}

export interface AssistantKnowledgeEntry {
  keywords: string[];
  question: string;
  answer: string;
  relatedEquipmentId?: string;
  category: string;
}
