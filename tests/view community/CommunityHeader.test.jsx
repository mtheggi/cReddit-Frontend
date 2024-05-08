import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CommunityHeader from "@/Components/community/CommunityHeader";

describe("CommunityHeader Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CommunityHeader
          name="Test1"
          icon="/path/to/icon1.png"
          banner="/path/to/banner1.png"
          members={10000}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("r/Test1")).not.toBeNull();
  });

  it("displays the correct community icon", () => {
    render(
      <MemoryRouter>
        <CommunityHeader
          name="Test2"
          icon="/path/to/icon2.png"
          banner="/path/to/banner2.png"
          members={20000}
        />
      </MemoryRouter>
    );
    const icon = screen.getByAltText("Community Icon");
    expect(icon.src).toContain("/path/to/icon2.png");
  });

  it("displays the correct community banner", () => {
    render(
      <MemoryRouter>
        <CommunityHeader
          name="Test3"
          icon="/path/to/icon3.png"
          banner="/path/to/banner3.png"
          members={30000}
        />
      </MemoryRouter>
    );
    const banner = screen.getByAltText("Community Banner");
    expect(banner.src).toContain("/path/to/banner3.png");
  });

  it("displays the correct number of members", () => {
    render(
      <MemoryRouter>
        <CommunityHeader
          name="Test4"
          icon="/path/to/icon4.png"
          banner="/path/to/banner4.png"
          members={40000}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("40000 members")).not.toBeNull();
  });

  it("changes join status when join button is clicked", async () => {
    render(
      <MemoryRouter>
        <CommunityHeader
          name="Test5"
          icon="/path/to/icon5.png"
          banner="/path/to/banner5.png"
          members={50000}
          isJoined={false}
        />
      </MemoryRouter>
    );
    const joinButton = screen.getByText("Join");
    fireEvent.click(joinButton);
    waitFor(() => {
      expect(screen.getByText("Joined")).not.toBeNull();
    });
  });
});
