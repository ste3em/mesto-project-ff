export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(form => {
    const inputs = form.querySelectorAll('input');
    const button = form.querySelector('button[type="submit"]');

    inputs.forEach(input => {
      const errorEl = createErrorEl(input);
      input.insertAdjacentElement('afterend', errorEl);

      input.addEventListener('input', () => {
        checkValidity(input, errorEl);
        toggleButton(inputs, button);
      });
    });

    toggleButton(inputs, button);

    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        inputs.forEach(input => checkValidity(input, input.nextElementSibling));
      }
    });
  });
}

function createErrorEl(input) {
  const span = document.createElement('span');
  span.classList.add('error-message');
  span.id = `${input.name}-error`;
  return span;
}

function checkValidity(input, errorEl) {
  if (!input.validity.valid) {
    input.classList.add('input-error');
    errorEl.textContent = input.validationMessage;
    errorEl.classList.add('error-message_visible');
  } else {
    input.classList.remove('input-error');
    errorEl.textContent = '';
    errorEl.classList.remove('error-message_visible');
  }
}

function toggleButton(inputs, button) {
  const hasError = [...inputs].some(i => !i.validity.valid);
  button.disabled = hasError;
}
