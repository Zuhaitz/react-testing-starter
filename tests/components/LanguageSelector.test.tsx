import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LanguageSelector from "../../src/components/LanguageSelector";
import Providers from "../../src/providers";
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

// Ref: https://github.com/testing-library/user-event/discussions/1087
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("LanguageSelector", () => {
  beforeEach(() => {
    render(<LanguageSelector />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>
          <Providers>{children}</Providers>
        </MemoryRouter>
      ),
    });
  });

  it("should", async () => {
    // screen.debug();
    const user = userEvent.setup();

    const button = screen.getByRole("combobox");
    await user.click(button);

    screen.debug();

    const options = screen.getAllByRole("option");
    console.log(options);
    options.forEach((op) => {
      console.log(op.textContent);
    });
    // const menuItems = screen.getAllByRole("menuitem");
  });
});
