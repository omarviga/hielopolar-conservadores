import { supabase } from '@/integrations/supabase/client';
import { Asset } from '@/components/AssetCard';
import { Tables } from '@/integrations/supabase/types';

export interface FormattedAsset extends Omit<Tables<'assets'>, 'created_at' | 'updated_at'> {
  created_at?: string;
  updated_at?: string;
}

export const fetchAssets = async (): Promise<Tables<'assets'>[]> => {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching assets:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Failed to fetch assets:", error);
    throw error;
  }
};

export const transformDatabaseAsset = (asset: any): Asset => ({
  id: asset.id,
  model: asset.model,
  location: asset.location || '',
  capacity: asset.capacity || '',
  assignedTo: asset.assigned_to || '',
  status: asset.status || 'available',
  serialNumber: asset.serial_number || '',
  lastMaintenance: asset.last_maintenance || '',
  temperatureRange: asset.temperature_range || '',
  coordinates: asset.coordinates ? JSON.parse(asset.coordinates) : undefined,
  imageSrc: asset.image_src || ''
});
