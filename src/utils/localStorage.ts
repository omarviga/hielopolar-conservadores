
// Esta función está mantenida por compatibilidad, pero ahora usamos Supabase
// para la persistencia de datos
export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (!serializedData) return null;
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Error loading data from localStorage (${key}):`, error);
    return null;
  }
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error);
  }
};
