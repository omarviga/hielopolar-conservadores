
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ServiceOrder, OrderDetail } from '@/types/orders';

// Mapear desde el formato de la base de datos al formato de la interfaz
const mapToServiceOrder = (dbOrder: any): ServiceOrder => {
  return {
    id: dbOrder.id,
    order_number: dbOrder.numero_orden,
    client_id: dbOrder.cliente_id || undefined,
    client_name: dbOrder.cliente?.nombre || undefined,
    equipment_id: dbOrder.conservador_id || undefined,
    equipment_type: dbOrder.conservador?.modelo || undefined,
    problem_description: dbOrder.problema_reportado || undefined,
    diagnosis: dbOrder.diagnostico || undefined,
    solution: dbOrder.solucion || undefined,
    status: dbOrder.estado as any,
    estimated_delivery_date: dbOrder.fecha_entrega_estimada || undefined,
    actual_delivery_date: dbOrder.fecha_entrega_real || undefined,
    repair_cost: dbOrder.costo_reparacion || undefined,
    service_type: dbOrder.tipo_servicio as any,
    created_at: dbOrder.created_at || new Date().toISOString(),
    updated_at: dbOrder.updated_at || new Date().toISOString(),
  };
};

export const useOrdersQuery = () => {
  const fetchOrders = async (): Promise<ServiceOrder[]> => {
    const { data, error } = await supabase
      .from('ordenes_servicio')
      .select(`
        *,
        cliente:cliente_id (nombre),
        conservador:conservador_id (modelo)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw new Error(error.message);
    }

    return data.map(mapToServiceOrder);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  return {
    orders: data || [],
    isLoading,
    error,
  };
};

export const useOrderDetailsQuery = (orderId: string) => {
  const fetchOrderDetails = async (): Promise<OrderDetail[]> => {
    const { data, error } = await supabase
      .from('detalles_orden')
      .select('*')
      .eq('orden_id', orderId);

    if (error) {
      console.error('Error fetching order details:', error);
      throw new Error(error.message);
    }

    return data.map((detail: any): OrderDetail => ({
      id: detail.id,
      order_id: detail.orden_id,
      description: detail.descripcion,
      quantity: detail.cantidad,
      unit_price: detail.precio_unitario,
      subtotal: detail.subtotal,
      type: detail.tipo as any,
    }));
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: fetchOrderDetails,
    enabled: !!orderId,
  });

  return {
    details: data || [],
    isLoading,
    error,
  };
};
