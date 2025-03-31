
import React from 'react';
import { Client } from './ClientInterface';
import ClientStatus from './ClientStatus';

interface ClientDetailHeaderProps {
  client: Client;
  onToggleStatus: () => void;
}

const ClientDetailHeader: React.FC<ClientDetailHeaderProps> = ({ client, onToggleStatus }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="h-16 w-16 rounded-full overflow-hidden">
        <img src={client.imageSrc} alt={client.name} className="h-full w-full object-cover" />
      </div>
      <div>
        <h3 className="font-bold text-lg">{client.name}</h3>
        <div className="flex items-center">
          <ClientStatus status={client.status} onToggleStatus={onToggleStatus} />
        </div>
      </div>
    </div>
  );
};

export default ClientDetailHeader;
