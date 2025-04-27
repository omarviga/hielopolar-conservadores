
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit, MapPin } from 'lucide-react';
import { Client } from './ClientInterface';

interface ClientActionsProps {
  onShowDetails: () => void;
  onEdit: () => void;
  client: Client;
}

const ClientActions: React.FC<ClientActionsProps> = ({ onShowDetails, onEdit, client }) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onShowDetails}
        className="flex items-center gap-2"
      >
        <Eye className="h-4 w-4" />
        Ver Detalles
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        className="flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        Editar
      </Button>
    </div>
  );
};

export default ClientActions;
