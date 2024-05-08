import { describe, it, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Submitted from "@/Components/viewprofile/Submitted";
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

describe("Submitted component", () => {
  const userInfo = { username: "testUser" };
  const mockPosts = [
    { _id: "1", title: "Post 1", content: "Content 1" },
    { _id: "2", title: "Post 2", content: "Content 2" },
  ];

  beforeEach(() => {
    getRequest.mockResolvedValue({ status: 200, data: mockPosts });
  });

  it("renders Submitted component without crashing", () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <Submitted userInfo={userInfo} />
        </MemoryRouter>
      </UserContext.Provider>
    );
  });
});
