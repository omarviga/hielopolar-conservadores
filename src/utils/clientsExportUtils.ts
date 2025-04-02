
import { Client } from '@/components/client/ClientInterface';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

/**
 * Export clients to CSV file
 */
export const exportClientsToCSV = (clients: Client[]): void => {
  // Prepare data for CSV export
  const exportData = clients.map(client => ({
    id: client.id,
    name: client.name,
    contactPerson: client.contactPerson,
    phone: client.phone,
    email: client.email,
    address: client.address,
    status: client.status === 'active' ? 'Activo' : 'Inactivo',
    channelType: mapChannelTypeToSpanish(client.channelType),
    conserverProductivity: client.conserverProductivity,
    assetsAssigned: client.assetsAssigned,
  }));

  // Convert to CSV
  const csv = Papa.unparse(exportData);
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `clientes-${new Date().toISOString().slice(0, 10)}.csv`);
};

/**
 * Parse imported CSV file and convert to Client objects
 */
export const parseImportedClients = (file: File): Promise<Partial<Client>[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const importedClients: Partial<Client>[] = results.data.map((row: any) => {
            // Determine status value
            let statusValue: 'active' | 'inactive';
            if (row.status === 'Activo' || row.status === 'active') {
              statusValue = 'active';
            } else {
              statusValue = 'inactive';
            }

            return {
              name: row.name || row.nombre || '',
              contactPerson: row.contactPerson || row.contacto || '',
              phone: row.phone || row.telefono || '',
              email: row.email || row.correo || '',
              address: row.address || row.direccion || '',
              channelType: mapSpanishToChannelType(
                row.channelType || row.canal || 'tradicional'
              ),
              conserverProductivity: parseInt(row.conserverProductivity || row.productividad || '0'),
              status: statusValue,
            };
          });
          
          resolve(importedClients);
        } catch (error) {
          reject(new Error('Error al procesar el archivo CSV'));
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Utility functions for mapping between Spanish and English channel types
const mapChannelTypeToSpanish = (channelType: string): string => {
  const mapping: Record<string, string> = {
    'tradicional': 'Tradicional',
    'moderno': 'Moderno', 
    'industrial': 'Industrial'
  };
  return mapping[channelType] || 'Tradicional';
};

const mapSpanishToChannelType = (spanishType: string): 'tradicional' | 'moderno' | 'industrial' => {
  const mapping: Record<string, 'tradicional' | 'moderno' | 'industrial'> = {
    'Tradicional': 'tradicional',
    'tradicional': 'tradicional',
    'Moderno': 'moderno',
    'moderno': 'moderno',
    'Industrial': 'industrial',
    'industrial': 'industrial'
  };
  return mapping[spanishType] || 'tradicional';
};
