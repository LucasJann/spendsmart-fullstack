# Documentation

## Properties

| Property   | Type                                                   | Default   | Description                                      |
| ---------- | ------------------------------------------------------ | --------- | ------------------------------------------------ |
| id         | string                                                 | --------- | The unique identifier for the input element.     |
| type       | string                                                 | --------- | The type of the input element (e.g., text, number, etc.). |
| name       | string                                                 | --------- | The name of the input element.                   |
| placeholder| string                                                 | --------- | The placeholder text for the input element.      |
| value      | string \| number                                       | --------- | The value of the input element.                  |
| onChange   | (e: React.ChangeEvent<HTMLInputElement>) => void       | --------- | Function called when the value of the input changes. |
| className  | string                                                 | undefined | Additional CSS classes for the input element.    |

## Usage

```tsx
import React, { useState } from 'react';
import Input from './path/to/Input';

const MyComponent = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Input
        id="my-input"
        type="text"
        name="myInput"
        placeholder="Enter text"
        value={value}
        onChange={handleChange}
        className="my-custom-class"
      />
    </div>
  );
};
