
import React, { useState } from 'react';
import { Asset } from './AssetCard';
import { Button } from '@/components/ui/button';
import {
  Package, 
  MapPin, 
  Calendar, 
  AlertCircle,
  Users,
  Wrench,
  History,
  Edit
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ScheduleMaintenanceForm from './ScheduleMaintenanceForm';

interface AssetDetailProps {
  asset: Asset;
  onUpdate?: (id: string, updates: Partial<Asset>) => void;
  onClose: () => void;
}

const statusLabels: Record<Asset['status'], string> = {
  'available': 'Disponible',
  'in-use': 'En Uso',
  'maintenance': 'Mantenimiento',
  'retired': 'Retirado'
};

const AssetDetail: React.FC<AssetDetailProps> = ({ asset, onUpdate, onClose }) => {
  const navigate = useNavigate();
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  
  const handleScheduleMaintenance = () => {
    setShowMaintenanceForm(true);
  };
  
  const handleUpdateStatus = (status: Asset['status']) => {
    if (onUpdate) {
      onUpdate(asset.id, { status });
      
      toast({
        title: "Estado actualizado",
        description: `Conservador ${asset.id} ahora está ${statusLabels[status].toLowerCase()}.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative h-64 bg-gray-200 rounded-md overflow-hidden">
        <img 
          src={asset.imageSrc} 
          alt={asset.model} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{asset.model}</h3>
          <p className="text-muted-foreground">ID: {asset.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          asset.status === 'available' ? 'bg-green-100 text-green-800' :
          asset.status === 'in-use' ? 'bg-blue-100 text-blue-800' :
          asset.status === 'maintenance' ? 'bg-amber-100 text-amber-800' :
          'bg-red-100 text-red-800'
        }`}>
          {statusLabels[asset.status]}
        </span>
      </div>
      
      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-polar-600" />
                <span className="font-semibold">Número de Serie</span>
              </div>
              <p className="pl-6">{asset.serialNumber}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-polar-600" />
                <span className="font-semibold">Capacidad</span>
              </div>
              <p className="pl-6">{asset.capacity}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-polar-600" />
                <span className="font-semibold">Ubicación</span>
              </div>
              <p className="pl-6">{asset.location}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-polar-600" />
                <span className="font-semibold">Rango de Temperatura</span>
              </div>
              <p className="pl-6">{asset.temperatureRange}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-polar-600" />
                <span className="font-semibold">Último Mantenimiento</span>
              </div>
              <p className="pl-6">{asset.lastMaintenance}</p>
            </div>
            
            {asset.assignedTo && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-polar-600" />
                  <span className="font-semibold">Cliente Asignado</span>
                </div>
                <p className="pl-6">{asset.assignedTo}</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-md">
              <div className="bg-polar-100 p-2 rounded-full">
                <Wrench className="h-4 w-4 text-polar-600" />
              </div>
              <div>
                <p className="font-medium">Mantenimiento preventivo</p>
                <p className="text-sm text-muted-foreground">Realizado el {asset.lastMaintenance}</p>
                <p className="text-sm mt-1">Cambio de filtros y limpieza general</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-md">
              <div className="bg-amber-100 p-2 rounded-full">
                <History className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">Cambio de ubicación</p>
                <p className="text-sm text-muted-foreground">15/04/2023</p>
                <p className="text-sm mt-1">Trasladado desde Almacén Norte a {asset.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-md">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Registro inicial</p>
                <p className="text-sm text-muted-foreground">01/01/2023</p>
                <p className="text-sm mt-1">Conservador añadido al inventario</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-wrap gap-2 pt-4 justify-end border-t">
        {asset.status !== 'maintenance' && (
          <Button 
            variant="outline" 
            onClick={handleScheduleMaintenance}
          >
            <Wrench className="h-4 w-4 mr-2" />
            Programar Mantenimiento
          </Button>
        )}
        
        <Button 
          variant="outline"
          onClick={() => handleUpdateStatus('available')}
          disabled={asset.status === 'available'}
        >
          Marcar Disponible
        </Button>
        
        <Button 
          className="bg-polar-600 hover:bg-polar-700"
          onClick={() => handleUpdateStatus(asset.status === 'maintenance' ? 'available' : 'maintenance')}
        >
          {asset.status === 'maintenance' ? 'Completar Mantenimiento' : 'Iniciar Mantenimiento'}
        </Button>
      </div>
      
      <Sheet open={showMaintenanceForm} onOpenChange={setShowMaintenanceForm}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Programar Mantenimiento</SheetTitle>
          </SheetHeader>
          <ScheduleMaintenanceForm 
            assetId={asset.id} 
            assetModel={asset.model}
            onComplete={() => {
              setShowMaintenanceForm(false);
              toast({
                title: "Mantenimiento programado",
                description: `Se ha programado mantenimiento para el conservador ${asset.id}`,
              });
            }} 
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AssetDetail;
