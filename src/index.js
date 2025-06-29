import "./pages/index.css";
import { createCard, handleCardLike } from "./components/card.js";
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

const cardsContainer = document.querySelector(".places__list");
const modals = document.querySelectorAll(".popup");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];

const avatarEditButton = document.querySelector(".profile__image");
const profileAvatarModal = document.querySelector(".popup_type_new_avatar");
const avatarForm = document.forms["new-avatar"];
const avatarInput = avatarForm.elements["avatar-link"];

const addCardModal = document.querySelector(".popup_type_new-card");
const addCardForm = document.forms["new-place"];
const addCardButton = document.querySelector(".profile__add-button");
const addCardNameInput = addCardForm.elements["place-name"];
const addCardUrlInput = addCardForm.elements["link"];

const previewImageModal = document.querySelector(".popup_type_image");
const previewImageElement = previewImageModal.querySelector(".popup__image");
const previewImageCaption = previewImageModal.querySelector(".popup__caption");

const confirmDeleteModal = document.querySelector(".popup_type_confirm");

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
let cardPendingDeletion;
let cardIdPendingDeletion;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(editProfileForm, true);
  updateUserInfo(
    editProfileForm.elements.name.value,
    editProfileForm.elements.description.value
  )
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(editProfileForm, false);
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(addCardModal, true);
  const newCard = {
    name: addCardNameInput.value,
    link: addCardUrlInput.value,
  };
  postNewCard(newCard)
    .then((cardData) => {
      cardsContainer.prepend(
        createCard({ cardData, handleCardLike, handleCardZoom, deleteCallback, user })
      );
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(addCardModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(addCardModal, false);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newAvatarUrl = avatarInput.value;
  checkMimeType(newAvatarUrl)
    .then((data) => {
      if (
        imageContentTypes.some(
          (type) => type === data.headers.get("content-type")
        )
      ) {
        renderLoading(profileAvatarModal, true);
        updateUserAvatar(newAvatarUrl)
          .then((data) => {
            avatarEditButton.style = `background-image: url('${data.avatar}');`;
            avatarForm.reset();
            clearValidation(avatarForm, validationConfig);
            closeModal(profileAvatarModal);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            renderLoading(profileAvatarModal, false);
          });
      } else {
        showInputError(
          avatarForm,
          avatarInput,
          "Вставьте ссылку на изображение",
          validationConfig
        );
      }
    })
    .catch((err) => console.log(err));
}

function handleCardZoom(name, link) {
  previewImageElement.src = link;
  previewImageElement.alt = name;
  previewImageCaption.textContent = name;
  openModal(previewImageModal);
}

function renderLoading(element, isLoading) {
  const currentButton = element.querySelector(".popup__button");
  currentButton.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

function deleteCallback(card, id) {
  cardPendingDeletion = card;
  cardIdPendingDeletion = id;
  openModal(confirmDeleteModal);
}

editProfileButton.addEventListener("click", () => {
  editProfileForm.elements.name.value = profileName.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
  openModal(editProfileModal);
  clearValidation(editProfileForm, validationConfig);
});

avatarEditButton.addEventListener("click", () => {
  openModal(profileAvatarModal);
});

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
});

addCardForm.addEventListener("submit", handleAddCardFormSubmit);
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

confirmDeleteModal.addEventListener("submit", (evt) => {
  evt.preventDefault();
  removeCard(cardIdPendingDeletion)
    .then(() => {
      cardPendingDeletion.remove();
      closeModal(confirmDeleteModal);
    })
    .catch((err) => {
      console.log(err);
      alert("Не удалось удалить карточку. Попробуйте позже.");
    });
});

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
    avatarEditButton.style = `background-image: url('${resUser.avatar}');`;
    user = resUser;
    resCards.forEach((cardData) => {
      cardsContainer.append(
        createCard({ cardData, handleCardLike, handleCardZoom, deleteCallback, user })
      );
    });
  })
  .catch((err) => console.log(err));

export { user, handleCardZoom };
