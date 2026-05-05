import { DOM, CLASSES } from '@/config/config';

const { SLiDE_PANEL } = DOM;
const { PROJECT, EMPLOYEE } = SLiDE_PANEL;

const handlePanelAdd = (panel) => (event) => {
  const { target } = event;
  if (target === panel.CLOSE_BTN || target === panel.CANSEL_BTN) {
    panel.OVERLAY.classList.remove(CLASSES.PANEL_ACTIVE);
    panel.ADD.classList.remove(CLASSES.PANEL_OPEN);
  }
};

export const initSlidePanels = () => {
  DOM.SLiDE_PANEL.PROJECT.ADD.addEventListener('click', handlePanelAdd(PROJECT));
  DOM.SLiDE_PANEL.EMPLOYEE.ADD.addEventListener('click', handlePanelAdd(EMPLOYEE));
};

// export const initSlidePanels = () => {
//   DOM.SLiDE_PANEL.PROJECT.ADD.addEventListener('click', handlePanelProjectAdd);
//   DOM.SLiDE_PANEL.EMPLOYEE.ADD.addEventListener('click', handlePanelEmployeeAdd);
// };

// function handlePanelProjectAdd(event) {
//   const { target } = event;
//   if (target === PROJECT.CLOSE_BTN || target === PROJECT.CANSEL_BTN) {
//     PROJECT.OVERLAY.classList.remove(CLASSES.PANEL_ACTIVE);
//     PROJECT.ADD.classList.remove(CLASSES.PANEL_OPEN);
//   }
// }

// function handlePanelEmployeeAdd(event) {
//   const { target } = event;
//   if (target === EMPLOYEE.CLOSE_BTN || target === EMPLOYEE.CANSEL_BTN) {
//     EMPLOYEE.OVERLAY.classList.remove(CLASSES.PANEL_ACTIVE);
//     EMPLOYEE.ADD.classList.remove(CLASSES.PANEL_OPEN);
//   }
// }
