import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  const user: User = { id: 1, name: "Zuhaitz" };
  const admin: User = { id: 2, name: "Admin", isAdmin: true };

  it("should render user name", () => {
    render(<UserAccount user={user} />);

    const name = screen.getByText(user.name);
    expect(name).toHaveTextContent(new RegExp(`${user.name}`, "i"));
  });

  it("should not render edit button if user not admin", () => {
    render(<UserAccount user={user} />);

    const editBtn = screen.queryByRole("button");
    expect(editBtn).not.toBeInTheDocument();
  });

  it("should render edit button if user is admin", () => {
    render(<UserAccount user={admin} />);

    const editBtn = screen.getByRole("button");
    expect(editBtn).toHaveTextContent(/edit/i);
  });
});
