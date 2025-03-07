import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Providers from "../../src/providers";
import NavBar from "../../src/components/NavBar";
import * as cartHooks from "../../src/hooks/useCart";

// Ref: https://stackoverflow.com/questions/68679993/referenceerror-resizeobserver-is-not-defined
// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("NavBar", () => {
  const useCartSpy = vi.spyOn(cartHooks, "useCart");

  useCartSpy.mockReturnValue({
    getItem: vi.fn(),
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    getItemCount: vi.fn().mockReturnValue(2),
  });

  beforeEach(() => {
    render(<NavBar />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>
          <Providers>{children}</Providers>
        </MemoryRouter>
      ),
    });
  });

  it("should", () => {
    screen.debug();
  });
});
