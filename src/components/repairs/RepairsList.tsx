
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Repair } from '@/types/repairs';

interface RepairsListProps {
  repairs: Repair[];
  onEdit?: (repair: Repair) => void;
}

const statusLabels = {
  pending: { label: 'Pendiente', class: 'bg-yellow-500' },
  in_progress: { label: 'En Progreso', class: 'bg-blue-500' },
  completed: { label: 'Completado', class: 'bg-green-500' },
  cancelled: { label: 'Cancelado', class: 'bg-red-500' },
};

const priorityLabels = {
  low: { label: 'Baja', class: 'bg-green-500' },
  medium: { label: 'Media', class: 'bg-yellow-500' },
  high: { label: 'Alta', class: 'bg-orange-500' },
  urgent: { label: 'Urgente', class: 'bg-red-500' },
};

const RepairsList: React.FC<RepairsListProps> = ({ repairs, onEdit }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Reparación</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Técnico</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Estimada</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell>{repair.repair_number || repair.order_number || '-'}</TableCell>
              <TableCell>
                {format(new Date(repair.created_at), 'dd/MM/yyyy')}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {repair.repair_type === 'corrective' ? 'Correctiva' : 'Preventiva'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={priorityLabels[repair.priority].class}>
                  {priorityLabels[repair.priority].label}
                </Badge>
              </TableCell>
              <TableCell>{repair.problem_description || repair.description}</TableCell>
              <TableCell>{repair.assigned_to || '-'}</TableCell>
              <TableCell>
                <Badge className={statusLabels[repair.status].class}>
                  {statusLabels[repair.status].label}
                </Badge>
              </TableCell>
              <TableCell>
                {repair.estimated_completion
                  ? format(new Date(repair.estimated_completion), 'PPP', { locale: es })
                  : '-'}
              </TableCell>
              <TableCell>
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(repair)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {repairs.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                No hay reparaciones registradas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RepairsList;
