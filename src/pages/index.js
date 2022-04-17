import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../pages/index.css";
import { api } from "../components/Api.js";
import { validationConfig } from "../components/Utils.js";

let userId;



Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([res, cards]) => {
    
    userId = res._id,
    userInfo.setUserInfo(res.name, res.about, res.avatar);

  // третий раз ничего не могу сделать - получить массив могу, но что-то не связывается по id :(
  // он вроде бы тоже самое должен делать, что сохранение карточки, только на входе массив..

/*    section.renderItems(cards);   */

/*  console.log('массив', items)
    console.log('userId', userId)
    console.log('пользователь', res.owner) */

  cards.forEach((data) => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id,
      });
      section.addItem(card) 
    });  
 
  })
  .catch(() => {
    console.log()  
  }); 
    

const nameInput = document.querySelector(".popup__input_type_author");
const professionInput = document.querySelector(".popup__input_type_profession");
const profileForm = document.querySelector(".popup_type_profile-edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const placeAddButton = document.querySelector(".profile__add-button");
const profileSubmitButton = document.querySelector(".popup__button-submit_type_profile");
const cardSubmitButton = document.querySelector(".popup__button-submit_type_card");
const avatarSubmitButton = document.querySelector(".popup__button-submit_type_avatar");
const placeFormAdd = document.querySelector(".popup__form_type_place");
const profileEditForm = profileForm.querySelector(".popup__form_profile_edit");
const avatarImage = document.querySelector(".profile__overlay");
const avatarChangeForm = document.querySelector(".popup__form_change-avatar");


// создание класса валидации и запуск
const addPlaceFormValidation = new FormValidator(validationConfig, placeFormAdd);
const profileEditFormValidation = new FormValidator(validationConfig, profileEditForm);
const avatarChangeValidation = new FormValidator(validationConfig, avatarChangeForm);

addPlaceFormValidation.enableValidation();
profileEditFormValidation.enableValidation();
avatarChangeValidation.enableValidation();


// создание шаблона карточки
const createCard = (data) => {
  const card = new Card(
    data, ".square-card",
    () => {
      imagePopup.open(data.name, data.link, data.avatar);
    },
    (id) => {
      confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
        api
          .deleteCard(id)
          .then(() => {
            card.deleteCard();
            confirmPopup.close();
          })
          .catch(() => {
            console.log();
          });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api
          .deleteLike(id)
          .then((res) => {
            console.log(res);
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(id)
          .then((res) => {
            console.log(res);
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
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

  profileEditFormValidation.resetValidation();
  profileEditFormValidation.toggleButtonState();

  nameInput.value = name;
  professionInput.value = job;

  editProfilePopup.open();
});

// открытие формы редактирования аватара
avatarImage.addEventListener("click", () => {
  avatarChangeValidation.toggleButtonState();
  changeAvatarImage.open();
});


// сохранение нового аватара
const saveNewAvatar = (data) => {
const avatar = data['avatarLink-input'] 

  renderLoading(true, avatarSubmitButton);

  api
    .editProfileImage(avatar)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      changeAvatarImage.close();
    })

    .catch(() => {
      console.log();
    })

    .finally(() => {
      renderLoading(false, avatarSubmitButton);
    });
};


// открытиe формы создания карточки места
placeAddButton.addEventListener("click", () => {
  addPlaceFormValidation.resetValidation();
  addPlaceFormValidation.toggleButtonState();
  addCardPopup.open();
});


// сохранение новой формы данных об авторе
const saveNewProfile = (data) => {
  renderLoading(true, profileSubmitButton);
  const { name, description } = data;

  api
    .editProfile(name, description)
    .then((res) => {
      userInfo.setUserInfo(name, description, res.avatar);
      editProfilePopup.close();
    })

    .catch(() => {
      console.log();
    })

    .finally(() => {
      renderLoading(false, profileSubmitButton);
    });
};


// сохранение новой карточки места
const placeFormSubmit = (data) => {
  renderLoading(true, cardSubmitButton);

  api
    .addCard(data["place-name-input"], data["place-link-input"])
    .then((res) => {
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

    .catch(() => {
      console.log();
    })

    .finally(() => {
      renderLoading(false, cardSubmitButton);
    });
};


function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}


const section = new Section({ items: [], renderer: renderCard }, ".elements");
const imagePopup = new PopupWithImage(".popup_type_picture-open");
const addCardPopup = new PopupWithForm(".popup_type_create-place", placeFormSubmit);
const editProfilePopup = new PopupWithForm(".popup_type_profile-edit", saveNewProfile);
const userInfo = new UserInfo({profileNameSelector: ".profile__name", proileJobSelector: ".profile__profession", profileAvatarSelector: ".profile__avatar"});
const confirmPopup = new PopupWithForm(".popup_type_delete-card");
const changeAvatarImage = new PopupWithForm(".popup_type_change-avatar", saveNewAvatar);

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
changeAvatarImage.setEventListeners();
