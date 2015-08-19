{
  title: 'Dialogs & modals'
}

# b-dialog

You may not love them, but modals are sometimes requested by customers...

## Usage

``` html
<b-dialog>
    <b-dialog-content>
        <h3>Test</h3>
        <p>Hello world!</p>
        <button data-dialog-dismiss>Close</button>
    </b-dialog-content>
</b-dialog>

<button id="show-modal">Show modal</button>

<script type="text/javascript">
    window.addEventListener("WebComponentsReady", function() {
        var showModalButton = document.getElementById('show-modal');
        showModalButton.addEventListener('click', function() {
            document.querySelector('b-dialog').showModal();
        }, false);
    });
</script>
```
As you can see, you must wrap your dialog content with a `<b-dialog-content>`. This is sadly necessary to enable classy dialog appearances using CSS transform transitions instead of dirty JS hacks.

A `<b-dialog>` is hidden by default, you must open it by calling its `show()` or `showModal()` method. But you can make it dismissable without any JS by adding a `dialog-dismiss` or `data-dialog-dismiss` attribute to any link or button inside the dialog content.

## Accessibility

`role="dialog"` and `aria-hidden="..."` attributes will be automatically added to the `<b-dialog>` element, but you must add yourself `aria-labelledby="..."` (referencing the dialog title) to the element, and `role="document"` to the dialog content. Focus "grab" will be automatically handled.

## API

### Methods
- __show()__ / __open()__: opens the dialog.
- __hide()__ / __close()__: closes the dialog.
- __showModal()__: opens the dialog in a modal way (with an overlay).

### Events
- __b-dialog-close__: fired when the dialog is closed.
- __b-dialog-cancel__: cancelable event fired when the dialog is dismissed by using the ESC key.

