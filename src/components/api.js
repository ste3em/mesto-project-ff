const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '07810aab-04fa-4135-aeb0-9e8915bc0b09',
    'Content-Type': 'application/json'
  }
}

function handleResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => handleResponse(res))
}

function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .then(res => handleResponse(res))
}

function updateUserAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
  .then(res => handleResponse(res))
}

function getInitialCards() {
  return fetch (`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => handleResponse(res))
}

function postNewCard(newPlaceCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ 
      name: newPlaceCard.name, 
      link: newPlaceCard.link 
    })
  })
  .then(res => handleResponse(res))
}

function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => handleResponse(res))
}

function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => handleResponse(res))
}

function checkMimeType(url) {
  return fetch(`${url}`, {
    method: 'HEAD',
  })
  .then(res => handleResponse(res))
}

export {
  getInitialCards,
  postNewCard,
  removeCard,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  addLike,
  removeLike,
  checkMimeType,
}