
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import RepairForm from '@/components/repairs/RepairForm';
import RepairsList from '@/components/repairs/RepairsList';
import { useRepairs } from '@/hooks/useRepairs';
import { Plus } from 'lucide-react';

// This interface defines the data structure expected by the form submission handler
interface FormattedRepairData {
  repair_number?: string;
  description: string;
  diagnosis?: string;
  repair_type?: 'corrective' | 'preventive';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  technician?: string;
  cost?: number;
  estimated_completion?: Date;
  notes?: string;
  parts_used?: string[];
}

const Repairs = () => {
  const location = useLocation();
  const assetId = location.state?.assetId;
  const { repairs, isLoading, addRepair } = useRepairs();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const handleSubmit = async (data: FormattedRepairData) => {
    if (!assetId) {
      console.error('No asset ID provided for repair');
      return;
    }

    try {
      console.log('Submitting repair with data:', { ...data, asset_id: assetId });

      // Create a repair object that matches the expected structure
      const repairData = {
        asset_id: assetId,
        equipment_type: 'conservador', // Default equipment type
        customer_name: 'Cliente', // Default customer name
        problem_description: data.description,
        order_number: data.repair_number || '',
        status: 'pending' as const,
        repair_type: data.repair_type || 'corrective',
        priority: data.priority || 'medium',
        diagnosis: data.diagnosis,
        assigned_to: data.technician,
        estimated_completion: data.estimated_completion?.toISOString() || new Date().toISOString(),
        notes: data.notes,
        parts_used: data.parts_used || []
      };

      await addRepair.mutate(repairData);

      setIsFormOpen(false);
    } catch (error) {
      console.error('Error al crear la reparación:', error);
      // Mostrar un mensaje al usuario (puedes usar un toast o similar)
    }
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
            {assetId ? (
              <RepairForm
                assetId={assetId}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            ) : (
              <div className="p-4 text-center text-red-500">
                No se ha seleccionado un activo para la reparación.
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6">
        {assetId ? (
          <RepairsList repairs={repairs || []} />
        ) : (
          <div className="text-center p-8 border rounded-md bg-gray-50">
            Seleccione un activo para ver sus reparaciones.
          </div>
        )}
      </div>
    </div>
  );
};

export default Repairs;
