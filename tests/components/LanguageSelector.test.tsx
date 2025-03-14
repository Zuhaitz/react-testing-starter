import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Providers from "../../src/providers";
import LanguageSelector from "../../src/components/LanguageSelector";

import * as languageHook from "../../src/hooks/useLanguage";

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
  // Ref: https://www.thisdot.co/blog/how-to-test-react-custom-hooks-and-components-with-vitest
  const useLanguageSpy = vi.spyOn(languageHook, "default");
  const changeLanguage = vi.fn();

  useLanguageSpy.mockReturnValue({
    currentLanguage: "en",
    changeLanguage,
    getLabel: vi.fn(),
  });

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
    const buttonEN = screen.getByRole("combobox");
    expect(buttonEN).toHaveTextContent(/en/i);

    const user = userEvent.setup();
    await user.click(buttonEN);

    const options = screen.getAllByRole("option");
    await user.click(options[1]);

    const buttonES = screen.getByRole("combobox");
    expect(buttonES).toHaveTextContent(/es/i);

    expect(changeLanguage).toHaveBeenCalled();
  });
});
