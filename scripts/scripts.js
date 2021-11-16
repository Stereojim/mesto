let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closePopapButton = document.querySelector(".popup__button-close");
let person = document.querySelector(".profile__name");
let profession = document.querySelector(".profile__profession");
let nameInput = document.querySelector("#name");
let professionInput = document.querySelector("#profession");
let submitForm = document.querySelector(".popup");

let addPlaceButton = document.querySelector(".profile__add-button");
let closePlaceAdd = document.querySelector("#closePlaceAdd");

const places = document.querySelector(".elements");




function addPlace(pictureLink, placeName) {
  const placeTemplate = document.querySelector("#place-template").content;
  const newPlace = placeTemplate.querySelector('.popup').cloneNode(true);
  newPlace.querySelector('#pictureLink').src = pictureLink;
  newPlace.querySelector('#placeName').textContent = placeName;
  places.append(newPlace);

  function cancelAddingPlace() {
    newPlace.remove();
  }
  
  let closePlaceAdd = document.querySelector("#closePlaceAdd");
  closePlaceAdd.addEventListener("click", cancelAddingPlace);
}
  
  //
  //




  //function closeAddPlacePopup () {
  //  newPlace.classList.remove("popup_opened");
  //}

  



/* SavePlaceButton.addEventListener('click', function () {
  const placeLink = document.querySelector('#pictureLink');
  const placeTitle = document.querySelector('#placeName');

  addPlace(placeLink.value, placeTitle.value);
  openPopap();

  placeLink.value = '';
  placeTitle.value = '';

}); */



function openPopap() {
  popup.classList.add("popup_opened");
  nameInput.value = person.textContent;
  professionInput.value = profession.textContent;
}

function closePopap() {
  popup.classList.remove("popup_opened");
}

function closeAddPlacePopup () {
  newPlace.classList.remove("popup_opened");
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
addPlaceButton.addEventListener("click", addPlace);
closePopapButton.addEventListener("click", closePopap);
