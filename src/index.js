import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import "./pages/index.css";
import { api } from "./components/Api.js";

let userId;

api.getProfile().then((res) => {
  userInfo.setUserInfo(res.name, res.about, res.avatar);
  userId = res._id;
  console.log("avatar", res);
});

api.getInitialCards().then((cardList) => {
  console.log("cardList", cardList);
  cardList.forEach((data) => {
    const card = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    });
    section.addItem(card);
  });
});

/* const initialCards = [
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
]; */

const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const avatarLinkInput = document.querySelector(".popup__input_type_link");
const profileForm = document.querySelector(".popup_type_profile-edit");
const placeForm = document.querySelector(".popup_type_create-place");
const profileEditButton = document.querySelector(".profile__edit-button");
const placeAddButton = document.querySelector(".profile__add-button");
const profileSubmitButton = document.querySelector(
  ".popup__button-submit_type_profile"
);
const cardSubmitButton = document.querySelector(
  ".popup__button-submit_type_card"
);
const placeFormAdd = document.querySelector(".popup__form_type_place");
const profileEditForm = profileForm.querySelector(".popup__form_profile_edit");
const avatarImage = document.querySelector(".profile__overlay");

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
const addPlaceFormValidation = new FormValidator(
  validationConfig,
  placeFormAdd
);
const profileEditFormValidation = new FormValidator(
  validationConfig,
  profileEditForm
);

addPlaceFormValidation.enableValidation();
profileEditFormValidation.enableValidation();

// создание шаблона карточки
const createCard = (data) => {
  const card = new Card(
    data,
    ".square-card",
    () => {
      imagePopup.open(data.name, data.link, data.avatar);
    },
    (id) => {
      confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id).then((res) => {
          card.deleteCard();
          confirmPopup.close();
        });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id).then((res) => {
          console.log(res);
          card.setLikes(res.likes);
        });
      } else {
        api.addLike(id).then((res) => {
          console.log(res);
          card.setLikes(res.likes);
        });
      }
    }
  );
  return card.generateCard();
};

const renderCard = (data) => {
  const cardElement = createCard(data);

  section.addItem(cardElement);
};

// открытие формы редактирования профиля
profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();

  nameInput.value = name;
  professionInput.value = job;

  profileEditFormValidation.resetValidation(profileForm);
  profileEditFormValidation.toggleButtonState(profileSubmitButton);

  editProfilePopup.open();
});

// открытие формы редактирования аватара
avatarImage.addEventListener("click", () => {
  /*   const { avatar } = userInfo.getUserInfo()
  avatarLinkInput.value = avatar */

  changeAvatarImage.open();
});

// сохранение нового аватара
const saveNewAvatar = () => {
  const avatar = avatarLinkInput.value;
  pageLoading(true);
  api
    .editProfileImage(avatar)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      console.log("avatar", avatar);
      changeAvatarImage.close();
    })
    .finally(() => {
      pageLoading(false);
    });
};

// открытиe формы создания карточки места
placeAddButton.addEventListener("click", () => {
  addPlaceFormValidation.resetValidation(placeForm);
  addPlaceFormValidation.toggleButtonState(cardSubmitButton);

  addCardPopup.open();
});

// сохранение новой формы данных об авторе
const saveNewProfile = (data) => {
  pageLoading(true);
  const { name, description } = data;

  api
    .editProfile(name, description)
    .then((res) => {
      userInfo.setUserInfo(name, description, res.avatar);
      editProfilePopup.close();
    })
    .finally(() => {
      pageLoading(false);
    });
};

// сохранение новой карточки места
const placeFormSubmit = (data) => {
  pageLoading(true);
  api
    .addCard(data["place-name-input"], data["place-link-input"])
    .then((res) => {
      console.log("res", res);
      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id,
      });

      section.addItem(card);
      addCardPopup.close();
    })
    .finally(() => {
      pageLoading(false);
    });
};

// как это отследить...
function pageLoading(isLoading) {
  if (isLoading) {
    document.querySelectorAll("popup__button-submit").value = "Сохранение...";
  } else {
    document.querySelectorAll("popup__button-submit").value = "";
    console.log("тут мог быть ваш лоадер");
  }
}

const section = new Section({ items: [], renderer: renderCard }, ".elements");
const imagePopup = new PopupWithImage(".popup_type_picture-open");
const addCardPopup = new PopupWithForm(
  ".popup_type_create-place",
  placeFormSubmit
);
const editProfilePopup = new PopupWithForm(
  ".popup_type_profile-edit",
  saveNewProfile
);
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  proileJobSelector: ".profile__profession",
  profileAvatarSelector: ".profile__avatar",
});
const confirmPopup = new PopupWithForm(".popup_type_delete-card");
const changeAvatarImage = new PopupWithForm(
  ".popup_type_change-avatar",
  saveNewAvatar
);

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
changeAvatarImage.setEventListeners();

section.renderItems();
