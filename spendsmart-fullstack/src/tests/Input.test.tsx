import { render, fireEvent } from "@testing-library/react";
import Input from "../components/Input";

describe("Input component", () => {
  it("renders input with correct attributes", () => {
    const { getByPlaceholderText } = render(
      <Input
        id="test-input"
        type="text"
        name="test"
        placeholder="Enter text"
        value="Test Value"
        onChange={() => {}}
      />
    );
    const input = getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "test");
    expect(input).toHaveAttribute("value", "Test Value");
  });

  it("calls onChange handler when input value changes", () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        id="test-input"
        type="text"
        name="test"
        placeholder="Enter text"
        value=""
        onChange={handleChange}
      />
    );
    const input = getByPlaceholderText("Enter text");
    fireEvent.change(input, { target: { value: "New Value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders with custom class name", () => {
    const { getByPlaceholderText } = render(
      <Input
        id="test-input"
        type="text"
        name="test"
        placeholder="Enter text"
        value=""
        onChange={() => {}}
        className="custom-input"
      />
    );
    const input = getByPlaceholderText("Enter text");
    expect(input).toHaveClass("custom-input");
  });

  it("renders input with correct id", () => {
    const { getByDisplayValue } = render(
      <Input
        id="test-input"
        type="text"
        name="test"
        placeholder="Enter text"
        value="Test Value"
        onChange={() => {}}
      />
    );
    const input = getByDisplayValue("Test Value");
    expect(input.id).toBe("test-input");
  });

  it("renders input with correct placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input
        id="test-input"
        type="text"
        name="test"
        placeholder="Enter text"
        value=""
        onChange={() => {}}
      />
    );
    const input = getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });
});
