import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpandableText from "../../src/components/ExpandableText";

describe("ExpandableTextComponent", () => {
  const limit = 255;
  const text = "Short text";
  const longText = "a".repeat(limit + 1);
  const truncated = longText.substring(0, limit) + "...";

  it(`should render full text if shorter than ${limit} characters`, () => {
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it(`should truncate text if longer than ${limit} characters`, () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncated)).toBeInTheDocument();

    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/more/i);
  });

  it("should render full text when Show More button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const btn = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(btn);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/less/i);
  });

  it("should truncate text when Show Less button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const showMoreBtn = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreBtn);

    // Collapse
    const showLessBtn = screen.getByRole("button", { name: /less/i });
    await user.click(showLessBtn);

    expect(screen.getByText(truncated)).toBeInTheDocument();
    expect(showMoreBtn).toBeInTheDocument();
    expect(showMoreBtn).toHaveTextContent(/more/i);
  });
});
