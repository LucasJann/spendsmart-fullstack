import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/Button'; 

describe('Button component', () => {
  it('renders button with correct text and class', () => {
    const { getByRole } = render(
      <Button type="button" className="btn-primary">
        Click me
      </Button>
    );
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('btn-primary');
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button type="button" onClick={handleClick} className="btn-primary">
        Click me
      </Button>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies selected styles when isSelected is true', () => {
    const { getByRole } = render(
      <Button type="button" isSelected={true} className="btn-primary">
        Selected Button
      </Button>
    );
    const button = getByRole('button');
    expect(button).toHaveClass('btn-primary border-b-2 border-red-500');
    expect(button).toHaveTextContent('Selected Button');
  });

  it('renders as disabled when disabled is true', () => {
    const { getByRole } = render(
      <Button type="button" className="btn-primary" disabled={true}>
        Disabled Button
      </Button>
    );
    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Disabled Button');
  });

  it('renders with correct type attribute', () => {
    const { getByRole } = render(
      <Button type="submit" className="btn-primary">
        Submit Button
      </Button>
    );
    const button = getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
