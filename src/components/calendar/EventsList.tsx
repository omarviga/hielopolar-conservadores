
import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EventsList: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  
  // Datos de ejemplo para eventos
  const events = [
    { 
      id: 1, 
      title: "Mantenimiento Preventivo", 
      date: new Date(2025, 4, 8, 10, 30), 
      client: "Supermercados ABC",
      type: "maintenance",
      status: "scheduled"
    },
    { 
      id: 2, 
      title: "Reparación Conservadora", 
      date: new Date(2025, 4, 10, 14, 0), 
      client: "Restaurant XYZ",
      type: "repair",
      status: "in-progress"
    },
    { 
      id: 3, 
      title: "Instalación de Equipo", 
      date: new Date(2025, 4, 15, 9, 0), 
      client: "Hotel Panorama",
      type: "installation",
      status: "completed"
    },
    { 
      id: 4, 
      title: "Mantenimiento Trimestral", 
      date: new Date(2025, 4, 18, 11, 0), 
      client: "Cafetería Central",
      type: "maintenance",
      status: "scheduled"
    },
    { 
      id: 5, 
      title: "Reparación Urgente", 
      date: new Date(2025, 4, 20, 16, 30), 
      client: "Panadería San Juan",
      type: "repair",
      status: "scheduled"
    },
  ];

  // Filtrar eventos
  const filteredEvents = events.filter(event => {
    // Filtrar por tipo
    if (filter !== "all" && event.type !== filter) {
      return false;
    }
    
    // Filtrar por búsqueda
    if (search && !event.title.toLowerCase().includes(search.toLowerCase()) && 
        !event.client.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Ordenar eventos por fecha (más próximos primero)
  const sortedEvents = [...filteredEvents].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="w-full sm:w-1/3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="maintenance">Mantenimiento</SelectItem>
              <SelectItem value="repair">Reparación</SelectItem>
              <SelectItem value="installation">Instalación</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Buscar por título o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" onClick={() => setSearch("")}>
            Limpiar
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg">
        <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[2fr_2fr_1fr_auto] gap-4 p-3 font-medium border-b bg-muted/50">
          <div>Evento</div>
          <div className="hidden sm:block">Cliente</div>
          <div>Fecha</div>
          <div>Acciones</div>
        </div>
        
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <div 
              key={event.id} 
              className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[2fr_2fr_1fr_auto] gap-4 p-3 border-b last:border-b-0 hover:bg-muted/50"
            >
              <div className="font-medium">
                <div>{event.title}</div>
                <div className="text-sm text-muted-foreground sm:hidden">{event.client}</div>
              </div>
              <div className="hidden sm:block">{event.client}</div>
              <div className="text-sm">
                {format(event.date, "d MMM", { locale: es })}
                <span className="block text-muted-foreground">
                  {format(event.date, "HH:mm")}
                </span>
              </div>
              <div>
                <Button variant="outline" size="sm">Ver</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No se encontraron eventos que coincidan con los filtros.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;
