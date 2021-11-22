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
  placeCardTemplate.querySelector(".card__image").alt = item.name;

  return placeCardTemplate;
}

// применение ко всему массиву

const result = initialCards.map((item) => {
  return createPlacesDomNode(item);
});

places.append(...result);

/* likeCardButton(); */

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

    const like = document.querySelectorAll(".card__like-button");
    [].forEach.call(like, function (el) {
      el.onclick = function (e) {
        const eventTarget = e.target;
        eventTarget.classList.toggle("card__like-button_active");
      };
    });
  };

  // кнопка создать
  document
    .querySelector("#placePopup")
    .addEventListener("submit", placeSubmitFormHandler);
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

// лайки
// функция

/* function likeCardButton() {
  const likeButton = document.getElementsByClassName("card__like-button");
  for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener(
      "click",
      function (evt) {
        evt.currentTarget.classList.toggle("card__like-button_active");
      },
      false
    )
  }
}; */

// объект

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

// лайк по практикуму

/* likeButton.addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_active');
  }); */

const DOM = document.querySelectorAll("*");
console.log(DOM);

/* openPicture = document.getElementById('show');
picture = document.getElementById('card');

picture.addEventListener('click', function (evt) {
const picture = evt.target;
picture.classList.toggle('show') 
}
); */

// лайк поиск по всем (работает!)

const like = document.querySelectorAll(".card__like-button");
[].forEach.call(like, function (el) {
  el.onclick = function (e) {
    const eventTarget = e.target;
    eventTarget.classList.toggle("card__like-button_active");
  };
});

/* const originPicture = document.querySelector('.card__image');
[].forEach.call( originPicture, function(el) {
  el.onclick = function(e) {
  pictureView = e.target;
  pictureView = showCard.querySelector(".show").cloneNode(true);
  pictureView.querySelector(".show__title").textContent = this.name;
  pictureView.querySelector(".show__picture").src = this.src;
  pictureView.querySelector(".show__picture").alt = this.name;
  return pictureView;
  }
}); */


window.onload = function () {
	const imgArr = document.getElementsByClassName('card__image');
  const modalWindow = document.querySelector('.show');
  const modalImg = document.querySelector('.show__picture');
  const caption = document.querySelector('.show__title');
  const closeImg = document.querySelector('.show__close-button')

  for(i = 0; i<imgArr.length; i++) {
    const picture = imgArr[i];
    picture.onclick = function() {
      openImg(this);
    }
  }

  function openImg(pic) {
    modalWindow.style.display = 'flex';
    modalImg.src = pic.src;
    modalImg.alt = pic.alt;
    caption.innerHTML = pic.alt;
  }

  function close() {
    modalWindow.style.display = 'none';
  }

  closeImg.onclick = function() {
    modalWindow.style.transform = 'transition(opacity ease 5s)'
    setTimeout( close, 100);
  }
}





/* const showCard = document.querySelector(".show");

function openBigPicture(event) {
  showCard.classList.add("show_opened");

const title = event.currentTarget.dataset('.card__name').textContent;
const link = document.querySelector('.card__image').src;

  showCard.querySelector(".show__title").textContent = event.title;
  showCard.querySelector(".show__picture").src = event.src;
  showCard.querySelector(".show__picture").alt = title;

} */



/*   const curPic  = evt.target.dataset.btn;
if (curPic === 'pic') {
  console.log('эта карточка');
}
}; */



/*   showCard.querySelector(".show__title").textContent = curPic.querySelector('.card__place-name').textContent;
  showCard.querySelector(".show__picture").src =
    "https://images.unsplash.com/photo-1626224574073-23989ea25ae8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=710&q=80";
  showCard.querySelector(".show__picture").alt = "this.name";
  return showCard;
} */

document.addEventListener("click", (event) => {
  /* event.preventDefault(); */
  const picType = event.target.dataset.btn;

  if (picType === "pic") {
    openBigPicture();
  }
});

function closePicture() {
  showCard.classList.remove("show_opened");
}

const closePictureButton = document.querySelector(".show__close-button");
closePictureButton.addEventListener("click", closePicture);
