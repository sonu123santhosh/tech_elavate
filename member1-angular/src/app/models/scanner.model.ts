export interface GeminiVisionOutput {
  equipmentName: string;
  alternativeNames: string[];
  visualDescription: string;
  uncertaintyNote: string | null;
}

export interface MatchedCatalogInfo {
  equipmentId: string;
  matchedName: string;
  isConfident: boolean;
}

export interface TeachableMachinePrediction {
  className: string;
  probability: number; // 0.0 to 1.0
}

export interface ScanResult {
  equipmentId: string;
  equipmentName: string;
  category: string;
  alternativeNames?: string[];
  visualDescription?: string;
  uncertaintyNote?: string | null;
  isMatchedFromCatalog: boolean;
  status: 'success' | 'uncertain' | 'unrecognized' | 'error' | 'demo';
  source: 'teachable-machine' | 'gemini' | 'demo';
  timestamp: string;
  detectedFeatures: string[];
  safetyWarning: string;
  demoModeNotice?: string;
  predictions?: TeachableMachinePrediction[];
  confidencePercentage?: number;
  rawResponse?: unknown;
}

export interface ScanHistoryItem {
  id: string;
  equipmentId: string;
  equipmentName: string;
  category: string;
  timestamp: string;
  source: 'teachable-machine' | 'gemini' | 'demo';
  thumbnail?: string;
}

export interface CameraState {
  isActive: boolean;
  isStarting: boolean;
  hasPermission: boolean | null;
  errorMessage: string | null;
  deviceLabel?: string;
}
