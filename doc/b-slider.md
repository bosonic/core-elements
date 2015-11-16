{
  title: 'Slider',
  element: 'b-slider',
  category: "elements",
  section: "core",
  order: 11
}

# b-slider

A slider allows you to pick a numeric value by dragging a handle. Use `min` and `max` attributes to specify the range of allowed numeric values (default is 0 to 100).

## Usage

``` html
<b-slider min="10" max="150" value="30"></b-slider>
```

## Accessibility

ARIA authoring practices are automatically applied by the element.

## Styling
The following variables are available for styling:

| Variable                         | Description                        |
|----------------------------------|------------------------------------|
| --b-slider-knob-color            | The color of the slider's knob     |
| --b-slider-knob-3d-effect        | The box-shadow applied to the knob |

## API

### Attributes
- __value__: specifies the default value, it is updated when the user drags the handle.
- __min__: specifies the minimum value of the range.
- __max__: specifies the maximum value of the range.

### Events
- __b-slider-change__: fires when the value change.