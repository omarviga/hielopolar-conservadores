
import React from 'react';
import { Client } from './ClientInterface';

interface DetailBusinessInfoProps {
  client: Client;
}

const DetailBusinessInfo: React.FC<DetailBusinessInfoProps> = ({ client }) => {
  const getChannelLabel = (channelType: 'tradicional' | 'moderno' | 'industrial') => {
    switch (channelType) {
      case 'tradicional':
        return 'Canal Tradicional';
      case 'moderno':
        return 'Canal Moderno';
      case 'industrial':
        return 'Canal Industrial';
      default:
        return 'No especificado';
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm text-muted-foreground">Información comercial</h4>
      
      <div className="flex items-center text-sm">
        <span className="font-medium">Canal comercial:</span>
        <span className="ml-2">{getChannelLabel(client.channelType)}</span>
      </div>
      
      <div className="flex items-center text-sm">
        <span className="font-medium">Productividad de conservador:</span>
        <span className="ml-2">{client.conserverProductivity}</span>
      </div>
    </div>
  );
};

export default DetailBusinessInfo;
