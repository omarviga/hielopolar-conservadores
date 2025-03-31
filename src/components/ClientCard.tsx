
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useClients } from '@/hooks/useClients';
import { Client } from './client/ClientInterface';
import ClientHeader from './client/ClientHeader';
import ContactInfo from './client/ContactInfo';
import CreditProgress from './client/CreditProgress';
import ClientActions from './client/ClientActions';
import ClientDetailHeader from './client/ClientDetailHeader';
import DetailContactInfo from './client/DetailContactInfo';
import DetailLocationInfo from './client/DetailLocationInfo';
import DetailBusinessInfo from './client/DetailBusinessInfo';
import DetailCreditInfo from './client/DetailCreditInfo';
import ClientDetailActions from './client/ClientDetailActions';

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { updateClient } = useClients();
  
  const toggleClientStatus = () => {
    const newStatus = client.status === 'active' ? 'inactive' : 'active';
    updateClient(client.id, { status: newStatus });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden card-hover">
        <div className="p-4 border-b">
          <ClientHeader client={client} />
        </div>
        
        <div className="p-4">
          <ContactInfo client={client} />
          <CreditProgress client={client} />
          <ClientActions onShowDetails={() => setShowDetails(true)} />
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
          </DialogHeader>
          
          <ClientDetailHeader client={client} onToggleStatus={toggleClientStatus} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <DetailContactInfo client={client} />
            <DetailLocationInfo client={client} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <DetailBusinessInfo client={client} />
            <DetailCreditInfo client={client} />
          </div>
          
          <ClientDetailActions onClose={() => setShowDetails(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientCard;
