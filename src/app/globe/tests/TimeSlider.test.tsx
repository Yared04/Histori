import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Timeline from "./Timeline";

describe("Timeline", () => {
  it("renders without crashing", () => {
    render(<Timeline />);
  });

  it("updates the year and slider position on slider change", () => {
    const { getByRole } = render(<Timeline />);
    const slider = getByRole("slider");

    fireEvent.change(slider, { target: { value: "50" } });

    // Add your assertions here to check if the year and slider position are updated correctly
  });
});
