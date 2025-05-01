
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Orders = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Pedidos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Pedidos</CardTitle>
          <CardDescription>Administra los pedidos de clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido del módulo de pedidos en desarrollo.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
