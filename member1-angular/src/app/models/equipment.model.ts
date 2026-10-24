export type EquipmentCategory = 
  | 'volumetric' 
  | 'reaction' 
  | 'optics' 
  | 'separation' 
  | 'measurement' 
  | 'heating'
  | 'clamping'
  | 'safety'
  | 'general';

export interface EquipmentSpecification {
  label: string;
  value: string;
  isExample: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  alternateNames?: string[];
  category: EquipmentCategory;
  categoryLabel: string;
  iconSvg: string;
  tagline: string;
  description: string;
  commonUses: string[];
  specifications: EquipmentSpecification[];
  operatingInstructions: string[];
  safetyPrecautions: string[];
  commonMistakes: string[];
  relatedEquipmentIds: string[];
  standardMaterial: string;
  cleaningAndStorage: string;
  accuracyLevel?: string;
}

export interface EquipmentFilterOptions {
  searchQuery?: string;
  category?: EquipmentCategory | 'all';
  favoritesOnly?: boolean;
  sortBy?: 'name' | 'category' | 'popularity';
}
