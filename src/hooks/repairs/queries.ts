import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// 1. Define el tipo exacto que devuelve Supabase
type SupabaseRepair = {
  id: number; // <- Aquí está la diferencia clave
  asset_id: string;
  repair_number?: string | null;
  customer_name: string;
  // ... (repite todas las propiedades pero con tipos NULLABLES como Supabase las devuelve)
  created_at: string;
  updated_at: string;
};

// 2. Función de mapeo con validación de tipos
const mapSupabaseRepairToRepair = (dbRepair: SupabaseRepair): Repair => {
  return {
    id: dbRepair.id.toString(), // Conversión EXPLÍCITA de number a string
    asset_id: dbRepair.asset_id,
    repair_number: dbRepair.repair_number || undefined,
    customer_name: dbRepair.customer_name,
    // ... (mapea todas las propiedades)
    created_at: dbRepair.created_at,
    updated_at: dbRepair.updated_at
  };
};

export const useRepairQueries = (assetId?: string) => {
  const fetchRepairs = async (): Promise<Repair[]> => {
    let query = supabase.from('repairs').select('*');
    
    if (assetId) {
      query = query.eq('asset_id', assetId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    
    return (data as SupabaseRepair[]).map(mapSupabaseRepairToRepair);
  };

  const { data, isLoading, isError, error } = useQuery<Repair[], Error>({
    queryKey: ['repairs', assetId],
    queryFn: fetchRepairs,
    // Opción para limitar profundidad de tipos
    structuralSharing: false
  });

  const getRepairById = async (id: string): Promise<Repair | null> => {
    const { data, error } = await supabase
      .from('repairs')
      .select('*')
      .eq('id', parseInt(id))
      .single();

    if (error || !data) return null;
    
    return mapSupabaseRepairToRepair(data as SupabaseRepair);
  };

  return {
    repairs: data || [],
    isLoading,
    isError,
    error,
    getRepairById
  };
};
