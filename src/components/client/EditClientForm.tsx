
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Client } from './ClientInterface';
import React from 'react';

export const clientFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Debe ser un email válido"),
  status: z.enum(["active", "inactive"]),
  address: z.string().optional(),
  phone: z.string().optional(),
  contactPerson: z.string().optional(),
  channelType: z.enum(["tradicional", "moderno", "industrial"]).optional(),
  conserverProductivity: z.number().optional(),
  conserver: z.string().optional(),
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

        {/* Información básica */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la empresa</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Persona de contacto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tipo de canal */}
        <FormField
          control={form.control}
          name="channelType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de canal</FormLabel>
              <FormControl>
                <select
                  className="w-full p-2 border rounded-md"
                  {...field}
                >
                  <option value="tradicional">Tradicional</option>
                  <option value="moderno">Moderno</option>
                  <option value="industrial">Industrial</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conservador asignado */}
        <FormField
          control={form.control}
          name="conserver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conservador asignado</FormLabel>
              <FormControl>
                <select
                  className="w-full p-2 border rounded-md"
                  {...field}
                >
                  <option value="">Sin asignar</option>
                  <option value="Conservador 1">Conservador 1</option>
                  <option value="Conservador 2">Conservador 2</option>
                  <option value="Conservador 3">Conservador 3</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Productividad del conservador */}
        <FormField
          control={form.control}
          name="conserverProductivity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Productividad del conservador</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditClientForm;
