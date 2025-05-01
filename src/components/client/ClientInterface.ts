
export interface Client {
  id: string;
  name: string;
  contactPerson?: string; // Making this optional with ?
  phone?: string;
  email: string;
  address?: string;
  assetsAssigned: number;
  maxCredit: number;
  activeCredit: number;
  status: 'active' | 'inactive';
  imageSrc: string;
  coordinates?: [number, number]; // Longitud, Latitud
  channelType: 'tradicional' | 'moderno' | 'industrial';
  conserverProductivity: number;
  conserver?: string; // Conservador asignado
  createdAt?: string; // Fecha de creación
}
