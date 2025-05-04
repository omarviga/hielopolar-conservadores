
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mapDbRepairToRepair } from './utils';
import type { Repair } from '@/types/repairs';

// Create a type for database records
type DbRepair = Record<string, unknown>;

export const useRepairQueries = (assetId?: string) => {
  // Create a properly typed fetch function
  const fetchRepairs = async (assetId?: string): Promise<Repair[]> => {
    let query = supabase.from('repairs').select('*');
    
    if (assetId) {
      query = query.eq('asset_id', assetId);
    }
    
    const { data: dbResults, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!dbResults) return [];
    
    // Convert database rows to typed repairs
    const repairs: Repair[] = [];
    for (const row of dbResults) {
      repairs.push(mapDbRepairToRepair(row as DbRepair));
    }
    return repairs;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repairs', assetId],
    queryFn: () => fetchRepairs(assetId),
  });

  const getRepairById = async (id: string): Promise<Repair | null> => {
    try {
      const { data: rawData, error } = await supabase
        .from('repairs')
        .select('*')
        .eq('id', parseInt(id))
        .single();
      
      if (error || !rawData) return null;
      
      return mapDbRepairToRepair(rawData as DbRepair);
    } catch (err) {
      console.error('Error fetching repair:', err);
      return null;
    }
  };

  return {
    repairs: data || [],
    isLoading,
    isError,
    error,
    getRepairById,
  };
};
