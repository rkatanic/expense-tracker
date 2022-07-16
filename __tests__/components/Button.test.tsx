import { fireEvent, render } from "@testing-library/react";
import Button from "../../components/Button";

describe("Button", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(
      <Button text="button" onClick={jest.fn()} fullWidth />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should call onClick handler", (): void => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button text="button" onClick={mockOnClick} />
    );

    fireEvent.click(getByText("button"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick handler when disabled", (): void => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button disabled={true} text="button" onClick={mockOnClick} />
    );

    const element = getByText("button");
    fireEvent.click(element);

    expect(element.getAttribute("disabled")).toBe("");
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
