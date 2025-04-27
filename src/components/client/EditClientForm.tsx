
"use client"

import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { clientFormSchema, type ClientFormValues } from './ClientFormSchema';
import ContactInfoFields from './ContactInfoFields';
import AddressField from './AddressField';
import BusinessInfoFields from './BusinessInfoFields';
import FormActions from './FormActions';
import { Client } from './ClientInterface';
import StatusToggle from './StatusToggle';

interface EditClientFormProps {
  client: Client;
  onSubmit: (values: ClientFormValues) => void;
  onCancel: () => void;
}

const EditClientForm = ({ client, onSubmit, onCancel }: EditClientFormProps) => {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: client.name,
      contactPerson: client.contactPerson || '',
      phone: client.phone || '',
      email: client.email || '',
      address: client.address || '',
      channelType: client.channelType || 'tradicional',
      conserverProductivity: client.conserverProductivity || 0,
      status: client.status || 'active',
    },
  });

  const handleSubmit = (values: ClientFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <ContactInfoFields form={form} />
        <AddressField form={form} />
        <BusinessInfoFields form={form} />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Estado del cliente</label>
          <StatusToggle
            value={form.watch('status')}
            onChange={(value) => form.setValue('status', value)}
          />
        </div>
        <FormActions onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default EditClientForm;
