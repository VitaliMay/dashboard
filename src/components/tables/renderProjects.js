import { monthlyStore } from '@/store/monthlyStore';
import { renderTable } from '@/utils/utils';
import { getCurrentPeriod, getMonthNumber } from '@/utils/date-utils';

/**
 * Расчет Estimated Income для проекта
 * Учитывает:
 * - capacity (выделенное время)
 * - fit (эффективность сотрудника)
 * - vacationCoefficient (коэффициент отпусков)
 */
const calculateEstimatedIncome = (project, monthData) => {
  // Находим всех сотрудников на проекте
  const projectEmployees =
    monthData.employees?.filter((emp) =>
      emp.assignments?.some((a) => a.projectId === project.id),
    ) || [];

  if (projectEmployees.length === 0) {
    return 0;
  }

  // Вспомогательная функция для расчета коэффициента отпусков
  // TODO: реализовать логику расчета отпусков в текущем месяце
  // Пока возвращаем 1 (нет отпусков)
  const getVacationCoefficient = () => {
    // const getVacationCoefficient = (employee) => {
    return 1;
  };

  // 1. Собираем информацию о назначениях с учетом fit и отпусков
  const assignments = [];

  for (const employee of projectEmployees) {
    const assignment = employee.assignments?.find((a) => a.projectId === project.id);
    if (!assignment) continue;

    const vacationCoefficient = getVacationCoefficient(employee);

    // effectiveCapacity учитывает capacity, fit И отпуска
    const effectiveCapacity =
      Number(assignment.capacity) * Number(assignment.fit || 1) * vacationCoefficient;

    assignments.push({
      employee,
      assignment,
      vacationCoefficient,
      effectiveCapacity,
    });
  }

  // 2. Расчет usedEffectiveCapacity (сумма всех effectiveCapacity)
  const usedEffectiveCapacity = assignments.reduce((sum, item) => sum + item.effectiveCapacity, 0);

  // 3. Capacity for revenue = max(project capacity, used effective capacity)
  const capacityForRevenue = Math.max(Number(project.employeeCapacity) || 0, usedEffectiveCapacity);

  // 4. Revenue per effective capacity
  const revenuePerEffectiveCapacity =
    capacityForRevenue > 0 ? project.budget / capacityForRevenue : 0;

  // 5. Расчет revenue и cost для каждого сотрудника
  let totalRevenue = 0;
  let totalCost = 0;

  assignments.forEach((item) => {
    // Revenue = revenuePerEffectiveCapacity × effectiveCapacity
    const revenue = revenuePerEffectiveCapacity * item.effectiveCapacity;

    // Cost = salary × max(0.5, capacity)
    const cost = item.employee.salary * Math.max(0.5, Number(item.assignment.capacity));

    totalRevenue += revenue;
    totalCost += cost;
  });

  // 6. Estimated Income = Revenue - Cost
  const estimatedIncome = totalRevenue - totalCost;

  // Округляем до 2 знаков
  return Math.round(estimatedIncome * 100) / 100;
};

/********************************************************************************* */

// Функция расчета Estimated Income для одного проекта
// const calculateEstimatedIncome = (project, monthData) => {
//   // Находим всех сотрудников на проекте
//   const projectEmployees =
//     monthData.employees?.filter((emp) =>
//       emp.assignments?.some((a) => a.projectId === project.id),
//     ) || [];

//   if (projectEmployees.length === 0) {
//     return 0; // Нет сотрудников - нет дохода
//   }

//   // 1. РАСЧЕТ REVENUE
//   // Суммируем capacity всех сотрудников на проекте
//   let totalEffectiveCapacity = 0;
//   projectEmployees.forEach((emp) => {
//     const assignment = emp.assignments.find((a) => a.projectId === project.id);
//     if (assignment) {
//       totalEffectiveCapacity += assignment.capacity || 0;
//     }
//   });

//   // Capacity for revenue = max(project capacity, total effective capacity)
//   const capacityForRevenue = Math.max(project.employeeCapacity, totalEffectiveCapacity);

//   // Revenue per capacity = budget / capacityForRevenue
//   const revenuePerCapacity = project.budget / capacityForRevenue;

//   // Total revenue
//   const totalRevenue = revenuePerCapacity * totalEffectiveCapacity;

//   // 2. РАСЧЕТ COST
//   let totalCost = 0;
//   projectEmployees.forEach((emp) => {
//     const assignment = emp.assignments.find((a) => a.projectId === project.id);
//     if (assignment) {
//       // Employee cost = salary × max(0.5, capacity)
//       const effectiveCapacity = Math.max(0.5, assignment.capacity || 0);
//       totalCost += emp.salary * effectiveCapacity;
//     }
//   });

