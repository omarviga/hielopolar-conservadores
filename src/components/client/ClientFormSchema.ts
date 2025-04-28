
import { z } from 'zod';

export const clientFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  contactPerson: z.string().min(2, { message: 'El nombre de contacto debe tener al menos 2 caracteres.' }),
  phone: z.string().min(5, { message: 'El teléfono debe tener al menos 5 caracteres.' }),
  email: z.string().email({ message: 'Por favor ingresa un email válido.' }),
  address: z.string().min(5, { message: 'La dirección debe tener al menos 5 caracteres.' }),
  channelType: z.enum(['tradicional', 'moderno', 'industrial'], {
    required_error: 'Selecciona un tipo de canal.',
  }),
  conserverProductivity: z.coerce.number().min(0, { message: 'La productividad debe ser un número positivo.' }),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;  

// Removed duplicate interface declaration to avoid identifier conflict.