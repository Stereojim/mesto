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

const person = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const profileForm = document.querySelector(".popup_type_profile-edit");
const placeForm = document.querySelector(".popup_type_create-place");
const pictureShow = document.querySelector(".popup_type_picture-open");
const profileEditButton = document.querySelector(".profile__edit-button");
const placeAddButton = document.querySelector(".profile__add-button");
const profileEditClose = document.querySelector(".popup__button-close_type_profile-edit");
const placeFormClose = document.querySelector(".popup__button-close_type_create-place");
const profileSubmitButton = document.querySelector(".popup__button-submit_type_profile");
const cardSubmitButton = document.querySelector(".popup__button-submit_type_card");
const places = document.querySelector(".elements");
const placeFormAdd = document.querySelector(".popup__form_type_place");
const profileEditForm = profileForm.querySelector(".popup__form_profile_edit");
const inputPlaceName = document.querySelector(".popup__input_type_place-name");
const inputPictureLink = document.querySelector(".popup__input_type_place-link");
export const modalImg = document.querySelector(".popup__picture");
export const caption = document.querySelector(".popup__picture-title");

// конфиг класса валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_has-error",
  errorClass: "popup__error_visible",
};


const addPlaceFormValidation = new FormValidator(validationConfig, placeFormAdd);
const profileEditFormValidation = new FormValidator(validationConfig, profileEditForm);

// запуск валидации на обе формы
addPlaceFormValidation.enableValidation();
profileEditFormValidation.enableValidation();


 // создание шаблона карточки
const renderCard = (data) => {
  const card = new Card(data, '.square-card')
  const cardElement = card.generateCard()
  places.prepend(cardElement); // возвращает в DOM? тут надо убрать?
}

// добавление карточек массива
initialCards.forEach((data) => {
  renderCard(data)
/*   const card = new Card(data, ".square-card");
  const cardElement = card.generateCard();
  document.querySelector(".elements").append(cardElement); // заменить на функцию */
});

//удаление на esc
function closePopupByEsc(e) {
  const openedPopup = document.querySelector(".popup_opened");
  if (e.key === "Escape") {
    closePopup(openedPopup);
    formReset()
  }
}


// функция открытия модальных окон
export const openPopup = function (popup) {
    // слушатель функции закрытия на esc здесь же
  document.addEventListener("keydown", closePopupByEsc);
  popup.classList.add("popup_opened");
};


// функция закрытия модального окон
const closePopup = function (popup) {
document.removeEventListener("keydown", closePopupByEsc);
popup.classList.remove("popup_opened");
};


// открытие формы редактирования профиля
profileEditButton.addEventListener("click", () => {
  openPopup(profileForm);
  profileEditFormValidation.resetValidation(profileForm);
  profileEditFormValidation.disableSubmitButton(profileSubmitButton);
  nameInput.value = person.textContent;
  professionInput.value = profession.textContent;
});


// открытиe формы создания карточки места
placeAddButton.addEventListener("click", () => {
  openPopup(placeForm);
  addPlaceFormValidation.resetValidation(placeForm);
  addPlaceFormValidation.disableSubmitButton(cardSubmitButton);
});


// сохранение новой формы данных об авторе
function saveNewProfile() {
  const newName = nameInput.value;
  const newProfession = professionInput.value;
  person.textContent = newName;
  profession.textContent = newProfession;
  closePopup(profileForm);
}


// сохранение новой карточки места
const placeFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({name: inputPlaceName.value, link: inputPictureLink.value});
    closePopup(placeForm);
    formReset()
  };





// слушатель кнопки сохранения карточки данных об авторе
profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  saveNewProfile();
});


// слушатель действия по кнопке создания новой карточки места
placeForm.addEventListener("submit", placeFormSubmit);


// закрытие формы редактирования профиля автора
profileEditClose.addEventListener("click", () => {
  closePopup(profileForm);
});


// закрытие формы создания новой карточки места
placeFormClose.addEventListener("click", () => {
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
    formReset()
  }
});

pictureShow.addEventListener("click", function (e) {
  if (e.target.closest(".popup__container")) {
  } else {
    closePopup(pictureShow);
  }
});

function formReset() {
  inputPictureLink.value = '';
  inputPlaceName.value = '';
}

function createCard() {

}

