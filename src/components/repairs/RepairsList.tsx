
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

interface Repair {
  id: string;
  asset_id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  technician: string | null;
  cost: number | null;
  estimated_completion: string | null;
  created_at: string;
}

interface RepairsListProps {
  repairs: Repair[];
}

const statusLabels = {
  pending: { label: 'Pendiente', class: 'bg-yellow-500' },
  in_progress: { label: 'En Progreso', class: 'bg-blue-500' },
  completed: { label: 'Completado', class: 'bg-green-500' },
  cancelled: { label: 'Cancelado', class: 'bg-red-500' },
};

const RepairsList = ({ repairs }: RepairsListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Técnico</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Costo</TableHead>
            <TableHead>Fecha Estimada</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell>
                {format(new Date(repair.created_at), 'dd/MM/yyyy')}
              </TableCell>
              <TableCell>{repair.description}</TableCell>
              <TableCell>{repair.technician || '-'}</TableCell>
              <TableCell>
                <Badge className={statusLabels[repair.status].class}>
                  {statusLabels[repair.status].label}
                </Badge>
              </TableCell>
              <TableCell>
                {repair.cost ? `$${repair.cost.toFixed(2)}` : '-'}
              </TableCell>
              <TableCell>
                {repair.estimated_completion
                  ? format(new Date(repair.estimated_completion), 'PPP', { locale: es })
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
          {repairs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
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
