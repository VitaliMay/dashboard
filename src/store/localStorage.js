import { localStorageService } from '@/services/localStorageService';
import { CURRENT_STORAGE_KEY } from '@/config';
import dataDemo from '../data/dataDemo.json';
import { getCurrentMonthName, getCurrentYear, getMonthNumber } from '@/utils/date-utils';

/**
 * Создание данных для текущего месяца, если их нет
 */
const ensureCurrentMonthData = (store) => {
  const currentMonth = getCurrentMonthName();
  const currentYear = getCurrentYear();
  const monthNumber = getMonthNumber(currentMonth);

  const monthKey = `${currentYear}-${monthNumber}`;

  // Если данных за текущий месяц нет - создаем пустые
  if (!store[monthKey]) {
    console.log(`📅 Создаю данные для текущего месяца: ${currentMonth} ${currentYear}`);
    store[monthKey] = {
      projects: [],
      employees: [],
    };
  }

  return store;
};

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

    let initialData;

    if (dataDemo && Object.keys(dataDemo).length > 0) {
      // Берем демо-данные
      initialData = { ...dataDemo };
      console.log('✅ Данные из dataDemo.json скопированы');
    } else {
      console.log('⚠️ dataDemo.json пуст, создаем пустое хранилище');
      initialData = {};
    }

    // Убеждаемся, что есть данные за текущий месяц
    initialData = ensureCurrentMonthData(initialData);

    saveToLocalStorage(initialData);
    return true;
  }

  // Данные есть, но проверяем, есть ли текущий месяц
  const store = loadFromLocalStorage();
  const updatedStore = ensureCurrentMonthData(store);

  if (updatedStore !== store) {
    saveToLocalStorage(updatedStore);
  }

  console.log('💾 Данные найдены в localStorage');
  return true;
};

// export const initializeData = () => {
//   if (!hasStoredData()) {
//     console.log('📂 Данных в localStorage нет, инициализируем из dataDemo.json');

//     if (dataDemo && Object.keys(dataDemo).length > 0) {
//       saveToLocalStorage(dataDemo);
//       console.log('✅ Данные из dataDemo.json скопированы в localStorage');
//       return true;
//     } else {
//       console.log('⚠️ dataDemo.json пуст, создаем пустое хранилище');
//       saveToLocalStorage({});
//       return false;
//     }
//   }

//   console.log('💾 Данные найдены в localStorage');
//   return true;
// };

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
