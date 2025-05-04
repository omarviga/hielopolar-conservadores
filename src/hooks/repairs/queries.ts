
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mapDbRepairToRepair } from './utils';
import { Repair } from '@/types/repairs';

export const useRepairQueries = (assetId?: string) => {
  // Fetch all repairs or repairs for a specific asset
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repairs', assetId],
    queryFn: async () => {
      let query = supabase.from('repairs').select('*');
      
      if (assetId) {
        query = query.eq('asset_id', assetId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data.map(mapDbRepairToRepair);
    },
  });

  // Get a repair by ID
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
    
    return mapDbRepairToRepair(data);
  };

  return {
    repairs: data || [],
    isLoading,
    isError,
    error,
    getRepairById,
  };
};
