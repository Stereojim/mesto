const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closePopapButton = document.querySelector(".popup__button-close");
let person = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector("#name");
const professionInput = document.querySelector("#profession");
let placeName = document.querySelector("#placeName");
let pictureLink = document.querySelector("#pictureLink");
const submitForm = document.querySelector("#personCard");
const addPlaceButton = document.querySelector(".profile__add-button");
const closePlaceAdd = document.querySelector("#closePlaceAdd");
const places = document.querySelector(".elements");
const placeCard = document.querySelector("#placeCard").content;
const placePopupTemplate = document.querySelector("#place-template");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


// прямое добавление в массив

/* initialCards.unshift({
  name: "мишка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",

}); */



// рендеринг карточек из массива

const createPlacesDomNode = (item) => {
  const placeCardTemplate = placeCard.querySelector('.card').cloneNode(true);
  placeCardTemplate.querySelector('.card__place-name').textContent = item.name;
  placeCardTemplate.querySelector('.card__image').src = item.link;

  return placeCardTemplate;

}

const result = initialCards.map((item) => {
  return createPlacesDomNode(item);
});

places.append(...result);

/* // альтернативное добавление карточек массива

initialCards.forEach(function (element) {
  const cardElement = placeCard.cloneNode(true);

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__place-name").textContent = element.name;
  cardElement.querySelector(".card__image").alt = element.name;

  places.append(cardElement);
  
}); */

// добавление и открытие попапа для создания новой карточки

function addPlace() {
  const placeTemplate = document.querySelector("#place-template").content;
  const newPlace = placeTemplate.querySelector(".popup").cloneNode(true);
 
  places.append(newPlace);

  function cancelAddingPlace() {
    newPlace.remove();
  }

  let closePlaceAdd = document.querySelector("#closePlaceAdd");
  closePlaceAdd.addEventListener("click", cancelAddingPlace);


}

const placeSubmitFormHandler = (evt) => {
  evt.preventDefault();
  alert("hello there!");
}; 

placePopupTemplate.addEventListener('submit', placeSubmitFormHandler);





// сохранение карточки 

/* const cardFormSubmitHandler = (evt) => {
  evt.preventDefault();

  const inputPlaceName = placeName.value;
  const inputPistureLink = pictureLink.value;

  const placeString = createHTMLString({ name: inputPlaceName}, { link: inputPistureLink});

  places.append(placeString);

  placeName.value = '';
  pictureLink.value = '';

}

placePopupTemplate.addEventListener('submit', cardFormSubmitHandler);

 const createPlaceTemplate = (item) => {
  const placeCardTemplate = placeCard.querySelector('.card').cloneNode(true);
  placeCardTemplate.querySelector('#placeName').textContent = item.name;
  placeCardTemplate.querySelector('#pictureLink').textContent = item.link;

  return placeCardTemplate;

}  */



// document.querySelector('.place-submit').addEventListener('submit', placeSubmitFormHandler);



// кнопки

addPlaceButton.addEventListener("click", addPlace);



// редактирование профиля
// открытие формы для редактирования профиля

function openPopap() {
  popup.classList.add("popup_opened");
  nameInput.value = person.textContent;
  professionInput.value = profession.textContent;
}

// закрытие формы для редактирования профиля

function closePopap() {
  popup.classList.remove("popup_opened");
}

// сохранение данных профиля

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newProfession = professionInput.value;
  person.textContent = newName;
  profession.textContent = newProfession;
  closePopap();
}

// кнопки

submitForm.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", openPopap);
closePopapButton.addEventListener("click", closePopap);

// кнопка удаления карточки

let removeButton = document.getElementsByClassName('card__remove-button');
for (let i = 0; i < removeButton.length; i++) {
  removeButton[i].addEventListener('click', function(e) {
    e.currentTarget.parentNode.remove();
  }, false);
};

// лайк

let likeButton = document.getElementsByClassName('card__like-button');
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', function(e) {
    e.currentTarget.classList.toggle("card__like-button_active");
  }, false);
}
