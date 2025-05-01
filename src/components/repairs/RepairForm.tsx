
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { RepairFormFields } from './form-fields/RepairFormFields';
import { repairFormSchema, RepairFormData } from './schemas/repairFormSchema';

interface RepairFormProps {
  assetId: string;
  onSubmit: (data: RepairFormData) => void;
  isLoading: boolean;
  initialData?: Partial<RepairFormData>;
}

const RepairForm = ({ assetId, onSubmit, isLoading, initialData = {} }: RepairFormProps) => {
  const form = useForm<RepairFormData>({
    resolver: zodResolver(repairFormSchema),
    defaultValues: {
      repair_number: initialData.repair_number || '',
      description: initialData.description || '',
      diagnosis: initialData.diagnosis || '',
      repair_type: initialData.repair_type || 'corrective',
      priority: initialData.priority || 'medium',
      technician: initialData.technician || '',
      cost: initialData.cost || 0,
      estimated_completion: initialData.estimated_completion,
      notes: initialData.notes || '',
      parts_used: initialData.parts_used || '',
    },
  });

  const handleSubmit = (data: RepairFormData) => {
    // Convert string cost to number if provided
    if (typeof data.cost === 'string' && data.cost !== '') {
      data.cost = parseFloat(data.cost);
    }
    
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-4">
        <RepairFormFields form={form} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Reparación'}
        </Button>
      </form>
    </Form>
  );
};

export default RepairForm;
