const hideInputError = (formElement, inputElement, config) => {
    const { inputErrorClass, errorClass, } = config;
    // Находим блок, в котором отображается ошибка.
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    // Удаляем текст ошибки из блока.
    errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, errorMessage, { errorClass, inputErrorClass }) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    // Записываем текст ошибки в блок отображения ошибки.
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};


// Пример функции с меньшим количеством параметров. errorElement и текст сообщения получаем из inputElement
const showInputError2 = (inputElement, { errorClass, inputErrorClass }) => {
    const errorElement = inputElement.closest('form').querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
    // https://developer.mozilla.org/ru/docs/Web/API/ValidityState
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    }
}

const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
    // Проверяем валидность формы.
    const isFormValid = formElement.checkValidity();
    // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
    buttonElement.disabled = !isFormValid;
    // Если форма невалидна, добавляем кнопке класс
    buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
}

const setEventListeners = (formElement, config) => {
    /*
        Разбиваем конфиг на составляющие, чтобы передать нужные свойства в функции.
    */
    const {
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        errorClass,
        inputErrorClass
    } = config
    // inputSelector позволяет найти все поля ввода
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // С помощью submitButtonSelector находим кнопку отправки формы.
    const buttonElement = formElement.querySelector(submitButtonSelector);
    /*
        inactiveButtonClass навашивается на кнопку формы, если она неактивна.
        Эту функцию вызываем здесь, чтобы сделать кнопку неактивной при открытии страницы.
        Иначе кнопка будет активной до первого ввода в поля формы.
    */
    toggleButtonState(formElement, buttonElement, /* inactiveButtonClass */);
    // Навешиваем слушатель на ввод в поля пароля.
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, { errorClass, inputErrorClass });
            toggleButtonState(formElement, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = (config) => {
    /*
        Пример использования rest-оператора.
        Из объекта config извлекаем свойство formSelector, остальные свойства помещаем в объект props. Название объекта
        может быть любым.

    */
    const { formSelector, ...props } = config;
    const inputList = Array.from(document.querySelectorAll(formSelector));
    inputList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        // объект props передаём дальше. Он будет содержать в себе все необходимые свойства
        setEventListeners(formElement, props);
    })
};
  

console.log('ghbdtn');

enableValidation({
  formSelector: '#form',
  inputSelector: '.input__text',
  submitButtonSelector: '#submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_has-error',
  errorClass: 'popup__error_visible'
})
