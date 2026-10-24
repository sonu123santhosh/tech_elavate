import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, timer } from 'rxjs';
import { Equipment } from '../models/equipment.model';
import { ScanResult, TeachableMachinePrediction } from '../models/scanner.model';
import { EquipmentService } from './equipment.service';
import { TeachableMachineService } from './teachable-machine.service';

export interface BackendIdentifyResponse {
  success: boolean;
  source: 'gemini' | 'teachable-machine' | 'demo';
  geminiOutput?: {
    equipmentName: string;
    alternativeNames: string[];
    visualDescription: string;
    uncertaintyNote: string | null;
  };
  matchedCatalog?: {
    equipmentId: string;
    matchedName: string;
    isConfident: boolean;
    details?: Equipment;
  } | null;
  error?: string;
  code?: string;
  requiresApiKey?: boolean;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  private readonly apiUrl = '/api/identify-equipment';

  constructor(
    private http: HttpClient,
    private equipmentService: EquipmentService,
    private tmService: TeachableMachineService
  ) {}

  /**
   * Performs real-time inference using Google Teachable Machine model
   */
  async scanWithTeachableMachine(
    element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    fallbackEquipmentId?: string
  ): Promise<ScanResult> {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if model is loaded
    if (!this.tmService.isLoaded()) {
      return {
        equipmentId: fallbackEquipmentId || 'burette',
        equipmentName: 'Teachable Machine Model Not Loaded',
        category: 'Setup Required',
        isMatchedFromCatalog: false,
        status: 'uncertain',
        source: 'teachable-machine',
        timestamp,
        detectedFeatures: [
          'Engine: Google Teachable Machine (TensorFlow.js)',
          'Status: Waiting for model URL'
        ],
        safetyWarning: 'Please enter your Google Teachable Machine model URL to begin classification.',
        uncertaintyNote: 'Paste your shareable link (e.g. https://teachablemachine.withgoogle.com/models/xxxxxx/) in the configuration bar above and click "Load Model".'
      };
    }

    try {
      const predictions = await this.tmService.predict(element);
      if (!predictions || predictions.length === 0) {
        throw new Error('No predictions returned by model.');
      }

      const top = predictions[0];
      const confidence = Math.round(top.probability * 100);
      const matched = this.tmService.matchEquipment(top.className);

      if (matched) {
        return {
          equipmentId: matched.id,
          equipmentName: matched.name,
          category: matched.categoryLabel,
          alternativeNames: matched.alternateNames,
          visualDescription: `Classified as "${top.className}" by custom Google Teachable Machine model with ${confidence}% confidence score.`,
          uncertaintyNote: confidence < 60 ? `Confidence is moderate (${confidence}%). Ensure good lighting and center the apparatus in view.` : null,
          isMatchedFromCatalog: true,
          status: confidence >= 50 ? 'success' : 'uncertain',
          source: 'teachable-machine',
          timestamp,
          predictions: predictions.slice(0, 5),
          confidencePercentage: confidence,
          detectedFeatures: [
            `Top Class: ${top.className} (${confidence}%)`,
            `Standard Material: ${matched.standardMaterial}`,
            `Accuracy Level: ${matched.accuracyLevel}`,
            `Category: ${matched.categoryLabel}`
          ],
          safetyWarning: matched.safetyPrecautions[0] || 'Standard laboratory PPE required.',
          demoModeNotice: 'Inference completed in-browser using Google Teachable Machine & TensorFlow.js.',
          rawResponse: predictions
        };
      }

      // Unmatched class from catalog
      return {
        equipmentId: '',
        equipmentName: top.className,
        category: 'Custom Apparatus Class',
        visualDescription: `Predicted as "${top.className}" (${confidence}% probability) by your custom Teachable Machine model.`,
        uncertaintyNote: `The class "${top.className}" is recognized by your model, but is not mapped in the 73-item standard chemistry index.`,
        isMatchedFromCatalog: false,
        status: 'unrecognized',
        source: 'teachable-machine',
        timestamp,
        predictions: predictions.slice(0, 5),
        confidencePercentage: confidence,
        detectedFeatures: [
          `Class: ${top.className} (${confidence}%)`,
          'Source: Custom Google Teachable Machine'
        ],
        safetyWarning: 'Verify apparatus specifications directly with laboratory instructor.'
      };

    } catch (err: any) {
      console.error('[ScannerService] Teachable Machine prediction error:', err);
      return {
        equipmentId: fallbackEquipmentId || '',
        equipmentName: 'Inference Error',
        category: 'Processing Error',
        isMatchedFromCatalog: false,
        status: 'error',
        source: 'teachable-machine',
        timestamp,
        detectedFeatures: [],
        safetyWarning: 'Check model configuration and camera input.',
        uncertaintyNote: err.message || 'Failed to execute Teachable Machine inference.'
      };
    }
  }

  /**
   * Scans using Gemini AI backend (or manual simulation)
   */
  scan(imageSource: string, fallbackEquipmentId?: string): Observable<ScanResult> {
    if (imageSource === 'simulated-sample') {
      return this.handleSimulatedScan(fallbackEquipmentId);
    }

    return this.http.post<BackendIdentifyResponse>(this.apiUrl, { image: imageSource }).pipe(
      map(response => this.mapBackendResponse(response, fallbackEquipmentId)),
      catchError((error: HttpErrorResponse) => of(this.handleHttpError(error, fallbackEquipmentId)))
    );
  }

