
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EditIcon, Trash2Icon } from 'lucide-react';
import { useClients } from '@/hooks/useClients';
import { Client } from './client/ClientInterface';
import { ClientFormValues } from './client/ClientFormSchema';
import { toast } from '@/hooks/use-toast';
import EditClientForm from './client/EditClientForm';

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const { deleteClient, updateClient } = useClients();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${client.name}?`)) {
      try {
        await deleteClient(client.id);
        toast({
          title: 'Cliente eliminado',
          description: `El cliente ${client.name} ha sido eliminado correctamente.`,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'No se pudo eliminar el cliente. Intente nuevamente.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleEdit = async (values: ClientFormValues) => {
    try {
      await updateClient(client.id, values);
      toast({
        title: 'Cliente actualizado',
        description: `El cliente ${client.name} ha sido actualizado correctamente.`,
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el cliente. Intente nuevamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            {client.name}
          </CardTitle>
          <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
            {client.status === 'active' ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {client.email && <p className="text-sm text-muted-foreground mb-2">{client.email}</p>}
        {client.address && <p className="text-sm mb-1">📍 {client.address}</p>}
        {client.phone && <p className="text-sm mb-1">📞 {client.phone}</p>}
        {client.contactPerson && <p className="text-sm mb-1">👤 {client.contactPerson}</p>}
        {client.channelType && (
          <div className="flex items-center mt-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
              {client.channelType}
            </span>
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-4">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <EditIcon className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Cliente</DialogTitle>
              </DialogHeader>
              <EditClientForm client={client} onSubmit={handleEdit} onCancel={() => setIsEditing(false)} />
            </DialogContent>
          </Dialog>
          
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2Icon className="h-4 w-4 mr-1" />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
