
import React from 'react';
import { ConservadorFormValues } from './ConservadorFormSchema';

interface LocationFieldsProps {
  ubicacion: string;
  onChange: (field: keyof ConservadorFormValues, value: string) => void;
  disabled?: boolean;
}

const LocationFields: React.FC<LocationFieldsProps> = ({ 
  ubicacion, 
  onChange,
  disabled = false
}) => {
  return (
    <div className="form-group">
      <label className="mb-1 block font-medium text-gray-700">
        Ubicación
      </label>
      <input
        type="text"
        value={ubicacion}
        onChange={(e) => onChange('ubicacion', e.target.value)}
        className="w-full rounded-md border p-2"
        placeholder="Ubicación del conservador"
        disabled={disabled}
      />
    </div>
  );
};

export default LocationFields;
