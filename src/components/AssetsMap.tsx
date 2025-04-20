
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Asset } from './AssetCard';
import { useAssets } from '@/hooks/useAssets';

const AssetsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { assets } = useAssets();

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRxbXd4aWgwMnZ4MmlxbTRvdjhtN2ttIn0.O8lasM-7_3BZWeBX9E9Z7Q';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-100.6172, 19.9404], // Centro aproximado entre las ciudades
      zoom: 9,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      // Add markers for each asset that has coordinates
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
    });

    return () => {
      map.current?.remove();
    };
  }, [assets]);

  return (
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
        </div>
      </div>
    </div>
  );
};

export default AssetsMap;
