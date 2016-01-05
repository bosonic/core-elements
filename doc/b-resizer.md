An element which may be used to add resizable behavior to an element.

## Demo
<div class="element-demo" id="example"></div>

## Usage

```html
<div id="resizable">
    <p>
        Lorem ipsum dolor sit amet, ...
    </p>
    <b-resizer>
</div>
```

Include `<b-resizer>` as a children of the element to be resized. Please note `<b-resizer>` resizes its parent element in a bidirectional way.

## Styling

Important: you probably will want to set the element to be resized to `overflow: hidden` in order to avoid its contents to bleed outside.