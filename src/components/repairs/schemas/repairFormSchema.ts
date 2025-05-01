
import * as z from 'zod';

export const repairFormSchema = z.object({
  repair_number: z.string().optional(),
  description: z.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
  diagnosis: z.string().optional(),
  repair_type: z.enum(['corrective', 'preventive']).default('corrective'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  technician: z.string().optional(),
  cost: z.number().min(0, 'El costo no puede ser negativo').optional().or(z.string().optional()),
  estimated_completion: z.date().optional(),
  notes: z.string().optional(),
  parts_used: z.string().optional(),
});

export type RepairFormData = z.infer<typeof repairFormSchema>;
