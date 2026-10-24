import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuizQuestion, QuizResult } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  questions: QuizQuestion[] = [];
  currentIndex: number = 0;
  
  // Selected answers: map of question ID -> selected option index
  selectedAnswers: { [questionId: number]: number } = {};
  
  // Has the user confirmed an answer for the current question?
  isCurrentAnswered: boolean = false;
  
  // Is the quiz complete?
  isCompleted: boolean = false;
  quizResult: QuizResult | null = null;

  constructor(
    private quizService: QuizService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.startQuiz();
  }

  startQuiz(): void {
    this.questions = this.quizService.getQuestions();
    this.currentIndex = 0;
    this.selectedAnswers = {};
    this.isCurrentAnswered = false;
    this.isCompleted = false;
    this.quizResult = null;
  }

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentIndex];
  }

  get progressPercentage(): number {
    return Math.round(((this.currentIndex + 1) / this.questions.length) * 100);
  }

  get currentScore(): number {
    let score = 0;
    for (const q of this.questions) {
      if (this.selectedAnswers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    }
    return score;
  }

  selectOption(optionIndex: number): void {
    if (this.isCurrentAnswered) return; // Prevent changing after revealing
    this.selectedAnswers[this.currentQuestion.id] = optionIndex;
    this.isCurrentAnswered = true;
  }

  isOptionSelected(optionIndex: number): boolean {
    return this.selectedAnswers[this.currentQuestion.id] === optionIndex;
  }

  isOptionCorrect(optionIndex: number): boolean {
    return optionIndex === this.currentQuestion.correctAnswerIndex;
  }

  nextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.isCurrentAnswered = this.selectedAnswers[this.currentQuestion.id] !== undefined;
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz(): void {
    this.quizResult = this.quizService.calculateResult(this.selectedAnswers);
    this.isCompleted = true;
  }
}
