import { monthlyStore } from '@/store/monthlyStore';
import { renderTable } from '@/utils/utils';
import { getCurrentPeriod, getMonthNumber } from '@/utils/date-utils';
import { calculateAge } from '@/utils/helpers';

const calculateEstimatedPayment = (employee) => {
  const assignments = employee.assignments || [];
  if (assignments.length === 0) return employee.salary * 0.5;

  let totalPayment = 0;
  assignments.forEach((assignment) => {
    const capacity = Math.max(0.5, assignment.capacity || 0);
    totalPayment += employee.salary * capacity;
  });
  return totalPayment;
};

const calculateProjectedIncome = (employee, monthData) => {
  const assignments = employee.assignments || [];

  // Если нет назначений - возвращаем отрицательный Estimated Payment
  if (assignments.length === 0) {
    return -calculateEstimatedPayment(employee);
  }

  let totalProjectedIncome = 0;

  assignments.forEach((assignment) => {
    const project = monthData.projects?.find((p) => p.id === assignment.projectId);
    if (!project) return;

    const capacity = assignment.capacity || 0;
    const fit = assignment.fit || 1;
    const effectiveCapacity = capacity * fit;

    let totalEffectiveCapacity = 0;
    monthData.employees?.forEach((emp) => {
      emp.assignments?.forEach((ass) => {
        if (ass.projectId === project.id) {
          totalEffectiveCapacity += (ass.capacity || 0) * (ass.fit || 1);
        }
      });
    });

    const capacityForRevenue = Math.max(project.employeeCapacity || 0, totalEffectiveCapacity);
    const revenuePerEffectiveCapacity =
      capacityForRevenue > 0 ? project.budget / capacityForRevenue : 0;
    const revenue = revenuePerEffectiveCapacity * effectiveCapacity;
    const cost = employee.salary * Math.max(0.5, capacity);

    totalProjectedIncome += revenue - cost;
  });

  return totalProjectedIncome;
};

const getAssignmentsInfo = (employee) => {
  const assignments = employee.assignments || [];
  const totalCapacity = assignments.reduce((sum, a) => sum + (a.capacity || 0), 0);
  return {
    count: assignments.length,
    totalCapacity: totalCapacity.toFixed(1),
    displayText:
      assignments.length === 0
        ? '—' // прочерк вместо текста
        : `Show Assignments (${assignments.length}) ${totalCapacity.toFixed(1)}/1.5`,
  };
};

export const fillEmployeeRow = (row, employee, context) => {
  const { monthData, totalAccumulator } = context;

  const nameCell = row.querySelector('.template-row__employee_name');
  const surnameCell = row.querySelector('.template-row__employee_surname');
  const ageCell = row.querySelector('.template-row__employee_age');
  const positionCell = row.querySelector('.template-row__employee_position');
  const salaryCell = row.querySelector('.template-row__employee_salary');
  const paymentCell = row.querySelector('.template-row__employee_payment');
  const projectedIncomeCell = row.querySelector('.template-row__employee_projected-income');

  const age = calculateAge(employee.dob);
  const estimatedPayment = calculateEstimatedPayment(employee);
  const projectedIncome = calculateProjectedIncome(employee, monthData);
  const assignmentsInfo = getAssignmentsInfo(employee);

  if (nameCell) nameCell.textContent = employee.name;
  if (surnameCell) surnameCell.textContent = employee.surname;
  if (ageCell) ageCell.textContent = age;
  if (positionCell) positionCell.textContent = employee.position;
  if (salaryCell) salaryCell.textContent = `$${employee.salary.toLocaleString()}`;
  if (paymentCell) paymentCell.textContent = `$${Math.round(estimatedPayment).toLocaleString()}`;
  if (projectedIncomeCell) {
    projectedIncomeCell.textContent = `$${Math.round(projectedIncome).toLocaleString()}`;
    projectedIncomeCell.style.color = projectedIncome >= 0 ? '#10b981' : '#ef4444';
  }

  if (totalAccumulator) totalAccumulator.value += projectedIncome;

  const showAssignmentsBtn = row.querySelector('.template-row__employee_show-assignments');
  if (showAssignmentsBtn) {
    showAssignmentsBtn.textContent = assignmentsInfo.displayText;
    showAssignmentsBtn.style.opacity = assignmentsInfo.count === 0 ? '0.6' : '1';
    const newBtn = showAssignmentsBtn.cloneNode(true);
    showAssignmentsBtn.parentNode.replaceChild(newBtn, showAssignmentsBtn);
    newBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const assignments = employee.assignments || [];
      if (assignments.length === 0) {
        alert(`No assignments for ${employee.name} ${employee.surname}`);
        return;
      }
      let message = `Assignments for ${employee.name} ${employee.surname}:\n\n`;
      assignments.forEach((ass) => {
        const project = monthData.projects?.find((p) => p.id === ass.projectId);
        if (project) {
          message += `${project.projectName}: capacity=${ass.capacity}, fit=${ass.fit}\n`;
        }
      });
      alert(message);
    });
  }

  const deleteBtn = row.querySelector('.template-row__employee_delete');
  if (deleteBtn) {
    const newBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newBtn, deleteBtn);
    newBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Delete ${employee.name} ${employee.surname}?`)) {
        const index = monthData.employees.findIndex((e) => e.id === employee.id);
        if (index !== -1) {
          monthData.employees.splice(index, 1);

          // Просто сохраняем текущие данные
          const allMonths = monthlyStore.getMonths();
          const newStore = {};
          allMonths.forEach((key) => {
            const [y, m] = key.split('-').map(Number);
            newStore[key] = monthlyStore.getMonthData(y, m);
          });
          monthlyStore.setData(newStore);
          renderEmployeesTable();
        }
      }
    });
  }
};

export const renderEmployeesTable = () => {
  const tbody = document.querySelector('.table-body_employees');
  const template = document.querySelector('#template-row__employee');
  const totalIncomeContainer = document.querySelector('.view-panel_employee .total-income');

  if (!tbody || !template) return;

  const { year, monthName } = getCurrentPeriod();
  const monthNumber = getMonthNumber(monthName);
  const monthData = monthlyStore.getMonthData(year, monthNumber);
  const employees = monthData.employees || [];
  const totalAccumulator = { value: 0 };

  renderTable({
    tbodyElement: tbody,
    templateElement: template,
    dataLS: employees,
    renderRow: (row, employee) => fillEmployeeRow(row, employee, { monthData, totalAccumulator }),
  });

  if (totalIncomeContainer) {
    totalIncomeContainer.textContent = `💰 Total Projected Income: $${totalAccumulator.value.toFixed(2)}`;
    // totalIncomeContainer.textContent = `💰 Total Projected Income: $${(Math.round(totalAccumulator.value * 100) / 100).toFixed(2)}`;
    // totalIncomeContainer.textContent = `💰 Total Projected Income: $${totalAccumulator.value.toLocaleString()}`;
    // totalIncomeContainer.textContent = `💰 Total Projected Income: $${Math.round(totalAccumulator.value).toLocaleString()}`;
  }
};

export const initEmployeesTable = () => {
  const monthSelect = document.querySelector('.period-select_month');
  const yearSelect = document.querySelector('.period-select_year');

  const handleChange = () => {
    const employeesPanel = document.querySelector('.view-panel_employee');
    if (employeesPanel && employeesPanel.classList.contains('active')) {
      renderEmployeesTable();
    }
  };

  if (monthSelect) monthSelect.addEventListener('change', handleChange);
  if (yearSelect) yearSelect.addEventListener('change', handleChange);
};
