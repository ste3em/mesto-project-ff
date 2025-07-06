function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) closeModal(openedModal);
  }
}

function setModalWindowEventListeners(modalWindow) {
  const closeButton = modalWindow.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(modalWindow));

  modalWindow.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(modalWindow);
    }
  });
}

export { openModal, closeModal, setModalWindowEventListeners };
