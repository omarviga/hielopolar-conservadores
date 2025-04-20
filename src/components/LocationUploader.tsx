
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface Location {
  address: string;
  coordinates?: [number, number];
}

const LocationUploader = ({ 
  onLocationsLoaded,
  mapboxToken 
}: { 
  onLocationsLoaded: (locations: Location[]) => void;
  mapboxToken: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);

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
    
    // Read and show file content preview
    const text = await file.text();
    setFileContent(text);
  };

  const processLocations = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      // Remove header if exists
      const dataStartIndex = lines[0].toLowerCase().includes('address') ? 1 : 0;
      const addresses = lines.slice(dataStartIndex);
      
      const locations: Location[] = addresses.map(address => ({
        address: address.trim(),
      }));

      console.log('Procesando ubicaciones:', locations);
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

      {fileContent && (
        <Alert>
          <AlertTitle>Vista previa del archivo</AlertTitle>
          <AlertDescription>
            <pre className="text-xs max-h-32 overflow-y-auto mt-2 bg-gray-50 p-2 rounded">
              {fileContent}
            </pre>
          </AlertDescription>
        </Alert>
      )}

      <Button
        onClick={processLocations}
        disabled={!file || loading}
        className="w-full bg-polar-600 hover:bg-polar-700"
      >
        {loading ? 'Procesando...' : 'Cargar Direcciones'}
      </Button>
      
      <div className="text-xs text-gray-500">
        <p>Formato esperado:</p>
        <pre className="bg-gray-50 p-1 rounded mt-1">
          address
          Av. Ejemplo 123, Ciudad
          Calle Principal 456, Estado
        </pre>
      </div>
    </div>
  );
};

export default LocationUploader;
