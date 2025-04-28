import { z } from 'zod';

// Define la interfaz para los valores del formulario
export interface ClientFormValues {
  name?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  channelType?: 'tradicional' | 'moderno' | 'industrial';
  status?: 'active' | 'inactive';
  conserverProductivity?: number;
  conserver?: string; // Agregar la propiedad 'conserver'
}

// Define el esquema de validación usando zod
export const clientFormSchema = z.object({
  name: z.string().nonempty('El nombre es obligatorio'),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Debe ser un correo válido').optional(),
  address: z.string().optional(),
  channelType: z.enum(['tradicional', 'moderno', 'industrial']),
  status: z.enum(['active', 'inactive']),
  conserverProductivity: z.number().optional(),
  conserver: z.string().optional(),
});

// Define y exporta los valores predeterminados
export const defaultValues: ClientFormValues = {
  name: '',
  contactPerson: '',
  phone: '',
  email: '',
  address: '',
  channelType: 'tradicional',
  status: 'active',
  conserverProductivity: 0,
  conserver: '',
};