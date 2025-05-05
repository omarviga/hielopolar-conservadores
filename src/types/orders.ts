
export interface ServiceOrder {
  id: string;
  order_number: string;
  client_id?: string;
  client_name?: string;
  equipment_id?: string;
  equipment_type?: string;
  problem_description?: string;
  diagnosis?: string;
  solution?: string;
  status: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
  estimated_delivery_date?: string;
  actual_delivery_date?: string;
  repair_cost?: number;
  service_type: 'mantenimiento' | 'reparacion' | 'instalacion';
  created_at: string;
  updated_at: string;
}

export interface OrderDetail {
  id: string;
  order_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  type: 'repuesto' | 'servicio' | 'otro';
}

export interface OrderFormValues {
  client_id?: string;
  equipment_id?: string;
  equipment_type?: string;
  problem_description?: string;
  service_type: 'mantenimiento' | 'reparacion' | 'instalacion';
  status: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
  estimated_delivery_date?: string;
}
