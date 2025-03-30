
import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Package,
  Mail,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useClients } from '@/hooks/useClients';

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
  coordinates?: [number, number]; // Longitud, Latitud
}

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { updateClient } = useClients();
  
  const creditPercentage = (client.activeCredit / client.maxCredit) * 100;
  const creditStatus = 
    creditPercentage < 50 ? 'bg-green-500' :
    creditPercentage < 80 ? 'bg-yellow-500' :
    'bg-red-500';

  const toggleClientStatus = () => {
    const newStatus = client.status === 'active' ? 'inactive' : 'active';
    updateClient(client.id, { status: newStatus });
  };

  return (
    <>
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
              onClick={() => setShowDetails(true)}
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

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img src={client.imageSrc} alt={client.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{client.name}</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className={`text-xs px-2 py-0 h-6 ${
                    client.status === 'active' ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'
                  }`}
                  onClick={toggleClientStatus}
                >
                  {client.status === 'active' ? 'Activo' : 'Inactivo'}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Información de contacto</h4>
              
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-polar-600" />
                <span>{client.contactPerson}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-polar-600" />
                <span>{client.phone}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-polar-600" />
                <span>{client.email}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Ubicación y recursos</h4>
              
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-polar-600" />
                <span>{client.address}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Package className="h-4 w-4 mr-2 text-polar-600" />
                <span>Conservadores: {client.assetsAssigned} / {client.maxCredit}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-polar-600" />
                <span>ID: {client.id}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Límite de crédito</h4>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${creditStatus}`}
                style={{ width: `${creditPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>0</span>
              <span>{client.activeCredit} utilizados</span>
              <span>Máximo: {client.maxCredit}</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Cerrar
            </Button>
            <Button className="bg-polar-600 hover:bg-polar-700">
              Asignar Conservador
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientCard;
