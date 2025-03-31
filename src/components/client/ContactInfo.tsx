
import React from 'react';
import { User, Phone, MapPin, Package } from 'lucide-react';
import { Client } from './ClientInterface';

interface ContactInfoProps {
  client: Client;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ client }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center text-sm">
        <User className="h-4 w-4 mr-2 text-polar-600" />
        <span>Contacto: {client.contactPerson}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <Phone className="h-4 w-4 mr-2 text-polar-600" />
        <span>{client.phone}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <MapPin className="h-4 w-4 mr-2 text-polar-600" />
        <span>{client.address}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <Package className="h-4 w-4 mr-2 text-polar-600" />
        <span>Conservadores Asignados: {client.assetsAssigned}</span>
      </div>
    </div>
  );
};

export default ContactInfo;
