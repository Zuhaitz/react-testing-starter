import { render, screen } from "@testing-library/react";

import Providers from "../../src/providers";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { MemoryRouter } from "react-router-dom";
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

describe("OrderStatusSelector", () => {
  const onChange = vi.fn((v) => console.log(v));

  const wrapper = ({ children }: any) => (
    <MemoryRouter initialEntries={["/"]}>
      <Providers>{children}</Providers>;
    </MemoryRouter>
  );

  it("should", async () => {
    render(<OrderStatusSelector onChange={onChange} />, { wrapper });

    const selector = screen.getByRole("combobox");
    const user = userEvent.setup();
    await user.click(selector);
    screen.debug();

    const options = screen.getAllByRole("option");
    expect(options.length);
  });
});
