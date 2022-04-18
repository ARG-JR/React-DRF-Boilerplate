import React from "react";
import { render, screen } from "@testing-library/react";
import UserDetailView from "../views/users/UserDetailView";

describe("<UserDetailView/>", () => {
  it("should render the UserDetailView", async () => {
    render(<UserDetailView />);

    const heading = screen.queryAllByText(/UserDetailView/i)[0];
    expect(heading).toBeInTheDocument();
  });
});
