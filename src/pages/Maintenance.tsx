
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Wrench, ClipboardCheck, AlertTriangle, Clock, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ScheduleMaintenanceForm, { MaintenanceFormData } from '@/components/ScheduleMaintenanceForm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Interfaz para los datos de mantenimiento
interface MaintenanceData {
  id: string;
  title: string;
  client: string;
  asset: string;
  assetId?: string;
  date: string;
  status: 'active' | 'scheduled' | 'completed' | 'delayed';
  technician: string;
  type?: string;
  notes?: string;
}

const Maintenance: React.FC = () => {
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceData | null>(null);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [maintenances, setMaintenances] = useState<MaintenanceData[]>([
    {
      id: "001",
      title: "Mantenimiento #001",
      client: "Pescados Norte",
      asset: "Conservador #101",
      date: "12/06/2023",
      status: "active",
      technician: "Carlos Méndez"
    },
    {
      id: "002",
      title: "Mantenimiento #002",
      client: "Pescados Norte",
      asset: "Conservador #102",
      date: "12/06/2023",
      status: "active",
      technician: "Carlos Méndez"
    },
    {
      id: "003",
      title: "Mantenimiento #003",
      client: "Pescados Norte",
      asset: "Conservador #103",
      date: "12/06/2023",
      status: "active",
      technician: "Carlos Méndez"
    },
    {
      id: "004",
      title: "Mantenimiento #004",
      client: "Mariscos Sur",
      asset: "Conservador #104",
      date: "15/06/2023",
      status: "scheduled",
      technician: "Andrea Gómez"
    },
    {
      id: "005",
      title: "Mantenimiento #005",
      client: "Mariscos Sur",
      asset: "Conservador #105",
      date: "15/06/2023",
      status: "scheduled",
      technician: "Andrea Gómez"
    },
    {
      id: "006",
      title: "Mantenimiento #006",
      client: "Hielos Centro",
      asset: "Conservador #106",
      date: "10/06/2023",
      status: "completed",
      technician: "Pedro Soto"
    },
    {
      id: "007",
      title: "Mantenimiento #007",
      client: "Hielos Centro",
      asset: "Conservador #107",
      date: "10/06/2023",
      status: "completed",
      technician: "Pedro Soto"
    },
    {
      id: "008",
      title: "Mantenimiento #008",
      client: "Hielos Centro",
      asset: "Conservador #108",
      date: "10/06/2023",
      status: "completed",
      technician: "Pedro Soto"
    },
    {
      id: "009",
      title: "Mantenimiento #009",
      client: "Distribuidora Pacífico",
      asset: "Conservador #109",
      date: "01/06/2023",
      status: "delayed",
      technician: "José Flores"
    }
  ]);

  const handleShowDetails = (maintenance: MaintenanceData) => {
    setSelectedMaintenance(maintenance);
  };

  const handleScheduleMaintenance = () => {
    setShowMaintenanceForm(true);
  };

  const handleMaintenanceFormComplete = (data?: MaintenanceFormData) => {
    setShowMaintenanceForm(false);
    
    if (data) {
      // Generar un ID para el nuevo mantenimiento
      const newId = String(maintenances.length + 1).padStart(3, '0');
      
      // Crear un nuevo mantenimiento con los datos del formulario
      const newMaintenance: MaintenanceData = {
        id: newId,
        title: `Mantenimiento #${newId}`,
        client: "Cliente Pendiente", // En un caso real, esto vendría del activo o se seleccionaría
        asset: data.assetModel,
        assetId: data.assetId,
        date: format(data.date, 'dd/MM/yyyy'),
        status: "scheduled",
        technician: data.technician,
        type: data.type,
        notes: data.notes
      };
      
      // Añadir el nuevo mantenimiento a la lista
      setMaintenances(prev => [...prev, newMaintenance]);
    }
  };

  // Filtrar mantenimientos por estado para cada pestaña
  const activeMaintenances = maintenances.filter(m => m.status === "active");
  const scheduledMaintenances = maintenances.filter(m => m.status === "scheduled");
  const completedMaintenances = maintenances.filter(m => m.status === "completed");
  const delayedMaintenances = maintenances.filter(m => m.status === "delayed");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-polar-600" />
          <h2 className="text-2xl font-bold">Mantenimiento</h2>
        </div>
        
        <Button className="bg-polar-600 hover:bg-polar-700" onClick={handleScheduleMaintenance}>
          <CalendarIcon className="h-4 w-4 mr-2" />
          Programar mantenimiento
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="scheduled">Programados</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
          <TabsTrigger value="delayed">Atrasados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeMaintenances.map(maintenance => (
              <MaintenanceCard 
                key={maintenance.id}
                maintenance={maintenance}
                onViewDetails={handleShowDetails}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledMaintenances.map(maintenance => (
              <MaintenanceCard 
                key={maintenance.id}
                maintenance={maintenance}
                onViewDetails={handleShowDetails}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedMaintenances.map(maintenance => (
              <MaintenanceCard 
                key={maintenance.id}
                maintenance={maintenance}
                onViewDetails={handleShowDetails}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="delayed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {delayedMaintenances.map(maintenance => (
              <MaintenanceCard 
                key={maintenance.id}
                maintenance={maintenance}
                onViewDetails={handleShowDetails}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog para mostrar detalles del mantenimiento */}
      <Dialog open={!!selectedMaintenance} onOpenChange={() => setSelectedMaintenance(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalles del Mantenimiento</DialogTitle>
          </DialogHeader>
          
          {selectedMaintenance && (
            <div className="space-y-4">
              <div className={`p-3 rounded-md ${
                selectedMaintenance.status === 'active' ? 'bg-blue-50' : 
                selectedMaintenance.status === 'scheduled' ? 'bg-amber-50' : 
                selectedMaintenance.status === 'completed' ? 'bg-green-50' : 
                'bg-red-50'
              }`}>
                <h3 className="font-semibold text-lg">{selectedMaintenance.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedMaintenance.client}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Equipo:</span>
                  <span className="font-medium">{selectedMaintenance.asset}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fecha:</span>
                  <span className="font-medium">{selectedMaintenance.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Técnico:</span>
                  <span className="font-medium">{selectedMaintenance.technician}</span>
                </div>
                {selectedMaintenance.type && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="font-medium">
                      {selectedMaintenance.type === 'preventive' ? 'Preventivo' : 
                       selectedMaintenance.type === 'corrective' ? 'Correctivo' : 
                       'Inspección'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                    selectedMaintenance.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    selectedMaintenance.status === 'scheduled' ? 'bg-amber-100 text-amber-800' :
                    selectedMaintenance.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedMaintenance.status === 'active' ? 'En proceso' :
                     selectedMaintenance.status === 'scheduled' ? 'Programado' :
                     selectedMaintenance.status === 'completed' ? 'Completado' :
                     'Atrasado'}
                  </span>
                </div>
              </div>

              {selectedMaintenance.notes && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-1">Notas:</h4>
                  <p className="text-sm">{selectedMaintenance.notes}</p>
                </div>
              )}

              <div className="pt-4 flex justify-end border-t">
                <Button 
                  onClick={() => setSelectedMaintenance(null)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Sheet para programar mantenimiento */}
      <Sheet open={showMaintenanceForm} onOpenChange={setShowMaintenanceForm}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Programar Mantenimiento</SheetTitle>
          </SheetHeader>
          <ScheduleMaintenanceForm 
            assetId="NUEVO" 
            assetModel="Nuevo Conservador"
            onComplete={handleMaintenanceFormComplete} 
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface MaintenanceCardProps {
  maintenance: MaintenanceData;
  onViewDetails?: (maintenance: MaintenanceData) => void;
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  maintenance,
  onViewDetails,
}) => {
  const statusConfig = {
    active: {
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-100 text-blue-800',
      text: 'En proceso',
    },
    scheduled: {
      icon: <CalendarIcon className="h-5 w-5 text-amber-600" />,
      color: 'bg-amber-100 text-amber-800',
      text: 'Programado',
    },
    completed: {
      icon: <ClipboardCheck className="h-5 w-5 text-green-600" />,
      color: 'bg-green-100 text-green-800',
      text: 'Completado',
    },
    delayed: {
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      color: 'bg-red-100 text-red-800',
      text: 'Atrasado',
    },
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(maintenance);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className={`px-6 py-3 ${maintenance.status === 'active' ? 'bg-blue-50' : maintenance.status === 'scheduled' ? 'bg-amber-50' : maintenance.status === 'completed' ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{maintenance.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[maintenance.status].color}`}>
            {statusConfig[maintenance.status].text}
          </span>
        </div>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cliente:</span>
            <span className="font-medium">{maintenance.client}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Equipo:</span>
            <span className="font-medium">{maintenance.asset}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fecha:</span>
            <span className="font-medium">{maintenance.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Técnico:</span>
            <span className="font-medium">{maintenance.technician}</span>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            <Eye className="h-4 w-4 mr-2" />
            Ver detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Maintenance;
