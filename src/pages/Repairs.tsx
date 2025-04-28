import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import RepairForm from '@/components/repairs/RepairForm';
import RepairsList from '@/components/repairs/RepairsList';
import { useRepairs } from '@/hooks/useRepairs';
import { Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RepairStatus } from '@/types/repair'; // Asumiendo que tienes este tipo definido

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
  status?: RepairStatus;
}

const Repairs = () => {
  const location = useLocation();
  const assetId = location.state?.assetId;
  const { repairs, isLoading, createRepair, error } = useRepairs(assetId);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = React.useState<RepairStatus | 'all'>('all');

  const handleSubmit = async (data: FormattedRepairData) => {
    if (!assetId) {
      toast({
        title: 'Error',
        description: 'No se ha seleccionado un activo para la reparación',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createRepair({
        asset_id: assetId,
        status: 'pending', // Estado por defecto
        ...data,
      });

      setIsFormOpen(false);
      toast({
        title: 'Éxito',
        description: 'Reparación creada correctamente',
      });
    } catch (error) {
      console.error('Error al crear la reparación:', error);
      toast({
        title: 'Error',
        description: 'No se pudo crear la reparación',
        variant: 'destructive',
      });
    }
  };

  const filteredRepairs = statusFilter === 'all'
    ? repairs
    : repairs.filter(repair => repair.status === statusFilter);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reparaciones</h1>
        <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
          <SheetTrigger asChild>
            <Button disabled={!assetId}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Reparación
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
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

      {/* Filtros de estado */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('all')}
        >
          Todas
        </Button>
        <Button
          variant={statusFilter === 'pending' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('pending')}
        >
          Pendientes
        </Button>
        <Button
          variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('in_progress')}
        >
          En Progreso
        </Button>
        <Button
          variant={statusFilter === 'completed' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('completed')}
        >
          Completadas
        </Button>
      </div>

      <div className="mt-6">
        {isLoading && !repairs.length ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center p-8 border rounded-md bg-red-50 text-red-500">
            Error al cargar las reparaciones: {error.message}
          </div>
        ) : assetId ? (
          <>
            {filteredRepairs.length === 0 ? (
              <div className="text-center p-8 border rounded-md bg-gray-50">
                No hay reparaciones registradas para este activo.
              </div>
            ) : (
              <RepairsList repairs={filteredRepairs} />
            )}
          </>
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