//   // 3. Estimated Income = Revenue - Cost
//   const estimatedIncome = totalRevenue - totalCost;

//   return estimatedIncome;
// };

/**************************************************************** */

// Функция для заполнения строки проекта (используется в renderTable)
export const fillProjectRow = (row, project, context) => {
  // const { monthData, allProjects } = context;
  // const { monthData, allProjects, totalAccumulator } = context;
  const { monthData, totalAccumulator } = context;

  // Заполняем ячейки
  const companyCell = row.querySelector('.company-name');
  const projectNameCell = row.querySelector('.project-name');
  const budgetCell = row.querySelector('.budget');
  const capacityCell = row.querySelector('.employee-capacity');
  const incomeCell = row.querySelector('.estimated-income');

  if (companyCell) companyCell.textContent = project.companyName;
  if (projectNameCell) projectNameCell.textContent = project.projectName;
  if (budgetCell) budgetCell.textContent = `$${project.budget.toLocaleString()}`;

  const estimatedIncome = calculateEstimatedIncome(project, monthData);
  const roundedIncome = Math.round(estimatedIncome);

  if (incomeCell) {
    incomeCell.textContent = `$${roundedIncome.toLocaleString()}`;
    incomeCell.style.color = estimatedIncome >= 0 ? '#10b981' : '#ef4444';
  }
  if (totalAccumulator) {
    totalAccumulator.value += estimatedIncome;
  }

  // if (incomeCell) incomeCell.textContent = `$${roundedIncome.toLocaleString()}`;
  // if (totalAccumulator) {
  //   totalAccumulator.value += estimatedIncome;
  //   // totalAccumulator.value += roundedIncome;
  // }

  /****************************************** */
  // Расчет загрузки проекта и количества сотрудников (с учетом fit)
  let usedEffectiveCapacity = 0;
  let employeesCount = 0;

  monthData.employees?.forEach((employee) => {
    // Ищем назначение сотрудника на текущий проект
    const assignment = employee.assignments?.find((a) => a.projectId === project.id);
    if (assignment) {
      employeesCount += 1;

      // 🔥 КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: учитываем fit
      const capacity = assignment.capacity || 0;
      const fit = assignment.fit || 1;
      const effectiveCapacity = capacity * fit;

      usedEffectiveCapacity += effectiveCapacity;
    }
  });

  if (capacityCell) {
    // Отображаем usedEffectiveCapacity вместо простой суммы capacity
    const usedDisplay = usedEffectiveCapacity.toFixed(2);
    const totalDisplay = project.employeeCapacity.toFixed(2);
    capacityCell.textContent = `${usedDisplay} / ${totalDisplay}`;

    // Красный цвет, если эффективная загрузка превышает capacity проекта
    if (usedEffectiveCapacity > project.employeeCapacity) {
      capacityCell.style.color = 'red';
    } else {
      capacityCell.style.color = ''; // сбрасываем цвет
    }
  }

  // Расчет загрузки проекта и количества сотрудников
  // let currentWorkload = 0;
  // let employeesCount = 0;

  // monthData.employees?.forEach((employee) => {
  //   employee.assignments?.forEach((assignment) => {
  //     if (assignment.projectId === project.id) {
  //       currentWorkload += assignment.capacity || 0;
  //       employeesCount += 1;
  //     }
  //   });
  // });

  // if (capacityCell) {
  //   capacityCell.textContent = `${currentWorkload} / ${project.employeeCapacity}`;
  //   if (currentWorkload > project.employeeCapacity) {
  //     capacityCell.style.color = 'red';
  //   }
  // }
  /****************************************************** */
  // Обработчик кнопки Show Employees
  const showBtn = row.querySelector('.show-employees');
  if (showBtn) {
    // Удаляем старый обработчик, чтобы не было дублей
    const newShowBtn = showBtn.cloneNode(true);

    // текст кнопки в зависимости от количества сотрудников
    if (employeesCount === 0) {
      newShowBtn.textContent = '👥 Show Employees (0)';
      newShowBtn.style.opacity = '0.6';
    } else {
      newShowBtn.textContent = `👥 Show Employees (${employeesCount})`;
      newShowBtn.style.opacity = '1';
    }

    showBtn.parentNode.replaceChild(newShowBtn, showBtn);

    newShowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showProjectEmployees(project.id, project.projectName, monthData);
    });
  }

  // Обработчик кнопки Delete
  const deleteBtn = row.querySelector('.delete-project');
  if (deleteBtn) {
    const newDeleteBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
    newDeleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteProject(project.id);
    });
  }
};

