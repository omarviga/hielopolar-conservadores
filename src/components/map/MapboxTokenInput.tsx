import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface MapboxTokenInputProps {
  onTokenSubmit: (token: string) => void;
  initialToken?: string;
}

const MapboxTokenInput: React.FC<MapboxTokenInputProps> = ({ onTokenSubmit, initialToken = '' }) => {
  const [mapboxToken, setMapboxToken] = useState<string>(initialToken);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();

  const validateToken = (token: string): boolean => {
    return token.startsWith('pk.') && token.length > 30;
  };

  const handleTokenSubmit = async () => {
    if (!mapboxToken.trim()) {
      setError('Por favor, introduce un token válido de Mapbox');
      return;
    }

    if (!validateToken(mapboxToken)) {
      setError('El token debe comenzar con "pk." y tener al menos 30 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Guardar en Supabase
      const { error } = await supabase
        .from('app_config')
        .upsert(
          {
            config_key: 'MAPBOX_API_TOKEN_ICE',
            config_value: mapboxToken
          },
          { onConflict: 'config_key' }
        );

      if (error) throw error;

      setSuccess('Token guardado correctamente en Supabase');
      onTokenSubmit(mapboxToken);
    } catch (err) {
      setError('Error al guardar el token: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white rounded-lg shadow-sm space-y-4 border border-polar-100">
        <h3 className="font-medium text-lg text-polar-800">Configuración de Mapbox</h3>
        <p className="text-sm text-gray-600">
          Para utilizar el mapa, necesitas un token de Mapbox. Puedes obtener uno gratuito en{' '}
          <a
            href="https://account.mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-polar-600 hover:underline"
          >
            account.mapbox.com
          </a>
        </p>

        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-center gap-2 text-sm">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-800 p-3 rounded-md flex items-center gap-2 text-sm">
            <CheckCircle className="h-5 w-5" />
            {success}
          </div>
        )}

        <Input
          type="text"
          value={mapboxToken}
          onChange={(e) => {
            setMapboxToken(e.target.value);
            setError('');
            setSuccess('');
          }}
          placeholder="pk.ey..."
          className="w-full font-mono text-sm"
        />

        <Button
          onClick={handleTokenSubmit}
          className="w-full bg-polar-600 hover:bg-polar-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            'Guardar Token'
          )}
        </Button>

        <div className="text-xs text-gray-500 mt-2">
          <p>El token se almacenará de forma segura en Supabase y se usará para cargar los mapas.</p>
          <p className="mt-1">Scopes requeridos: <span className="font-mono">styles:read, fonts:read, tiles:read</span></p>
        </div>
      </div>
    </div>
  );
};

export default MapboxTokenInput;