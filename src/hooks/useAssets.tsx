
import { useState, useEffect } from 'react';
import { Asset } from '@/components/AssetCard';
import { toast } from '@/hooks/use-toast';

// Datos iniciales para cuando no hay datos guardados en localStorage
const mockAssets: Asset[] = [
  {
    id: 'CON-001',
    model: 'Polar-3000XL',
    serialNumber: 'P3XL-12345',
    status: 'available',
    location: 'Almacén Principal',
    lastMaintenance: '15/03/2023',
    capacity: '500L',
    temperatureRange: '-18°C a -22°C',
    imageSrc: 'https://images.unsplash.com/photo-1562184552-997c461abbe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'CON-002',
    model: 'Polar-1500M',
    serialNumber: 'P15M-67890',
    status: 'in-use',
    location: 'Cliente: Pescados Norte',
    lastMaintenance: '02/05/2023',
    assignedTo: 'Pescados Norte',
    capacity: '250L',
    temperatureRange: '-15°C a -18°C',
    imageSrc: 'https://images.unsplash.com/photo-1596461010617-8549605ab3e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'CON-003',
    model: 'Polar-2000M',
    serialNumber: 'P2M-24680',
    status: 'maintenance',
    location: 'Taller Central',
    lastMaintenance: '10/01/2023',
    capacity: '300L',
    temperatureRange: '-20°C a -25°C',
    imageSrc: 'https://images.unsplash.com/photo-1589096044321-9274646f36fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'CON-004',
    model: 'Polar-1000S',
    serialNumber: 'P1S-13579',
    status: 'available',
    location: 'Almacén Norte',
    lastMaintenance: '20/04/2023',
    capacity: '150L',
    temperatureRange: '-15°C a -18°C',
    imageSrc: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'CON-005',
    model: 'Polar-3500XL',
    serialNumber: 'P35XL-54321',
    status: 'in-use',
    location: 'Cliente: Mariscos Sur',
    lastMaintenance: '05/02/2023',
    assignedTo: 'Mariscos Sur',
    capacity: '600L',
    temperatureRange: '-22°C a -25°C',
    imageSrc: 'https://images.unsplash.com/photo-1595246007497-68ae3d6f44cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'CON-006',
    model: 'Polar-2500L',
    serialNumber: 'P25L-97531',
    status: 'available',
    location: 'Almacén Principal',
    lastMaintenance: '12/03/2023',
    capacity: '400L',
    temperatureRange: '-18°C a -22°C',
    imageSrc: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'CON-007',
    model: 'Polar-1200S',
    serialNumber: 'P12S-86420',
    status: 'maintenance',
    location: 'Taller Norte',
    lastMaintenance: '01/04/2023',
    capacity: '180L',
    temperatureRange: '-15°C a -18°C',
    imageSrc: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'CON-008',
    model: 'Polar-3000XL',
    serialNumber: 'P3XL-65432',
    status: 'in-use',
    location: 'Cliente: Hielos Centro',
    lastMaintenance: '18/02/2023',
    assignedTo: 'Hielos Centro',
    capacity: '500L',
    temperatureRange: '-18°C a -22°C',
    imageSrc: 'https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60'
  }
];

// Clave para LocalStorage
const LOCAL_STORAGE_KEY = 'hielo-polar-assets';

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos al inicio
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        
        // Intentar cargar desde localStorage
        const savedAssets = localStorage.getItem(LOCAL_STORAGE_KEY);
        
        if (savedAssets) {
          // Si hay datos guardados, los usamos
          const parsedAssets = JSON.parse(savedAssets);
          setAssets(parsedAssets);
          console.log('Datos de conservadores cargados desde localStorage:', parsedAssets);
        } else {
          // Si no hay datos guardados, usamos los datos iniciales
          console.log('No hay datos de conservadores en localStorage, usando datos iniciales');
          setAssets(mockAssets);
          // Y los guardamos en localStorage para uso futuro
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockAssets));
        }
        
        setError(null);
      } catch (err) {
        console.error('Error al cargar datos de conservadores:', err);
        setError('Error al cargar los conservadores');
        // En caso de error, intentamos usar los datos iniciales
        setAssets(mockAssets);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Función para guardar en localStorage
  const saveToLocalStorage = (updatedAssets: Asset[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAssets));
      console.log('Guardando conservadores en localStorage:', updatedAssets);
    } catch (err) {
      console.error('Error al guardar conservadores en localStorage:', err);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive"
      });
    }
  };

  // Función para añadir un nuevo conservador
  const addAsset = (asset: Asset) => {
    setAssets(prev => {
      const newAssets = [...prev, asset];
      saveToLocalStorage(newAssets);
      return newAssets;
    });
    
    toast({
      title: "Conservador añadido",
      description: `${asset.model} (${asset.id}) ha sido añadido con éxito.`
    });
  };

  // Función para actualizar un conservador existente
  const updateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets(prev => {
      const newAssets = prev.map(asset => 
        asset.id === id ? { ...asset, ...updates } : asset
      );
      saveToLocalStorage(newAssets);
      return newAssets;
    });
    
    toast({
      title: "Conservador actualizado",
      description: `La información del conservador ${id} ha sido actualizada.`
    });
  };

  // Función para eliminar un conservador
  const deleteAsset = (id: string) => {
    setAssets(prev => {
      const newAssets = prev.filter(asset => asset.id !== id);
      saveToLocalStorage(newAssets);
      return newAssets;
    });
    
    toast({
      title: "Conservador eliminado",
      description: `El conservador ${id} ha sido eliminado de la base de datos.`
    });
  };

  return {
    assets,
    loading,
    error,
    addAsset,
    updateAsset,
    deleteAsset
  };
};
