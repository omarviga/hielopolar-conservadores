
import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";

interface NewEventProps {
  onClose: () => void;
}

const NewEvent: React.FC<NewEventProps> = ({ onClose }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    type: "maintenance",
    client: "",
    startTime: "09:00",
    endTime: "10:00",
  });

  const handleChange = (field: string, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí iría la lógica para guardar el evento
    console.log("Evento a crear:", { ...eventData, date });
    
    // Cerrar el formulario
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Evento</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Evento</Label>
              <Input 
                id="title"
                value={eventData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Ingrese un título para el evento"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Evento</Label>
              <Select 
                value={eventData.type} 
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  <SelectItem value="repair">Reparación</SelectItem>
                  <SelectItem value="installation">Instalación</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Input 
                id="client"
                value={eventData.client}
                onChange={(e) => handleChange("client", e.target.value)}
                placeholder="Seleccione o ingrese cliente"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: es }) : <span>Seleccione fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Hora Inicio</Label>
                  <div className="flex w-full items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="startTime"
                      type="time"
                      value={eventData.startTime}
                      onChange={(e) => handleChange("startTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">Hora Fin</Label>
                  <div className="flex w-full items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="endTime"
                      type="time"
                      value={eventData.endTime}
                      onChange={(e) => handleChange("endTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea 
                id="description"
                value={eventData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Agregue detalles sobre el evento"
                rows={5}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Guardar Evento</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewEvent;
