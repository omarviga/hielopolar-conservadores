
import { Client } from '@/components/client/ClientInterface';

export const initialClients: Client[] = [
  {
    id: 'CL-101',
    name: 'Pescados Norte',
    contactPerson: 'Juan Pérez',
    phone: '555-123-4567',
    email: 'contacto@pescadosnorte.mx',
    address: 'Av. Marina 123, Puerto Vallarta',
    assetsAssigned: 3,
    maxCredit: 5,
    activeCredit: 3,
    status: 'active',
    imageSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
    coordinates: [-105.2333, 20.6167], // Puerto Vallarta
    channelType: 'tradicional',
    conserverProductivity: 85,
  },
  {
    id: 'CL-102',
    name: 'Mariscos Sur',
    contactPerson: 'Ana González',
    phone: '555-765-4321',
    email: 'ana@mariscossur.mx',
    address: 'Calle Oceano 456, Acapulco',
    assetsAssigned: 2,
    maxCredit: 3,
    activeCredit: 2,
    status: 'active',
    imageSrc: 'https://randomuser.me/api/portraits/women/2.jpg',
    coordinates: [-99.8235, 16.8531], // Acapulco
    channelType: 'moderno',
    conserverProductivity: 92,
  },
  {
    id: 'CL-103',
    name: 'Hielos Centro',
    contactPerson: 'Carlos Rodríguez',
    phone: '555-987-6543',
    email: 'carlos@hieloscentro.mx',
    address: 'Av. Revolución 789, Ciudad de México',
    assetsAssigned: 1,
    maxCredit: 2,
    activeCredit: 1,
    status: 'inactive',
    imageSrc: 'https://randomuser.me/api/portraits/men/3.jpg',
    coordinates: [-99.1332, 19.4326], // CDMX
    channelType: 'industrial',
    conserverProductivity: 78,
  },
];
