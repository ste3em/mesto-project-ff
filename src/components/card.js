export function createCard(title, link) {
  const template = document.getElementById('place-card-template').content;
  const placeCard = template.cloneNode(true);

  const image = placeCard.querySelector('.place-card__image');
  const name = placeCard.querySelector('.place-card__title');
  const like = placeCard.querySelector('.place-card__like');
  const del = placeCard.querySelector('.place-card__delete');

  image.src = link;
  image.alt = title;
  name.textContent = title;

  like.addEventListener('click', () => {
    like.classList.toggle('place-card__like_active');
  });

  del.addEventListener('click', () => {
    placeCard.remove();
  });

  return placeCard;
}
