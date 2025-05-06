
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

const SalesReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  // Datos de ejemplo para los gráficos
  const monthlyData = [
    { name: 'Ene', value: 3200 },
    { name: 'Feb', value: 4500 },
    { name: 'Mar', value: 3800 },
    { name: 'Abr', value: 5100 },
    { name: 'May', value: 4800 },
    { name: 'Jun', value: 6200 },
    { name: 'Jul', value: 5700 },
    { name: 'Ago', value: 6100 },
    { name: 'Sep', value: 7300 },
    { name: 'Oct', value: 6800 },
    { name: 'Nov', value: 8200 },
    { name: 'Dic', value: 9100 }
  ];
  
  const quarterlyData = [
    { name: 'Q1', value: 11500 },
    { name: 'Q2', value: 16100 },
    { name: 'Q3', value: 19100 },
    { name: 'Q4', value: 24100 }
  ];
  
  const yearlyData = [
    { name: '2020', value: 45000 },
    { name: '2021', value: 52000 },
    { name: '2022', value: 63000 },
    { name: '2023', value: 71000 },
    { name: '2024', value: 85000 }
  ];
  
  const productData = [
    { name: 'Conservadoras', value: 45 },
    { name: 'Refrigeradores', value: 25 },
    { name: 'Congeladores', value: 15 },
    { name: 'Vitrinas', value: 10 },
    { name: 'Otros', value: 5 }
  ];

  // Seleccionar datos según el rango de tiempo
  let reportData;
  switch (timeRange) {
    case "quarter":
      reportData = quarterlyData;
      break;
    case "year":
      reportData = yearlyData;
      break;
    default: // month
      reportData = monthlyData;
  }

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Total Ventas</div>
            <div className="text-2xl font-bold">
              {timeRange === "month" ? "$45,300" : 
               timeRange === "quarter" ? "$120,600" : "$380,500"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Clientes Nuevos</div>
            <div className="text-2xl font-bold">
              {timeRange === "month" ? "24" : 
               timeRange === "quarter" ? "68" : "245"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Ticket Promedio</div>
            <div className="text-2xl font-bold">
              {timeRange === "month" ? "$1,850" : 
               timeRange === "quarter" ? "$1,920" : "$1,890"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Tasa de Conversión</div>
            <div className="text-2xl font-bold">
              {timeRange === "month" ? "18.5%" : 
               timeRange === "quarter" ? "19.2%" : "20.4%"}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="trend">
        <TabsList className="mb-4">
          <TabsTrigger value="trend">Tendencia de Ventas</TabsTrigger>
          <TabsTrigger value="products">Ventas por Producto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trend">
          <Card>
            <CardContent className="p-6">
              <ChartContainer
                config={{}}
                className="h-[400px]"
              >
                <AreaChart
                  data={reportData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                </AreaChart>
              </ChartContainer>
              <div className="mt-2 text-center">
                <h3 className="font-medium">Tendencia de Ventas</h3>
                <p className="text-sm text-muted-foreground">
                  {`Evolución de ventas ${
                    timeRange === "month" ? "mensuales" : 
                    timeRange === "quarter" ? "trimestrales" : "anuales"
                  }`}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="md:w-1/2">
                  <ChartContainer
                    config={{}}
                    className="h-[300px]"
                  >
                    <PieChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                        label
                        labelLine
                        fill="#8884d8"
                      />
                      <Tooltip />
                    </PieChart>
                  </ChartContainer>
                  <div className="mt-2 text-center">
                    <h3 className="font-medium">Ventas por Producto</h3>
                    <p className="text-sm text-muted-foreground">Distribución de ventas por tipo de producto</p>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <ChartContainer
                    config={{}}
                    className="h-[300px]"
                  >
                    <BarChart
                      data={productData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ChartContainer>
                  <div className="mt-2 text-center">
                    <h3 className="font-medium">Ventas por Producto</h3>
                    <p className="text-sm text-muted-foreground">Comparativa por tipo de producto</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesReports;
