
import { useQueryClient } from '@tanstack/react-query';
import { useRepairQueries } from './repairs/queries';
import { useRepairMutations } from './repairs/mutations';
import type { AddRepairInput, UpdateRepairInput } from './repairs/types';

export const useRepairs = (assetId?: string) => {
  const queryClient = useQueryClient();
  const { repairs, isLoading, isError, error, getRepairById } = useRepairQueries(assetId);
  const { addRepair, updateRepair, deleteRepair } = useRepairMutations(queryClient);

  return {
    repairs,
    isLoading,
    isError,
    error,
    addRepair,
    updateRepair,
    deleteRepair,
    getRepairById,
  };
};

// Re-export types for convenience
export type { AddRepairInput, UpdateRepairInput };
