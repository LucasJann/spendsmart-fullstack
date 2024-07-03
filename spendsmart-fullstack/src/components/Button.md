# Documentation

## Properties

| Property   | Type                            | Default   | Description                                     |
| ---------- | ------------------------------- | --------- | ----------------------------------------------- |
| onClick    | () => void                      | undefined | Function called when the button is clicked.     |
| type       | "submit" \| "reset" \| "button" | "button"  | Specifies the type of button.                   |
| children   | ReactNode                       | undefined | Content to be displayed inside the button.      |
| className  | string                          | undefined | Additional classes for styling the button.      |
| isSelected | boolean                         | false     | If true, applies selected styles to the button. |
| disabled   | boolean                         | false     | If true, disables the button.                   |

## Events

| Event   | Returns | Description                           |
| ------- | ------- | ------------------------------------- |
| onClick | ------- | Triggered when the button is clicked. |
