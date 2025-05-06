
import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Package 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const creditPercentage = (client.activeCredit / client.maxCredit) * 100;
  const creditStatus = 
    creditPercentage < 50 ? 'bg-green-500' :
    creditPercentage < 80 ? 'bg-yellow-500' :
    'bg-red-500';

  const handleAssignAsset = () => {
    toast({
      title: "Asignación de conservador",
      description: `Iniciando proceso de asignación para ${client.name}`,
    });
  };

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
            onClick={() => setShowDetailsModal(true)}
          >
            Ver Detalle
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-polar-600 hover:bg-polar-700"
            onClick={handleAssignAsset}
          >
            Asignar Conservador
          </Button>
        </div>
      </div>

      {/* Client Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
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
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">ID Cliente</p>
                  <p>{client.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contacto</p>
                  <p>{client.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{client.email}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p>{client.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p>{client.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Conservadores Asignados</p>
                <p>{client.assetsAssigned}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Límite de Crédito</p>
                <p>{client.activeCredit} / {client.maxCredit}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full ${creditStatus}`}
                    style={{ width: `${creditPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowDetailsModal(false)}
            >
              Cerrar
            </Button>
            <Button 
              className="bg-polar-600 hover:bg-polar-700" 
              onClick={handleAssignAsset}
            >
              Asignar Conservador
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientCard;
