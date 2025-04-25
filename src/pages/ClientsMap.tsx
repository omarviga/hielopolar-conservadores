import React, { useState, useEffect } from 'react';
import ClientsMap from '@/components/ClientsMap';
import { MapPin } from 'lucide-react';
import MapboxTokenInput from '@/components/map/MapboxTokenInput';
import { toast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabase = createClient(
  'https://gngvimtzuksotituzugv.supabase.co', // URL de Supabase
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZ3ZpbXR6dWtzb3RpdHV6dWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNTg4MzksImV4cCI6MjA2MDgzNDgzOX0.GChTxPMJwH41swqIBDhUpvRAnW1ezqzUbIbN_cvOyZQ' // Reemplaza con tu clave pública (anon key)
);

const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1Ijoib3ZpZXlyYTIxIiwiYSI6ImNtOXU1c3loeTA2OWsya29vOHhlMDlodWEifQ.w85cm5P-bgwSaVMqVjgSJg';

const ClientsMapPage: React.FC = () => {
  const [mapboxToken, setMapboxToken] = useState<string>(DEFAULT_MAPBOX_TOKEN);
  const [tokenValid, setTokenValid] = useState<boolean>(false);

  // Función para obtener el token desde Supabase
  const fetchMapboxToken = async () => {
    try {
      const { data, error } = await supabase
        .from('settings') // Asegúrate de que esta tabla contiene el token
        .select('mapbox_token')
        .single();

      if (error) {
        console.error('Error fetching Mapbox token from Supabase:', error);
        toast({
          title: 'Error al obtener el token',
          description: 'No se pudo obtener el token de Mapbox desde el servidor.',
          variant: 'destructive',
        });
        return null;
      }

      return data?.mapbox_token || DEFAULT_MAPBOX_TOKEN;
    } catch (err) {
      console.error('Unexpected error fetching Mapbox token:', err);
      return DEFAULT_MAPBOX_TOKEN;
    }
  };

  // Cargar el token al montar el componente
  useEffect(() => {
    const loadToken = async () => {
      const token = await fetchMapboxToken();
      if (token) {
        setMapboxToken(token);
        validateToken(token);
      }
    };

    loadToken();
  }, []);

  // Validar el token con la API de Mapbox
  const validateToken = (token: string) => {
    fetch(`https://api.mapbox.com/styles/v1/mapbox/light-v11?access_token=${token}`)
      .then((response) => {
        if (response.ok) {
          setTokenValid(true);
        } else {
          console.error('Mapbox token is invalid or expired');
          setTokenValid(false);
          toast({
            title: 'Error con el token de Mapbox',
            description: 'El token proporcionado no es válido o ha expirado.',
            variant: 'destructive',
          });
        }
      })
      .catch((error) => {
        console.error('Error validating Mapbox token:', error);
        setTokenValid(false);
      });
  };

  // Manejar el envío de un nuevo token
  const handleTokenSubmit = (token: string) => {
    setMapboxToken(token);
    validateToken(token);
    toast({
      title: 'Token guardado',
      description: 'El token de Mapbox ha sido guardado correctamente.',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-6 w-6 text-polar-600" />
        <h2 className="text-2xl font-bold">Mapa de Clientes</h2>
      </div>

      {!tokenValid ? (
        <MapboxTokenInput onTokenSubmit={handleTokenSubmit} initialToken={mapboxToken} />
      ) : (
        <ClientsMap mapboxToken={mapboxToken} />
      )}
    </div>
  );
};

export default ClientsMapPage;
