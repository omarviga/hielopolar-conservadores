
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InventoryReports: React.FC = () => {
  // Datos de ejemplo para los gráficos
  const stockData = [
    { name: 'Conservadoras', stock: 45, value: 18000 },
    { name: 'Refrigeradores', stock: 32, value: 22400 },
    { name: 'Congeladores', stock: 18, value: 14400 },
    { name: 'Vitrinas', stock: 24, value: 19200 },
    { name: 'Accesorios', stock: 120, value: 6000 }
  ];
  
  const rotationData = [
    { name: 'Ene', rotacion: 3.2 },
    { name: 'Feb', rotacion: 2.8 },
    { name: 'Mar', rotacion: 3.5 },
    { name: 'Abr', rotacion: 2.9 },
    { name: 'May', rotacion: 3.1 },
    { name: 'Jun', rotacion: 3.6 }
  ];
  
  const categoryData = [
    { name: 'Categoría A', value: 55 },
    { name: 'Categoría B', value: 25 },
    { name: 'Categoría C', value: 20 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Total en Inventario</div>
            <div className="text-2xl font-bold">$80,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Total de Artículos</div>
            <div className="text-2xl font-bold">239</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Rotación Promedio</div>
            <div className="text-2xl font-bold">3.2</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="stock">
        <TabsList className="mb-4">
          <TabsTrigger value="stock">Niveles de Stock</TabsTrigger>
          <TabsTrigger value="rotation">Rotación</TabsTrigger>
          <TabsTrigger value="abc">Análisis ABC</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stock">
          <Card>
            <CardContent className="p-6">
              <ChartContainer
                config={{}}
                className="h-[400px]"
              >
                <BarChart
                  data={stockData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stock" fill="#8884d8" name="Unidades" />
                  <Bar dataKey="value" fill="#82ca9d" name="Valor ($)" />
                </BarChart>
              </ChartContainer>
              <div className="mt-2 text-center">
                <h3 className="font-medium">Niveles de Inventario</h3>
                <p className="text-sm text-muted-foreground">Cantidad de productos por categoría</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rotation">
          <Card>
            <CardContent className="p-6">
              <ChartContainer
                config={{}}
                className="h-[400px]"
              >
                <LineChart
                  data={rotationData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rotacion" stroke="#8884d8" name="Índice" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
              <div className="mt-2 text-center">
                <h3 className="font-medium">Índice de Rotación</h3>
                <p className="text-sm text-muted-foreground">Evolución del índice de rotación mensual</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="abc">
          <Card>
            <CardContent className="p-6">
              <ChartContainer
                config={{}}
                className="h-[400px]"
              >
                <PieChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    nameKey="name"
                    label
                    labelLine
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ChartContainer>
              <div className="mt-2 text-center">
                <h3 className="font-medium">Análisis ABC</h3>
                <p className="text-sm text-muted-foreground">Clasificación de productos según valor/rotación</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryReports;
