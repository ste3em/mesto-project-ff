import { createCard } from './card.js';
import { openModal, closeModal, setupModalListeners } from './modal.js';
import { enableValidation } from './validation.js';
import { initialCards } from './constants.js';

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileBtn = document.getElementById('edit-profile-btn');
const addCardBtn = document.getElementById('add-card-btn');

const profileForm = document.forms['form-edit'];
const addCardForm = document.forms['form-card'];

const addCardModal = document.getElementById('popup-card');
const editProfileModal = document.getElementById('popup-edit');
const cardList = document.querySelector('.cards');

function renderInitialCards() {
  initialCards.forEach(({ name, link }) => {
    const card = createCard(name, link);
    cardList.append(card);
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileForm.name.value;
  profileJob.textContent = profileForm.job.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const { title, link } = addCardForm.elements;
  const card = createCard(title.value, link.value);
  cardList.prepend(card);
  closeModal(addCardModal);
  addCardForm.reset();
}

function setupEventListeners() {
  editProfileBtn.addEventListener('click', () => {
    profileForm.name.value = profileName.textContent;
    profileForm.job.value = profileJob.textContent;
    openModal(editProfileModal);
  });

  addCardBtn.addEventListener('click', () => {
    addCardForm.reset();
    openModal(addCardModal);
  });

  profileForm.addEventListener('submit', handleProfileFormSubmit);
  addCardForm.addEventListener('submit', handleAddCardFormSubmit);
}

// --- Инициализация проекта ---
renderInitialCards();
setupEventListeners();
setupModalListeners(document.querySelectorAll('.popup'));
enableValidation({ formSelector: 'form' });
