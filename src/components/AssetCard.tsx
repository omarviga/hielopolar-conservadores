
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Asset } from '@/types/Asset';
import AssetSummary from './asset/AssetSummary';
import AssetDetailsModal from './asset/AssetDetailsModal';
import AssetEditModal from './asset/AssetEditModal';

interface AssetCardProps {
  asset: Asset;
  onUpdate?: (id: string, updates: Partial<Asset>) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onUpdate }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const handleManage = () => {
    toast({
      title: "Gestión de conservador",
      description: `Iniciando gestión para ${asset.model} (${asset.id})`,
      variant: "default",
    });
  };

  const handleEdit = () => {
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  const handleUpdateAsset = (updatedAsset: Partial<Asset>) => {
    if (onUpdate) {
      onUpdate(asset.id, updatedAsset);
      setShowEditModal(false);
      toast({
        title: "Conservador actualizado",
        description: `${asset.model} (${asset.id}) ha sido actualizado correctamente`,
        variant: "default",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden card-hover">
      <AssetSummary asset={asset} />
      
      <div className="p-4 pt-0 mt-4 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => setShowDetailsModal(true)}
        >
          Ver Detalles
        </Button>
        <Button 
          size="sm" 
          className="flex-1 bg-polar-600 hover:bg-polar-700"
          onClick={handleManage}
        >
          Gestionar
        </Button>
      </div>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <AssetDetailsModal 
          asset={asset} 
          onEdit={handleEdit}
          onManage={handleManage}
        />
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <AssetEditModal 
          asset={asset} 
          onSubmit={handleUpdateAsset} 
          onCancel={() => setShowEditModal(false)}
        />
      </Dialog>
    </div>
  );
};

export default AssetCard;
