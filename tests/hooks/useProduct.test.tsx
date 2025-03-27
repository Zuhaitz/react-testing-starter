import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import useProduct from "../../src/hooks/useProduct";

describe("useProduct", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch product from database with correct id", async () => {
    const productId = 1;
    const { result } = renderHook(() => useProduct(productId), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      onTimeout: (error: Error) => {
        console.error(result.current.error);
        return error;
      },
    });

    expect(result.current.data?.id).toBe(productId);
  });
});
