
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Tool, ClipboardCheck, AlertTriangle, Clock } from 'lucide-react';

const Maintenance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Tool className="h-6 w-6 text-polar-600" />
          <h2 className="text-2xl font-bold">Mantenimiento</h2>
        </div>
        
        <Button className="bg-polar-600 hover:bg-polar-700">
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
            {[1, 2, 3].map(i => (
              <MaintenanceCard 
                key={i}
                title={`Mantenimiento #00${i}`}
                client="Pescados Norte"
                asset={`Conservador #${100 + i}`}
                date="12/06/2023"
                status="active"
                technician="Carlos Méndez"
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[4, 5].map(i => (
              <MaintenanceCard 
                key={i}
                title={`Mantenimiento #00${i}`}
                client="Mariscos Sur"
                asset={`Conservador #${100 + i}`}
                date="15/06/2023"
                status="scheduled"
                technician="Andrea Gómez"
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[6, 7, 8].map(i => (
              <MaintenanceCard 
                key={i}
                title={`Mantenimiento #00${i}`}
                client="Hielos Centro"
                asset={`Conservador #${100 + i}`}
                date="10/06/2023"
                status="completed"
                technician="Pedro Soto"
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="delayed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MaintenanceCard 
              title="Mantenimiento #009"
              client="Distribuidora Pacífico"
              asset="Conservador #109"
              date="01/06/2023"
              status="delayed"
              technician="José Flores"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MaintenanceCardProps {
  title: string;
  client: string;
  asset: string;
  date: string;
  status: 'active' | 'scheduled' | 'completed' | 'delayed';
  technician: string;
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  title,
  client,
  asset,
  date,
  status,
  technician,
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

  return (
    <Card className="overflow-hidden">
      <div className={`px-6 py-3 ${status === 'active' ? 'bg-blue-50' : status === 'scheduled' ? 'bg-amber-50' : status === 'completed' ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status].color}`}>
            {statusConfig[status].text}
          </span>
        </div>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cliente:</span>
            <span className="font-medium">{client}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Equipo:</span>
            <span className="font-medium">{asset}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fecha:</span>
            <span className="font-medium">{date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Técnico:</span>
            <span className="font-medium">{technician}</span>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button variant="outline" size="sm">
            Ver detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Maintenance;
