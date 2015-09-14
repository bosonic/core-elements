{
  title: 'Draggable',
  element: 'b-draggable',
  category: "elements",
  section: "core",
  order: 9
}

# b-draggable

An element which may be used to add draggable behavior to an element.

## Usage

```html
<b-draggable handle=".drag-handle">
    <div>
        <div class="drag-handle"></div>
        <p>Lorem ipsum...</p>
    </div>
</b-draggable>
```

## API

### Attributes
- __handle__: a CSS selector that points to the element to be used to drag the object (defaults to the whole object).
- __axis__: constrains the draggability along an axis (`x` or `y`).
- __containement__: specifies an element that defines the boundaries of the draggable area: `parent` or `<selector>`.