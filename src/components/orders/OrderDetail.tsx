
import React from 'react';
import { ServiceOrder } from '@/types/orders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface OrderDetailProps {
  order: ServiceOrder;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pendiente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'en_proceso': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'completado': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'cancelado': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

export const OrderDetail = ({ order }: OrderDetailProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Orden #{order.order_number}</h2>
          <p className="text-muted-foreground">
            Creada el {format(new Date(order.created_at), 'dd/MM/yyyy')}
          </p>
        </div>
        <Badge className={getStatusColor(order.status)}>
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Nombre:</dt>
                <dd>{order.client_name || 'No especificado'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información del Equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Tipo:</dt>
                <dd>{order.equipment_type || 'No especificado'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Detalles del Servicio</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Tipo de Servicio:</dt>
              <dd>{order.service_type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Problema Reportado:</dt>
              <dd>{order.problem_description || 'No especificado'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Diagnóstico:</dt>
              <dd>{order.diagnosis || 'Pendiente'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Solución:</dt>
              <dd>{order.solution || 'Pendiente'}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de Entrega</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Fecha Estimada:</dt>
              <dd>
                {order.estimated_delivery_date 
                  ? format(new Date(order.estimated_delivery_date), 'dd/MM/yyyy')
                  : 'No especificada'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Fecha Real:</dt>
              <dd>
                {order.actual_delivery_date 
                  ? format(new Date(order.actual_delivery_date), 'dd/MM/yyyy')
                  : 'Pendiente'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Costo de Reparación:</dt>
              <dd>
                {order.repair_cost 
                  ? `$${order.repair_cost.toFixed(2)}` 
                  : 'Por definir'}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
};
