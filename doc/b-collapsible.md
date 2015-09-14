{
  title: 'Collapsible',
  element: 'b-collapsible',
  category: "elements",
  section: "core",
  order: 5
}

# b-collapsible

You guessed it, `<b-collapsible>` creates a collapsible block of content, collapsed by default. You can set the `opened` attribute to show the content, or use its `toggle()` method. Transition duration can be specified in milliseconds with the duration attribute.

## Usage

``` html
<button id="toggle-collapsible" aria-controls="collapsible" aria-expanded="false">Toogle collapsible</button>
<b-collapsible id="collapsible" aria-labelledby="toggle-collapsible" duration="100">
    <div>
        Lorem ipsum...
    </div>
</b-collapsible>
<script type="text/javascript">
    window.addEventListener("WebComponentsReady", function() {
        var btn = document.getElementById('toggle-collapsible'),
            collapsible = document.getElementById('collapsible');
        
        btn.addEventListener('click', function() {
            collapsible.toggle();
            btn.setAttribute('aria-expanded', collapsible.opened ? 'true' : 'false');
        }, false);
    });
</script>
```

## Styling

Don't style `<b-collapsible>` directly (in particular, avoid padding/margin/border as it will ruin the transition effect), style its content instead.

## Accessibility

A11y attributes to be used are shown in the sample above.

## API

## Attributes
- __opened__: if set, the collapsible will show.
- __duration__: transition duration in milliseconds.
- __horizontal__: if set, the collapsible will collapse in width instead of height.

### Methods
- __toggle()__

### Events
- __b-collapsible-toggle__: cancelable event fired when the collapsible is about to be shown/hidden.
- __b-collapsible-show__: cancelable event fired when the collapsible is about to be shown.
- __b-collapsible-hide__: cancelable event fired when the collapsible is about to be hidden.



