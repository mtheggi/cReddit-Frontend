import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Compose from "@/Components/messages/Compose";

afterEach(() => {
  cleanup();
});

describe("Compose Component", () => {
  it("renders compose component", () => {
    const { getByTestId } = render(<Compose />);
    const composeElement = getByTestId("compose");
    expect(composeElement).toBeTruthy();
  });
});
