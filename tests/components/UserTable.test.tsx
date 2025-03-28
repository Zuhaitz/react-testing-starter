import { render, screen } from "@testing-library/react";

import UserTable from "../../src/components/UserTable";
import { User } from "../../src/entities";

describe("UserTable", () => {
  const users: User[] = [
    { id: 1, name: "Maria", isAdmin: true },
    { id: 2, name: "Jose" },
    { id: 3, name: "Manolo" },
  ];

  it("should not render table if no users provided", () => {
    render(<UserTable users={[]} />);
    screen.getByText(/no users/i);
  });

  it("should render the users correctly when provided", () => {
    render(<UserTable users={users} />);

    const table = screen.getByRole("table");
    expect(table.children).to.have.length(2);

    const headers = screen.getAllByRole("columnheader");
    expect(headers).to.have.length(3);

    const rows = screen.getAllByRole("row");
    expect(rows).to.have.length(users.length + 1);

    users.forEach((user) => {
      screen.getByText(new RegExp(`${user.id}`, "i"));
      screen.getByText(new RegExp(`${user.name}`, "i"));
    });
  });
});
