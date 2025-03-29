
import React from 'react';
import { 
  Package, 
  Users, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const statsData = [
  {
    title: 'Total Conservadores',
    value: '156',
    icon: <Package className="h-8 w-8 text-polar-600" />,
    change: '+12%',
    positive: true
  },
  {
    title: 'En Consignación',
    value: '94',
    icon: <TrendingUp className="h-8 w-8 text-green-600" />,
    change: '+5%',
    positive: true
  },
  {
    title: 'Clientes Activos',
    value: '42',
    icon: <Users className="h-8 w-8 text-blue-600" />,
    change: '0%',
    positive: true
  },
  {
    title: 'En Mantenimiento',
    value: '8',
    icon: <AlertTriangle className="h-8 w-8 text-yellow-600" />,
    change: '-2%',
    positive: true
  }
];

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow p-4 card-hover animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-gray-50">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
