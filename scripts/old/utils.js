export const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.which === ESC_KEYCODE) {
    action(activePopup)
  }
};
export const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModalWindow);
};

export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
};

export const imageModalWindow = document.querySelector('.popup__figure');
export const imageElement = document.querySelector('.popup__picture');
export const imageCaption = document.querySelector('.popup__picture-title');