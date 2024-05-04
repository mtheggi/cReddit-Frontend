import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import ProfileHeader from "@/Components/viewprofile/ProfileHeader";

afterEach(() => {
  cleanup();
});

describe("ProfileHeader component", () => {
  const userInfo = {
    username: "testUser",
    profilePicture: "testImage.jpg",
  };

  it("renders overview page correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProfileHeader userInfo={userInfo} />
      </MemoryRouter>
    );
    expect(getByText("Overview")).toBeInTheDocument();
  });

  it("renders submitted page correctly", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/profile/testUser/submitted"]}>
        <ProfileHeader userInfo={userInfo} />
      </MemoryRouter>
    );
    expect(getByText("Posts")).toBeInTheDocument();
  });
});
