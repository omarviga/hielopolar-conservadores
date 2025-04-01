
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileText, PieChart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reportes</h1>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>
      
      <Tabs defaultValue="monthly" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="monthly">Mensual</TabsTrigger>
          <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
          <TabsTrigger value="annual">Anual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ReportStatCard 
              title="Total de Conservadores"
              value="245"
              change="+12%"
              positive={true}
            />
            <ReportStatCard 
              title="Mantenimientos"
              value="76"
              change="+5%"
              positive={true}
            />
            <ReportStatCard 
              title="Clientes Activos"
              value="128"
              change="-3%"
              positive={false}
            />
            <ReportStatCard 
              title="Ingresos"
              value="$45,420"
              change="+8%"
              positive={true}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Conservadores por Modelo
                </CardTitle>
                <CardDescription>Distribución de conservadores activos por modelo</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Los datos del gráfico se cargarán aquí</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Clientes por Región
                </CardTitle>
                <CardDescription>Distribución de clientes por ubicación geográfica</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChart className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Los datos del gráfico se cargarán aquí</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Últimos Mantenimientos</CardTitle>
              <CardDescription>Registro de los últimos mantenimientos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3">ID</th>
                    <th className="text-left pb-3">Conservador</th>
                    <th className="text-left pb-3">Cliente</th>
                    <th className="text-left pb-3">Fecha</th>
                    <th className="text-left pb-3">Técnico</th>
                    <th className="text-left pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3">MNT-{100 + i}</td>
                      <td className="py-3">CON-{200 + i}</td>
                      <td className="py-3">Cliente {i}</td>
                      <td className="py-3">{new Date().toLocaleDateString()}</td>
                      <td className="py-3">Técnico {i}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          Completado
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">Ver todos</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="quarterly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reporte Trimestral</CardTitle>
              <CardDescription>Datos consolidados del último trimestre</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>Los datos del reporte trimestral se cargarán aquí</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="annual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reporte Anual</CardTitle>
              <CardDescription>Resumen completo del año fiscal</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>Los datos del reporte anual se cargarán aquí</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ReportStatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

const ReportStatCard = ({ title, value, change, positive }: ReportStatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center mt-1 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
          <span className="ml-1">vs. mes anterior</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reports;
