
import React from 'react';
import { Asset } from '@/components/AssetCard';
import { Location } from '@/types/map';
import { useMapInitialization } from '@/hooks/useMapInitialization';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapContainerProps {
  mapboxToken: string;
  assets: Asset[];
  locations: Location[];
  onChangeToken: () => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
  mapboxToken,
  assets,
  locations,
  onChangeToken,
}) => {
  const { mapContainer } = useMapInitialization({ mapboxToken, assets, locations });

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default MapContainer;
