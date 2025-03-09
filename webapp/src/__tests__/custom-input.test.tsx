import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomInput from "../components/custom-input";

describe("CustomInput Component", () => {
  test("renders correctly and handles input change", () => {
    const handleChange = jest.fn();
    render(
      <CustomInput
        type="text"
        placeholder="Enter text"
        value=""
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalledWith("Hello");
  });
});
