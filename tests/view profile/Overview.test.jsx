import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Overview from "@/Components/viewprofile/Overview";

describe("Overview component", () => {
  it("renders correctly", () => {
    const { getByAltText, getByText } = render(<Overview />);

    const snooImage = getByAltText("Image of a wondering Snoo");
    expect(snooImage).toBeInTheDocument();
    expect(snooImage).toHaveAttribute(
      "src",
      "https://www.redditstatic.com/shreddit/assets/hmm-snoo.png"
    );
    expect(snooImage).toHaveAttribute("width", "60");
    expect(snooImage).toHaveAttribute("loading", "lazy");

    const welcomeMessage = getByText(
      "Welcome to Your Profile Page, Have a walk!"
    );
    expect(welcomeMessage).toBeInTheDocument();
  });
});
