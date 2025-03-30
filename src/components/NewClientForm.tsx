
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useClients } from '@/hooks/useClients';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  contactPerson: z.string().min(2, { message: 'El nombre de contacto debe tener al menos 2 caracteres.' }),
  phone: z.string().min(5, { message: 'El teléfono debe tener al menos 5 caracteres.' }),
  email: z.string().email({ message: 'Por favor ingresa un email válido.' }),
  address: z.string().min(5, { message: 'La dirección debe tener al menos 5 caracteres.' }),
  maxCredit: z.coerce.number().min(1, { message: 'El límite de crédito debe ser mayor a 0.' }),
  status: z.enum(['active', 'inactive']).default('active'),
});

type FormValues = z.infer<typeof formSchema>;

interface NewClientFormProps {
  onSubmit: () => void;
}

const NewClientForm: React.FC<NewClientFormProps> = ({ onSubmit }) => {
  const { addClient } = useClients();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      maxCredit: 5,
      status: 'active',
    },
  });

  const handleSubmit = (values: FormValues) => {
    // Crear un nuevo id basado en el último cliente + 1
    const newId = `CL-${String(Math.floor(Math.random() * 900) + 100)}`;
    
    // Crear el nuevo cliente
    const newClient = {
      id: newId,
      name: values.name,
      contactPerson: values.contactPerson,
      phone: values.phone,
      email: values.email,
      address: values.address,
      assetsAssigned: 0,
      maxCredit: values.maxCredit,
      activeCredit: 0,
      status: values.status,
      imageSrc: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
      // Coordenadas aleatorias en Chile
      coordinates: [-70.6506 + (Math.random() - 0.5) * 5, -33.4372 + (Math.random() - 0.5) * 10],
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

        <FormField
          control={form.control}
          name="maxCredit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Límite de crédito (máximo de conservadores)</FormLabel>
              <FormControl>
                <Input type="number" min="1" max="20" {...field} />
              </FormControl>
              <FormDescription>
                Máximo número de conservadores que puede tener este cliente
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={field.value === 'active' ? 'default' : 'outline'}
                  className={field.value === 'active' ? 'bg-polar-600' : ''}
                  onClick={() => form.setValue('status', 'active')}
                >
                  Activo
                </Button>
                <Button
                  type="button"
                  variant={field.value === 'inactive' ? 'default' : 'outline'}
                  className={field.value === 'inactive' ? 'bg-red-600' : ''}
                  onClick={() => form.setValue('status', 'inactive')}
                >
                  Inactivo
                </Button>
              </div>
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
