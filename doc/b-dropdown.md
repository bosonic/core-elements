{
  title: 'Dropdowns',
  category: "elements",
  section: "core"
}

# b-dropdown

## Usage

Basically, a `<b-dropdown>` element wraps a button and an unordered list into a dropdown menu, hidden by default and showable by adding a `open` attribute or via the API:

```html
<b-dropdown>
    <button>Dropdown</button>
    <ul>
        <li>plain text</li>
        <li><a href="#">link item</a></li>
        <hr />
        <li><a href="#">separated link</a></li>
    </ul>
</b-dropdown>
```

## API

### Methods
- __show()__ 
- __hide()__
- __toggle()__