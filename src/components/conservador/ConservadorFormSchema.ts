
export interface ConservadorFormValues {
  numero_serie: string;
  modelo: string;
  estado_conservador: 'nuevo' | 'usado';
  cliente_id: string;
  ubicacion: string;
  notas: string;
  estado: string;
}

export const defaultValues: ConservadorFormValues = {
  numero_serie: '',
  modelo: '',
  estado_conservador: 'nuevo',
  cliente_id: '',
  ubicacion: '',
  notas: '',
  estado: 'activo'
};
