describe("Dialog component", function() {
    var dialog = document.createElement('b-dialog');
    document.body.appendChild(dialog);

    it('should stay hidden when created', function() {
        expect(dialog.hasAttribute('visible')).to.be.false;
        expect(dialog.getAttribute('aria-hidden')).to.equal('true');
    });

    it('should show up when requested', function() {
        dialog.show();
        expect(dialog.hasAttribute('visible')).to.be.true;
        expect(dialog.getAttribute('aria-hidden')).to.equal('false');
    });

    it('should hide when requested', function() {
        dialog.show();
        dialog.hide();
        expect(dialog.hasAttribute('visible')).to.be.false;
        expect(dialog.getAttribute('aria-hidden')).to.equal('true');
    });
});