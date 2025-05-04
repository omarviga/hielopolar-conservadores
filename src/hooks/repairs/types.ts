
import { Repair } from '@/types/repairs';

// Define simplified types for repair mutations to avoid excessive type instantiation
export interface AddRepairInput {
  asset_id?: string;
  equipment_type: string;
  problem_description: string;
  order_number?: string;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  diagnosis?: string;
  status?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  estimated_completion?: string;
  notes?: string;
  priority?: string;
  repair_type?: string;
  assigned_to?: string;
  parts_used?: string[] | string;
}

export interface UpdateRepairInput {
  id: string;
  equipment_type?: string;
  problem_description?: string;
  order_number?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  diagnosis?: string;
  status?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  estimated_completion?: string;
  notes?: string;
  priority?: string;
  repair_type?: string;
  assigned_to?: string;
  parts_used?: string[] | string;
  description?: string;
}
