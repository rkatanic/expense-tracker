import { fireEvent, render } from "@testing-library/react";
import Select from "../../components/Select";

describe("Select", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(
      <Select value="option one" onChange={jest.fn()}>
        <option>option one</option>
        <option>option two</option>
      </Select>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should call onChange", (): void => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <Select value="option one" onChange={mockOnChange}>
        <option>option one</option>
        <option>option two</option>
      </Select>
    );
    fireEvent.change(getByTestId("select"), {
      target: { value: "option one" },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
