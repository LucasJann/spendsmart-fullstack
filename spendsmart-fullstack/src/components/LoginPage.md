# Documentation

## Properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| -------- | ---- | ------- | ----------- |

**Note:** This component does not accept any props.

## State Variables

| State Variable       | Type    | Default | Description                                                          |
| -------------------- | ------- | ------- | -------------------------------------------------------------------- |
| name                 | string  | ""      | The user's first name.                                               |
| lastName             | string  | ""      | The user's last name.                                                |
| email                | string  | ""      | The user's email address.                                            |
| password             | string  | ""      | The user's password.                                                 |
| confirmPassword      | string  | ""      | The user's password confirmation.                                    |
| error                | string  | ""      | Error message for form validation.                                   |
| isSelected           | boolean | true    | Toggles between login and register forms.                            |
| disabled             | boolean | false   | Determines if the submit button is disabled.                         |
| nameError            | boolean | false   | Indicates if there is an error with the name input.                  |
| lastNameError        | boolean | false   | Indicates if there is an error with the last name input.             |
| emailError           | boolean | false   | Indicates if there is an error with the email input.                 |
| passwordError        | boolean | false   | Indicates if there is an error with the password input.              |
| confirmPasswordError | boolean | false   | Indicates if there is an error with the password confirmation input. |

## Usage

```tsx
import React from 'react';
import LoginPage from './path/to/LoginPage';

const MyApp = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default MyApp;
