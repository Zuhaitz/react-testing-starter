import { renderHook, waitFor } from "@testing-library/react";

import ReactQueryProvider from "../../src/providers/ReactQueryProvider";
import useCategories from "../../src/hooks/useCategories";

describe("useCategories", () => {
  const wrapper = ({ children }: any) => (
    <ReactQueryProvider>{children}</ReactQueryProvider>
  );

  it("should fetch the categories", async () => {
    const { result } = renderHook(() => useCategories(), { wrapper });
    // Wait for data to be fetched
    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      onTimeout: (error: Error) => {
        console.error(result.current.error);
        return error;
      },
    });

    expect(result.current.data).not.undefined;
    expect(result.current.data?.length).greaterThan(0);
  });
});
