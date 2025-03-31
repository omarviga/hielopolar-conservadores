
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useClients } from '@/hooks/useClients';
import { Client } from '@/components/ClientCard';
import { clientFormSchema, ClientFormValues, defaultValues } from '@/components/client/ClientFormSchema';
import ContactInfoFields from '@/components/client/ContactInfoFields';
import AddressField from '@/components/client/AddressField';
import BusinessInfoFields from '@/components/client/BusinessInfoFields';
import StatusToggle from '@/components/client/StatusToggle';
import FormActions from '@/components/client/FormActions';

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
      maxCredit: 5,
      activeCredit: 0,
      status: values.status,
      imageSrc: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
      coordinates: coordinates,
      channelType: values.channelType,
      conserverProductivity: parseInt(String(values.conserverProductivity)), // Ensure it's a number
    };

    // Add the new client
    addClient(newClient);
    
    // Cleanup form and close dialog
    form.reset();
    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <ContactInfoFields form={form} />
        <AddressField form={form} />
        <BusinessInfoFields form={form} />
        
        <div className="mt-4">
          <Form.FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <Form.FormItem>
                <Form.FormLabel>Estado</Form.FormLabel>
                <Form.FormControl>
                  <StatusToggle value={field.value} onChange={field.onChange} />
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
        </div>

        <FormActions onCancel={onSubmit} />
      </form>
    </Form>
  );
};

export default NewClientForm;
