import Sidebar from "../sidebar/Sidebar";

/**
 * Component for the left sidebar.
 * @param {Object} sidebarProps - Props passed to the LeftSidebar component.
 * @param {boolean} sidebarProps.isVisibleLeftSidebar - Flag indicating if the left sidebar is visible.
 * @param {Function} sidebarProps.setIsVisibleLeftSidebar - Function to set the visibility of the left sidebar.
 * @param {Function} sidebarProps.setIsCommunityOpen - Function to set the community open state.
 * @param {Object} sidebarProps.communityButtonRef - Reference to the community button.
 * @param {Object} sidebarProps.userHistoryRes - User history response.
 * @param {Object} sidebarProps.sidebarRef - Reference to the sidebar element.
 * @returns {JSX.Element} JSX element representing the left sidebar component.
 */
const LeftSidebar = ({ sidebarProps }) => {
  const {
    isVisibleLeftSidebar,
    setIsVisibleLeftSidebar,
    setIsCommunityOpen,
    communityButtonRef,
    userHistoryRes,
    sidebarRef,
  } = sidebarProps;

  return (
    <div
      ref={sidebarRef}
      className={`h-full ${
        isVisibleLeftSidebar
          ? "fixed left-0 xl:relative xl:flex pl-1 bg-reddit_navbar w-70"
          : "hidden"
      } z-20 w-66 min-w-60 border-r border-neutral-800 pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}
    >
      <Sidebar
        setIsCommunityOpen={setIsCommunityOpen}
        communityButtonRef={communityButtonRef}
        setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
        userHistoryRes={userHistoryRes}
      />
    </div>
  );
};

export default LeftSidebar;
