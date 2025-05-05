
import React, { useState } from 'react';
import { useOrdersQuery } from '@/hooks/orders/queries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderDetail } from "@/components/orders/OrderDetail";
import { ServiceOrder } from "@/types/orders";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from 'date-fns';

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pendiente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'en_proceso': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'completado': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'cancelado': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

const OrdersList = () => {
  const { orders, isLoading } = useOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
  
  if (isLoading) {
    return <div className="flex justify-center p-6">Cargando órdenes...</div>;
  }
  
  if (!orders || orders.length === 0) {
    return <div className="text-center p-4">No hay órdenes registradas</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.order_number}</TableCell>
              <TableCell>{order.client_name || 'No especificado'}</TableCell>
              <TableCell>{order.service_type}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(order.created_at), 'dd/MM/yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                >
                  Ver Detalle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl">
          {selectedOrder && <OrderDetail order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersList;
