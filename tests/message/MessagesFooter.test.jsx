import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MessagesFooter from "@/Components/messages/MessagesFooter";

describe("MessagesFooter Component", () => {
  it("displays footer links correctly", () => {
    const { getByText } = render(<MessagesFooter />);

    const helpLabel = getByText("help");
    const appsAndToolsLabel = getByText("apps & tools");
    const heartLabel = getByText("<3");

    expect(helpLabel).toBeInTheDocument();
    expect(appsAndToolsLabel).toBeInTheDocument();
    expect(heartLabel).toBeInTheDocument();
  });
});
