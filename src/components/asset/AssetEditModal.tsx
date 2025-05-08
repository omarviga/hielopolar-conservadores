
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Asset } from '@/types/Asset';
import EditAssetForm from '../forms/EditAssetForm';

interface AssetEditModalProps {
  asset: Asset;
  onSubmit: (updatedAsset: Partial<Asset>) => void;
  onCancel: () => void;
}

const AssetEditModal: React.FC<AssetEditModalProps> = ({ asset, onSubmit, onCancel }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex justify-between items-center">
          <span>Editar Conservador</span>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogTitle>
      </DialogHeader>
      
      <EditAssetForm 
        asset={asset} 
        onSubmit={onSubmit} 
        onCancel={onCancel}
      />
    </DialogContent>
  );
};

export default AssetEditModal;
