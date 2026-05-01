/**
 * Конфигурация localStorage
 */

// Префиксы
export const PREFIXES = {
  APP: 'VitaliMay-app', // Основной префикс приложения
  BACKUP: 'VitaliMay-backup_', // Префикс для бэкапов
  EXPORT_FILE: 'VitaliMay-data', // Префикс для имени сохраняемого файла
};

// Ключи
export const STORAGE_KEYS = {
  MONTHLY_DATA: 'monthlyData',
  USER_PREFERENCES: 'userPreferences',
  APP_SETTINGS: 'appSettings',
  LAST_BACKUP: 'lastBackup',
  SAVE_COUNT: 'VitaliMay_saveCount',
};

// Настройки сохранения
export const STORAGE_CONFIG = {
  AUTO_SAVE: true,
  SAVE_DELAY_MS: 500,
  COMPRESSION: false,
  MAX_BACKUPS: 5,
  BACKUP_PREFIX: 'VitaliMay-backup_',
  AUTO_BACKUP_INTERVAL: 10,
};

// Текущий ключ
export const CURRENT_STORAGE_KEY = STORAGE_KEYS.MONTHLY_DATA;
