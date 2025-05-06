
import React from 'react';
import AssetsMap from '@/components/maps/AssetsMap';
import { useAssets } from '@/hooks/useAssets';

const AssetsMapPage: React.FC = () => {
  const { assets, loading, error } = useAssets();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600">Cargando conservadores...</p>
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

  return <AssetsMap assets={assets} />;
};

export default AssetsMapPage;
