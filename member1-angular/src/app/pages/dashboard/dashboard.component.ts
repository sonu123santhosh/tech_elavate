import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Equipment } from '../../models/equipment.model';
import { ScanHistoryItem } from '../../models/scanner.model';
import { EquipmentService } from '../../services/equipment.service';
import { StorageService } from '../../services/storage.service';
import { EquipmentCardComponent } from '../../components/equipment-card/equipment-card.component';
import { EquipmentModalComponent } from '../../components/equipment-modal/equipment-modal.component';

export interface SafetyTip {
  title: string;
  category: string;
  content: string;
  rule: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EquipmentCardComponent,
    EquipmentModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  selectedEquipment: Equipment | null = null;
  recentlyViewed: Equipment[] = [];
  recentScans: ScanHistoryItem[] = [];
  quizStats = { attempts: 1, bestScore: 10, lastScore: 10, bestPercentage: 83 };
  totalEquipmentCount = 12;

  safetyTips: SafetyTip[] = [
    {
      title: 'Always Add Acid to Water',
      category: 'Chemical Handling',
      content: 'Dissolving concentrated acid in water releases tremendous heat. Adding water into acid causes instant steam explosions and boiling acid splattering.',
      rule: 'Remember: "A&W" — Acid into Water slowly with continuous stirring.'
    },
    {
      title: 'Eliminate Burette Jet Bubbles',
      category: 'Volumetric Accuracy',
      content: 'An air pocket in the delivery jet counts toward your measured volume when it breaks free during titration, causing an unrecoverable positive error.',
      rule: 'Rapidly flush 2 mL of titrant through the stopcock before setting the 0.00 mL meniscus.'
    },
    {
      title: 'Never Blow Out Volumetric Pipettes',
      category: 'Apparatus Standards',
      content: 'Class A pipettes marked "TD" or "Ex" are calibrated to retain the small drop in the tip by capillary surface tension. Forcing it out delivers excess volume.',
      rule: 'Touch the tip against the inner flask wall for 3 seconds; do not blow.'
    },
    {
      title: 'Tare Balance with Clean Pan',
      category: 'Precision Weighing',
      content: 'Never place chemicals directly on the balance pan. Always use a weighing boat and wait for air draft stabilization before reading.',
      rule: 'Always close draft shield doors and ensure display shows stable 0.000 g.'
    }
  ];

  currentTipIndex = 0;

  constructor(
    private equipmentService: EquipmentService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.currentTipIndex = this.storageService.getTipIndex() % this.safetyTips.length;
  }

  loadData(): void {
    this.totalEquipmentCount = this.equipmentService.getAll().length;
    this.recentScans = this.storageService.getScanHistory();
    this.quizStats = this.storageService.getQuizStats();

    // Load recently viewed equipment
    const recentIds = this.storageService.getRecentViews();
    this.recentlyViewed = recentIds
      .map(id => this.equipmentService.getById(id))
      .filter((item): item is Equipment => item !== undefined)
      .slice(0, 4);

    if (this.recentlyViewed.length === 0) {
      // Default initial view
      this.recentlyViewed = [
        this.equipmentService.getById('burette')!,
        this.equipmentService.getById('conical-flask')!,
        this.equipmentService.getById('pipette')!,
        this.equipmentService.getById('electronic-balance')!
      ].filter(Boolean);
    }
  }

  get currentTip(): SafetyTip {
    return this.safetyTips[this.currentTipIndex];
  }

  nextTip(): void {
    this.currentTipIndex = (this.currentTipIndex + 1) % this.safetyTips.length;
    this.storageService.setTipIndex(this.currentTipIndex);
  }

  openEquipmentModal(equipment: Equipment): void {
    this.selectedEquipment = equipment;
    this.storageService.addRecentView(equipment.id);
  }

  openById(id: string): void {
    const item = this.equipmentService.getById(id);
    if (item) {
      this.openEquipmentModal(item);
    }
  }

  closeEquipmentModal(): void {
    this.selectedEquipment = null;
    this.loadData();
  }

  scanEquipment(equipment: Equipment): void {
    this.router.navigate(['/scanner'], {
      queryParams: { item: equipment.id }
    });
  }
}
