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

export { CLASSES, CONFIG, DATA_ATTRS };
