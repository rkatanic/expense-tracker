import { fireEvent, render, waitFor } from "@testing-library/react";
import Input from "../../components/Input";

describe("Input", (): void => {
  it("should render", () => {
    const { baseElement } = render(
      <Input placeholder="Input" value="value" onChange={jest.fn()} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should call onChange handler", (): void => {
    const mockOnChange = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Input placeholder="Input" value="value" onChange={mockOnChange} />
    );

    fireEvent.change(getByPlaceholderText("Input"), {
      target: { value: "new value" },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    waitFor(() => {
      expect(getByText("new value")).toBeInTheDocument();
    });
  });
});
