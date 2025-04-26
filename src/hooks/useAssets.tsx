
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Asset } from '@/components/AssetCard';
import { fetchAssets, transformDatabaseAsset } from './assets/assetService';
import { useAssetMutations } from './assets/mutations';
import { AssetHookReturn } from './assets/types';

export const useAssets = (): AssetHookReturn => {
  const queryClient = useQueryClient();
  const { addAssetMutation, updateAssetMutation, deleteAssetMutation } = useAssetMutations(queryClient);

  const { data: assets = [], isLoading, error } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    retry: 1,
  });

  const transformedAssets = assets.map(transformDatabaseAsset);

  return {
    assets: transformedAssets,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    addAsset: (asset: Asset) => addAssetMutation.mutate(asset),
    updateAsset: (id: string, updates: Partial<Asset>) => updateAssetMutation.mutate({ id, ...updates }),
    deleteAsset: (id: string) => deleteAssetMutation.mutate(id)
  };
};

