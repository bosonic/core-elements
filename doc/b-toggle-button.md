{
  title: "Toggle button",
  element: 'b-toggle-button',
  category: "elements",
  section: "core",
  order: 9
}

# b-toggle-button

## Usage

The `checked` attribute indicates the state ON of the toggle button.

```html
<b-toggle-button checked></b-toggle-button>
```

The `nocaption` attribute removes the default ON/OFF caption of the button.

```html
<b-toggle-button nocaption></b-toggle-button>
```

The `oncaption` and `offcaption` attributes let you change the caption of the button. If the caption is too long, use a padding-right and padding-left directive to adapt the size of the toggle-button
```html
<b-toggle-button style="padding: 0 15px" oncaption="activated" offcaption="deactivated"></b-toggle-button>
```

You can control the b-toggle-button with javascript:
```javascript
var toggleButton = document.querySelector('b-toggle-button');

toggleButton.activate(); // activate
toggleButton.deactivate(); // deactivate
toggleButton.toggle(); // toggle

toggleButton.value; // returns a boolean
toggleButton.checked; // returns a boolean
toggleButton.checked = true; // activate the button
toggleButton.checked = false; // deactivate the button
```

## Accessibility

ARIA authoring practices are automatically handled by the element. The user can use the keyboard to toggle the button: SPACE/ENTER.

## API

### Attributes
- __nocaption__: the button will not display any caption.
- __oncaption__: specifies the caption to show when the button is activated.
- __offcaption__: specifies the caption to show when the button is disactivated.

### Properties
- __value__: returns a boolean related to the state of the button.
- __checked__: returns a boolean related to the state of the button.

### Methods
-__activate()__
-__deactivate()__
-__toggle()__


