import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const repairFormSchema = z.object({
  description: z.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
  diagnosis: z.string().optional(),
  repair_type: z.enum(['corrective', 'preventive']).default('corrective'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  technician: z.string().optional(),
  cost: z.number().min(0, 'El costo no puede ser negativo').optional(),
  estimated_completion: z.date().optional(),
  notes: z.string().optional(),
  parts_used: z.array(z.string()).optional(),
});

type RepairFormValues = z.infer<typeof repairFormSchema>;

const RepairForm = ({ assetId, onSubmit, isLoading }: { assetId: string; onSubmit: (data: RepairFormValues) => void; isLoading: boolean }) => {
  const form = useForm<RepairFormValues>({
    resolver: zodResolver(repairFormSchema),
    defaultValues: {
      description: '',
      repair_type: 'corrective',
      priority: 'medium',
      parts_used: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del problema</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Más campos del formulario... */}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Reparación'}
        </Button>
      </form>
    </Form>
  );
};

export default RepairForm;