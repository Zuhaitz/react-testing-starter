import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { fetchCategories } from "../../src/store/categorySlice";

import CategoryList from "../../src/components/CategoryList";
import Providers from "../../src/providers";

describe("CategoryList", () => {
  const wrapper = ({ children }: any) => (
    <MemoryRouter initialEntries={["/"]}>
      <Providers>{children}</Providers>
    </MemoryRouter>
  );

  const { result } = renderHook(
    () => {
      const dispatch = useAppDispatch();
      useEffect(() => {
        dispatch(fetchCategories());
      }, [dispatch]);

      return useAppSelector((state) => state.category.list);
    },
    {
      wrapper,
    }
  );

  it("should render all categories on list", async () => {
    render(<CategoryList />, { wrapper });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(result.current).not.empty;
    });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).have.length(result.current.length);

    result.current.forEach((category) => {
      const elem = screen.getByText(new RegExp(`${category.name}`, "i"));
      expect(elem).toBeInTheDocument();
    });
  });
});
