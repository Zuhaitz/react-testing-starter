import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchBox from "../../src/components/SearchBox";

describe("SearchBox", () => {
  it("should call onChange function when user presses enter", async () => {
    var inputValue = "";
    const onChange = vi.fn((v: string) => (inputValue = v));
    render(<SearchBox onChange={onChange} />);

    const searchbar = screen.getByRole("textbox");
    const user = userEvent.setup();

    const value = "Coche";
    await user.type(searchbar, value);
    expect(searchbar).toHaveValue(value);

    await user.keyboard("{Enter}");
    expect(onChange).toBeCalled();
    expect(inputValue).toEqual(value);
  });
});
