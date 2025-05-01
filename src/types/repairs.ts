
export interface Repair {
  id: string;
  asset_id: string;
  repair_number?: string;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  equipment_type: string;
  problem_description: string;
  diagnosis?: string;
  repair_type: 'preventive' | 'corrective';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assigned_to?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  parts_used: string[];
  estimated_completion: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  notes?: string;
  order_number: string;
  description?: string;
}
