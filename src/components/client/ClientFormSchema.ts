
import * as z from "zod";

export const clientFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  email: z
    .string()
    .email({
      message: "Ingrese un correo electrónico válido",
    })
    .optional(),
  phone: z.string().optional(),
  contactPerson: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  channelType: z.enum(["tradicional", "moderno", "industrial"]).optional(),
  conserverProductivity: z.number().optional(),
  conserver: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;
