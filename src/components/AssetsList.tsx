
import React, { useState } from 'react';
import AssetCard, { Asset } from './AssetCard';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';

interface AssetsListProps {
  assets: Asset[];
}

const AssetsList: React.FC<AssetsListProps> = ({ assets }) => {
  const [filter, setFilter] = useState<Asset['status'] | 'all'>('all');
  
  const filteredAssets = filter === 'all' 
    ? assets 
    : assets.filter(asset => asset.status === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Conservadores ({filteredAssets.length})</h2>
        
        <div className="flex gap-2">
          <div className="flex items-center bg-white border rounded-lg overflow-hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'all' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos
            </Button>
            <Button 
              variant="ghost"
              size="sm" 
              className={`px-3 rounded-none ${filter === 'available' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('available')}
            >
              Disponibles
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'in-use' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('in-use')}
            >
              En Uso
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'maintenance' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('maintenance')}
            >
              Mantenimiento
            </Button>
          </div>
          
          <Button className="bg-polar-600 hover:bg-polar-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map((asset, index) => (
          <div 
            key={asset.id} 
            className="animate-slide-in" 
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <AssetCard asset={asset} />
          </div>
        ))}
      </div>
      
      {filteredAssets.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay conservadores que coincidan con el filtro.</p>
        </div>
      )}
    </div>
  );
};

export default AssetsList;
