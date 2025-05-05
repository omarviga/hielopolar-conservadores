
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, AlertCircle, Calendar, Clock } from "lucide-react";

// Tipo para el estado del mantenimiento
type MaintenanceStatus = 'scheduled' | 'in-progress' | 'completed';

// Propiedades del componente
interface ActiveMaintenancesProps {
  status: MaintenanceStatus;
}

// Mock data para mantenimientos
const mockMaintenanceData = [
  {
    id: '1',
    title: 'Mantenimiento preventivo',
    client: 'Supermercado Norte',
    asset: 'Conservador #A789',
    date: new Date(2025, 4, 8),
    technician: 'Carlos Rodríguez',
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Mantenimiento rutinario',
    client: 'Heladería Polar',
    asset: 'Conservador #B456',
    date: new Date(2025, 4, 12),
    technician: 'Ana Martínez',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Mantenimiento de emergencia',
    client: 'Restaurante La Mesa',
    asset: 'Conservador #C123',
    date: new Date(2025, 4, 15),
    technician: 'Juan López',
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Mantenimiento trimestral',
    client: 'Tienda de Conveniencia 24/7',
    asset: 'Conservador #D234',
    date: new Date(2025, 4, 20),
    technician: 'María González',
    status: 'in-progress'
  },
  {
    id: '5',
    title: 'Mantenimiento anual',
    client: 'Hotel Glaciar',
    asset: 'Conservador #E567',
    date: new Date(2025, 4, 4),
    technician: 'Roberto Fernández',
    status: 'completed'
  },
  {
    id: '6',
    title: 'Revisión sistema enfriamiento',
    client: 'Farmacia Central',
    asset: 'Conservador #F890',
    date: new Date(2025, 4, 5),
    technician: 'Laura Pérez',
    status: 'completed'
  }
];

const ActiveMaintenances: React.FC<ActiveMaintenancesProps> = ({ status }) => {
  // Filtrar mantenimientos según el estado seleccionado
  const filteredMaintenances = mockMaintenanceData.filter(maintenance => 
    maintenance.status === status
  );

  // Función para renderizar insignia de estado
  const renderStatusBadge = (status: MaintenanceStatus) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Programado</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800">En Progreso</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completado</Badge>;
    }
  };

  // Funciones para manejar acciones (simuladas)
  const handleEdit = (id: string) => {
    console.log(`Editar mantenimiento ${id}`);
  };

  const handleComplete = (id: string) => {
    console.log(`Completar mantenimiento ${id}`);
  };

  const handleReschedule = (id: string) => {
    console.log(`Reprogramar mantenimiento ${id}`);
  };

  return (
    <div className="w-full">
      {filteredMaintenances.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No hay mantenimientos {
            status === 'scheduled' ? 'programados' : 
            status === 'in-progress' ? 'en progreso' : 'completados'
          }</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {status === 'scheduled' 
              ? 'No hay mantenimientos programados en este momento.' 
              : status === 'in-progress' 
              ? 'No hay mantenimientos en progreso en este momento.' 
              : 'No hay mantenimientos completados para mostrar.'}
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Conservador</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaintenances.map((maintenance) => (
                <TableRow key={maintenance.id}>
                  <TableCell className="font-medium">{maintenance.title}</TableCell>
                  <TableCell>{maintenance.client}</TableCell>
                  <TableCell>{maintenance.asset}</TableCell>
                  <TableCell>{maintenance.date.toLocaleDateString()}</TableCell>
                  <TableCell>{maintenance.technician}</TableCell>
                  <TableCell>{renderStatusBadge(maintenance.status as MaintenanceStatus)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(maintenance.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      {maintenance.status !== 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600" 
                          onClick={() => handleComplete(maintenance.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {maintenance.status !== 'in-progress' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-amber-600" 
                          onClick={() => handleReschedule(maintenance.id)}
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ActiveMaintenances;
