
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

const PerformanceReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  // Datos de ejemplo para los gráficos
  const techniciansData = [
    { name: 'Técnico A', efficiency: 92, repairs: 45, time: 4.2 },
    { name: 'Técnico B', efficiency: 88, repairs: 38, time: 4.5 },
    { name: 'Técnico C', efficiency: 95, repairs: 42, time: 3.8 },
    { name: 'Técnico D', efficiency: 85, repairs: 30, time: 4.8 },
    { name: 'Técnico E', efficiency: 90, repairs: 40, time: 4.0 }
  ];
  
  const monthlyPerformance = [
    { name: 'Ene', completed: 45, pending: 8 },
    { name: 'Feb', completed: 52, pending: 12 },
    { name: 'Mar', completed: 48, pending: 10 },
    { name: 'Abr', completed: 60, pending: 15 },
    { name: 'May', completed: 55, pending: 9 },
    { name: 'Jun', completed: 65, pending: 11 }
  ];
  
  const radarData = [
    { subject: 'Tiempo Respuesta', A: 92, B: 88, C: 95, fullMark: 100 },
    { subject: 'Calidad', A: 88, B: 90, C: 87, fullMark: 100 },
    { subject: 'Satisfacción', A: 95, B: 85, C: 90, fullMark: 100 },
    { subject: 'Eficiencia', A: 90, B: 92, C: 88, fullMark: 100 },
    { subject: 'Comunicación', A: 85, B: 90, C: 92, fullMark: 100 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Mensual</SelectItem>
            <SelectItem value="quarter">Trimestral</SelectItem>
            <SelectItem value="year">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Órdenes Completadas</div>
            <div className="text-2xl font-bold">
              {timeRange === "month" ? "65" : timeRange === "quarter" ? "175" : "720"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Tiempo Prom. Resolución</div>
            <div className="text-2xl font-bold">
              {timeRange === "month" ? "4.2 hrs" : timeRange === "quarter" ? "4.1 hrs" : "4.3 hrs"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Satisfacción Cliente</div>
            <div className="text-2xl font-bold">
              {timeRange === "month" ? "92%" : timeRange === "quarter" ? "90%" : "91%"}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <ChartContainer
              config={{}}
              className="h-[400px]"
            >
              <BarChart
                data={techniciansData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="efficiency" fill="#8884d8" name="Eficiencia (%)" />
                <Bar dataKey="repairs" fill="#82ca9d" name="Reparaciones" />
                <Bar dataKey="time" fill="#ffc658" name="Tiempo Prom (hrs)" />
              </BarChart>
            </ChartContainer>
            <div className="mt-2 text-center">
              <h3 className="font-medium">Rendimiento por Técnico</h3>
              <p className="text-sm text-muted-foreground">Métricas de rendimiento de cada técnico</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <ChartContainer
              config={{}}
              className="h-[400px]"
            >
              <LineChart
                data={monthlyPerformance}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#8884d8" name="Completadas" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#82ca9d" name="Pendientes" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
            <div className="mt-2 text-center">
              <h3 className="font-medium">Órdenes Completadas vs Pendientes</h3>
              <p className="text-sm text-muted-foreground">Evolución mensual de órdenes de trabajo</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <ChartContainer
              config={{}}
              className="h-[400px]"
            >
              <RadarChart
                cx={300}
                cy={180}
                outerRadius={150}
                width={600}
                height={350}
                data={radarData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Técnico A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Técnico B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name="Técnico C" dataKey="C" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ChartContainer>
            <div className="mt-2 text-center">
              <h3 className="font-medium">Análisis de Rendimiento</h3>
              <p className="text-sm text-muted-foreground">Comparativa de técnicos por área de desempeño</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceReports;
