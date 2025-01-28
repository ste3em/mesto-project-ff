// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplate.cloneNode(true).firstElementChild;
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener("click", () => deleteCallback(cardElement));
    
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
    placesList.innerHTML = "";
    initialCards.forEach((card) => {
        const cardElement = createCard(card, deleteCard);
        placesList.append(cardElement);
    });
}

document.addEventListener("DOMContentLoaded", renderCards);
