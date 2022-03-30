import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {

  open(text, link) {
    const image = this._popup.querySelector('.popup__picture')
    const title = this._popup.querySelector('.popup__picture-title')
    
    image.src = link
    title.textContent = text

    super.open()
  }
}

/* const popup = new PopupWithImage('.popup_type_picture-open')

popup.open()
popup.close() */
