// ----------------- Импорты -----------------
import { initialCards } from './scripts/cards.js';
import './pages/index.css';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// ----------------- Глобальные переменные -----------------

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Формы и поля
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const descriptionInput = formEditProfile.querySelector('.popup__input_type_description');

const formAddCard = document.forms['new-place'];
const placeNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const placeLinkInput = formAddCard.querySelector('.popup__input_type_url');

// Карточки
const placesList = document.querySelector(".places__list");

// ----------------- Функции -----------------

function handleImageClick(cardData) {
  popupImagePicture.src = cardData.link;
  popupImagePicture.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  openModal(popupImage);
}

function renderCards() {
  placesList.innerHTML = "";
  initialCards.forEach(card => {
    const cardElement = createCard(card, deleteCard, toggleLike, handleImageClick);
    placesList.appendChild(cardElement);
  });
}

// ----------------- Функции-обработчики -----------------

function handleEditButtonClick() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(popupEdit);
}

function handleAddButtonClick() {
  openModal(popupAddCard);
}

function handleCloseButtonClick(evt) {
  const popup = evt.target.closest('.popup');
  closeModal(popup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(popupEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  const newCard = createCard(newCardData, deleteCard, toggleLike, handleImageClick);
  placesList.prepend(newCard);
  formAddCard.reset();
  closeModal(popupAddCard);
}

// ----------------- Навешивание слушателей -----------------

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
closeButtons.forEach(button => button.addEventListener('click', handleCloseButtonClick));
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleAddCardFormSubmit);

// ----------------- Инициализация при загрузке -----------------

document.querySelectorAll('.popup').forEach(popup => {
  popup.classList.add('popup_is-animated');
});

window.addEventListener("load", renderCards);
