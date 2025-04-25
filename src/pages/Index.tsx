
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { useAssets } from '@/hooks/useAssets';
import { useClients } from '@/hooks/useClients';

const Index: React.FC = () => {
  const { assets, isLoading: assetsLoading } = useAssets();
  const { clients, isLoading: clientsLoading } = useClients();
  
  // Get the most recent assets and clients for the dashboard
  const recentAssets = assets?.slice(0, 3) || [];
  const recentClients = clients?.slice(0, 3) || [];

  if (assetsLoading || clientsLoading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg">Cargando datos del dashboard...</div>
    </div>;
  }

  return <Dashboard recentAssets={recentAssets} recentClients={recentClients} />;
};

export default Index;
