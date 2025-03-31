
import React from 'react';
import { User, Phone, Mail } from 'lucide-react';
import { Client } from './ClientInterface';

interface DetailContactInfoProps {
  client: Client;
}

const DetailContactInfo: React.FC<DetailContactInfoProps> = ({ client }) => {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm text-muted-foreground">Información de contacto</h4>
      
      <div className="flex items-center text-sm">
        <User className="h-4 w-4 mr-2 text-polar-600" />
        <span>{client.contactPerson}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <Phone className="h-4 w-4 mr-2 text-polar-600" />
        <span>{client.phone}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <Mail className="h-4 w-4 mr-2 text-polar-600" />
        <span>{client.email}</span>
      </div>
    </div>
  );
};

export default DetailContactInfo;
