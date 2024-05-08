import { describe, it, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Hidden from "@/Components/viewprofile/Hidden";
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

describe("Hidden component", () => {
  beforeEach(() => {
    getRequest.mockResolvedValue({ status: 200, data: [] });
  });

  it("renders Hidden component without crashing", () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <Hidden />
        </MemoryRouter>
      </UserContext.Provider>
    );
  });
});
