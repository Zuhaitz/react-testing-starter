import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Product } from "../../src/entities";
import { CartProvider } from "../../src/providers/CartProvider";
import QuantitySelector from "../../src/components/QuantitySelector";

describe("QuantitySelectorComponent", () => {
  const product: Product = { id: 1, name: "mop", price: 30, categoryId: 1 };

  const renderWithProvider = (comp: JSX.Element) => {
    render(<CartProvider>{comp}</CartProvider>);
  };

  it("should render quantity display when Add to cart button", () => {
    renderWithProvider(<QuantitySelector product={product} />);

    expect(screen.getByRole("button")).toHaveTextContent(/add/i);
  });

  it("should render quantity display when Add to cart button is clicked", async () => {
    renderWithProvider(<QuantitySelector product={product} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    expect(button).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  it("should change quantity of product when clicking buttons", async () => {
    renderWithProvider(<QuantitySelector product={product} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    const quantity = screen.queryByRole("status");
    expect(quantity).toHaveTextContent("1");

    // Add one unit
    const addBtn = screen.getByRole("button", { name: "+" });
    await user.click(addBtn);
    expect(quantity).toHaveTextContent("2");

    // Remove one unit
    const removeBtn = screen.getByRole("button", { name: "-" });
    await user.click(removeBtn);
    expect(quantity).toHaveTextContent("1");
  });

  it("should render Add to cart button when quantity is 0", async () => {
    renderWithProvider(<QuantitySelector product={product} />);

    // User clicks button
    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    // User clicks again to remove one unit
    const quantity = screen.getByRole("status");
    const addBtn = screen.getByRole("button", { name: "+" });
    const removeBtn = screen.getByRole("button", { name: "-" });
    await user.click(removeBtn);

    // Buttons disappear
    expect(quantity).not.toBeInTheDocument();
    expect(addBtn).not.toBeInTheDocument();
    expect(removeBtn).not.toBeInTheDocument();

    // Add to cart button reappears
    const button = screen.getByRole("button", { name: /add/i });
    expect(button).toBeInTheDocument();
  });
});
