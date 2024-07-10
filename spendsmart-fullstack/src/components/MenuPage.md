## Properties

- This component doesn't accept any external properties.

## Methods

| Method | Description |
| buttonOptions | Handles button clicks and navigates to different pages based on the button clicked.|

## Usage Example

import React from 'react';
import Menu from './Menu';

const App = () => {
return <Menu />;
};

export default App;


## Notes

- This component renders a menu with buttons that navigate to different pages when clicked (/profilePage, /finances, /goals).
- The background image for the menu is defined inline with CSS styles (backgroundImage property).