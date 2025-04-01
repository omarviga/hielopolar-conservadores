
import React, { useState, useEffect } from 'react';
import AssetCard, { Asset } from './AssetCard';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import NewAssetForm from './NewAssetForm';
import { useAssets } from '@/hooks/useAssets';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AssetDetail from './AssetDetail';

interface AssetsListProps {
  assets: Asset[];
}

const AssetsList: React.FC<AssetsListProps> = ({ assets: initialAssets }) => {
  const [filter, setFilter] = useState<Asset['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { updateAsset } = useAssets();
  const [isNewAssetFormOpen, setIsNewAssetFormOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  
  // Usar los activos pasados como props
  const [localAssets, setLocalAssets] = useState(initialAssets);
  
  // Actualizar localAssets cuando initialAssets cambia
  useEffect(() => {
    setLocalAssets(initialAssets);
    console.log('Lista de conservadores actualizada:', initialAssets);
  }, [initialAssets]);
  
  // Filtrar por estado y búsqueda de texto
  const filteredAssets = localAssets
    .filter(asset => filter === 'all' || asset.status === filter)
    .filter(asset => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        asset.id.toLowerCase().includes(query) ||
        asset.model.toLowerCase().includes(query) ||
        asset.serialNumber.toLowerCase().includes(query) ||
        asset.location.toLowerCase().includes(query) ||
        (asset.assignedTo && asset.assignedTo.toLowerCase().includes(query))
      );
    });
    
  const handleUpdateAsset = (id: string, updates: Partial<Asset>) => {
    // Actualizamos tanto el estado local para la UI inmediata
    setLocalAssets(prev => prev.map(asset => 
      asset.id === id ? { ...asset, ...updates } : asset
    ));
    
    // Como también el estado global a través del hook
    updateAsset(id, updates);
    console.log(`Conservador ${id} actualizado con:`, updates);
  };

  const handleNewAssetComplete = () => {
    setIsNewAssetFormOpen(false);
  };

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleCloseDetails = () => {
    setSelectedAsset(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Conservadores ({filteredAssets.length})</h2>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar conservadores..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
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
          
          <Sheet open={isNewAssetFormOpen} onOpenChange={setIsNewAssetFormOpen}>
            <SheetTrigger asChild>
              <Button className="bg-polar-600 hover:bg-polar-700">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Añadir nuevo conservador</SheetTitle>
              </SheetHeader>
              <NewAssetForm onComplete={handleNewAssetComplete} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map((asset, index) => (
          <div 
            key={asset.id} 
            className="animate-slide-in" 
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <AssetCard 
              asset={asset} 
              onUpdate={handleUpdateAsset}
              onSelect={handleViewDetails}
            />
          </div>
        ))}
      </div>
      
      {filteredAssets.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay conservadores que coincidan con el filtro.</p>
        </div>
      )}

      {/* Dialog para mostrar detalles del activo */}
      <Dialog open={!!selectedAsset} onOpenChange={handleCloseDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Conservador</DialogTitle>
          </DialogHeader>
          {selectedAsset && (
            <AssetDetail 
              asset={selectedAsset} 
              onUpdate={handleUpdateAsset}
              onClose={handleCloseDetails}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetsList;
