
/**
 * Utility functions for working with localStorage
 */

/**
 * Save data to localStorage
 * @param key The key to store data under
 * @param data The data to store
 * @returns boolean indicating success
 */
export const saveToLocalStorage = <T>(key: string, data: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Guardando datos en localStorage (${key}):`, data);
    return true;
  } catch (err) {
    console.error(`Error al guardar datos en localStorage (${key}):`, err);
    return false;
  }
};

/**
 * Load data from localStorage
 * @param key The key to load data from
 * @returns The data if found, null otherwise
 */
export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const savedData = localStorage.getItem(key);
    if (!savedData) {
      console.log(`No hay datos en localStorage (${key})`);
      return null;
    }
    const parsedData = JSON.parse(savedData) as T;
    console.log(`Datos cargados desde localStorage (${key}):`, parsedData);
    return parsedData;
  } catch (err) {
    console.error(`Error al cargar datos desde localStorage (${key}):`, err);
    return null;
  }
};
