import {
  loadFromLocalStorage,
  saveToLocalStorage,
  initializeData,
  resetToDemoData,
  backupData,
  restoreFromBackup,
  getStorageStats,
  onStorageChange,
} from './localStorage';
import { createIdGenerators } from './idGenerator';
import { CURRENT_STORAGE_KEY, MESSAGES, STORAGE_KEYS } from '../config';

/**
 * Фабрика создания хранилища
 */
export const createMonthlyStore = () => {
  // 1. Инициализация
  initializeData();
  let store = loadFromLocalStorage();
  console.log('📦 Данные загружены');

  // 2. Подписка на изменения в других вкладках
  onStorageChange((key) => {
    if (key === CURRENT_STORAGE_KEY) {
      console.log('🔄 Данные обновлены в другой вкладке');
      store = loadFromLocalStorage();
      refreshGenerators();
    }
  });

  // 3. Генераторы ID
  let generators = createIdGenerators(store);
  const refreshGenerators = () => {
    generators = createIdGenerators(store);
  };

  // 4. Менеджер сохранения
  let saveCount = parseInt(localStorage.getItem(STORAGE_KEYS.SAVE_COUNT) || '0');

  const saveWithBackup = () => {
    saveToLocalStorage(store);

    saveCount += 1;
    if (saveCount % 10 === 0) {
      backupData();
      console.log('💾 Автоматический бэкап создан');
    }
    localStorage.setItem(STORAGE_KEYS.SAVE_COUNT, String(saveCount));
  };

  // 5. Методы для работы с месяцами
  const getMonthData = (year, month) => {
    const monthKey = `${year}-${month}`;
    if (!store[monthKey]) {
      store[monthKey] = { projects: [], employees: [] };
    }
    return store[monthKey];
  };

  const getMonths = () => Object.keys(store);

  const copyProjectToMonth = (projectId, fromYear, fromMonth, toYear, toMonth) => {
    const fromData = getMonthData(fromYear, fromMonth);
    const project = fromData.projects.find((p) => p.id === projectId);

    if (!project) return null;

    const toData = getMonthData(toYear, toMonth);
    const existing = toData.projects.find((p) => p.id === projectId);

    if (!existing) {
      toData.projects.push({ ...project });
      saveWithBackup();
    }

    return project;
  };

  const copyEmployeeToMonth = (employeeId, fromYear, fromMonth, toYear, toMonth) => {
    const fromData = getMonthData(fromYear, fromMonth);
    const employee = fromData.employees.find((e) => e.id === employeeId);

    if (!employee) return null;

    const toData = getMonthData(toYear, toMonth);
    const existing = toData.employees.find((e) => e.id === employeeId);

    if (!existing) {
      toData.employees.push({ ...employee });
      saveWithBackup();
    }

    return employee;
  };

  // 6. CRUD методы
  const addProject = (year, month, projectData) => {
    const monthData = getMonthData(year, month);

    const existing = monthData.projects.find((p) => p.projectName === projectData.projectName);
    if (existing) {
      throw new Error(`${MESSAGES.ERRORS.PROJECT_EXISTS} в ${year}-${month}`);
    }

    const newProject = {
      id: generators.generateProjectId(),
      ...projectData,
    };

    monthData.projects.push(newProject);
    saveWithBackup();
    refreshGenerators();

    console.log(`✅ ${MESSAGES.SUCCESS.PROJECT_ADDED}: ${newProject.projectName}`);
    return newProject;
  };

  const addEmployee = (year, month, employeeData) => {
    const monthData = getMonthData(year, month);

    const existing = monthData.employees.find(
      (e) => e.name === employeeData.name && e.surname === employeeData.surname,
    );
    if (existing) {
      throw new Error(
        `${MESSAGES.ERRORS.EMPLOYEE_EXISTS}: ${employeeData.name} ${employeeData.surname}`,
      );
    }

    const newEmployee = {
      id: generators.generateEmployeeId(),
      ...employeeData,
      assignments: employeeData.assignments || [],
    };

    monthData.employees.push(newEmployee);
    saveWithBackup();
    refreshGenerators();

    console.log(
      `✅ ${MESSAGES.SUCCESS.EMPLOYEE_ADDED}: ${newEmployee.name} ${newEmployee.surname}`,
    );
    return newEmployee;
  };

  const assignEmployeeToProject = (year, month, employeeId, projectId, capacity, fit) => {
    const monthData = getMonthData(year, month);
    const employee = monthData.employees.find((e) => e.id === employeeId);
    const project = monthData.projects.find((p) => p.id === projectId);

    if (!employee) throw new Error(MESSAGES.ERRORS.EMPLOYEE_NOT_FOUND);
    if (!project) throw new Error(MESSAGES.ERRORS.PROJECT_NOT_FOUND);

    const currentTotal = monthData.employees
      .filter((e) => e.assignments.some((a) => a.projectId === projectId))
      .reduce((sum, e) => {
        const assignment = e.assignments.find((a) => a.projectId === projectId);
        return sum + (assignment?.capacity || 0);
      }, 0);

    if (currentTotal + capacity > project.employeeCapacity) {
      throw new Error(`${MESSAGES.ERRORS.CAPACITY_EXCEEDED} "${project.projectName}"`);
    }

    const existingAssignment = employee.assignments.find((a) => a.projectId === projectId);
    if (existingAssignment) {
      existingAssignment.capacity = capacity;
      existingAssignment.fit = fit;
    } else {
      employee.assignments.push({ projectId, capacity, fit });
    }

    saveWithBackup();
    console.log(
      `✅ ${MESSAGES.SUCCESS.ASSIGNMENT_ADDED}: ${employee.name} -> ${project.projectName}`,
    );
  };

  // 7. Методы для получения данных
  const getAllProjects = () => {
    return Object.values(store).flatMap((month) => month.projects);
  };

  const getAllEmployees = () => {
    return Object.values(store).flatMap((month) => month.employees);
  };

  const getStats = () => {
    const freshStore = loadFromLocalStorage();
    const allProjects = Object.values(freshStore).flatMap((month) => month.projects);
    const allEmployees = Object.values(freshStore).flatMap((month) => month.employees);
    const uniqueProjects = new Set(allProjects.map((p) => p.id)).size;
    const uniqueEmployees = new Set(allEmployees.map((e) => e.id)).size;

    return {
      totalMonths: Object.keys(freshStore).length,
      totalProjectAssignments: allProjects.length,
      totalEmployeeAssignments: allEmployees.length,
      uniqueProjects,
      uniqueEmployees,
    };
  };

  const hasData = () => Object.keys(store).length > 0;

  const getStorageInfo = () => {
    return {
      stats: getStorageStats(),
      dataSize: JSON.stringify(store).length,
    };
  };

  // 8. Методы управления данными
  const setData = (newStore) => {
    store = newStore;
    saveWithBackup();
    refreshGenerators();
  };

  const resetToDemo = () => {
    if (resetToDemoData()) {
      store = loadFromLocalStorage();
      refreshGenerators();
      console.log('🔄 Данные сброшены к демо-версии');
      return true;
    }
    return false;
  };

  const clearAll = () => {
    saveToLocalStorage({});
    store = {};
    refreshGenerators();
    localStorage.setItem(STORAGE_KEYS.SAVE_COUNT, '0');
    console.log('🗑️ Все данные очищены');
    return store;
  };

  const createBackup = () => backupData();

  const restoreBackup = () => {
    const success = restoreFromBackup();
    if (success) {
      store = loadFromLocalStorage();
      refreshGenerators();
    }
    return success;
  };

  const exportAllData = () => {
    const data = loadFromLocalStorage();
    if (!data || Object.keys(data).length === 0) return null;
    return JSON.stringify(data, null, 2);
  };

  // 9. Возвращаем публичное API
  return {
    // Методы для работы с месяцами
    getMonthData,
    getMonths,
    copyProjectToMonth,
    copyEmployeeToMonth,

    // CRUD методы
    addProject,
    addEmployee,
    assignEmployeeToProject,

    // Методы для получения данных
    getAllProjects,
    getAllEmployees,
    getStats,
    hasData,
    getStorageInfo,

    // Методы управления данными
    setData,
    resetToDemo,
    clearAll,
    createBackup,
    restoreBackup,
    exportAllData,

    // Вспомогательные методы
    getCounters: () => generators.getCounters(),
  };
};
