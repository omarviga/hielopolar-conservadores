
import React from 'react';
import { MapPin, Package, Calendar } from 'lucide-react';
import { Client } from './ClientInterface';

interface DetailLocationInfoProps {
  client: Client;
}

const DetailLocationInfo: React.FC<DetailLocationInfoProps> = ({ client }) => {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm text-muted-foreground">Ubicación y recursos</h4>
      
      <div className="flex items-center text-sm">
        <MapPin className="h-4 w-4 mr-2 text-polar-600" />
        <span>{client.address}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <Package className="h-4 w-4 mr-2 text-polar-600" />
        <span>Conservadores: {client.assetsAssigned} / {client.maxCredit}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <Calendar className="h-4 w-4 mr-2 text-polar-600" />
        <span>ID: {client.id}</span>
      </div>
    </div>
  );
};

export default DetailLocationInfo;
