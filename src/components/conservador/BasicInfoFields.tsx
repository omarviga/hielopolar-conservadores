
import React from 'react';
import { ConservadorFormValues } from './ConservadorFormSchema';

interface BasicInfoFieldsProps {
  formData: {
    numero_serie: string;
    modelo: string;
    estado_conservador: string;
  };
  onChange: (field: keyof ConservadorFormValues, value: string) => void;
  disabled?: boolean;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ 
  formData, 
  onChange,
  disabled = false
}) => {
  return (
    <>
      {/* Número de Serie */}
      <div className="form-group">
        <label className="mb-1 block font-medium text-gray-700">
          Número de Serie *
        </label>
        <input
          type="text"
          required
          value={formData.numero_serie}
          onChange={(e) => onChange('numero_serie', e.target.value.trim())}
          className="w-full rounded-md border p-2"
          placeholder="Ingrese el número de serie"
          disabled={disabled}
        />
      </div>

      {/* Modelo */}
      <div className="form-group">
        <label className="mb-1 block font-medium text-gray-700">
          Modelo *
        </label>
        <input
          type="text"
          required
          value={formData.modelo}
          onChange={(e) => onChange('modelo', e.target.value)}
          className="w-full rounded-md border p-2"
          placeholder="Ingrese el modelo"
          disabled={disabled}
        />
      </div>

      {/* Estado del Conservador */}
      <div className="form-group">
        <label className="mb-1 block font-medium text-gray-700">
          Estado del Conservador *
        </label>
        <select
          required
          value={formData.estado_conservador}
          onChange={(e) => onChange('estado_conservador', e.target.value)}
          className="w-full rounded-md border p-2"
          disabled={disabled}
        >
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
        </select>
      </div>
    </>
  );
};

export default BasicInfoFields;
