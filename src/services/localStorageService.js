import { STORAGE_CONFIG, CURRENT_STORAGE_KEY, PREFIXES } from '@/config';

/**
 * Класс для работы с localStorage
 */
export class LocalStorageService {
  constructor(prefix = '', autoSave = STORAGE_CONFIG.AUTO_SAVE) {
    this.prefix = prefix;
    this.autoSave = autoSave;
    this.saveTimeout = null;
    this.eventListeners = new Map();
  }

  /**
   * Формирование ключа с префиксом
   */
  getKey(key) {
    // Если префикс есть и это НЕ monthlyData, добавляем префикс
    // Для monthlyData используем чистый ключ без префикса
    if (this.prefix && key !== CURRENT_STORAGE_KEY) {
      return `${this.prefix}_${key}`;
    }
    return key;
  }

  /**
   * Сохранение данных
   */
  set(key, data) {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(data, null, 2));
      this.emitStorageEvent('save', key);
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error('Превышен лимит localStorage');
        this.handleQuotaExceeded();
      } else {
        console.error(`Ошибка сохранения: ${error}`);
      }
      throw error;
    }
  }

  /**
   * Загрузка данных
   */
  get(key) {
    try {
      const stored = localStorage.getItem(this.getKey(key));
      if (!stored) return null;
      return JSON.parse(stored);
    } catch (error) {
      console.error(`Ошибка загрузки: ${error}`);
      return null;
    }
  }

  /**
   * Удаление данных
   */
  remove(key) {
    localStorage.removeItem(this.getKey(key));
    this.emitStorageEvent('remove', key);
  }

  /**
   * Проверка существования
   */
  has(key) {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  /**
   * Очистка данных
   */
  clear() {
    if (this.prefix) {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(this.prefix) && !key.includes(CURRENT_STORAGE_KEY))
        .forEach((key) => localStorage.removeItem(key));
    } else {
      localStorage.clear();
    }
    this.emitStorageEvent('clear', 'all');
  }

  /**
   * Создание бэкапа
   */
  backup(key) {
    const data = localStorage.getItem(this.getKey(key));
    if (!data) return null;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupKey = `${STORAGE_CONFIG.BACKUP_PREFIX}${timestamp}_${key}`;
    localStorage.setItem(backupKey, data);

    this.cleanupBackups(key);

    return backupKey;
  }

  /**
   * Очистка старых бэкапов
   */
  cleanupBackups(key) {
    const backups = Object.keys(localStorage)
      .filter((k) => k.startsWith(STORAGE_CONFIG.BACKUP_PREFIX) && k.includes(key))
      .sort()
      .reverse();

    if (backups.length > STORAGE_CONFIG.MAX_BACKUPS) {
      backups.slice(STORAGE_CONFIG.MAX_BACKUPS).forEach((k) => {
        localStorage.removeItem(k);
      });
    }
  }

  /**
   * Восстановление из бэкапа
   */
  restore(key, backupKey = null) {
    let targetBackup = backupKey;

    if (!targetBackup) {
      const backups = Object.keys(localStorage)
        .filter((k) => k.startsWith(STORAGE_CONFIG.BACKUP_PREFIX) && k.includes(key))
        .sort()
        .reverse();

      if (backups.length === 0) return false;
      targetBackup = backups[0];
    }

    const backupData = localStorage.getItem(targetBackup);
    if (!backupData) return false;

    localStorage.setItem(this.getKey(key), backupData);
    this.emitStorageEvent('restore', key);

    return true;
  }

  /**
   * Экспорт в JSON
   */
  exportToJson(key) {
    const data = this.get(key);
    if (!data) return null;
    return JSON.stringify(data, null, 2);
  }

  /**
   * Импорт из JSON
   */
  importFromJson(key, jsonString) {
    try {
      const data = JSON.parse(jsonString);
      this.set(key, data);
      return true;
    } catch (error) {
      console.error('Ошибка импорта JSON:', error);
      return false;
    }
  }

  /**
   * Статистика хранилища
   */
  getStats() {
    let totalSize = 0;
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (!this.prefix || key.startsWith(this.prefix) || key === CURRENT_STORAGE_KEY)) {
        keys.push(key);
        const value = localStorage.getItem(key);
        if (value) totalSize += value.length;
      }
    }

    return {
      totalSize: Math.round(totalSize / 1024),
      keysCount: keys.length,
      keys,
    };
  }

  /**
   * Автосохранение с debounce
   */
  autoSaveSet(key, data, delay = STORAGE_CONFIG.SAVE_DELAY_MS) {
    if (!this.autoSave) {
      this.set(key, data);
      return;
    }

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      this.set(key, data);
      this.saveTimeout = null;
    }, delay);
  }

  /**
   * Подписка на события
   */
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(callback);

    return () => {
      this.eventListeners.get(event)?.delete(callback);
    };
  }

  emitStorageEvent(event, key) {
    this.eventListeners.get(event)?.forEach((callback) => callback(key));
  }

  handleQuotaExceeded() {
    const backups = Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIXES.BACKUP))
      .sort();

    if (backups.length > 0) {
      localStorage.removeItem(backups[0]);
      console.warn('Удален старый бэкап для освобождения места');
    }
  }
}

// Создаем и экспортируем синглтон
export const localStorageService = new LocalStorageService(PREFIXES.APP);
