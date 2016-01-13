## Example
<div class="element-demo" id="example"></div>

## Usage

`<b-tabs>` wraps a list of `<b-tab>` elements: each `<b-tab>` must have a `for` attribute targeting an element wrapping the tab's content.

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

## Styling
The following variables are available for styling:

| Variable                         | Description                                                  |
|----------------------------------|--------------------------------------------------------------|
| --b-tabs-bg                      | The color of the tabs background                             |
| --b-tabs-border-bottom           | The bottom border                                            |
| --b-tabs-shadow                  | The box-shadow applied to the tabs container                 |
|                                  |                                                              |
| --b-tab-color                    | The font color of each tab                                   |
| --b-tab-padding                  |                                                              |
| --b-tab-bar-color                | The color of the bottom bar of the active tab                |

## API

### Attributes
- __selected__: specifies which tab is visible.



