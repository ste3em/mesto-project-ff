const allowedFields = ['name', 'description', 'place-name'];
const nameFieldPattern = /^[A-Za-zА-Яа-яЁё\s\-]+$/;

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!errorElement) return;
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!errorElement) return;
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  const isNameInput = allowedFields.includes(inputElement.name);

  // 1. Обязательное поле
  if (inputElement.validity.valueMissing) {
    showInputError(formElement, inputElement, 'Вы пропустили это поле', config);
    return;
  }

  // 2. Неверный формат URL
  if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
    showInputError(formElement, inputElement, 'Введите адрес сайта.', config);
    return;
  }

  // 3. Кастомная проверка по RegExp
  if (isNameInput && !nameFieldPattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, inputElement.dataset.errorMessage, config);
    return;
  }

  // 4. Браузерные ошибки (например, tooShort, tooLong)
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return;
  }

  // 5. Всё в порядке
  hideInputError(formElement, inputElement, config);
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid ||
    (allowedFields.includes(inputElement.name) && !nameFieldPattern.test(inputElement.value)));
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
}

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}

export { showInputError };