// Показать сотрудников проекта
const showProjectEmployees = (projectId, projectName, monthData) => {
  const employees =
    monthData.employees?.filter((emp) => emp.assignments?.some((a) => a.projectId === projectId)) ||
    [];

  if (employees.length === 0) {
    alert(`No employees assigned to project "${projectName}"`);
    return;
  }

  const employeeList = employees
    .map((emp) => {
      const assignment = emp.assignments.find((a) => a.projectId === projectId);
      return `${emp.name} ${emp.surname} (${emp.position}) - Capacity: ${assignment?.capacity || 0}`;
    })
    .join('\n');

  alert(`Employees on "${projectName}":\n\n${employeeList}`);
};

// Удаление проекта
const deleteProject = (projectId) => {
  if (!confirm('Are you sure you want to delete this project?')) return;

  const { year, monthName } = getCurrentPeriod();
  const monthNumber = getMonthNumber(monthName);
  const monthData = monthlyStore.getMonthData(year, monthNumber);

  // Удаляем проект
  const projectIndex = monthData.projects.findIndex((p) => p.id === projectId);
  if (projectIndex !== -1) {
    monthData.projects.splice(projectIndex, 1);

    // Удаляем назначения сотрудников
    monthData.employees?.forEach((employee) => {
      if (employee.assignments) {
        employee.assignments = employee.assignments.filter((a) => a.projectId !== projectId);
      }
    });

    // Сохраняем изменения
    const allMonths = monthlyStore.getMonths();
    const newStore = {};
    allMonths.forEach((key) => {
      const [y, m] = key.split('-').map(Number);
      newStore[key] = monthlyStore.getMonthData(y, m);
    });
    monthlyStore.setData(newStore);

    // Перерендериваем таблицу
    renderProjectsTable();
  }
};

// Главная функция рендеринга с использованием renderTable
export const renderProjectsTable = () => {
  // Получаем элементы DOM
  const tbody = document.querySelector('.table-body_projects');
  const template = document.querySelector('#template-row_project');
  const totalIncomeContainer = document.querySelector('.view-panel_project .total-income');

  if (!tbody || !template) {
    console.error('tbody или template не найдены');
    return;
  }

  // Получаем данные
  const { year, monthName } = getCurrentPeriod();
  const monthNumber = getMonthNumber(monthName);
  const monthData = monthlyStore.getMonthData(year, monthNumber);
  const projects = monthData.projects || [];

  // создаю аккумулятор для Total Estimated Income
  const totalAccumulator = { value: 0 };

  // renderTable
  renderTable({
    tbodyElement: tbody,
    templateElement: template,
    dataLS: projects,
    renderRow: (row, project) => fillProjectRow(row, project, { monthData, totalAccumulator }),
    // fillProjectRow(row, project, { monthData, allProjects: projects, totalAccumulator }),
  });

  // Обновляем общий доход
  // if (totalIncomeContainer && projects.length > 0) {
  //   const totalIncome = projects.reduce((sum, project) => {
  //     const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  //     return sum + (totalBudget ? (project.budget / totalBudget) * 100 : 0);
  //   }, 0);
  //   totalIncomeContainer.textContent = `Total Estimated Income: $${totalIncome.toLocaleString()}`;
  // }

  //Cумма
  if (totalIncomeContainer) {
    // const totalIncome = projects.reduce((sum, project) => {
    //   return sum + calculateEstimatedIncome(project, monthData);
    // }, 0);

    // totalIncomeContainer.textContent = `💰 Total Estimated Income: $${Math.round(totalIncome).toLocaleString()}`;
    // totalIncomeContainer.textContent = `💰 Total Estimated Income: $${totalAccumulator.value.toLocaleString()}`;

    // Расчет bench payments (сотрудники без проекта)
    let benchPayments = 0;
    monthData.employees?.forEach((employee) => {
      const hasActiveAssignment = employee.assignments?.some((a) => (a.capacity || 0) > 0);
      if (!hasActiveAssignment) {
        benchPayments += employee.salary * 0.5; // 0.5 × salary для bench
      }
    });

    const totalIncome = totalAccumulator.value - benchPayments;
    totalIncomeContainer.textContent = `💰 Total Estimated Income: $${totalIncome.toFixed(2)} (Bench payments: $${benchPayments.toFixed(2)})`;
    // totalIncomeContainer.textContent = `💰 Total Estimated Income: $${totalIncome.toLocaleString()} (Bench payments: $${benchPayments.toLocaleString()})`;
  }
};

// Инициализация
export const initProjectsTable = () => {
  renderProjectsTable();

  // Слушаем изменения периода
  const monthSelect = document.querySelector('.period-select_month');
  const yearSelect = document.querySelector('.period-select_year');

  if (monthSelect) monthSelect.addEventListener('change', () => renderProjectsTable());
  if (yearSelect) yearSelect.addEventListener('change', () => renderProjectsTable());
};
