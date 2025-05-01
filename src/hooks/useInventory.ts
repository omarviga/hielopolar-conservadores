
import { useQuery } from '@tanstack/react-query';
import { InventoryItem } from '@/types/inventory';

// Mock data function - in production this would fetch from an API
const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
  // This is a mock implementation
  return [
    {
      id: '1',
      name: 'Hielo en Bloque 25kg',
      description: 'Bloque de hielo sólido para uso industrial',
      quantity: 50,
      price: 2500,
      category: 'Hielo Industrial',
      imageUrl: '/placeholder.svg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Hielo en Cubos 5kg',
      description: 'Cubos de hielo para bebidas y eventos',
      quantity: 100,
      price: 1200,
      category: 'Hielo Comercial',
      imageUrl: '/placeholder.svg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Hielo Triturado 10kg',
      description: 'Hielo triturado para coctelería',
      quantity: 75,
      price: 1800,
      category: 'Hielo Comercial',
      imageUrl: '/placeholder.svg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];
};

export const useInventory = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventoryItems,
  });
  
  return {
    data,
    isLoading,
    isError,
    error
  };
};
