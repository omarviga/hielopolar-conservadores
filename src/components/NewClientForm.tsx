
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClients } from "@/hooks/useClients";
import { generateRandomCoordinates, randomUserImage } from "@/utils/utils";
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

const NewClientForm = () => {
  const { addClient } = useClients();
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      status: "active",
      email: "",
      name: "",
      address: "",
      phone: "",
      contactPerson: '',
      channelType: "tradicional",
      conserverProductivity: 0,
      conserver: '',
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => {
  const newClient = {
    id: `CL-${String(Math.floor(Math.random() * 900) + 100)}`,
    assetsAssigned: 0,
    maxCredit: 5,
    activeCredit: 0,
    name: values.name || '', // Ensure name is a string
    email: values.email || '', // Ensure email is a string
    status: values.status as 'active' | 'inactive',
    imageSrc: randomUserImage,
    channelType: values.channelType as 'tradicional' | 'moderno' | 'industrial',
    contactPerson: values.contactPerson,
    phone: values.phone,
    address: values.address,
    coordinates: generateRandomCoordinates(),
    conserver: values.conserver,
    conserverProductivity: values.conserverProductivity || 0,
  };
  
  addClient(newClient);
  form.reset();
})} className="space-y-4">
        {/* Status Toggle */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row items-center justify-between">
              <FormLabel className="text-sm font-medium">Estado</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={field.value === 'active' ? 'default' : 'outline'}
                    className={field.value === 'active' ? 'bg-green-500 text-white' : ''}
                    onClick={() => field.onChange('active')}
                  >
                    Activo
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === 'inactive' ? 'default' : 'outline'}
                    className={field.value === 'inactive' ? 'bg-red-500 text-white' : ''}
                    onClick={() => field.onChange('inactive')}
                  >
                    Inactivo
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type="submit" className="bg-polar-600 hover:bg-polar-700">
          Crear Cliente
        </Button>
      </form>
    </Form>
  );
};

export default NewClientForm;
