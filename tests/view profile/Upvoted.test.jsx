import { describe, it, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Upvoted from "@/Components/viewprofile/Upvoted";
import { getRequest } from "@/services/Requests";
import { UserContext } from "@/context/UserContext";

const mockUserContextValue = {
  isLoggedIn: true,
};

class IntersectionObserver {
  constructor(callback, options) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserver;

vi.mock("@/services/Requests", () => ({
  getRequest: vi.fn(),
}));

describe("Upvoted component", () => {
  beforeEach(() => {
    getRequest.mockResolvedValue({ status: 200, data: [] });
  });

  it("renders Upvoted component without crashing", () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <Upvoted />
        </MemoryRouter>
      </UserContext.Provider>
    );
  });
});
