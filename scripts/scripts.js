const editButton = document.querySelector(".profile__edit-button");
const person = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const places = document.querySelector(".elements");
const placeCard = document.querySelector("#placeCard").content;
const popup = document.querySelector(".popup");
const profileForm = document.querySelector(".popup_type_profile-edit");
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

// добавил общую функцию добавления класса для открытия попапа
// и функцию для удаления (через toggle одной функцией что-то не вышло - закрывает только первую карточку)

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
    const modalImg = document.querySelector(".show__picture");
    const caption = document.querySelector(".show__title");
    modalImg.src = placeCardTemplate.querySelector(".card__image").src;
    modalImg.alt = placeCardTemplate.querySelector(".card__image").alt;
    caption.textContent = placeCardTemplate.querySelector(".card__image").alt;

    
  }
// обработчик закрытия картинки
  document.querySelector(".show__close-button").addEventListener("click", () => {
    console.log('removePopup');
    removePopup(pictureShow);
  });

  // обработчик открытия картинки
  placeCardTemplate.querySelector(".card__image").addEventListener("click", () => {
      togglePopup(pictureShow);
    });

  placeCardTemplate.querySelector(".card__image").addEventListener("click", showPicture);


  return placeCardTemplate;
}

// применение ко всему массиву

const result = initialCards.map((item) => {
  return createPlacesDomNode(item);
});

places.append(...result);

// открытие карточки редактирования профиля
editProfileButton.addEventListener("click", () => {
  togglePopup(profileForm);
  nameInput.value = person.textContent;
  professionInput.value = profession.textContent;
});

// закрытие формы редактирования профиля
closeProfileEdit.addEventListener("click", () => {
  removePopup(profileForm);
});

// сохранение профиля

function saveNewProfile(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newProfession = professionInput.value;
  person.textContent = newName;
  profession.textContent = newProfession;

  // закрытие карточки
  removePopup(profileForm);
}

submitProfileButton.addEventListener("click", saveNewProfile);

// открытиe формы создания карточки места

addPlaceButton.addEventListener("click", () => {
  togglePopup(placeForm);
});

// закрытие формы создания карточки

/* function closeNewPlace() {
  placeForm.classList.remove('popup_opened');  
} */
closePlaceForm.addEventListener("click", () => {
  removePopup(placeForm);
});

// сохранение новой карточки

const placeSubmit = (evt) => {
  evt.preventDefault();
  const inputPlaceName = document.querySelector('.popup__input_type_place-name').value;
  const inputPictureLink = document.querySelector('.popup__input_type_place-link').value;
  const cardString = createPlacesDomNode({
    name: inputPlaceName,
    link: inputPictureLink,
  });

  places.prepend(cardString);
  removePopup(placeForm);
};

placeForm.addEventListener("submit", placeSubmit);

// функция открытия модального окна
const togglePopup = function (evt) {
  evt.classList.toggle("popup_opened");
};

// функция закрытия модального окна
const removePopup = function (evt) {
  evt.classList.remove("popup_opened");
};
