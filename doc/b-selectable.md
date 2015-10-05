{
  title: 'Selectable',
  element: 'b-selectable',
  category: "elements",
  section: "core",
  order: 9
}

# b-selectable

`b-selectable` is an element which allows single (for now) selection of an item in a list.

## Usage

The `selected` attribute indicates which item element is being selected, and can also be used to select an item programmatically.

```html
<b-selectable selected="0">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</b-selectable>
```
The `target` attribute defines a selector used to query nodes to be used for selectable items.

```html
<b-selectable target="li">
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</b-selectable>
```

Whenever the selected item changes, a `b-selected` event will be fired. The user can use the keyboard to select an item: Up/Down.

If the user clicks/taps on an item, it will be selected AND then activated (a `b-activate` event will be fired just after the `b-selected`). If using keyboard, type ENTER to activate the selected item.

`b-selectable` is not styled.  You need to style the `b-selectable-selected` CSS class to style the selected element.

```css
.b-selectable-selected {
    background-color: #ccc;
}
```

## Accessibility

`b-selectable` acts as an ARIA listbox widget. As such, `role="listbox"` will be automatically added to it, and `role="option"` to each item. Each selected list item will have `aria-selected="true"`. TAB & Up/Down support are implemented.