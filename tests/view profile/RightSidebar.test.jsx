import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import RightSidebar from "@/Components/viewprofile/RightSidebar";

afterEach(() => {
  cleanup();
});

describe("RightSidebar component", () => {
  const userInfo = {
    username: "testUser",
    profilePicture: "testImage.jpg",
    banner: "testBanner.jpg",
  };

  it("renders correctly with user info", () => {
    const { getByText } = render(<RightSidebar userInfo={userInfo} />);
    expect(getByText("testUser")).toBeInTheDocument();
  });
});
