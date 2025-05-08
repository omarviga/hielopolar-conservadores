
import React from 'react';
import QRCode from 'qrcode.react';
import { Client } from '../ClientCard';

interface ClientQRProps {
  client: Client;
}

const ClientQR: React.FC<ClientQRProps> = ({ client }) => {
  const qrCodeData = `
    ID: ${client.id}
    Name: ${client.name}
    Contact: ${client.contactPerson}
    Phone: ${client.phone}
    Email: ${client.email}
    Address: ${client.address}
    Status: ${client.status}
  `;

  return (
    <QRCode value={qrCodeData} size={256} level="H" />
  );
};

export default ClientQR;
