import '@/assets/styles/global.scss';
import { initBurger } from './components/burger.js';
import { initSidebar } from './components/sidebar/sidebar.js';
import { initTables } from './components/tables/tables.js';
import { initSlidePanels } from './components/slide-in-panels/slide-in-panels.js';
import { initProjectsTable, renderProjectsTable } from './components/tables/renderProjects.js';
import { initEmployeesTable } from './components/tables/renderEmployees.js';
import { initializeData } from './store/localStorage.js';
import { setDefaultPeriod, getCurrentPeriod } from './utils/date-utils.js';

// initializeData();
// initBurger();
// initSidebar();
// initTables();
// initSlidePanels();
// initProjectsTable();

import { monthlyStore } from './store/monthlyStore';
import { createTestPanel } from './modules/testPanel';
import { PREFIXES } from './config/storage.js';

// Установка текущего месяца в селектах
const initApp = () => {
  console.log('🚀 Запуск приложения');

  // 1. Ставлю селекты на текущий месяц/год
  setDefaultPeriod();

  // 2. данные
  initializeData();

  // 3. компоненты
  initBurger();
  initSidebar();
  initTables();
  initSlidePanels();

  // 4. таблицу проектов (она будет использовать текущий месяц из селектов)
  initProjectsTable();
  initEmployeesTable();
  renderProjectsTable(); // рендерим Projects при старте

  // 5. Выводим информацию
  const currentPeriod = getCurrentPeriod();
  console.log(`📅 Текущий период: ${currentPeriod.monthName} ${currentPeriod.year}`);
  console.log('📊 Статистика:', monthlyStore.getStats());
  console.log('📅 Доступные месяцы:', monthlyStore.getMonths());
};

// Запускаем приложение
initApp();

// Инициализация хранилища
// console.log('🚀 Запуск приложения');
// console.log('📊 Статистика:', monthlyStore.getStats());
// console.log('📅 Доступные месяцы:', monthlyStore.getMonths());

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

// Vite предоставляет переменные окружения
// if (import.meta.env.DEV) {
//   // Этот код будет вырезан из продакшн-сборки
//   const { createTestPanel } = await import('./modules/testPanel');
//   setTimeout(() => {
//     createTestPanel();
//     console.log('🛠️ Режим разработки');
//   }, 1000);
// }

setTimeout(() => {
  createTestPanel();
  console.log('🛠️ Режим разработки: window.store, window.exportData()');
}, 1000);
