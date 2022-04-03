export class Section {
  constructor ({ items, renderer}, containerSelector) {
this._container = document.querySelector(containerSelector)
this._items = items
this._renderer = renderer
  }

// изначальная отрисовка
renderItems() {
this._items.forEach(data => {
this._renderer(data)
})
}

// добавление новой карточки
addItem(element) {
this._container.prepend(element)
}
}
