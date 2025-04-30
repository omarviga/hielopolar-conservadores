import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { useInventory } from '@/hooks/useInventory';
import { columns } from '@/components/inventory/columns';

const Inventory = () => {
  const { data: inventory, isLoading } = useInventory();

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Item
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <DataTable 
          columns={columns} 
          data={inventory || []} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Inventory;