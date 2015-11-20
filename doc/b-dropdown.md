## Example
<div class="element-demo" id="example"></div>

## Usage

Basically, a `<b-dropdown>` element wraps a button and an unordered list into a dropdown menu, hidden by default and showable by adding a `open` attribute or via the API:

```html
<b-dropdown>
    <button>Dropdown</button>
    <ul>
        <li><a href="#">Some action</a></li>
        <li><a href="#">Yet another action</a></li>
        <hr />
        <li><a href="#">What else?</a></li>
    </ul>
</b-dropdown>
```

## Styling
The following variables are available for styling:

| Variable                         | Description                            |
|----------------------------------|----------------------------------------|
| --b-dropdown-border              | The border of the dropdown...          |
| --b-dropdown-border-radius       |                                        |
| --b-dropdown-shadow              | The box-shadow of the dropdown         |
| --b-dropdown-item-font-size      |                                        |
| --b-dropdown-item-padding        |                                        |
| --b-dropdown-item-hover-bg       | The background color of a hovered item |

## API

### Methods
- __show()__ 
- __hide()__
- __toggle()__