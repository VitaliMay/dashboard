import { createMonthlyStore } from './storeFactory';

// Создаем и экспортируем единственный экземпляр
export const monthlyStore = createMonthlyStore();

// Экспортируем фабрику на случай, если нужно создать еще один экземпляр
export { createMonthlyStore };
