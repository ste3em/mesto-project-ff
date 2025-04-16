function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.classList.add("popup_is-animated");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("mousedown", handleOverlayClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("mousedown", handleOverlayClose);
}

function handleEscClose(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" && openedPopup) {
    closeModal(openedPopup);
  }
}

function handleOverlayClose(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

export { openModal, closeModal };
