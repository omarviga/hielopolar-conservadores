
import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarViewProps {
  view: 'month' | 'week';
}

const CalendarView: React.FC<CalendarViewProps> = ({ view }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setSelectedDate(newDate);
    }
  };

  const today = new Date();
  
  const goToToday = () => {
    setDate(today);
    setSelectedDate(today);
  };

  const events = [
    { id: 1, title: "Mantenimiento #1234", date: new Date(2025, 4, 8) },
    { id: 2, title: "Reparación #5678", date: new Date(2025, 4, 10) },
    { id: 3, title: "Instalación #9012", date: new Date(2025, 4, 15) },
  ];

  // Find events for the selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {format(date, view === 'month' ? 'MMMM yyyy' : "'Semana del' d 'de' MMMM yyyy", { locale: es })}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToToday}>
            Hoy
          </Button>
          <Button variant="outline" size="icon" onClick={() => setDate(prev => {
            const newDate = new Date(prev);
            if (view === 'month') {
              newDate.setMonth(newDate.getMonth() - 1);
            } else {
              newDate.setDate(newDate.getDate() - 7);
            }
            return newDate;
          })}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setDate(prev => {
            const newDate = new Date(prev);
            if (view === 'month') {
              newDate.setMonth(newDate.getMonth() + 1);
            } else {
              newDate.setDate(newDate.getDate() + 7);
            }
            return newDate;
          })}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            month={date}
            onMonthChange={setDate}
            className="rounded-md border shadow"
            showOutsideDays={true}
          />
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">
                {selectedDate ? format(selectedDate, 'EEEE, d MMMM yyyy', { locale: es }) : 'Seleccione una fecha'}
              </h3>
              
              {selectedDateEvents.length > 0 ? (
                <ul className="space-y-2">
                  {selectedDateEvents.map(event => (
                    <li key={event.id} className="p-2 border rounded hover:bg-muted cursor-pointer">
                      {event.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No hay eventos para esta fecha.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
