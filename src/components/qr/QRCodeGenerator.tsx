
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export const QRCodeGenerator = () => {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [fgColor, setFgColor] = useState('#000000');
  const [level, setLevel] = useState('M');

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="content">Contenido del QR</Label>
          <Textarea
            id="content"
            placeholder="Ingrese texto o URL"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Tamaño: {size}px</Label>
          <Slider 
            value={[size]} 
            min={100} 
            max={400} 
            step={10}
            onValueChange={(value) => setSize(value[0])} 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bgColor">Color de Fondo</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="bgColor"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fgColor">Color del QR</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="fgColor"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Nivel de corrección de errores</Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger id="level">
              <SelectValue placeholder="Nivel de corrección" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Bajo (7%)</SelectItem>
              <SelectItem value="M">Medio (15%)</SelectItem>
              <SelectItem value="Q">Cuartil (25%)</SelectItem>
              <SelectItem value="H">Alto (30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full" 
          onClick={downloadQRCode}
        >
          <Download className="mr-2 h-4 w-4" /> Descargar QR
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Card className="p-6 flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <QRCodeCanvas
            id="qr-code"
            value={text || 'https://example.com'}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={level as "L" | "M" | "Q" | "H"}
            includeMargin={true}
          />
        </Card>
        <p className="mt-4 text-sm text-center text-muted-foreground">
          Escanea con cualquier aplicación de lector QR
        </p>
      </div>
    </div>
  );
};
