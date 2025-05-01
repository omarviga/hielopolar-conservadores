
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Repair } from '@/types/repairs';
import { toast } from './use-toast';

// Helper to map database repair to our Repair type
const mapDbRepairToRepair = (dbRepair: any): Repair => {
  return {
    id: dbRepair.id.toString(),
    asset_id: dbRepair.equipment_type || "",
    repair_number: dbRepair.order_number,
    customer_name: dbRepair.customer_name,
    customer_phone: dbRepair.customer_phone,
    customer_email: dbRepair.customer_email,
    equipment_type: dbRepair.equipment_type,
    problem_description: dbRepair.problem_description,
    diagnosis: dbRepair.diagnosis,
    repair_type: dbRepair.repair_type || "corrective",
    priority: dbRepair.priority || "medium",
    status: dbRepair.status,
    assigned_to: dbRepair.assigned_to,
    brand: dbRepair.brand,
    model: dbRepair.model,
    serial_number: dbRepair.serial_number,
    parts_used: dbRepair.parts_used || [],
    estimated_completion: dbRepair.estimated_completion,
    completed_at: dbRepair.completed_at,
    created_at: dbRepair.created_at,
    updated_at: dbRepair.updated_at,
    created_by: dbRepair.created_by,
    notes: dbRepair.notes,
    order_number: dbRepair.order_number,
    description: dbRepair.problem_description,
  };
};

export const useRepairs = () => {
  const queryClient = useQueryClient();

  // Fetch all repairs
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repairs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('repairs').select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Map to our type
      return data.map(mapDbRepairToRepair);
    },
  });

  // Add a new repair
  const addRepair = useMutation({
    mutationFn: async (repair: Omit<Repair, 'id' | 'created_at' | 'updated_at'>) => {
      const dbRepair = {
        equipment_type: repair.equipment_type,
        problem_description: repair.problem_description,
        order_number: repair.repair_number || repair.order_number,
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
      };
      
      const { data, error } = await supabase
        .from('repairs')
        .insert([dbRepair])
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
    mutationFn: async ({ id, ...repair }: Partial<Repair> & { id: string }) => {
      const dbRepair = {
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
      };
      
      const { data, error } = await supabase
        .from('repairs')
        .update(dbRepair)
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
    repairs: data,
    isLoading,
    isError,
    error,
    addRepair,
    updateRepair,
    deleteRepair,
  };
};
