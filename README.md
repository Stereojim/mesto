# 1. Project: mesto

### 2. mesto - is a simple project, like an private foto library - with an author and his favorite places (fotos). At this point you can only change the name and description of autors job. Mesto looks good as fuulsized an also as mobile versions.

* So maket was get from figma
* Pictures - mine

* [page on Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

__How to open and close popup in JS?__
```js
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
```

3. You can find simple exaples of how to make gallery and how to make opening popup (it's some js in project)

4. So it is a lot of work with JavaSkript remains. I must make cards addable, also as their descriptions.

* [My site link](https://stereojim.github.io/mesto/)

