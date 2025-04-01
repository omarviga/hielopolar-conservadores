
import { useState, useEffect } from 'react';
import { Asset } from '@/components/AssetCard';
import { toast } from '@/hooks/use-toast';
import { loadFromLocalStorage } from '@/utils/localStorage';
import { mockAssets, ASSETS_STORAGE_KEY } from '@/data/mockAssets';
import { generateUniqueAssetId, saveAssets } from '@/services/assetService';

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
        const savedAssets = loadFromLocalStorage<Asset[]>(ASSETS_STORAGE_KEY);
        
        if (savedAssets) {
          // Si hay datos guardados, los usamos
          setAssets(savedAssets);
        } else {
          // Si no hay datos guardados, usamos los datos iniciales
          console.log('No hay datos de conservadores en localStorage, usando datos iniciales');
          setAssets(mockAssets);
          // Y los guardamos en localStorage para uso futuro
          saveAssets(mockAssets);
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

  // Función para añadir un nuevo conservador
  const addAsset = (asset: Asset) => {
    setAssets(prev => {
      const newAssets = [...prev, asset];
      saveAssets(newAssets);
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
      saveAssets(newAssets);
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
      saveAssets(newAssets);
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
