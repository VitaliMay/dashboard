// import { monthlyStore } from '../store/monthlyStore';
// import { MONTHS, POSITIONS } from '../config';

import { monthlyStore } from '@/store/monthlyStore';
import { MONTHS, POSITIONS } from '@/config/constants';
import { PREFIXES } from '@/config';

/**
 * Форматирование ключа месяца для отображения
 */
export const formatMonthKey = (key) => {
  const [year, month] = key.split('-');
  return `${MONTHS.NAMES[parseInt(month)]} ${year}`;
};

/**
 * Получение множителя зарплаты по должности
 */
export const getPositionMultiplier = (positionName) => {
  const pos = POSITIONS.BY_NAME[positionName];
  return pos ? pos.multiplier : 1;
};

/**
 * Получение полного названия должности
 */
export const getPositionFullName = (positionName) => {
  const pos = POSITIONS.BY_NAME[positionName];
  return pos?.fullName || pos?.name || positionName;
};

/**
 * Инициализация из JSON
 */
export const initFromJson = async (jsonData) => {
  monthlyStore.setData(jsonData);
  console.log('✅ Данные загружены из JSON');
  console.log('📊 Статистика:', monthlyStore.getStats());
};

/**
 * Загрузка JSON файла
 */
export const loadJsonData = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки JSON: ${response.statusText}`);
  }
  return await response.json();
};

/**
 * Экспорт данных в файл
 */
/**
 * Экспорт данных в файл
 */
export const exportToFile = () => {
  const data = monthlyStore.exportAllData();
  if (!data) {
    console.warn('Нет данных для экспорта');
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

/**
 * Получение занятости сотрудника (суммарная capacity по всем проектам)
 */
export const getEmployeeWorkload = (employeeId, year, month) => {
  const monthData = monthlyStore.getMonthData(year, month);
  const employee = monthData.employees.find((e) => e.id === employeeId);
  if (!employee) return 0;
  return employee.assignments.reduce((sum, a) => sum + a.capacity, 0);
};

/**
 * Получение загрузки проекта (суммарная capacity всех сотрудников на проекте)
 */
export const getProjectWorkload = (projectId, year, month) => {
  const monthData = monthlyStore.getMonthData(year, month);

  const total = monthData.employees
    .filter((e) => e.assignments.some((a) => a.projectId === projectId))
    .reduce((sum, e) => {
      const assignment = e.assignments.find((a) => a.projectId === projectId);
      return sum + (assignment?.capacity || 0);
    }, 0);

  return total;
};

/**
 * Получение свободной capacity проекта (сколько еще можно нанять)
 */
export const getProjectFreeCapacity = (projectId, year, month) => {
  const monthData = monthlyStore.getMonthData(year, month);
  const project = monthData.projects.find((p) => p.id === projectId);

  if (!project) return 0;

  const currentWorkload = getProjectWorkload(projectId, year, month);
  return project.employeeCapacity - currentWorkload;
};

/**
 * Проверка, перегружен ли проект
 */
export const isProjectOverloaded = (projectId, year, month) => {
  const freeCapacity = getProjectFreeCapacity(projectId, year, month);
  return freeCapacity < 0;
};

/**
 * Получение всех сотрудников на проекте
 */
export const getProjectEmployees = (projectId, year, month) => {
  const monthData = monthlyStore.getMonthData(year, month);

  return monthData.employees.filter((e) => e.assignments.some((a) => a.projectId === projectId));
};

/**
 * Получение всех проектов сотрудника
 */
export const getEmployeeProjects = (employeeId, year, month) => {
  const monthData = monthlyStore.getMonthData(year, month);
  const employee = monthData.employees.find((e) => e.id === employeeId);

  if (!employee) return [];

  return employee.assignments
    .map((a) => {
      const project = monthData.projects.find((p) => p.id === a.projectId);
      return {
        project,
        capacity: a.capacity,
        fit: a.fit,
      };
    })
    .filter((item) => item.project);
};

/**
 * Получение общей зарплаты всех сотрудников за месяц
 */
export const getTotalSalaries = (year, month) => {
  const monthData = monthlyStore.getMonthData(year, month);
  return monthData.employees.reduce((sum, e) => sum + e.salary, 0);
};

/**
 * Получение общего бюджета всех проектов за месяц
 */
export const getTotalBudget = (year, month) => {
  const monthData = monthlyStore.getMonthData(year, month);
  return monthData.projects.reduce((sum, p) => sum + p.budget, 0);
};

/**
 * Форматирование даты
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU');
};

/**
 * Расчет возраста по дате рождения
 */
export const calculateAge = (dobString) => {
  const birthDate = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
