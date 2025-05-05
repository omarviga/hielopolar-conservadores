
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import { Card } from '@/components/ui/card';
import { useClients } from '@/hooks/useClients';

export const ClientQRCode = () => {
  const { clients, loading } = useClients();
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const selectedClient = clients.find(client => client.id === selectedClientId);
  
  const qrValue = selectedClient 
    ? JSON.stringify({
        type: 'client',
        id: selectedClient.id,
        name: selectedClient.name,
        contactPerson: selectedClient.contactPerson,
        email: selectedClient.email
      })
    : '';
  
  const downloadQRCode = () => {
    if (!selectedClient) return;
    
    const canvas = document.getElementById(`client-qr-${selectedClientId}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `client-qr-${selectedClient.name.replace(/\s+/g, '-')}.png`;
      link.href = url;
      link.click();
    }
  };
  
  if (loading) {
    return <div>Cargando clientes...</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Seleccionar Cliente</label>
          <Select onValueChange={(value) => setSelectedClientId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedClient && (
          <div className="space-y-4">
            <h3 className="font-semibold">Información del Cliente</h3>
            
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Nombre:</p>
                <p>{selectedClient.name}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Contacto:</p>
                <p>{selectedClient.contactPerson || 'No especificado'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Correo electrónico:</p>
                <p>{selectedClient.email || 'No especificado'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Teléfono:</p>
                <p>{selectedClient.phone || 'No especificado'}</p>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={downloadQRCode}
              disabled={!selectedClient}
            >
              <Download className="mr-2 h-4 w-4" /> Descargar QR
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center">
        {selectedClient ? (
          <>
            <Card className="p-6 flex items-center justify-center">
              <QRCodeCanvas
                id={`client-qr-${selectedClientId}`}
                value={qrValue}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
                includeMargin={true}
              />
            </Card>
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Escanea para ver información del cliente
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <QrCode size={100} className="mb-4 opacity-20" />
            <p>Seleccione un cliente para generar su código QR</p>
          </div>
        )}
      </div>
    </div>
  );
};
