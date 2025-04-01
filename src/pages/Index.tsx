
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { useAssets } from '@/hooks/useAssets';
import { useClients } from '@/hooks/useClients';

const Index: React.FC = () => {
  const { assets } = useAssets();
  const { clients } = useClients();
  
  // Get the most recent assets and clients for the dashboard
  const recentAssets = assets.slice(0, 3);
  const recentClients = clients.slice(0, 3);

  return <Dashboard recentAssets={recentAssets} recentClients={recentClients} />;
};

export default Index;
