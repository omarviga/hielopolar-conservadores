
import React from 'react';
import { useClienteData } from './conservador/useClienteData';
import { useConservadorForm } from './conservador/useConservadorForm';
import AlertMessage from './conservador/AlertMessage';
import ClienteSelect from './conservador/ClienteSelect';
import BasicInfoFields from './conservador/BasicInfoFields';
import LocationFields from './conservador/LocationFields';
import NotesField from './conservador/NotesField';
import FormButtons from './conservador/FormButtons';

export function RegistroConservador() {
  const { clientes, cargarClientes } = useClienteData();
  const {
    formData,
    mensaje,
    isSubmitting,
    error,
    handleChange,
    resetForm,
    submitForm
  } = useConservadorForm();

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h2 className="mb-6 text-2xl font-bold">Registro de Conservador</h2>

      {error && <AlertMessage type="error" message={error} />}

      <form onSubmit={submitForm} className="space-y-4">
        <BasicInfoFields 
          formData={formData} 
          onChange={handleChange} 
          disabled={isSubmitting}
        />

        <ClienteSelect 
          clientes={clientes}
          value={formData.cliente_id}
          onChange={(value) => handleChange('cliente_id', value)}
          onReload={cargarClientes}
          disabled={isSubmitting}
        />

        <LocationFields 
          ubicacion={formData.ubicacion} 
          onChange={handleChange} 
          disabled={isSubmitting}
        />

        <NotesField 
          notas={formData.notas} 
          onChange={handleChange} 
          disabled={isSubmitting}
        />

        {mensaje && <AlertMessage type="success" message={mensaje} />}

        <FormButtons onReset={resetForm} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
