
import React from 'react';
import AssetsMap from '@/components/AssetsMap';
import { Package } from 'lucide-react';

const AssetsMapPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Package className="h-6 w-6 text-polar-600" />
        <h2 className="text-2xl font-bold">Mapa de Conservadores</h2>
      </div>

      <AssetsMap />
    </div>
  );
};

export default AssetsMapPage;
