import { Injectable } from '@angular/core';
import { QUIZ_QUESTIONS } from '../data/quiz.data';
import { QuizQuestion, QuizResult } from '../models/quiz.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private storageService: StorageService) {}

  getQuestions(): QuizQuestion[] {
    return [...QUIZ_QUESTIONS];
  }

  calculateResult(answers: { [questionId: number]: number }): QuizResult {
    const questions = this.getQuestions();
    let score = 0;

    for (const q of questions) {
      if (answers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    }

    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    let rating: 'Exemplary' | 'Proficient' | 'Needs Review' = 'Needs Review';
    if (percentage >= 85) {
      rating = 'Exemplary';
    } else if (percentage >= 65) {
      rating = 'Proficient';
    }

    const result: QuizResult = {
      score,
      totalQuestions,
      percentage,
      completedAt: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      rating
    };

    // Save in storage
    this.storageService.saveQuizScore(score, totalQuestions);

    return result;
  }
}
