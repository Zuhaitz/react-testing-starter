import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AuthStatus from "../../src/components/AuthStatus";

import * as auth0 from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

describe("AuthStatusComponent", () => {
  const renderWithProvider = (comp: JSX.Element) => {
    return render(comp);
  };

  // beforeEach(() => renderWithProvider(<AuthStatus />));

  it("should", async () => {
    const loginWithRedirect = vi.fn();
    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      user: { name: "John Doe", email: "john@example.com" },
      isAuthenticated: true,
      isLoading: false,
      loginWithRedirect,
    });

    renderWithProvider(<AuthStatus />);

    screen.debug();

    // const login = await waitFor(() => {
    //   return screen.getByRole("button");
    // });

    // expect(login).toHaveTextContent(/in/i);

    // const user = userEvent.setup();
    // await user.click(login);

    // await waitFor(() => {
    //   return screen.getByText(/welcome/i);
    // });
  });

  afterEach(() => vi.clearAllMocks());
});
