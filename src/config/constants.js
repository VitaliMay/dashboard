/**
 * Глобальные константы
 */

// Префиксы ID
export const ID_PREFIXES = {
  PROJECT: 17044672,
  EMPLOYEE: 17044673,
  MULTIPLIER: 100000,
};

// Лимиты
export const LIMITS = {
  MAX_PROJECT_CAPACITY: 100,
  MAX_EMPLOYEES_PER_MONTH: 50,
  MAX_PROJECTS_PER_MONTH: 20,
  MAX_BACKUPS: 5,
};

// Бюджеты
export const BUDGET = {
  MIN: 1000,
  MAX: 1000000,
  DEFAULT: 50000,
};

// Зарплаты
export const SALARY = {
  MIN: 1000,
  MAX: 20000,
  DEFAULT: 5000,
};

// Коэффициенты fit
export const FIT = {
  MIN: 0,
  MAX: 1,
  DEFAULT: 0.9,
  PERFECT: 1,
  GOOD: 0.9,
  MEDIUM: 0.7,
  LOW: 0.5,
};

// Занятость (capacity)
export const CAPACITY = {
  MIN: 0,
  MAX: 2,
  DEFAULT: 1,
  FULL: 1,
  HALF: 0.5,
  QUARTER: 0.25,
};

// Названия месяцев
export const MONTHS = {
  NAMES: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  RANGE: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

// Должности (карьерная лестница)
export const POSITIONS = {
  // Отдельные позиции
  JUNIOR: { name: 'Junior', multiplier: 1 },
  MIDDLE: { name: 'Middle', multiplier: 1.5 },
  SENIOR: { name: 'Senior', multiplier: 2 },
  LEAD: { name: 'Lead', multiplier: 2.5 },
  ARCHITECT: { name: 'Architect', multiplier: 3 },
  BO: { name: 'BO', multiplier: 4, fullName: 'Business Owner' },

  // Массив для перебора
  LIST: ['Junior', 'Middle', 'Senior', 'Lead', 'Architect', 'BO'],

  // Объект для быстрого доступа по имени
  BY_NAME: {
    Junior: { name: 'Junior', multiplier: 1 },
    Middle: { name: 'Middle', multiplier: 1.5 },
    Senior: { name: 'Senior', multiplier: 2 },
    Lead: { name: 'Lead', multiplier: 2.5 },
    Architect: { name: 'Architect', multiplier: 3 },
    BO: { name: 'BO', multiplier: 4, fullName: 'Business Owner' },
  },
};

// Даты
export const DATES = {
  START_YEAR: 2024,
  END_YEAR: 2030,
  DATE_FORMAT: 'YYYY-MM-DD',
};

// Сообщения
export const MESSAGES = {
  ERRORS: {
    PROJECT_EXISTS: 'Проект с таким именем уже существует',
    EMPLOYEE_EXISTS: 'Сотрудник с таким именем уже существует',
    PROJECT_NOT_FOUND: 'Проект не найден',
    EMPLOYEE_NOT_FOUND: 'Сотрудник не найден',
    CAPACITY_EXCEEDED: 'Превышение capacity проекта',
    INVALID_DATA: 'Некорректные данные',
  },
  SUCCESS: {
    PROJECT_ADDED: 'Проект успешно добавлен',
    EMPLOYEE_ADDED: 'Сотрудник успешно добавлен',
    ASSIGNMENT_ADDED: 'Назначение успешно создано',
    DATA_SAVED: 'Данные сохранены',
    BACKUP_CREATED: 'Бэкап создан',
  },
};
