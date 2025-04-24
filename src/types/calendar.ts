
export type EventType = 'maintenance' | 'inspection' | 'repair' | 'rental' | 'emergency';

export interface CalendarEvent {
  id: string;
  title: string;
  client: string;
  asset?: string;
  date: Date;
  endDate?: Date;
  type: EventType;
  technician?: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  rentalUnits?: number;
}
