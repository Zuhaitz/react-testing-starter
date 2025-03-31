import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CancelOrderButton from "../../src/components/CancelOrderButton";

describe("CancelOrderButton", () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    render(<CancelOrderButton />);
    await user.click(screen.getByRole("button"));
  });

  it("should open dialog and close it when cancel button is clicked", async () => {
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    await user.click(screen.getByText(/no/i));
    expect(dialog).not.toBeInTheDocument();
  });

  it("should open dialog and close it when confirm button is clicked", async () => {
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    await user.click(screen.getByText(/yes/i));
    expect(dialog).not.toBeInTheDocument();
  });
});
