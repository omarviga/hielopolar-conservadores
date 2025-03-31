
import React, { useState } from 'react';
import ClientCard, { Client } from './ClientCard';
import { Button } from '@/components/ui/button';
import { Plus, Search, Download, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NewClientForm from './NewClientForm';

interface ClientsListProps {
  clients: Client[];
}

const ClientsList: React.FC<ClientsListProps> = ({ clients }) => {
  const [filter, setFilter] = useState<Client['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredClients = clients
    .filter(client => filter === 'all' || client.status === filter)
    .filter(client => 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const activeCount = clients.filter(client => client.status === 'active').length;
  const inactiveCount = clients.filter(client => client.status === 'inactive').length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Clientes ({filteredClients.length})</h2>
        
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="text" 
              placeholder="Buscar clientes..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center bg-white border rounded-lg overflow-hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'all' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos ({clients.length})
            </Button>
            <Button 
              variant="ghost"
              size="sm" 
              className={`px-3 rounded-none ${filter === 'active' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('active')}
            >
              Activos ({activeCount})
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'inactive' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => setFilter('inactive')}
            >
              Inactivos ({inactiveCount})
            </Button>
          </div>
          
          <Button 
            className="bg-polar-600 hover:bg-polar-700"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>

          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="icon" title="Importar clientes">
              <Upload className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Exportar clientes">
              <Download className="h-4 w-4" />
            </Button>
          </div>
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
          <p className="text-gray-500">No hay clientes que coincidan con el filtro o búsqueda.</p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nuevo Cliente</DialogTitle>
          </DialogHeader>
          <NewClientForm onSubmit={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsList;
