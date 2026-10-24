import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Equipment } from '../../models/equipment.model';
import { StorageService } from '../../services/storage.service';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-equipment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment-modal.component.html',
  styleUrl: './equipment-modal.component.scss'
})
export class EquipmentModalComponent {
  @Input() equipment: Equipment | null = null;
  @Output() close = new EventEmitter<void>();

  activeTab: 'specs' | 'instructions' | 'safety' | 'mistakes' = 'specs';

  constructor(
    private storageService: StorageService,
    private equipmentService: EquipmentService,
    private router: Router
  ) {}

  isFavorite(id: string): boolean {
    return this.storageService.isFavorite(id);
  }

  toggleFavorite(event: Event, id: string): void {
    event.stopPropagation();
    this.storageService.toggleFavorite(id);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }

  selectRelated(id: string): void {
    const found = this.equipmentService.getById(id);
    if (found) {
      this.equipment = found;
      this.storageService.addRecentView(found.id);
      this.activeTab = 'specs';
    }
  }

  getRelatedList(): Equipment[] {
    if (!this.equipment) return [];
    return this.equipmentService.getRelated(this.equipment);
  }

  testInScanner(): void {
    if (!this.equipment) return;
    this.close.emit();
    this.router.navigate(['/scanner'], {
      queryParams: { item: this.equipment.id }
    });
  }
}
