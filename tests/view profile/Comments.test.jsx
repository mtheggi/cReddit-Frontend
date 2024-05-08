import { describe, it, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Comments from "@/Components/viewprofile/Comments";
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

describe("Comments component", () => {
  const userInfo = { username: "testUser" };
  const mockComments = [
    { _id: "1", content: "Comment 1" },
    { _id: "2", content: "Comment 2" },
  ];

  beforeEach(() => {
    getRequest.mockResolvedValue({ status: 200, data: mockComments });
  });

  it("renders Comments component without crashing", () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <Comments userInfo={userInfo} />
        </MemoryRouter>
      </UserContext.Provider>
    );
  });
});
