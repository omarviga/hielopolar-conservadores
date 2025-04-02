
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useClients } from '@/hooks/useClients';
import { parseImportedClients } from '@/utils/clientsExportUtils';
import { Client } from './ClientInterface';
import { toast } from '@/hooks/use-toast';
import { InfoCircle, Upload, AlertTriangle } from 'lucide-react';

interface ImportClientsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImportClientsDialog: React.FC<ImportClientsDialogProps> = ({ open, onOpenChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<Partial<Client>[]>([]);
  const { addClient } = useClients();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      previewImportedFile(selectedFile);
    }
  };

  const previewImportedFile = async (selectedFile: File) => {
    try {
      setIsLoading(true);
      const importedClients = await parseImportedClients(selectedFile);
      setPreviewData(importedClients.slice(0, 3)); // Preview first 3 entries
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al procesar el archivo",
        description: "El formato del archivo no es correcto",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImport = async () => {
    if (!file) return;
    
    try {
      setIsLoading(true);
      const importedClients = await parseImportedClients(file);
      
      // Add each client
      let importedCount = 0;
      
      for (const clientData of importedClients) {
        // Generate a new ID for each client
        const newId = `CL-${String(Math.floor(Math.random() * 900) + 100)}`;
        
        // Generate random coordinates for Chile
        const coordinates: [number, number] = [
          -70.6506 + (Math.random() - 0.5) * 5, 
          -33.4372 + (Math.random() - 0.5) * 10
        ];
        
        // Create a complete client object with required fields
        const newClient: Client = {
          id: newId,
          name: clientData.name || 'Sin nombre',
          contactPerson: clientData.contactPerson || 'Sin contacto',
          phone: clientData.phone || 'Sin teléfono',
          email: clientData.email || 'sin@email.com',
          address: clientData.address || 'Sin dirección',
          assetsAssigned: 0,
          maxCredit: 5,
          activeCredit: 0,
          status: clientData.status as 'active' | 'inactive' || 'active',
          imageSrc: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
          coordinates: coordinates,
          channelType: clientData.channelType as 'tradicional' | 'moderno' | 'industrial' || 'tradicional',
          conserverProductivity: clientData.conserverProductivity || 0,
        };
        
        addClient(newClient);
        importedCount++;
      }
      
      toast({
        title: "Importación completada",
        description: `Se importaron ${importedCount} clientes correctamente.`,
      });
      
      // Close dialog and reset state
      onOpenChange(false);
      setFile(null);
      setPreviewData([]);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error en la importación",
        description: "No se pudieron importar los clientes. Verifica el formato del archivo."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Importar Clientes</DialogTitle>
          <DialogDescription>
            Importa una lista de clientes desde un archivo CSV.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-blue-50 text-blue-700 rounded-md">
            <InfoCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">
              El archivo CSV debe contener columnas con los nombres: name, contactPerson, phone, email, address, channelType, etc.
            </p>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Upload className="h-10 w-10 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                {file ? file.name : 'Haz clic para seleccionar un archivo CSV'}
              </p>
            </label>
          </div>
          
          {previewData.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Vista previa:</h4>
              <div className="max-h-40 overflow-y-auto border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.map((client, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">{client.name || '-'}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">{client.contactPerson || '-'}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">{client.email || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-1">Mostrando {previewData.length} de {file ? 'múltiples' : '0'} registros</p>
            </div>
          )}
          
          {file && !previewData.length && !isLoading && (
            <div className="flex items-center p-4 bg-amber-50 text-amber-700 rounded-md">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">
                No se pudieron encontrar datos válidos en el archivo. Verifica el formato.
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={!file || isLoading || previewData.length === 0}
              className="bg-polar-600 hover:bg-polar-700"
            >
              {isLoading ? 'Importando...' : 'Importar Clientes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportClientsDialog;
