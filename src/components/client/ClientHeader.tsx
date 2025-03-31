
import React from 'react';
import { Client } from './ClientInterface';

interface ClientHeaderProps {
  client: Client;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ client }) => {
  return (
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
  );
};

export default ClientHeader;
