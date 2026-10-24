import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Equipment } from '../../models/equipment.model';
import { EquipmentService } from '../../services/equipment.service';
import { EquipmentModalComponent } from '../../components/equipment-modal/equipment-modal.component';

export interface TitrationStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  instructions: string[];
  proTip: string;
  safetyNote?: string;
  visualState: 'empty' | 'filling' | 'indicator' | 'swirling' | 'endpoint' | 'reading';
}

@Component({
  selector: 'app-experiment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, EquipmentModalComponent],
  templateUrl: './experiment.component.html',
  styleUrl: './experiment.component.scss'
})
export class ExperimentComponent {
  currentStepIndex: number = 0;
  selectedEquipmentModal: Equipment | null = null;

  // Interactive Checklist
  checklist = [
    { id: 1, text: 'Wear splash-proof chemical goggles, lab coat, and nitrile gloves', checked: true },
    { id: 2, text: 'Inspect 50 mL burette, stopcock valve, and tip for star cracks or grease plugs', checked: true },
    { id: 3, text: 'Rinse burette twice with 5 mL portions of 0.100 M NaOH titrant solution', checked: false },
    { id: 4, text: 'Expel trapped air bubble from jet tip into waste beaker by rapid flush', checked: false },
    { id: 5, text: 'Zero the burette at horizontal eye level (bottom of concave meniscus)', checked: false },
    { id: 6, text: 'Pipette exactly 25.00 mL of unknown HCl into 250 mL Erlenmeyer flask', checked: false },
    { id: 7, text: 'Add 2–3 drops of phenolphthalein indicator solution to analyte flask', checked: false },
    { id: 8, text: 'Position flask over clean white tile beneath burette tip', checked: false }
  ];

  // Titration Procedure Steps
  steps: TitrationStep[] = [
    {
      stepNumber: 1,
      title: 'Titrant Conditioning & Burette Preparation',
      subtitle: 'Prepare standard 0.100 M NaOH solution in calibrated Class A burette',
      instructions: [
        'Secure clean burette vertically in a burette clamp with rubber grip pads.',
        'Rinse with 5 mL of 0.100 M NaOH to coat inner glass walls, then drain through stopcock into waste.',
        'Using a small clean funnel, fill burette slightly above the 0.00 mL line.',
        'Immediately remove the funnel from the top of the burette to prevent stray dripping.',
        'Open stopcock fully over waste beaker to flush all air pockets out of the jet tip.',
        'Adjust the meniscus until the bottom of the curve touches the 0.00 mL line.'
      ],
      proTip: 'Parallax elimination: Ensure your eye is directly level with the 0.00 line. A dark paper held behind the barrel heightens contrast.',
      safetyNote: 'NaOH is a caustic base that attacks glass and skin. Rinse any splashes with cold water immediately.',
      visualState: 'filling'
    },
    {
      stepNumber: 2,
      title: 'Analyte Aliquot Delivery',
      subtitle: 'Transfer precise volume of unknown HCl solution with volumetric transfer pipette',
      instructions: [
        'Condition a clean 25.00 mL Class A volumetric transfer pipette with the HCl solution.',
        'Using a pipette bulb, draw liquid 1–2 cm above the etched calibration ring.',
        'Wipe the exterior tip gently with a lint-free tissue.',
        'Carefully lower liquid until the lowest point of the concave meniscus sits on the mark.',
        'Deliver liquid into clean 250 mL Erlenmeyer flask. Hold tip against flask wall for 3 seconds.'
      ],
      proTip: 'Do NOT blow out the small droplet remaining in the tip! Transfer pipettes (TD/Ex) are calibrated to leave that exact residual volume.',
      safetyNote: 'NEVER pipette liquids by mouth! Always use a manual 3-valve rubber bulb or electronic pump.',
      visualState: 'empty'
    },
    {
      stepNumber: 3,
      title: 'Indicator Introduction',
      subtitle: 'Add pH-sensitive phenolphthalein indicator',
      instructions: [
        'Add exactly 2 to 3 drops of 1% ethanolic phenolphthalein indicator into the flask.',
        'Gently swirl the flask to distribute the indicator uniformly.',
        'Observe that the acidic solution remains crystal clear and colorless (pH < 8.2).',
        'Place the flask on a clean white ceramic tile directly beneath the burette tip.'
      ],
      proTip: 'Avoid adding too much indicator (more than 4 drops): phenolphthalein is itself a weak acid and can slightly alter your titration volume.',
      visualState: 'indicator'
    },
    {
      stepNumber: 4,
      title: 'Rough Titration Run',
      subtitle: 'Determine approximate equivalence volume within 1–2 mL',
      instructions: [
        'Operate the burette stopcock with your non-dominant hand wrapping around the barrel.',
        'Swirl the Erlenmeyer flask continuously in smooth circles with your dominant hand.',
        'Deliver NaOH titrant in steady 1 mL increments.',
        'Notice transient pink clouds appearing where drops land and quickly dissipating upon swirling.',
        'As pink color begins to linger longer before vanishing, slow delivery rate.'
      ],
      proTip: 'The rough trial saves time on subsequent precision runs by revealing the approximate endpoint volume (e.g. ~24 mL).',
      visualState: 'swirling'
    },
    {
      stepNumber: 5,
      title: 'Precision Dropwise Approach & Endpoint',
      subtitle: 'Pinpoint stoichiometric equivalence drop by drop',
      instructions: [
        'For precision trials, run titrant rapidly to 1.5 mL before the estimated rough volume.',
        'Slow down to drop-by-drop delivery (one drop every 2–3 seconds).',
        'Rinse the inner neck of the flask with a jet of distilled water to wash down adhering droplets.',
        'Deliver half-drops by letting a droplet form on the tip, touching the flask wall, and rinsing down.',
        'Stop immediately when ONE single drop turns the entire solution FAINT PALE PINK for 30 seconds!'
      ],
      proTip: 'If your flask is hot magenta or dark purple, you have over-titrated! The true endpoint is barely perceptible pale pink.',
      visualState: 'endpoint'
    },
    {
      stepNumber: 6,
      title: 'Meniscus Reading & Concordant Titres',
      subtitle: 'Record final volume and verify concordancy within ±0.10 mL',
      instructions: [
        'Allow 15 seconds for drainage along the burette walls.',
        'Read the final meniscus volume at eye level to nearest ±0.02 mL (e.g., 24.35 mL).',
        'Subtract Initial Reading from Final Reading to determine Titre Volume.',
        'Repeat titration until at least 2 consecutive trials agree within ±0.10 mL (concordant titres).',
        'Calculate the mean of concordant titres and compute unknown analyte molarity.'
      ],
      proTip: 'Never include the rough trial in your final concordant average!',
      visualState: 'reading'
    }
  ];

