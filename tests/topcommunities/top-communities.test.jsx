import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import TopCommunities from "@/Components/topcommunities/TopCommunities";
import { getRequest } from "@/services/Requests";

vi.mock("@/services/Requests", () => ({
  getRequest: vi.fn(),
}));

describe("TopCommunities component", () => {
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

  it("renders TopCommunities component without crashing", () => {
    render(<TopCommunities />);
  });

  it("renders CommunitiesSection component inside TopCommunities", async () => {
    const { findAllByText } = render(<TopCommunities />);

    await findAllByText("Best of Reddit");
    await findAllByText("Top Communities");
    await findAllByText("Browse Reddit's largest communities");
  });
});
