import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mapDbRepairToRepair } from './utils';
import type { Repair } from '@/types/repairs';

// Explicitly type the query function return type
type FetchRepairsFn = (assetId?: string) => Promise<Repair[]>;

export const useRepairQueries = (assetId?: string) => {
  const fetchRepairs: FetchRepairsFn = async (assetId) => {
    let query = supabase.from('repairs').select('*');
    
    if (assetId) {
      query = query.eq('asset_id', assetId);
    }
    
    const { data: dbResults, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!dbResults) return [];
    
    return dbResults.map((rawItem) => mapDbRepairToRepair(rawItem));
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
      
      return mapDbRepairToRepair(rawData);
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
