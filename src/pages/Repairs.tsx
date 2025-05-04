import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RepairForm from '@/components/repairs/RepairForm';
import RepairsList from '@/components/repairs/RepairsList';
import RepairDetails from '@/components/repairs/RepairDetails';
import { useRepairs } from '@/hooks/useRepairs';
import { Repair } from '@/types/repairs';
import { AlertCircle, Clipboard, ClipboardCheck, CheckCircle2, XCircle } from 'lucide-react';

const Repairs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const assetId = location.state?.assetId;
  const { repairs, isLoading, addRepair, updateRepair } = useRepairs(assetId);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editRepair, setEditRepair] = useState<Repair | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const handleSubmit = async (data: any) => {
    if (!assetId && !editRepair) {
      console.error('No asset ID provided for repair');
      return;
    }

    try {
      if (editRepair) {
        // Update existing repair
        await updateRepair.mutate({
          id: editRepair.id,
          problem_description: data.description,
          diagnosis: data.diagnosis,
          repair_type: data.repair_type,
          priority: data.priority,
          assigned_to: data.technician,
          estimated_completion: data.estimated_completion?.toISOString(),
          notes: data.notes,
          parts_used: data.parts_used,
          order_number: data.repair_number
        });
        setEditRepair(null);
      } else {
        // Create new repair
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
          parts_used: data.parts_used
        };

        await addRepair.mutate(repairData);
      }

      setIsFormOpen(false);
    } catch (error) {
      console.error('Error al procesar la reparación:', error);
    }
  };

  const handleViewRepair = (repair: Repair) => {
    setSelectedRepair(repair);
    setDetailsOpen(true);
  };

  const handleEditRepair = (repair: Repair) => {
    setEditRepair(repair);
    setIsFormOpen(true);
  };

  const filteredRepairs = repairs?.filter(repair => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return repair.status === 'pending';
    if (activeTab === 'in_progress') return repair.status === 'in_progress';
    if (activeTab === 'completed') return repair.status === 'completed';
    return false;
  }) || [];

  const getRepairStats = () => {
    const allRepairs = repairs || [];
    const pending = allRepairs.filter(r => r.status === 'pending').length;
    const inProgress = allRepairs.filter(r => r.status === 'in_progress').length;
    const completed = allRepairs.filter(r => r.status === 'completed').length;
    const cancelled = allRepairs.filter(r => r.status === 'cancelled').length;
    
    return { all: allRepairs.length, pending, inProgress, completed, cancelled };
  };

  const stats = getRepairStats();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reparaciones</h1>
          <p className="text-gray-500">Administra y da seguimiento a reparaciones de equipos</p>
        </div>
        <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nueva Reparación
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full md:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{editRepair ? 'Editar Reparación' : 'Registrar Nueva Reparación'}</SheetTitle>
            </SheetHeader>
            {(!assetId && !editRepair) ? (
              <div className="p-4 text-center text-red-500">
                <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-2" />
                <p>No se ha seleccionado un activo para la reparación.</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => navigate('/assets')}
                >
                  Seleccionar Activo
                </Button>
              </div>
            ) : (
              <RepairForm
                assetId={assetId || ''}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                initialData={editRepair ? {
                  repair_number: editRepair.order_number,
                  description: editRepair.problem_description || editRepair.description || '',
                  diagnosis: editRepair.diagnosis || '',
                  repair_type: editRepair.repair_type,
                  priority: editRepair.priority,
                  technician: editRepair.assigned_to,
                  estimated_completion: editRepair.estimated_completion ? new Date(editRepair.estimated_completion) : undefined,
                  notes: editRepair.notes || '',
                  parts_used: Array.isArray(editRepair.parts_used) ? editRepair.parts_used.join(', ') : editRepair.parts_used || '',
                } : undefined}
              />
            )}
          </SheetContent>
        </Sheet>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clipboard className="h-4 w-4 text-gray-500 mr-2" />
              <p className="text-2xl font-bold">{stats.all}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-500">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-500">En Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ClipboardCheck className="h-4 w-4 text-blue-500 mr-2" />
              <p className="text-2xl font-bold">{stats.inProgress}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-500">Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-500">Canceladas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
              <p className="text-2xl font-bold">{stats.cancelled}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {assetId ? (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Filtrado por Activo</AlertTitle>
          <AlertDescription>
            Mostrando reparaciones para el activo seleccionado. 
            <Button variant="link" onClick={() => navigate('/repairs')}>
              Ver todas las reparaciones
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todas ({stats.all})</TabsTrigger>
          <TabsTrigger value="pending">Pendientes ({stats.pending})</TabsTrigger>
          <TabsTrigger value="in_progress">En Progreso ({stats.inProgress})</TabsTrigger>
          <TabsTrigger value="completed">Completadas ({stats.completed})</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p>Cargando reparaciones...</p>
            </div>
          ) : filteredRepairs.length > 0 ? (
            <RepairsList 
              repairs={filteredRepairs} 
              onEdit={handleEditRepair} 
              onView={handleViewRepair}
            />
          ) : (
            <div className="text-center p-8 border rounded-md bg-gray-50">
              <p className="text-gray-500">No hay reparaciones {activeTab !== 'all' ? `con estado "${activeTab}"` : ''}</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => setIsFormOpen(true)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Crear Nueva Reparación
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Repair Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Reparación</DialogTitle>
          </DialogHeader>
          {selectedRepair && (
            <RepairDetails repair={selectedRepair} />
          )}
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>Cerrar</Button>
            <Button onClick={() => {
              setDetailsOpen(false);
              handleEditRepair(selectedRepair!);
            }}>Editar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Repairs;
