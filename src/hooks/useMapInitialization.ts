
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Asset } from '@/components/AssetCard';
import { Location } from '@/types/map';
import { useMapLayers } from './map/useMapLayers';
import { useMapEvents } from './map/useMapEvents';
import { useGlobeRotation } from './map/useGlobeRotation';

interface UseMapInitializationProps {
  mapboxToken: string;
  assets: Asset[];
  locations: Location[];
}

export const useMapInitialization = ({ mapboxToken, assets, locations }: UseMapInitializationProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { addMapLayers } = useMapLayers();
  const { setupEventHandlers } = useMapEvents();
  const { initializeGlobeRotation } = useGlobeRotation();

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [30, 15],
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Disable scroll zoom for smoother experience
    map.current.scrollZoom.disable();

    map.current.on('style.load', () => {
      if (!map.current) return;
      
      addMapLayers(map.current, assets, locations);
      setupEventHandlers(map.current);
      initializeGlobeRotation(map.current);
    });

    return () => {
      map.current?.remove();
    };
  }, [assets, locations, mapboxToken, addMapLayers, setupEventHandlers, initializeGlobeRotation]);

  return { mapContainer, map };
};
