import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LeftSidebar from "@/Components/messages/LeftSidebar";
import { UserContext } from "@/context/UserContext";
import { BrowserRouter } from "react-router-dom";

const mockUserContextValue = {
  isLoggedIn: true,
};

describe("LeftSidebar component", () => {
  const sidebarProps = {
    isVisibleLeftSidebar: true,
    setIsVisibleLeftSidebar: () => {},
    setIsCommunityOpen: () => {},
    communityButtonRef: () => {},
    userHistoryRes: [],
    sidebarRef: () => {},
  };

  it("renders correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={mockUserContextValue}>
          <LeftSidebar sidebarProps={sidebarProps} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(getByText("All")).toBeInTheDocument();
  });
});
