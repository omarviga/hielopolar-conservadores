
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EventTypeIcon } from './EventTypeIcon';
import { CalendarEvent } from '@/types/calendar';

interface EventDialogProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EventDialog: React.FC<EventDialogProps> = ({ 
  event, 
  isOpen, 
  onOpenChange 
}) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <EventTypeIcon type={event.type} />
            {event.title}
          </DialogTitle>
          <DialogDescription>
            {format(event.date, "EEEE d 'de' MMMM, yyyy", { locale: es })}
            {event.endDate && (
              <span> - {format(event.endDate, "EEEE d 'de' MMMM, yyyy", { locale: es })}</span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Cliente</p>
              <p className="text-sm text-muted-foreground">{event.client}</p>
            </div>
            {event.asset && (
              <div>
                <p className="text-sm font-medium">Equipo</p>
                <p className="text-sm text-muted-foreground">{event.asset}</p>
              </div>
            )}
            {event.type === 'rental' && event.rentalUnits && (
              <div>
                <p className="text-sm font-medium">Unidades en alquiler</p>
                <p className="text-sm text-muted-foreground">{event.rentalUnits}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Estado</p>
              <p className="text-sm text-muted-foreground capitalize">{event.status || 'Pendiente'}</p>
            </div>
            {event.technician && (
              <div>
                <p className="text-sm font-medium">Técnico</p>
                <p className="text-sm text-muted-foreground">{event.technician}</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium">Descripción</p>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-polar-600 hover:bg-polar-700">
            Editar evento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
