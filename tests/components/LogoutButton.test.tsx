import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LogoutButton from "../../src/components/LogoutButton";

import * as auth0 from "@auth0/auth0-react";
vi.mock("@auth0/auth0-react");

describe("LogoutButton", () => {
  const logout = vi.fn();
  (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: false,
    isLoading: false,
    logout,
  });

  it("should call logout when button is clicked", async () => {
    render(<LogoutButton />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(logout).toBeCalled();
  });
});
