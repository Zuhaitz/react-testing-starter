import { act, renderHook } from "@testing-library/react";

import { CartProvider } from "../../src/providers/CartProvider";
import { useCart } from "../../src/hooks/useCart";
import { Product } from "../../src/entities";

describe("useCart", () => {
  const product: Product = {
    id: 1,
    name: "Burger",
    price: 10,
    categoryId: 2,
  };

  const wrapper = ({ children }: any) => (
    <CartProvider>{children}</CartProvider>
  );

  it("should initialize hook correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.getItem).not.undefined;
    expect(result.current.addToCart).not.undefined;
    expect(result.current.removeFromCart).not.undefined;
    expect(result.current.getItemCount).not.undefined;
  });

  it("should update item count correctly when a product is added", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.getItemCount()).toBe(0);
    act(() => result.current.addToCart(product));
    expect(result.current.getItemCount()).toBe(1);
  });

  it("should remove a product from cart when item exists", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product));
    expect(result.current.getItemCount()).toBe(1);

    act(() => result.current.removeFromCart(product));
    expect(result.current.getItemCount()).toBe(0);
  });

  it("should get cart item back when product is passed", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(product));
    expect(result.current.getItemCount()).toBe(1);

    const cartItem = result.current.getItem(product);
    expect(cartItem?.product).toBe(product);
    expect(cartItem?.quantity).toBe(1);
  });

  it("should stack same cart item", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const quantity = 3;
    for (let i = 0; i < quantity; i++)
      act(() => result.current.addToCart(product));

    expect(result.current.getItemCount()).toBe(quantity);

    const cartItem = result.current.getItem(product);
    expect(cartItem?.product).toBe(product);
    expect(cartItem?.quantity).toBe(quantity);
  });
});
