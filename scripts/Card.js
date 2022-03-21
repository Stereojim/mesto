const cardElement = document.querySelector(".popup_type_picture-open");
/* const cardImage = document.querySelector('.card__image');  */
/* const cardCloseButton = document.querySelector(".popup__button-close_type_picture-open"); */

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._description = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__place-name").textContent = this._title;
    this._element.querySelector(".card__image").alt = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleOpenCard();
      });
    this._element
      .querySelector(".card__remove-button")
      .addEventListener("click", (evt) => {
        this._handleDeleteCard(evt);
      });
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        this._handleLikeCard(evt);
      });
/*     cardCloseButton.addEventListener('click', () => {
      this._handleCloseCard()
    });  */
  }

  _handleOpenCard() {
    const modalImg = document.querySelector(".popup__picture");
    const caption = document.querySelector(".popup__picture-title");
    modalImg.src = this._image;
    modalImg.alt = this._title;
    caption.textContent = this._title;
    cardElement.classList.add("popup_opened");
  }
    _handleCloseCard() {
      this.removeEventListener('keydown', closePopupByEsc);
      popup.classList.remove("popup_opened");
    }  

  _handleDeleteCard(evt) {
    const removeTarget = evt.target;
    removeTarget.parentNode.remove();
  }

  _handleLikeCard(evt) {
    const likeTarget = evt.target;
    likeTarget.classList.toggle("card__like-button_active");
  }
  
}

