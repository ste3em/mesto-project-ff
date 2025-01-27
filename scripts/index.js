// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = popupNewCard.querySelector(".popup__form");
const inputCardName = formNewCard.querySelector(".popup__input_type_card-name");
const inputCardLink = formNewCard.querySelector(".popup__input_type_url");

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImage.addEventListener("click", () => {
    openPopupImage(cardData.name, cardData.link);
  });

  return cardElement;
}

// @todo: Вывести карточки на страницу
function renderCards() {
  placesList.innerHTML = "";
  const savedCards = initialCards;
  savedCards.forEach((card) => placesList.append(createCard(card)));
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});

// @todo: Обработчики событий
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    closePopup(event.target.closest(".popup"));
  });
});

formNewCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  placesList.prepend(createCard(newCard));

  formNewCard.reset();
  closePopup(popupNewCard);
});

function openPopupImage(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  popupImage.classList.add("popup_is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}
