import { Injectable, signal } from '@angular/core';
import { Equipment } from '../models/equipment.model';
import { TeachableMachinePrediction } from '../models/scanner.model';
import { EquipmentService } from './equipment.service';

declare global {
  interface Window {
    tmImage?: {
      load: (modelURL: string, metadataURL: string) => Promise<any>;
    };
    tf?: any;
  }
}

const STORAGE_KEY = 'smartlab_teachable_machine_model_url';

@Injectable({
  providedIn: 'root'
})
export class TeachableMachineService {
  modelUrl = signal<string>('');
  isLoaded = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  loadError = signal<string | null>(null);
  classLabels = signal<string[]>([]);

  private tmModel: any = null;

  constructor(private equipmentService: EquipmentService) {
    // Load persisted model URL if user previously entered one
    const savedUrl = localStorage.getItem(STORAGE_KEY) || '';
    if (savedUrl) {
      this.modelUrl.set(savedUrl);
      this.loadModel(savedUrl).catch(err => {
        console.warn('Auto-load of saved Teachable Machine model failed:', err);
      });
    }
  }

  /**
   * Sets and persists the user's Teachable Machine Model URL
   */
  setModelUrl(url: string): void {
    const cleanUrl = url.trim();
    this.modelUrl.set(cleanUrl);
    if (cleanUrl) {
      localStorage.setItem(STORAGE_KEY, cleanUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      this.tmModel = null;
      this.isLoaded.set(false);
      this.classLabels.set([]);
    }
  }

  /**
   * Loads the Teachable Machine Model from the given URL
   * Example URL: https://teachablemachine.withgoogle.com/models/abc123xyz/
   */
  async loadModel(urlToLoad?: string): Promise<boolean> {
    const rawUrl = (urlToLoad || this.modelUrl()).trim();
    if (!rawUrl) {
      this.loadError.set('Please provide a Google Teachable Machine model URL.');
      return false;
    }

    // Ensure trailing slash
    const baseUrl = rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;
    this.setModelUrl(baseUrl);

    this.isLoading.set(true);
    this.loadError.set(null);

    // Wait up to 3 seconds for window.tmImage script to be ready if loading
    await this.ensureScriptLoaded();

    if (!window.tmImage) {
      this.isLoading.set(false);
      this.loadError.set('Teachable Machine library is still loading. Please check internet connection.');
      return false;
    }

    try {
      const modelURL = `${baseUrl}model.json`;
      const metadataURL = `${baseUrl}metadata.json`;

      console.log(`[TeachableMachine] Loading model from: ${modelURL}`);
      this.tmModel = await window.tmImage.load(modelURL, metadataURL);

      const labels = this.tmModel.getClassLabels ? this.tmModel.getClassLabels() : [];
      this.classLabels.set(labels);
      this.isLoaded.set(true);
      this.isLoading.set(false);
      this.loadError.set(null);
      console.log('[TeachableMachine] Model loaded successfully! Classes:', labels);
      return true;

    } catch (err: any) {
      console.error('[TeachableMachine] Failed to load model:', err);
      this.tmModel = null;
      this.isLoaded.set(false);
      this.isLoading.set(false);
      this.loadError.set(
        `Failed to load model from "${baseUrl}". Please make sure the URL was exported via "Upload (shareable link)" in Teachable Machine and includes model.json.`
      );
      return false;
    }
  }

  /**
   * Predicts apparatus class from HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement
   */
  async predict(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Promise<TeachableMachinePrediction[]> {
    if (!this.tmModel) {
      throw new Error('Teachable Machine model is not loaded yet. Please configure your model URL.');
    }

    const predictions: Array<{ className: string; probability: number }> = await this.tmModel.predict(element);
    
    // Sort descending by probability
    predictions.sort((a, b) => b.probability - a.probability);

    return predictions.map(p => ({
      className: p.className,
      probability: Math.round(p.probability * 1000) / 1000 // 3 decimal places
    }));
  }

  /**
   * Matches the Teachable Machine predicted class name against our verified 73 equipment database
   */
  matchEquipment(className: string): Equipment | undefined {
    if (!className) return undefined;
    const clean = className.toLowerCase().trim();
    const all = this.equipmentService.getAll();

    // 1. Exact match on id or name
    for (const eq of all) {
      if (eq.name.toLowerCase() === clean || eq.id === clean) return eq;
      if (eq.alternateNames && eq.alternateNames.some(a => a.toLowerCase() === clean)) return eq;
    }

    // 2. Contains match (e.g. "Glass Burette 50ml" contains "burette")
    for (const eq of all) {
      if (clean.includes(eq.name.toLowerCase()) || eq.name.toLowerCase().includes(clean)) return eq;
      if (eq.alternateNames && eq.alternateNames.some(a => clean.includes(a.toLowerCase()) || a.toLowerCase().includes(clean))) {
        return eq;
      }
    }

    return undefined;
  }

  /**
   * Checks if window.tmImage is ready or polls briefly
   */
  private async ensureScriptLoaded(): Promise<void> {
    if (window.tmImage) return;

    for (let i = 0; i < 20; i++) {
      await new Promise(res => setTimeout(res, 150));
      if (window.tmImage) return;
    }
  }
}
