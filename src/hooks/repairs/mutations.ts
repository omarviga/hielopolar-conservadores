
import { useMutation, QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { AddRepairInput, UpdateRepairInput } from './types';

export const useRepairMutations = (queryClient: QueryClient) => {
  // Add a new repair
  const addRepair = useMutation({
    mutationFn: async (repair: AddRepairInput) => {
      const { data, error } = await supabase
        .from('repairs')
        .insert([{
          asset_id: repair.asset_id,
          equipment_type: repair.equipment_type,
          problem_description: repair.problem_description,
          order_number: repair.order_number,
          customer_name: repair.customer_name,
          customer_phone: repair.customer_phone,
          customer_email: repair.customer_email,
          diagnosis: repair.diagnosis,
          status: repair.status,
          brand: repair.brand,
          model: repair.model,
          serial_number: repair.serial_number,
          estimated_completion: repair.estimated_completion,
          notes: repair.notes,
          priority: repair.priority,
          repair_type: repair.repair_type,
          assigned_to: repair.assigned_to,
          parts_used: repair.parts_used
        }])
        .select();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repairs'] });
      toast({
        title: 'Reparación creada',
        description: 'La reparación ha sido creada exitosamente',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `No se pudo crear la reparación: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Update a repair
  const updateRepair = useMutation({
    mutationFn: async (repair: UpdateRepairInput) => {
      const { id, ...updateData } = repair;
      
      // Using a simplified approach to build the update object
      const updateObj: Record<string, any> = {};
      
      // Only include defined properties
      Object.entries(updateData).forEach(([key, value]) => {
        if (value !== undefined) {
          updateObj[key] = value;
        }
      });
      
      // Handle problem_description/description field mapping
      if (repair.description && !repair.problem_description) {
        updateObj.problem_description = repair.description;
      }
      
      const { data, error } = await supabase
        .from('repairs')
        .update(updateObj)
        .eq('id', parseInt(id))
        .select();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repairs'] });
      toast({
        title: 'Reparación actualizada',
        description: 'La reparación ha sido actualizada exitosamente',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `No se pudo actualizar la reparación: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Delete a repair
  const deleteRepair = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('repairs')
        .delete()
        .eq('id', parseInt(id));
      
      if (error) {
        throw new Error(error.message);
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repairs'] });
      toast({
        title: 'Reparación eliminada',
        description: 'La reparación ha sido eliminada exitosamente',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `No se pudo eliminar la reparación: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  return {
    addRepair,
    updateRepair,
    deleteRepair,
  };
};
