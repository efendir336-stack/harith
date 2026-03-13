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

export interface ProjectSpecs {
  length: number;
  width: number;
  height: number;
  quality: 'standard' | 'premium' | 'luxury';
  receivedFunds: number;
}

export interface UnitPrice {
  id: string;
  description: string;
  unit: string;
  price: number;
}
