
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarEvent, EventType } from '@/types/calendar';

const eventFormSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  client: z.string().min(1, 'El cliente es requerido'),
  asset: z.string().optional(),
  date: z.string().min(1, 'La fecha es requerida'),
  endDate: z.string().optional(),
  type: z.enum(['maintenance', 'inspection', 'repair', 'rental', 'emergency']),
  technician: z.string().optional(),
  description: z.string().min(1, 'La descripción es requerida'),
  status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']).optional(),
  rentalUnits: z.number().optional(),
});

type EventFormData = z.infer<typeof eventFormSchema>;

interface NewEventFormProps {
  onSubmit: (data: CalendarEvent) => void;
  onCancel: () => void;
}

export const NewEventForm: React.FC<NewEventFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      type: 'maintenance',
      status: 'pending',
    },
  });

  const handleSubmit = (data: EventFormData) => {
    // Create a properly formatted CalendarEvent object with all required fields
    const formattedData: CalendarEvent = {
      id: crypto.randomUUID(),
      title: data.title, // Required field
      client: data.client, // Required field
      asset: data.asset,
      date: new Date(data.date), // Required field
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      type: data.type as EventType, // Required field
      technician: data.technician,
      description: data.description, // Required field
      status: data.status || 'pending', // Required field with default 
      rentalUnits: data.type === 'rental' ? Number(data.rentalUnits) : undefined,
    };
    onSubmit(formattedData);
  };

  const selectedType = form.watch('type');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Evento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de evento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  <SelectItem value="inspection">Inspección</SelectItem>
                  <SelectItem value="repair">Reparación</SelectItem>
                  <SelectItem value="rental">Alquiler</SelectItem>
                  <SelectItem value="emergency">Emergencia</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {['maintenance', 'repair', 'inspection'].includes(selectedType) && (
          <FormField
            control={form.control}
            name="asset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipo</FormLabel>
                <FormControl>
                  <Input placeholder="ID o nombre del equipo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedType === 'rental' && (
          <>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Fin</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rentalUnits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidades en Alquiler</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      {...field}
                      onChange={e => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {['maintenance', 'repair'].includes(selectedType) && (
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
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descripción detallada del evento"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Crear Evento
          </Button>
        </div>
      </form>
    </Form>
  );
};
