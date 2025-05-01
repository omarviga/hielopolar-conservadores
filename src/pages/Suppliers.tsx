
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Suppliers = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Proveedores</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Proveedores</CardTitle>
          <CardDescription>Administra los proveedores de la empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido del módulo de proveedores en desarrollo.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Suppliers;
