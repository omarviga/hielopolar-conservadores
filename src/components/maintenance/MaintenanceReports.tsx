
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
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const MaintenanceReports: React.FC = () => {
  // Datos de ejemplo para las gráficas
  const monthlyMaintenanceData = [
    { name: 'Ene', value: 12 },
    { name: 'Feb', value: 15 },
    { name: 'Mar', value: 10 },
    { name: 'Abr', value: 22 },
    { name: 'May', value: 18 },
    { name: 'Jun', value: 20 }
  ];

  const maintenanceTypeData = [
    { name: 'Preventivo', value: 45 },
    { name: 'Correctivo', value: 20 },
    { name: 'Emergencia', value: 10 },
    { name: 'Rutinario', value: 25 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
            <CardTitle>Mantenimientos por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-72">
              <AreaChart
                data={monthlyMaintenanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} órdenes`, 'Cantidad']} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00C49F" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mantenimientos por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-72">
              <PieChart>
                <Pie
                  data={maintenanceTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {maintenanceTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} órdenes`, 'Cantidad']} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">75</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Mantenimientos Completados
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">12</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Mantenimientos Programados
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">95%</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Tasa de cumplimiento
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceReports;
