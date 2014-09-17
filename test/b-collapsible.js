function createCustomElement(tag, innerHTML) {
    var elt = document.createElement(tag);
    elt.innerHTML = innerHTML;
    document.body.appendChild(elt);
    return new Promise(function(resolve,reject) {
        setTimeout(function() {
            resolve(elt);
        }, 50);
    });
}

function toggle(elt, attribute) {
    if (elt.hasAttribute(attribute)) {
        elt.removeAttribute(attribute);
    } else {
        elt.setAttribute(attribute, '');
    }
    return new Promise(function(resolve,reject) {
        setTimeout(function() {
            resolve(elt);
        }, 50);
    });
}

function createCollapsible() {
    return createCustomElement('b-collapsible', '<div class="b-collapsible-header">Header</div><div>Lorem ipsum</div>');
}

describe("b-collapsible", function() {

    it("should be collapsed by default", function() {
        return createCollapsible().then(function(collapsible) {
            expect(collapsible.body.style.height).to.equal('');
            expect(collapsible.body.classList.contains('b-collapsible-closed')).to.be.true;
        });
    });

    it("should expand when set as active", function() {
        return createCollapsible().then(function(collapsible) {
            return toggle(collapsible, 'active');
        }).then(function(collapsible) {
            expect(collapsible.body.classList.contains('b-collapsible-closed')).to.be.false;
        });
    });

    it("should get an `active` attribute when its header is clicked", function() {
        return createCollapsible().then(function(collapsible) {
            expect(collapsible.hasAttribute('active')).to.be.false;
            effroi.mouse.click(collapsible.querySelector('.b-collapsible-header'));
            expect(collapsible.hasAttribute('active')).to.be.true;
        });
    });

    it("should loose its `active` attribute when its header is clicked and it is already active", function() {
        return createCollapsible().then(function(collapsible) {
            return toggle(collapsible, 'active');
        }).then(function(collapsible) {
            effroi.mouse.click(collapsible.querySelector('.b-collapsible-header'));
            expect(collapsible.hasAttribute('active')).to.be.false;
        });
    });
})