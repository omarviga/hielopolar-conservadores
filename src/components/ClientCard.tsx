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
import EditClientForm from './client/EditClientForm';
import { ClientFormValues } from './client/ClientFormSchema';

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { updateClient } = useClients();

  const toggleClientStatus = () => {
    const newStatus = client.status === 'active' ? 'inactive' : 'active';
    updateClient(client.id, { status: newStatus });
  };

  const handleEditSubmit = (values: ClientFormValues) => {
    updateClient(client.id, {
      ...values,
      conserver: values.conserver, // Actualizar el conservador asignado
    });
    setShowEditForm(false);
  };

  if (showEditForm) {
    return (
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          <EditClientForm
            client={client}
            onSubmit={handleEditSubmit}
            onCancel={() => setShowEditForm(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden card-hover">
        <div className="p-4 border-b">
          <ClientHeader client={client} />
        </div>

        <div className="p-4">
          <ContactInfo client={client} />
          <CreditProgress client={client} />
          <div className="text-sm text-gray-500 mb-2">
            <strong>Conservador asignado:</strong> {client.conserver || 'No asignado'}
          </div>
          <ClientActions
            onShowDetails={() => setShowDetails(true)}
            onEdit={() => setShowEditForm(true)}
            client={client}
          />
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

          <ClientDetailActions
            onClose={() => setShowDetails(false)}
            onEdit={() => {
              setShowDetails(false);
              setShowEditForm(true);
            }}
            client={client}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientCard;