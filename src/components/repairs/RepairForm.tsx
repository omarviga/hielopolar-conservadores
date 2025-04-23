
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const repairFormSchema = z.object({
  repair_number: z.string().optional(),
  description: z.string().min(1, 'La descripción es requerida'),
  diagnosis: z.string().optional(),
  repair_type: z.enum(['corrective', 'preventive']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  technician: z.string().optional(),
  cost: z.string().optional(), // Keep this as string to match form input
  estimated_completion: z.date().optional(),
  notes: z.string().optional(),
  parts_used: z.string().optional(),
});

type RepairFormData = z.infer<typeof repairFormSchema>;

// Define la forma exacta en que los datos serán enviados después de la transformación
interface FormattedRepairData extends Omit<RepairFormData, 'cost' | 'parts_used'> {
  cost?: number;
  parts_used?: string[];
}

interface RepairFormProps {
  assetId: string;
  onSubmit: (data: FormattedRepairData) => void;
  isLoading?: boolean;
}

const RepairForm = ({ assetId, onSubmit, isLoading }: RepairFormProps) => {
  const form = useForm<RepairFormData>({
    resolver: zodResolver(repairFormSchema),
    defaultValues: {
      repair_type: 'corrective',
      priority: 'medium',
      description: '',
      technician: '',
      cost: '',
      notes: '',
      parts_used: '',
    },
  });

  const handleSubmit = (data: RepairFormData) => {
    const formattedData: FormattedRepairData = {
      ...data,
      cost: data.cost ? parseFloat(data.cost) : undefined, // Convert string to number
      parts_used: data.parts_used 
        ? data.parts_used.split(',').map(part => part.trim()).filter(part => part !== '') 
        : undefined,
    };
    
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="repair_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Reparación</FormLabel>
              <FormControl>
                <Input placeholder="REP-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repair_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Reparación</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="corrective">Correctiva</SelectItem>
                  <SelectItem value="preventive">Preventiva</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioridad</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe el problema o la reparación necesaria"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diagnóstico</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Diagnóstico técnico del problema"
                  {...field} 
                />
              </FormControl>
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
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Costo Estimado</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estimated_completion"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha Estimada de Finalización</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
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
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parts_used"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repuestos Necesarios</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Lista de repuestos separados por comas"
                  {...field} 
                />
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
              <FormLabel>Notas Adicionales</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Notas o comentarios adicionales"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Registrar Reparación"}
        </Button>
      </form>
    </Form>
  );
};

export default RepairForm;
