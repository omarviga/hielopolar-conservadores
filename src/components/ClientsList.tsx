
import React, { useState } from 'react';
import ClientCard, { Client } from './ClientCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ClientsListProps {
  clients: Client[];
}

const ClientsList: React.FC<ClientsListProps> = ({ clients }) => {
  const [filter, setFilter] = useState<Client['status'] | 'all'>('all');
  
  const filteredClients = filter === 'all' 
    ? clients 
    : clients.filter(client => client.status === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Clientes ({filteredClients.length})</h2>
        
        <div className="flex gap-2">
          <div className="flex items-center bg-white border rounded-lg overflow-hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'all' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos
            </Button>
            <Button 
              variant="ghost"
              size="sm" 
              className={`px-3 rounded-none ${filter === 'active' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('active')}
            >
              Activos
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'inactive' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('inactive')}
            >
              Inactivos
            </Button>
          </div>
          
          <Button className="bg-polar-600 hover:bg-polar-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredClients.map((client, index) => (
          <div 
            key={client.id} 
            className="animate-slide-in" 
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ClientCard client={client} />
          </div>
        ))}
      </div>
      
      {filteredClients.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay clientes que coincidan con el filtro.</p>
        </div>
      )}
    </div>
  );
};

export default ClientsList;
