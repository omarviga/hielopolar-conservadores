
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Asset } from '@/components/AssetCard';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AssetsMapProps {
  assets: Asset[];
}

interface AssetLocation {
  asset: Asset;
  position: { lat: number; lng: number };
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 19.4326, // México centro (aproximado)
  lng: -99.1332
};

const AssetsMap: React.FC<AssetsMapProps> = ({ assets }) => {
  const [assetLocations, setAssetLocations] = useState<AssetLocation[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<AssetLocation | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Simular la geocodificación de direcciones
  // En una aplicación real, usarías la API de Geocodificación de Google
  useEffect(() => {
    // Simulación de ubicaciones basadas en nombres de lugares
    const simulateGeocode = () => {
      const locations = assets.map(asset => {
        let position;
        
        // Simular posiciones basadas en ubicaciones mencionadas
        if (asset.location.includes('Norte')) {
          position = { lat: 19.4326 + (Math.random() * 0.1), lng: -99.1332 - (Math.random() * 0.1) };
        } else if (asset.location.includes('Sur')) {
          position = { lat: 19.4326 - (Math.random() * 0.1), lng: -99.1332 + (Math.random() * 0.1) };
        } else if (asset.location.includes('Centro')) {
          position = { lat: 19.4326 + (Math.random() * 0.05), lng: -99.1332 - (Math.random() * 0.05) };
        } else if (asset.location.includes('Principal')) {
          position = { lat: 19.4326, lng: -99.1332 + (Math.random() * 0.02) };
        } else {
          position = { 
            lat: 19.4326 + (Math.random() * 0.2 - 0.1), 
            lng: -99.1332 + (Math.random() * 0.2 - 0.1) 
          };
        }
        
        return { asset, position };
      });
      
      setAssetLocations(locations);
    };
    
    simulateGeocode();
  }, [assets]);

  const handleMarkerClick = (location: AssetLocation) => {
    setSelectedAsset(location);
  };

  const handleCloseInfoWindow = () => {
    setSelectedAsset(null);
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
    toast({
      title: "Mapa cargado",
      description: "Se han cargado las ubicaciones de los conservadores",
    });
  };

  const getMarkerIcon = (status: Asset['status']) => {
    switch (status) {
      case 'available':
        return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      case 'in-use':
        return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      case 'maintenance':
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      case 'retired':
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      default:
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mapa de Conservadores</h2>
      <div className="mb-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png" alt="Disponible" className="w-6 h-6 mr-2" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center">
            <img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="En Uso" className="w-6 h-6 mr-2" />
            <span>En Uso</span>
          </div>
          <div className="flex items-center">
            <img src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" alt="Mantenimiento" className="w-6 h-6 mr-2" />
            <span>Mantenimiento</span>
          </div>
          <div className="flex items-center">
            <img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="Retirado" className="w-6 h-6 mr-2" />
            <span>Retirado</span>
          </div>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <LoadScript
          googleMapsApiKey=""
          onLoad={() => console.log('Script cargado correctamente')}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={handleMapLoad}
          >
            {assetLocations.map((location, index) => (
              <Marker
                key={index}
                position={location.position}
                onClick={() => handleMarkerClick(location)}
                icon={getMarkerIcon(location.asset.status)}
              />
            ))}
            
            {selectedAsset && (
              <InfoWindow
                position={selectedAsset.position}
                onCloseClick={handleCloseInfoWindow}
              >
                <div className="p-2">
                  <h3 className="font-bold">{selectedAsset.asset.model}</h3>
                  <p className="text-sm">ID: {selectedAsset.asset.id}</p>
                  <p className="text-sm">Ubicación: {selectedAsset.asset.location}</p>
                  <p className="text-sm">Estado: {
                    selectedAsset.asset.status === 'available' ? 'Disponible' :
                    selectedAsset.asset.status === 'in-use' ? 'En uso' :
                    selectedAsset.asset.status === 'maintenance' ? 'Mantenimiento' :
                    'Retirado'
                  }</p>
                  {selectedAsset.asset.assignedTo && (
                    <p className="text-sm">Asignado a: {selectedAsset.asset.assignedTo}</p>
                  )}
                  <Button size="sm" className="mt-2 bg-polar-600 hover:bg-polar-700 w-full">
                    <MapPin className="h-4 w-4 mr-2" /> Ver Detalle
                  </Button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2 text-gray-600">Cargando mapa...</p>
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Nota: Las ubicaciones mostradas son aproximadas basadas en la información disponible.
      </p>
    </div>
  );
};

export default AssetsMap;
