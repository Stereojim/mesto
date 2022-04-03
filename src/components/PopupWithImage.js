import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__picture')
    this._title = this._popup.querySelector('.popup__picture-title')
  }
  open(text, link) {
    this._image.src = link
    this._title.textContent = text
    super.open()
  }
}
