import { describe, it, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Saved from "@/Components/viewprofile/Saved";
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

describe("Saved component", () => {
  beforeEach(() => {
    getRequest.mockResolvedValue({ status: 200, data: [] });
  });

  it("renders Saved component without crashing", () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <Saved />
        </MemoryRouter>
      </UserContext.Provider>
    );
  });
});
