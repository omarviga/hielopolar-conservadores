import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export default function InventoryPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nuevo Item
        </Button>
      </div>

      <div>Inventory Manager Coming Soon...</div>
    </div>
  );
}