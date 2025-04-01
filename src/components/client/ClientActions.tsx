
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useClients } from '@/hooks/useClients';
import { toast } from '@/hooks/use-toast';
import { Client } from './ClientInterface';

interface ClientActionsProps {
  onShowDetails: () => void;
  client?: Client;
}

const assignConserverSchema = z.object({
  quantity: z.coerce
    .number()
    .min(1, { message: 'Debe asignar al menos 1 conservador' })
    .max(10, { message: 'No puede asignar más de 10 conservadores a la vez' }),
});

type AssignConserverValues = z.infer<typeof assignConserverSchema>;

const ClientActions: React.FC<ClientActionsProps> = ({ onShowDetails, client }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { updateClient } = useClients();

  const form = useForm<AssignConserverValues>({
    resolver: zodResolver(assignConserverSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const handleAssignConservers = (values: AssignConserverValues) => {
    if (!client) return;

    const newAssetsAssigned = client.assetsAssigned + values.quantity;
    
    // Actualizar cliente con nuevos conservadores asignados
    updateClient(client.id, { 
      assetsAssigned: newAssetsAssigned,
      activeCredit: Math.min(newAssetsAssigned, client.maxCredit)
    });
    
    setShowDialog(false);
    toast({
      title: 'Conservadores asignados',
      description: `${values.quantity} conservadores han sido asignados a ${client.name}`,
    });
  };

  return (
    <>
      <div className="mt-6 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={onShowDetails}
        >
          Ver Detalle
        </Button>
        <Button 
          size="sm" 
          className="flex-1 bg-polar-600 hover:bg-polar-700"
          onClick={() => setShowDialog(true)}
        >
          Asignar Conservador
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Asignar Conservadores</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAssignConservers)} className="space-y-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de conservadores</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-polar-600 hover:bg-polar-700">
                  Asignar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientActions;
