
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { Asset } from '@/components/AssetCard';
import { mockAssets } from '@/data/mockAssets';

export const useAssets = () => {
  const queryClient = useQueryClient();

  // Función para cargar assets desde Supabase
  const fetchAssets = async () => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assets:', error);
      throw error;
    }

    // Si no hay datos, inicializamos con los datos mock una vez
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
      
      return initialData as Asset[];
    }

    return data as Asset[];
  };

  // Inicializar con datos mock si no hay datos
  const initializeAssets = async () => {
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
          assigned_to: asset.assignedTo || null
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

  // Query para obtener los assets
  const { data: assets = [], isLoading, error } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    retry: 1,
  });

  // Mutation para agregar un nuevo asset
  const addAssetMutation = useMutation({
    mutationFn: async (asset: Asset) => {
      const formattedAsset = {
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
        assigned_to: asset.assignedTo || null
      };

      const { data, error } = await supabase
        .from('assets')
        .insert(formattedAsset)
        .select()
        .single();

      if (error) {
        console.error('Error creating asset:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      toast({
        title: "Conservador añadido",
        description: "El conservador ha sido añadido con éxito.",
      });
    },
    onError: (error) => {
      console.error('Error al añadir conservador:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el conservador. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  // Mutation para actualizar un asset existente
  const updateAssetMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Asset> & { id: string }) => {
      const formattedUpdates: any = {};
      
      if (updates.model) formattedUpdates.model = updates.model;
      if (updates.serialNumber) formattedUpdates.serial_number = updates.serialNumber;
      if (updates.status) formattedUpdates.status = updates.status;
      if (updates.location) formattedUpdates.location = updates.location;
      if (updates.lastMaintenance) formattedUpdates.last_maintenance = updates.lastMaintenance;
      if (updates.capacity) formattedUpdates.capacity = updates.capacity;
      if (updates.temperatureRange) formattedUpdates.temperature_range = updates.temperatureRange;
      if (updates.imageSrc) formattedUpdates.image_src = updates.imageSrc;
      if (updates.coordinates) formattedUpdates.coordinates = JSON.stringify(updates.coordinates);
      if ('assignedTo' in updates) formattedUpdates.assigned_to = updates.assignedTo || null;

      const { data, error } = await supabase
        .from('assets')
        .update(formattedUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating asset:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      toast({
        title: "Conservador actualizado",
        description: "La información del conservador ha sido actualizada.",
      });
    },
    onError: (error) => {
      console.error('Error al actualizar conservador:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el conservador. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  // Mutation para eliminar un asset
  const deleteAssetMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting asset:', error);
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      toast({
        title: "Conservador eliminado",
        description: "El conservador ha sido eliminado de la base de datos.",
      });
    },
    onError: (error) => {
      console.error('Error al eliminar conservador:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el conservador. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  const transformedAssets = assets.map((asset: any) => ({
    id: asset.id,
    model: asset.model,
    serialNumber: asset.serial_number,
    status: asset.status,
    location: asset.location,
    lastMaintenance: asset.last_maintenance,
    capacity: asset.capacity,
    temperatureRange: asset.temperature_range,
    imageSrc: asset.image_src,
    coordinates: asset.coordinates ? JSON.parse(asset.coordinates) : null,
    assignedTo: asset.assigned_to
  }));

  return {
    assets: transformedAssets,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    addAsset: (asset: Asset) => addAssetMutation.mutate(asset),
    updateAsset: (id: string, updates: Partial<Asset>) => updateAssetMutation.mutate({ id, ...updates }),
    deleteAsset: (id: string) => deleteAssetMutation.mutate(id)
  };
};
