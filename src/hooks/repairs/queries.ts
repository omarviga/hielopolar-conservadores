
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
      
      const { data: dbResults, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Create an empty array with explicit type to break inference chain
      const repairs: Repair[] = [];
      
      if (dbResults) {
        // Use a traditional for loop with index to avoid type inference issues
        for (let i = 0; i < dbResults.length; i++) {
          // Use a simple object type for intermediate data to break the chain
          const rawItem: Record<string, unknown> = dbResults[i];
          // Add the mapped item to our explicitly typed array
          repairs.push(mapDbRepairToRepair(rawItem));
        }
      }
      
      return repairs;
    },
    // Disable suspense to prevent additional type inference issues
    suspense: false,
  });

  // Get a repair by ID - defined as a separate function to avoid type inference issues
  const getRepairById = async (id: string): Promise<Repair | null> => {
    try {
      const { data: rawData, error } = await supabase
        .from('repairs')
        .select('*')
        .eq('id', parseInt(id))
        .single();
      
      if (error || !rawData) {
        console.error('Error fetching repair:', error);
        return null;
      }
      
      // Use explicit type casting to break the inference chain
      const rawItem: Record<string, unknown> = rawData;
      return mapDbRepairToRepair(rawItem);
    }
    catch (err) {
      console.error('Unexpected error in getRepairById:', err);
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
