import { render, screen } from "@testing-library/react";
import ProductDetailPage from "../../src/pages/ProductDetailPage";
import { QueryClient, QueryClientProvider } from "react-query";

describe("ProductDetailPage", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  vi.mock("react-router-dom", async () => {
    const mod = await vi.importActual("react-router-dom");
    return {
      ...mod,
      useParams: () => ({ id: 1 }),
    };
  });

  it("should", () => {
    render(<ProductDetailPage />, { wrapper });
    screen.debug();
  });
});
