import { describe, it, expect, afterEach, vi } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import NavIcon from "@/Components/sidebar/Nav-Icons/Nav-Icons";
import "@testing-library/jest-dom/vitest";
import { UserContext } from "@/context/UserContext";
import { HomeIcon } from "@heroicons/react/24/solid";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});
describe("NavIcon testing", () => {
  // Renders a navigation icon with a link.
  it("should render a navigation icon with a link", () => {
    // Arrange
    const href = "/home";
    const children = <HomeIcon />;
    const text = "Home";
    const id = "sidebar_recent_1";

    // Act
    render(
      <BrowserRouter>
        <NavIcon href={href} children={children} text={text} id={id} />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", href);
  });
  // No href provided.
});
