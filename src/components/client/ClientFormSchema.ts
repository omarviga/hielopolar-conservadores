// src/components/client/ClientFormSchema.ts
import * as z from 'zod';

export const clientFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  contactPerson: z.string().min(2, {
    message: "El nombre de contacto debe tener al menos 2 caracteres.",
  }),
  phone: z.string().min(6, {
    message: "El teléfono debe tener al menos 6 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  address: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  status: z.boolean().default(true),
  channelType: z.string().min(1, {
    message: "Por favor selecciona un tipo de canal.",
  }),
  conserverProductivity: z.number().min(0, {
    message: "La productividad no puede ser negativa.",
  }),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;

export const defaultValues: Partial<ClientFormValues> = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  status: true,
  channelType: "",
  conserverProductivity: 0,
};