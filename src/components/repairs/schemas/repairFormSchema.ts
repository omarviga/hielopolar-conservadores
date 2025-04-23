
import * as z from 'zod';

export const repairFormSchema = z.object({
  repair_number: z.string().optional(),
  description: z.string().min(1, 'La descripción es requerida'),
  diagnosis: z.string().optional(),
  repair_type: z.enum(['corrective', 'preventive']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  technician: z.string().optional(),
  cost: z.string().optional(),
  estimated_completion: z.date().optional(),
  notes: z.string().optional(),
  parts_used: z.string().optional(),
});

export type RepairFormData = z.infer<typeof repairFormSchema>;

