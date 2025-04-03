import { render, screen } from "@testing-library/react";

import ErrorMessage from "../../src/components/ErrorMessage";
import { FieldError } from "react-hook-form";

describe("ErrorMessage", () => {
  const error: FieldError = {
    type: "pattern",
    ref: { name: "Error" },
    message: "Error 404",
  };

  it("should display error message", () => {
    render(<ErrorMessage error={error} />);

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(new RegExp(`${error.message}`, "i"));
  });
});
