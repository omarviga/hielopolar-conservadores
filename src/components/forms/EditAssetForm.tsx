
import React, { useState } from 'react';
import { Asset } from '../AssetCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface EditAssetFormProps {
  asset: Asset;
  onSubmit: (data: Partial<Asset>) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  model: z.string().min(1, "El modelo es requerido"),
  serialNumber: z.string().min(1, "El número de serie es requerido"),
  location: z.string().min(1, "La ubicación es requerida"),
  capacity: z.string().min(1, "La capacidad es requerida"),
  temperatureRange: z.string().min(1, "El rango de temperatura es requerido"),
  lastMaintenance: z.string().min(1, "La fecha de mantenimiento es requerida"),
  status: z.enum(['available', 'in-use', 'maintenance', 'retired']),
  assignedTo: z.string().optional(),
  imageSrc: z.string().optional(),
});

const statusOptions = [
  { value: 'available', label: 'Disponible' },
  { value: 'in-use', label: 'En Uso' },
  { value: 'maintenance', label: 'Mantenimiento' },
  { value: 'retired', label: 'Retirado' }
];

const EditAssetForm: React.FC<EditAssetFormProps> = ({ asset, onSubmit, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: asset.model,
      serialNumber: asset.serialNumber,
      location: asset.location,
      capacity: asset.capacity,
      temperatureRange: asset.temperatureRange,
      lastMaintenance: asset.lastMaintenance,
      status: asset.status,
      assignedTo: asset.assignedTo || '',
      imageSrc: asset.imageSrc,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Modelo del conservador" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Serie</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Número de serie" />
              </FormControl>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ubicación del conservador" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacidad</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Capacidad" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="temperatureRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rango de Temperatura</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rango de temperatura" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="lastMaintenance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Último Mantenimiento</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Fecha del último mantenimiento" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {asset.status === 'in-use' && (
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente Asignado</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Cliente asignado" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="imageSrc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de la Imagen</FormLabel>
              <FormControl>
                <Input {...field} placeholder="URL de la imagen" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-polar-600 hover:bg-polar-700">
            Guardar Cambios
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditAssetForm;
