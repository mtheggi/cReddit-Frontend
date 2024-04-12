import { mount } from "vitest";
import TopCommunities from "../../src/Components/topcommunities/TopCommunities";

test("TopCommunities renders Navbar and CommunitiesSection", () => {
  // Mount the TopCommunities component
  const wrapper = mount(<TopCommunities />);

  // Assert Navbar is rendered
  const navbar = wrapper.find(Navbar);
  expect(navbar.exists()).toBe(true);

  // Assert CommunitiesSection is rendered
  const communitiesSection = wrapper.find(CommunitiesSection);
  expect(communitiesSection.exists()).toBe(true);
});
