
import React from 'react';
import { Asset } from '../AssetCard';
import { Package, MapPin, Calendar, AlertCircle, Users } from 'lucide-react';

interface AssetInfoProps {
  asset: Asset;
}

const AssetInfo: React.FC<AssetInfoProps> = ({ asset }) => {
  return (
    <div className="space-y-4 pt-4">
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
    </div>
  );
};

export default AssetInfo;
