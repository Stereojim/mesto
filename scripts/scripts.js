const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closePopapButton = document.querySelector(".popup__button-close");
const person = document.querySelector(".profile__name");
const profession = document.querySelector(".profile__profession");
const nameInput = document.querySelector("#name");
const professionInput = document.querySelector("#profession");
const placeName = document.querySelector("placeName");
const pictureLink = document.querySelector("#pictureLink");
const submitForm = document.querySelector("#personCard");
const addPlaceButton = document.querySelector(".profile__add-button");
const closePlaceAdd = document.querySelector("#closePlaceAdd");
const places = document.querySelector(".elements");
const placeCard = document.querySelector("#placeCard").content;
const placePopupTemplate = document.querySelector("#place-template");
const showCard = document.querySelector("#showCard").content;

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

// рендеринг карточки из массива

function createPlacesDomNode(item) {
  const placeCardTemplate = placeCard.querySelector(".card").cloneNode(true);
  placeCardTemplate.querySelector(".card__place-name").textContent = item.name;
  placeCardTemplate.querySelector(".card__image").src = item.link;

  function openPicture() {
    showPicture.style.display = "flex";
    bigPicture.src = this.src;
    captionText.innerHTML = this.alt;
  }

  return placeCardTemplate;
}

// применение ко всему массиву

const result = initialCards.map((item) => {
  return createPlacesDomNode(item);
});

places.append(...result);



  // кнопка открытия формы создания новой карточки места

  addPlaceButton.addEventListener("click", function () {
    addPlace();
    document.getElementById("placePopup").classList.add("popup_opened");
  });

// добавление и открытие попапа для создания новой карточки

function addPlace() {
  const placeTemplate = document.querySelector("#place-template").content;
  const newPlace = placeTemplate.querySelector(".popup").cloneNode(true);
  places.append(newPlace);

  function cancelAddingPlace() {
    newPlace.remove();
  }

  // кнопка закрытия формы создания новой карточки места

  const closePlaceAdd = document.querySelector("#closePlaceAdd");
  closePlaceAdd.addEventListener("click", cancelAddingPlace);

  // сохранение карточки с кнопками удаления и лайка

  const placeSubmitFormHandler = (evt) => {
    evt.preventDefault();
    const inputPlaceName = document.querySelector("#placeName").value;
    const inputPictureLink = document.querySelector("#pictureLink").value;
    const cardString = createPlacesDomNode({
      name: inputPlaceName,
      link: inputPictureLink,
    });

    places.prepend(cardString);

    // дубль кнопки удаления для нового объекта
    const removeButton = document.getElementsByClassName("card__remove-button");
    for (let i = 0; i < removeButton.length; i++) {
      removeButton[i].addEventListener(
        "click",
        function (e) {
          e.currentTarget.parentNode.remove();
        },
        false
      );
    }

    // закрытие после сохранения
    cancelAddingPlace();


    // странно работающий лайк (через раз)
    likeCardButton();
  };

    // кнопка создать
  document.querySelector("#placePopup").addEventListener("submit", placeSubmitFormHandler);
}


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

// кнопка удаления карточки

const removeButton = document.getElementsByClassName("card__remove-button");
for (let i = 0; i < removeButton.length; i++) {
  removeButton[i].addEventListener(
    "click",
    function (e) {
      e.currentTarget.parentNode.remove();
    },
    false
  );
}


function likeCardButton() {
  const likeButton = document.getElementsByClassName("card__like-button");
  for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener(
      "click",
      function (evt) {
        evt.currentTarget.classList.toggle("card__like-button_active");
      },
      false
    );
  }
}

// лайк

/* const likeButton = document.getElementsByClassName("card__like-button");
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener(
    "click",
    function (evt) {
      evt.currentTarget.classList.toggle("card__like-button_active");
    },
    false
  );
} */


const DOM = document.querySelectorAll("*");
console.log(DOM);
