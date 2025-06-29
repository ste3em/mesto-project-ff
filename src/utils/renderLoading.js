/**
 * Универсальный рендер загрузки для кнопки
 * @param {boolean} isLoading - идёт ли процесс
 * @param {HTMLElement} button - элемент кнопки
 * @param {Object} options - тексты
 * @param {string} options.loadingText - текст при загрузке
 * @param {string} options.defaultText - стандартный текст
 */
export function renderLoading(isLoading, button, { loadingText = 'Сохранение...', defaultText }) {
  if (!button) return;
  button.textContent = isLoading ? loadingText : defaultText;
}
