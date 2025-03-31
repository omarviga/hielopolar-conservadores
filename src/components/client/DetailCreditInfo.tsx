
import React from 'react';
import { Client } from './ClientInterface';

interface DetailCreditInfoProps {
  client: Client;
}

const DetailCreditInfo: React.FC<DetailCreditInfoProps> = ({ client }) => {
  const creditPercentage = (client.activeCredit / client.maxCredit) * 100;
  const creditStatus = 
    creditPercentage < 50 ? 'bg-green-500' :
    creditPercentage < 80 ? 'bg-yellow-500' :
    'bg-red-500';

  return (
    <div>
      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Límite de crédito</h4>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${creditStatus}`}
          style={{ width: `${creditPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>0</span>
        <span>{client.activeCredit} utilizados</span>
        <span>Máximo: {client.maxCredit}</span>
      </div>
    </div>
  );
};

export default DetailCreditInfo;
