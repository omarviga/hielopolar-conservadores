import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Asset } from './AssetCard';
import { useAssets } from '@/hooks/useAssets';
import { toast } from '@/hooks/use-toast';
import { generateUniqueAssetId } from '@/services/assetService';

const validCapacities = [
  '20 bolsas (5kg)', 
  '40 bolsas (5kg)', 
  '60 bolsas (5kg)', 
  '100 bolsas (5kg)', 
  '250 bolsas (5kg)'
] as const;

const formSchema = z.object({
  model: z.string().min(1, "El modelo es requerido"),
  serialNumber: z.string().min(1, "El número de serie es requerido"),
  location: z.string().min(1, "La ubicación es requerida"),
  capacity: z.enum(validCapacities, {
    errorMap: () => ({ message: "Debe seleccionar una capacidad válida" })
  }),
  temperatureRange: z.string().min(1, "El rango de temperatura es requerido"),
  imageSrc: z.string().url("Debe ser una URL válida").or(z.string().min(0).max(0))
});

type FormValues = z.infer<typeof formSchema>;

interface NewAssetFormProps {
  onComplete: () => void;
}

const NewAssetForm: React.FC<NewAssetFormProps> = ({ onComplete }) => {
  const { addAsset, assets } = useAssets();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: '',
      serialNumber: '',
      location: 'Almacén Principal',
      capacity: '100 bolsas (5kg)',
      temperatureRange: '',
      imageSrc: ''
    }
  });
  
  const onSubmit = (data: FormValues) => {
    try {
      // Generar un nuevo ID único
      const newId = generateUniqueAssetId(assets);
      
      // Usar una imagen por defecto si no se proporciona una
      const imageSrc = data.imageSrc || 'https://images.unsplash.com/photo-1562184552-997c461abbe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60';
      
      // Crear el nuevo activo
      const newAsset: Asset = {
        id: newId,
        model: data.model,
        serialNumber: data.serialNumber,
        status: 'available',
        location: data.location,
        lastMaintenance: new Date().toLocaleDateString(),
        capacity: data.capacity,
        temperatureRange: data.temperatureRange,
        imageSrc
      };
      
      console.log('Creando nuevo conservador:', newAsset);
      
      // Añadir a la lista de activos
      addAsset(newAsset);
      
      // Cerrar el formulario
      onComplete();
      
      toast({
        title: 'Conservador creado',
        description: `Se ha añadido el conservador ${newAsset.model} con ID ${newAsset.id}`,
      });
    } catch (error) {
      console.error('Error al crear el conservador:', error);
      toast({
        title: 'Error',
        description: 'No se pudo crear el conservador.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Polar-3000XL" {...field} />
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
                <Input placeholder="Ej. P3XL-12345" {...field} />
              </FormControl>
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacidad</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la capacidad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {validCapacities.map((capacity) => (
                    <SelectItem key={capacity} value={capacity}>
                      {capacity}
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
          name="temperatureRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rango de Temperatura</FormLabel>
              <FormControl>
                <Input placeholder="Ej. -18°C a -22°C" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageSrc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de Imagen (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-4 flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onComplete}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-polar-600 hover:bg-polar-700">
            Crear Conservador
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewAssetForm;
