
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Asset } from './AssetCard';
import { useAssets } from '@/hooks/useAssets';
import LocationUploader from './LocationUploader';
import { toast } from '@/hooks/use-toast';

interface Location {
  address: string;
  coordinates?: [number, number];
}

const AssetsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { assets } = useAssets();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRxbXd4aWgwMnZ4MmlxbTRvdjhtN2ttIn0.O8lasM-7_3BZWeBX9E9Z7Q';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-100.6172, 19.9404],
      zoom: 9,
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
  }, [assets, locations]);

  const handleLocationsLoaded = async (newLocations: Location[]) => {
    try {
      const geocodedLocations = await Promise.all(
        newLocations.map(async (loc) => {
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(loc.address)}.json?access_token=${mapboxgl.accessToken}&country=mx`
            );
            const data = await response.json();
            
            if (data.features && data.features[0]) {
              const [lng, lat] = data.features[0].center;
              return {
                ...loc,
                coordinates: [lng, lat] as [number, number]
              };
            }
            return loc;
          } catch (error) {
            console.error('Error geocoding address:', loc.address, error);
            return loc;
          }
        })
      );

      setLocations(geocodedLocations);
      
      // Center map on the first location if exists
      if (geocodedLocations[0]?.coordinates && map.current) {
        map.current.flyTo({
          center: geocodedLocations[0].coordinates,
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

  return (
    <div className="space-y-4">
      <LocationUploader onLocationsLoaded={handleLocationsLoaded} />
      
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
      </div>
    </div>
  );
};

export default AssetsMap;
