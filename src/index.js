import "./pages/index.css";
import { createCard, pressLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  showInputError,
} from "./components/validation.js";
import {
  getInitialCards,
  postNewCard,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  checkMimeType,
  removeCard,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");
const modals = document.querySelectorAll(".popup");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".popup_type_edit");
const profileEditForm = document.forms["edit-profile"];

const profileAvatar = document.querySelector(".profile__image");
const profileAvatarModal = document.querySelector(".popup_type_new_avatar");
const profileAvatarForm = document.forms["new-avatar"];
const profileAvatarInput = profileAvatarForm.elements["avatar-link"];

const newPlaceModal = document.querySelector(".popup_type_new-card");
const newPlaceForm = document.forms["new-place"];
const newPlaceButton = document.querySelector(".profile__add-button");
const newPlaceNameInput = newPlaceForm.elements["place-name"];
const newPlaceUrlInput = newPlaceForm.elements["link"];

const imageModal = document.querySelector(".popup_type_image");
const imageModalPicture = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");

const confirmModal = document.querySelector(".popup_type_confirm");
const confirmForm = document.forms["confirm"];

const imageContentTypes = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/x-icon",
  "image/vnd.djvu",
  "image/svg+xml",
];

let user;
let cardToDelete;
let cardIdToDelete;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function profileFormSubmit(evt) {
  evt.preventDefault();
  const inputs = Array.from(profileEditForm.querySelectorAll(".popup__input"));
  inputs.forEach(input => input.disabled = true);
  renderLoading(profileEditForm, true, "Сохранение...");
  updateUserInfo(
    profileEditForm.elements.name.value,
    profileEditForm.elements.description.value
  )
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(profileEditForm, false);
      inputs.forEach(input => input.disabled = false);
    });
}

function newPlaceFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(newPlaceModal, true, "Сохранение...");
  const newPlaceCard = {
    name: newPlaceNameInput.value,
    link: newPlaceUrlInput.value,
  };
  postNewCard(newPlaceCard)
    .then((newPlaceCard) => {
      placesList.prepend(
        createCard({ newPlaceCard, pressLike, zoomCard, deleteCallback, user })
      );
      closeModal(newPlaceModal);
      newPlaceForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(newPlaceModal, false);
    });
}

function profileAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newAvatarUrl = profileAvatarInput.value;
  checkMimeType(newAvatarUrl)
    .then((data) => {
      if (
        imageContentTypes.some(
          (type) => type === data.headers.get("content-type")
        )
      ) {
        renderLoading(profileAvatarModal, true, "Сохранение...");
        clearValidation(profileAvatarForm, validationConfig);
        profileAvatarForm.reset();
        updateUserAvatar(newAvatarUrl)
          .then((data) => {
            profileAvatar.style = `background-image: url('${data.avatar}');`;
            closeModal(profileAvatarModal);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            renderLoading(profileAvatarModal, false);
          });
      } else {
        showInputError(
          profileAvatarForm,
          profileAvatarInput,
          "Вставьте ссылку на изображение",
          validationConfig
        );
      }
    })
    .catch((err) => console.log(err));
}

function zoomCard(cardName, cardUrl) {
  imageModalPicture.src = cardUrl;
  imageModalPicture.alt = cardName;
  imageModalCaption.textContent = cardName;
  openModal(imageModal);
}

function renderLoading(modal, isLoading, loadingText = "Сохранение...") {
  const button = modal.querySelector(".popup__button");
  if (!button) return;
  const originalText = button.dataset.originalText || button.textContent;
  if (isLoading) {
    button.dataset.originalText = originalText;
    button.textContent = loadingText;
  } else {
    button.textContent = button.dataset.originalText || "Сохранить";
  }
}

function deleteCallback(card, id) {
  cardToDelete = card;
  cardIdToDelete = id;
  openModal(confirmModal);
}

confirmForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(confirmModal, true, "Удаление...");
  removeCard(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(confirmModal);
      cardToDelete = null;
      cardIdToDelete = null;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(confirmModal, false);
    });
});

profileEditButton.addEventListener("click", () => {
  profileEditForm.elements.name.value = profileName.textContent;
  profileEditForm.elements.description.value = profileDescription.textContent;
  openModal(profileEditModal);
  clearValidation(profileEditForm, validationConfig);
});

profileAvatar.addEventListener("click", () => {
  openModal(profileAvatarModal);
});

newPlaceButton.addEventListener("click", () => {
  openModal(newPlaceModal);
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
});

newPlaceForm.addEventListener("submit", newPlaceFormSubmit);
profileEditForm.addEventListener("submit", profileFormSubmit);
profileAvatarForm.addEventListener("submit", profileAvatarFormSubmit);

modals.forEach((modal) => {
  modal.querySelector(".popup__close").addEventListener("click", () => {
    closeModal(modal);
  });
  modal.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(modal);
    }
  });
});

enableValidation(validationConfig);

Promise.all([getInitialCards(), getUserInfo()])
  .then(([resCards, resUser]) => {
    profileName.textContent = resUser.name;
    profileDescription.textContent = resUser.about;
    profileAvatar.style = `background-image: url('${resUser.avatar}');`;
    user = resUser;
    resCards.forEach((newPlaceCard) => {
      placesList.append(
        createCard({ newPlaceCard, pressLike, zoomCard, deleteCallback, user })
      );
    });
  })
  .catch((err) => console.log(err));

export { user };
