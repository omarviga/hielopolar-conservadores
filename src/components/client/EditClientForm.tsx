import React, { useState } from 'react';
import { ClientFormValues } from './ClientFormSchema';

interface EditClientFormProps {
  client: ClientFormValues;
  onSubmit: (values: ClientFormValues) => void;
  onCancel: () => void;
}

const EditClientForm: React.FC<EditClientFormProps> = ({ client, onSubmit, onCancel }) => {
  const [formValues, setFormValues] = useState<ClientFormValues>(client);

  const handleChange = (field: keyof ClientFormValues, value: string | number) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues); // Enviar los datos al componente padre
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={formValues.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Nombre"
        />
      </div>
      <div>
        <label>Correo Electrónico</label>
        <input
          type="email"
          value={formValues.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Correo Electrónico"
        />
      </div>
      <div>
        <label>Conservador</label>
        <input
          type="text"
          value={formValues.conserver || ''}
          onChange={(e) => handleChange('conserver', e.target.value)}
          placeholder="Conservador"
        />
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default EditClientForm;