import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { LibraryComponent } from './pages/library/library.component';
import { ExperimentComponent } from './pages/experiment/experiment.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { AssistantComponent } from './pages/assistant/assistant.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard — SmartLab AI' },
  { path: 'scanner', component: ScannerComponent, title: 'AI Equipment Scanner — SmartLab AI' },
  { path: 'library', component: LibraryComponent, title: 'Equipment Library — SmartLab AI' },
  { path: 'experiment', component: ExperimentComponent, title: 'Titration Guide — SmartLab AI' },
  { path: 'quiz', component: QuizComponent, title: 'Safety & Equipment Quiz — SmartLab AI' },
  { path: 'assistant', component: AssistantComponent, title: 'Lab Assistant — SmartLab AI' },
  { path: '**', redirectTo: 'dashboard' }
];
