import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from './Section.js';
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";


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

const person = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const profileForm = document.querySelector(".popup_type_profile-edit");
const placeForm = document.querySelector(".popup_type_create-place");
const newPlaceForm = document.querySelector('.popup__form_type_place');
const pictureShow = document.querySelector(".popup_type_picture-open");
const profileEditButton = document.querySelector(".profile__edit-button");
const placeAddButton = document.querySelector(".profile__add-button");
const profileEditClose = document.querySelector(
  ".popup__button-close_type_profile-edit"
);
const placeFormClose = document.querySelector(
  ".popup__button-close_type_create-place"
);
const profileSubmitButton = document.querySelector(
  ".popup__button-submit_type_profile"
);
const cardSubmitButton = document.querySelector(
  ".popup__button-submit_type_card"
);
const places = document.querySelector(".elements");
const placeFormAdd = document.querySelector(".popup__form_type_place");
const profileEditForm = profileForm.querySelector(".popup__form_profile_edit");
const inputPlaceName = document.querySelector(".popup__input_type_place-name");
const inputPictureLink = document.querySelector(
  ".popup__input_type_place-link"
);
export const modalImg = document.querySelector(".popup__picture");
export const caption = document.querySelector(".popup__picture-title");
export const cardElement = document.querySelector(".popup_type_picture-open");

// конфиг класса валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_has-error",
  errorClass: "popup__error_visible",
};

// создание класса валидации и запуск
const addPlaceFormValidation = new FormValidator(validationConfig, placeFormAdd);
const profileEditFormValidation = new FormValidator(validationConfig, profileEditForm);

addPlaceFormValidation.enableValidation();
profileEditFormValidation.enableValidation();



// создание шаблона карточки
function createCard(data) {
  const card = new Card(data, ".square-card", () => {
    imagePopup.open(data.name, data.link)
  });
  return card.generateCard();
}

// вставка карточки
const renderCard = (data) => {
  const cardElement = createCard(data);
  places.prepend(cardElement);
};

// добавление карточек массива
 initialCards.forEach((data) => {
  renderCard(data);
}); 


//удаление на esc
/* function closePopupByEsc(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
} */

// функция открытия модальных окон
export const openPopup = function (popup) {
  // слушатель функции закрытия на esc здесь же
  /* document.addEventListener("keydown", closePopupByEsc); */
  popup.classList.add("popup_opened");
}; 

 // функция закрытия модального окон
const closePopup = function (popup) {
  /* document.removeEventListener("keydown", closePopupByEsc); */
  popup.classList.remove("popup_opened");
}; 

// открытие формы редактирования профиля
profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo()
  profileEditFormValidation.resetValidation(profileForm);
  profileEditFormValidation.toggleButtonState(profileSubmitButton);
  nameInput.value = name;
  professionInput.value = job;
editProfilePopup.open()
 
});

// открытиe формы создания карточки места
placeAddButton.addEventListener("click", () => {
  addPlaceFormValidation.resetValidation(placeForm);
  addPlaceFormValidation.toggleButtonState(cardSubmitButton);
  addCardPopup.open()
});

// сохранение новой формы данных об авторе
const saveNewProfile = (data) => {
  const {name, description} = data
  userInfo.setUserInfo(name, description)
  editProfilePopup.close()
}

// сохранение новой карточки места
const placeFormSubmit = (data) => {

const card = createCard({
  name: data['place-name-input'],
  link: data['place-link-input']
})
section.addItem(card);

addCardPopup.close();
};


/* 
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
});  */ 

// слушатели закрытия для каждой формы 

/*  const popupList = document.querySelectorAll(".popup"); //да, без ALL было забавно использовать forEach))

popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__form") || 
      evt.target.classList.contains("popup__button-close") 
    ) {
      closePopup(popup);
    }
  });
});   */

// слушатели закрытия по клику на оверлей

/*   profileForm.addEventListener("click", function (e) {
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
});  */

/*   pictureShow.addEventListener("click", function (e) {
  if (e.target.closest(".popup__form")) {
  } else {
    closePopup(pictureShow);
  }
});   */ 
 
const section = new Section({ items: initialCards, renderer:renderCard }, '.elements')

const imagePopup = new PopupWithImage('.popup_type_picture-open');

const addCardPopup = new PopupWithForm('.popup_type_create-place', placeFormSubmit);
const editProfilePopup = new PopupWithForm('.popup_type_profile-edit', saveNewProfile);

imagePopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()  

section.renderItems()

const userInfo = new UserInfo({ profileNameSelector: '.profile__name', proileJobSelector: '.profile__profession' })