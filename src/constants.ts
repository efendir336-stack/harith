import { RABCategory, ProjectSpecs } from './types';

export const DEFAULT_UNIT_PRICES = {
  // Lokasi: Kabupaten Berau, Kalimantan Timur (Estimasi Harga 2024/2025)
  // Harga sudah disesuaikan dengan biaya logistik wilayah Kalimantan
  
  // Pekerjaan Persiapan
  PEMBERSIHAN_LAHAN: 22000, // per m2
  PENGUKURAN_BOUWPLANK: 65000, // per m1
  
  // Pekerjaan Tanah
  GALIAN_TANAH: 95000, // per m3
  URUGAN_PASIR: 285000, // per m3 (Pasir lokal Berau/Samarinda)
  URUGAN_TANAH_KEMBALI: 35000, // per m3
  
  // Pekerjaan Beton (Ready Mix/Site Mix Berau)
  BETON_K225: 1650000, // per m3
  BESI_BETON: 18500, // per kg
  BEKISTING: 245000, // per m2
  
  // Pekerjaan Dinding
  PASANGAN_BATA: 195000, // per m2 (Bata lokal/Bata ringan)
  PLESTERAN: 85000, // per m2
  ACIAN: 45000, // per m2
  
  // Pekerjaan Lantai
  GRANIT_60X60: 325000, // per m2
  KERAMIK_40X40: 215000, // per m2
  
  // Pekerjaan Atap
  RANGKA_BAJA_RINGAN: 225000, // per m2
  GENTENG_METAL: 135000, // per m2
  PLAFON_GYPSUM: 145000, // per m2
  
  // Finishing
  CAT_DINDING: 48000, // per m2
  CAT_PLAFON: 42000, // per m2

  // Kusen, Pintu & Jendela
  KUSEN_ALUMINIUM: 185000, // per m1
  PINTU_UTAMA_KACA: 4500000, // per unit (Lengkap)
  PINTU_STANDAR: 2250000, // per unit (Lengkap)
  JENDELA_KACA_PERMANEN: 950000, // per m2
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
    },
    {
      id: 'door-window',
      title: 'VII. PEKERJAAN KUSEN, PINTU & JENDELA',
      items: [
        {
          id: 'dw-1',
          description: 'Kusen Aluminium 4" (Coklat/Silver)',
          unit: 'm1',
          quantity: (perimeter * 0.5) + 24, // Estimasi panjang kusen
          unitPrice: DEFAULT_UNIT_PRICES.KUSEN_ALUMINIUM,
          totalPrice: ((perimeter * 0.5) + 24) * DEFAULT_UNIT_PRICES.KUSEN_ALUMINIUM
        },
        {
          id: 'dw-2',
          description: 'Pintu Utama Kaca Frame Aluminium (Double Swing)',
          unit: 'Set',
          quantity: 2,
          unitPrice: DEFAULT_UNIT_PRICES.PINTU_UTAMA_KACA,
          totalPrice: 2 * DEFAULT_UNIT_PRICES.PINTU_UTAMA_KACA
        },
        {
          id: 'dw-3',
          description: 'Pintu Standar Aluminium/PVC',
          unit: 'Set',
          quantity: 4,
          unitPrice: DEFAULT_UNIT_PRICES.PINTU_STANDAR,
          totalPrice: 4 * DEFAULT_UNIT_PRICES.PINTU_STANDAR
        },
        {
          id: 'dw-4',
          description: 'Jendela Kaca Permanen 6mm',
          unit: 'm2',
          quantity: (perimeter * 0.2) * 1.5, // Estimasi luas kaca
          unitPrice: DEFAULT_UNIT_PRICES.JENDELA_KACA_PERMANEN,
          totalPrice: ((perimeter * 0.2) * 1.5) * DEFAULT_UNIT_PRICES.JENDELA_KACA_PERMANEN
        }
      ]
    }
  ];
  
  return categories;
};
