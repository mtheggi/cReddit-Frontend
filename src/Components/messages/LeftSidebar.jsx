import Sidebar from "../sidebar/Sidebar";

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
