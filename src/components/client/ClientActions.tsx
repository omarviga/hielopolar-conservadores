
import React from 'react';
import { Button } from '@/components/ui/button';

interface ClientActionsProps {
  onShowDetails: () => void;
}

const ClientActions: React.FC<ClientActionsProps> = ({ onShowDetails }) => {
  return (
    <div className="mt-6 flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-1"
        onClick={onShowDetails}
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
  );
};

export default ClientActions;
