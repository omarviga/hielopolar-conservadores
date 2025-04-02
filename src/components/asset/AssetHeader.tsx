
import React from 'react';
import { Asset } from '../AssetCard';

interface AssetHeaderProps {
  asset: Asset;
}

const AssetHeader: React.FC<AssetHeaderProps> = ({ asset }) => {
  const statusLabels: Record<Asset['status'], string> = {
    'available': 'Disponible',
    'in-use': 'En Uso',
    'maintenance': 'Mantenimiento',
    'retired': 'Retirado'
  };

  return (
    <>
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
    </>
  );
};

export default AssetHeader;
