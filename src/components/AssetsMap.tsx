
import React, { useState } from 'react';
import { useAssets } from '@/hooks/useAssets';
import LocationUploader from './LocationUploader';
import MapContainer from './map/MapContainer';
import { toast } from '@/hooks/use-toast';

interface Location {
  address: string;
  coordinates?: [number, number];
}

interface AssetsMapProps {
  mapboxToken: string;
}

const AssetsMap: React.FC<AssetsMapProps> = ({ mapboxToken }) => {
  const { assets } = useAssets();
  const [locations, setLocations] = useState<Location[]>([]);

  const handleLocationsLoaded = async (newLocations: Location[]) => {
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
      <LocationUploader onLocationsLoaded={handleLocationsLoaded} mapboxToken={mapboxToken} />
      <MapContainer 
        mapboxToken={mapboxToken}
        assets={assets}
        locations={locations}
        onChangeToken={() => {
          localStorage.removeItem('mapboxToken');
          window.location.reload();
        }}
      />
    </div>
  );
};

export default AssetsMap;
