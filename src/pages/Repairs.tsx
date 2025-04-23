
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import RepairForm from '@/components/repairs/RepairForm';
import RepairsList from '@/components/repairs/RepairsList';
import { useRepairs } from '@/hooks/useRepairs';
import { Plus } from 'lucide-react';

const Repairs = () => {
  const location = useLocation();
  const assetId = location.state?.assetId;
  const { repairs, isLoading, createRepair } = useRepairs(assetId);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const handleSubmit = async (data: any) => {
    if (!assetId) return;
    
    await createRepair({
      asset_id: assetId,
      ...data,
    });
    
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reparaciones</h1>
        <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Reparación
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Registrar Nueva Reparación</SheetTitle>
            </SheetHeader>
            {assetId && (
              <RepairForm
                assetId={assetId}
                onSubmit={handleSubmit}
              />
            )}
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6">
        <RepairsList repairs={repairs} />
      </div>
    </div>
  );
};

export default Repairs;
