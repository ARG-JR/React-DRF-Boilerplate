import React from "react";
import { render, screen } from "@testing-library/react";
import EditUserView from "../views/users/EditUserView";

describe("<EditUserView/>", () => {
  it("should render the UserEditView", async () => {
    const loadscreen = render(<EditUserView />);

    const heading = screen.queryAllByText(/EditUserView/i)[0];
    expect(heading).toBeInTheDocument();
  });
});
