import { initialCards } from './scripts/cards.js';
import './pages/index.css';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// DOM-узлы
const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const descriptionInput = formEditProfile.querySelector('.popup__input_type_description');

const formAddCard = document.forms['new-place'];
const placeNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const placeLinkInput = formAddCard.querySelector('.popup__input_type_url');

// Открытие и закрытие попапов
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

addButton.addEventListener('click', () => openModal(popupAddCard));

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

// Сохранение данных профиля
formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(popupEdit);
});

// Добавление новой карточки
formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  const newCard = createCard(newCardData, deleteCard, toggleLike, handleImageClick);
  placesList.prepend(newCard);
  formAddCard.reset();
  closeModal(popupAddCard);
});

// Открытие попапа изображения
function handleImageClick(cardData) {
  popupImagePicture.src = cardData.link;
  popupImagePicture.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  openModal(popupImage);
}

// Отображение стартовых карточек
function renderCards() {
  placesList.innerHTML = "";
  initialCards.forEach(card => {
    const cardElement = createCard(card, deleteCard, toggleLike, handleImageClick);
    placesList.appendChild(cardElement);
  });
}

window.addEventListener("load", renderCards);
