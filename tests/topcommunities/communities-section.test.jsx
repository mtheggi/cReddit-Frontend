import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import CommunitiesSection from "@/Components/topcommunities/CommunitiesSection";
import { getRequest } from "@/services/Requests";

vi.mock("@/services/Requests", () => ({
  getRequest: vi.fn(),
}));

afterEach(() => {
  cleanup();
});

describe("CommunitiesSection component", () => {
  const topCommunitiesResponse = {
    status: 200,
    data: {
      topCommunities: [
        {
          name: "test_community1",
          icon: "https://example.com/icon1.png",
          topic: "Test Topic 1",
          members: 100,
        },
        {
          name: "test_community2",
          icon: "https://example.com/icon2.png",
          topic: "Test Topic 2",
          members: 200,
        },
      ],
      count: 2,
    },
  };

  beforeEach(() => {
    getRequest.mockResolvedValue(topCommunitiesResponse);
  });

  it("renders CommunitiesSection component without crashing", () => {
    render(<CommunitiesSection />);
  });

  it("fetches top communities from the API and renders them correctly", async () => {
    const { findByText } = render(<CommunitiesSection />);

    await findByText("r/test_community1");
    await findByText("Test Topic 1");
    await findByText("100 members");

    await findByText("r/test_community2");
    await findByText("Test Topic 2");
    await findByText("200 members");
  });
});
