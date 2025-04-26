
import { supabase } from '@/integrations/supabase/client';
import { initialClients } from './mockData';

export const fetchClients = async () => {
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

export const initializeClients = async () => {
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
