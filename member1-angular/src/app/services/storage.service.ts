import { Injectable, signal } from '@angular/core';
import { ScanHistoryItem } from '../models/scanner.model';

const STORAGE_KEYS = {
  FAVORITES: 'smartlab_favorites_v1',
  RECENT_VIEWS: 'smartlab_recent_views_v1',
  SCAN_HISTORY: 'smartlab_scan_history_v1',
  QUIZ_STATS: 'smartlab_quiz_stats_v1',
  TIP_INDEX: 'smartlab_tip_index_v1'
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public favoritesSignal = signal<string[]>(this.getFavorites());
  public scanHistorySignal = signal<ScanHistoryItem[]>(this.getScanHistory());

  private isStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    } catch {
      return false;
    }
  }

  // --- Favorites ---
  getFavorites(): string[] {
    if (!this.isStorageAvailable()) return ['burette', 'conical-flask'];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : ['burette', 'conical-flask'];
    } catch {
      return ['burette', 'conical-flask'];
    }
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  }

  toggleFavorite(id: string): boolean {
    const list = this.getFavorites();
    const index = list.indexOf(id);
    let isFav = false;
    if (index > -1) {
      list.splice(index, 1);
      isFav = false;
    } else {
      list.push(id);
      isFav = true;
    }
    if (this.isStorageAvailable()) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list));
    }
    this.favoritesSignal.set([...list]);
    return isFav;
  }

  // --- Recently Viewed ---
  getRecentViews(): string[] {
    if (!this.isStorageAvailable()) return ['burette', 'conical-flask', 'pipette'];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT_VIEWS);
      return data ? JSON.parse(data) : ['burette', 'conical-flask', 'pipette'];
    } catch {
      return ['burette', 'conical-flask', 'pipette'];
    }
  }

  addRecentView(id: string): void {
    const list = this.getRecentViews().filter(item => item !== id);
    list.unshift(id);
    const trimmed = list.slice(0, 8);
    if (this.isStorageAvailable()) {
      localStorage.setItem(STORAGE_KEYS.RECENT_VIEWS, JSON.stringify(trimmed));
    }
  }

  // --- Scan History ---
  getScanHistory(): ScanHistoryItem[] {
    if (!this.isStorageAvailable()) {
      return [
        {
          id: 'demo-1',
          equipmentId: 'burette',
          equipmentName: 'Burette',
          category: 'Volumetric Glassware',
          timestamp: 'Just now',
          source: 'gemini'
        },
        {
          id: 'demo-2',
          equipmentId: 'conical-flask',
          equipmentName: 'Conical Flask',
          category: 'Heating & Reaction Glassware',
          timestamp: '2 hours ago',
          source: 'demo'
        }
      ];
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
      if (data) {
        return JSON.parse(data);
      }
      const initial: ScanHistoryItem[] = [
        {
          id: 'demo-1',
          equipmentId: 'burette',
          equipmentName: 'Burette',
          category: 'Volumetric Glassware',
          timestamp: 'Just now',
          source: 'gemini'
        },
        {
          id: 'demo-2',
          equipmentId: 'conical-flask',
          equipmentName: 'Conical Flask',
          category: 'Heating & Reaction Glassware',
          timestamp: '2 hours ago',
          source: 'demo'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify(initial));
      return initial;
    } catch {
      return [];
    }
  }

  addScanHistory(item: ScanHistoryItem): void {
    const list = this.getScanHistory();
    list.unshift(item);
    const trimmed = list.slice(0, 15);
    if (this.isStorageAvailable()) {
      localStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify(trimmed));
    }
    this.scanHistorySignal.set([...trimmed]);
  }

  // --- Quiz Stats ---
  getQuizStats(): { attempts: number; bestScore: number; lastScore: number; bestPercentage: number } {
    const defaultStats = { attempts: 1, bestScore: 10, lastScore: 10, bestPercentage: 83 };
    if (!this.isStorageAvailable()) return defaultStats;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_STATS);
      return data ? JSON.parse(data) : defaultStats;
    } catch {
      return defaultStats;
    }
  }

  saveQuizScore(score: number, total: number): void {
    const current = this.getQuizStats();
    const percentage = Math.round((score / total) * 100);
    const updated = {
      attempts: (current.attempts || 0) + 1,
      bestScore: Math.max(current.bestScore || 0, score),
      lastScore: score,
      bestPercentage: Math.max(current.bestPercentage || 0, percentage)
    };
    if (this.isStorageAvailable()) {
      localStorage.setItem(STORAGE_KEYS.QUIZ_STATS, JSON.stringify(updated));
    }
  }

  // --- Safety Tip Index ---
  getTipIndex(): number {
    if (!this.isStorageAvailable()) return 0;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TIP_INDEX);
      return data ? parseInt(data, 10) : 0;
    } catch {
      return 0;
    }
  }

  setTipIndex(index: number): void {
    if (this.isStorageAvailable()) {
      localStorage.setItem(STORAGE_KEYS.TIP_INDEX, index.toString());
    }
  }
}
