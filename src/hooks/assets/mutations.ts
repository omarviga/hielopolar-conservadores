
import { supabase } from '@/integrations/supabase/client';
import { Asset } from '@/components/AssetCard';
import { toast } from '@/hooks/use-toast';
import { QueryClient, useMutation } from '@tanstack/react-query';

export const useAssetMutations = (queryClient: QueryClient) => {
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
        assigned_to: asset.assignedTo || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
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

  const updateAssetMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Asset> & { id: string }) => {
      const formattedUpdates: any = {
        updated_at: new Date().toISOString()
      };
      
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

  return {
    addAssetMutation,
    updateAssetMutation,
    deleteAssetMutation
  };
};

