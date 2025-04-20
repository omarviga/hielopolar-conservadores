
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface MapboxTokenInputProps {
  onTokenSubmit: (token: string) => void;
}

const MapboxTokenInput: React.FC<MapboxTokenInputProps> = ({ onTokenSubmit }) => {
  const [mapboxToken, setMapboxToken] = useState<string>('');

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapboxToken', mapboxToken);
      onTokenSubmit(mapboxToken);
      toast({
        title: "Token guardado",
        description: "El token de Mapbox ha sido guardado correctamente"
      });
      window.location.reload();
    } else {
      toast({
        title: "Token requerido",
        description: "Por favor, introduce un token válido de Mapbox",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
        <h3 className="font-medium">Configuración de Mapbox</h3>
        <p className="text-sm text-gray-500">
          Para utilizar el mapa, necesitas un token de Mapbox. Puedes obtener uno gratuito en{' '}
          <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            account.mapbox.com
          </a>
        </p>
        <Input
          type="text"
          value={mapboxToken}
          onChange={(e) => setMapboxToken(e.target.value)}
          placeholder="Ingresa tu token de Mapbox"
          className="w-full"
        />
        <Button onClick={handleTokenSubmit} className="w-full bg-polar-600 hover:bg-polar-700">
          Guardar Token
        </Button>
      </div>
    </div>
  );
};

export default MapboxTokenInput;