  private mapBackendResponse(
    response: BackendIdentifyResponse,
    fallbackId?: string
  ): ScanResult {
    const timestamp = response.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!response.success || !response.geminiOutput) {
      return {
        equipmentId: fallbackId || 'unknown',
        equipmentName: 'Identification Unavailable',
        category: 'Unrecognized',
        isMatchedFromCatalog: false,
        status: 'error',
        source: 'gemini',
        timestamp,
        detectedFeatures: [],
        safetyWarning: 'Ensure general laboratory PPE (safety glasses and lab coat) is worn.',
        uncertaintyNote: response.error || 'Failed to analyze equipment image.'
      };
    }

    const { equipmentName, alternativeNames, visualDescription, uncertaintyNote } = response.geminiOutput;

    let matchedEquipment: Equipment | undefined;
    if (response.matchedCatalog && response.matchedCatalog.equipmentId) {
      matchedEquipment = this.equipmentService.getById(response.matchedCatalog.equipmentId);
    }

    if (!matchedEquipment) {
      matchedEquipment = this.findBestLocalMatch(equipmentName, alternativeNames);
    }

    if (matchedEquipment) {
      const isUncertain = Boolean(uncertaintyNote && uncertaintyNote.trim() !== '');

      return {
        equipmentId: matchedEquipment.id,
        equipmentName: matchedEquipment.name,
        category: matchedEquipment.categoryLabel,
        alternativeNames: alternativeNames.length > 0 ? alternativeNames : matchedEquipment.alternateNames,
        visualDescription,
        uncertaintyNote,
        isMatchedFromCatalog: true,
        status: isUncertain ? 'uncertain' : 'success',
        source: 'gemini',
        timestamp,
        detectedFeatures: [
          visualDescription,
          `Standard material: ${matchedEquipment.standardMaterial}`,
          `Catalog category: ${matchedEquipment.categoryLabel}`
        ],
        safetyWarning: matchedEquipment.safetyPrecautions[0] || 'Observe general lab safety standards.',
        demoModeNotice: 'Analyzed with Gemini Multimodal Vision API & matched against verified laboratory catalog.',
        rawResponse: response
      };
    }

    return {
      equipmentId: '',
      equipmentName,
      category: 'Unrecognized Apparatus',
      alternativeNames,
      visualDescription,
      uncertaintyNote: uncertaintyNote || 'This apparatus does not match any entry in the current catalog.',
      isMatchedFromCatalog: false,
      status: 'unrecognized',
      source: 'gemini',
      timestamp,
      detectedFeatures: [visualDescription],
      safetyWarning: 'Apparatus not verified in local catalog. Consult your supervising lab instructor.'
    };
  }

  private handleHttpError(error: HttpErrorResponse, fallbackId?: string): ScanResult {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let errorMessage = 'Could not connect to the SmartLab AI backend service.';

    if (error.error && typeof error.error === 'object') {
      if (error.error.code === 'MISSING_API_KEY' || error.error.requiresApiKey) {
        errorMessage = 'GEMINI_API_KEY is not configured on the backend server. Create a .env file with your GEMINI_API_KEY and restart the server.';
      } else if (error.error.code === 'QUOTA_EXCEEDED') {
        errorMessage = 'Gemini API quota exceeded or rate limit reached. Please wait a moment and try again.';
      } else if (error.error.error) {
        errorMessage = error.error.error;
      }
    } else if (error.status === 0) {
      errorMessage = 'Backend server is not reachable at http://localhost:3000. Start it with "npm run server" in your terminal.';
    }

    return {
      equipmentId: fallbackId || 'burette',
      equipmentName: 'Backend Notice',
      category: 'Configuration Notice',
      isMatchedFromCatalog: false,
      status: 'error',
      source: 'gemini',
      timestamp,
      detectedFeatures: ['Backend endpoint: POST /api/identify-equipment'],
      safetyWarning: 'Always verify apparatus physically before beginning chemical procedures.',
      uncertaintyNote: errorMessage
    };
  }

  private handleSimulatedScan(fallbackEquipmentId?: string): Observable<ScanResult> {
    const all = this.equipmentService.getAll();
    const target = (fallbackEquipmentId ? this.equipmentService.getById(fallbackEquipmentId) : null) || all[0];

    return timer(800).pipe(
      map(() => ({
        equipmentId: target.id,
        equipmentName: target.name,
        category: target.categoryLabel,
        alternativeNames: target.alternateNames,
        visualDescription: `Simulated laboratory apparatus: ${target.tagline}`,
        uncertaintyNote: null,
        isMatchedFromCatalog: true,
        status: 'demo',
        source: 'demo',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        detectedFeatures: [
          `Geometry: ${target.tagline}`,
          `Material: ${target.standardMaterial}`,
          `Primary use: ${target.commonUses[0]}`
        ],
        safetyWarning: target.safetyPrecautions[0] || 'Observe general lab safety.',
        demoModeNotice: 'Manual simulation mode: Equipment dossier loaded from verified source-of-truth dataset.'
      }))
    );
  }

  private findBestLocalMatch(name: string, alternatives: string[]): Equipment | undefined {
    const all = this.equipmentService.getAll();
    const cleanQueries = [name, ...alternatives].map(s => s.toLowerCase().trim()).filter(Boolean);

    for (const item of all) {
      for (const q of cleanQueries) {
        if (item.name.toLowerCase() === q || item.id === q) return item;
        if (item.alternateNames?.some(alt => alt.toLowerCase() === q)) return item;
      }
    }

    for (const item of all) {
      for (const q of cleanQueries) {
        if (q.includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(q)) {
          return item;
        }
      }
    }

    return undefined;
  }
}
