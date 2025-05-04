
import React, { useState } from 'react';
import { Asset } from './AssetCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ScheduleMaintenanceForm from './ScheduleMaintenanceForm';
import AssetHeader from './asset/AssetHeader';
import AssetInfo from './asset/AssetInfo';
import AssetHistory from './asset/AssetHistory';
import AssetActions from './asset/AssetActions';

interface AssetDetailProps {
  asset: Asset;
  onUpdate?: (id: string, updates: Partial<Asset>) => void;
  onClose: () => void;
}

const AssetDetail: React.FC<AssetDetailProps> = ({ asset, onUpdate, onClose }) => {
  // Removed unused navigate variable
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  
  const handleScheduleMaintenance = () => {
    setShowMaintenanceForm(true);
  };
  
  const handleUpdateStatus = (status: Asset['status']) => {
    if (onUpdate) {
      onUpdate(asset.id, { status });
      
      const statusLabels: Record<Asset['status'], string> = {
        'available': 'Disponible',
        'in-use': 'En Uso',
        'maintenance': 'Mantenimiento',
        'retired': 'Retirado'
      };
      
      toast({
        title: "Estado actualizado",
        description: `Conservador ${asset.id} ahora está ${statusLabels[status].toLowerCase()}.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <AssetHeader asset={asset} />
      
      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <AssetInfo asset={asset} />
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <AssetHistory asset={asset} />
        </TabsContent>
      </Tabs>
      
      <AssetActions 
        asset={asset}
        onScheduleMaintenance={handleScheduleMaintenance}
        onUpdateStatus={handleUpdateStatus}
      />
      
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
