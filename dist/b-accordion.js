(function () {
    var PANEL_HEADER_CLASS = '.b-collapsible-header';
    window.BAccordion = document.registerElement('b-accordion', {
        prototype: Object.create(BSelectable.prototype, {
            elementRole: {
                enumerable: true,
                value: 'tablist'
            },
            elementLabel: {
                enumerable: true,
                value: 'Accordion'
            },
            itemsRole: {
                enumerable: true,
                value: 'tabpanel'
            },
            headersRole: {
                enumerable: true,
                value: 'tab'
            },
            createdCallback: {
                enumerable: true,
                value: function () {
                    BSelectable.prototype.createdCallback.call(this);
                }
            },
            handleAria: {
                enumerable: true,
                value: function () {
                    BSelectable.prototype.handleAria.call(this);
                    this.getItems().forEach(function (panel) {
                        panel.setAttribute('aria-expanded', 'false');
                        panel.setAttribute('aria-hidden', 'true');
                        panel.querySelector(PANEL_HEADER_CLASS).setAttribute('role', this.headersRole);
                    }, this);
                }
            },
            clickHandler: {
                enumerable: true,
                value: function (e) {
                    e.stopPropagation();
                    if (e.target.nodeName !== 'B-COLLAPSIBLE') {
                        e = { target: e.target.parentElement };
                    }
                    BSelectable.prototype.clickHandler.call(this, e);
                }
            },
            selectedChanged: {
                enumerable: true,
                value: function (oldValue, newValue) {
                    BSelectable.prototype.selectedChanged.call(this, oldValue, newValue);
                    var oldItem = this.getItem(oldValue), newItem = this.getItem(newValue);
                    if (oldItem !== null) {
                        oldItem.removeAttribute('active');
                        oldItem.setAttribute('aria-expanded', 'false');
                        oldItem.setAttribute('aria-hidden', 'true');
                    }
                    if (newItem !== null) {
                        newItem.setAttribute('active', '');
                        newItem.setAttribute('aria-expanded', 'true');
                        newItem.setAttribute('aria-hidden', 'false');
                    }
                }
            }
        })
    });
    ;
}());