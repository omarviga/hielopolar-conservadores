
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useClients } from "@/hooks/useClients";
import { useOrderMutations } from '@/hooks/orders/mutations';
import { useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  client_id: z.string().optional(),
  equipment_type: z.string().min(2, {
    message: "El tipo de equipo debe tener al menos 2 caracteres",
  }),
  problem_description: z.string().min(5, {
    message: "La descripción del problema debe tener al menos 5 caracteres",
  }),
  service_type: z.enum(["mantenimiento", "reparacion", "instalacion"]),
  status: z.enum(["pendiente", "en_proceso", "completado", "cancelado"]).default("pendiente"),
  estimated_delivery_date: z.string().optional(),
});

interface OrderFormProps {
  onCancel: () => void;
}

const OrderForm = ({ onCancel }: OrderFormProps) => {
  const { clients } = useClients();
  const queryClient = useQueryClient();
  const { createOrder } = useOrderMutations(queryClient);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_type: "reparacion",
      status: "pendiente",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createOrder.mutateAsync(values);
    onCancel();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Seleccione el cliente para esta orden
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="equipment_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Equipo</FormLabel>
              <FormControl>
                <Input placeholder="Refrigerador, congelador, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="problem_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del Problema</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describa el problema reportado..." 
                  {...field} 
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Servicio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione tipo de servicio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                  <SelectItem value="reparacion">Reparación</SelectItem>
                  <SelectItem value="instalacion">Instalación</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estimated_delivery_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha Estimada de Entrega</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Crear Orden
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
