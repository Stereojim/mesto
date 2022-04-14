(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._form=n,this._settings=e,this._inputList=Array.from(this._form.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._form.querySelector(this._settings.submitButtonSelector)}var n,r;return n=t,(r=[{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_disableSubmitButton",value:function(){this._buttonElement.classList.add(this._settings.inactiveButtonClass),this._buttonElement.disabled=!0}},{key:"_enableSubmitButton",value:function(){this._buttonElement.classList.remove(this._settings.inactiveButtonClass),this._buttonElement.disabled=!1}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?this._disableSubmitButton():this._enableSubmitButton()}},{key:"_showInputError",value:function(e,t){var n=this._form.querySelector("#".concat(e.id,"-error"));e.classList.add(this._settings.inputErrorClass),n.textContent=t,n.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._settings.inputErrorClass),t.classList.remove(this._settings.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e.toggleButtonState(e._inputList,e._buttonElement)}))}))}},{key:"enableValidation",value:function(){this._form.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}},{key:"resetValidation",value:function(){var e=this;this._form.reset(),this._inputList.forEach((function(t){e._hideInputError(t)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._cardTemplate=document.querySelector(n).content.querySelector(".card"),this._title=t.name,this._description=t.name,this._image=t.link,this._likes=t.likes,this._id=t.id,this._userId=t.userId,this._ownerId=t.ownerId,this._cardSelector=n,this._handleImageClick=r,this._handleDeleteClick=o,this._handleLikeClick=i}var t,r;return t=e,(r=[{key:"isLiked",value:function(){var e=this;return this._likes.find((function(t){return t._id===e._userId}))}},{key:"setLikes",value:function(e){this._likes=e,this._cardElement.querySelector(".card__like-count").textContent=this._likes.length,this.isLiked()?this._activeLike():this._defaultLike()}},{key:"generateCard",value:function(){return this._cardElement=this._cardTemplate.cloneNode(!0),this._likeButton=this._cardElement.querySelector(".card__like-button"),this._deleteButton=this._cardElement.querySelector(".card__remove-button"),this._cardImage=this._cardElement.querySelector(".card__image"),this._cardImage.src=this._image,this._cardElement.querySelector(".card__place-name").textContent=this._title,this._cardImage.alt=this._title,this._setEventListeners(),this.setLikes(this._likes),this._ownerId!==this._userId&&(this._cardElement.querySelector(".card__remove-button").style.display="none"),this._cardElement}},{key:"_setEventListeners",value:function(){var e=this;this._cardImage.addEventListener("click",(function(){e._handleImageClick()})),this._deleteButton.addEventListener("click",(function(){e._handleDeleteClick(e._id)})),this._likeButton.addEventListener("click",(function(){e._handleLikeClick(e._id)}))}},{key:"deleteCard",value:function(){this._cardElement.remove()}},{key:"_activeLike",value:function(){this._likeButton.classList.add("card__like-button_active")}},{key:"_defaultLike",value:function(){this._likeButton.classList.remove("card__like-button_active")}},{key:"_handleLikeCard",value:function(){this._likeButton.classList.toggle("card__like-button_active")}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._container=document.querySelector(n),this._items=r,this._renderer=o}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".popup__button-close"),this._popup.addEventListener("click",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__button-close"))&&e.close()}))}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},l.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}function p(e,t){return p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},p(e,t)}function d(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(s,e);var t,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=h(r);if(o){var n=h(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function s(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=i.call(this,e))._image=t._popup.querySelector(".popup__picture"),t._title=t._popup.querySelector(".popup__picture-title"),t}return t=s,(n=[{key:"open",value:function(e,t){this._image.src=t,this._title.textContent=e,l(h(s.prototype),"open",this).call(this)}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(a);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=b(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},v.apply(this,arguments)}function b(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function k(e,t){return k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},k(e,t)}function g(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(s,e);var t,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function s(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(n=i.call(this,e))._handleSubmit=t,n._form=n._popup.querySelector(".popup__form"),n._inputs=n._form.querySelectorAll(".popup__input"),n}return t=s,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputs.forEach((function(t){e[t.name]=t.value})),e}},{key:"changeSubmitHandler",value:function(e){this._handleSubmit=e}},{key:"setEventListeners",value:function(){var e=this;v(E(s.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmit(e._getInputValues())}))}},{key:"close",value:function(){v(E(s.prototype),"close",this).call(this),this._form.reset()}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(a);function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){var n=t.profileNameSelector,r=t.proileJobSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._jobElement=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,job:this._jobElement.textContent}}},{key:"setUserInfo",value:function(e,t){this._nameElement.textContent=e,this._jobElement.textContent=t}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var C,O=new(function(){function e(t){var n=t.baseUrl,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._headers=r,this._baseUrl=n}var t,n;return t=e,(n=[{key:"getProfile",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"editProfile",value:function(e,t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"addCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"addLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-39",headers:{authorization:"f2ec7423-3d33-4d4c-8f08-a96b34cddef8","Content-Type":"application/json"}});O.getProfile().then((function(e){K.setUserInfo(e.name,e.about),C=e._id})),O.getInitialCards().then((function(e){console.log("cardList",e),e.forEach((function(e){var t=H({name:e.name,link:e.link,likes:e.likes,id:e._id,userId:C,ownerId:e.owner._id});z.addItem(t)}))}));var P=document.querySelector(".popup__input_type_author"),I=document.querySelector(".popup__input_type_profession"),q=document.querySelector(".popup_type_profile-edit"),B=document.querySelector(".popup_type_create-place"),T=document.querySelector(".profile__edit-button"),R=document.querySelector(".profile__add-button"),U=document.querySelector(".popup__button-submit_type_profile"),x=document.querySelector(".popup__button-submit_type_card"),D=document.querySelector(".popup__form_type_place"),V=q.querySelector(".popup__form_profile_edit"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button-submit",inactiveButtonClass:"popup__button-submit_disabled",inputErrorClass:"popup__input_has-error",errorClass:"popup__error_visible"},A=new t(N,D),J=new t(N,V);A.enableValidation(),J.enableValidation();var H=function(e){var t=new r(e,".square-card",(function(){M.open(e.name,e.link)}),(function(e){Q.open(),Q.changeSubmitHandler((function(){O.deleteCard(e).then((function(e){t.deleteCard(),Q.close()}))}))}),(function(e){t.isLiked()?O.deleteLike(e).then((function(e){console.log(e),t.setLikes(e.likes)})):O.addLike(e).then((function(e){console.log(e),t.setLikes(e.likes)}))}));return t.generateCard()};T.addEventListener("click",(function(){var e=K.getUserInfo(),t=e.name,n=e.job;P.value=t,I.value=n,J.resetValidation(q),J.toggleButtonState(U),G.open()})),R.addEventListener("click",(function(){A.resetValidation(B),A.toggleButtonState(x),F.open()}));var z=new i({items:[],renderer:function(e){var t=H(e);z.addItem(t)}},".elements"),M=new _(".popup_type_picture-open"),F=new w(".popup_type_create-place",(function(e){O.addCard(e["place-name-input"],e["place-link-input"]).then((function(e){console.log("res",e);var t=H({name:e.name,link:e.link,likes:e.likes,id:e._id,userId:C,ownerId:e.owner._id});z.addItem(t),F.close()}))})),G=new w(".popup_type_profile-edit",(function(e){var t=e.name,n=e.description;O.editProfile(t,n).then((function(){K.setUserInfo(t,n),G.close()}))})),K=new L({profileNameSelector:".profile__name",proileJobSelector:".profile__profession"}),Q=new w(".popup_type_delete-card");M.setEventListeners(),F.setEventListeners(),G.setEventListeners(),Q.setEventListeners(),z.renderItems()})();