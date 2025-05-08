
import React from 'react';
import { Package, MapPin, Calendar, AlertCircle, Users } from 'lucide-react';
import { Asset, statusClasses, statusLabels } from '@/types/Asset';

interface AssetSummaryProps {
  asset: Asset;
}

const AssetSummary: React.FC<AssetSummaryProps> = ({ asset }) => {
  return (
    <>
      <div className="relative h-40 bg-gray-200">
        <img 
          src={asset.imageSrc} 
          alt={asset.model} 
          className="w-full h-full object-cover"
        />
        <span className={`status-badge ${statusClasses[asset.status]} absolute top-2 right-2`}>
          {statusLabels[asset.status]}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg">{asset.model}</h3>
        <p className="text-sm text-gray-500">ID: {asset.id}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Package className="h-4 w-4 mr-2 text-polar-600" />
            <span>Capacidad: {asset.capacity}</span>
          </div>
          
          {asset.assignedTo && (
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-polar-600" />
              <span>Cliente: {asset.assignedTo}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-polar-600" />
            <span>{asset.location}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-polar-600" />
            <span>Último mantenimiento: {asset.lastMaintenance}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <AlertCircle className="h-4 w-4 mr-2 text-polar-600" />
            <span>Temperatura: {asset.temperatureRange}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetSummary;
