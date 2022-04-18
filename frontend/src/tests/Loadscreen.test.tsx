import React from "react";
import { render, screen } from "@testing-library/react";
import Loadscreen from "../components/Loadscreen";

describe("<Loadscreen/>", () => {
  it("should not show the login page for authenticated state", async () => {
    const loadscreen = render(<Loadscreen />)

    const heading = screen.queryAllByText(/Loading/i)[0];
    expect(heading).toBeInTheDocument();
  });

});
