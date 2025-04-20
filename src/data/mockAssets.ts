import { Asset } from '@/components/AssetCard';

// Clave para LocalStorage
export const ASSETS_STORAGE_KEY = 'hielo-polar-assets';

// Datos iniciales para cuando no hay datos guardados en localStorage
export const mockAssets: Asset[] = [
  {
    id: 'CON-001',
    model: 'Polar-3000XL',
    serialNumber: 'P3XL-12345',
    status: 'available',
    location: 'Acámbaro, Guanajuato',
    lastMaintenance: '15/03/2023',
    capacity: '250 bolsas (5kg)',
    temperatureRange: '-18°C a -22°C',
    imageSrc: 'https://images.unsplash.com/photo-1562184552-997c461abbe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
    coordinates: [-100.7221, 20.0307] // Acámbaro
  },
  {
    id: 'CON-002',
    model: 'Polar-1500M',
    serialNumber: 'P15M-67890',
    status: 'in-use',
    location: 'Tarandacuao, Guanajuato',
    lastMaintenance: '02/05/2023',
    assignedTo: 'Pescados Norte',
    capacity: '100 bolsas (5kg)',
    temperatureRange: '-15°C a -18°C',
    imageSrc: 'https://images.unsplash.com/photo-1596461010617-8549605ab3e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
    coordinates: [-100.5233, 20.0033] // Tarandacuao
  },
  {
    id: 'CON-003',
    model: 'Polar-2000M',
    serialNumber: 'P2M-24680',
    status: 'maintenance',
    location: 'Maravatío, Michoacán',
    lastMaintenance: '10/01/2023',
    capacity: '40 bolsas (5kg)',
    temperatureRange: '-20°C a -25°C',
    imageSrc: 'https://images.unsplash.com/photo-1589096044321-9274646f36fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
    coordinates: [-100.4414, 19.8742] // Maravatío
  },
  {
    id: 'CON-004',
    model: 'Polar-1000S',
    serialNumber: 'P1S-13579',
    status: 'available',
    location: 'Zinapécuaro, Michoacán',
    lastMaintenance: '20/04/2023',
    capacity: '60 bolsas (5kg)',
    temperatureRange: '-15°C a -18°C',
    imageSrc: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
    coordinates: [-100.8297, 19.8569] // Zinapécuaro
  },
  {
    id: 'CON-005',
    model: 'Polar-3500XL',
    serialNumber: 'P35XL-54321',
    status: 'in-use',
    location: 'Santa Ana Maya, Michoacán',
    lastMaintenance: '05/02/2023',
    assignedTo: 'Mariscos Sur',
    capacity: '250 bolsas (5kg)',
    temperatureRange: '-22°C a -25°C',
    imageSrc: 'https://images.unsplash.com/photo-1595246007497-68ae3d6f44cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
    coordinates: [-101.0119, 20.0064] // Santa Ana Maya
  },
  {
    id: 'CON-006',
    model: 'Polar-2500L',
    serialNumber: 'P25L-97531',
    status: 'available',
    location: 'Almacén Principal',
    lastMaintenance: '12/03/2023',
    capacity: '20 bolsas (5kg)',
    temperatureRange: '-18°C a -22°C',
    imageSrc: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'CON-007',
    model: 'Polar-1200S',
    serialNumber: 'P12S-86420',
    status: 'maintenance',
    location: 'Taller Norte',
    lastMaintenance: '01/04/2023',
    capacity: '40 bolsas (5kg)',
    temperatureRange: '-15°C a -18°C',
    imageSrc: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'CON-008',
    model: 'Polar-3000XL',
    serialNumber: 'P3XL-65432',
    status: 'in-use',
    location: 'Cliente: Hielos Centro',
    lastMaintenance: '18/02/2023',
    assignedTo: 'Hielos Centro',
    capacity: '100 bolsas (5kg)',
    temperatureRange: '-18°C a -22°C',
    imageSrc: 'https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  }
];
