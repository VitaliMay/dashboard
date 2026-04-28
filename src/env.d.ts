// Объявляем, что все файлы .scss — это модули
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

// Поддержка других форматов, чтобы TS не ругался на них
declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
