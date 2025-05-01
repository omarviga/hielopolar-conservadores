
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, User, Bell, Shield, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Configuración</h1>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 space-y-6">
            <Card>
              <CardContent className="p-3">
                <TabsList className="flex flex-col h-auto bg-transparent gap-1">
                  <TabsTrigger value="general" className="justify-start w-full">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="account" className="justify-start w-full">
                    <User className="h-4 w-4 mr-2" />
                    Cuenta
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Notificaciones
                  </TabsTrigger>
                  <TabsTrigger value="security" className="justify-start w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Seguridad
                  </TabsTrigger>
                  <TabsTrigger value="database" className="justify-start w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Base de Datos
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1 space-y-6">
            <TabsContent value="general" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Ajustes Generales</CardTitle>
                  <CardDescription>Configuración básica de la aplicación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="company-name">Nombre de la Empresa</Label>
                      <Input id="company-name" defaultValue="Hielo Polar" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="contact-email">Email de Contacto</Label>
                      <Input id="contact-email" type="email" defaultValue="contacto@hielopolar.cl" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Modo Oscuro</p>
                        <p className="text-sm text-muted-foreground">
                          Cambiar entre tema claro y oscuro
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Idioma</p>
                        <p className="text-sm text-muted-foreground">
                          Seleccione el idioma de la aplicación
                        </p>
                      </div>
                      <select className="px-2 py-1 border rounded">
                        <option>Español</option>
                        <option>English</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Guardar Cambios</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Cuenta</CardTitle>
                  <CardDescription>Administre su cuenta de usuario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="username">Nombre de Usuario</Label>
                      <Input id="username" defaultValue="admin" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="full-name">Nombre Completo</Label>
                      <Input id="full-name" defaultValue="Administrador Sistema" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="admin@hielopolar.cl" />
                    </div>
                    
                    <Separator />
                    
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">Nueva Contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Actualizar Cuenta</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                  <CardDescription>Gestione cómo desea recibir notificaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificaciones por Email</p>
                        <p className="text-sm text-muted-foreground">
                          Recibir alertas por correo electrónico
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificaciones en la Aplicación</p>
                        <p className="text-sm text-muted-foreground">
                          Mostrar alertas dentro de la plataforma
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Alertas de Mantenimiento</p>
                        <p className="text-sm text-muted-foreground">
                          Recibir recordatorios de mantenimientos programados
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="grid gap-2">
                      <Label htmlFor="notification-email">Email para Notificaciones</Label>
                      <Input id="notification-email" type="email" defaultValue="alertas@hielopolar.cl" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Guardar Preferencias</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Seguridad</CardTitle>
                  <CardDescription>Ajuste la seguridad de su cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Autenticación de Dos Factores</p>
                        <p className="text-sm text-muted-foreground">
                          Añadir una capa extra de seguridad a su cuenta
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sesiones Activas</p>
                        <p className="text-sm text-muted-foreground">
                          Ver y gestionar las sesiones activas
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Ver</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Historial de Inicio de Sesión</p>
                        <p className="text-sm text-muted-foreground">
                          Ver inicios de sesión recientes
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Ver Historial</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-2">
                      <Button variant="destructive">Cerrar todas las sesiones</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="database" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Administración de Datos</CardTitle>
                  <CardDescription>Gestione la base de datos del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Copia de Seguridad</p>
                        <p className="text-sm text-muted-foreground">
                          Generar una copia de seguridad de los datos
                        </p>
                      </div>
                      <Button variant="outline">Crear Backup</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Importar Datos</p>
                        <p className="text-sm text-muted-foreground">
                          Cargar datos desde un archivo externo
                        </p>
                      </div>
                      <Button variant="outline">Importar</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Exportar Datos</p>
                        <p className="text-sm text-muted-foreground">
                          Descargar datos en formato CSV o Excel
                        </p>
                      </div>
                      <Button variant="outline">Exportar</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-2">
                      <Button variant="destructive">
                        Restablecer a valores predeterminados
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
