
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';

interface Location {
  address: string;
  coordinates?: [number, number];
}

const LocationUploader = ({ onLocationsLoaded }: { onLocationsLoaded: (locations: Location[]) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Formato no válido",
        description: "Por favor, sube un archivo CSV",
        variant: "destructive"
      });
      return;
    }
    
    setFile(file);
  };

  const processLocations = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      // Remove header if exists
      const addresses = lines.slice(1);
      
      const locations: Location[] = addresses.map(address => ({
        address: address.trim(),
      }));

      onLocationsLoaded(locations);
      toast({
        title: "Direcciones cargadas",
        description: `Se cargaron ${locations.length} direcciones correctamente`
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error al procesar el archivo",
        description: "Hubo un error al leer las direcciones",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-polar-600" />
        <h3 className="font-medium">Cargar Ubicaciones</h3>
      </div>
      
      <div className="space-y-2">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="w-full"
        />
        <p className="text-sm text-gray-500">
          Sube un archivo CSV con las direcciones (una por línea)
        </p>
      </div>

      <Button
        onClick={processLocations}
        disabled={!file || loading}
        className="w-full bg-polar-600 hover:bg-polar-700"
      >
        {loading ? 'Procesando...' : 'Cargar Direcciones'}
      </Button>
    </div>
  );
};

export default LocationUploader;
