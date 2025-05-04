import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, SlidersHorizontal, Map as MapIcon, LayoutGrid } from "lucide-react";
import { useClients } from '@/hooks/useClients';
import ClientsList from '@/components/ClientsList';
import ClientsMap from '@/components/ClientsMap';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NewClientForm from '@/components/NewClientForm';

const Clients = () => {
  const { clients } = useClients();
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterChannel, setFilterChannel] = useState<'all' | 'tradicional' | 'moderno' | 'industrial'>('all');
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);

  // Filter clients based on search term and filters
  const filteredClients = clients.filter(client => {
    // Search filter
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.contactPerson && client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    
    // Channel filter
    const matchesChannel = filterChannel === 'all' || client.channelType === filterChannel;
    
    return matchesSearch && matchesStatus && matchesChannel;
  });

  // Get Mapbox token from environment variables
  const mapboxToken = import.meta.env.VITE_MAPBOX_API_TOKEN || '';

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        
        <div className="flex flex-wrap gap-2">
          <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Nuevo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Cliente</DialogTitle>
                <DialogDescription>
                  Complete el formulario para registrar un nuevo cliente en el sistema.
                </DialogDescription>
              </DialogHeader>
              <NewClientForm />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="gap-2" onClick={() => setView(view === 'grid' ? 'map' : 'grid')}>
            {view === 'grid' ? (
              <>
                <MapIcon className="h-4 w-4" /> Ver Mapa
              </>
            ) : (
              <>
                <LayoutGrid className="h-4 w-4" /> Ver Lista
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar clientes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="border rounded-md px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
          
          <select
            className="border rounded-md px-3 py-2"
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value as 'all' | 'tradicional' | 'moderno' | 'industrial')}
          >
            <option value="all">Todos los canales</option>
            <option value="tradicional">Tradicional</option>
            <option value="moderno">Moderno</option>
            <option value="industrial">Industrial</option>
          </select>
          
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>ID: {client.id}</CardDescription>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {client.status === 'active' ? 'Activo' : 'Inactivo'}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ClientsList client={client} />
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm">
                  <span className="font-medium">Conservadores:</span> {client.assetsAssigned}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Canal:</span> {client.channelType}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden border">
          <ClientsMap mapboxToken={mapboxToken} />
        </div>
      )}
    </div>
  );
};

export default Clients;
