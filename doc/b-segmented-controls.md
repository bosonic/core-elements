This element groups a series of controls (buttons, checkboxes or radio buttons) on a single line.

## Examples
<div class="element-demo" id="example1"></div>
<div class="element-demo" id="example2"></div>

## Usage

``` html
<b-segmented-controls>
    <button>Left</button>
    <button>Center</button>
    <button>Right</button>
</b-segmented-controls>

<b-segmented-controls>
    <label>
        <input type="checkbox" autocomplete="off" checked> Checkbox 1
    </label>
    <label>
        <input type="checkbox" autocomplete="off"> Checkbox 2
    </label>
    <label>
        <input type="checkbox" autocomplete="off"> Checkbox 3
    </label>
</b-segmented-controls>

<b-segmented-controls>
    <label>
        <input type="radio" autocomplete="off" checked> Radio 1
    </label>
    <label>
        <input type="radio" autocomplete="off"> Radio 2
    </label>
    <label>
        <input type="radio" autocomplete="off"> Radio 3
    </label>
</b-segmented-controls>
```

## Accessibility

Don't forget to provide a label to your `b-segmented-controls` element, using `aria-label` or `aria-labelledby` attributes.

## Styling

As `b-segmented-controls` is meant to wrap standard form controls, we don't embed a default styling in the component, apart from some general rules. Use classes from the theme stylesheet (like `b-button` on labels) to style these controls.

## API

### Attributes
- __vertical__: makes the set of controls appear vertically stacked rather than horizontally.
