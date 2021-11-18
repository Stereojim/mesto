const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closePopapButton = document.querySelector(".popup__button-close");
let person = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector("#name");
const professionInput = document.querySelector("#profession");
let placeName = document.querySelector("#placeName");
let pictureLink = document.querySelector("#pictureLink");
const submitForm = document.querySelector(".popup__container");
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

initialCards.unshift({
  name: "мишка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
});

// добавление всех карточек массива

initialCards.forEach(function (element) {
  const cardElement = placeCard.cloneNode(true);

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__place-name").textContent = element.name;
  cardElement.querySelector(".card__image").alt = element.name;

  places.append(cardElement);
  
});

// добавление и открытие попапа для создания новой карточки

function addPlace() {
  const placeTemplate = document.querySelector("#place-template").content;
  const newPlace = placeTemplate.querySelector(".popup").cloneNode(true);
 
  placeName = "";
  pictureLink= "";
  places.append(newPlace);

  function cancelAddingPlace() {
    newPlace.remove();
  }

  let closePlaceAdd = document.querySelector("#closePlaceAdd");
  closePlaceAdd.addEventListener("click", cancelAddingPlace);
}

// закрытие формы для создания карточки места

/* function closeAddPlacePopup() {
  newPlace.classList.remove("popup_opened");
} */

// сохранение карточки

function addPlaceCard(evt) {
  evt.preventDefault();
  closePlaceAdd()

  const newCard = placeCard.querySelector(".card").cloneNode(true);
  newCard.querySelector(".card__image").src = pictureLink.value;
  newCard.querySelector(".card__place-name").textContent = placeName.value;
  places.append(newCard);

};

placePopupTemplate.addEventListener("click", addPlaceCard);

/*  document.querySelector('.popup__button-submit').addEventListener("click", function () {
  let place = placeName.value;
  let picture = pictureLink.value;
  
  newCard.querySelector(".card__image").src = place;
  newCard.querySelector(".card__place-name").textContent = picture;


  addPlaceCard(place.value, picture.value);

  place.value = " ";
  picture.value = " "; 
}) ; */

// сохранение карточки с местом

/*  function addPlaceSubmitHandler(evt) {
  evt.preventDefault();

  const newPictureLink = pictureLink.value;
  const newPlaceName = placeName.value;

  document.querySelector(".card__image").src = newPictureLink;
  cardElement.querySelector(".card__place-name").textContent = newPlaceName;

  closeAddPlacePopup();
}  */

// кнопки

addPlaceButton.addEventListener("click", addPlace);

// кнопка лайк

/* function toggleLike() {
  likeButton.classList.add(".card__like-button_active");
}
likeButton.addEventListener("click", toggleLike);  */

// лайк карточки

placeCard.querySelector(".card__like-button").addEventListener("click", function (evt) {
     evt.currentTarget.classList.toggle("card__button-like_active");
  });

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


/* function deleteCard() {
  document.querySelector('.card__remove-button').parentElement.remove()
}; */

let removeButton = document.getElementsByClassName('card__remove-button');
for (let i = 0; i < removeButton.length; i++) {
  removeButton[i].addEventListener('click', function(e) {
    e.currentTarget.parentNode.remove();
  }, false);
};

let likeButton = document.getElementsByClassName('card__like-button');
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', function(e) {
    e.currentTarget.classList.toggle("card__like-button_active");
  }, false);
}
