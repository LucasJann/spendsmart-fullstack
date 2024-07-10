# Documentation

## Properties

| Property | Type       | Default   | Description                                |
| -------- | ---------- | --------- | ------------------------------------------ |
| src      | string     | --------- | The source URL of the image.               |
| alt      | string     | --------- | The alternative text for the image.        |
| onClick  | () => void | undefined | Function called when the image is clicked. |

| Event    | Returns    |   Description                              |
| -------- | ---------- | ------------------------------------------ |

## Usage Example

import React from 'react';
import Image from './Image';

const App = () => {
  const handleClick = () => {
    console.log('Image clicked!');
  };

  return (
    <Image
      src="https://example.com/image.jpg"
      alt="Example image"
      onClick={handleClick}
    />
  );
};

export default App;

## Notes
- The onClick property is used to handle click events on the image.
