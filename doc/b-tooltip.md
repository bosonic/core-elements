{
  title: 'Tooltips',
  element: 'b-tooltip',
  category: "elements",
  section: "core",
  order: 4
}

# b-tooltip

## Usage

A `<b-tooltip>` will appear when the user hovers (or focus) over the element specified in the `for` attribute. Its placement relative to the element is determined by the value of the `position` attribute (possible values are: `left`, `right`, `top` or `bottom`).

``` html
<button id="btn">Tooltip on left</button>
<b-tooltip for="btn" position="left">Tooltip text</b-tooltip>
```

## API

### Methods
- __show()__
- __hide()__
