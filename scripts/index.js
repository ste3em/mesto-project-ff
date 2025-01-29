// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
    let cardElement = cardTemplate.cloneNode(true).firstElementChild;
    let cardImage = cardElement.querySelector(".card__image");
    let cardTitle = cardElement.querySelector(".card__title");
    let deleteButton = cardElement.querySelector(".card__delete-button");

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener("click", function() {
        deleteCallback(cardElement);
    });
    
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    placesList.removeChild(cardElement);
}

// @todo: Вывести карточки на страницу
function renderCards() {
    placesList.innerHTML = ""; // Очищаем список
    for (let i = 0; i < initialCards.length; i++) {
        let cardElement = createCard(initialCards[i], deleteCard);
        placesList.appendChild(cardElement);
    }
}

// @todo: Запуск функции при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    renderCards();
});
