import { DOM, CLASSES } from '@/config/config';

const { MAIN_CONTENT, SLiDE_PANEL } = DOM;
const { BUTTON_ADD_PROJECT, BUTTON_ADD_EMPLOYEE } = DOM.TABLES;
const { PROJECT, EMPLOYEE } = SLiDE_PANEL;

const buttonToPanel = new Map([
  [BUTTON_ADD_PROJECT, PROJECT],
  [BUTTON_ADD_EMPLOYEE, EMPLOYEE],
]);

function handleMainClick(event) {
  const { target } = event;
  const panel = buttonToPanel.get(target);

  if (panel) {
    panel.OVERLAY.classList.add(CLASSES.PANEL_ACTIVE);
    panel.ADD.classList.add(CLASSES.PANEL_OPEN);
  }
}

export const initTables = () => MAIN_CONTENT.addEventListener('click', handleMainClick);

/**************************************************** */

// const buttonToPanel = {
//   [BUTTON_ADD_PROJECT]: PROJECT,
//   [BUTTON_ADD_EMPLOYEE]: EMPLOYEE,
// };

// function handleMainClick(event) {
//   const { target } = event;
//   const panel = buttonToPanel[target];
//   if (panel) {
//     // console.log('Кнопка нашлась');
//     panel.OVERLAY.classList.add(CLASSES.PANEL_ACTIVE);
//     panel.ADD.classList.add(CLASSES.PANEL_OPEN);
//   }
// }

// export const initTables = () => MAIN_CONTENT.addEventListener('click', handleMainClick);

/**************************************************** */

// function handleMainClick(event) {
//   const { target } = event;
//   if (target === BUTTON_ADD_PROJECT) {
//     // console.log('Кнопка нашлась');
//     PROJECT.OVERLAY.classList.add(CLASSES.PANEL_ACTIVE);
//     PROJECT.ADD.classList.add(CLASSES.PANEL_OPEN);
//   }
//   if (target === BUTTON_ADD_EMPLOYEE) {
//     // console.log('Кнопка нашлась');
//     EMPLOYEE.OVERLAY.classList.add(CLASSES.PANEL_ACTIVE);
//     EMPLOYEE.ADD.classList.add(CLASSES.PANEL_OPEN);
//   }
// }
