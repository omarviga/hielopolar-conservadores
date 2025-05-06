
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CalendarView from '@/components/calendar/CalendarView';
import EventsList from '@/components/calendar/EventsList';
import NewEvent from '@/components/calendar/NewEvent';

const Calendar: React.FC = () => {
  const [showNewEventForm, setShowNewEventForm] = React.useState(false);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendario</h1>
        <Button 
          onClick={() => setShowNewEventForm(true)} 
          className="bg-polar-600 hover:bg-polar-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      <Tabs defaultValue="month-view" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="month-view">Vista Mensual</TabsTrigger>
          <TabsTrigger value="week-view">Vista Semanal</TabsTrigger>
          <TabsTrigger value="events-list">Lista de Eventos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="month-view">
          <Card>
            <CardHeader>
              <CardTitle>Vista Mensual</CardTitle>
              <CardDescription>
                Visualice todos los eventos programados para el mes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView view="month" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="week-view">
          <Card>
            <CardHeader>
              <CardTitle>Vista Semanal</CardTitle>
              <CardDescription>
                Visualice los eventos de la semana en curso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView view="week" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events-list">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Eventos</CardTitle>
              <CardDescription>
                Lista detallada de todos los eventos programados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showNewEventForm && (
        <NewEvent onClose={() => setShowNewEventForm(false)} />
      )}
    </div>
  );
};

export default Calendar;
