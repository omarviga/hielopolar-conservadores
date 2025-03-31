
import React from 'react';
import { Button } from '@/components/ui/button';
import { Client } from './ClientInterface';

interface ClientStatusProps {
  status: Client['status'];
  onToggleStatus: () => void;
}

const ClientStatus: React.FC<ClientStatusProps> = ({ status, onToggleStatus }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`text-xs px-2 py-0 h-6 ${
        status === 'active' ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'
      }`}
      onClick={onToggleStatus}
    >
      {status === 'active' ? 'Activo' : 'Inactivo'}
    </Button>
  );
};

export default ClientStatus;
