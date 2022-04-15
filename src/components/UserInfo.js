export class UserInfo {
  constructor({
    profileNameSelector,
    proileJobSelector,
    profileAvatarSelector,
  }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._jobElement = document.querySelector(proileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(title, job, avatar) {
    this._nameElement.textContent = title;
    this._jobElement.textContent = job;
    this._avatar.src = avatar;
  }
}
