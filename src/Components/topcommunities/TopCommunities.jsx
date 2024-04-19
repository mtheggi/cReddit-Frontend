import { useContext } from "react";
import CommunitiesSection from "./CommunitiesSection";
import { SidebarContext } from "@/context/SidebarContext";
import Sidebar from "../sidebar/Sidebar";

/**
 * React component representing a page displaying top communities.
 * @returns {JSX.Element} React component.
 */
const TopCommunities = ({ isVisibleLeftSidebar, setIsVisibleLeftSidebar }) => {
  const { setIsCommunityOpen, communityButtonRef, userHistoryRes, sidebarRef } =
    useContext(SidebarContext);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`h-full ${
          isVisibleLeftSidebar
            ? "fixed left-0 xl:relative xl:flex pl-1 bg-reddit_navbar w-70"
            : "hidden xl:flex"
        } z-20 w-66 min-w-60 border-r border-neutral-800 pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}
      >
        <Sidebar
          setIsCommunityOpen={setIsCommunityOpen}
          communityButtonRef={communityButtonRef}
          setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
          userHistoryRes={userHistoryRes}
        />
      </div>
      <div id="Top-Communities" className="bg-[#0b1416] min-w-[350px]">
        <CommunitiesSection />
      </div>
    </>
  );
};

export default TopCommunities;
