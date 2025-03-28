import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import ProductDetailPage from "../../src/pages/ProductDetailPage";
import useProduct from "../../src/hooks/useProduct";
import * as rrd from "react-router-dom";

describe("ProductDetailPage", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const useParamsSpy = vi.spyOn(rrd, "useParams");
  vi.mock("react-router-dom", async () => {
    const useParams = vi.fn(() => ({ id: "1" }));
    const mod = await vi.importActual("react-router-dom");
    return {
      ...mod,
      useParams,
    };
  });

  afterEach(() => vi.resetAllMocks());
  afterAll(() => vi.clearAllMocks());

  it("should display product information", async () => {
    render(<ProductDetailPage />, { wrapper });
    const { result } = renderHook(() => useProduct(1), { wrapper });
    expect(useParamsSpy).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText(/\$/));
      expect(result.current.data).not.undefined;
    });

    const { data } = result.current;
    screen.getByText(new RegExp(`${data?.name}`, "i"));
    screen.getByText(`\$${data?.price}`);
  });
});
