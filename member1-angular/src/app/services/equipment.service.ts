import { Injectable } from '@angular/core';
import { EQUIPMENT_CATALOG } from '../data/equipment.data';
import { Equipment, EquipmentCategory, EquipmentFilterOptions } from '../models/equipment.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private readonly catalog: Equipment[] = EQUIPMENT_CATALOG;

  constructor(private storageService: StorageService) {}

  getAll(): Equipment[] {
    return [...this.catalog];
  }

  getById(id: string): Equipment | undefined {
    return this.catalog.find(item => item.id.toLowerCase() === id.toLowerCase());
  }

  getRelated(equipment: Equipment): Equipment[] {
    if (!equipment.relatedEquipmentIds || equipment.relatedEquipmentIds.length === 0) {
      return [];
    }
    return this.catalog.filter(item => equipment.relatedEquipmentIds.includes(item.id));
  }

  getCategories(): { id: EquipmentCategory | 'all'; label: string; count: number }[] {
    const counts: Record<string, number> = {
      all: this.catalog.length,
      volumetric: 0,
      reaction: 0,
      separation: 0,
      heating: 0,
      measurement: 0,
      optics: 0,
      clamping: 0,
      safety: 0,
      general: 0
    };

    for (const item of this.catalog) {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    }

    return [
      { id: 'all', label: 'All Equipment', count: counts['all'] },
      { id: 'volumetric', label: 'Volumetric & Pipetting', count: counts['volumetric'] },
      { id: 'reaction', label: 'Flasks & Reaction Vessels', count: counts['reaction'] },
      { id: 'separation', label: 'Separation & Distillation', count: counts['separation'] },
      { id: 'heating', label: 'Heating & Thermal Control', count: counts['heating'] },
      { id: 'measurement', label: 'Measurement & Analytics', count: counts['measurement'] },
      { id: 'clamping', label: 'Support, Clamps & Hardware', count: counts['clamping'] },
      { id: 'safety', label: 'Safety & PPE Equipment', count: counts['safety'] },
      { id: 'optics', label: 'Observation & Optics', count: counts['optics'] }
    ];
  }

  filter(options: EquipmentFilterOptions): Equipment[] {
    let result = [...this.catalog];

    // Filter by Category
    if (options.category && options.category !== 'all') {
      result = result.filter(item => item.category === options.category);
    }

    // Filter by Favorites
    if (options.favoritesOnly) {
      const favs = this.storageService.getFavorites();
      result = result.filter(item => favs.includes(item.id));
    }

    // Filter by Search Query
    if (options.searchQuery && options.searchQuery.trim().length > 0) {
      const query = options.searchQuery.toLowerCase().trim();
      result = result.filter(item => {
        const inName = item.name.toLowerCase().includes(query);
        const inAlt = item.alternateNames?.some(alt => alt.toLowerCase().includes(query)) ?? false;
        const inTagline = item.tagline.toLowerCase().includes(query);
        const inDesc = item.description.toLowerCase().includes(query);
        const inUses = item.commonUses.some(u => u.toLowerCase().includes(query));
        const inCat = item.categoryLabel.toLowerCase().includes(query);
        return inName || inAlt || inTagline || inDesc || inUses || inCat;
      });
    }

    // Sorting
    if (options.sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (options.sortBy === 'category') {
      result.sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel));
    }

    return result;
  }
}
