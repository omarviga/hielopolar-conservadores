
import { Asset } from '@/components/AssetCard';
import { saveToLocalStorage } from '@/utils/localStorage';
import { ASSETS_STORAGE_KEY } from '@/data/mockAssets';

/**
 * Service for handling asset operations
 */

/**
 * Generate a unique ID for a new asset based on existing assets
 */
export const generateUniqueAssetId = (assets: Asset[]): string => {
  const existingIds = assets.map(asset => asset.id);
  let newId = '';
  let counter = assets.length + 1;
  
  do {
    newId = `CON-${String(counter).padStart(3, '0')}`;
    counter++;
  } while (existingIds.includes(newId));
  
  return newId;
};

/**
 * Save assets to localStorage
 */
export const saveAssets = (assets: Asset[]): boolean => {
  return saveToLocalStorage(ASSETS_STORAGE_KEY, assets);
};
