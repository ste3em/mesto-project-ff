import { addLike, removeLike } from './api.js';

function createCard({ cardData, handleCardLike, handleCardZoom, deleteCallback, user }) {
  const templateElement = document.querySelector('#card-template');
  if (!templateElement) {
    throw new Error('Template with id "card-template" not found');
  }
  const cardTemplate = templateElement.content.querySelector('.card');
  const cardElement = cardTemplate.cloneNode(true);

  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  const isOwner = cardData.owner._id === user._id;
  if (!isOwner) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => deleteCallback(cardElement, cardData._id));
  }

  const isLiked = cardData.likes.some(likedUser => likedUser._id === user._id);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', (event) => {
    handleCardLike(event, cardData, cardElement);
  });

  imageElement.addEventListener('click', () => {
    handleCardZoom(cardData.name, cardData.link);
  });

  return cardElement;
}

function handleCardLike(event, cardData, cardElement) {
  const method = event.target.classList.contains('card__like-button_is-active') ? removeLike : addLike;
  method(cardData._id)
    .then(data => {
      updateLikeCounter(cardElement, data.likes.length);
      event.target.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.log(err));
}

function updateLikeCounter(cardElement, count) {
  const counter = cardElement.querySelector('.card__like-counter');
  counter.textContent = count;
}

export {
  createCard,
  handleCardLike,
};
