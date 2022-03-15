class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveBurronClass;
    this._inputErrorClass = data.inputErrorClass;
    this._form = form;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._buttonElement.classlist.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  } else {
    this._buttonElement.classlist.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
}

_hasInvalidInput() {
  return this._inputlist.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  }
}

_showInputError(inputElement) {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classlist.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }

_hideInputError(inputElement) {
  this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
  inputElement.classlist.remove(this._inputErrorClass);
  this._errorElement.textContent = "";
}

_resetValidation() {
  this._inputList = Array.from(
    this._form.parentnode.querySelectorAll(this._inputSelector)
  );
  this._inputList.forEach((input) => {
    this._hideInputError(input);
  });
  this._toggleButtonState();
}

_setEventListeners() {
  this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
}
}
