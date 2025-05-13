import { addLike, removeLike } from './api.js'

const cardTemplate = document.querySelector('#card-template').content

function createCard(params) {
  const currentCardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const currentDeleteButton = currentCardElement.querySelector('.card__delete-button')
  currentCardElement.querySelector('.card__image').src = params.newPlaceCard.link
  currentCardElement.querySelector('.card__image').alt = params.newPlaceCard.name
  currentCardElement.querySelector('.card__title').textContent = params.newPlaceCard.name
  changeLikeCounter(currentCardElement, params.newPlaceCard.likes.length)
  
  if (params.newPlaceCard.owner._id === params.user._id) {
    currentDeleteButton.addEventListener('click', () => {
      params.deleteCallback(currentCardElement, params.newPlaceCard._id)
  })
  } else {
    currentDeleteButton.setAttribute('style', 'display: none')
  }

  if (params.newPlaceCard.likes.some(likedUser => likedUser._id === params.user._id)) {
    currentCardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active')
  }

  currentCardElement.querySelector('.card__like-button').addEventListener('click', (event) => {
    params.pressLike(event, params.newPlaceCard, currentCardElement)
  })

  currentCardElement.querySelector('.card__image').addEventListener('click', () => {
    params.zoomCard(params.newPlaceCard.name, params.newPlaceCard.link)
  })
 
  return currentCardElement
}

function pressLike(event, card, cardElement) {
  const likeMethod = event.target.classList.contains('card__like-button_is-active') ? removeLike : addLike
  likeMethod(card._id)
    .then(data => {
      changeLikeCounter(cardElement, data.likes.length)
      event.target.classList.toggle('card__like-button_is-active')
      })
    .catch(err => console.log(err))
}

function changeLikeCounter(cardElement, likesValue) {
  cardElement.querySelector('.card__like-counter').textContent = likesValue
}

export {
  createCard,
  pressLike,
}