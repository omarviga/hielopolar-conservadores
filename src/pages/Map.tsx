
import React, { useState, useEffect } from 'react';
import AssetsMap from '@/components/AssetsMap';
import { Map as MapIcon } from 'lucide-react';
import MapboxTokenInput from '@/components/map/MapboxTokenInput';
import { toast } from '@/hooks/use-toast';

const MapPage: React.FC = () => {
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem('mapboxToken') || '';
  });
  const [tokenValid, setTokenValid] = useState<boolean>(false);

  useEffect(() => {
    // Check if token exists
    if (mapboxToken) {
      // Validate token by checking if it can fetch styles
      fetch(`https://api.mapbox.com/styles/v1/mapbox/light-v11?access_token=${mapboxToken}`)
        .then(response => {
          if (response.ok) {
            setTokenValid(true);
          } else {
            console.error('Mapbox token is invalid or expired');
            setTokenValid(false);
            toast({
              title: "Error con el token de Mapbox",
              description: "El token proporcionado no es válido o ha expirado",
              variant: "destructive"
            });
          }
        })
        .catch(error => {
          console.error('Error validating Mapbox token:', error);
          setTokenValid(false);
        });
    }
  }, [mapboxToken]);

  const handleTokenSubmit = (token: string) => {
    localStorage.setItem('mapboxToken', token);
    setMapboxToken(token);
    toast({
      title: "Token guardado",
      description: "El token de Mapbox ha sido guardado correctamente"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <MapIcon className="h-6 w-6 text-polar-600" />
        <h2 className="text-2xl font-bold">Mapa de Conservadores</h2>
      </div>

      {!tokenValid ? (
        <MapboxTokenInput onTokenSubmit={handleTokenSubmit} initialToken={mapboxToken} />
      ) : (
        <AssetsMap mapboxToken={mapboxToken} />
      )}
    </div>
  );
};

export default MapPage;
