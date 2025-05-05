
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer } from '@/components/ui/chart';
import { 
  AreaChart, 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Area, 
  Bar 
} from 'recharts';

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
            <ChartContainer config={{}} className="h-72">
              <AreaChart
                data={monthlyRepairsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} órdenes`, 'Cantidad']} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reparaciones por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-72">
              <BarChart
                data={repairTypeData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} órdenes`, 'Cantidad']} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ChartContainer>
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
