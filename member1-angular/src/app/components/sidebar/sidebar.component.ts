import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Input() isMobileOpen = false;
  @Output() closeMobile = new EventEmitter<void>();
  @Output() toggleCollapse = new EventEmitter<void>();

  constructor(
    public storageService: StorageService,
    public equipmentService: EquipmentService
  ) {}

  get favoritesCount(): number {
    return this.storageService.favoritesSignal().length;
  }

  get totalEquipmentCount(): number {
    return this.equipmentService.getAll().length;
  }
}
