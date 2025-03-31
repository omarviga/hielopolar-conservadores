
import React from 'react';
import { Button } from '@/components/ui/button';

interface ClientDetailActionsProps {
  onClose: () => void;
}

const ClientDetailActions: React.FC<ClientDetailActionsProps> = ({ onClose }) => {
  return (
    <div className="mt-6 flex justify-between">
      <Button variant="outline" onClick={onClose}>
        Cerrar
      </Button>
      <Button className="bg-polar-600 hover:bg-polar-700">
        Asignar Conservador
      </Button>
    </div>
  );
};

export default ClientDetailActions;
