import '@/assets/styles/global.scss';
import { initBurger } from './components/burger.js';

initBurger();

import { monthlyStore } from './store/monthlyStore';
import { createTestPanel } from './modules/testPanel';
import { PREFIXES } from './config/storage.js';

// Инициализация хранилища
console.log('🚀 Запуск приложения');
console.log('📊 Статистика:', monthlyStore.getStats());
console.log('📅 Доступные месяцы:', monthlyStore.getMonths());

// Для отладки в консоли
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).store = monthlyStore;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).exportData = () => {
  const data = monthlyStore.exportAllData();
  if (!data) {
    console.warn('⚠️ Нет данных для экспорта');
    return;
  }
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${PREFIXES.EXPORT_FILE}-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Создаем тестовую панель
// Проверяем, что мы не в продакшене (по hostname или параметру)
// const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// if (isDev) {
//   setTimeout(() => {
//     createTestPanel();
//     console.log('🛠️ Режим разработки: window.store, window.exportData()');
//   }, 1000);
// }

setTimeout(() => {
  createTestPanel();
  console.log('🛠️ Режим разработки: window.store, window.exportData()');
}, 1000);
