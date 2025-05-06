
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Client } from '@/components/ClientCard';
import { Asset } from '@/components/AssetCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QrCode, Link } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ClientAssetQRProps {
  client?: Client;
  asset?: Asset;
  pointOfSaleUrl?: string;
}

const ClientAssetQR: React.FC<ClientAssetQRProps> = ({ 
  client, 
  asset, 
  pointOfSaleUrl = "https://odoo.example.com/pos" 
}) => {
  const qrData = React.useMemo(() => {
    const data: any = {};
    
    if (client) {
      data.clientId = client.id;
      data.clientName = client.name;
      data.contactPerson = client.contactPerson;
      data.phone = client.phone;
      data.email = client.email;
    }
    
    if (asset) {
      data.assetId = asset.id;
      data.assetModel = asset.model;
      data.serialNumber = asset.serialNumber;
      data.location = asset.location;
    }
    
    // Agregar URL de punto de venta
    data.posUrl = `${pointOfSaleUrl}${client ? `?client_id=${client.id}` : ''}`;
    
    return JSON.stringify(data);
  }, [client, asset, pointOfSaleUrl]);
  
  const handleDownloadQR = () => {
    const canvas = document.getElementById('client-asset-qr') as HTMLCanvasElement;
    if (!canvas) return;
    
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-${client?.id || ''}-${asset?.id || ''}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    toast({
      title: "Código QR descargado",
      description: "El código QR ha sido descargado correctamente.",
    });
  };
  
  const handleCopyLink = () => {
    const url = `${pointOfSaleUrl}${client ? `?client_id=${client.id}` : ''}`;
    navigator.clipboard.writeText(url);
    
    toast({
      title: "Enlace copiado",
      description: "El enlace del punto de venta ha sido copiado al portapapeles.",
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-polar-600 hover:bg-polar-700">
          <QrCode className="h-4 w-4 mr-2" />
          Generar Código QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Código QR - {client?.name || ''} {asset ? `(${asset.id})` : ''}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4">
          <div className="bg-white p-4 rounded-lg shadow-inner">
            <QRCodeSVG
              id="client-asset-qr"
              value={qrData}
              size={250}
              level="H" // Alta corrección de errores
              includeMargin={true}
            />
          </div>
          
          <div className="mt-6 text-sm text-gray-600">
            {client && (
              <p><strong>Cliente:</strong> {client.name}</p>
            )}
            {asset && (
              <p><strong>Conservador:</strong> {asset.model} ({asset.id})</p>
            )}
            <p className="mt-2">
              <strong>URL de destino:</strong> {pointOfSaleUrl}{client ? `?client_id=${client.id}` : ''}
            </p>
          </div>
          
          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={handleCopyLink}>
              <Link className="h-4 w-4 mr-2" />
              Copiar Enlace
            </Button>
            <Button className="bg-polar-600 hover:bg-polar-700" onClick={handleDownloadQR}>
              <QrCode className="h-4 w-4 mr-2" />
              Descargar QR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientAssetQR;
