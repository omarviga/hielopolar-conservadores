import React from 'react';
import { Button } from '@/components/ui/button';
import { useInventory } from '@/hooks/useInventory';
import QRCode from 'qrcode.react';

const QRCodesPage = () => {
  const { data: inventory, isLoading } = useInventory();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Códigos QR</h1>
        <Button>Imprimir Todos</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory?.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <QRCode value={`item:${item.id}`} size={200} />
            <div className="mt-2 text-center">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.part_number}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRCodesPage;