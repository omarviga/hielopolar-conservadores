
import { supabase } from '@/integrations/supabase/client';
import { Asset } from '@/components/AssetCard';
import { mockAssets } from '@/data/mockAssets';
import { FormattedAsset } from './types';
import { Tables } from '@/integrations/supabase/types';

export const fetchAssets = async () => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    console.log('No hay datos de conservadores en Supabase, inicializando con datos de ejemplo...');
    await initializeAssets();
    
    const { data: initialData, error: initialError } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (initialError) {
      console.error('Error fetching initial assets:', initialError);
      throw initialError;
    }
    
    return initialData as Tables<'assets'>[];
  }

  return data as Tables<'assets'>[];
};

export const initializeAssets = async () => {
  try {
    const { error } = await supabase
      .from('assets')
      .insert(mockAssets.map(asset => ({
        id: asset.id,
        model: asset.model,
        serial_number: asset.serialNumber,
        status: asset.status,
        location: asset.location,
        last_maintenance: asset.lastMaintenance,
        capacity: asset.capacity,
        temperature_range: asset.temperatureRange,
        image_src: asset.imageSrc,
        coordinates: asset.coordinates ? JSON.stringify(asset.coordinates) : null,
        assigned_to: asset.assignedTo || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })));

    if (error) {
      console.error('Error initializing assets:', error);
      throw error;
    }
  } catch (err) {
    console.error('Error in initializeAssets:', err);
    throw err;
  }
};

export const transformDatabaseAsset = (asset: Tables<'assets'>): Asset => ({
  id: asset.id,
  model: asset.model,
  serialNumber: asset.serial_number || '',
  status: asset.status as Asset['status'],
  location: asset.location || '',
  lastMaintenance: asset.last_maintenance || '',
  capacity: asset.capacity || '',
  temperatureRange: asset.temperature_range || '',
  imageSrc: asset.image_src || '',
  coordinates: asset.coordinates ? JSON.parse(asset.coordinates) : null,
  assignedTo: asset.assigned_to || null
});

