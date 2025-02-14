import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("GreetComponent", () => {
  it("should render Hello with the name when name provided", () => {
    render(<Greet name="Zuhaitz" />);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(/zuhaitz/i);
  });

  it("should render login button when name is not provided", () => {
    render(<Greet />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/login/i);
  });
});
