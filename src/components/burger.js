import { CLASSES, CONFIG } from '../config/config';

const burgerButton = document.querySelector('.burger-button');
const body = document.body;
const menu = document.querySelector('.menu');

const initBurger = () => {
  if (!menu || !burgerButton) return;

  if (burgerButton) {
    burgerButton.addEventListener('click', handleBurgerClick);
  }

  if (menu) {
    menu.addEventListener('click', burgerMenuLinkClose);
  }

  window.addEventListener('resize', handleResize);
};

function closeMenu() {
  menu.classList.remove(CLASSES.MENU_OPEN);
  burgerButton.classList.remove(CLASSES.BUTTON_ROTATE);
  body.classList.remove(CLASSES.BODY_LOCK);
}

function handleBurgerClick() {
  menu.classList.toggle(CLASSES.MENU_OPEN);
  burgerButton.classList.toggle(CLASSES.BUTTON_ROTATE);
  body.classList.toggle(CLASSES.BODY_LOCK);
  window.scrollTo({ top: 0, behavior: 'smooth' }); // чтобы крестик не был частично скрыт
}

function burgerMenuLinkClose(event) {
  if (event.target.classList.contains(CLASSES.MENU_LINK)) {
    closeMenu();
  }
}

function handleResize() {
  if (window.innerWidth >= CONFIG.MOBILE_BREAKPOINT && menu.classList.contains(CLASSES.MENU_OPEN)) {
    closeMenu();
  }
}

export { initBurger };
