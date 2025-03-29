
import React from 'react';
import { 
  Package, 
  MapPin, 
  Calendar, 
  AlertCircle,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

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
  onSelect?: (asset: Asset) => void;
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

const AssetCard: React.FC<AssetCardProps> = ({ asset, onUpdate, onSelect }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewDetails = () => {
    if (onSelect) {
      onSelect(asset);
    } else {
      // Navigate to detail view when implemented
      toast({
        title: "Función en desarrollo",
        description: `Detalles completos del conservador ${asset.id} estarán disponibles pronto.`,
      });
    }
  };

  const handleManage = () => {
    if (onUpdate) {
      // For now just toggle between available and in-use as a demonstration
      const newStatus = asset.status === 'available' ? 'in-use' : 'available';
      onUpdate(asset.id, { status: newStatus });
      
      toast({
        title: "Estado actualizado",
        description: `Conservador ${asset.id} ahora está ${statusLabels[newStatus].toLowerCase()}.`,
      });
    } else {
      // Navigate to management view when implemented
      toast({
        title: "Función en desarrollo",
        description: "La gestión completa estará disponible pronto.",
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
            onClick={handleViewDetails}
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
    </div>
  );
};

export default AssetCard;
