(function () {
    var template = function () {
            var df0 = document.createDocumentFragment();
            var el0 = document.createElement('p');
            el0.appendChild(document.createTextNode('Hello world!'));
            df0.appendChild(el0);
            return { content: df0 };
        }();
    window.BHelloWorld = document.registerElement('b-hello-world', {
        prototype: Object.create(HTMLElement.prototype, {
            createdCallback: {
                enumerable: true,
                value: function () {
                    this.createShadowRoot();
                    this.shadowRoot.appendChild(template.content.cloneNode(true));
                    console.log('Hello world !');
                }
            }
        })
    });
}());