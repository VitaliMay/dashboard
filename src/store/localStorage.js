// import { localStorageService } from '../services/localStorageService';
// import { CURRENT_STORAGE_KEY } from '../config';
// import dataDemo from '../data/dataDemo.json';
import { localStorageService } from '@/services/localStorageService';
import { CURRENT_STORAGE_KEY } from '@/config';
import dataDemo from '../data/dataDemo.json';

/**
 * Загрузка данных из localStorage
 */
export const loadFromLocalStorage = () => {
  return localStorageService.get(CURRENT_STORAGE_KEY) || {};
};

/**
 * Сохранение данных в localStorage
 */
export const saveToLocalStorage = (data) => {
  localStorageService.set(CURRENT_STORAGE_KEY, data);
};

/**
 * Проверка наличия данных
 */
export const hasStoredData = () => {
  return localStorageService.has(CURRENT_STORAGE_KEY);
};

/**
 * Инициализация данных (если нет в LS, копируем из dataDemo)
 */
export const initializeData = () => {
  if (!hasStoredData()) {
    console.log('📂 Данных в localStorage нет, инициализируем из dataDemo.json');

    if (dataDemo && Object.keys(dataDemo).length > 0) {
      saveToLocalStorage(dataDemo);
      console.log('✅ Данные из dataDemo.json скопированы в localStorage');
      return true;
    } else {
      console.log('⚠️ dataDemo.json пуст, создаем пустое хранилище');
      saveToLocalStorage({});
      return false;
    }
  }

  console.log('💾 Данные найдены в localStorage');
  return true;
};

/**
 * Сброс к демо-данным
 */
export const resetToDemoData = () => {
  if (dataDemo && Object.keys(dataDemo).length > 0) {
    saveToLocalStorage(dataDemo);
    console.log('🔄 Данные сброшены к состоянию из dataDemo.json');
    return true;
  }
  return false;
};

/**
 * Очистка всех данных
 */
export const clearLocalStorage = () => {
  localStorageService.remove(CURRENT_STORAGE_KEY);
};

/**
 * Создание бэкапа
 */
export const backupData = () => {
  return localStorageService.backup(CURRENT_STORAGE_KEY);
};

/**
 * Восстановление из бэкапа
 */
export const restoreFromBackup = () => {
  return localStorageService.restore(CURRENT_STORAGE_KEY);
};

/**
 * Экспорт данных
 */
export const exportData = () => {
  return localStorageService.exportToJson(CURRENT_STORAGE_KEY);
};

/**
 * Импорт данных
 */
export const importData = (jsonString) => {
  return localStorageService.importFromJson(CURRENT_STORAGE_KEY, jsonString);
};

/**
 * Статистика хранилища
 */
export const getStorageStats = () => {
  return localStorageService.getStats();
};

/**
 * Подписка на изменения
 */
export const onStorageChange = (callback) => {
  return localStorageService.on('save', callback);
};
