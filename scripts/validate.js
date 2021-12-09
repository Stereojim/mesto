

/*     const hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_has-error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, errorMessage) => {
const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.add('popup__input_has-error');
errorElement.textContent = errorMessage;
errorElement.classList.add('popup__error_visible');
};

const setEventListeners = () => {
    const formElement = document.querySelector('.popup__form_type_place');
    formElement.addEventListener('submit', e => e.preventDefault());
    const inputList = Array.from(formElement.querySelector('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button-submit');
    toggleButtonState(formElement, buttonElement)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement) 
            toggleButtonState(formElement, buttonElement)
        })
    })
}

setEventListeners();


const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement)
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    }
}

const toggleButtonState = (formElement, buttonElement) => {
  const isFormValid = formElement.checkValidity();
  buttonElement.classList.toggle('popup__button-submit_disabled', !isFormValid)
  buttonElement.disabled = !isFormValid;  
  }  
 */






