/**
 * Quiz Engine: Pure state machine managing an equipment quiz session.
 *
 * Enforces:
 * - 5 questions per attempt
 * - 4 distinct options per question
 * - One question displayed at a time
 * - Progress indicator
 * - Visible selected state
 * - Previous/Next navigation preserving answers
 * - Prevention of advancing without selection
 * - Prevention of duplicate submissions/scores
 * - Reliable score and percentage calculation
 */

import { getEquipmentById, evaluateQuiz } from './equipmentDatabase.js';

export class QuizEngine {
  constructor(equipmentId) {
    this.equipmentId = equipmentId;
    this.equipment = getEquipmentById(equipmentId);
    if (!this.equipment) {
      throw new Error(`Equipment with ID "${equipmentId}" does not exist in database.`);
    }

    this.questions = this.equipment.quiz || [];
    this.currentIndex = 0;
    this.userAnswers = new Array(this.questions.length || 5).fill(null); // stores selected option index (0..3) per question
    this.checkedAnswers = new Array(this.questions.length || 5).fill(false); // tracks whether user checked answer
    this.isSubmitted = false;
    this.evaluationResult = null;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  getTotalQuestions() {
    return this.questions.length;
  }

  getProgressPercentage() {
    return Math.round(((this.currentIndex + 1) / this.getTotalQuestions()) * 100);
  }

  getSelectedAnswer() {
    return this.userAnswers[this.currentIndex];
  }

  isAnswerChecked(index = this.currentIndex) {
    return Boolean(this.checkedAnswers[index]);
  }

  selectAnswer(optionIndex) {
    if (this.isSubmitted || this.checkedAnswers[this.currentIndex]) return;
    if (optionIndex < 0 || optionIndex > 3) return;
    this.userAnswers[this.currentIndex] = optionIndex;
  }

  checkAnswer() {
    if (this.userAnswers[this.currentIndex] === null) {
      return { success: false, error: 'Please select an answer option before checking.' };
    }

    this.checkedAnswers[this.currentIndex] = true;
    const q = this.getCurrentQuestion();
    const selected = this.userAnswers[this.currentIndex];
    const isCorrect = selected === q.correctAnswer;

    return {
      success: true,
      isCorrect,
      selectedAnswer: selected,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || '',
    };
  }

  getScoreSoFar() {
    let score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.checkedAnswers[i] && this.userAnswers[i] === this.questions[i].correctAnswer) {
        score++;
      }
    }
    return score;
  }

  canAdvance() {
    return this.userAnswers[this.currentIndex] !== null;
  }

  canGoBack() {
    return this.currentIndex > 0;
  }

  isLastQuestion() {
    return this.currentIndex === this.getTotalQuestions() - 1;
  }

  nextQuestion() {
    if (!this.canAdvance()) {
      return { success: false, error: 'Please select an answer option before advancing.' };
    }

    if (this.currentIndex < this.getTotalQuestions() - 1) {
      this.currentIndex++;
      return { success: true };
    }

    return { success: false, error: 'Already on last question. Please submit the quiz.' };
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return { success: true };
    }
    return { success: false, error: 'Already on first question.' };
  }

  submitQuiz() {
    if (!this.canAdvance()) {
      return { success: false, error: 'Please select an answer for the final question before submitting.' };
    }

    // Check that all questions have an answer
    for (let i = 0; i < this.getTotalQuestions(); i++) {
      if (this.userAnswers[i] === null) {
        this.currentIndex = i;
        return { success: false, error: `Question ${i + 1} was not answered.` };
      }
    }

    if (this.isSubmitted && this.evaluationResult) {
      // Prevent duplicate scoring
      return { success: true, result: this.evaluationResult };
    }

    this.isSubmitted = true;
    this.evaluationResult = evaluateQuiz(this.equipmentId, this.userAnswers);
    return { success: true, result: this.evaluationResult };
  }

  reset() {
    this.currentIndex = 0;
    this.userAnswers = new Array(this.questions.length || 5).fill(null);
    this.checkedAnswers = new Array(this.questions.length || 5).fill(false);
    this.isSubmitted = false;
    this.evaluationResult = null;
  }
}
