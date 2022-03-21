import { isEscEvent, handleEscUp, openModalWindow, imageModalWindow, imageElement, imageCaption} from '../utils.js';
import { FormValidator } from "../FormValidator.js";
import { Card } from '../Card.js'
/* import { Card } from './Card3.js'; */

 
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
const placesWrap = document.querySelector('.card-list__items');
const person = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const placeCard = document.querySelector("#placeCard").content;
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const profileForm = document.querySelector(".popup_type_profile-edit");
const profileFormSumbitButton = profileForm.querySelector(
  ".popup__button-submit"
);
const placeForm = document.querySelector(".popup_type_create-place");
const pictureShow = document.querySelector(".popup_type_picture-open");
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const closePopapButton = document.querySelectorAll(".popup__button-close");
const closeProfileEdit = document.querySelector(
  ".popup__button-close_type_profile-edit"
);
const closePlaceForm = document.querySelector(
  ".popup__button-close_type_create-place"
);
const submitProfileButton = document.querySelector(
  ".popup__button-submit_type_profile"
);
const submitCardButton = document.querySelector(
  ".popup__button-submit_type_card"
);
const removeCardButton = document.querySelector(".card__remove-button");
const cardLikeButton = document.querySelector(".card__like-button");
const card = document.querySelector(".card");
const cardImage = document.querySelector(".card__image");

const addPlaceForm = document.querySelector(".popup__form_type_place");
const profileEditForm = profileForm.querySelector(".popup__form_profile_edit");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_has-error",
  errorClass: "popup__error_visible",
};

const addPlaceFormValidation = new FormValidator(
  validationConfig,
  addPlaceForm
);
const profileEditFormValidation = new FormValidator(
  validationConfig,
  profileEditForm
);

addPlaceFormValidation.enableValidation();
profileEditFormValidation.enableValidation();




initialCards.forEach((data) => {
  const card = new Card(data, ".square-card");
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector(".card-list__items").append(cardElement);
});
  // Добавляем в DOM
  


//удаление на esc

function closePopupByEsc(e) {
  const openedPopup = document.querySelector(".popup_opened");
  if (e.key === "Escape") {
    closePopup(openedPopup);
  }
}

// функция открытия модального окна

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  // слушатель функции закрытия на esc
  document.addEventListener("keydown", closePopupByEsc);
};

// функция закрытия модального окна

const closePopup = function (popup) {
  //удаление слушателя событияю. Спасибо за комментарии - понял как посмотреть события в режиме разработчика
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

// форма изменения профиля автора

function saveNewProfile() {
  const newName = nameInput.value;
  const newProfession = professionInput.value;
  person.textContent = newName;
  profession.textContent = newProfession;
  console.log("name: ", nameInput.value);
  closePopup(profileForm);
}

const inputPlaceName = document.querySelector(
  ".popup__input_type_place-name"
);
const inputPictureLink = document.querySelector(
  ".popup__input_type_place-link"
);
// форма создания новой карточки места

/* const placeSubmit = (evt) => {
  evt.preventDefault();
  const inputPlaceName = document.querySelector(
    ".popup__input_type_place-name"
  ).value;
  const inputPictureLink = document.querySelector(
    ".popup__input_type_place-link"
  ).value;
  const cardString = generateCard({
    name: inputPlaceName,
    link: inputPictureLink,
  });

  places.prepend(cardString);
  document.querySelector(".popup__input_type_place-name").value = "";
  document.querySelector(".popup__input_type_place-link").value = "";
  closePopup(placeForm);
}; */

const placeFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({
    name: inputPlaceName.value,
    link: inputPictureLink.value});
    closePopup(placeForm);
 /*    inputPlaceName = '';
    inputPictureLink = ''; */
  };

const places = document.querySelector(".elements");

const renderCard = (data) => {
  const card = new Card(data, '.square-card')
  const cardElement = card.generateCard()
  places.prepend(cardElement);
}

// слушатель кнопки сохранения карточки автора

profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  saveNewProfile();
});

// слушатель действия по кнопке создания новой карточки места
placeForm.addEventListener("submit", placeFormSubmit);

// закрытие формы редактирования профиля

closeProfileEdit.addEventListener("click", () => {
  closePopup(profileForm);
});

// закрытие формы создания карточки места

closePlaceForm.addEventListener("click", () => {
  closePopup(placeForm);
});

// слушатель закрытия для каждой формочки. слушатели на "клик" вроде бы не множатся

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

/* initialCards.forEach((name, link) => {
  const card = new Card(name, link, ".square-card");
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector(".card-list__items").append(cardElement);
}); */

// рендеринг карточки из массива

/*  function createPlacesDomNode(item) {
  const placeCardTemplate = placeCard.querySelector(".card").cloneNode(true);
  placeCardTemplate.querySelector(".card__place-name").textContent = item.name;
  placeCardTemplate.querySelector(".card__image").src = item.link;
  placeCardTemplate.querySelector(".card__image").alt = item.name;

  // удаление
  placeCardTemplate
    .querySelector(".card__remove-button")
    .addEventListener("click", function (evt) {
      const removeTarget = evt.target;
      removeTarget.parentNode.remove();
    });
  // лайк
  placeCardTemplate
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      const likeTarget = evt.target;
      likeTarget.classList.toggle("card__like-button_active");
    });

  // открытие на весь экран
  function showPicture() {
    const modalImg = document.querySelector(".popup__picture");
    const caption = document.querySelector(".popup__picture-title");
    modalImg.src = placeCardTemplate.querySelector(".card__image").src;
    modalImg.alt = placeCardTemplate.querySelector(".card__image").alt;
    caption.textContent = placeCardTemplate.querySelector(".card__image").alt;
  } 

  // обработчик открытия картинки + подстановка данных
  placeCardTemplate
    .querySelector(".card__image")
    .addEventListener("click", () => {
      openPopup(pictureShow);
      showPicture();
    });

  return placeCardTemplate;
} */

// применение ко всему массиву

/* const result = initialCards.map((item) => {
  return createPlacesDomNode(item);
});

places.append(...result); */



/* const renderCard = (data) => {
  const card = new Card(data, '.square-card')
  const cardElement = card.createPlacesDomNode();
  document.querySelector(".card-list__items").append(cardElement);
}

initialCards.forEach((data) => {
  renderCard(data)
  document.querySelector(".card-list__items").append(cardElement);
}); */