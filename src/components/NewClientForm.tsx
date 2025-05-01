
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useClients } from '@/hooks/useClients';
import { clientFormSchema, ClientFormValues } from './client/ClientFormSchema';
import { v4 as uuidv4 } from 'uuid';

const NewClientForm = () => {
  const { addClient } = useClients();
  
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      contactPerson: '',
      address: '',
      status: 'active',
      channelType: 'tradicional',
      conserverProductivity: 0,
      conserver: '',
    },
  });

  const onSubmit = async (values: ClientFormValues) => {
    try {
      // Create a complete client object
      const newClient = {
        ...values,
        id: uuidv4(),
        assetsAssigned: 0,
        maxCredit: 0,
        activeCredit: 0,
        // Ensure required fields are not undefined
        name: values.name,
        email: values.email,
        imageSrc: `https://ui-avatars.com/api/?name=${encodeURIComponent(values.name)}&background=random`,
        // Make sure channelType and conserverProductivity have default values
        channelType: values.channelType || 'tradicional',
        conserverProductivity: values.conserverProductivity || 0,
      };
      
      await addClient(newClient);
      toast({
        title: 'Cliente creado',
        description: `El cliente ${values.name} ha sido creado correctamente.`,
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo crear el cliente. Intente nuevamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del cliente" {...field} />
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
                    <Input placeholder="correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Additional fields would go here */}
          </div>
          <Button type="submit" className="w-full">
            Crear Cliente
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewClientForm;
