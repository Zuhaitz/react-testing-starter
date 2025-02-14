import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TermsAndConditions from "../../src/components/TermsAndConditions";

describe("TermsAndConditionsComponent", () => {
  it("should render with correct text and initial state", () => {
    render(<TermsAndConditions />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    // In the same test just to not repeat
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    // Name maybe changed in the future, so no testing that
    // expect(btn).toHaveTextContent(/submit/i);
    expect(btn).toBeDisabled();
  });

  it("should enable the button when checkbox is checked", async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    const user = userEvent.setup();
    await user.click(checkbox);

    expect(screen.getByRole("button")).toBeEnabled();
  });
});
