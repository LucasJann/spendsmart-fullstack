# Documentation

## Properties

| Property | Type   | Default   | Description                          |
| -------- | ------ | --------- | ------------------------------------ |
| src      | string | --------- | The source URL of the image.         |
| alt      | string | --------- | The alternative text for the image.  |

## Usage

```tsx
import Image from './path/to/Image';

const MyComponent = () => (
  <div>
    <Image src="https://example.com/image.jpg" alt="Description of the image" />
  </div>
);
