
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Repair } from '@/types/repairs';

// Tipo intermedio explícito para Supabase
interface DbRepair {
  id: number;
  asset_id?: string;
  repair_number?: string | null;
  created_at: string;
  updated_at: string;
  customer_name: string;
  customer_phone?: string | null;
  customer_email?: string | null;
  equipment_type: string;
  problem_description: string;
  diagnosis?: string | null;
  repair_type?: string;
  priority?: string;
  status: string;
  assigned_to?: string | null;
  brand?: string | null;
  model?: string | null;
  serial_number?: string | null;
  parts_used?: string[] | string | null;
  estimated_completion?: string | null;
  completed_at?: string | null;
  created_by?: string | null;
  notes?: string | null;
  order_number: string;
}

// Función de mapeo con tipos explícitos
const toRepair = (dbRepair: DbRepair): Repair => ({
  id: dbRepair.id.toString(),
  asset_id: dbRepair.asset_id || "",
  repair_number: dbRepair.repair_number || undefined,
  customer_name: dbRepair.customer_name,
  customer_phone: dbRepair.customer_phone || undefined,
  customer_email: dbRepair.customer_email || undefined,
  equipment_type: dbRepair.equipment_type,
  problem_description: dbRepair.problem_description,
  diagnosis: dbRepair.diagnosis || undefined,
  repair_type: (dbRepair.repair_type || "corrective") as "preventive" | "corrective",
  priority: (dbRepair.priority || "medium") as "low" | "medium" | "high" | "urgent",
  status: (dbRepair.status || "pending") as "pending" | "in_progress" | "completed" | "cancelled",
  assigned_to: dbRepair.assigned_to || undefined,
  brand: dbRepair.brand || undefined,
  model: dbRepair.model || undefined,
  serial_number: dbRepair.serial_number || undefined,
  parts_used: Array.isArray(dbRepair.parts_used) ? dbRepair.parts_used : 
              (typeof dbRepair.parts_used === 'string' ? [dbRepair.parts_used] : []),
  estimated_completion: dbRepair.estimated_completion || "",
  completed_at: dbRepair.completed_at || undefined,
  created_at: dbRepair.created_at,
  updated_at: dbRepair.updated_at,
  created_by: dbRepair.created_by || undefined,
  notes: dbRepair.notes || undefined,
  order_number: dbRepair.order_number,
  description: dbRepair.problem_description
});

export const useRepairQueries = (assetId?: string) => {
  const fetchRepairs = async (): Promise<Repair[]> => {
    let query = supabase.from('repairs').select('*');
    
    if (assetId) {
      query = query.eq('asset_id', assetId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    
    // Cast explicitly to avoid type errors
    const castedData = data as unknown as DbRepair[];
    return castedData.map(toRepair);
  };

  // Opciones de query con tipos explícitos
  const options: UseQueryOptions<Repair[], Error> = {
    queryKey: ['repairs', assetId],
    queryFn: fetchRepairs,
    structuralSharing: false, // Importante para evitar recursión
    staleTime: 5 * 60 * 1000 // 5 minutos
  };

  const query = useQuery(options);

  const getRepairById = async (id: string): Promise<Repair | null> => {
    const { data, error } = await supabase
      .from('repairs')
      .select('*')
      .eq('id', parseInt(id))
      .single();

    if (error || !data) return null;
    
    // Cast explicitly to avoid type errors
    const castedData = data as unknown as DbRepair;
    return toRepair(castedData);
  };

  return {
    repairs: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    getRepairById
  };
};
