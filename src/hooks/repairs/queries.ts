import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Tipo intermedio explícito para Supabase
interface DbRepair {
  id: number;
  asset_id: string;
  repair_number?: string | null;
  // ... todas las demás propiedades exactamente como vienen de Supabase
  created_at: string;
  updated_at: string;
}

// Función de mapeo con tipos explícitos
const toRepair = (dbRepair: DbRepair): Repair => ({
  id: dbRepair.id.toString(),
  asset_id: dbRepair.asset_id,
  repair_number: dbRepair.repair_number || undefined,
  // ... mapeo de todas las propiedades
  created_at: dbRepair.created_at,
  updated_at: dbRepair.updated_at
});

export const useRepairQueries = (assetId?: string) => {
  const fetchRepairs = async (): Promise<Repair[]> => {
    let query = supabase.from('repairs').select('*');
    
    if (assetId) {
      query = query.eq('asset_id', assetId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    
    return (data as DbRepair[]).map(toRepair);
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
    
    return toRepair(data as DbRepair);
  };

  return {
    repairs: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    getRepairById
  };
};
