
import React from 'react';

interface FormButtonsProps {
  onReset: () => void;
  isSubmitting: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ onReset, isSubmitting }) => {
  return (
    <div className="flex justify-end space-x-3">
      <button
        type="button"
        onClick={onReset}
        className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        disabled={isSubmitting}
      >
        Limpiar
      </button>
      <button
        type="submit"
        className={`rounded-md px-4 py-2 text-white ${isSubmitting
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registrando...' : 'Registrar Conservador'}
      </button>
    </div>
  );
};

export default FormButtons;
