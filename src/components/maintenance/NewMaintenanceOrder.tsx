
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface NewMaintenanceOrderProps {
  onClose: () => void;
}

const NewMaintenanceOrder: React.FC<NewMaintenanceOrderProps> = ({ onClose }) => {
  // Estado para el formulario
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    asset: '',
    type: '',
    date: new Date(),
    technician: '',
    notes: '',
  });
  
  // Estados para campos seleccionados
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Datos de ejemplo para selecciones
  const clients = [
    { id: 'client1', name: 'Supermercado Norte' },
    { id: 'client2', name: 'Heladería Polar' },
    { id: 'client3', name: 'Restaurante La Mesa' },
    { id: 'client4', name: 'Tienda de Conveniencia 24/7' },
    { id: 'client5', name: 'Hotel Glaciar' },
    { id: 'client6', name: 'Farmacia Central' },
  ];

  const assets = [
    { id: 'asset1', name: 'Conservador #A789' },
    { id: 'asset2', name: 'Conservador #B456' },
    { id: 'asset3', name: 'Conservador #C123' },
    { id: 'asset4', name: 'Conservador #D234' },
    { id: 'asset5', name: 'Conservador #E567' },
    { id: 'asset6', name: 'Conservador #F890' },
  ];

  const maintenanceTypes = [
    { id: 'type1', name: 'Preventivo' },
    { id: 'type2', name: 'Correctivo' },
    { id: 'type3', name: 'Emergencia' },
    { id: 'type4', name: 'Rutinario' },
  ];

  const technicians = [
    { id: 'tech1', name: 'Carlos Rodríguez' },
    { id: 'tech2', name: 'Ana Martínez' },
    { id: 'tech3', name: 'Juan López' },
    { id: 'tech4', name: 'María González' },
    { id: 'tech5', name: 'Roberto Fernández' },
    { id: 'tech6', name: 'Laura Pérez' },
  ];

  // Manejador para cambios en los campos del formulario
  const handleInputChange = (field: string, value: string | Date) => {
    setFormData({
      ...formData,
      [field]: value
    });

    // Si es la fecha, actualizar también el estado de la fecha
    if (field === 'date' && value instanceof Date) {
      setDate(value);
    }
  };

  // Avanzar al siguiente paso
  const handleNextStep = () => {
    if (step === 1) {
      // Validar campos del primer paso
      if (!formData.client || !formData.asset || !formData.type) {
        toast.error('Por favor complete todos los campos requeridos.');
        return;
      }
      setStep(2);
    }
  };

  // Retroceder al paso anterior
  const handlePreviousStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos del segundo paso
    if (!formData.title || !formData.date || !formData.technician) {
      toast.error('Por favor complete todos los campos requeridos.');
      return;
    }

    // Simulación del envío exitoso
    console.log('Enviando datos de mantenimiento:', formData);
    toast.success('Orden de mantenimiento creada correctamente.');
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? 'Nueva Orden de Mantenimiento' : 'Detalles del Mantenimiento'}
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? 'Seleccione el cliente y el conservador para programar el mantenimiento.' 
              : 'Complete los detalles y asigne el mantenimiento.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Cliente
                </Label>
                <div className="col-span-3">
                  <Select 
                    value={formData.client} 
                    onValueChange={(value) => handleInputChange('client', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="asset" className="text-right">
                  Conservador
                </Label>
                <div className="col-span-3">
                  <Select 
                    value={formData.asset} 
                    onValueChange={(value) => handleInputChange('asset', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar conservador" />
                    </SelectTrigger>
                    <SelectContent>
                      {assets.map(asset => (
                        <SelectItem key={asset.id} value={asset.id}>
                          {asset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <div className="col-span-3">
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleInputChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {maintenanceTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Fecha</Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                          if (newDate) {
                            setDate(newDate);
                            handleInputChange('date', newDate);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="technician" className="text-right">
                  Técnico
                </Label>
                <div className="col-span-3">
                  <Select 
                    value={formData.technician} 
                    onValueChange={(value) => handleInputChange('technician', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Asignar técnico" />
                    </SelectTrigger>
                    <SelectContent>
                      {technicians.map(tech => (
                        <SelectItem key={tech.id} value={tech.id}>
                          {tech.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notas
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="col-span-3"
                  placeholder="Instrucciones o notas adicionales..."
                />
              </div>
            </div>
          )}

          <DialogFooter>
            {step === 1 ? (
              <Button type="button" onClick={handleNextStep}>
                Continuar
              </Button>
            ) : (
              <div className="flex gap-2 justify-end w-full">
                <Button type="button" variant="outline" onClick={handlePreviousStep}>
                  Anterior
                </Button>
                <Button type="submit">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Crear Orden
                </Button>
              </div>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewMaintenanceOrder;
