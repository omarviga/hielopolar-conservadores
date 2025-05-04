import { Asset } from '@/components/AssetCard';

export type AssetHookReturn = {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
};

export type FormattedAsset = {
  id: string;
  model: string;
  serial_number: string | null;
  status: string;
  location: string | null;
  last_maintenance: string | null;
  capacity: string | null;
  temperature_range: string | null;
  image_src: string | null;
  coordinates: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
};
