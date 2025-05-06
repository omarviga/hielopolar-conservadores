import React, { useState } from 'react';
import AssetCard, { Asset } from './AssetCard';
import { Button } from '@/components/ui/button';
import { Plus, Filter, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

interface AssetsListProps {
  assets: Asset[];
}

const AssetsList: React.FC<AssetsListProps> = ({ assets }) => {
  const [filter, setFilter] = useState<Asset['status'] | 'all'>('all');
  const [showNewAssetModal, setShowNewAssetModal] = useState(false);
  const [newAssetData, setNewAssetData] = useState({
    model: '',
    serialNumber: '',
    location: '',
    capacity: '',
  });
  
  const filteredAssets = filter === 'all' 
    ? assets 
    : assets.filter(asset => asset.status === filter);

  const handleFilterChange = (newFilter: Asset['status'] | 'all') => {
    setFilter(newFilter);
    toast({
      title: "Filtro aplicado",
      description: newFilter === 'all' 
        ? "Mostrando todos los conservadores" 
        : `Mostrando conservadores con estado: ${newFilter}`,
      variant: "default",
    });
  };

  const handleNewAssetChange = (field: string, value: string) => {
    setNewAssetData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to create the asset
    console.log("Creating new asset with data:", newAssetData);
    
    toast({
      title: "Conservador creado",
      description: `El conservador ${newAssetData.model} ha sido creado correctamente.`,
      variant: "default",
    });
    
    setShowNewAssetModal(false);
    setNewAssetData({
      model: '',
      serialNumber: '',
      location: '',
      capacity: '',
    });
  };

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
              onClick={() => handleFilterChange('all')}
            >
              Todos
            </Button>
            <Button 
              variant="ghost"
              size="sm" 
              className={`px-3 rounded-none ${filter === 'available' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => handleFilterChange('available')}
            >
              Disponibles
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'in-use' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => handleFilterChange('in-use')}
            >
              En Uso
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'maintenance' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => handleFilterChange('maintenance')}
            >
              Mantenimiento
            </Button>
          </div>
          
          <Link to="/assets-map">
            <Button 
              variant="outline"
              className="flex items-center gap-1"
            >
              <MapPin className="h-4 w-4" />
              Ver Mapa
            </Button>
          </Link>
          
          <Button 
            className="bg-polar-600 hover:bg-polar-700"
            onClick={() => setShowNewAssetModal(true)}
          >
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

      {/* New Asset Modal */}
      <Dialog open={showNewAssetModal} onOpenChange={setShowNewAssetModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nuevo Conservador</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCreateAsset}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="model">Modelo</Label>
                <Input 
                  id="model" 
                  value={newAssetData.model}
                  onChange={(e) => handleNewAssetChange('model', e.target.value)}
                  placeholder="Ingrese el modelo" 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="serialNumber">Número de Serie</Label>
                <Input 
                  id="serialNumber" 
                  value={newAssetData.serialNumber}
                  onChange={(e) => handleNewAssetChange('serialNumber', e.target.value)}
                  placeholder="Ingrese el número de serie" 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input 
                  id="location" 
                  value={newAssetData.location}
                  onChange={(e) => handleNewAssetChange('location', e.target.value)}
                  placeholder="Ingrese la ubicación" 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacidad</Label>
                <Input 
                  id="capacity" 
                  value={newAssetData.capacity}
                  onChange={(e) => handleNewAssetChange('capacity', e.target.value)}
                  placeholder="Ingrese la capacidad" 
                  required 
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowNewAssetModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-polar-600 hover:bg-polar-700">
                Crear Conservador
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetsList;
