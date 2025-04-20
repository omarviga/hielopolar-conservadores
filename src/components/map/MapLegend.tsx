
import React from 'react';

const MapLegend: React.FC = () => {
  return (
    <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-10">
      <h3 className="font-bold mb-2">Estado de Conservadores</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm">En Uso</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm">En Mantenimiento</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-500"></div>
          <span className="text-sm">Ubicación Adicional</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
