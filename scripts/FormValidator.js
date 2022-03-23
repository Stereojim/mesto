export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);

  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableSubmitButton(buttonElement) {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage; //ошибка
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass); //ошибка
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  resetValidation() {
    this._form.reset() 
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

}

