export interface RABItem {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface RABCategory {
  id: string;
  title: string;
  items: RABItem[];
}

export interface FundingSource {
  id: string;
  name: string;
  amount: number;
  date: string;
}

export interface ProjectSpecs {
  length: number;
  width: number;
  height: number;
  quality: 'standard' | 'premium' | 'luxury';
  fundingSources: FundingSource[];
  allocationMode: 'auto' | 'manual';
  manualAllocations: Record<string, number>;
}

export interface UnitPrice {
  id: string;
  description: string;
  unit: string;
  price: number;
}
