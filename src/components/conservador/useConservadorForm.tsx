
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ConservadorFormValues, defaultValues } from './ConservadorFormSchema';

export const useConservadorForm = () => {
  const [formData, setFormData] = useState<ConservadorFormValues>({...defaultValues});
  const [mensaje, setMensaje] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: keyof ConservadorFormValues, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const resetForm = () => {
    if (window.confirm('¿Estás seguro de que deseas limpiar el formulario?')) {
      setFormData({...defaultValues});
      setMensaje('');
      setError('');
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('conservadores')
        .insert([formData]);

      if (error) throw error;

      setMensaje('¡Conservador registrado exitosamente!');
      // Limpiar formulario
      setFormData({...defaultValues});

    } catch (error: any) {
      setMensaje('Error al registrar: ' + error.message);
      setError('Error al registrar: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    mensaje,
    isSubmitting,
    error,
    handleChange,
    resetForm,
    submitForm
  };
};
