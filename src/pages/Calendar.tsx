
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Wrench, Box, AlertTriangle } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

type EventType = 'maintenance' | 'inspection' | 'repair' | 'rental' | 'emergency';

interface CalendarEvent {
  id: string;
  title: string;
  client: string;
  asset?: string;
  date: Date;
  endDate?: Date;
  type: EventType;
  technician?: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  rentalUnits?: number;
}

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Eventos de ejemplo incluyendo alquileres
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Mantenimiento preventivo',
      client: 'Pescados Norte',
      asset: 'Conservador #101',
      date: new Date(),
      type: 'maintenance',
      technician: 'Carlos Méndez',
      description: 'Mantenimiento preventivo programado para el conservador principal.',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Alquiler para Festival Local',
      client: 'Organizadores Festival del Mar',
      date: addDays(new Date(), 1),
      endDate: addDays(new Date(), 3),
      type: 'rental',
      description: 'Alquiler de conservadores para festival gastronómico.',
      rentalUnits: 3,
      status: 'pending'
    },
    {
      id: '3',
      title: 'Reparación urgente',
      client: 'Hielos Centro',
      asset: 'Conservador #107',
      date: addDays(new Date(), 2),
      type: 'emergency',
      technician: 'Pedro Soto',
      description: 'Falla en sistema de refrigeración - Prioridad Alta',
      status: 'in-progress'
    }
  ];

  // Obtener los eventos del día seleccionado
  const selectedDateEvents = date ? events.filter(
    event => {
      const eventDate = format(event.date, 'yyyy-MM-dd');
      const selectedDate = format(date, 'yyyy-MM-dd');
      
      // Para eventos con fecha de finalización, mostrar si la fecha seleccionada está en el rango
      if (event.endDate) {
        const endDate = format(event.endDate, 'yyyy-MM-dd');
        return selectedDate >= eventDate && selectedDate <= endDate;
      }
      
      return eventDate === selectedDate;
    }
  ) : [];

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const getEventIcon = (type: EventType) => {
    switch (type) {
      case 'maintenance':
        return <Wrench className="h-4 w-4 text-blue-500" />;
      case 'rental':
        return <Box className="h-4 w-4 text-green-500" />;
      case 'emergency':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  const getEventColor = (type: EventType) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-500';
      case 'rental':
        return 'bg-green-500';
      case 'emergency':
        return 'bg-red-500';
      case 'inspection':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleNewEvent = () => {
    toast({
      title: "Función en desarrollo",
      description: "La creación de nuevos eventos estará disponible próximamente."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-polar-600" />
          <h2 className="text-2xl font-bold">Calendario</h2>
        </div>
        
        <Button onClick={handleNewEvent} className="bg-polar-600 hover:bg-polar-700">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Nuevo evento
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={es}
              classNames={{
                day_today: "bg-polar-100 text-polar-900 font-bold",
                day_selected: "bg-polar-600 text-white",
              }}
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {date && format(date, "EEEE d 'de' MMMM, yyyy", { locale: es })}
            </h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setDate(date ? addDays(date, -1) : undefined)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setDate(new Date())}
              >
                <CalendarIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setDate(date ? addDays(date, 1) : undefined)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map(event => (
                <Card 
                  key={event.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleEventClick(event)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-2 self-stretch rounded-full ${getEventColor(event.type)}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {getEventIcon(event.type)}
                        <h4 className="font-medium">{event.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.client} {event.asset && `- ${event.asset}`}
                      </p>
                      {event.type === 'rental' && event.rentalUnits && (
                        <p className="text-sm text-emerald-600 mt-1">
                          Unidades en alquiler: {event.rentalUnits}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{format(event.date, 'HH:mm')}</span>
                        {event.endDate && (
                          <>
                            <span>-</span>
                            <span>{format(event.endDate, 'dd/MM/yyyy')}</span>
                          </>
                        )}
                        {event.technician && (
                          <>
                            <span>|</span>
                            <span>{event.technician}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
              <CalendarIcon className="h-12 w-12 text-gray-300 mb-2" />
              <h3 className="text-lg font-medium text-gray-700">No hay eventos programados</h3>
              <p className="text-gray-500">No hay eventos programados para este día.</p>
              <Button onClick={handleNewEvent} className="mt-4 bg-polar-600 hover:bg-polar-700">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Programar evento
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getEventIcon(selectedEvent.type)}
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription>
                  {format(selectedEvent.date, "EEEE d 'de' MMMM, yyyy", { locale: es })}
                  {selectedEvent.endDate && (
                    <span> - {format(selectedEvent.endDate, "EEEE d 'de' MMMM, yyyy", { locale: es })}</span>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Cliente</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.client}</p>
                  </div>
                  {selectedEvent.asset && (
                    <div>
                      <p className="text-sm font-medium">Equipo</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.asset}</p>
                    </div>
                  )}
                  {selectedEvent.type === 'rental' && selectedEvent.rentalUnits && (
                    <div>
                      <p className="text-sm font-medium">Unidades en alquiler</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.rentalUnits}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">Estado</p>
                    <p className="text-sm text-muted-foreground capitalize">{selectedEvent.status || 'Pendiente'}</p>
                  </div>
                  {selectedEvent.technician && (
                    <div>
                      <p className="text-sm font-medium">Técnico</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.technician}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">Descripción</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                  Cerrar
                </Button>
                <Button className="bg-polar-600 hover:bg-polar-700">
                  Editar evento
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
