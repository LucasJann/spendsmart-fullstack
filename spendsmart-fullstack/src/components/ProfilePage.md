## Properties

- This component doesn't acecpt any external properties

## State Variables

Variable     | Type    | Default                    | Description                                       |
image        | boolean | false                      | controls the visibility of the iamge upload forms |
disable      | boolean | true                       | If true, disables input fields and buttons.       |
onConfirm    | boolean | false                      | Toggles to trigger balance confirmation.          |
editBalance  | boolean | false                      | If true, enables editing of the balance field.    |
balance      | string  | ''                         | The user's current balance amount.                |
profileImage | string  | "../images/profilepic.jpg" | The user's current balance amount.                |

## Method

Method               | Description                                               |
valueState           | Formats and updates the balance value based on user input.|
onEdit               | Enables editing of the balance field.                     |
onValueHander        | Submits the updated balance value to the server.          |
imageHandler         | Toggles the image upload form visibility.                 |
onImageSubmitHandler | Handles the submission of a new profile image.            |
cancelEdition        | Cancels the current balance editing session.              |
invertValue          | Inverts the sign of the balance amount.                   |

## Usage Example

import React from 'react';
import Profile from './Profile';

const App = () => {
  return <Profile />;
};

export default App;

## Notes 
- This component displays the user's profile information including profile picture and balance.
- Users can edit their balance amount, upload a new profile picture, and manage their financial information.
- The background image for the profile page is defined inline with CSS styles (backgroundImage property).
