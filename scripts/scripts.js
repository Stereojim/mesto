const editButton = document.querySelector(".profile__edit-button");
const person = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const places = document.querySelector(".elements");
const placeCard = document.querySelector("#placeCard").content;
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector('.popup__container');
const profileForm = document.querySelector(".popup_type_profile-edit");
const profileEditForm = profileForm.querySelector('.popup__form_profile_edit');
const profileFormSumbitButton = profileForm.querySelector('.popup__button-submit');
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


// рендеринг карточки из массива

function createPlacesDomNode(item) {
  const placeCardTemplate = placeCard.querySelector(".card").cloneNode(true);
  placeCardTemplate.querySelector(".card__place-name").textContent = item.name;
  placeCardTemplate.querySelector(".card__image").src = item.link;
  placeCardTemplate.querySelector(".card__image").alt = item.name;

  // удаление
  placeCardTemplate.querySelector(".card__remove-button").addEventListener("click", function (evt) {
    const removeTarget = evt.target;
    removeTarget.parentNode.remove();
  });
  // лайк
  placeCardTemplate.querySelector(".card__like-button").addEventListener("click", function (evt) {
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
  placeCardTemplate.querySelector(".card__image").addEventListener("click", () => {
    openPopup(pictureShow);
    showPicture();

  });

  return placeCardTemplate;
}

// применение ко всему массиву

const result = initialCards.map((item) => {
  return createPlacesDomNode(item);
});

places.append(...result);

//удаление на esc

function closePopupByEsc(e) {
  const openedPopup = document.querySelector('.popup_opened');
  if (e.key === 'Escape') {
    closePopup(openedPopup);
  }
};

/*  function closePopupByClick(e) {
  if (e.target.closest(".popup__container")) {
  } else {
    closePopup(openedPopup);
  }
};  
  */

// функция открытия модального окна

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  // слушатель функции закрытия на esc
  document.addEventListener('keydown', closePopupByEsc);
};

// функция закрытия модального окна

const closePopup = function (popup) {
  //удаление слушателя событияю. Спасибо за комментарии - понял как посмотреть события в режиме разработчика
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove("popup_opened");
};

// открытие формы редактирования профиля

editProfileButton.addEventListener("click", () => {
  openPopup(profileForm);
  nameInput.value = person.textContent;
  professionInput.value = profession.textContent;
});

// открытиe формы создания карточки места

addPlaceButton.addEventListener("click", () => {
  openPopup(placeForm);

});

// форма изменения профиля автора

function saveNewProfile() {
  const newName = nameInput.value;
  const newProfession = professionInput.value;
  person.textContent = newName;
  profession.textContent = newProfession;
  console.log('name: ', nameInput.value);
  closePopup(profileForm);
};

// форма создания новой карточки места

const placeSubmit = (evt) => {
  evt.preventDefault();
  const inputPlaceName = document.querySelector('.popup__input_type_place-name').value;
  const inputPictureLink = document.querySelector('.popup__input_type_place-link').value;
  const cardString = createPlacesDomNode({
    name: inputPlaceName,
    link: inputPictureLink,
  });

  places.prepend(cardString);
  document.querySelector('.popup__input_type_place-name').value = "";
  document.querySelector('.popup__input_type_place-link').value = "";
  closePopup(placeForm);
};

// слушатель кнопки сохранения карточки автора

profileEditForm.addEventListener('submit', function (evt) {
  evt.preventDefault()
  saveNewProfile()
});

// слушатель действия по кнопке создания новой карточки места
placeForm.addEventListener("submit", placeSubmit);


// закрытие формы редактирования профиля

closeProfileEdit.addEventListener("click", () => {
  closePopup(profileForm);
});

// закрытие формы создания карточки места

closePlaceForm.addEventListener("click", () => {
  closePopup(placeForm);
});

// слушатель закрытия для каждой формочки. слушатели на "клик" вроде бы не множатся

profileForm.addEventListener('click', function (e) {
  if (e.target.closest(".popup__container")) {

  } else {
    closePopup(profileForm)
  }
});

placeForm.addEventListener('click', function (e) {
  if (e.target.closest(".popup__container")) {

  } else {
    closePopup(placeForm)
  }
});

pictureShow.addEventListener('click', function (e) {
  if (e.target.closest(".popup__container")) {

  } else {
    closePopup(pictureShow)
  }
});




