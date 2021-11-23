const editButton = document.querySelector('.profile__edit-button');
const person = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const nameInput = document.querySelector('.author');
const professionInput = document.querySelector('.profession');
const placeName = document.querySelector('placeName');
const places = document.querySelector('.elements');
const placeCard = document.querySelector('#placeCard').content;
const popup = document.querySelector('.popup');
const profileForm = document.querySelector('.profile-edit');
const placeForm = document.querySelector('.place-create');
const pictureShow = document.querySelector('.picture-open');
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const closePopapButton = document.querySelectorAll('.popup__button-close');
const closeProfileEdit = document.querySelector('.profile-close');
const closePlaceForm = document.querySelector('.place-close')
const submitProfileButton = document.querySelector('.submit-profile');
const submitCardButton = document.querySelector('.submit-card');
const removeCardButton = document.querySelector('.card__remove-button');
const cardLikeButton = document.querySelector('.card__like-button');
const card = document.querySelector('.card');
const cardImage = document.querySelector('.card__image');


// убрал вызовы по id, но появилось много классов, созданных для поиска..
// перенес слушатели функций на этап создания карточек - вроде работает
// постарался закрепить футер, чтобы не полз за карточками наверх


// рендеринг карточки из массива

function createPlacesDomNode(item) {
  const placeCardTemplate = placeCard.querySelector(".card").cloneNode(true);
  placeCardTemplate.querySelector(".card__place-name").textContent = item.name;
  placeCardTemplate.querySelector(".card__image").src = item.link;
  placeCardTemplate.querySelector(".card__image").alt = item.name;

// удаление
 placeCardTemplate.querySelector('.card__remove-button').addEventListener('click', function (evt) {
    const removeTarget = evt.target;
    removeTarget.parentNode.remove();
  });
// лайк
  placeCardTemplate.querySelector('.card__like-button').addEventListener('click', function (evt) {
    const likeTarget = evt.target;
    likeTarget.classList.toggle("card__like-button_active");
  });

// открытие на весь экран
  function showPicture() {
    pictureShow.classList.add('popup_opened');

    const modalImg = document.querySelector(".show__picture");
    const caption = document.querySelector(".show__title");
    /* const closeImg = document.querySelector(".show__close-button"); */
    modalImg.src = placeCardTemplate.querySelector('.card__image').src;
    modalImg.alt = placeCardTemplate.querySelector('.card__image').alt;
    caption.textContent = placeCardTemplate.querySelector('.card__image').alt;
  };
  
  placeCardTemplate.querySelector('.card__image').addEventListener('click', showPicture);
  
function closePicture () {
  pictureShow.classList.remove('popup_opened');
}
document.querySelector('.show__close-button').addEventListener('click', closePicture);

  return placeCardTemplate;
}
 
// применение ко всему массиву

const result = initialCards.map((item) => {
  return createPlacesDomNode(item);
});

places.append(...result);


// открытие карточки редактирования профиля

function editProfile() {
  profileForm.classList.add('popup_opened');
  nameInput.value = person.textContent;
  professionInput.value = profession.textContent;
}
editProfileButton.addEventListener('click', editProfile);

// закрытие формы редактирования профиля

function closeProfileEdition() {
profileForm.classList.remove('popup_opened');
}
closeProfileEdit.addEventListener('click', closeProfileEdition); 

// сохранение профиля

function saveNewProfile(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newProfession = professionInput.value;
  person.textContent = newName;
  profession.textContent = newProfession;
  closeProfileEdition();
}
submitProfileButton.addEventListener('click', saveNewProfile);

// открытиe формы создания карточки места

function createNewPlace() {
  placeForm.classList.add('popup_opened');  
}
addPlaceButton.addEventListener('click', createNewPlace);

// закрытие формы создания карточки

function closeNewPlace() {
  placeForm.classList.remove('popup_opened');  
}
closePlaceForm.addEventListener('click', closeNewPlace);

// сохранение новой карточки

const placeSubmit = (evt) => {
  evt.preventDefault();
  const inputPlaceName = document.querySelector('.placeName').value;
  const inputPictureLink = document.querySelector('.pictureLink').value;
  const cardString = createPlacesDomNode({
    name: inputPlaceName,
    link: inputPictureLink,
  });

  places.prepend(cardString);
  closeNewPlace();
}
placeForm.addEventListener('submit', placeSubmit);
