
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Asset } from './AssetCard';
import { useAssets } from '@/hooks/useAssets';
import LocationUploader from './LocationUploader';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Location {
  address: string;
  coordinates?: [number, number];
}

const AssetsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { assets } = useAssets();
  const [locations, setLocations] = useState<Location[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem('mapboxToken') || '';
  });
  const [tokenSubmitted, setTokenSubmitted] = useState<boolean>(() => {
    return !!localStorage.getItem('mapboxToken');
  });

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapboxToken', mapboxToken);
      setTokenSubmitted(true);
      toast({
        title: "Token guardado",
        description: "El token de Mapbox ha sido guardado correctamente"
      });
      // Reload page to reinitialize map with new token
      window.location.reload();
    } else {
      toast({
        title: "Token requerido",
        description: "Por favor, introduce un token válido de Mapbox",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted) return;

    // Initialize map with the stored token
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-100.6172, 19.9404],
      zoom: 5,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      // Add markers for assets
      assets.forEach((asset: Asset) => {
        if (asset.coordinates) {
          const status = asset.status;
          let color = '#3B82F6'; // blue for available
          if (status === 'in-use') color = '#10B981'; // green
          if (status === 'maintenance') color = '#EF4444'; // red

          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${asset.model}</h3>
                <p class="text-sm">${asset.location}</p>
                <p class="text-sm">Capacidad: ${asset.capacity}</p>
                ${asset.assignedTo ? `<p class="text-sm">Cliente: ${asset.assignedTo}</p>` : ''}
              </div>
            `);

          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundColor = color;
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.border = '2px solid white';
          el.style.boxShadow = '0 0 0 2px ' + color;

          new mapboxgl.Marker(el)
            .setLngLat(asset.coordinates)
            .setPopup(popup)
            .addTo(map.current!);
        }
      });

      // Add markers for additional locations
      locations.forEach((location: Location) => {
        if (location.coordinates) {
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <p class="text-sm">${location.address}</p>
              </div>
            `);

          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundColor = '#6B7280'; // gray for additional locations
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.border = '2px solid white';
          el.style.boxShadow = '0 0 0 2px #6B7280';

          new mapboxgl.Marker(el)
            .setLngLat(location.coordinates)
            .setPopup(popup)
            .addTo(map.current!);
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [assets, locations, mapboxToken, tokenSubmitted]);

  const handleLocationsLoaded = async (newLocations: Location[]) => {
    if (!tokenSubmitted) {
      toast({
        title: "Token requerido",
        description: "Primero debes ingresar un token válido de Mapbox",
        variant: "destructive"
      });
      return;
    }

    try {
      const geocodedLocations = await Promise.all(
        newLocations.map(async (loc) => {
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(loc.address)}.json?access_token=${mapboxToken}&country=mx`
            );
            
            if (!response.ok) {
              throw new Error(`Error en la geocodificación: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.features && data.features[0]) {
              const [lng, lat] = data.features[0].center;
              console.log(`Geocodificada: ${loc.address} -> [${lng}, ${lat}]`);
              return {
                ...loc,
                coordinates: [lng, lat] as [number, number]
              };
            }
            console.warn(`No se encontraron coordenadas para: ${loc.address}`);
            return loc;
          } catch (error) {
            console.error('Error geocoding address:', loc.address, error);
            return loc;
          }
        })
      );

      console.log('Ubicaciones geocodificadas:', geocodedLocations);
      setLocations(geocodedLocations);
      
      // Center map on the first location with coordinates
      const firstWithCoords = geocodedLocations.find(loc => loc.coordinates);
      if (firstWithCoords?.coordinates && map.current) {
        map.current.flyTo({
          center: firstWithCoords.coordinates,
          zoom: 9
        });
      }
    } catch (error) {
      console.error('Error processing locations:', error);
      toast({
        title: "Error",
        description: "Hubo un error al procesar las ubicaciones",
        variant: "destructive"
      });
    }
  };

  if (!tokenSubmitted) {
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
  }

  return (
    <div className="space-y-4">
      <LocationUploader onLocationsLoaded={handleLocationsLoaded} mapboxToken={mapboxToken} />
      
      <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
        <div ref={mapContainer} className="absolute inset-0" />
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
        <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow z-10">
          <Button 
            onClick={() => {
              localStorage.removeItem('mapboxToken');
              setTokenSubmitted(false);
              setMapboxToken('');
            }}
            variant="outline"
            size="sm"
          >
            Cambiar Token
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetsMap;
