import { DOM } from '@/config/config';

/**
 * Получение текущего месяца (название)
 */
export const getCurrentMonthName = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentMonth = new Date().getMonth(); // 0-11
  return months[currentMonth];
};

/**
 * Получение текущего года
 */
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

/**
 * Преобразование названия месяца в номер (0-11)
 */
export const getMonthNumber = (monthName) => {
  const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  return months[monthName] ?? new Date().getMonth();
};

/**
 * Установка селектов на текущий месяц и год
 */
export const setDefaultPeriod = () => {
  // const monthSelect = document.querySelector('.period-select_month');
  // const yearSelect = document.querySelector('.period-select_year');

  if (DOM.SELECT.MONTH) {
    const currentMonth = getCurrentMonthName();
    DOM.SELECT.MONTH.value = currentMonth;
    // console.log(`📅 Установлен месяц: ${currentMonth}`);
  }

  if (DOM.SELECT.YEAR) {
    const currentYear = getCurrentYear();
    DOM.SELECT.YEAR.value = String(currentYear);
    // console.log(`📅 Установлен год: ${currentYear}`);
  }
};

/**
 * Получение текущего периода из селектов (с дефолтом на текущий месяц)
 */
export const getCurrentPeriod = () => {
  // const monthSelect = document.querySelector('.period-select_month');
  // const yearSelect = document.querySelector('.period-select_year');

  let monthName = DOM.SELECT.MONTH?.value;
  let year = DOM.SELECT.YEAR?.value;

  // Если селекты пустые или не существуют - используем текущую дату
  if (!monthName) {
    monthName = getCurrentMonthName();
  }
  if (!year) {
    year = String(getCurrentYear());
  }

  return {
    monthName,
    year: parseInt(year),
  };
};
