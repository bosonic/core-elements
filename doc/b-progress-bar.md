Progress bars can be used to display a percentage of something, like an action to be completed.

## Example
<div class="element-demo" id="example1"></div>
<div class="element-demo" id="example2"></div>

## Usage

``` html
<b-progress-bar value="50" secondary="70"></b-progress-bar>
```

## Styling
The following variables are available for styling:

| Variable                         | Description                    |
|----------------------------------|--------------------------------|
| --b-progress-bar-color           | The color of the bar           |
| --b-progress-bar-secondary-color | The color of the secondary bar |
| --b-progress-bar-container-color | The color of the bar container |
| --b-progress-bar-height          | The height of the bar          |

## API

### Attributes
- __value__: specifies the % to display.
- __secondary__: specifies the % for a secondary progress to display, like a buffering.