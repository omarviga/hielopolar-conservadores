
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface MapboxTokenInputProps {
  onTokenSubmit: (token: string) => void;
}

const MapboxTokenInput: React.FC<MapboxTokenInputProps> = ({ onTokenSubmit }) => {
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleTokenSubmit = () => {
    if (!mapboxToken.trim()) {
      setError('Por favor, introduce un token válido de Mapbox');
      return;
    }
    
    setError('');
    onTokenSubmit(mapboxToken);
  };

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white rounded-lg shadow-sm space-y-4 border border-polar-100">
        <h3 className="font-medium text-lg text-polar-800">Configuración de Mapbox</h3>
        <p className="text-sm text-gray-600">
          Para utilizar el mapa, necesitas un token de Mapbox. Puedes obtener uno gratuito en{' '}
          <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-polar-600 hover:underline">
            account.mapbox.com
          </a>
        </p>
        
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-center gap-2 text-sm">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}
        
        <Input
          type="text"
          value={mapboxToken}
          onChange={(e) => setMapboxToken(e.target.value)}
          placeholder="Ingresa tu token de Mapbox"
          className="w-full"
        />
        
        <Button 
          onClick={handleTokenSubmit} 
          className="w-full bg-polar-600 hover:bg-polar-700 text-white"
        >
          Guardar Token
        </Button>
      </div>
    </div>
  );
};

export default MapboxTokenInput;
