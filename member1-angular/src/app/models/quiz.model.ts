export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: 'safety' | 'measurement' | 'technique' | 'apparatus';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  rating: 'Exemplary' | 'Proficient' | 'Needs Review';
}
