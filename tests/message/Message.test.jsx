import { describe, it, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Message from "@/Components/messages/Message";
import { UserContext } from "@/context/UserContext";

const mockUserContextValue = {
  isLoggedIn: true,
  username: "testUser",
};

describe("Message Component", () => {
  it('renders compose component when location path is "compose"', () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter initialEntries={["/message/compose"]}>
          <Routes>
            <Route
              path="/message/compose"
              element={
                <Message
                  sidebarProps={{
                    isVisibleLeftSidebar: true,
                    setIsVisibleLeftSidebar: vi.fn(),
                  }}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );
  });

  it('renders inbox component when location path is "inbox"', () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter initialEntries={["/message/inbox"]}>
          <Routes>
            <Route
              path="/message/inbox"
              element={
                <Message
                  sidebarProps={{
                    isVisibleLeftSidebar: true,
                    setIsVisibleLeftSidebar: vi.fn(),
                  }}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );
  });
});
