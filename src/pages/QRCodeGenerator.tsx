
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeGenerator } from '@/components/qr/QRCodeGenerator';

const QRCodeGeneratorPage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Generador de Códigos QR</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>QR Personalizado</CardTitle>
          <CardDescription>
            Genere un código QR con información personalizada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QRCodeGenerator />
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGeneratorPage;
