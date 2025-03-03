import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as auth0 from "@auth0/auth0-react";

import AuthStatus from "../../src/components/AuthStatus";

vi.mock("@auth0/auth0-react");

type ReturnValues = {
  user?: {
    name: string;
    email: string;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithRedirect?: any;
  logout?: any;
};

// https://stackoverflow.com/questions/72732768/vue-how-to-mock-auth0-for-testing-with-vitest
describe("AuthStatusComponent", () => {
  const renderComponent = (returnValues: ReturnValues) => {
    (auth0 as any).useAuth0 = vi.fn().mockReturnValue(returnValues);
    render(<AuthStatus />);
  };

  it("should render login button and redirect when clicked", async () => {
    const loginWithRedirect = vi.fn();
    renderComponent({
      isAuthenticated: false,
      isLoading: false,
      loginWithRedirect,
    });

    const login = screen.getByRole("button");

    expect(login).toHaveTextContent(/in/i);
    const user = userEvent.setup();
    await user.click(login);

    expect(auth0.useAuth0).toHaveBeenCalled();
    expect(loginWithRedirect).toHaveBeenCalled();
  });

  it("should display something when loading", () => {
    renderComponent({
      isAuthenticated: false,
      isLoading: true,
    });

    screen.getByText(/loading/i);
  });

  it("should render log out button and user name when logged in", () => {
    renderComponent({
      user: { name: "John Doe", email: "john@example.com" },
      isAuthenticated: true,
      isLoading: false,
    });

    expect(screen.getByRole("button")).toHaveTextContent(/out/i);
    screen.getByText("John Doe");
  });

  it("should", () => {
    const logout = vi.fn();
    renderComponent({
      user: { name: "John Doe", email: "john@example.com" },
      isAuthenticated: true,
      isLoading: false,
      logout,
    });

    const logoutButton = screen.getByRole("button");
    const user = userEvent.setup();
    user.click(logoutButton);

    expect(auth0.useAuth0).toHaveBeenCalled();
    // expect(logout).toHaveBeenCalled();
  });

  afterEach(() => vi.clearAllMocks());
});
