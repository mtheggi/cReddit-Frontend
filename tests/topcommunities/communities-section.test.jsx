import { mount } from "vitest";
import CommunitiesSection from "./CommunitiesSection";

test("CommunitiesSection renders correctly", () => {
  // Mount the CommunitiesSection component
  const wrapper = mount(<CommunitiesSection />);

  // Assert the header is rendered
  const header = wrapper.find("header");
  expect(header.exists()).toBe(true);

  // Assert the grid for communities is rendered
  const grid = wrapper.find(".grid");
  expect(grid.exists()).toBe(true);

  // Assert the pagination links are rendered
  const paginationLinks = wrapper.find("a");
  expect(paginationLinks.length).toBeGreaterThan(0);
});
