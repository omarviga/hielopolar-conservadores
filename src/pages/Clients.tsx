
import React from 'react';
import ClientsList from '@/components/ClientsList';
import { useClients } from '@/hooks/useClients';
import { Client } from '@/components/ClientCard';
import { toast } from '@/components/ui/use-toast';

const Clients: React.FC = () => {
  const { clients, loading, error, updateClient } = useClients();

  const handleUpdateClient = (updatedClient: Client) => {
    updateClient(updatedClient.id, updatedClient);
    toast({
      title: "Cliente actualizado",
      description: `El cliente ${updatedClient.name} ha sido actualizado correctamente.`,
    });
  };

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

  return <ClientsList clients={clients} onUpdateClient={handleUpdateClient} />;
};

export default Clients;
