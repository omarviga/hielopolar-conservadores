
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Asset } from '@/components/AssetCard';
import { Button } from '@/components/ui/button';
import MapLegend from './MapLegend';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  address: string;
  coordinates?: [number, number];
}

interface MapContainerProps {
  mapboxToken: string;
  assets: Asset[];
  locations: Location[];
  onChangeToken: () => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ mapboxToken, assets, locations, onChangeToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-100.6172, 19.9404],
      zoom: 5,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      assets.forEach((asset: Asset) => {
        if (asset.coordinates) {
          const status = asset.status;
          let color = '#3B82F6';
          if (status === 'in-use') color = '#10B981';
          if (status === 'maintenance') color = '#EF4444';

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
          el.style.backgroundColor = '#6B7280';
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
  }, [assets, locations, mapboxToken]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      <MapLegend />
      <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow z-10">
        <Button 
          onClick={onChangeToken}
          variant="outline"
          size="sm"
        >
          Cambiar Token
        </Button>
      </div>
    </div>
  );
};

export default MapContainer;
