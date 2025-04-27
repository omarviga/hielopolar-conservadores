
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Edit } from 'lucide-react';
import { Client } from './ClientInterface';

interface ClientDetailActionsProps {
  onClose: () => void;
  onEdit: () => void;
  client: Client;
}

const ClientDetailActions: React.FC<ClientDetailActionsProps> = ({ onClose, onEdit, client }) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={onClose}>
        <X className="h-4 w-4 mr-2" />
        Cerrar
      </Button>
      <Button onClick={onEdit} className="bg-polar-600 hover:bg-polar-700">
        <Edit className="h-4 w-4 mr-2" />
        Editar
      </Button>
    </div>
  );
};

export default ClientDetailActions;
