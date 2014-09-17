(function () {
    window.BFlashMessage = document.registerElement('b-flash-message', {
        prototype: Object.create(HTMLElement.prototype, {
            attributeChangedCallback: {
                enumerable: true,
                value: function (name, oldValue, newValue) {
                    if ([
                            'closeable',
                            'duration'
                        ].indexOf(name) !== -1) {
                        this[name + 'Changed'].call(this, oldValue, newValue);
                    }
                }
            },
            attachedCallback: {
                enumerable: true,
                value: function () {
                    if (this.getAttribute('closeable') === 'true') {
                        var btn = document.createElement('button');
                        btn.classList.add('b-flash-message-close');
                        btn.textContent = 'x';
                        this.appendChild(btn);
                        btn.addEventListener('click', this.close.bind(this), false);
                    }
                    var type = this.getAttribute('type');
                    this.setAttribute('type', type || 'info');
                    if (this.getAttribute('visible') === 'true')
                        this.show();
                    if (this.supportsTransitions()) {
                        this.fadeOutEndListener = this.fadeOutEnd.bind(this);
                        this.addEventListener('webkitTransitionEnd', this.fadeOutEndListener);
                        this.addEventListener('transitionend', this.fadeOutEndListener);
                    }
                }
            },
            show: {
                enumerable: true,
                value: function () {
                    this.setAttribute('visible', 'true');
                    var duration = this.getAttribute('duration');
                    if (duration && !isNaN(parseInt(duration))) {
                        if (this.supportsTransitions()) {
                            this.removeAttribute('closing');
                            setTimeout(this.fadeOut.bind(this), duration);
                        } else {
                            setTimeout(this.close.bind(this), duration);
                        }
                    }
                    this.dispatchEvent(new CustomEvent('b-flash-message-show'));
                }
            },
            close: {
                enumerable: true,
                value: function () {
                    this.removeAttribute('visible');
                    this.dispatchEvent(new CustomEvent('b-flash-message-close'));
                }
            },
            fadeOut: {
                enumerable: true,
                value: function (duration) {
                    this.setAttribute('closing', '');
                }
            },
            fadeOutEnd: {
                enumerable: true,
                value: function (e) {
                    this.close();
                    this.removeAttribute('closing');
                }
            },
            supportsTransitions: {
                enumerable: true,
                value: function () {
                    return window.requestAnimationFrame !== undefined;
                }
            }
        })
    });
}());