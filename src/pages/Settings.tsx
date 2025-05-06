
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserSettings from '@/components/settings/UserSettings';
import CompanySettings from '@/components/settings/CompanySettings';
import SystemSettings from '@/components/settings/SystemSettings';

const Settings: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configuración</h1>
      </div>

      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="user">Usuario</TabsTrigger>
          <TabsTrigger value="company">Empresa</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Usuario</CardTitle>
              <CardDescription>
                Administre su perfil y preferencias personales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserSettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Empresa</CardTitle>
              <CardDescription>
                Gestione la información de su empresa y configuraciones comerciales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompanySettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>
                Configure los parámetros generales del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SystemSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
