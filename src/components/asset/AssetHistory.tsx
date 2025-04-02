
import React from 'react';
import { Asset } from '../AssetCard';
import { Wrench, History, Calendar } from 'lucide-react';

interface AssetHistoryProps {
  asset: Asset;
}

const AssetHistory: React.FC<AssetHistoryProps> = ({ asset }) => {
  return (
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
  );
};

export default AssetHistory;
