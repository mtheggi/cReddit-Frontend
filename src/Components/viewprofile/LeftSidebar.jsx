import { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";

/**
 * Renders the left sidebar component.
 * @module LeftSidebar
 * @param {Object} props - The component props.
 * @param {Object} props.sidebarProps - Properties related to the sidebar.
 * @param {boolean} props.sidebarProps.isVisibleLeftSidebar - Indicates whether the left sidebar is visible.
 * @param {Function} props.sidebarProps.setIsVisibleLeftSidebar - Function to set the visibility of the left sidebar.
 * @param {Function} props.sidebarProps.setIsCommunityOpen - Function to set the visibility of the community.
 * @param {Object} props.sidebarProps.communityButtonRef - Reference to the community button.
 * @param {Object} props.sidebarProps.userHistoryRes - User history response.
 * @param {Object} props.sidebarProps.sidebarRef - Reference to the sidebar.
 * @returns {JSX.Element} A React component representing the left sidebar.
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

  /**
   * State to indicate whether the screen is considered large.
   * @type {[boolean, Function]}
   */
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  /**
   * Function to check the screen width and update the state.
   * @returns {void}
   */
  const checkScreenWidth = () => {
    setIsLargeScreen(window.innerWidth > 1200);
  };

  /**
   * useEffect hook to set the visibility of the left sidebar to false when the component mounts.
   */
  useEffect(() => {
    setIsVisibleLeftSidebar(false);
  }, []);

  /**
   * useEffect hook to check the screen width and add event listener for resize events to handle responsive behavior.
   * Removes the event listener when the component unmounts.
   */
  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return (
    <div id="left-sidebar">
      {isLargeScreen && (
        <div className="">
          <div
            ref={sidebarRef}
            className={`h-full left-0 xl:relative xl:flex pl-1 bg-reddit_navbar w-70 z-20 min-w-60 border-r border-neutral-800 pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}
          >
            <Sidebar
              setIsCommunityOpen={setIsCommunityOpen}
              communityButtonRef={communityButtonRef}
              setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
              userHistoryRes={userHistoryRes}
            />
          </div>
        </div>
      )}

      {!isLargeScreen && (
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
      )}
    </div>
  );
};

export default LeftSidebar;
