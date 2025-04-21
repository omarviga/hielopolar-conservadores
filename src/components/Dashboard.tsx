import React from 'react';
import Stats from './Stats';
import { 
  BarChart3, 
  PackageOpen, 
  Users,
  AlertTriangle,
  Calendar,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Asset } from './AssetCard';
import { Client } from './client/ClientInterface';

interface DashboardProps {
  recentAssets: Asset[];
  recentClients: Client[];
}

const Dashboard: React.FC<DashboardProps> = ({ recentAssets, recentClients }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <Stats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-polar-600 mr-2" />
              <h2 className="text-xl font-semibold">Distribución de Conservadores</h2>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-2">
                    <PackageOpen className="h-6 w-6" />
                  </div>
                  <p className="text-xl font-bold">94</p>
                  <p className="text-sm text-gray-500">En Consignación</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mx-auto mb-2">
                    <PackageOpen className="h-6 w-6" />
                  </div>
                  <p className="text-xl font-bold">54</p>
                  <p className="text-sm text-gray-500">Disponibles</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mx-auto mb-2">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <p className="text-xl font-bold">8</p>
                  <p className="text-sm text-gray-500">En Mantenimiento</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600 mx-auto mb-2">
                    <PackageOpen className="h-6 w-6" />
                  </div>
                  <p className="text-xl font-bold">0</p>
                  <p className="text-sm text-gray-500">Fuera de Servicio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-polar-600 mr-2" />
              <h2 className="text-xl font-semibold">Mantenimientos Progamados</h2>
            </div>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-polar-100 text-polar-600 flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Mantenimiento Preventivo</p>
                  <p className="text-sm text-gray-500">Conservador #{Math.floor(Math.random() * 1000)}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm font-medium">
                    {new Date(Date.now() + item * 86400000).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.floor(Math.random() * 12) + 8}:00 AM
                  </p>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Ver Todos
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <PackageOpen className="h-5 w-5 text-polar-600 mr-2" />
              <h2 className="text-xl font-semibold">Últimas Consignaciones</h2>
            </div>
            <Button variant="ghost" size="sm">Ver Todos</Button>
          </div>
          
          <div className="space-y-3">
            {recentAssets.slice(0, 3).map((asset) => (
              <div key={asset.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={asset.imageSrc} alt={asset.model} className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{asset.model}</p>
                  <p className="text-sm text-gray-500">ID: {asset.id}</p>
                </div>
                <div className="ml-auto">
                  <span className={`status-badge ${asset.status === 'available' ? 'status-badge-available' : 
                                   asset.status === 'in-use' ? 'status-badge-in-use' : 
                                   asset.status === 'maintenance' ? 'status-badge-maintenance' : 
                                   'status-badge-retired'}`}>
                    {asset.status === 'available' ? 'Disponible' : 
                     asset.status === 'in-use' ? 'En Uso' : 
                     asset.status === 'maintenance' ? 'Mantenimiento' : 
                     'Retirado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-polar-600 mr-2" />
              <h2 className="text-xl font-semibold">Clientes Recientes</h2>
            </div>
            <Button variant="ghost" size="sm">Ver Todos</Button>
          </div>
          
          <div className="space-y-3">
            {recentClients.slice(0, 3).map((client) => (
              <div key={client.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full overflow-hidden">
                  <img src={client.imageSrc} alt={client.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.assetsAssigned} conservadores</p>
                </div>
                <div className="ml-auto">
                  <Button size="sm" variant="outline">Ver Detalle</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
