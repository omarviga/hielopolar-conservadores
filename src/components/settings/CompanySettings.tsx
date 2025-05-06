import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const CompanySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Facturación</TabsTrigger>
          <TabsTrigger value="branding">Imagen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
              <CardDescription>
                Datos generales de su empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input id="companyName" defaultValue="Friotécnica S.A." />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rut">RUT</Label>
                  <Input id="rut" defaultValue="12.345.678-9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue="+56 2 2345 6789" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue="contacto@friotecnica.cl" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Textarea id="address" defaultValue="Av. Providencia 1234, Providencia, Santiago" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" defaultValue="Santiago" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Región</Label>
                  <Input id="state" defaultValue="Metropolitana" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Código Postal</Label>
                  <Input id="zip" defaultValue="7500000" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Horarios de Atención</CardTitle>
              <CardDescription>
                Configure los horarios de funcionamiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Días Laborales</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="monday" defaultChecked />
                      <Label htmlFor="monday">Lunes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="tuesday" defaultChecked />
                      <Label htmlFor="tuesday">Martes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="wednesday" defaultChecked />
                      <Label htmlFor="wednesday">Miércoles</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="thursday" defaultChecked />
                      <Label htmlFor="thursday">Jueves</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="friday" defaultChecked />
                      <Label htmlFor="friday">Viernes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="saturday" />
                      <Label htmlFor="saturday">Sábado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sunday" />
                      <Label htmlFor="sunday">Domingo</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="openTime">Hora Apertura</Label>
                      <Input id="openTime" type="time" defaultValue="08:30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="closeTime">Hora Cierre</Label>
                      <Input id="closeTime" type="time" defaultValue="18:00" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="holidaysClosed" defaultChecked />
                    <Label htmlFor="holidaysClosed">Cerrado en Días Festivos</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Horarios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de Facturación</CardTitle>
              <CardDescription>
                Detalles para facturación y documentos tributarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taxId">RUT Facturación</Label>
                <Input id="taxId" defaultValue="12.345.678-9" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invoicePrefix">Prefijo para Facturación</Label>
                <Input id="invoicePrefix" defaultValue="FT-" />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tasa de IVA (%)</Label>
                <Input id="taxRate" type="number" defaultValue="19" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda</Label>
                <Select defaultValue="CLP">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLP">Peso Chileno (CLP)</SelectItem>
                    <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
              <CardDescription>
                Configure los métodos de pago aceptados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transferencia Bancaria</p>
                  <p className="text-sm text-muted-foreground">
                    Aceptar pagos mediante transferencia bancaria
                  </p>
                </div>
                <Switch id="bankTransfer" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tarjeta de Crédito/Débito</p>
                  <p className="text-sm text-muted-foreground">
                    Aceptar pagos con tarjeta
                  </p>
                </div>
                <Switch id="creditCard" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Efectivo</p>
                  <p className="text-sm text-muted-foreground">
                    Aceptar pagos en efectivo
                  </p>
                </div>
                <Switch id="cash" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Preferencias</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Imagen Corporativa</CardTitle>
              <CardDescription>
                Personalice la imagen de su empresa en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-32 w-32 rounded border flex items-center justify-center bg-muted">
                    <img src="/placeholder.svg" alt="Logo" className="h-24 w-24" />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline">Cambiar Logo</Button>
                    <p className="text-sm text-muted-foreground">
                      Recomendado: PNG o SVG, máx. 2MB
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label>Colores Corporativos</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Color Primario</Label>
                    <div className="flex">
                      <Input id="primaryColor" defaultValue="#0066cc" />
                      <div className="h-10 w-10 rounded-r border border-l-0" style={{ backgroundColor: "#0066cc" }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Color Secundario</Label>
                    <div className="flex">
                      <Input id="secondaryColor" defaultValue="#ff9900" />
                      <div className="h-10 w-10 rounded-r border border-l-0" style={{ backgroundColor: "#ff9900" }} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanySettings;
