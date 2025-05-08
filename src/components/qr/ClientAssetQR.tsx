import React from 'react';
import { QRCode } from 'qrcode.react';
import { Asset } from '@/types/Asset';

interface ClientAssetQRProps {
  asset: Asset;
}

const ClientAssetQR: React.FC<ClientAssetQRProps> = ({ asset }) => {
  const qrCodeData = `
    ID: ${asset.id}
    Model: ${asset.model}
    Serial Number: ${asset.serialNumber}
    Status: ${asset.status}
    Location: ${asset.location}
    Last Maintenance: ${asset.lastMaintenance}
    Capacity: ${asset.capacity}
    Temperature Range: ${asset.temperatureRange}
    ${asset.assignedTo ? `Assigned To: ${asset.assignedTo}` : ''}
  `;

  return (
    <QRCode value={qrCodeData} size={256} level="H" />
  );
};

export default ClientAssetQR;
