
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Inventory = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Inventario</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Inventario</CardTitle>
          <CardDescription>Administra el inventario de productos y repuestos</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido del módulo de inventario en desarrollo.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
