import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Cliente {
  id: string;
  nombre: string;
}

export function RegistroConservador() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formData, setFormData] = useState({
    numero_serie: '',
    modelo: '',
    estado_conservador: 'nuevo',
    cliente_id: '',
    ubicacion: '',
    notas: '',
    estado: 'activo'
  });
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Cargar lista de clientes al montar el componente
  const cargarClientes = async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('id, nombre')
        .order('nombre');

      if (error) throw error;

      setClientes(data || []);
    } catch (err: any) {
      setError('Error al cargar clientes: ' + err.message);
      console.error('Error al cargar clientes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('conservadores')
        .insert([formData]);

      if (error) throw error;

      setMensaje('¡Conservador registrado exitosamente!');
      // Limpiar formulario
      setFormData({
        numero_serie: '',
        modelo: '',
        estado_conservador: 'nuevo',
        cliente_id: '',
        ubicacion: '',
        notas: '',
        estado: 'activo'
      });

    } catch (error: any) {
      setMensaje('Error al registrar: ' + error.message);
      setError('Error al registrar: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h2 className="mb-6 text-2xl font-bold">Registro de Conservador</h2>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Número de Serie */}
        <div className="form-group">
          <label className="mb-1 block font-medium text-gray-700">
            Número de Serie *
          </label>
          <input
            type="text"
            required
            value={formData.numero_serie}
            onChange={(e) => setFormData({
              ...formData,
              numero_serie: e.target.value.trim()
            })}
            className="w-full rounded-md border p-2"
            placeholder="Ingrese el número de serie"
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
            onChange={(e) => setFormData({
              ...formData,
              modelo: e.target.value
            })}
            className="w-full rounded-md border p-2"
            placeholder="Ingrese el modelo"
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
            onChange={(e) => setFormData({
              ...formData,
              estado_conservador: e.target.value
            })}
            className="w-full rounded-md border p-2"
          >
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>
        </div>

        {/* Cliente */}
        <div className="form-group">
          <label className="mb-1 block font-medium text-gray-700">
            Cliente
          </label>
          <div className="relative">
            <select
              value={formData.cliente_id}
              onChange={(e) => setFormData({
                ...formData,
                cliente_id: e.target.value
              })}
              className="w-full rounded-md border p-2 pr-8"
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
              onClick={cargarClientes}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              title="Recargar clientes"
            >
              ↻
            </button>
          </div>
        </div>

        {/* Ubicación */}
        <div className="form-group">
          <label className="mb-1 block font-medium text-gray-700">
            Ubicación
          </label>
          <input
            type="text"
            value={formData.ubicacion}
            onChange={(e) => setFormData({
              ...formData,
              ubicacion: e.target.value
            })}
            className="w-full rounded-md border p-2"
            placeholder="Ubicación del conservador"
          />
        </div>

        {/* Notas */}
        <div className="form-group">
          <label className="mb-1 block font-medium text-gray-700">
            Notas
          </label>
          <textarea
            value={formData.notas}
            onChange={(e) => setFormData({
              ...formData,
              notas: e.target.value
            })}
            className="w-full rounded-md border p-2"
            rows={3}
            placeholder="Notas adicionales"
          />
        </div>

        {mensaje && (
          <div className="rounded-md bg-green-100 p-3 text-green-700">
            {mensaje}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('¿Estás seguro de que deseas limpiar el formulario?')) {
                setFormData({
                  numero_serie: '',
                  modelo: '',
                  estado_conservador: 'nuevo',
                  cliente_id: '',
                  ubicacion: '',
                  notas: '',
                  estado: 'activo'
                });
                setMensaje('');
                setError('');
              }
            }}
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
      </form>
    </div>
  );
}
