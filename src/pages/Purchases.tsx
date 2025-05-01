
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Purchases = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Compras</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Compras</CardTitle>
          <CardDescription>Administra las compras a proveedores</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido del módulo de compras en desarrollo.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Purchases;
