import { render } from "@testing-library/react";
import OverviewCard from "../../components/OverviewCard";

describe("OverviewCard", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(
      <OverviewCard
        icon={<>icon</>}
        primaryValue={100}
        secondaryValue={1}
        primaryDescription={"primary text"}
        secondaryDescription={"secondary text"}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
