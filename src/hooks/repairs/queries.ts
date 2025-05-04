
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mapDbRepairToRepair } from './utils';
import type { Repair } from '@/types/repairs';

export const useRepairQueries = (assetId?: string) => {
  // Fetch all repairs or repairs for a specific asset
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repairs', assetId],
    queryFn: async (): Promise<Repair[]> => {
      let query = supabase.from('repairs').select('*');
      
      if (assetId) {
        query = query.eq('asset_id', assetId);
      }
      
      const { data: dbData, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Use type assertion to break type inference chain
      const repairs: Repair[] = [];
      
      if (dbData) {
        // Manual loop instead of map to avoid deep type instantiation
        for (let i = 0; i < dbData.length; i++) {
          const item = dbData[i] as Record<string, any>;
          repairs.push(mapDbRepairToRepair(item));
        }
      }
      
      return repairs;
    },
  });

  // Get a repair by ID - defined as a separate function to avoid deep instantiation
  const getRepairById = async (id: string): Promise<Repair | null> => {
    const { data, error } = await supabase
      .from('repairs')
      .select('*')
      .eq('id', parseInt(id))
      .single();
    
    if (error) {
      console.error('Error fetching repair:', error);
      return null;
    }
    
    // Use type assertion to break type inference chain
    return data ? mapDbRepairToRepair(data as Record<string, any>) : null;
  };

  return {
    repairs: data || [],
    isLoading,
    isError,
    error,
    getRepairById,
  };
};
