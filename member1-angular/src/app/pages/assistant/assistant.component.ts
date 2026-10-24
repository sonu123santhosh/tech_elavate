import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatMessage } from '../../models/assistant.model';
import { Equipment } from '../../models/equipment.model';
import { AssistantService } from '../../services/assistant.service';
import { EquipmentService } from '../../services/equipment.service';
import { EquipmentModalComponent } from '../../components/equipment-modal/equipment-modal.component';

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, EquipmentModalComponent],
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.scss'
})
export class AssistantComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer?: ElementRef;

  messages: ChatMessage[] = [];
  userInput: string = '';
  isTyping: boolean = false;
  suggestedPrompts: string[] = [];
  selectedEquipmentModal: Equipment | null = null;

  constructor(
    private assistantService: AssistantService,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.suggestedPrompts = this.assistantService.getSuggestedPrompts();
    
    // Initial welcome message
    this.messages.push({
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello! I am **SmartLab Assistant** (UNEMPLOYED 004).\n\nI am currently running in **Offline Demonstration Mode** using our curated laboratory protocols knowledge base.\n\nYou can ask me questions about meniscus reading, chemical spill first aid, acid dilution rules, tare procedures, or equipment comparisons. Select a suggested prompt below or type your own question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDemoResponse: true
    });
  }

  sendMessage(textToSend?: string): void {
    const text = (textToSend || this.userInput).trim();
    if (!text || this.isTyping) return;

    // Push user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.messages.push(userMsg);
    this.userInput = '';
    this.scrollToBottom();

    // Trigger assistant typing
    this.isTyping = true;
    this.assistantService.askQuestion(text).subscribe({
      next: (botMsg) => {
        this.messages.push(botMsg);
        this.isTyping = false;
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Assistant error:', err);
        this.isTyping = false;
      }
    });
  }

  askSuggested(prompt: string): void {
    this.sendMessage(prompt);
  }

  openRelatedEquipment(id: string): void {
    const equip = this.equipmentService.getById(id);
    if (equip) {
      this.selectedEquipmentModal = equip;
    }
  }

  closeModal(): void {
    this.selectedEquipmentModal = null;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer && this.messagesContainer.nativeElement) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }
}
