const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCallback, likeCallback, imageClickCallback) {
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", () => deleteCallback(cardElement));
  likeButton.addEventListener("click", () => likeCallback(likeButton));
  cardImage.addEventListener("click", () => imageClickCallback(cardData));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, toggleLike };
