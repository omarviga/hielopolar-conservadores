
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from '@/components/ui/card';
import { useOrdersQuery } from '@/hooks/orders/queries';
import { format } from 'date-fns';

export const ServiceOrderQRCode = () => {
  const { orders, isLoading } = useOrdersQuery();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedOrder = orders.find(order => order.id === selectedOrderId);
  
  const qrValue = selectedOrder 
    ? JSON.stringify({
        type: 'service_order',
        id: selectedOrder.id,
        order_number: selectedOrder.order_number,
        client_name: selectedOrder.client_name,
        status: selectedOrder.status,
        service_type: selectedOrder.service_type
      })
    : '';
  
  const downloadQRCode = () => {
    if (!selectedOrder) return;
    
    const canvas = document.getElementById(`order-qr-${selectedOrderId}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `order-qr-${selectedOrder.order_number}.png`;
      link.href = url;
      link.click();
    }
  };
  
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'en_proceso': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completado': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelado': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };
  
  if (isLoading) {
    return <div>Cargando órdenes...</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Seleccionar Orden de Servicio</label>
          <Select onValueChange={(value) => setSelectedOrderId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una orden" />
            </SelectTrigger>
            <SelectContent>
              {orders.map((order) => (
                <SelectItem key={order.id} value={order.id}>
                  {order.order_number} - {order.client_name || 'Cliente no especificado'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedOrder && (
          <div className="space-y-4">
            <h3 className="font-semibold">Información de la Orden</h3>
            
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Número de Orden:</p>
                <p>{selectedOrder.order_number}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Cliente:</p>
                <p>{selectedOrder.client_name || 'No especificado'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Fecha de Creación:</p>
                <p>{format(new Date(selectedOrder.created_at), 'dd/MM/yyyy')}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Estado:</p>
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status}
                </Badge>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={downloadQRCode}
              disabled={!selectedOrder}
            >
              <Download className="mr-2 h-4 w-4" /> Descargar QR
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center">
        {selectedOrder ? (
          <>
            <Card className="p-6 flex items-center justify-center">
              <QRCodeCanvas
                id={`order-qr-${selectedOrderId}`}
                value={qrValue}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
                includeMargin={true}
              />
            </Card>
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Escanea para ver información de la orden
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <QrCode size={100} className="mb-4 opacity-20" />
            <p>Seleccione una orden para generar su código QR</p>
          </div>
        )}
      </div>
    </div>
  );
};
