
import React from 'react';
import { Client } from './ClientInterface';

interface CreditProgressProps {
  client: Client;
}

const CreditProgress: React.FC<CreditProgressProps> = ({ client }) => {
  const creditPercentage = (client.activeCredit / client.maxCredit) * 100;
  const creditStatus = 
    creditPercentage < 50 ? 'bg-green-500' :
    creditPercentage < 80 ? 'bg-yellow-500' :
    'bg-red-500';

  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm">
        <span>Límite de Crédito</span>
        <span>{client.activeCredit} / {client.maxCredit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
        <div 
          className={`h-2 rounded-full ${creditStatus}`}
          style={{ width: `${creditPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CreditProgress;
