import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";

describe("UserListComponent", () => {
  it("should not render users if user array is empty", () => {
    render(<UserList users={[]} />);

    const list = screen.queryByRole("list");
    expect(list).not.toBeInTheDocument();
  });

  it("should render as many users as in the array", () => {
    const users = [
      { id: 1, name: "Zuhaitz" },
      { id: 2, name: "Maria" },
    ];

    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
