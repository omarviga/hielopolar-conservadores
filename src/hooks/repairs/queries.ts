import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Repair } from '@/types/repairs';

// 1. Tipo explícito para la respuesta de Supabase
type SupabaseRepair = {
  id: number;
  asset_id: string;
  created_at: string;
  // Añade todos los campos que esperas de la base de datos
};

// 2. Función de mapeo separada con tipos explícitos
const mapToRepair = (data: SupabaseRepair): Repair => ({
  id: data.id.toString(),
  assetId: data.asset_id,
  createdAt: new Date(data.created_at),
  // Mapea todos los campos necesarios
});

// 3. Query con tipos explícitos en cada nivel
export const useRepairQueries = (assetId?: string) => {
  const fetchRepairs = async (): Promise<Repair[]> => {
    let query = supabase.from('repairs').select('*');
    
    if (assetId) {
      query = query.eq('asset_id', assetId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data ? data.map(mapToRepair) : [];
  };

  // 4. Opciones de query con tipos manuales
  const options: UseQueryOptions<Repair[], Error> = {
    queryKey: ['repairs', assetId],
    queryFn: fetchRepairs,
  };

  const query = useQuery(options);

  return {
    repairs: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    getRepairById: async (id: string) => {
      const { data, error } = await supabase
        .from('repairs')
        .select('*')
        .eq('id', parseInt(id))
        .single();
      
      return data ? mapToRepair(data) : null;
    }
  };
};
