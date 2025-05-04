
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mapDbRepairToRepair } from './utils';
import type { Repair } from '@/types/repairs';

// Define a simple type for database records to avoid deep type instantiation
type DbRepair = {
  [key: string]: any;
};

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
    
    // Convert database rows to typed repairs using a simple loop
    // This avoids complex type inference that can cause deep instantiation errors
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
      
      // Use the simple type casting to avoid deep type instantiation
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
