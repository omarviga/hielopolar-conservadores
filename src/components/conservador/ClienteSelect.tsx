
import React from 'react';
import { Cliente } from './types';

interface ClienteSelectProps {
  clientes: Cliente[];
  value: string;
  onChange: (value: string) => void;
  onReload: () => void;
  disabled?: boolean;
}

const ClienteSelect: React.FC<ClienteSelectProps> = ({
  clientes,
  value,
  onChange,
  onReload,
  disabled = false
}) => {
  return (
    <div className="form-group">
      <label className="mb-1 block font-medium text-gray-700">
        Cliente
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border p-2 pr-8"
          disabled={disabled}
        >
          <option value="">Seleccione un cliente</option>
          {clientes.length === 0 ? (
            <option disabled>No hay clientes disponibles</option>
          ) : (
            clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))
          )}
        </select>
        <button
          type="button"
          onClick={onReload}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          title="Recargar clientes"
          disabled={disabled}
        >
          ↻
        </button>
      </div>
    </div>
  );
};

export default ClienteSelect;
