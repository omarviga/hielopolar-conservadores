
import React, { useState } from 'react';
import { useInventory } from '@/hooks/useInventory';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { saveAs } from 'file-saver';

const QRCodesPage = () => {
  const { data: inventory, isLoading } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory?.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.partNumber && item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const downloadQRCode = (id: string, name: string) => {
    const canvas = document.getElementById(`qr-${id}`) as HTMLCanvasElement;
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `qr-${name.replace(/\s+/g, '-').toLowerCase()}.png`);
      }
    });
  };

  if (isLoading) {
    return <div>Cargando códigos QR...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Códigos QR para Inventario</h1>
      </div>
      
      <div className="mb-6">
        <Input
          placeholder="Buscar por nombre, categoría o número de parte"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory?.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <QRCodeSVG
              id={`qr-${item.id}`}
              value={`item:${item.id}`}
              size={150}
              level="H"
              includeMargin={true}
            />
            <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.category}</p>
            <p className="text-sm text-muted-foreground">{item.partNumber || 'N/A'}</p>
            <Button 
              variant="outline" 
              onClick={() => downloadQRCode(item.id, item.name)}
              className="mt-4"
              size="sm"
            >
              Descargar QR
            </Button>
          </div>
        ))}
      </div>
      
      {filteredInventory && filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron elementos con esa búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default QRCodesPage;
