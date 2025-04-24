
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventCard } from './EventCard';
import { CalendarEvent } from '@/types/calendar';

interface EventListProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onNewEvent: () => void;
}

export const EventList: React.FC<EventListProps> = ({ events, onEventClick, onNewEvent }) => {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
        <CalendarIcon className="h-12 w-12 text-gray-300 mb-2" />
        <h3 className="text-lg font-medium text-gray-700">No hay eventos programados</h3>
        <p className="text-gray-500">No hay eventos programados para este día.</p>
        <Button onClick={onNewEvent} className="mt-4 bg-polar-600 hover:bg-polar-700">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Programar evento
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
          onClick={onEventClick} 
        />
      ))}
    </div>
  );
};