  // Interactive Endpoint Simulator
  phValue: number = 7.0;

  get endpointColorStyle(): { [key: string]: string } {
    if (this.phValue < 8.0) {
      // Colorless
      return {
        'background-color': 'rgba(255, 255, 255, 0.4)',
        'border-color': '#cbd5e1',
        'color': '#64748b'
      };
    } else if (this.phValue <= 8.5) {
      // Ideal faint pink endpoint
      return {
        'background-color': 'rgba(244, 114, 182, 0.35)',
        'border-color': '#f472b6',
        'color': '#9d174d'
      };
    } else {
      // Over-titrated deep magenta
      return {
        'background-color': 'rgba(219, 39, 119, 0.85)',
        'border-color': '#be185d',
        'color': '#ffffff'
      };
    }
  }

  get endpointEvaluation(): { label: string; badgeClass: string; desc: string } {
    if (this.phValue < 8.0) {
      return {
        label: 'Pre-Endpoint (Acidic/Neutral)',
        badgeClass: 'badge-navy',
        desc: 'Analyte is acidic or neutral (pH < 8.2). Phenolphthalein remains completely clear & colorless.'
      };
    } else if (this.phValue <= 8.5) {
      return {
        label: 'PERFECT ENDPOINT REACHED',
        badgeClass: 'badge-emerald',
        desc: 'Ideal stoichiometric equivalence! Persistent faint blush lasting >=30 seconds. Stop titration immediately.'
      };
    } else {
      return {
        label: 'OVER-TITRATED (Excess NaOH)',
        badgeClass: 'badge-rose',
        desc: 'Over-titration error! Vivid magenta signifies excess sodium hydroxide was added past equivalence.'
      };
    }
  }

  // Interactive Calculator ($C_1 V_1 = C_2 V_2$)
  calcV1: number = 25.00; // mL of HCl analyte
  calcC2: number = 0.100; // M of NaOH standard titrant
  calcV2: number = 24.35; // mL average titre of NaOH

  get calculatedMolarity(): number {
    if (!this.calcV1 || this.calcV1 <= 0) return 0;
    return +((this.calcC2 * this.calcV2) / this.calcV1).toFixed(4);
  }

  get checklistProgress(): number {
    const total = this.checklist.length;
    const completed = this.checklist.filter(c => c.checked).length;
    return Math.round((completed / total) * 100);
  }

  constructor(private equipmentService: EquipmentService) {}

  get currentStep(): TitrationStep {
    return this.steps[this.currentStepIndex];
  }

  goToStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.currentStepIndex = index;
    }
  }

  nextStep(): void {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
    }
  }

  prevStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  toggleChecklistItem(id: number): void {
    const item = this.checklist.find(c => c.id === id);
    if (item) {
      item.checked = !item.checked;
    }
  }

  openEquipmentDossier(id: string): void {
    const equip = this.equipmentService.getById(id);
    if (equip) {
      this.selectedEquipmentModal = equip;
    }
  }

  closeModal(): void {
    this.selectedEquipmentModal = null;
  }
}
