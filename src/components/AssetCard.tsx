
import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  Calendar, 
  AlertCircle,
  Users,
  X,
  Pencil
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import ClientAssetQR from './qr/ClientAssetQR';
import EditAssetForm from './forms/EditAssetForm';

export interface Asset {
  id: string;
  model: string;
  serialNumber: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  location: string;
  lastMaintenance: string;
  assignedTo?: string;
  capacity: string;
  temperatureRange: string;
  imageSrc: string;
}

interface AssetCardProps {
  asset: Asset;
  onUpdate?: (id: string, updates: Partial<Asset>) => void;
}

const statusLabels: Record<Asset['status'], string> = {
  'available': 'Disponible',
  'in-use': 'En Uso',
  'maintenance': 'Mantenimiento',
  'retired': 'Retirado'
};

const statusClasses: Record<Asset['status'], string> = {
  'available': 'status-badge-available',
  'in-use': 'status-badge-in-use',
  'maintenance': 'status-badge-maintenance',
  'retired': 'status-badge-retired'
};

const AssetCard: React.FC<AssetCardProps> = ({ asset, onUpdate }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const handleManage = () => {
    toast({
      title: "Gestión de conservador",
      description: `Iniciando gestión para ${asset.model} (${asset.id})`,
      variant: "default",
    });
  };

  const handleEdit = () => {
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  const handleUpdateAsset = (updatedAsset: Partial<Asset>) => {
    if (onUpdate) {
      onUpdate(asset.id, updatedAsset);
      setShowEditModal(false);
      toast({
        title: "Conservador actualizado",
        description: `${asset.model} (${asset.id}) ha sido actualizado correctamente`,
        variant: "default",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden card-hover">
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
        
        <div className="mt-4 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setShowDetailsModal(true)}
          >
            Ver Detalles
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-polar-600 hover:bg-polar-700"
            onClick={handleManage}
          >
            Gestionar
          </Button>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Detalles del Conservador</span>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={asset.imageSrc} 
                alt={asset.model} 
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <div className="mt-4">
                <h3 className="text-xl font-bold">{asset.model}</h3>
                <p className="text-sm text-gray-500 mb-4">ID: {asset.id}</p>
                
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    asset.status === 'available' ? 'bg-green-100 text-green-800' :
                    asset.status === 'in-use' ? 'bg-blue-100 text-blue-800' :
                    asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {statusLabels[asset.status]}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-gray-500">Número de Serie</h4>
                <p>{asset.serialNumber}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-gray-500">Capacidad</h4>
                <p>{asset.capacity}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-gray-500">Rango de Temperatura</h4>
                <p>{asset.temperatureRange}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-gray-500">Ubicación</h4>
                <p>{asset.location}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-gray-500">Último Mantenimiento</h4>
                <p>{asset.lastMaintenance}</p>
              </div>
              
              {asset.assignedTo && (
                <div>
                  <h4 className="font-medium text-sm text-gray-500">Cliente Asignado</h4>
                  <p>{asset.assignedTo}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Código QR</h4>
            <ClientAssetQR asset={asset} />
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              className="flex gap-1 items-center"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
            <Button 
              className="bg-polar-600 hover:bg-polar-700"
              onClick={handleManage}
            >
              Gestionar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Editar Conservador</span>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          
          <EditAssetForm 
            asset={asset} 
            onSubmit={handleUpdateAsset} 
            onCancel={() => setShowEditModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetCard;
