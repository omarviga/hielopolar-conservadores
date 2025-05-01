
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/components/client/ClientInterface';
import { toast } from '@/hooks/use-toast';
import { QueryClient, useMutation } from '@tanstack/react-query';

export const useClientMutations = (queryClient: QueryClient) => {
  // Mutation para agregar un nuevo cliente
  const addClientMutation = useMutation({
    mutationFn: async (client: Client) => {
      const formattedClient = {
        id: client.id,
        name: client.name,
        contact_person: client.contactPerson,
        phone: client.phone,
        email: client.email,
        address: client.address,
        assets_assigned: client.assetsAssigned,
        max_credit: client.maxCredit,
        active_credit: client.activeCredit,
        status: client.status,
        image_src: client.imageSrc,
        coordinates: client.coordinates ? JSON.stringify(client.coordinates) : null,
        channel_type: client.channelType,
        conserver_productivity: client.conserverProductivity,
        conserver: client.conserver
      };

      const { data, error } = await supabase
        .from('clients_extended')
        .insert(formattedClient)
        .select()
        .single();

      if (error) {
        console.error('Error creating client:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Cliente añadido",
        description: "El cliente ha sido añadido con éxito.",
      });
    },
    onError: (error) => {
      console.error('Error al añadir cliente:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el cliente. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  // Mutation para actualizar un cliente existente
  const updateClientMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Client> & { id: string }) => {
      const formattedUpdates: any = {};
      
      if (updates.name) formattedUpdates.name = updates.name;
      if (updates.contactPerson) formattedUpdates.contact_person = updates.contactPerson;
      if (updates.phone) formattedUpdates.phone = updates.phone;
      if (updates.email) formattedUpdates.email = updates.email;
      if (updates.address) formattedUpdates.address = updates.address;
      if ('assetsAssigned' in updates) formattedUpdates.assets_assigned = updates.assetsAssigned;
      if ('maxCredit' in updates) formattedUpdates.max_credit = updates.maxCredit;
      if ('activeCredit' in updates) formattedUpdates.active_credit = updates.activeCredit;
      if (updates.status) formattedUpdates.status = updates.status;
      if (updates.imageSrc) formattedUpdates.image_src = updates.imageSrc;
      if (updates.coordinates) formattedUpdates.coordinates = JSON.stringify(updates.coordinates);
      if (updates.channelType) formattedUpdates.channel_type = updates.channelType;
      if ('conserverProductivity' in updates) formattedUpdates.conserver_productivity = updates.conserverProductivity;
      if (updates.conserver) formattedUpdates.conserver = updates.conserver;

      const { data, error } = await supabase
        .from('clients_extended')
        .update(formattedUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating client:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Cliente actualizado",
        description: "La información del cliente ha sido actualizada.",
      });
    },
    onError: (error) => {
      console.error('Error al actualizar cliente:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el cliente. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  // Mutation para eliminar un cliente
  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('clients_extended')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting client:', error);
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Cliente eliminado",
        description: "El cliente ha sido eliminado de la base de datos.",
      });
    },
    onError: (error) => {
      console.error('Error al eliminar cliente:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el cliente. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  return {
    addClientMutation,
    updateClientMutation,
    deleteClientMutation
  };
};
