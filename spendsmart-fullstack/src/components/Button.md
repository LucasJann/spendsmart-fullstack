# Documentation

## Properties

| Property   | Type                            | Default   | Description                                     |
| ---------- | ------------------------------- | --------- | ----------------------------------------------- |
| id         | string                          | undefined | ----------------------------------------------- |
| type       | "submit" \| "reset" \| "button" | "button"  | Specifies the type of button.                   |
| className  | string                          | undefined | Additional classes for styling the button.      |
| onClick    | () => void                      | undefined | Function called when the button is clicked.     |
| children   | ReactNode                       | undefined | Content to be displayed inside the button.      |
| disabled   | boolean                         | false     | If true, disables the button.                   |
| isSelected | boolean                         | false     | If true, applies selected styles to the button. |

## Events

| Event   | Returns | Description                           |
| ------- | ------- | ------------------------------------- |
| onClick | ------- | Triggered when the button is clicked. |

import React from 'react';
import Button from './Button';

const App = () => {
  return (
    <Button
      id="myButton"
      type="submit"
      className="my-custom-class"
      onClick={() => console.log('Button clicked!')}
      isSelected={true}
      disabled={false}
    >
      Click Me
    </Button>
  );
};

export default App;

## Notes

- The isSelected property, when set to true, will apply additional styles to the button (border-b-2 border-red-500) and also disable the button.