
import { Repair } from '@/types/repairs';

// Helper to map database repair to our Repair type
export const mapDbRepairToRepair = (dbRepair: Record<string, unknown>): Repair => {
  return {
    id: String(dbRepair.id || ""),
    asset_id: String(dbRepair.asset_id || ""),
    repair_number: dbRepair.order_number as string | undefined,
    customer_name: String(dbRepair.customer_name || ""),
    customer_phone: dbRepair.customer_phone as string | undefined,
    customer_email: dbRepair.customer_email as string | undefined,
    equipment_type: String(dbRepair.equipment_type || ""),
    problem_description: String(dbRepair.problem_description || ""),
    diagnosis: dbRepair.diagnosis as string | undefined,
    repair_type: (dbRepair.repair_type as string || "corrective") as "preventive" | "corrective",
    priority: (dbRepair.priority as string || "medium") as "low" | "medium" | "high" | "urgent",
    status: (dbRepair.status as string) as "pending" | "in_progress" | "completed" | "cancelled",
    assigned_to: dbRepair.assigned_to as string | undefined,
    brand: dbRepair.brand as string | undefined,
    model: dbRepair.model as string | undefined,
    serial_number: dbRepair.serial_number as string | undefined,
    parts_used: Array.isArray(dbRepair.parts_used) ? dbRepair.parts_used : 
               (typeof dbRepair.parts_used === 'string' ? [dbRepair.parts_used] : []),
    estimated_completion: String(dbRepair.estimated_completion || ""),
    completed_at: dbRepair.completed_at as string | undefined,
    created_at: String(dbRepair.created_at || ""),
    updated_at: String(dbRepair.updated_at || ""),
    created_by: dbRepair.created_by as string | undefined,
    notes: dbRepair.notes as string | undefined,
    order_number: String(dbRepair.order_number || ""),
    description: dbRepair.problem_description as string | undefined,
  };
};
