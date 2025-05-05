
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OrdersList from '@/components/orders/OrdersList';
import OrderForm from '@/components/orders/OrderForm';
import { Button } from '@/components/ui/button';

const ServiceOrders = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Órdenes de Servicio</h1>
        <Button 
          onClick={() => setIsCreating(!isCreating)}
          variant="default"
        >
          {isCreating ? 'Cancelar' : 'Nueva Orden'}
        </Button>
      </div>

      {isCreating ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nueva Orden de Servicio</CardTitle>
            <CardDescription>Complete los datos para crear una nueva orden</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderForm onCancel={() => setIsCreating(false)} />
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Listado de Órdenes</CardTitle>
          <CardDescription>Administre las órdenes de servicio</CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersList />
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceOrders;
