
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { ClientFormValues } from './ClientFormSchema';

interface BusinessInfoFieldsProps {
  form: UseFormReturn<ClientFormValues>;
}

const BusinessInfoFields: React.FC<BusinessInfoFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="channelType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Canal Comercial</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo de canal" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="tradicional">Canal Tradicional</SelectItem>
                <SelectItem value="moderno">Canal Moderno</SelectItem>
                <SelectItem value="industrial">Canal Industrial</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="conserverProductivity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Productividad del Conservador</FormLabel>
            <FormControl>
              <Input type="number" min="0" {...field} />
            </FormControl>
            <FormDescription>
              Nivel de productividad por conservador asignado
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BusinessInfoFields;
