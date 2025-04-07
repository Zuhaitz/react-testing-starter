import { render, screen, waitFor } from "@testing-library/react";

import ProductDetail from "../../src/components/ProductDetail";
import { Product } from "../../src/entities";

describe("ProductDetail", () => {
  const product: Product = {
    id: 1,
    name: "Pizza",
    price: 10,
    categoryId: 1,
  };

  const fetchSpy = vi.spyOn(window, "fetch");
  fetchSpy.mockImplementation(
    vi.fn((input: RequestInfo | URL) => {
      if (input.toString().endsWith("1")) {
        return Promise.resolve({
          json: () => Promise.resolve(product),
        } as Response);
      }
      return Promise.reject(new Error("No item with that id"));
    })
  );

  it("should show product information", async () => {
    render(<ProductDetail productId={product.id} />);
    await waitFor(() => expect(screen.queryByText(/loading/i)).null);

    expect(
      screen.getByText(new RegExp(`${product.name}`, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${product.price}`, "i"))
    ).toBeInTheDocument();
  });

  it("should error when petition is rejected", async () => {
    render(<ProductDetail productId={999} />);
    await waitFor(() => expect(screen.queryByText(/loading/i)).null);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
