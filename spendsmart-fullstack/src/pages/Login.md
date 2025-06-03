# Documentation

## Properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| -------- | ---- | ------- | ----------- |

**Note:** This component does not accept any props.

## State Variables

| State Variable       | Type    | Default | Description                                                          |
| -------------------- | ------- | ------- | -------------------------------------------------------------------- |
| disabled             | boolean | false   | Determines if the submit button is disabled.                         |
| isSelected           | boolean | true    | Toggles between login and register forms.                            |
| name                 | string  | ""      | The user's first name.                                               |
| lastName             | string  | ""      | The user's last name.                                                |
| email                | string  | ""      | The user's email address.                                            |
| password             | string  | ""      | The user's password.                                                 |
| confirmPassword      | string  | ""      | The user's password confirmation.                                    |
| error                | string  | ""      | Error message for form validation.                                   |
| nameError            | boolean | false   | Indicates if there is an error with the name input.                  |
| lastNameError        | boolean | false   | Indicates if there is an error with the last name input.             |
| emailError           | boolean | false   | Indicates if there is an error with the email input.                 |
| passwordError        | boolean | false   | Indicates if there is an error with the password input.              |
| confirmPasswordError | boolean | false   | Indicates if there is an error with the password confirmation input. |

## Methods

| submitHandler        | Handles the form submission, sends data to the server, and processes the response.|
| onSelected           | Toggles between the login and register forms and resets email and password fields.|


## Usage Example

import React from 'react';
import Login from './Login';

const App = () => {
  return <Login />;
};

export default App;

## Notes
- This component switches between login and register forms based on the isSelected state.
- The submitHandler function sends user data to the server and handles errors accordingly.
- The onSelected function toggles between login and register forms, resetting the email and password fields.
