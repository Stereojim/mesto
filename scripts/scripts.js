import { FormValidator } from "./FormValidator.js";
import { Card } from './Card.js';

 
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
] 


const editButton = document.querySelector(".profile__edit-button");
const person = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const placeCard = document.querySelector("#placeCard").content;
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const profileForm = document.querySelector(".popup_type_profile-edit");
const profileFormSumbitButton = profileForm.querySelector(".popup__button-submit");
const placeForm = document.querySelector(".popup_type_create-place");
const pictureShow = document.querySelector(".popup_type_picture-open");
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const closePopapButton = document.querySelectorAll(".popup__button-close");
const closeProfileEdit = document.querySelector(".popup__button-close_type_profile-edit");
const closePlaceForm = document.querySelector(".popup__button-close_type_create-place");
const submitProfileButton = document.querySelector(".popup__button-submit_type_profile");
const submitCardButton = document.querySelector(".popup__button-submit_type_card");
const removeCardButton = document.querySelector(".card__remove-button");
const cardLikeButton = document.querySelector(".card__like-button");
const card = document.querySelector(".card");
const cardImage = document.querySelector(".card__image");
const places = document.querySelector(".elements");
const addPlaceForm = document.querySelector(".popup__form_type_place");
const profileEditForm = profileForm.querySelector(".popup__form_profile_edit");
const inputPlaceName = document.querySelector(".popup__input_type_place-name");
const inputPictureLink = document.querySelector(".popup__input_type_place-link");

// конфиг класса валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_has-error",
  errorClass: "popup__error_visible",
};


const addPlaceFormValidation = new FormValidator(validationConfig, addPlaceForm);
const profileEditFormValidation = new FormValidator(validationConfig, profileEditForm);

// запуск валидации на обе формы
addPlaceFormValidation.enableValidation();
profileEditFormValidation.enableValidation();


// добавление карточек массива
initialCards.forEach((data) => {
  const card = new Card(data, ".square-card");
  const cardElement = card.generateCard();

  document.querySelector(".elements").append(cardElement);
});
 

//удаление на esc
function closePopupByEsc(e) {
  const openedPopup = document.querySelector(".popup_opened");
  if (e.key === "Escape") {
    closePopup(openedPopup);
  }
}


// функция открытия модальных окон
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  // слушатель функции закрытия на esc здесь же
  document.addEventListener("keydown", closePopupByEsc);
};


// функция закрытия модального окон
const closePopup = function (popup) {
document.removeEventListener("keydown", closePopupByEsc);
popup.classList.remove("popup_opened");
};


// открытие формы редактирования профиля
editProfileButton.addEventListener("click", () => {
  openPopup(profileForm);
  profileEditFormValidation.resetValidation(profileForm);
  profileEditFormValidation.disableSubmitButton(submitProfileButton);
  nameInput.value = person.textContent;
  professionInput.value = profession.textContent;
});


// открытиe формы создания карточки места
addPlaceButton.addEventListener("click", () => {
  openPopup(placeForm);
  addPlaceFormValidation.resetValidation(placeForm);
  addPlaceFormValidation.disableSubmitButton(submitCardButton);
});


// сохранение новой формы данных об авторе
function saveNewProfile() {
  const newName = nameInput.value;
  const newProfession = professionInput.value;
  person.textContent = newName;
  profession.textContent = newProfession;
  console.log("name: ", nameInput.value);
  closePopup(profileForm);
}


// сохранение новой карточки места
const placeFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({name: inputPlaceName.value, link: inputPictureLink.value});
    closePopup(placeForm);
  };


// создание шаблона карточки
const renderCard = (data) => {
  const card = new Card(data, '.square-card')
  const cardElement = card.generateCard()
  places.prepend(cardElement);
}


// слушатель кнопки сохранения карточки данных об авторе
profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  saveNewProfile();
});


// слушатель действия по кнопке создания новой карточки места
placeForm.addEventListener("submit", placeFormSubmit);


// закрытие формы редактирования профиля автора
closeProfileEdit.addEventListener("click", () => {
  closePopup(profileForm);
});


// закрытие формы создания новой карточки места
closePlaceForm.addEventListener("click", () => {
  closePopup(placeForm);
});


// слушатели закрытия для каждой формы
profileForm.addEventListener("click", function (e) {
  if (e.target.closest(".popup__container")) {
  } else {
    closePopup(profileForm);
  }
});

placeForm.addEventListener("click", function (e) {
  if (e.target.closest(".popup__container")) {
  } else {
    closePopup(placeForm);
  }
});

pictureShow.addEventListener("click", function (e) {
  if (e.target.closest(".popup__container")) {
  } else {
    closePopup(pictureShow);
  }
});

