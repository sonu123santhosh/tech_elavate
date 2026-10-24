import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Equipment, EquipmentCategory } from '../../models/equipment.model';
import { EquipmentService } from '../../services/equipment.service';
import { StorageService } from '../../services/storage.service';
import { EquipmentCardComponent } from '../../components/equipment-card/equipment-card.component';
import { EquipmentModalComponent } from '../../components/equipment-modal/equipment-modal.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    EquipmentCardComponent,
    EquipmentModalComponent
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: EquipmentCategory | 'all' = 'all';
  favoritesOnly: boolean = false;
  sortBy: 'name' | 'category' = 'name';

  filteredEquipment: Equipment[] = [];
  categories: { id: EquipmentCategory | 'all'; label: string; count: number }[] = [];
  selectedEquipmentModal: Equipment | null = null;

  constructor(
    private equipmentService: EquipmentService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshCatalog();
  }

  refreshCatalog(): void {
    this.categories = this.equipmentService.getCategories();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredEquipment = this.equipmentService.filter({
      searchQuery: this.searchQuery,
      category: this.selectedCategory,
      favoritesOnly: this.favoritesOnly,
      sortBy: this.sortBy
    });
  }

  setCategory(cat: EquipmentCategory | 'all'): void {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  toggleFavoritesOnly(): void {
    this.favoritesOnly = !this.favoritesOnly;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.favoritesOnly = false;
    this.applyFilters();
  }

  openDossier(equipment: Equipment): void {
    this.selectedEquipmentModal = equipment;
    this.storageService.addRecentView(equipment.id);
  }

  closeDossier(): void {
    this.selectedEquipmentModal = null;
    this.applyFilters();
  }

  scanEquipment(equipment: Equipment): void {
    this.router.navigate(['/scanner'], {
      queryParams: { item: equipment.id }
    });
  }
}
