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
});
