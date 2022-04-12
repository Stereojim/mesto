class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile() {
    console.log('getProfile')
    fetch('https://nomoreparties.co/v1/cohort-39/users/me', {
      headers: this._headers
    }).then(res => {
      console.log('res', res)
  })
}


  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'f2ec7423-3d33-4d4c-8f08-a96b34cddef8',
    'Content-Type': 'application/json'
  }
});