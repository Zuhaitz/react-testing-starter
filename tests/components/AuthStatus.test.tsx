import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AuthStatus from "../../src/components/AuthStatus";

import * as auth0 from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

// https://stackoverflow.com/questions/72732768/vue-how-to-mock-auth0-for-testing-with-vitest
describe("AuthStatusComponent", () => {
  const renderWithProvider = (comp: JSX.Element) => {
    return render(comp);
  };

  it("should", async () => {
    const loginWithRedirect = vi.fn();
    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      // user: { name: "John Doe", email: "john@example.com" },
      isAuthenticated: false,
      isLoading: false,
      loginWithRedirect,
    });

    renderWithProvider(<AuthStatus />);

    screen.debug();

    const login = await waitFor(() => {
      return screen.getByRole("button");
    });

    expect(login).toHaveTextContent(/in/i);

    const user = userEvent.setup();
    await user.click(login);

    expect(auth0.useAuth0).toHaveBeenCalled();
    expect(loginWithRedirect).toHaveBeenCalled();

    // await waitFor(() => {
    //   return screen.getByText(/welcome/i);
    // });
  });

  afterEach(() => vi.clearAllMocks());
});
