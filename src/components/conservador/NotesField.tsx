
import React from 'react';
import { ConservadorFormValues } from './ConservadorFormSchema';

interface NotesFieldProps {
  notas: string;
  onChange: (field: keyof ConservadorFormValues, value: string) => void;
  disabled?: boolean;
}

const NotesField: React.FC<NotesFieldProps> = ({ 
  notas, 
  onChange,
  disabled = false
}) => {
  return (
    <div className="form-group">
      <label className="mb-1 block font-medium text-gray-700">
        Notas
      </label>
      <textarea
        value={notas}
        onChange={(e) => onChange('notas', e.target.value)}
        className="w-full rounded-md border p-2"
        rows={3}
        placeholder="Notas adicionales"
        disabled={disabled}
      />
    </div>
  );
};

export default NotesField;
