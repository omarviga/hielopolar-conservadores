
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from '@/components/ui/card';
import { useAssets } from '@/hooks/useAssets';

export const AssetQRCode = () => {
  const { assets, loading } = useAssets();
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const selectedAsset = assets.find(asset => asset.id === selectedAssetId);
  
  const qrValue = selectedAsset 
    ? JSON.stringify({
        type: 'asset',
        id: selectedAsset.id,
        model: selectedAsset.model,
        serialNumber: selectedAsset.serialNumber,
        status: selectedAsset.status
      })
    : '';
  
  const downloadQRCode = () => {
    if (!selectedAsset) return;
    
    const canvas = document.getElementById(`asset-qr-${selectedAssetId}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `asset-qr-${selectedAsset.model}-${selectedAsset.serialNumber || 'noSN'}.png`;
      link.href = url;
      link.click();
    }
  };
  
  if (loading) {
    return <div>Cargando activos...</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Seleccionar Activo</label>
          <Select onValueChange={(value) => setSelectedAssetId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un activo" />
            </SelectTrigger>
            <SelectContent>
              {assets.map((asset) => (
                <SelectItem key={asset.id} value={asset.id}>
                  {asset.model} {asset.serialNumber ? `(${asset.serialNumber})` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedAsset && (
          <div className="space-y-4">
            <h3 className="font-semibold">Información del Activo</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Modelo:</p>
                <p>{selectedAsset.model}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Número de Serie:</p>
                <p>{selectedAsset.serialNumber || 'No especificado'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Estado:</p>
                <Badge>{selectedAsset.status}</Badge>
              </div>
              
              {selectedAsset.assignedTo && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Asignado a:</p>
                  <p>{selectedAsset.assignedTo}</p>
                </div>
              )}
            </div>
            
            <Button 
              className="w-full" 
              onClick={downloadQRCode}
              disabled={!selectedAsset}
            >
              <Download className="mr-2 h-4 w-4" /> Descargar QR
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center">
        {selectedAsset ? (
          <>
            <Card className="p-6 flex items-center justify-center">
              <QRCodeCanvas
                id={`asset-qr-${selectedAssetId}`}
                value={qrValue}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
                includeMargin={true}
              />
            </Card>
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Escanea para ver información del activo
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <QrCode size={100} className="mb-4 opacity-20" />
            <p>Seleccione un activo para generar su código QR</p>
          </div>
        )}
      </div>
    </div>
  );
};
