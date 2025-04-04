import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Onboarding from "../../src/components/Onboarding";

describe("Onboarding", () => {
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");

  it("should render tutorial message when the tutorial was not completed", async () => {
    getItemSpy.mockReturnValue("false");
    render(<Onboarding />);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    const btnTutorial = screen.getByRole("button");
    expect(btnTutorial).toHaveTextContent(/tutorial/i);

    const user = userEvent.setup();
    await user.click(btnTutorial);
    expect(btnTutorial).not.toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });

  it("should render welcome message when the tutorial was completed", async () => {
    getItemSpy.mockReturnValue("true");
    render(<Onboarding />);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });
});
