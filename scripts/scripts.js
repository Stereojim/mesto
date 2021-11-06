let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closePopapButton = document.querySelector(".popup__button-close");
let person = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__profession");
let nameInput = document.querySelector("#name");
let professionInput = document.querySelector("#profession");
let submitForm = document.querySelector(".popup");

function openPopap() {
  popup.classList.add("popup_opened");
  nameInput.value = person.textContent;
  professionInput.value = profession.textContent;
}

function closePopap() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newProfession = professionInput.value;
  person.textContent = newName;
  profession.textContent = newProfession;
  closePopap() ;
}

submitForm.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", openPopap);
closePopapButton.addEventListener("click", closePopap);
