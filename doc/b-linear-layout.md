`b-linear-layout` simplifies flexbox-based layout development and is inspired by Android's [LinearLayout](http://developer.android.com/reference/android/widget/LinearLayout.html).

This element creates a flex container that aligns all its children in a single direction, vertically or horizontally.

## Basic example

``` html
<b-linear-layout vertical>
    <div>Foo</div>
    <div>Bar</div>
    <div>Baz</div>
</b-linear-layout>
```

This will create a container that lays out its children vertically.

Note that you're not forced to use the `b-linear-layout` element ; its stylesheet declares generic CSS classes too, so the above sample could be rewritten like that:

``` html
<div class="layout vertical">
    <div>Foo</div>
    <div>Bar</div>
    <div>Baz</div>
</div>
```

## Expanding children

Children of a `b-linear-layout` can be set to fill available space in the main axis by adding a `expand` attribute to it.

``` html
<b-linear-layout horizontal>
    <div>Foo</div>
    <div expand>Bar</div>
    <div>Baz</div>
</b-linear-layout>
```

You can assign an "importance" value to a child in terms of how much space it should occupy on the screen with the `weight` attribute:


``` html
<b-linear-layout horizontal>
    <div expand>Foo</div>
    <div expand weight="2">Bar</div>
    <div expand>Baz</div>
</b-linear-layout>
```
Here, the "Bar" div will occupy 2 times the space taken by "Foo" and "Baz".

Please note that you'll need to specify a height to a vertical layout in order for `expand` to do something.

## Gravity

You can specify how each children will align itself relative to the cross axis with the `gravity` attribute.

``` html
<b-linear-layout horizontal style="height: 300px;">
    <div expand gravity="top">Foo</div>
    <div expand gravity="center" weight="2">Bar</div>
    <div expand gravity="bottom">Baz</div>
</b-linear-layout>

<b-linear-layout vertical style="height: 550px;">
    <div expand gravity="left">Foo</div>
    <div expand gravity="center" weight="2">Bar</div>
    <div expand gravity="right">Baz</div>
</b-linear-layout>
```

## API

### Attributes
- __horizontal__ / __vertical__: specifies the layout direction.
- __horizontal-reverse__ / __vertical-reverse__: specifies a layout direction with children laid out in reverse order.
- __wrap__ / __wrap-reverse__: specifies that the children can be flowed into multiple lines.

__Cross-axis alignment__:
By default, children stretch to fit the cross-axis. By specifying a cross-axis alignment attribute, children won't stretch anymore and will be positioned accordingly. Attributes that can be used: __align-left__|__align-top__|__align-start__ / __align-center__ / __align-baseline__ / __align-right__|__align-bottom__|__align-end__

__Main-axis justification__:
Attributes that can be used: __justify-left__|__justify-top__|__justify-start__ / __justify-center__ / __justify-around__ / __justify-between__ / __justify-right__|__justify-bottom__|__justify-end__

### Children attributes
- __expand__: specifies that the child should fill available space.
- __weight__: assigns an expansion ratio (1 to 5).
- __gravity__: specifies how each children will align itself relative to the cross axis (left / center / right or top / center / bottom or start / center / end).