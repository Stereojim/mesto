let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closePopapButton = document.querySelector(".popup__button-close");

function openPopap() {
  popup.classList.add("popup_opened");
}

function closePopap() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openPopap);
closePopapButton.addEventListener("click", closePopap);

let person = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__profession");
let nameInput = document.querySelector(".popup__input_name");
let professionInput = document.querySelector(".popup__input_profession");

document.querySelector(".popup__input_name").value = person.textContent;
document.querySelector(".popup__input_profession").value =
  profession.textContent;

let submitButton = document.querySelector(".popup__button-submit");

function formSubmitHandler(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newProfession = professionInput.value;

  let person = document.querySelector(".profile__name");
  let profession = document.querySelector(".profile__profession");

  person.textContent = newName;
  profession.textContent = newProfession;

  popup.classList.remove("popup_opened");
}

submitButton.addEventListener("click", formSubmitHandler);
