
// Esta implementación está mantenida por compatibilidad con funciones existentes
// Pero ahora utilizamos Supabase para todo el manejo de datos

import { Asset } from '@/components/AssetCard';
import { saveToLocalStorage } from '../utils/localStorage';
import { ASSETS_STORAGE_KEY } from '../data/mockAssets';

// Generar un ID único para un conservador
export const generateUniqueAssetId = (assets: Asset[]): string => {
  const lastId = assets.length > 0 
    ? parseInt(assets[assets.length - 1].id.replace('CON-', '')) 
    : 0;
  
  return `CON-${String(lastId + 1).padStart(3, '0')}`;
};

// Guardar assets en localStorage (mantenido por compatibilidad)
export const saveAssets = (assets: Asset[]): void => {
  saveToLocalStorage(ASSETS_STORAGE_KEY, assets);
};
