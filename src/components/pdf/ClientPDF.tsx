import React, { useRef } from 'react';
import { Client } from '../ClientCard';
import { Button } from '@/components/ui/button';
import { Download, Printer, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from '@/components/ui/use-toast';

interface ClientPDFProps {
  client: Client;
  label?: string;
}

const ClientPDF: React.FC<ClientPDFProps> = ({ client, label = "Descargar PDF" }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (targetRef.current) {
      try {
        toast({
          title: "Generando PDF",
          description: "Por favor espere mientras se genera el PDF...",
        });

        const canvas = await html2canvas(targetRef.current, {
          scale: 2,
          logging: false,
          useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`cliente-${client.id}.pdf`);

        toast({
          title: "PDF generado correctamente",
          description: `El expediente de ${client.name} ha sido descargado.`,
        });
      } catch (error) {
        console.error('Error generando PDF:', error);
        toast({
          title: "Error al generar PDF",
          description: "Ocurrió un error al generar el PDF. Por favor intente nuevamente.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div>
      <div className="hidden">
        <div ref={targetRef} className="p-6 bg-white">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Expediente de Cliente</h1>
            <p className="text-gray-500">ID: {client.id}</p>
            {client.imageSrc && (
              <div className="flex justify-center my-4">
                <img
                  src={client.imageSrc}
                  alt={client.name}
                  crossOrigin="anonymous"
                  style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-lg border-b pb-2 mb-2">Información General</h2>
            <div className="grid grid-cols-2 gap-2">
              <p><span className="font-medium">Nombre:</span> {client.name}</p>
              <p><span className="font-medium">Estado:</span> {client.status === 'active' ? 'Activo' : 'Inactivo'}</p>
              <p><span className="font-medium">Contacto:</span> {client.contactPerson}</p>
              <p><span className="font-medium">Email:</span> {client.email}</p>
              <p><span className="font-medium">Teléfono:</span> {client.phone}</p>
              <p><span className="font-medium">Dirección:</span> {client.address}</p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-lg border-b pb-2 mb-2">Conservadores</h2>
            <p><span className="font-medium">Conservadores Asignados:</span> {client.assetsAssigned}</p>
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-lg border-b pb-2 mb-2">Información de Crédito</h2>
            <p><span className="font-medium">Límite de Crédito:</span> {client.maxCredit}</p>
            <p><span className="font-medium">Crédito Activo:</span> {client.activeCredit}</p>
            <p><span className="font-medium">Porcentaje Utilizado:</span> {((client.activeCredit / client.maxCredit) * 100).toFixed(2)}%</p>
          </div>

          <div className="mt-12 text-sm text-center text-gray-500">
            <p>Documento generado el {new Date().toLocaleDateString()} a las {new Date().toLocaleTimeString()}</p>
            <p>Hielo Polar - Sistema de Gestión de Conservadores</p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" /> {label}
      </Button>
    </div>
  );
};

export default ClientPDF;
