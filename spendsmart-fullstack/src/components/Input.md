# Documentation

## Properties

| Property   | Type                                                   | Default   | Description                                               |
| ---------- | ------------------------------------------------------ | --------- | ----------------------------------------------------------|
| id         | string                                                 | undefined | The unique identifier for the input element.              |
| type       | string                                                 | undefined | The type of the input element (e.g., text, number, etc.). |
| name       | string                                                 | undefined | The name of the input element.                            |
| onChange   | (e: React.ChangeEvent<HTMLInputElement>) => void       | undefined | Function called when the value of the input changes.      |
| className  | string                                                 | undefined | Additional CSS classes for the input element.             |
| value      | string \| number                                       | undefined | The value of the input element.                           |
| disabled   | boolean                                                | false     | 	If true, disables the input field.                      |
| placeholder| string                                                 | undefined | The placeholder text for the input element.               |

## Events
Event	Returns	Description
| onChange| e: React.ChangeEvent<HTMLInputElement>                    | Triggered when the input value changes.               |


## Usage Example

import React, { useState } from 'react';
import Input from './Input';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Input
      id="myInput"
      type="text"
      name="myInput"
      className="my-custom-class"
      value={inputValue}
      onChange={handleChange}
      placeholder="Enter text"
      disabled={false}
    />
  );
};

export default App;

## Notes
- The onChange property is used to handle changes in the input value.