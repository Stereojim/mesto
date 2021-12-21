const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button-submit");
    toggleButtonState(formElement, buttonElement)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(formElement, buttonElement);
        });
    });
};

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
};

const hideInputError = (formElement, inputElement) => {
    inputElement.classList.remove("popup__input_has-error"); 
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
    errorElement.classList.remove("popup__error"); //ошибка
    errorElement.textContent = "";
    console.log(errorElement)
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("popup__input_has-error");
    errorElement.textContent = errorMessage; //ошибка
    errorElement.classList.add("popup__error");
};

const toggleButtonState = (formElement, buttonElement) => {
    const isFormValid = formElement.checkValidity();
    buttonElement.classList.toggle("popup__button-submit_disabled", !isFormValid);
    buttonElement.disabled = !isFormValid;
};


/* const formProfile = document.querySelector('#formProfile');
const placeEditForm = document.querySelector('.popup__form_type_place');
setEventListeners(formProfile)
setEventListeners(placeEditForm) */

const enableValidation  = () => {
    const forms = document.querySelectorAll('.popup__form');
    forms.forEach(form => {
        setEventListeners(form)
    })
}

enableValidation();