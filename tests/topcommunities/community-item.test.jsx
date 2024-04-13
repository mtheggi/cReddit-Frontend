import CommunityItem from "@/Components/topcommunities/CommunityItem";
import { mount, test } from "vitest";


const mockCommunity = {
  index: 1,
  name: "Test Community",
  icon: "test_icon.png",
  topic: "Test Topic",
  members: 1000,
};

test("CommunityItem renders correctly", () => {
  // Mount the CommunityItem component with mock props
  const wrapper = mount(<CommunityItem {...mockCommunity} />);

  // Assert the index is rendered correctly
  const indexElement = wrapper.find("h6");
  expect(indexElement.text()).toBe(mockCommunity.index.toString());

  // Assert the name is rendered correctly
  const nameElement = wrapper.find("a");
  expect(nameElement.text()).toBe(mockCommunity.name);

  // Assert the topic is rendered correctly
  const topicElement = wrapper.find("h6").at(1);
  expect(topicElement.text()).toBe(mockCommunity.topic);

  // Assert the members count is rendered correctly
  const membersElement = wrapper.find("h6").at(2);
  expect(membersElement.text()).toBe(mockCommunity.members.toString());
});
