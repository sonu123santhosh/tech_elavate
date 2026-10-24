import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Equipment } from '../../models/equipment.model';
import { CameraState, ScanResult } from '../../models/scanner.model';
import { ScannerService } from '../../services/scanner.service';
import { EquipmentService } from '../../services/equipment.service';
import { StorageService } from '../../services/storage.service';
import { TeachableMachineService } from '../../services/teachable-machine.service';
import { EquipmentModalComponent } from '../../components/equipment-modal/equipment-modal.component';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, EquipmentModalComponent],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.scss'
})
export class ScannerComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoElement?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasElement?: ElementRef<HTMLCanvasElement>;

  // AI Vision Engine Selection (Teachable Machine is primary!)
  selectedEngine: 'teachable-machine' | 'gemini' = 'teachable-machine';
  customModelUrl: string = '';

  cameraState: CameraState = {
    isActive: false,
    isStarting: false,
    hasPermission: null,
    errorMessage: null
  };

  allEquipment: Equipment[] = [];
  manualSelectedId: string = 'burette';

  capturedImageDataUrl: string | null = null;
  isAnalyzing: boolean = false;
  analysisStep: string = '';
  scanResult: ScanResult | null = null;

  selectedEquipmentModal: Equipment | null = null;

  private stream: MediaStream | null = null;

  constructor(
    public tmService: TeachableMachineService,
    private scannerService: ScannerService,
    private equipmentService: EquipmentService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.allEquipment = this.equipmentService.getAll();
    this.customModelUrl = this.tmService.modelUrl();

    // Check if queryParam has a target item pre-selected from catalog
    this.route.queryParams.subscribe(params => {
      if (params['item'] && this.equipmentService.getById(params['item'])) {
        this.manualSelectedId = params['item'];
      }
      if (params['engine'] === 'gemini') {
        this.selectedEngine = 'gemini';
      }
    });
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  // --- Teachable Machine Model Operations ---
  async loadTeachableMachineModel(): Promise<void> {
    if (!this.customModelUrl || !this.customModelUrl.trim()) return;
    await this.tmService.loadModel(this.customModelUrl);
  }

  setEngine(engine: 'teachable-machine' | 'gemini'): void {
    this.selectedEngine = engine;
    this.scanResult = null;
  }

  // --- Camera Operations ---
  async startCamera(): Promise<void> {
    this.cameraState.isStarting = true;
    this.cameraState.errorMessage = null;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.cameraState.isStarting = false;
      this.cameraState.hasPermission = false;
      this.cameraState.errorMessage = 
        'Browser MediaDevices API is unavailable. Camera access requires HTTPS or localhost execution.';
      return;
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      this.cameraState.isActive = true;
      this.cameraState.hasPermission = true;
      this.cameraState.isStarting = false;

      // Attach stream to video element
      setTimeout(() => {
        if (this.videoElement && this.videoElement.nativeElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
          this.videoElement.nativeElement.play().catch(err => {
            console.warn('Video auto-play suppressed:', err);
          });
        }
      }, 100);

    } catch (err: unknown) {
      this.cameraState.isStarting = false;
      this.cameraState.isActive = false;
      this.cameraState.hasPermission = false;

      const error = err as Error;
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        this.cameraState.errorMessage = 
          'Camera access permission was denied by the user or browser policy. You can use image upload or the manual selector below.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        this.cameraState.errorMessage = 
          'No camera hardware detected on this device. Use image upload or the fallback manual selector below.';
      } else {
        this.cameraState.errorMessage = 
          `Unable to access camera: ${error.message || 'Unknown error'}. Note: Camera requires HTTPS or localhost.`;
      }
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.cameraState.isActive = false;
  }

  capturePhoto(): void {
    if (!this.videoElement || !this.videoElement.nativeElement) return;
    const video = this.videoElement.nativeElement;
    
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedImageDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      this.stopCamera();
      this.triggerAnalysis(this.capturedImageDataUrl);
    }
  }

  retakePhoto(): void {
    this.capturedImageDataUrl = null;
    this.scanResult = null;
    this.startCamera();
  }

  resetScan(): void {
    this.capturedImageDataUrl = null;
    this.scanResult = null;
    this.isAnalyzing = false;
    this.stopCamera();
  }

  // --- Image Upload Fallback ---
  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.capturedImageDataUrl = reader.result as string;
        this.stopCamera();
        this.triggerAnalysis(this.capturedImageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  // --- Manual Fallback / Simulation ---
  simulateScan(): void {
    this.capturedImageDataUrl = 'simulated-sample';
    this.stopCamera();
    this.triggerAnalysis('simulated-sample', this.manualSelectedId);
  }

  // --- Recognition Analysis Pipeline ---
  triggerAnalysis(imageSource: string, equipmentId?: string): void {
    this.isAnalyzing = true;
    this.scanResult = null;
    const targetId = equipmentId || this.manualSelectedId;

    // 1. Manual Simulation
    if (imageSource === 'simulated-sample') {
      this.analysisStep = 'Running offline apparatus simulation from verified catalog...';
      this.scannerService.scan(imageSource, targetId).subscribe({
        next: (result) => {
          this.scanResult = result;
          this.isAnalyzing = false;
          this.recordScanHistory(result);
        },
        error: (err) => {
          this.isAnalyzing = false;
        }
      });
      return;
    }

    // 2. Google Teachable Machine Vision Engine (Client-side TensorFlow.js)
    if (this.selectedEngine === 'teachable-machine') {
      this.analysisStep = 'Initializing Google Teachable Machine inference with TensorFlow.js...';
      
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        this.analysisStep = 'Evaluating neural network weights against apparatus image...';
        const result = await this.scannerService.scanWithTeachableMachine(img, targetId);
        this.scanResult = result;
        this.isAnalyzing = false;
        this.recordScanHistory(result);
      };
      img.onerror = () => {
        this.isAnalyzing = false;
        this.scanResult = {
          equipmentId: '',
          equipmentName: 'Image Processing Notice',
          category: 'Error',
          isMatchedFromCatalog: false,
          status: 'error',
          source: 'teachable-machine',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          detectedFeatures: [],
          safetyWarning: 'Ensure image is a valid photograph.',
          uncertaintyNote: 'Failed to decode image data in browser.'
        };
      };
      img.src = imageSource;
      return;
    }

    // 3. Fallback: Google Gemini Multimodal Vision API via Express Backend
    this.analysisStep = 'Connecting to SmartLab Express backend...';
    setTimeout(() => {
      if (this.isAnalyzing) {
        this.analysisStep = 'Transmitting image to Google Gemini Vision API (@google/genai)...';
      }
    }, 400);

    this.scannerService.scan(imageSource, targetId).subscribe({
      next: (result) => {
        this.scanResult = result;
        this.isAnalyzing = false;
        this.recordScanHistory(result);
      },
      error: (err) => {
        console.error('Scan error:', err);
        this.isAnalyzing = false;
        this.scanResult = {
          equipmentId: '',
          equipmentName: 'Connection Error',
          category: 'Network Notice',
          isMatchedFromCatalog: false,
          status: 'error',
          source: 'gemini',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          detectedFeatures: [],
          safetyWarning: 'Always verify apparatus physically before beginning chemical procedures.',
          uncertaintyNote: 'Failed to communicate with the recognition service. Check if the backend is running on port 3000.'
        };
      }
    });
  }

  private recordScanHistory(result: ScanResult): void {
    if (result.equipmentId && result.status !== 'error') {
      this.storageService.addScanHistory({
        id: `scan-${Date.now()}`,
        equipmentId: result.equipmentId,
        equipmentName: result.equipmentName,
        category: result.category,
        timestamp: result.timestamp,
        source: result.source
      });
      this.storageService.addRecentView(result.equipmentId);
    }
  }

  openDossier(): void {
    if (!this.scanResult || !this.scanResult.equipmentId) return;
    const found = this.equipmentService.getById(this.scanResult.equipmentId);
    if (found) {
      this.selectedEquipmentModal = found;
    }
  }

  closeModal(): void {
    this.selectedEquipmentModal = null;
  }
}
