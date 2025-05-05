
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, ClipboardList, BarChart } from "lucide-react";
import MaintenanceSchedule from '@/components/maintenance/MaintenanceSchedule';
import ActiveMaintenances from '@/components/maintenance/ActiveMaintenances';
import MaintenanceReports from '@/components/maintenance/MaintenanceReports';
import NewMaintenanceOrder from '@/components/maintenance/NewMaintenanceOrder';

const Maintenance: React.FC = () => {
  const [showNewMaintenanceForm, setShowNewMaintenanceForm] = React.useState(false);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mantenimiento</h1>
        <Button 
          onClick={() => setShowNewMaintenanceForm(true)} 
          className="bg-polar-600 hover:bg-polar-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Nuevo Mantenimiento
        </Button>
      </div>

      <Tabs defaultValue="active-maintenance" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="active-maintenance">Mantenimientos Activos</TabsTrigger>
          <TabsTrigger value="schedule">Calendario</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active-maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Mantenimientos Activos</CardTitle>
              <CardDescription>
                Visualice y gestione los mantenimientos programados y en curso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="scheduled">
                <TabsList>
                  <TabsTrigger value="scheduled">Programados</TabsTrigger>
                  <TabsTrigger value="in-progress">En Progreso</TabsTrigger>
                  <TabsTrigger value="completed">Completados</TabsTrigger>
                </TabsList>
                
                <TabsContent value="scheduled">
                  <ActiveMaintenances status="scheduled" />
                </TabsContent>
                
                <TabsContent value="in-progress">
                  <ActiveMaintenances status="in-progress" />
                </TabsContent>
                
                <TabsContent value="completed">
                  <ActiveMaintenances status="completed" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Mantenimiento</CardTitle>
              <CardDescription>
                Visualice y gestione la programación de mantenimientos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MaintenanceSchedule />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Mantenimiento</CardTitle>
              <CardDescription>
                Reportes y estadísticas de mantenimientos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MaintenanceReports />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showNewMaintenanceForm && (
        <NewMaintenanceOrder onClose={() => setShowNewMaintenanceForm(false)} />
      )}
    </div>
  );
};

export default Maintenance;
