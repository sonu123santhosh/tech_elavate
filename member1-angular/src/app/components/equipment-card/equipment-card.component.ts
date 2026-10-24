import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Equipment } from '../../models/equipment.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-equipment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment-card.component.html',
  styleUrl: './equipment-card.component.scss'
})
export class EquipmentCardComponent {
  @Input({ required: true }) equipment!: Equipment;
  @Output() viewDetails = new EventEmitter<Equipment>();
  @Output() scanEquipment = new EventEmitter<Equipment>();

  constructor(private storageService: StorageService) {}

  isFavorite(): boolean {
    return this.storageService.isFavorite(this.equipment.id);
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.storageService.toggleFavorite(this.equipment.id);
  }

  onCardClick(): void {
    this.viewDetails.emit(this.equipment);
  }

  onScanClick(event: Event): void {
    event.stopPropagation();
    this.scanEquipment.emit(this.equipment);
  }
}
