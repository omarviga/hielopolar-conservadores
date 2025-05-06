
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SalesReports from '@/components/reports/SalesReports';
import InventoryReports from '@/components/reports/InventoryReports';
import PerformanceReports from '@/components/reports/PerformanceReports';
import RepairReports from '@/components/repairs/RepairReports';

const Reports: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reportes</h1>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="repairs">Reparaciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Ventas</CardTitle>
              <CardDescription>
                Visualice los datos de ventas y rendimiento financiero.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalesReports />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Inventario</CardTitle>
              <CardDescription>
                Análisis de stock, rotación y valor del inventario.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryReports />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Rendimiento</CardTitle>
              <CardDescription>
                Métricas de rendimiento y productividad.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceReports />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repairs">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Reparaciones</CardTitle>
              <CardDescription>
                Análisis de órdenes de reparación y métricas de servicio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RepairReports />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
