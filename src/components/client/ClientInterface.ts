
export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  assetsAssigned: number;
  maxCredit: number;
  activeCredit: number;
  status: 'active' | 'inactive';
  imageSrc: string;
  coordinates?: [number, number]; // Longitud, Latitud
  channelType: 'tradicional' | 'moderno' | 'industrial';
  conserverProductivity: number;
}
