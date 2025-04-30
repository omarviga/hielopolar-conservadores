import React from 'react';
import { Button } from '@/components/ui/button';
import { ScanLineIcon } from 'lucide-react';

export default function QRCodesPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Códigos QR</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            <ScanLineIcon className="h-4 w-4 mr-2" />
            Escanear Código
          </Button>
        </div>
      </div>

      <div>Item Codes will go here</div>
      <div>Code Scanner will go here</div>
    </div>
  );
}