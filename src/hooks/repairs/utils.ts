
import { Repair } from '@/types/repairs';

// Helper to map database repair to our Repair type
export const mapDbRepairToRepair = (dbRepair: any): Repair => {
  return {
    id: dbRepair.id.toString(),
    asset_id: dbRepair.asset_id || "",
    repair_number: dbRepair.order_number,
    customer_name: dbRepair.customer_name,
    customer_phone: dbRepair.customer_phone,
    customer_email: dbRepair.customer_email,
    equipment_type: dbRepair.equipment_type,
    problem_description: dbRepair.problem_description,
    diagnosis: dbRepair.diagnosis,
    repair_type: dbRepair.repair_type || "corrective",
    priority: dbRepair.priority || "medium",
    status: dbRepair.status,
    assigned_to: dbRepair.assigned_to,
    brand: dbRepair.brand,
    model: dbRepair.model,
    serial_number: dbRepair.serial_number,
    parts_used: dbRepair.parts_used || [],
    estimated_completion: dbRepair.estimated_completion,
    completed_at: dbRepair.completed_at,
    created_at: dbRepair.created_at,
    updated_at: dbRepair.updated_at,
    created_by: dbRepair.created_by,
    notes: dbRepair.notes,
    order_number: dbRepair.order_number,
    description: dbRepair.problem_description,
  };
};
