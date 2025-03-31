
import { z } from 'zod';

export const clientFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  contactPerson: z.string().min(2, { message: 'El nombre de contacto debe tener al menos 2 caracteres.' }),
  phone: z.string().min(5, { message: 'El teléfono debe tener al menos 5 caracteres.' }),
  email: z.string().email({ message: 'Por favor ingresa un email válido.' }),
  address: z.string().min(5, { message: 'La dirección debe tener al menos 5 caracteres.' }),
  maxCredit: z.coerce.number().min(1, { message: 'El límite de crédito debe ser mayor a 0.' }),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;

export const defaultValues: ClientFormValues = {
  name: '',
  contactPerson: '',
  phone: '',
  email: '',
  address: '',
  maxCredit: 5,
  status: 'active',
};
