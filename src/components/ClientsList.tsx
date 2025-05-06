
import React, { useState } from 'react';
import ClientCard, { Client } from './ClientCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface ClientsListProps {
  clients: Client[];
}

const ClientsList: React.FC<ClientsListProps> = ({ clients }) => {
  const [filter, setFilter] = useState<Client['status'] | 'all'>('all');
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const filteredClients = filter === 'all' 
    ? clients 
    : clients.filter(client => client.status === filter);

  const handleFilterChange = (newFilter: Client['status'] | 'all') => {
    setFilter(newFilter);
    toast({
      title: "Filtro aplicado",
      description: newFilter === 'all' 
        ? "Mostrando todos los clientes" 
        : `Mostrando clientes con estado: ${newFilter === 'active' ? 'activos' : 'inactivos'}`,
    });
  };

  const handleNewClientChange = (field: string, value: string) => {
    setNewClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to create the client
    console.log("Creating new client with data:", newClientData);
    
    toast({
      title: "Cliente creado",
      description: `El cliente ${newClientData.name} ha sido creado correctamente.`,
    });
    
    setShowNewClientModal(false);
    setNewClientData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
    });
  };

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
              onClick={() => handleFilterChange('all')}
            >
              Todos
            </Button>
            <Button 
              variant="ghost"
              size="sm" 
              className={`px-3 rounded-none ${filter === 'active' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => handleFilterChange('active')}
            >
              Activos
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 rounded-none ${filter === 'inactive' ? 'bg-polar-600 text-white' : ''}`}
              onClick={() => handleFilterChange('inactive')}
            >
              Inactivos
            </Button>
          </div>
          
          <Button 
            className="bg-polar-600 hover:bg-polar-700"
            onClick={() => setShowNewClientModal(true)}
          >
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

      {/* New Client Modal */}
      <Dialog open={showNewClientModal} onOpenChange={setShowNewClientModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nuevo Cliente</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCreateClient}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la Empresa</Label>
                <Input 
                  id="name" 
                  value={newClientData.name}
                  onChange={(e) => handleNewClientChange('name', e.target.value)}
                  placeholder="Ingrese el nombre de la empresa" 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contactPerson">Persona de Contacto</Label>
                <Input 
                  id="contactPerson" 
                  value={newClientData.contactPerson}
                  onChange={(e) => handleNewClientChange('contactPerson', e.target.value)}
                  placeholder="Ingrese el nombre de la persona de contacto" 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newClientData.email}
                  onChange={(e) => handleNewClientChange('email', e.target.value)}
                  placeholder="Ingrese el email" 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input 
                  id="phone" 
                  value={newClientData.phone}
                  onChange={(e) => handleNewClientChange('phone', e.target.value)}
                  placeholder="Ingrese el teléfono" 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address">Dirección</Label>
                <Input 
                  id="address" 
                  value={newClientData.address}
                  onChange={(e) => handleNewClientChange('address', e.target.value)}
                  placeholder="Ingrese la dirección" 
                  required 
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowNewClientModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-polar-600 hover:bg-polar-700">
                Crear Cliente
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsList;
