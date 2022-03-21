import {
  imageElement,
  imageCaption,
  openModalWindow,
  imageModalWindow,
} from "./utils.js";

export class Card {
  constructor(data, cardTemplateSelector) {
    // { name, link } '#placeCard'
    this._placeCard = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".card");
    this._name = data.name;
    this._link = data.link;
  }

  // переключение лайка
  _handleLikeIcon = () => {
    this._likeButton.classlist.toggle("card__like-button_active");
  };

  // удаление карточки
  _handleDeleteCard = (evt) => {
    this._placeCardTemplate.remove();
  };

  _handlePreviewPicture = () => {
    imageElement.src = this._link;
    imageElement.alt = `Изображение ${this._name}`;
    imageCaption.textContent = this._name;

    openModalWindow(imageModalWindow);
  };

  _setEventListeners() {
    const deleteButton = this._placeCardTemplate.querySelector(
      ".card__remove-button"
    );
    this._likeButton.addEventListener("click", this._handleLikeIcon);
    deleteButton.addEventListener("click", this._handleDeleteCard);
    this._cardImage.addEventListener("click", this._handlePreviewPicture);
  }

  _fillCard() {
    this._cardImage.style.backgroundimage = `url(${this._link})`;
    this._placeCardTemplate.querySelector(".card__place-name").textContent =
      this._name;
  }

  // создание карточки
  createPlacesDomNode() {
    // поиск элементов
    this._placeCardTemplate = this._placeCard.cloneNode(true);
    this._likeButton = this._placeCardTemplate.querySelector(".card__like-button");
    this._cardImage = this._placeCardTemplate.querySelector(".card__image");

    // заполнение карточки
    this._fillCard();

    // слушатели
    this._setEventListeners();

    return this._placeCardTemplate;
  }
}
