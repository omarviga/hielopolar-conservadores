
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart } from '@/components/ui/chart';

const RepairReports: React.FC = () => {
  // Mock data for charts
  const monthlyRepairsData = [
    { name: 'Ene', value: 15 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 18 },
    { name: 'Abr', value: 25 },
    { name: 'May', value: 22 },
    { name: 'Jun', value: 30 }
  ];

  const repairTypeData = [
    { name: 'Fuga de gas', value: 35 },
    { name: 'Motor', value: 28 },
    { name: 'Temperatura', value: 20 },
    { name: 'Puertas', value: 15 },
    { name: 'Otros', value: 12 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4">
        <Select defaultValue="2025">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar año" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reparaciones por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={monthlyRepairsData}
              index="name"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value: number) => `${value} órdenes`}
              className="h-72"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reparaciones por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={repairTypeData}
              index="name"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value: number) => `${value} órdenes`}
              className="h-72"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">85</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Órdenes Completadas
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">18</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Órdenes Pendientes
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">3.5</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Promedio días por reparación
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RepairReports;
