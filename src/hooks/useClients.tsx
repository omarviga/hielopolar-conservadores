
import { useState, useEffect } from 'react';
import { Client } from '@/components/ClientCard';
import { toast } from '@/hooks/use-toast';

// Simulated data
const mockClients: Client[] = [
  {
    id: 'CL-001',
    name: 'Pescados Norte',
    contactPerson: 'Juan Pérez',
    phone: '+56 9 1234 5678',
    email: 'juan@pescadosnorte.cl',
    address: 'Av. Marina 456, Antofagasta',
    assetsAssigned: 3,
    maxCredit: 5,
    activeCredit: 3,
    status: 'active',
    imageSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
    coordinates: [-70.4001, -23.6509], // Antofagasta
    channelType: 'tradicional',
    conserverProductivity: 85
  },
  {
    id: 'CL-002',
    name: 'Mariscos Sur',
    contactPerson: 'María González',
    phone: '+56 9 9876 5432',
    email: 'maria@mariscossur.cl',
    address: 'Calle Puerto 789, Puerto Montt',
    assetsAssigned: 5,
    maxCredit: 8,
    activeCredit: 5,
    status: 'active',
    imageSrc: 'https://randomuser.me/api/portraits/women/2.jpg',
    coordinates: [-72.9392, -41.4718], // Puerto Montt
    channelType: 'moderno',
    conserverProductivity: 92
  },
  {
    id: 'CL-003',
    name: 'Hielos Centro',
    contactPerson: 'Carlos Rodríguez',
    phone: '+56 9 5555 6666',
    email: 'carlos@hieloscentro.cl',
    address: 'Av. Providencia, Santiago',
    assetsAssigned: 2,
    maxCredit: 4,
    activeCredit: 2,
    status: 'active',
    imageSrc: 'https://randomuser.me/api/portraits/men/3.jpg',
    coordinates: [-70.6506, -33.4372], // Santiago
    channelType: 'industrial',
    conserverProductivity: 78
  },
  {
    id: 'CL-004',
    name: 'Alimentos Frescos',
    contactPerson: 'Ana Martínez',
    phone: '+56 9 7777 8888',
    email: 'ana@alimentosfrescos.cl',
    address: 'Calle Comercio 123, Valparaíso',
    assetsAssigned: 0,
    maxCredit: 3,
    activeCredit: 0,
    status: 'inactive',
    imageSrc: 'https://randomuser.me/api/portraits/women/4.jpg',
    coordinates: [-71.6188, -33.0472], // Valparaiso
    channelType: 'moderno',
    conserverProductivity: 65
  },
  {
    id: 'CL-005',
    name: 'Distribuidora Pacífico',
    contactPerson: 'Roberto Silva',
    phone: '+56 9 3333 4444',
    email: 'roberto@pacifico.cl',
    address: 'Av. Costanera 567, Iquique',
    assetsAssigned: 4,
    maxCredit: 6,
    activeCredit: 4,
    status: 'active',
    imageSrc: 'https://randomuser.me/api/portraits/men/5.jpg',
    coordinates: [-70.1435, -20.2307], // Iquique
    channelType: 'tradicional',
    conserverProductivity: 88
  },
  {
    id: 'CL-006',
    name: 'Mercado Central',
    contactPerson: 'Sofía López',
    phone: '+56 9 2222 1111',
    email: 'sofia@mercadocentral.cl',
    address: 'Av. 21 de Mayo 890, Santiago',
    assetsAssigned: 6,
    maxCredit: 6,
    activeCredit: 6,
    status: 'active',
    imageSrc: 'https://randomuser.me/api/portraits/women/6.jpg',
    coordinates: [-70.6523, -33.4372], // Santiago (ligeramente diferente para distinguir en el mapa)
    channelType: 'industrial',
    conserverProductivity: 95
  }
];

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchClients = async () => {
      try {
        // Try to get clients from localStorage first
        const savedClients = localStorage.getItem('clients');
        setLoading(true);
        
        if (savedClients) {
          console.info('Datos cargados desde localStorage');
          setClients(JSON.parse(savedClients));
        } else {
          // If no saved clients, use mock data
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          setClients(mockClients);
          // Save initial data to localStorage
          localStorage.setItem('clients', JSON.stringify(mockClients));
        }
        
        setError(null);
      } catch (err) {
        setError('Error al cargar los clientes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Helper function to save clients to localStorage
  const saveToLocalStorage = (updatedClients: Client[]) => {
    try {
      localStorage.setItem('clients', JSON.stringify(updatedClients));
      console.info('Guardando datos en localStorage');
    } catch (err) {
      console.error('Error al guardar en localStorage:', err);
    }
  };

  const addClient = (client: Client) => {
    const updatedClients = [...clients, client];
    setClients(updatedClients);
    saveToLocalStorage(updatedClients);
    toast({
      title: 'Cliente agregado',
      description: `El cliente "${client.name}" ha sido añadido exitosamente.`,
    });
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    const updatedClients = clients.map(client => 
      client.id === id ? { ...client, ...updates } : client
    );
    setClients(updatedClients);
    saveToLocalStorage(updatedClients);
    toast({
      title: 'Cliente actualizado',
      description: 'Los cambios han sido guardados correctamente',
    });
  };

  const deleteClient = (id: string) => {
    const updatedClients = clients.filter(client => client.id !== id);
    setClients(updatedClients);
    saveToLocalStorage(updatedClients);
    toast({
      title: 'Cliente eliminado',
      description: 'El cliente ha sido eliminado correctamente',
      variant: 'destructive',
    });
  };

  return {
    clients,
    loading,
    error,
    addClient,
    updateClient,
    deleteClient
  };
};
