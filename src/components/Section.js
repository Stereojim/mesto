export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }

  // изначальная отрисовка
  renderItems(items) {
    this._items = items;
    this._items.forEach((items) => {
      this._renderer(items);
    });
  }

  // добавление новой карточки
  addItem(element) {
    this._container.prepend(element);
  }
}
