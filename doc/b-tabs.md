{
  title: 'Tabs',
  element: 'b-tabs',
  category: "elements",
  section: "core",
  order: 3
}

# b-tabs

`<b-tabs>` wraps a list of `<b-tab>` elements: each `<b-tab>` must have a `for` attribute targeting an element wrapping the tab's content.

## Usage

``` html
<b-tabs selected="0">
    <b-tab for="one">One</b-tab>
    <b-tab for="two">Two</b-tab>
    <b-tab for="three">Three</b-tab>
</b-tabs>
<div id="one">
    Lorem ipsum...
</div>
<div id="two">
    Iste, reiciendis...
</div>
<div id="three">
    Nisi, ipsum...
</div>
```

## Accessibility

ARIA authoring practices are automatically applied by the element.

## API

### Attributes
- __selected__: specifies which tab is visible.



