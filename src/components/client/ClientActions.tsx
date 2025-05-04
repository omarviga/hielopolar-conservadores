
import React from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Client } from './ClientInterface';

interface ClientActionsProps {
  clientId?: string;
  client?: Client;
  onEdit: (clientId: string) => void;
  onDelete?: (clientId: string) => void;
  onShowDetails?: (clientId: string) => void;
}

const ClientActions: React.FC<ClientActionsProps> = ({ clientId, client, onEdit, onDelete, onShowDetails }) => {
  // Use client.id if client is provided, otherwise use clientId
  const id = client?.id || clientId || '';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onShowDetails && (
          <DropdownMenuItem onClick={() => onShowDetails(id)}>
            Ver detalles
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onEdit(id)}>
          <Pencil className="mr-2 h-4 w-4" /> Editar
        </DropdownMenuItem>
        {onDelete && (
          <DropdownMenuItem onClick={() => onDelete(id)}>
            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClientActions;
