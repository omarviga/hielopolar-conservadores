
import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { EventTypeIcon } from './EventTypeIcon';
import { CalendarEvent } from '@/types/calendar';

interface EventCardProps {
  event: CalendarEvent;
  onClick: (event: CalendarEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const getEventColor = (type: CalendarEvent['type']) => {
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

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(event)}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`w-2 self-stretch rounded-full ${getEventColor(event.type)}`} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <EventTypeIcon type={event.type} />
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
  );
};
