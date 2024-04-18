import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import CommunityItem from "@/Components/topcommunities/CommunityItem";

afterEach(() => {
  cleanup();
});

describe("CommunityItem component", () => {
  const iconUrl = "https://example.com/icon.png";
  const props = {
    index: 1,
    name: "test_community",
    icon: iconUrl,
    topic: "Test Topic",
    members: 100,
  };

  it("renders correctly with props", () => {
    const { getByText } = render(<CommunityItem {...props} />);

    expect(getByText("r/test_community")).toBeInTheDocument();
    expect(getByText("Test Topic")).toBeInTheDocument();
    expect(getByText("100 members")).toBeInTheDocument();
  });
});
