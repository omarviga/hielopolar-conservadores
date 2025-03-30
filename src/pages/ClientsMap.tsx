
import React from 'react';
import ClientsMap from '@/components/ClientsMap';
import { MapPin } from 'lucide-react';

const MapPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-6 w-6 text-polar-600" />
        <h2 className="text-2xl font-bold">Mapa de Clientes</h2>
      </div>

      <ClientsMap />
    </div>
  );
};

export default MapPage;
