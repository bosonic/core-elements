{
  title: "Segmented controls",
  element: 'b-segmented-controls',
  category: "elements",
  section: "core",
  order: 10
}

# b-segmented-controls

This element groups a series of controls (buttons, checkboxes or radio buttons) on a single line.

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

## API

### Attributes
- __vertical__: makes the set of controls appear vertically stacked rather than horizontally.
