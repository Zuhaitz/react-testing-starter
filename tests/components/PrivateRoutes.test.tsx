import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import PrivateRoutes from "../../src/components/PrivateRoutes";

import * as auth0 from "@auth0/auth0-react";
vi.mock("@auth0/auth0-react");

describe("PrivateRoutes", () => {
  const renderComponent = (isLoading: boolean, isAuthenticated: boolean) => {
    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isLoading,
      isAuthenticated,
    });

    render(
      <MemoryRouter initialEntries={["/account"]}>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/account" element={<h1>Authenticated!</h1>} />
          </Route>

          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("should render nothing when auth0 is loading", async () => {
    renderComponent(true, false);
    await waitFor(() => expect(screen.queryByText(/authenticated/i)).null);
  });

  it("should redirect to login page", () => {
    renderComponent(false, false);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("should show the private page that's been selected", () => {
    renderComponent(false, true);
    expect(screen.getByText(/authenticated/i)).toBeInTheDocument();
  });
});
