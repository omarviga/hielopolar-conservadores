
export interface Asset {
  id: string;
  model: string;
  serialNumber: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  location: string;
  lastMaintenance: string;
  assignedTo?: string;
  capacity: string;
  temperatureRange: string;
  imageSrc: string;
}

export const statusLabels: Record<Asset['status'], string> = {
  'available': 'Disponible',
  'in-use': 'En Uso',
  'maintenance': 'Mantenimiento',
  'retired': 'Retirado'
};

export const statusClasses: Record<Asset['status'], string> = {
  'available': 'status-badge-available',
  'in-use': 'status-badge-in-use',
  'maintenance': 'status-badge-maintenance',
  'retired': 'status-badge-retired'
};
