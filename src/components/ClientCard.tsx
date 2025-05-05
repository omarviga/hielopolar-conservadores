
import React from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Package 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  assetsAssigned: number;
  maxCredit: number;
  activeCredit: number;
  status: 'active' | 'inactive';
  imageSrc: string;
}

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const creditPercentage = (client.activeCredit / client.maxCredit) * 100;
  const creditStatus = 
    creditPercentage < 50 ? 'bg-green-500' :
    creditPercentage < 80 ? 'bg-yellow-500' :
    'bg-red-500';

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden card-hover">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img 
              src={client.imageSrc} 
              alt={client.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-lg">{client.name}</h3>
            <div className="flex items-center">
              <span className={`inline-block h-2 w-2 rounded-full ${client.status === 'active' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
              <span className="text-sm text-gray-500">
                {client.status === 'active' ? 'Cliente Activo' : 'Cliente Inactivo'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-polar-600" />
            <span>Contacto: {client.contactPerson}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-polar-600" />
            <span>{client.phone}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-polar-600" />
            <span>{client.address}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Package className="h-4 w-4 mr-2 text-polar-600" />
            <span>Conservadores Asignados: {client.assetsAssigned}</span>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>Límite de Crédito</span>
              <span>{client.activeCredit} / {client.maxCredit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full ${creditStatus}`}
                style={{ width: `${creditPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            Ver Detalle
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-polar-600 hover:bg-polar-700"
          >
            Asignar Conservador
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
