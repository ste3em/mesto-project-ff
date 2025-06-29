export function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.popup_opened');
    if (opened) closeModal(opened);
  }
}

export function setupModalListeners(modals) {
  modals.forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) closeModal(popup);
    });

    const closeBtn = popup.querySelector('.popup__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(popup));
    }
  });
}
