"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ClientFormValues, clientFormSchema } from './ClientFormSchema';
import { Client } from './ClientInterface';
import React from 'react';

export const clientFormSchema = z.object({
  // Example schema fields
  name: z.string(),
  email: z.string().email(),
  status: z.enum(["active", "inactive"]),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;

interface EditClientFormProps {
  client: Client;
  onSubmit: (values: ClientFormValues) => void;
  onCancel: () => void;
}

const EditClientForm: React.FC<EditClientFormProps> = ({ client, onSubmit, onCancel }) => {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      status: client.status,
      email: client.email,
      name: client.name,
      address: client.address,
      phone: client.phone,
      contactPerson: client.contactPerson || '',
      channelType: client.channelType,
      conserverProductivity: client.conserverProductivity || 0,
      conserver: client.conserver || '',
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Status Toggle */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Estado</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`px-3 py-1 rounded-md ${form.watch('status') === 'active' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              onClick={() => form.setValue('status', 'active')}
            >
              Activo
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-md ${form.watch('status') === 'inactive' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
              onClick={() => form.setValue('status', 'inactive')}
            >
              Inactivo
            </button>
          </div>
        </div>

        {/* Conservador asignado */}
        <div className="space-y-2">
          <label htmlFor="conserver" className="block text-sm font-medium">
            Conservador asignado
          </label>
          <select
            id="conserver"
            {...form.register('conserver')}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Seleccionar conservador</option>
            <option value="Conservador 1">Conservador 1</option>
            <option value="Conservador 2">Conservador 2</option>
            <option value="Conservador 3">Conservador 3</option>
          </select>
        </div>

        {/* Other form fields would go here */}

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </Form>
  );
};

export default EditClientForm;