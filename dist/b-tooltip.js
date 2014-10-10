(function () {
    var __bosonic__template__b_tooltip__ = function () {
            var df0 = document.createDocumentFragment();
            var el0 = document.createElement('div');
            el0.setAttribute('class', 'b-tooltip');
            var el1 = document.createElement('content');
            el0.appendChild(el1);
            df0.appendChild(el0);
            return { content: df0 };
        }();
    window.BTooltip = document.registerElement('b-tooltip', {
        prototype: Object.create(HTMLElement.prototype, {
            position: {
                enumerable: true,
                get: function () {
                    return this.getAttribute('position') || 'top left';
                }
            },
            target: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('target') ? document.querySelector(this.getAttribute('target')) : null;
                }
            },
            tooltip: {
                enumerable: true,
                get: function () {
                    return this.shadowRoot.querySelector('.b-tooltip');
                }
            },
            createdCallback: {
                enumerable: true,
                value: function () {
                    this.createShadowRoot();
                    this.shadowRoot.appendChild(document.importNode(__bosonic__template__b_tooltip__.content, true));
                    this.enterListener = this.onEnterTarget.bind(this);
                    this.leaveListener = this.onLeaveTarget.bind(this);
                    this.target.addEventListener('mouseenter', this.enterListener, false);
                    this.target.addEventListener('mouseleave', this.leaveListener, false);
                }
            },
            attachedCallback: {
                enumerable: true,
                value: function () {
                }
            },
            onEnterTarget: {
                enumerable: true,
                value: function (evt) {
                    this.setAttribute('show', '');
                }
            },
            onLeaveTarget: {
                enumerable: true,
                value: function (evt) {
                    this.removeAttribute('show');
                }
            }
        })
    });
    ;
}());