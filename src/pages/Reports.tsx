
import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileText, PieChart, Calendar, Download, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReportChart } from '@/components/reports/ReportChart';
import { ReportPieChart } from '@/components/reports/ReportPieChart';
import { ReportFilters } from '@/components/reports/ReportFilters';

const Reports = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: new Date(new Date().setDate(1)),
    to: new Date()
  });
  const [visibleFilters, setVisibleFilters] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    toast({
      title: "Exportando reporte",
      description: "El reporte se está descargando como PDF."
    });
    // Simular descarga
    setTimeout(() => {
      toast({
        title: "Reporte exportado",
        description: "El reporte se ha descargado correctamente."
      });
    }, 1500);
  };

  const handleExportExcel = () => {
    toast({
      title: "Exportando datos",
      description: "Los datos se están descargando como Excel."
    });
    // Simular descarga
    setTimeout(() => {
      toast({
        title: "Datos exportados",
        description: "Los datos se han descargado correctamente."
      });
    }, 1500);
  };

  const handleExportCSV = () => {
    toast({
      title: "Exportando datos",
      description: "Los datos se están descargando como CSV."
    });
    // Simular descarga
    setTimeout(() => {
      toast({
        title: "Datos exportados",
        description: "Los datos se han descargado correctamente."
      });
    }, 1500);
  };

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedMaintenanceData = [
    { id: 'MNT-101', conserverId: 'CON-201', client: 'Cliente 1', date: '2023-05-15', technician: 'Técnico 1', status: 'Completado' },
    { id: 'MNT-102', conserverId: 'CON-202', client: 'Cliente 2', date: '2023-05-14', technician: 'Técnico 2', status: 'Completado' },
    { id: 'MNT-103', conserverId: 'CON-203', client: 'Cliente 3', date: '2023-05-13', technician: 'Técnico 3', status: 'Completado' },
    { id: 'MNT-104', conserverId: 'CON-204', client: 'Cliente 4', date: '2023-05-12', technician: 'Técnico 4', status: 'Completado' },
    { id: 'MNT-105', conserverId: 'CON-205', client: 'Cliente 5', date: '2023-05-11', technician: 'Técnico 5', status: 'Completado' }
  ].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });
  
  return (
    <div className="container mx-auto" ref={reportRef}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Reportes</h1>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2"
            onClick={() => setVisibleFilters(!visibleFilters)}
          >
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Opciones de Exportación</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExportPDF}>
                <FileText className="mr-2 h-4 w-4" />
                <span>PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportExcel}>
                <span className="mr-2">📊</span>
                <span>Excel</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportCSV}>
                <span className="mr-2">📄</span>
                <span>CSV</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Periodo
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setActiveTab("monthly")}>
                Mensual
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("quarterly")}>
                Trimestral
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("annual")}>
                Anual
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {visibleFilters && (
        <ReportFilters 
          dateRange={dateRange} 
          setDateRange={setDateRange} 
          onClose={() => setVisibleFilters(false)} 
        />
      )}
      
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
              <CardContent className="h-80">
                <ReportChart />
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
              <CardContent className="h-80">
                <ReportPieChart />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Últimos Mantenimientos</CardTitle>
                <CardDescription>Registro de los últimos mantenimientos realizados</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Todos</DropdownMenuItem>
                  <DropdownMenuItem>Completados</DropdownMenuItem>
                  <DropdownMenuItem>Pendientes</DropdownMenuItem>
                  <DropdownMenuItem>Cancelados</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => toggleSort('id')}>
                      <div className="flex items-center">
                        ID
                        {sortColumn === 'id' && (
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => toggleSort('conserverId')}>
                      <div className="flex items-center">
                        Conservador
                        {sortColumn === 'conserverId' && (
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => toggleSort('client')}>
                      <div className="flex items-center">
                        Cliente
                        {sortColumn === 'client' && (
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => toggleSort('date')}>
                      <div className="flex items-center">
                        Fecha
                        {sortColumn === 'date' && (
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => toggleSort('technician')}>
                      <div className="flex items-center">
                        Técnico
                        {sortColumn === 'technician' && (
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => toggleSort('status')}>
                      <div className="flex items-center">
                        Estado
                        {sortColumn === 'status' && (
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedMaintenanceData.map((maintenance) => (
                    <TableRow key={maintenance.id}>
                      <TableCell>{maintenance.id}</TableCell>
                      <TableCell>{maintenance.conserverId}</TableCell>
                      <TableCell>{maintenance.client}</TableCell>
                      <TableCell>{new Date(maintenance.date).toLocaleDateString()}</TableCell>
                      <TableCell>{maintenance.technician}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {maintenance.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Abrir menú</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
                                <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
            <CardContent className="h-80">
              <ReportChart quarterly={true} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resumen Trimestral</CardTitle>
              <CardDescription>Rendimiento por trimestre</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trimestre</TableHead>
                    <TableHead>Conservadores Activos</TableHead>
                    <TableHead>Nuevos Clientes</TableHead>
                    <TableHead>Mantenimientos</TableHead>
                    <TableHead>Ingresos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Q1 2023</TableCell>
                    <TableCell>210</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>64</TableCell>
                    <TableCell>$38,450</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Q2 2023</TableCell>
                    <TableCell>225</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell>72</TableCell>
                    <TableCell>$42,120</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Q3 2023</TableCell>
                    <TableCell>240</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>68</TableCell>
                    <TableCell>$45,850</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Q4 2023</TableCell>
                    <TableCell>245</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>76</TableCell>
                    <TableCell>$48,320</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleExportExcel} className="ml-auto gap-2">
                <Download className="h-4 w-4" />
                Exportar datos
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="annual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reporte Anual</CardTitle>
              <CardDescription>Resumen completo del año fiscal</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ReportChart annual={true} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comparativa Anual</CardTitle>
              <CardDescription>Comparación con años anteriores</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Año</TableHead>
                    <TableHead>Conservadores Totales</TableHead>
                    <TableHead>Clientes</TableHead>
                    <TableHead>Mantenimientos</TableHead>
                    <TableHead>Ingresos Anuales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2021</TableCell>
                    <TableCell>180</TableCell>
                    <TableCell>95</TableCell>
                    <TableCell>210</TableCell>
                    <TableCell>$156,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2022</TableCell>
                    <TableCell>210</TableCell>
                    <TableCell>112</TableCell>
                    <TableCell>245</TableCell>
                    <TableCell>$172,500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023</TableCell>
                    <TableCell>245</TableCell>
                    <TableCell>128</TableCell>
                    <TableCell>280</TableCell>
                    <TableCell>$195,200</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleExportExcel} className="ml-auto gap-2">
                <Download className="h-4 w-4" />
                Exportar datos
              </Button>
            </CardFooter>
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
