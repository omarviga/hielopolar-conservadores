
import { useMutation, QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CreateOrderInput {
  client_id?: string;
  equipment_type?: string;
  problem_description?: string;
  service_type: string;
  status?: string;
  estimated_delivery_date?: string;
}

export const useOrderMutations = (queryClient: QueryClient) => {
  const createOrder = useMutation({
    mutationFn: async (data: CreateOrderInput) => {
      // Generar número de orden único basado en la fecha
      const orderNumber = `OS-${Date.now().toString().slice(-8)}`;
      
      const { data: result, error } = await supabase
        .from('ordenes_servicio')
        .insert({
          numero_orden: orderNumber,
          cliente_id: data.client_id,
          problema_reportado: data.problem_description,
          tipo_servicio: data.service_type,
          estado: data.status || 'pendiente',
          fecha_entrega_estimada: data.estimated_delivery_date,
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating order:', error);
        throw new Error(error.message);
      }
      
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Orden creada",
        description: "La orden de servicio ha sido creada exitosamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `No se pudo crear la orden: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateOrder = useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<CreateOrderInput>) => {
      const { data: result, error } = await supabase
        .from('ordenes_servicio')
        .update({
          cliente_id: data.client_id,
          problema_reportado: data.problem_description,
          tipo_servicio: data.service_type,
          estado: data.status,
          fecha_entrega_estimada: data.estimated_delivery_date,
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating order:', error);
        throw new Error(error.message);
      }
      
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Orden actualizada",
        description: "La orden de servicio ha sido actualizada exitosamente",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `No se pudo actualizar la orden: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    createOrder,
    updateOrder,
  };
};
