(function () {
    var KEY = {
            ENTER: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };
    window.BSelectable = document.registerElement('b-selectable', {
        prototype: Object.create(HTMLElement.prototype, {
            attributeChangedCallback: {
                enumerable: true,
                value: function (name, oldValue, newValue) {
                    if (['selected'].indexOf(name) !== -1) {
                        this[name + 'Changed'].call(this, oldValue, newValue);
                    }
                }
            },
            elementRole: {
                enumerable: true,
                value: 'listbox'
            },
            elementLabel: {
                enumerable: true,
                value: 'Selectable list'
            },
            itemsRole: {
                enumerable: true,
                value: 'option'
            },
            selectedItemIndex: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('selected') ? Number(this.getAttribute('selected')) : null;
                }
            },
            createdCallback: {
                enumerable: true,
                value: function () {
                    this.handleAria();
                    if (this.hasAttribute('selected')) {
                        this.selectedChanged(null, this.getAttribute('selected'));
                    }
                    this.addListeners();
                }
            },
            handleAria: {
                enumerable: true,
                value: function () {
                    this.tabIndex = 0;
                    this.setAttribute('role', this.elementRole);
                    this.setAttribute('aria-label', this.elementLabel);
                    this.getItems().forEach(function (item) {
                        item.setAttribute('role', this.itemsRole);
                    }, this);
                }
            },
            addListeners: {
                enumerable: true,
                value: function () {
                    this.addEventListener('click', this.clickHandler.bind(this), false);
                    this.addEventListener('keydown', this.keydownHandler.bind(this), false);
                    this.addEventListener('focus', this.focusHandler.bind(this), false);
                }
            },
            selectedChanged: {
                enumerable: true,
                value: function (oldValue, newValue) {
                    var oldSelectedItem, newSelectedItem;
                    this.dispatchEvent(new CustomEvent('b-select', { detail: { item: newValue } }));
                    if (!isNaN(oldValue) && (oldSelectedItem = this.getItem(oldValue)) !== null) {
                        oldSelectedItem.classList.remove('b-selectable-selected');
                        oldSelectedItem.removeAttribute('aria-selected');
                    }
                    if (!isNaN(newValue) && (newSelectedItem = this.getItem(newValue)) !== null) {
                        newSelectedItem.classList.add('b-selectable-selected');
                        newSelectedItem.setAttribute('aria-selected', 'true');
                    }
                }
            },
            focusHandler: {
                enumerable: true,
                value: function (e) {
                    if (!this.hasAttribute('selected')) {
                        this.selectFirst();
                    }
                }
            },
            clickHandler: {
                enumerable: true,
                value: function (e) {
                    var itemIndex = this.getItems().indexOf(e.target);
                    if (itemIndex !== -1) {
                        this.select(itemIndex);
                        this.activate();
                    }
                }
            },
            keydownHandler: {
                enumerable: true,
                value: function (e) {
                    switch (e.keyCode) {
                    case KEY.ENTER: {
                            this.activate();
                            break;
                        }
                    case KEY.DOWN: {
                            this.selectNextItem();
                            break;
                        }
                    case KEY.UP: {
                            this.selectPreviousItem();
                            break;
                        }
                    default:
                        return;
                    }
                }
            },
            activate: {
                enumerable: true,
                value: function () {
                    this.dispatchEvent(new CustomEvent('b-activate', { detail: { item: parseInt(this.getAttribute('selected')) } }));
                }
            },
            select: {
                enumerable: true,
                value: function (index) {
                    if (index !== this.selectedItemIndex) {
                        console.log('set selected', index);
                        this.setAttribute('selected', index);
                    }
                }
            },
            unselect: {
                enumerable: true,
                value: function () {
                    if (this.hasAttribute('selected')) {
                        this.removeAttribute('selected');
                    }
                }
            },
            selectFirst: {
                enumerable: true,
                value: function () {
                    if (this.getItemCount() > 0) {
                        this.select(0);
                    }
                }
            },
            selectLast: {
                enumerable: true,
                value: function () {
                    if (this.getItemCount() > 0) {
                        this.select(this.getItemCount() - 1);
                    }
                }
            },
            selectNextItem: {
                enumerable: true,
                value: function () {
                    if (this.selectedItemIndex === null) {
                        this.selectFirst();
                        return;
                    }
                    if (this.selectedItemIndex < this.getItemCount() - 1) {
                        this.select(this.selectedItemIndex + 1);
                    }
                }
            },
            selectPreviousItem: {
                enumerable: true,
                value: function () {
                    if (this.selectedItemIndex === null) {
                        this.selectLast();
                        return;
                    }
                    if (this.selectedItemIndex > 0) {
                        this.select(this.selectedItemIndex - 1);
                    }
                }
            },
            getItem: {
                enumerable: true,
                value: function (pos) {
                    return this.getItems()[pos] || null;
                }
            },
            getItemCount: {
                enumerable: true,
                value: function () {
                    return this.getItems().length;
                }
            },
            getItems: {
                enumerable: true,
                value: function () {
                    var target = this.getAttribute('target');
                    var nodes = target ? this.querySelectorAll(target) : this.children;
                    return Array.prototype.slice.call(nodes, 0);
                }
            }
        })
    });
}());