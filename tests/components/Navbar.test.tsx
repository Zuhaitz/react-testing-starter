import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Providers from "../../src/providers";
import NavBar from "../../src/components/NavBar";
import * as cartHooks from "../../src/hooks/useCart";
import userEvent from "@testing-library/user-event";

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
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Providers>
          <Routes>
            <Route path="/" element={<NavBar />} />
            <Route path="/products" element={<div>Products Page</div>} />
          </Routes>
        </Providers>
      </MemoryRouter>
    );
  });

  it("should change to another page when link is clicked", async () => {
    const link = screen.getAllByRole("link")[1];
    const user = userEvent.setup();

    await user.click(link);
    expect(screen.getByText(`${link.textContent} Page`)).toBeInTheDocument();
  });

  afterEach(() => vi.clearAllMocks());
});
