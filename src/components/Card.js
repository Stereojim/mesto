export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._cardTemplate = document
      .querySelector(cardSelector)
      .content.querySelector(".card");
    this._title = data.name;
    this._description = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick
  }

  generateCard() {
    this._cardElement = this._cardTemplate.cloneNode(true); 

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__remove-button");
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardImage.src = this._image;
    this._cardElement.querySelector(".card__place-name").textContent = this._title;
    this._cardImage.alt = this._title;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
     this._cardImage.addEventListener("click", () => {
        this._handleImageClick();
      }); 
      this._deleteButton.addEventListener("click", (evt) => {
        this._handleDeleteCard(evt);
      });
      this._likeButton.addEventListener("click", (evt) => {
        this._handleLikeCard(evt);
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
}
