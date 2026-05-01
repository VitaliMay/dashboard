// import { ID_PREFIXES } from '../config';
import { ID_PREFIXES } from '@/config/constants';

const { PROJECT, EMPLOYEE, MULTIPLIER } = ID_PREFIXES;

/**
 * Получение всех существующих ID
 */
const getAllExistingIds = (store) => {
  const projectIds = [];
  const employeeIds = [];

  Object.values(store).forEach((monthData) => {
    monthData.projects?.forEach((project) => projectIds.push(project.id));
    monthData.employees?.forEach((employee) => employeeIds.push(employee.id));
  });

  return { projectIds, employeeIds };
};

/**
 * Находит максимальный счетчик
 */
const getMaxCounter = (ids, prefix) => {
  const counters = ids
    .filter((id) => Math.floor(id / MULTIPLIER) === prefix)
    .map((id) => id - prefix * MULTIPLIER);

  return counters.length > 0 ? Math.max(...counters) : 0;
};

/**
 * Создание генераторов ID (с замыканием)
 */
export const createIdGenerators = (store) => {
  const { projectIds, employeeIds } = getAllExistingIds(store);

  let nextProjectCounter = getMaxCounter(projectIds, PROJECT);
  let nextEmployeeCounter = getMaxCounter(employeeIds, EMPLOYEE);

  const generateProjectId = () => {
    nextProjectCounter++;
    return PROJECT * MULTIPLIER + nextProjectCounter;
  };

  const generateEmployeeId = () => {
    nextEmployeeCounter++;
    return EMPLOYEE * MULTIPLIER + nextEmployeeCounter;
  };

  return {
    generateProjectId,
    generateEmployeeId,
    getCounters: () => ({
      nextProject: nextProjectCounter,
      nextEmployee: nextEmployeeCounter,
    }),
  };
};
