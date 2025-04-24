
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { repairFormSchema, type RepairFormData } from './schemas/repairFormSchema';
import { RepairFormFields } from './form-fields/RepairFormFields';

interface RepairFormProps {
  assetId: string;
  onSubmit: (data: any) => void; // Using 'any' here to avoid type conflicts
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
    console.log('Form data before processing:', data);
    
    const formattedData = {
      ...data,
      cost: data.cost ? parseFloat(data.cost) : undefined,
      parts_used: data.parts_used 
        ? data.parts_used.split(',').map(part => part.trim()).filter(part => part !== '') 
        : undefined,
    };
    
    console.log('Processed form data:', formattedData);
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
        <RepairFormFields form={form} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Registrar Reparación"}
        </Button>
      </form>
    </Form>
  );
};

export default RepairForm;
