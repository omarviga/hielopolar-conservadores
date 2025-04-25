
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

export interface Maintenance {
  id?: string;
  title: string;
  client: string;
  asset: string;
  date: string;
  status: 'active' | 'scheduled' | 'completed' | 'delayed';
  technician: string;
  type?: string;
  notes?: string;
}

export const useMaintenance = () => {
  const queryClient = useQueryClient();

  const fetchMaintenances = async () => {
    const { data, error } = await supabase
      .from('maintenances')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching maintenances:', error);
      throw error;
    }

    return data as Maintenance[];
  };

  const { data: maintenances = [], isLoading } = useQuery({
    queryKey: ['maintenances'],
    queryFn: fetchMaintenances,
  });

  const createMaintenanceMutation = useMutation({
    mutationFn: async (newMaintenance: Maintenance) => {
      const { data, error } = await supabase
        .from('maintenances')
        .insert(newMaintenance)
        .select()
        .single();

      if (error) {
        console.error('Error creating maintenance:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenances'] });
      toast({
        title: "Mantenimiento registrado",
        description: "El mantenimiento ha sido registrado exitosamente.",
      });
    },
    onError: (error) => {
      console.error('Error al crear el mantenimiento:', error);
      toast({
        title: "Error",
        description: "No se pudo registrar el mantenimiento. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  const updateMaintenanceMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Maintenance> & { id: string }) => {
      const { data, error } = await supabase
        .from('maintenances')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenances'] });
      toast({
        title: "Mantenimiento actualizado",
        description: "El mantenimiento ha sido actualizado exitosamente.",
      });
    },
    onError: (error) => {
      console.error('Error al actualizar el mantenimiento:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el mantenimiento. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  return {
    maintenances,
    isLoading,
    createMaintenance: createMaintenanceMutation.mutate,
    updateMaintenance: updateMaintenanceMutation.mutate,
  };
};

