## Example
<div class="element-demo" id="example"></div>

`<b-accordion>` necessitates a bit of rigor regarding to the markup, illustrated below: 

- you can use whatever type of element for the headers, but you must provide a valid selector for them in the `target` attribute ;
- the panels content must be wrapped by a `<b-collapsible>` element, and the `<b-collapsible>` must be the next sibling to the headers element.

## Usage

``` html
<b-accordion target=".header" selected="0">
    <button class="header">Section #1</button>
    <b-collapsible>
        <div>
            Lorem ipsum...
        </div>
    </b-collapsible>
    <button class="header">Section #2</button>
    <b-collapsible>
        <div>
            Lorem ipsum...
        </div>
    </b-collapsible>
    <button class="header">Section #3</button>
    <b-collapsible>
        <div>
            Lorem ipsum...
        </div>
    </b-collapsible>
</b-accordion>
```

## Accessibility

ARIA authoring practices are automatically handled by the element.

## Styling

As there are very different usecases for an accordion (standalone or in a sidebar for example), we don't embed a default styling in the component, but rather provide a set of CSS classes with the theme stylesheet. Available classes are `b-accordion`, `b-accordion-title` and `b-accordion-content`.

## API

### Attributes
- __selected__: specifies the panel to show (uses a numerical index).
- __target__: a CSS selector for the headers elements.


