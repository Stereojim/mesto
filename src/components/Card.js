export class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._cardTemplate = document.querySelector(cardSelector).content.querySelector(".card");

    this._title = data.name;
    this._description = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(
      (user) => user._id === this._userId
    );

    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountElement = this._cardElement.querySelector(".card__like-count");
    this._likeCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._addLike();
    } else {
      this._removeLike();
    }
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

    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = "none";
    }

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });
  }

  deleteCard() {
    this._cardElement.remove();
  }

  _addLike() {
    this._likeButton.classList.add("card__like-button_active");
  }

  _removeLike() {
    this._likeButton.classList.remove("card__like-button_active");
  }
}
