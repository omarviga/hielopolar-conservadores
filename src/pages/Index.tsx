
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { useAssets } from '@/hooks/useAssets';
import { useClients } from '@/hooks/useClients';
import { useMaintenance } from '@/hooks/useMaintenance';

const Index: React.FC = () => {
  const { assets, loading: assetsLoading } = useAssets();
  const { clients, loading: clientsLoading } = useClients();
  const { maintenances, isLoading: maintenanceLoading } = useMaintenance();
  
  // Get the most recent assets and clients for the dashboard
  const recentAssets = assets?.slice(0, 3) || [];
  const recentClients = clients?.slice(0, 3) || [];
  
  // Get scheduled maintenances
  const scheduledMaintenances = maintenances
    ?.filter(m => m.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3) || [];

  if (assetsLoading || clientsLoading || maintenanceLoading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg">Cargando datos del dashboard...</div>
    </div>;
  }

  return (
    <Dashboard 
      recentAssets={recentAssets} 
      recentClients={recentClients} 
      scheduledMaintenances={scheduledMaintenances} 
    />
  );
};

export default Index;
