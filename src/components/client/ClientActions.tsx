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

interface ClientActionsProps {
  clientId: string;
  onEdit: (clientId: string) => void;
  onDelete: (clientId: string) => void;
}

const ClientActions: React.FC<ClientActionsProps> = ({ clientId, onEdit, onDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(clientId)}>
          <Pencil className="mr-2 h-4 w-4" /> Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(clientId)}>
          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClientActions;
