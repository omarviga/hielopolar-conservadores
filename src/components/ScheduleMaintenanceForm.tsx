
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  date: z.date({
    required_error: "La fecha es requerida",
  }),
  type: z.string({
    required_error: "El tipo de mantenimiento es requerido",
  }),
  technician: z.string().min(1, "El técnico es requerido"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export interface MaintenanceFormData extends FormValues {
  assetId: string;
  assetModel: string;
  date: Date;
}

interface ScheduleMaintenanceFormProps {
  assetId: string;
  assetModel: string;
  onComplete: (data?: MaintenanceFormData) => void;
}

const ScheduleMaintenanceForm: React.FC<ScheduleMaintenanceFormProps> = ({ 
  assetId, 
  assetModel,
  onComplete 
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      type: 'preventive',
      technician: '',
      notes: '',
    }
  });
  
  const onSubmit = (data: FormValues) => {
    // Create the maintenance data object with proper typing
    const maintenanceData: MaintenanceFormData = {
      assetId,
      assetModel,
      date: data.date,
      type: data.type,
      technician: data.technician,
      notes: data.notes || '',
    };
    
    // Enviar los datos al componente padre
    onComplete(maintenanceData);
    
    // Mostrar toast de confirmación
    toast({
      title: "Mantenimiento programado",
      description: `Se ha programado mantenimiento para ${assetModel} el ${format(data.date, 'PP', { locale: es })}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <div className="p-3 bg-muted/50 rounded-md mb-4">
          <p className="font-medium">Conservador: {assetModel}</p>
          <p className="text-sm text-muted-foreground">ID: {assetId}</p>
        </div>
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className="w-full pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(field.value, "PP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    locale={es}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Mantenimiento</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="preventive">Preventivo</SelectItem>
                  <SelectItem value="corrective">Correctivo</SelectItem>
                  <SelectItem value="inspection">Inspección</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="technician"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Técnico Asignado</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del técnico" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas (opcional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ingresa notas adicionales o instrucciones para el mantenimiento" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-4 flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => onComplete()}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-polar-600 hover:bg-polar-700">
            Programar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ScheduleMaintenanceForm;
