import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from '../components/Section.js';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";


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


const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const profileForm = document.querySelector(".popup_type_profile-edit");
const placeForm = document.querySelector(".popup_type_create-place");
const profileEditButton = document.querySelector(".profile__edit-button");
const placeAddButton = document.querySelector(".profile__add-button");
const profileSubmitButton = document.querySelector(".popup__button-submit_type_profile");
const cardSubmitButton = document.querySelector(".popup__button-submit_type_card");
const places = document.querySelector(".elements");
const placeFormAdd = document.querySelector(".popup__form_type_place");
const profileEditForm = profileForm.querySelector(".popup__form_profile_edit");

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
};


// сохранение новой карточки места
const placeFormSubmit = (data) => {
const card = createCard({
  name: data['place-name-input'],
  link: data['place-link-input']
})
section.addItem(card);

addCardPopup.close();
};
 
const section = new Section({ items: initialCards, renderer:renderCard }, '.elements')
const imagePopup = new PopupWithImage('.popup_type_picture-open');
const addCardPopup = new PopupWithForm('.popup_type_create-place', placeFormSubmit);
const editProfilePopup = new PopupWithForm('.popup_type_profile-edit', saveNewProfile);
const userInfo = new UserInfo({ profileNameSelector: '.profile__name', proileJobSelector: '.profile__profession' })

imagePopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()  

section.renderItems()

