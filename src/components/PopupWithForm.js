import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
  }

  getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

/* renderLoading(isLoading, buttonText) {
  if (isLoading) {
    buttonText.textContent =
      "Сохранение...";
  } else {
    buttonText.textContent = "Сохранить";
    console.log("тут мог быть ваш лоадер");
  }
} */

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmit = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this.getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
