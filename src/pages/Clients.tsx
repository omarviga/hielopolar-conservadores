
import React from 'react';
import { Link } from 'react-router-dom';
import ClientsList from '@/components/ClientsList';
import { useClients } from '@/hooks/useClients';
import { Button } from '@/components/ui/button';
import { MapPin, Users, UserCheck, UserMinus, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Clients: React.FC = () => {
  const { clients, loading, error } = useClients();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg inline-block">
          <p>{error}</p>
          <button className="mt-2 text-sm underline">Reintentar</button>
        </div>
      </div>
    );
  }

  const activeClients = clients.filter(client => client.status === 'active');
  const inactiveClients = clients.filter(client => client.status === 'inactive');
  const totalAssignedAssets = clients.reduce((total, client) => total + client.assetsAssigned, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-polar-600" />
          <h2 className="text-2xl font-bold">Clientes</h2>
        </div>
        
        <Link to="/clients/map">
          <Button className="bg-polar-600 hover:bg-polar-700">
            <MapPin className="h-4 w-4 mr-2" />
            Ver en Mapa
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clientes</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clientes Activos</p>
                <p className="text-2xl font-bold">{activeClients.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clientes Inactivos</p>
                <p className="text-2xl font-bold">{inactiveClients.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <UserMinus className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conservadores Asignados</p>
                <p className="text-2xl font-bold">{totalAssignedAssets}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ClientsList clients={clients} />
    </div>
  );
};

export default Clients;
