import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginButton from "../../src/components/LoginButton";

import * as auth0 from "@auth0/auth0-react";
vi.mock("@auth0/auth0-react");

describe("LoginButton", () => {
  const loginWithRedirect = vi.fn();
  (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: false,
    isLoading: false,
    loginWithRedirect,
  });

  it("should call loginWithRedirect when login button is pressed", async () => {
    render(<LoginButton />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(loginWithRedirect).toBeCalled();
  });
});
