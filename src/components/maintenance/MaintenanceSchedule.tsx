
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Wrench, CheckCircle } from "lucide-react";

// Mock data for maintenance events
const mockMaintenanceEvents = [
  {
    id: '1',
    title: 'Mantenimiento preventivo',
    client: 'Supermercado Norte',
    asset: 'Conservador #A789',
    date: new Date(2025, 4, 8),
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Mantenimiento rutinario',
    client: 'Heladería Polar',
    asset: 'Conservador #B456',
    date: new Date(2025, 4, 12),
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Mantenimiento de emergencia',
    client: 'Restaurante La Mesa',
    asset: 'Conservador #C123',
    date: new Date(2025, 4, 15),
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Mantenimiento trimestral',
    client: 'Tienda de Conveniencia 24/7',
    asset: 'Conservador #D234',
    date: new Date(2025, 4, 20),
    status: 'scheduled'
  },
  {
    id: '5',
    title: 'Mantenimiento anual',
    client: 'Hotel Glaciar',
    asset: 'Conservador #E567',
    date: new Date(2025, 4, 4),
    status: 'completed'
  }
];

const MaintenanceSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter events for the selected date
  const eventsForSelectedDate = selectedDate 
    ? mockMaintenanceEvents.filter(event => 
        event.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Calendario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                maintenance: mockMaintenanceEvents.map(event => event.date)
              }}
              modifiersStyles={{
                maintenance: { 
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                  borderRadius: '50%'
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="mr-2 h-5 w-5" />
              {selectedDate ? (
                `Mantenimientos para ${selectedDate.toLocaleDateString()}`
              ) : (
                'Mantenimientos Programados'
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {eventsForSelectedDate.map((event) => (
                  <div key={event.id} className="flex items-center p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">Cliente: {event.client}</p>
                      <p className="text-sm text-muted-foreground">Equipo: {event.asset}</p>
                    </div>
                    <Badge 
                      className={`ml-2 ${
                        event.status === 'completed' ? 'bg-green-500' : 
                        event.status === 'in-progress' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}
                    >
                      {event.status === 'completed' ? 'Completado' : 
                       event.status === 'in-progress' ? 'En Progreso' : 'Programado'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay mantenimientos programados</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedDate ? 'No hay mantenimientos para esta fecha.' : 'Seleccione una fecha para ver los mantenimientos programados.'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceSchedule;
