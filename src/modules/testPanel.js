// import { monthlyStore } from '../store/monthlyStore';
// import { exportToFile } from '../utils/helpers';

import { monthlyStore } from '@/store/monthlyStore';
import { exportToFile } from '@/utils/helpers';

/**
 * Создание тестовой панели для проверки хранилища
 */
export const createTestPanel = () => {
  // Проверяем, не существует ли уже панель
  if (document.getElementById('test-panel')) {
    console.log('Тестовая панель уже существует');
    return;
  }

  const button = document.querySelector('.button');

  // Создаем стили для панели
  const styles = document.createElement('style');
  styles.textContent = `
    .panel-hidden {
      display: none;
    }

    .test-panel {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      z-index: 10000;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      transition: all 0.3s;
    }
    
    .test-panel.minimized {
      width: auto;
      background: transparent;
      box-shadow: none;
    }
    
    .test-panel-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 15px;
      border-radius: 12px 12px 0 0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .test-panel-header h3 {
      margin: 0;
      font-size: 14px;
    }
    
    .test-panel-toggle {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
    }
    
    .test-panel-content {
      padding: 15px;
      max-height: 500px;
      overflow-y: auto;
      display: block;
    }
    
    .test-panel.minimized .test-panel-content {
      display: none;
    }
    
    .test-panel-stats {
      background: #f7fafc;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 10px;
      font-size: 12px;
    }
    
    .test-panel-stats p {
      margin: 5px 0;
    }
    
    .test-panel-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
    }
    
    .test-panel-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 11px;
      transition: all 0.2s;
    }
    
    .test-panel-btn:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
    
    .test-panel-btn.danger {
      background: #e53e3e;
    }
    
    .test-panel-btn.danger:hover {
      background: #c53030;
    }
    
    .test-panel-btn.success {
      background: #48bb78;
    }
    
    .test-panel-log {
      background: #1a202c;
      color: #68d391;
      padding: 8px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 10px;
      max-height: 150px;
      overflow-y: auto;
      margin-top: 10px;
    }
    
    .test-panel-log-entry {
      margin-bottom: 4px;
      border-bottom: 1px solid #2d3748;
      padding-bottom: 4px;
      word-break: break-all;
    }
  `;
  document.head.appendChild(styles);

  // Создаем HTML панели
  const panel = document.createElement('div');
  panel.id = 'test-panel';
  panel.className = 'test-panel panel-hidden';
  panel.innerHTML = `
    <div class="test-panel-header">
      <h3>📊 Управление проектами (Dev Panel)</h3>
      <button class="test-panel-toggle">−</button>
    </div>
    <div class="test-panel-content">
      <div class="test-panel-stats" id="test-panel-stats">
        <p>📅 Месяцев: <span id="stat-months">-</span></p>
        <p>📁 Проектов: <span id="stat-projects">-</span></p>
        <p>👥 Сотрудников: <span id="stat-employees">-</span></p>
        <p>🔢 Следующий ID проекта: <span id="stat-next-project">-</span></p>
        <p>🔢 Следующий ID сотрудника: <span id="stat-next-employee">-</span></p>
      </div>
      <div class="test-panel-buttons">
        <button class="test-panel-btn" data-action="refresh">🔄 Обновить</button>
        <button class="test-panel-btn" data-action="add-project">➕ Проект</button>
        <button class="test-panel-btn" data-action="add-employee">👤 Сотрудник</button>
        <button class="test-panel-btn" data-action="show-data">📋 Данные</button>
        <button class="test-panel-btn" data-action="export">💾 Экспорт</button>
        <button class="test-panel-btn success" data-action="backup">💿 Бэкап</button>
        <button class="test-panel-btn danger" data-action="reset">🔄 Сброс</button>
        <button class="test-panel-btn danger" data-action="clear">🗑️ Очистить</button>
      </div>
      <div class="test-panel-log" id="test-panel-log">
        <div class="test-panel-log-entry">✨ Панель готова к работе</div>
      </div>
    </div>
  `;

  document.body.appendChild(panel);

  // Переменные для состояния
  let noPanel = true;
  let isMinimized = false;
  const header = panel.querySelector('.test-panel-header');
  const toggleBtn = panel.querySelector('.test-panel-toggle');
  const logDiv = panel.querySelector('#test-panel-log');

  // Функция добавления лога
  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    const colors = {
      info: '#68d391',
      error: '#fc8181',
      success: '#68d391',
      warning: '#f6ad55',
    };
    const logEntry = document.createElement('div');
    logEntry.className = 'test-panel-log-entry';
    logEntry.style.color = colors[type] || colors.info;
    logEntry.innerHTML = `[${time}] ${message}`;
    logDiv.appendChild(logEntry);
    logDiv.scrollTop = logDiv.scrollHeight;

    // Ограничиваем количество логов
    while (logDiv.children.length > 30) {
      logDiv.removeChild(logDiv.firstChild);
    }
  };

  // Функция обновления статистики
  const refreshStats = () => {
    try {
      const stats = monthlyStore.getStats();
      const counters = monthlyStore.getCounters();

      document.getElementById('stat-months').textContent = stats.totalMonths;
      document.getElementById('stat-projects').textContent = stats.uniqueProjects;
      document.getElementById('stat-employees').textContent = stats.uniqueEmployees;
      document.getElementById('stat-next-project').textContent = counters.nextProject;
      document.getElementById('stat-next-employee').textContent = counters.nextEmployee;

      addLog(
        `📊 Статистика: ${stats.totalMonths} месяцев, ${stats.uniqueProjects} проектов`,
        'success',
      );
    } catch (error) {
      addLog(`❌ Ошибка: ${error.message}`, 'error');
    }
  };

  // Функция показа данных
  const showData = () => {
    try {
      const months = monthlyStore.getMonths();
      if (months.length === 0) {
        addLog('📭 Нет данных', 'warning');
        return;
      }

      let msg = '📋 Данные: ';
      for (const month of months) {
        const monthData = monthlyStore.getMonthData(...month.split('-').map(Number));
        msg += `${month} (${monthData.projects.length}п/${monthData.employees.length}с) `;
      }
      addLog(msg, 'info');
    } catch (error) {
      addLog(`❌ Ошибка: ${error.message}`, 'error');
    }
  };

  // Функция добавления тестового проекта
  const addTestProject = () => {
    try {
      const year = new Date().getFullYear();
      const month = new Date().getMonth();

      const newProject = monthlyStore.addProject(year, month, {
        projectName: `Тест-проект ${Date.now().toString().slice(-6)}`,
        companyName: 'Тестовая компания',
        budget: Math.floor(Math.random() * 90000) + 10000,
        employeeCapacity: Math.floor(Math.random() * 5) + 1,
      });

      addLog(`✅ Добавлен проект: ${newProject.projectName} (ID: ${newProject.id})`, 'success');
      refreshStats(); // Обновляем статистику
    } catch (error) {
      addLog(`❌ Ошибка: ${error.message}`, 'error');
    }
  };

  // Функция добавления тестового сотрудника
  const addTestEmployee = () => {
    try {
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      const positions = ['Junior', 'Middle', 'Senior', 'Lead', 'Architect', 'BO'];
      const randomPosition = positions[Math.floor(Math.random() * positions.length)];

      const newEmployee = monthlyStore.addEmployee(year, month, {
        name: 'Тест',
        surname: `Сотрудник ${Date.now().toString().slice(-6)}`,
        dob: `199${Math.floor(Math.random() * 9)}-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        position: randomPosition,
        salary: Math.floor(Math.random() * 15000) + 3000,
        assignments: [],
      });

      addLog(
        `✅ Добавлен сотрудник: ${newEmployee.name} ${newEmployee.surname} (${randomPosition})`,
        'success',
      );
      refreshStats(); // Обновляем статистику
    } catch (error) {
      addLog(`❌ Ошибка: ${error.message}`, 'error');
    }
  };

  // Функция экспорта
  const exportData = () => {
    try {
      exportToFile();
      addLog('💾 Данные экспортированы', 'success');
    } catch (error) {
      addLog(`❌ Ошибка экспорта: ${error.message}`, 'error');
    }
  };

  // Функция сброса к демо
  // Функция сброса к демо
  const resetToDemo = () => {
    if (confirm('Внимание! Все текущие данные будут потеряны. Продолжить?')) {
      try {
        monthlyStore.resetToDemo();
        addLog('🔄 Данные сброшены к демо-версии', 'warning');
        setTimeout(() => {
          refreshStats(); // Обновляем статистику после сброса
          showData(); // Показываем данные
        }, 100);
      } catch (error) {
        addLog(`❌ Ошибка сброса: ${error.message}`, 'error');
      }
    }
  };

  // Функция очистки
  // Функция очистки
  const clearAll = () => {
    if (confirm('Внимание! Все данные будут удалены. Продолжить?')) {
      try {
        monthlyStore.clearAll();
        addLog('🗑️ Все данные очищены', 'warning');
        setTimeout(() => {
          refreshStats(); // Обновляем статистику после очистки
          showData(); // Показываем данные (будет пусто)
        }, 100);
      } catch (error) {
        addLog(`❌ Ошибка очистки: ${error.message}`, 'error');
      }
    }
  };

  // Функция создания бэкапа
  const createBackup = () => {
    try {
      const backupKey = monthlyStore.createBackup();
      addLog(`💿 Создан бэкап: ${backupKey}`, 'success');
    } catch (error) {
      addLog(`❌ Ошибка: ${error.message}`, 'error');
    }
  };

  // Обработчики кнопок
  const buttons = panel.querySelectorAll('[data-action]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      switch (action) {
        case 'refresh':
          refreshStats();
          break;
        case 'add-project':
          addTestProject();
          break;
        case 'add-employee':
          addTestEmployee();
          break;
        case 'show-data':
          showData();
          break;
        case 'export':
          exportData();
          break;
        case 'backup':
          createBackup();
          break;
        case 'reset':
          resetToDemo();
          break;
        case 'clear':
          clearAll();
          break;
      }
    });
  });

  const buttonPanelHidden = () => {
    noPanel = !noPanel;
    if (noPanel) {
      panel.classList.add('panel-hidden');
    } else {
      panel.classList.remove('panel-hidden');
    }
  };
  button.addEventListener('click', buttonPanelHidden);

  // Сворачивание/разворачивание
  const togglePanel = () => {
    isMinimized = !isMinimized;
    if (isMinimized) {
      panel.classList.add('minimized');
      toggleBtn.textContent = '+';
    } else {
      panel.classList.remove('minimized');
      toggleBtn.textContent = '−';
    }
  };
  header.addEventListener('click', togglePanel);
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePanel();
  });

  // Первоначальное обновление
  setTimeout(() => {
    refreshStats();
    addLog('🚀 Панель инициализирована', 'success');
  }, 500);

  return panel;
};
