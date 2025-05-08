
import React from 'react';
import { X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Asset, statusLabels } from '@/types/Asset';
import ClientAssetQR from '../qr/ClientAssetQR';

interface AssetDetailsModalProps {
  asset: Asset;
  onEdit: () => void;
  onManage: () => void;
}

const AssetDetailsModal: React.FC<AssetDetailsModalProps> = ({ asset, onEdit, onManage }) => {
  return (
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
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
        <Button 
          className="bg-polar-600 hover:bg-polar-700"
          onClick={onManage}
        >
          Gestionar
        </Button>
      </div>
    </DialogContent>
  );
};

export default AssetDetailsModal;
