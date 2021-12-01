const setEventListeners = () => {
    const formElement = document.querySelector('.popup__form');
    formElement.addEventListener('submit', e => e.preventDefault());
    const inputList = Array.from(formElement.querySelector('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button-submit');
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement) 
        })
    })
}

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement)
    } else {

    }
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
}