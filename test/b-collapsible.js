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
            expect(collapsible.active).to.be.true;
            expect(collapsible.body.classList.contains('b-collapsible-closed')).to.be.false;
        });
    });

    it("should get an `active` attribute when its header is clicked", function() {
        return createCollapsible().then(function(collapsible) {
            expect(collapsible.active).to.be.false;
            return click(collapsible, '.b-collapsible-header');
        }).then(function(collapsible) {
            expect(collapsible.active).to.be.true; 
            expect(collapsible.hasAttribute('active')).to.be.true;
        });
    });

    it("should loose its `active` attribute when its header is clicked and it is already active", function() {
        return createCollapsible().then(function(collapsible) {
            return toggle(collapsible, 'active');
        }).then(function(collapsible) {
            return click(collapsible, '.b-collapsible-header');
        }).then(function(collapsible) {
            expect(collapsible.active).to.be.false;
            expect(collapsible.hasAttribute('active')).to.be.false;
        });
    });
})