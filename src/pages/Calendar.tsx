import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';
import { CalendarHeader, DayHeader } from '@/components/calendar/CalendarHeader';
import { EventList } from '@/components/calendar/EventList';
import { EventDialog } from '@/components/calendar/EventDialog';
import { CalendarEvent } from '@/types/calendar';

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

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const selectedDateEvents = date ? events.filter(
    event => {
      const eventDate = format(event.date, 'yyyy-MM-dd');
      const selectedDate = format(date, 'yyyy-MM-dd');
      
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

  const handleNewEvent = () => {
    toast({
      title: "Función en desarrollo",
      description: "La creación de nuevos eventos estará disponible próximamente."
    });
  };

  return (
    <div className="space-y-6">
      <CalendarHeader 
        date={date}
        onPrevDay={() => setDate(date ? addDays(date, -1) : undefined)}
        onToday={() => setDate(new Date())}
        onNextDay={() => setDate(date ? addDays(date, 1) : undefined)}
        onNewEvent={handleNewEvent}
      />
      
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
          <DayHeader
            date={date}
            onPrevDay={() => setDate(date ? addDays(date, -1) : undefined)}
            onToday={() => setDate(new Date())}
            onNextDay={() => setDate(date ? addDays(date, 1) : undefined)}
          />

          <EventList
            events={selectedDateEvents}
            onEventClick={handleEventClick}
            onNewEvent={handleNewEvent}
          />
        </div>
      </div>

      <EventDialog
        event={selectedEvent}
        isOpen={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
      />
    </div>
  );
};

export default CalendarPage;
