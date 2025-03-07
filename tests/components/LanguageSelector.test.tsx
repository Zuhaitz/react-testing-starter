import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LanguageSelector from "../../src/components/LanguageSelector";
import Providers from "../../src/providers";

// Ref: https://stackoverflow.com/questions/68679993/referenceerror-resizeobserver-is-not-defined
// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

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

  it("should", () => {
    screen.debug();
  });
});
