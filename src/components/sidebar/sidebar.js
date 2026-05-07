import { renderProjectsTable } from '../tables/renderProjects';
import { renderEmployeesTable } from '../tables/renderEmployees';
import { CLASSES, DATA_ATTRS } from '@/config/config';

const sidebar = document.querySelector('.sidebar');
const app = document.querySelector('.app');

const panel_project = app.querySelector('.view-panel_project');
const panel_employe = app.querySelector('.view-panel_employee');
const tab_btns = app.querySelectorAll('.nav-item');

export const initSidebar = () => {
  if (!sidebar) return;
  sidebar.addEventListener('click', handleSidebarClick);
};

function handleSidebarClick(event) {
  const { target } = event;
  // console.log(target);
  if (target.closest(`.${CLASSES.SIDEBAR_TOGGLE_BUTTON}`)) {
    app.classList.toggle(CLASSES.SIDEBAR_COLLAPSED);
  }
  if (target.closest(`[${DATA_ATTRS.TABS}]`)) {
    const tabButton = target.closest(`[${DATA_ATTRS.TABS}]`);
    const tabValue = tabButton.getAttribute(DATA_ATTRS.TABS);

    tab_btns.forEach((btn) => btn.classList.remove(CLASSES.PANEL_ACTIVE));
    tabButton.classList.add(CLASSES.PANEL_ACTIVE);

    if (tabValue === DATA_ATTRS.TAB_VALUES.project) {
      renderProjectsTable();
    } else if (tabValue === DATA_ATTRS.TAB_VALUES.employee) {
      renderEmployeesTable();
    }

    panel_project.classList.toggle(CLASSES.PANEL_ACTIVE);
    panel_employe.classList.toggle(CLASSES.PANEL_ACTIVE);
  }
}
// function handleSidebarClick(event) {
//   const { target } = event;
//   // console.log(target);
//   if (target.closest(`.${CLASSES.SIDEBAR_TOGGLE_BUTTON}`)) {
//     app.classList.toggle(CLASSES.SIDEBAR_COLLAPSED);
//   }
//   if (target.closest(`[${DATA_ATTRS.TABS}]`)) {
//     const tabButton = target.closest(`[${DATA_ATTRS.TABS}]`);
//     // console.log(tabB utton);
//     tab_btns.forEach((btn) => btn.classList.remove(CLASSES.PANEL_ACTIVE));
//     tabButton.classList.add(CLASSES.PANEL_ACTIVE);

//     panel_project.classList.toggle(CLASSES.PANEL_ACTIVE);
//     panel_employe.classList.toggle(CLASSES.PANEL_ACTIVE);
//   }
// }

// if (target.closest(`[data-sidebar-toggle="${CLASSES.SIDEBAR_TOGGLE_BUTTON}"]`))
