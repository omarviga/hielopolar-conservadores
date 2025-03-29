
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { useAssets } from '@/hooks/useAssets';
import { useClients } from '@/hooks/useClients';

const Index: React.FC = () => {
  const { assets, loading: assetsLoading } = useAssets();
  const { clients, loading: clientsLoading } = useClients();

  if (assetsLoading || clientsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return <Dashboard recentAssets={assets} recentClients={clients} />;
};

export default Index;
