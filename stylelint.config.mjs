export default {
  // 1. Парсер для SCSS, чтобы не было CssSyntaxError
  customSyntax: 'postcss-scss',

  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order', // Сортирует свойства (размеры -> цвета -> остальное)
    'stylelint-prettier/recommended', // Интегрирует Prettier в процесс проверки
  ],

  rules: {
    // 2. Паттерн для классов (BEM + CamelCase)
    // 'selector-class-pattern': '^[a-z][a-zA-Z0-9]*((-|--|__)[a-zA-Z0-9]+)*$',
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*((-|--|__|_[a-zA-Z0-9]+)*[a-zA-Z0-9]+)*$',

    // 3. Настройки для анимаций и миксинов
    'keyframes-name-pattern': '^[a-z][a-zA-Z0-9_-]*$',
    // 'scss/at-mixin-pattern': '^[a-z][a-zA-Z0-9_-]*$',

    // Разрешает kebab-case, но допускает заглавные буквы (например, для названий шрифтов)
    'scss/dollar-variable-pattern': '^[a-zA-Z][a-zA-Z0-9-]*$',

    // То же самое для миксинов (на всякий случай)
    'scss/at-mixin-pattern': '^[a-zA-Z][a-zA-Z0-9-]*$',

    // 4. Полезные правки для удобства
    'color-function-notation': 'legacy', // Разрешает привычный rgba()
    'font-family-no-missing-generic-family-keyword': null, // Меньше шума при импорте шрифтов
    'scss/at-rule-no-unknown': true, // Запрещает опечатки в @правилах
    'no-empty-source': null, // Не ругается на пустые файлы стилей
    'no-duplicate-selectors': null, // Полезно, при вложенности (nesting)
  },
};
