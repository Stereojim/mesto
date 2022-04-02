export class UserInfo {
constructor({ profileNameSelector, proileJobSelector}) {
this._nameElement = document.querySelector(profileNameSelector)
this._jobElement = document.querySelector(proileJobSelector)
}

getUserInfo() {
return {
  name: this._nameElement.textContent,
  job: this._jobElement.textContent
}
}

setUserInfo(title, job) {
  this._nameElement.textContent = title
  this._jobElement.textContent = job
}

}

/* new UserInfo({ profileNameSelector: '.profile__name', proileJobSelector: '.profile__profession' }) */