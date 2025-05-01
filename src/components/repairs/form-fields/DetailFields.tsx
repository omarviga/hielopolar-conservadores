
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RepairFormData } from '../schemas/repairFormSchema';

interface DetailFieldsProps {
  form: UseFormReturn<RepairFormData>;
}

export const DetailFields: React.FC<DetailFieldsProps> = ({ form }) => {
  return (
    <>
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
                value={field.value || ''}
              />
            </FormControl>
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
                value={field.value || ''}
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
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
