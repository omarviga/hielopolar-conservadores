
import { useState, useEffect } from 'react';
import { Client } from '@/components/ClientCard';

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
    imageSrc: 'https://randomuser.me/api/portraits/men/1.jpg'
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
    imageSrc: 'https://randomuser.me/api/portraits/women/2.jpg'
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
    imageSrc: 'https://randomuser.me/api/portraits/men/3.jpg'
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
    imageSrc: 'https://randomuser.me/api/portraits/women/4.jpg'
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
    imageSrc: 'https://randomuser.me/api/portraits/men/5.jpg'
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
    imageSrc: 'https://randomuser.me/api/portraits/women/6.jpg'
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
        // In a real app, this would be an API call
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setClients(mockClients);
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

  const addClient = (client: Client) => {
    setClients(prev => [...prev, client]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => 
      prev.map(client => 
        client.id === id ? { ...client, ...updates } : client
      )
    );
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
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
