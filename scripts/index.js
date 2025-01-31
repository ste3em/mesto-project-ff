// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
// все переменные, которые не изменяются, объявлены через const
function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplate.cloneNode(true).firstElementChild;
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener("click", function() {
        deleteCallback(cardElement);
    });
    
    return cardElement;
}

// @todo: Функция удаления карточки
//функция удаления карточки теперь не зависит от родительского элемента placesList
function deleteCard(cardElement) {
    cardElement.remove();
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
//  устаревший DOMContentLoaded заменён на window.addEventListener("load", () => {})
window.addEventListener("load", () => {
    renderCards();
});
