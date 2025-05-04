
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Cliente } from './types';

export const useClienteData = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const cargarClientes = async () => {
    setError('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('id, nombre')
        .order('nombre');

      if (error) throw error;

      setClientes(data || []);
    } catch (err: any) {
      setError('Error al cargar clientes: ' + err.message);
      console.error('Error al cargar clientes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  return {
    clientes,
    isLoading,
    error,
    cargarClientes
  };
};
