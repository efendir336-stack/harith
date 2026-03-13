import { RABCategory, ProjectSpecs } from './types';

export const DEFAULT_UNIT_PRICES = {
  // Pekerjaan Persiapan
  PEMBERSIHAN_LAHAN: 15000, // per m2
  PENGUKURAN_BOUWPLANK: 45000, // per m1
  
  // Pekerjaan Tanah
  GALIAN_TANAH: 75000, // per m3
  URUGAN_PASIR: 185000, // per m3
  URUGAN_TANAH_KEMBALI: 25000, // per m3
  
  // Pekerjaan Beton
  BETON_K225: 1250000, // per m3
  BESI_BETON: 15500, // per kg
  BEKISTING: 185000, // per m2
  
  // Pekerjaan Dinding
  PASANGAN_BATA: 145000, // per m2
  PLESTERAN: 65000, // per m2
  ACIAN: 35000, // per m2
  
  // Pekerjaan Lantai
  GRANIT_60X60: 250000, // per m2
  KERAMIK_40X40: 165000, // per m2
  
  // Pekerjaan Atap
  RANGKA_BAJA_RINGAN: 185000, // per m2
  GENTENG_METAL: 95000, // per m2
  PLAFON_GYPSUM: 115000, // per m2
  
  // Finishing
  CAT_DINDING: 35000, // per m2
  CAT_PLAFON: 30000, // per m2
};

export const calculateRAB = (specs: ProjectSpecs): RABCategory[] => {
  const { length, width, height } = specs;
  const area = length * width;
  const perimeter = 2 * (length + width);
  
  // Logic sederhana untuk estimasi otomatis
  // Ini adalah model matematis dasar konstruksi
  
  const categories: RABCategory[] = [
    {
      id: 'prep',
      title: 'I. PEKERJAAN PERSIAPAN',
      items: [
        {
          id: 'prep-1',
          description: 'Pembersihan Lahan dan Perataan',
          unit: 'm2',
          quantity: area * 1.1,
          unitPrice: DEFAULT_UNIT_PRICES.PEMBERSIHAN_LAHAN,
          totalPrice: (area * 1.1) * DEFAULT_UNIT_PRICES.PEMBERSIHAN_LAHAN
        },
        {
          id: 'prep-2',
          description: 'Pemasangan Bouwplank',
          unit: 'm1',
          quantity: perimeter + 8,
          unitPrice: DEFAULT_UNIT_PRICES.PENGUKURAN_BOUWPLANK,
          totalPrice: (perimeter + 8) * DEFAULT_UNIT_PRICES.PENGUKURAN_BOUWPLANK
        }
      ]
    },
    {
      id: 'earth',
      title: 'II. PEKERJAAN TANAH & PONDASI',
      items: [
        {
          id: 'earth-1',
          description: 'Galian Tanah Pondasi Footplat (25 titik)',
          unit: 'm3',
          quantity: 25 * (1.2 * 1.2 * 1.5),
          unitPrice: DEFAULT_UNIT_PRICES.GALIAN_TANAH,
          totalPrice: 25 * (1.2 * 1.2 * 1.5) * DEFAULT_UNIT_PRICES.GALIAN_TANAH
        },
        {
          id: 'earth-2',
          description: 'Urugan Pasir Bawah Pondasi',
          unit: 'm3',
          quantity: area * 0.1,
          unitPrice: DEFAULT_UNIT_PRICES.URUGAN_PASIR,
          totalPrice: (area * 0.1) * DEFAULT_UNIT_PRICES.URUGAN_PASIR
        }
      ]
    },
    {
      id: 'concrete',
      title: 'III. PEKERJAAN BETON STRUKTUR',
      items: [
        {
          id: 'conc-1',
          description: 'Beton Struktur K-225 (Kolom, Sloof, Ring Balok)',
          unit: 'm3',
          quantity: area * 0.25, // Estimasi volume beton per m2 luas
          unitPrice: DEFAULT_UNIT_PRICES.BETON_K225,
          totalPrice: (area * 0.25) * DEFAULT_UNIT_PRICES.BETON_K225
        },
        {
          id: 'conc-2',
          description: 'Pembesian (120kg/m3 beton)',
          unit: 'kg',
          quantity: (area * 0.25) * 120,
          unitPrice: DEFAULT_UNIT_PRICES.BESI_BETON,
          totalPrice: ((area * 0.25) * 120) * DEFAULT_UNIT_PRICES.BESI_BETON
        }
      ]
    },
    {
      id: 'wall',
      title: 'IV. PEKERJAAN DINDING & PLESTERAN',
      items: [
        {
          id: 'wall-1',
          description: 'Pasangan Bata Merah 1:4',
          unit: 'm2',
          quantity: perimeter * height * 0.8, // dikurangi lubang pintu/jendela
          unitPrice: DEFAULT_UNIT_PRICES.PASANGAN_BATA,
          totalPrice: (perimeter * height * 0.8) * DEFAULT_UNIT_PRICES.PASANGAN_BATA
        },
        {
          id: 'wall-2',
          description: 'Plesteran + Acian (2 sisi)',
          unit: 'm2',
          quantity: (perimeter * height * 0.8) * 2,
          unitPrice: DEFAULT_UNIT_PRICES.PLESTERAN + DEFAULT_UNIT_PRICES.ACIAN,
          totalPrice: (perimeter * height * 0.8) * 2 * (DEFAULT_UNIT_PRICES.PLESTERAN + DEFAULT_UNIT_PRICES.ACIAN)
        }
      ]
    },
    {
      id: 'floor',
      title: 'V. PEKERJAAN LANTAI & PLAFON',
      items: [
        {
          id: 'floor-1',
          description: 'Pasangan Lantai Granit 60x60 (Utama)',
          unit: 'm2',
          quantity: area * 0.9,
          unitPrice: DEFAULT_UNIT_PRICES.GRANIT_60X60,
          totalPrice: (area * 0.9) * DEFAULT_UNIT_PRICES.GRANIT_60X60
        },
        {
          id: 'floor-2',
          description: 'Plafon Gypsum Board 9mm + Rangka',
          unit: 'm2',
          quantity: area,
          unitPrice: DEFAULT_UNIT_PRICES.PLAFON_GYPSUM,
          totalPrice: area * DEFAULT_UNIT_PRICES.PLAFON_GYPSUM
        }
      ]
    },
    {
      id: 'roof',
      title: 'VI. PEKERJAAN ATAP',
      items: [
        {
          id: 'roof-1',
          description: 'Rangka Atap Baja Ringan',
          unit: 'm2',
          quantity: area * 1.3, // Kemiringan atap
          unitPrice: DEFAULT_UNIT_PRICES.RANGKA_BAJA_RINGAN,
          totalPrice: (area * 1.3) * DEFAULT_UNIT_PRICES.RANGKA_BAJA_RINGAN
        },
        {
          id: 'roof-2',
          description: 'Penutup Atap Genteng Metal Pasir',
          unit: 'm2',
          quantity: area * 1.3,
          unitPrice: DEFAULT_UNIT_PRICES.GENTENG_METAL,
          totalPrice: (area * 1.3) * DEFAULT_UNIT_PRICES.GENTENG_METAL
        }
      ]
    }
  ];
  
  return categories;
};
