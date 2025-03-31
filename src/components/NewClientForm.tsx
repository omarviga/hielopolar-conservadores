
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useClients } from '@/hooks/useClients';
import { toast } from '@/hooks/use-toast';
import StatusToggle from '@/components/client/StatusToggle';
import { clientFormSchema, ClientFormValues, defaultValues } from '@/components/client/ClientFormSchema';
import { Client } from '@/components/ClientCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewClientFormProps {
  onSubmit: () => void;
}

const NewClientForm: React.FC<NewClientFormProps> = ({ onSubmit }) => {
  const { addClient } = useClients();
  
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: ClientFormValues) => {
    // Crear un nuevo id basado en un número aleatorio
    const newId = `CL-${String(Math.floor(Math.random() * 900) + 100)}`;
    
    // Generar coordenadas aleatorias para Chile como una tupla [longitud, latitud]
    const coordinates: [number, number] = [
      -70.6506 + (Math.random() - 0.5) * 5, 
      -33.4372 + (Math.random() - 0.5) * 10
    ];
    
    // Crear el nuevo cliente
    const newClient: Client = {
      id: newId,
      name: values.name,
      contactPerson: values.contactPerson,
      phone: values.phone,
      email: values.email,
      address: values.address,
      assetsAssigned: 0,
      maxCredit: 5, // Mantenemos este campo para compatibilidad con la interfaz Client
      activeCredit: 0,
      status: values.status,
      imageSrc: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
      coordinates: coordinates,
      channelType: values.channelType,
      conserverProductivity: values.conserverProductivity,
    };

    addClient(newClient);

    toast({
      title: 'Cliente añadido',
      description: `El cliente "${values.name}" ha sido añadido exitosamente.`,
    });

    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del cliente" {...field} />
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
                  <Input placeholder="Nombre y apellido" {...field} />
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
                  <Input placeholder="+56 9 1234 5678" {...field} />
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
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="correo@ejemplo.cl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Dirección completa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="channelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canal Comercial</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo de canal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tradicional">Canal Tradicional</SelectItem>
                    <SelectItem value="moderno">Canal Moderno</SelectItem>
                    <SelectItem value="industrial">Canal Industrial</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="conserverProductivity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Productividad del Conservador</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormDescription>
                  Nivel de productividad por conservador asignado
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <StatusToggle value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onSubmit}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-polar-600 hover:bg-polar-700">
            Guardar Cliente
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewClientForm;
