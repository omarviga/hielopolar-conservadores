
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface Repair {
  id: string;
  asset_id: string;
  repair_number: string | null;
  description: string;
  diagnosis: string | null;
  repair_type: 'corrective' | 'preventive';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  technician: string | null;
  cost: number | null;
  estimated_completion: string | null;
  actual_completion_date: string | null;
  created_at: string;
  updated_at: string;
  notes: string | null;
  parts_used: string[] | null;
}

interface NewRepair {
  asset_id: string;
  repair_number?: string;
  description: string;
  diagnosis?: string;
  repair_type?: 'corrective' | 'preventive';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  technician?: string;
  cost?: number;
  estimated_completion?: string;
  notes?: string;
  parts_used?: string[];
}

export const useRepairs = (assetId?: string) => {
  const queryClient = useQueryClient();

  const fetchRepairs = async () => {
    let query = supabase
      .from('repairs')
      .select('*')
      .order('created_at', { ascending: false });

    if (assetId) {
      query = query.eq('asset_id', assetId);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data as Repair[];
  };

  const { data: repairs = [], isLoading } = useQuery({
    queryKey: ['repairs', assetId],
    queryFn: fetchRepairs,
  });

  const createRepairMutation = useMutation({
    mutationFn: async (newRepair: NewRepair) => {
      const formattedRepair = {
        ...newRepair,
        repair_type: newRepair.repair_type || 'corrective',
        priority: newRepair.priority || 'medium',
        estimated_completion: newRepair.estimated_completion 
          ? new Date(newRepair.estimated_completion).toISOString().split('T')[0]
          : null,
        parts_used: newRepair.parts_used || null
      };

      const { data, error } = await supabase
        .from('repairs')
        .insert(formattedRepair)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repairs'] });
      toast({
        title: "Reparación registrada",
        description: "La reparación ha sido registrada exitosamente.",
      });
    },
    onError: (error) => {
      console.error('Error al crear la reparación:', error);
      toast({
        title: "Error",
        description: "No se pudo registrar la reparación. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  const updateRepairMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Repair> & { id: string }) => {
      const { data, error } = await supabase
        .from('repairs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repairs'] });
      toast({
        title: "Reparación actualizada",
        description: "La reparación ha sido actualizada exitosamente.",
      });
    },
    onError: (error) => {
      console.error('Error al actualizar la reparación:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la reparación. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  return {
    repairs,
    isLoading,
    createRepair: createRepairMutation.mutate,
    updateRepair: updateRepairMutation.mutate,
  };
};
