{
  title: 'Flash messages',
  element: 'b-flash-message',
  category: "elements",
  section: "core",
  order: 7
}

# b-flash-message

A flash message (or notification) element with four different levels.

## Usage

``` html
<b-flash-message visible="true" type="info" duration="2000">
    <strong>Hello, World!</strong> Foo Bar
    <button flash-message-dismiss>x</button>
</b-flash-message>
```

Will display an info flash message during 2 secs containing the string "Hello, World! Foo Bar". You can make it dismissable without any JS by adding a `flash-message-dismiss` or `data-flash-message-dismiss` attribute to any link or button inside the dialog content.

## API

### Attributes
- __visible__: controls the display of the message. Valid values are `true` or `false`. By default it is set to `false`.
- __type__: four possible values: `info`, `success`, `warning` and `error`, respectively blue, green, yellow and red. By default this attribute is set to `info`.
-__duration__: Trigger a timeout when the message is displayed (see `show` accessor). Valid value is a number given in milliseconds.

### Methods
- __show()__: displays the flash message. If the attribute `duration` is set to a valid value, the message will be hidden automatically after specified number of milliseconds.
- __close()__: hides the flash message.

### Events
- __b-flash-message-show__: will fire when the flash message is shown.
- __b-flash-message-close__: will fire when the flash message is closed.