
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Client } from '@/components/client/ClientInterface';
import { fetchClients } from './clients/clientService';
import { useClientMutations } from './clients/mutations';

export const useClients = () => {
  const queryClient = useQueryClient();
  const { addClientMutation, updateClientMutation, deleteClientMutation } = useClientMutations(queryClient);

  // Query para obtener los clientes
  const { data: clients = [], isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    retry: 1,
  });

  // Transformar los datos de Supabase al formato de la interfaz Client
  const transformedClients = clients.map((client: any) => ({
    id: client.id,
    name: client.name,
    contactPerson: client.contact_person,
    phone: client.phone,
    email: client.email,
    address: client.address,
    assetsAssigned: client.assets_assigned,
    maxCredit: client.max_credit,
    activeCredit: client.active_credit,
    status: client.status,
    imageSrc: client.image_src,
    coordinates: client.coordinates ? JSON.parse(client.coordinates) : null,
    channelType: client.channel_type,
    conserverProductivity: client.conserver_productivity
  }));

  return {
    clients: transformedClients,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    addClient: (client: Client) => addClientMutation.mutate(client),
    updateClient: (id: string, updates: Partial<Client>) => updateClientMutation.mutate({ id, ...updates }),
    deleteClient: (id: string) => deleteClientMutation.mutate(id)
  };
};
