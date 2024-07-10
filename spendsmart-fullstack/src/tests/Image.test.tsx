import { render } from '@testing-library/react';
import Image from '../components/Image';

describe('Image component', () => {
  it('renders image with correct src and alt attributes', () => {
    const testSrc = 'test-image.jpg';
    const testAlt = 'Test Image';
    const { getByAltText } = render(<Image src={testSrc} alt={testAlt} />);
    const imageElement = getByAltText(testAlt);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', testSrc);
    expect(imageElement).toHaveAttribute('alt', testAlt);
  });

  it('renders image with correct CSS class', () => {
    const testSrc = 'test-image.jpg';
    const testAlt = 'Test Image';
    const { getByAltText } = render(<Image src={testSrc} alt={testAlt} />);
    const imageElement = getByAltText(testAlt);

    expect(imageElement).toHaveClass('rounded-full');
    expect(imageElement).toHaveClass('w-64 h-64 rounded-full');
  });
});
