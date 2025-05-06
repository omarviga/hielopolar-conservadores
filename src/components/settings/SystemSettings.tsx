
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const SystemSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferencias Generales</CardTitle>
          <CardDescription>
            Configure las preferencias generales del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Idioma</Label>
            <Select defaultValue="es">
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateFormat">Formato de Fecha</Label>
            <Select defaultValue="DD/MM/YYYY">
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeFormat">Formato de Hora</Label>
            <Select defaultValue="24h">
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 horas</SelectItem>
                <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeZone">Zona Horaria</Label>
            <Select defaultValue="America/Santiago">
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una zona horaria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Santiago">Santiago (GMT-3)</SelectItem>
                <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Tema Oscuro</p>
              <p className="text-sm text-muted-foreground">
                Activar modo oscuro en la interfaz
              </p>
            </div>
            <Switch id="darkTheme" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Guardar Preferencias</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones del Sistema</CardTitle>
          <CardDescription>
            Configure cómo se envían las notificaciones del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Mantenimiento</p>
              <p className="text-sm text-muted-foreground">
                Notificar sobre mantenimientos próximos
              </p>
            </div>
            <Switch id="maintenanceAlerts" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Stock</p>
              <p className="text-sm text-muted-foreground">
                Notificar cuando el inventario esté bajo
              </p>
            </div>
            <Switch id="stockAlerts" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificaciones de Sistema</p>
              <p className="text-sm text-muted-foreground">
                Alertas sobre actualizaciones y cambios en el sistema
              </p>
            </div>
            <Switch id="systemAlerts" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label htmlFor="alertDays">Días de Anticipación para Alertas</Label>
            <Input id="alertDays" type="number" defaultValue="3" min="1" max="30" />
            <p className="text-sm text-muted-foreground">
              Número de días antes para enviar alertas de eventos próximos
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Guardar Configuración</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Seguridad</CardTitle>
          <CardDescription>
            Configure las opciones de seguridad del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Autenticación de Dos Factores</p>
              <p className="text-sm text-muted-foreground">
                Requerir verificación adicional al iniciar sesión
              </p>
            </div>
            <Switch id="twoFactor" />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
            <Input id="sessionTimeout" type="number" defaultValue="30" min="5" max="240" />
            <p className="text-sm text-muted-foreground">
              Tiempo de inactividad antes de cerrar sesión automáticamente
            </p>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Registro de Actividad</p>
              <p className="text-sm text-muted-foreground">
                Guardar registro de actividades en el sistema
              </p>
            </div>
            <Switch id="activityLog" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Guardar Configuración</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Copias de Seguridad</CardTitle>
          <CardDescription>
            Configure y gestione copias de seguridad de sus datos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Copias Automáticas</p>
              <p className="text-sm text-muted-foreground">
                Realizar copias de seguridad automáticas
              </p>
            </div>
            <Switch id="autoBackup" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-2">
            <Label htmlFor="backupFrequency">Frecuencia de Copia</Label>
            <Select defaultValue="daily">
              <SelectTrigger>
                <SelectValue placeholder="Seleccione frecuencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Diaria</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="monthly">Mensual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backupRetention">Retención (días)</Label>
            <Input id="backupRetention" type="number" defaultValue="30" min="1" max="365" />
            <p className="text-sm text-muted-foreground">
              Número de días que se conservarán las copias de seguridad
            </p>
          </div>
          
          <div className="pt-4 flex flex-col gap-2">
            <Button variant="outline" className="w-full">Descargar Copia de Seguridad</Button>
            <Button variant="outline" className="w-full">Restaurar desde Copia</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Guardar Configuración</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SystemSettings;
