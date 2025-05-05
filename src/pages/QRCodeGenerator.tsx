
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeGenerator } from '@/components/qr/QRCodeGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetQRCode } from '@/components/qr/AssetQRCode';
import { ClientQRCode } from '@/components/qr/ClientQRCode';
import { ServiceOrderQRCode } from '@/components/qr/ServiceOrderQRCode';

const QRCodeGeneratorPage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Generador de Códigos QR</h1>
      
      <Tabs defaultValue="custom">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="custom">Personalizado</TabsTrigger>
          <TabsTrigger value="assets">Activos</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="orders">Órdenes de Servicio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="custom">
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
        </TabsContent>
        
        <TabsContent value="assets">
          <Card>
            <CardHeader>
              <CardTitle>QR para Activos</CardTitle>
              <CardDescription>
                Genere códigos QR para sus activos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssetQRCode />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>QR para Clientes</CardTitle>
              <CardDescription>
                Genere códigos QR con información de clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClientQRCode />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>QR para Órdenes de Servicio</CardTitle>
              <CardDescription>
                Genere códigos QR para órdenes de servicio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceOrderQRCode />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QRCodeGeneratorPage;
