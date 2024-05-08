import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import ViewProfile from "@/Components/viewprofile/ViewProfile";

const mockUserContextValue = {
  isLoggedIn: true,
  username: "testUser",
};

describe("ViewProfile component", () => {
  it("renders ViewProfile component without crashing", () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter initialEntries={["/user/testUser"]}>
          <Routes>
            <Route
              path="/user/:username"
              element={
                <ViewProfile
                  userInfo={mockUserContextValue}
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
