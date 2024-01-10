import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "jane", email: "jane@email.com" },
    { name: "john", email: "john@email.com" },
  ];
  render(<UserList users={users} />);

  return { users }; // to be able to destructure users
} // function to avoid duplication of code from using the same users array and render function in the tests

test("render one row per user", () => {
  // render the component
  renderComponent();

  // find all the rows in the table (alternative ways)

  //render(<UserList users={users} />);
  //screen.logTestingPlaygroundURL(); <-- to open it in testing playground and find a suggestion to select an element

  //render(<UserList users={users} />);
  // const rows = screen.getAllByRole("row"); <-- suggested, but it finds more elements that the ones we need

  // const { container } = render(<UserList users={users} />);
  //eslint-disable-next-line
  //const rows = container.querySelectorAll("tbody tr"); <-- non preferred option

  const rows = within(screen.getByTestId("users")).getAllByRole("row"); // working way, but it needs a change in the original compoment to set the data-testid

  // assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  // render the component
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
