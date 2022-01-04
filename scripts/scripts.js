const editButton = document.querySelector(".profile__edit-button");
const person = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const places = document.querySelector(".elements");
const placeCard = document.querySelector("#placeCard").content;
const popup = document.querySelector(".popup");

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

// обработчик закрытия картинки

pictureShow.querySelector(".popup__button-close").addEventListener("click", () => {
  closePopup(pictureShow);
});

// применение ко всему массиву

const result = initialCards.map((item) => {
  return createPlacesDomNode(item);
});

places.append(...result);

// открытие карточки редактирования профиля

editProfileButton.addEventListener("click", () => {
  openPopup(profileForm);
   nameInput.value = person.textContent;
  professionInput.value = profession.textContent; 

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePopup(profileForm)
    }
    });
});

// закрытие формы редактирования профиля

closeProfileEdit.addEventListener("click", () => {
  closePopup(profileForm);
});

// сохранение профиля

function saveNewProfile() {
  const newName = nameInput.value;
  const newProfession = professionInput.value;
  person.textContent = newName;
  profession.textContent = newProfession;
  console.log('name: ', nameInput.value);

  closePopup(profileForm);
}

// сохранение карточки

profileEditForm.addEventListener('submit', function (evt) {
    evt.preventDefault()
    saveNewProfile()
}); 

// открытиe формы создания карточки места

addPlaceButton.addEventListener("click", () => {
  openPopup(placeForm);

  popup.addEventListener('click', console.log('asd')); 

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePopup(placeForm)
    }
    }); 
});



// закрытие формы создания карточки

closePlaceForm.addEventListener("click", () => {
  closePopup(placeForm);
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
  closePopup(placeForm);
};

placeForm.addEventListener("submit", placeSubmit);

// функция открытия модального окна
const openPopup = function (popup) {
  popup.classList.add("popup_opened");

};

// функция закрытия модального окна
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
};

/* popup.addEventListener('click', closePopup); */

/* popup.addEventListener('click', (evt) => {
  evt.target;
}); */

/* document.onclick = function(event){
  if ( event.target.className != 'popup_opened') {
    popup.classList.remove("popup_opened")
  }
} */