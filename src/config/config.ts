const CLASSES = {
  MENU_OPEN: 'open',
  BUTTON_ROTATE: 'rotade',
  BODY_LOCK: 'lock',
  MENU_LINK: 'menu__list-link',
  APP: 'app',
  SIDEBAR: 'sidebar',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  SIDEBAR_TOGGLE_BUTTON: 'sidebar-toggle',
  PANEL_ACTIVE: 'active',
  PANEL_OPEN: 'open',
};

const CONFIG = {
  MOBILE_BREAKPOINT: 768.9,
  ANIMATION_DELAY: 400,
};

// const DATA_ATTRS = {
//   SIDEBAR_PROJECT_BUTTON: 'data-sidebar-toggle',
//   SIDEBAR_EMPLOYEE_BUTTON: 'data-sidebar-toggle',
// };

const DATA_ATTRS = {
  TABS: 'data-tab',
  TAB_VALUES: {
    project: 'projects',
    employee: 'employees',
  },
};

const DOM = {
  MAIN_CONTENT: document.querySelector('.main-content'),
  TABLES: {
    BUTTON_ADD_PROJECT: document.querySelector('.btn-primary_project'),
    BUTTON_ADD_EMPLOYEE: document.querySelector('.btn-primary_employee'),
  },
  SLiDE_PANEL: {
    PROJECT: {
      OVERLAY: document.querySelector('.panel-overlay_project'),
      ADD: document.querySelector('.slide-panel_project'),
      CLOSE_BTN: document.querySelector('.close-panel_project'),
      CANSEL_BTN: document.querySelector('.btn-secondary_cansel-project'),
    },
    EMPLOYEE: {
      OVERLAY: document.querySelector('.panel-overlay_employee'),
      ADD: document.querySelector('.slide-panel_employee'),
      CLOSE_BTN: document.querySelector('.close-panel_employee'),
      CANSEL_BTN: document.querySelector('.btn-secondary_cansel-employee'),
    },
  },
};

export { CLASSES, CONFIG, DATA_ATTRS, DOM };
