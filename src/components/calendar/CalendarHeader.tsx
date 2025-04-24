
import React from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface CalendarHeaderProps {
  date: Date | undefined;
  onPrevDay: () => void;
  onToday: () => void;
  onNextDay: () => void;
  onNewEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  onPrevDay,
  onToday,
  onNextDay,
  onNewEvent,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-6 w-6 text-polar-600" />
        <h2 className="text-2xl font-bold">Calendario</h2>
      </div>
      <Button onClick={onNewEvent} className="bg-polar-600 hover:bg-polar-700">
        <CalendarIcon className="h-4 w-4 mr-2" />
        Nuevo evento
      </Button>
    </div>
  );
};

export const DayHeader: React.FC<{
  date: Date | undefined;
  onPrevDay: () => void;
  onToday: () => void;
  onNextDay: () => void;
}> = ({ date, onPrevDay, onToday, onNextDay }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">
        {date && format(date, "EEEE d 'de' MMMM, yyyy", { locale: es })}
      </h3>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={onPrevDay}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onToday}>
          <CalendarIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onNextDay}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
