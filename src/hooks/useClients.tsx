import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { Client } from '@/components/client/ClientInterface';

// Datos iniciales para cuando no hay clientes
const initialClients: Client[] = [
  {
    id: 'CL-101',
    name: 'Pescados Norte',
    contactPerson: 'Juan Pérez',
    phone: '555-123-4567',
    email: 'contacto@pescadosnorte.mx',
    address: 'Av. Marina 123, Puerto Vallarta',
    assetsAssigned: 3,
    maxCredit: 5,
    activeCredit: 3,
    status: 'active',
    imageSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
    coordinates: [-105.2333, 20.6167], // Puerto Vallarta
    channelType: 'tradicional', // Cambiado de distributor a tradicional
    conserverProductivity: 85,
  },
  {
    id: 'CL-102',
    name: 'Mariscos Sur',
    contactPerson: 'Ana González',
    phone: '555-765-4321',
    email: 'ana@mariscossur.mx',
    address: 'Calle Oceano 456, Acapulco',
    assetsAssigned: 2,
    maxCredit: 3,
    activeCredit: 2,
    status: 'active',
    imageSrc: 'https://randomuser.me/api/portraits/women/2.jpg',
    coordinates: [-99.8235, 16.8531], // Acapulco
    channelType: 'moderno', // Cambiado de retail a moderno
    conserverProductivity: 92,
  },
  {
    id: 'CL-103',
    name: 'Hielos Centro',
    contactPerson: 'Carlos Rodríguez',
    phone: '555-987-6543',
    email: 'carlos@hieloscentro.mx',
    address: 'Av. Revolución 789, Ciudad de México',
    assetsAssigned: 1,
    maxCredit: 2,
    activeCredit: 1,
    status: 'inactive',
    imageSrc: 'https://randomuser.me/api/portraits/men/3.jpg',
    coordinates: [-99.1332, 19.4326], // CDMX
    channelType: 'industrial', // Cambiado de wholesale a industrial
    conserverProductivity: 78,
  },
];

export const useClients = () => {
  const queryClient = useQueryClient();

  // Función para cargar clientes desde Supabase
  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients_extended')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }

    // Si no hay datos, inicializamos con los datos mock una vez
    if (!data || data.length === 0) {
      console.log('No hay datos de clientes en Supabase, inicializando con datos de ejemplo...');
      await initializeClients();
      
      const { data: initialData, error: initialError } = await supabase
        .from('clients_extended')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (initialError) {
        console.error('Error fetching initial clients:', initialError);
        throw initialError;
      }
      
      return initialData;
    }

    return data;
  };

  // Inicializar con datos mock si no hay datos
  const initializeClients = async () => {
    try {
      const { error } = await supabase
        .from('clients_extended')
        .insert(initialClients.map(client => ({
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
          conserver_productivity: client.conserverProductivity
        })));

      if (error) {
        console.error('Error initializing clients:', error);
        throw error;
      }
    } catch (err) {
      console.error('Error in initializeClients:', err);
      throw err;
    }
  };

  // Query para obtener los clientes
  const { data: clients = [], isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    retry: 1,
  });

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
        conserver_productivity: client.conserverProductivity
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
