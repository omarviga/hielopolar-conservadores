
import React from 'react';
import { Button } from '@/components/ui/button';
import { Asset } from '../AssetCard';
import { Wrench } from 'lucide-react';

interface AssetActionsProps {
  asset: Asset;
  onScheduleMaintenance: () => void;
  onUpdateStatus: (status: Asset['status']) => void;
}

const AssetActions: React.FC<AssetActionsProps> = ({ 
  asset, 
  onScheduleMaintenance, 
  onUpdateStatus 
}) => {
  // Determinar si el activo está disponible para mantenimiento
  const canScheduleMaintenance = asset.status !== 'retired';
  const isMaintenance = asset.status === 'maintenance';
  
  return (
    <div className="flex flex-wrap gap-2 pt-4 justify-end border-t">
      {canScheduleMaintenance && !isMaintenance && (
        <Button 
          variant="outline" 
          onClick={onScheduleMaintenance}
        >
          <Wrench className="h-4 w-4 mr-2" />
          Programar Mantenimiento
        </Button>
      )}
      
      <Button 
        variant="outline"
        onClick={() => onUpdateStatus('available')}
        disabled={asset.status === 'available'}
      >
        Marcar Disponible
      </Button>
      
      <Button 
        className="bg-polar-600 hover:bg-polar-700"
        onClick={() => onUpdateStatus(asset.status === 'maintenance' ? 'available' : 'maintenance')}
      >
        {asset.status === 'maintenance' ? 'Completar Mantenimiento' : 'Iniciar Mantenimiento'}
      </Button>
    </div>
  );
};

export default AssetActions;
