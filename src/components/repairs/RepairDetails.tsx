
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Repair } from '@/types/repairs';

interface RepairDetailsProps {
  repair: Repair;
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

const RepairDetails: React.FC<RepairDetailsProps> = ({ repair }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Reparación #{repair.repair_number || repair.order_number}</CardTitle>
            <Badge className={statusLabels[repair.status].class}>
              {statusLabels[repair.status].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Tipo de Reparación</h3>
              <p>{repair.repair_type === 'corrective' ? 'Correctiva' : 'Preventiva'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Prioridad</h3>
              <Badge className={priorityLabels[repair.priority].class}>
                {priorityLabels[repair.priority].label}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
              <p>{repair.customer_name || '-'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Fecha de Creación</h3>
              <p>{format(new Date(repair.created_at), 'PPP', { locale: es })}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Técnico Asignado</h3>
              <p>{repair.assigned_to || 'No asignado'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Fecha Estimada de Finalización</h3>
              <p>{repair.estimated_completion ? format(new Date(repair.estimated_completion), 'PPP', { locale: es }) : 'No especificada'}</p>
            </div>
            {repair.completed_at && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Fecha de Finalización</h3>
                <p>{format(new Date(repair.completed_at), 'PPP', { locale: es })}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Descripción del Problema</h3>
            <p className="mt-1">{repair.problem_description || repair.description || '-'}</p>
          </div>

          {repair.diagnosis && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Diagnóstico</h3>
              <p className="mt-1">{repair.diagnosis}</p>
            </div>
          )}

          {repair.notes && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Notas Adicionales</h3>
              <p className="mt-1">{repair.notes}</p>
            </div>
          )}

          {repair.parts_used && repair.parts_used.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Repuestos Utilizados</h3>
              <ul className="list-disc list-inside mt-1">
                {typeof repair.parts_used === 'string' ? (
                  <li>{repair.parts_used}</li>
                ) : (
                  repair.parts_used.map((part, index) => (
                    <li key={index}>{part}</li>
                  ))
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RepairDetails;
