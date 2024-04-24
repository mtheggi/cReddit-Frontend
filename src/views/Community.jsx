import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Components/sidebar/Sidebar";
import Mainfeed from "../Components/mainfeed/Mainfeed";
import Recent from "../Components/mainfeed/Recent";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import CreateCommunity from "../Components/createCommunity/CreateCommunity";
import { UserContext } from "@/context/UserContext";
import { useState, useEffect, useRef, useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import CommunityFeed from "@/Components/community/CommunityFeed";
import CommunityHeader from "@/Components/community/CommunityHeader";
import CommunityInfo from "@/Components/community/CommunityInfo";

function getSubredditName() {
  return window.location.pathname.split("/")[2];
}

/**
 * Community component displays the community page.
 * @component
 * @param {boolean} props.isVisibleLeftSidebar - The visibility of the left sidebar.
 * @param {Function} props.setIsVisibleLeftSidebar - The function to set the visibility of the left sidebar.
 * @param {Object} props.navbarRef - The reference to the navbar element.
 * @returns {JSX.Element} - The rendered Community component.
 * @exports Community
 * @exports default
 */

const Community = ({
  isVisibleLeftSidebar,
  setIsVisibleLeftSidebar,
  navbarRef,
}) => {
  const { isLoggedIn } = useContext(UserContext);
  const commInfoRef = useRef();
  const mainfeedRef = useRef();
  const communiyCardRef = useRef();

  /**
   * The subreddit state.
   * @type {Object}
   * @property {string} name - The name of the subreddit.
   * @property {string} description - The description of the subreddit.
   * @property {string} topic - The topic of the subreddit.
   * @property {Array} rules - The rules of the subreddit.
   * @property {Array} moderators - The moderators of the subreddit.
   * @property {Array} members - The number of members of the subreddit.
   */
  const [subreddit, setSubreddit] = useState(null);

  const {
    isCommunityOpen,
    setIsCommunityOpen,
    communityButtonRef,
    userHistoryRes,
    setUserHistoryRes,
    sidebarRef,
  } = useContext(SidebarContext);

  // Get the subreddit data
  useEffect(() => {
    async function getSubreddit() {
      const response = await getRequest(
        `${baseUrl}/subreddit/${getSubredditName()}`
      );
      setSubreddit(response.data);
    }
    getSubreddit();
  }, [isLoggedIn]);

  useEffect(() => {
    async function getHistory() {
      const response = await getRequest(`${baseUrl}/user/history?limit=7`);
      setUserHistoryRes(response);
      if (response.status == 200 || response.status == 201)
        localStorage.setItem("userHistory", JSON.stringify(response.data));
      else localStorage.setItem("userHistory", null);
    }
    getHistory();
  }, [isLoggedIn]);

  useEffect(() => {
    let handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        navbarRef.current &&
        !navbarRef.current.contains(e.target)
      ) {
        setIsVisibleLeftSidebar(false);
      }
      if (
        communiyCardRef.current &&
        !communiyCardRef.current.contains(e.target) &&
        communityButtonRef.current &&
        !communityButtonRef.current.contains(e.target)
      ) {
        setIsCommunityOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1200px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setIsVisibleLeftSidebar(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    handleResize();

    return () => mediaQuery.removeEventListener("change", handleResize);
  });

  useEffect(() => {
    //Todo: Optimize the code of handling the disappearing of scrolling
    let timer = null;

    const handleScroll = () => {
      clearTimeout(timer);

      if (!commInfoRef.current.classList.contains("scrolling")) {
        commInfoRef.current.classList.add("scrolling");
      }

      if (!sidebarRef.current.classList.contains("scrolling")) {
        sidebarRef.current.classList.add("scrolling");
      }

      if (!mainfeedRef.current.classList.contains("scrolling")) {
        mainfeedRef.current.classList.add("scrolling");
      }

      timer = setTimeout(function () {
        if (commInfoRef.current.classList.contains("scrolling")) {
          commInfoRef.current.classList.remove("scrolling");
        }
        if (sidebarRef.current.classList.contains("scrolling")) {
          sidebarRef.current.classList.remove("scrolling");
        }
        if (mainfeedRef.current.classList.contains("scrolling")) {
          mainfeedRef.current.classList.remove("scrolling");
        }
      }, 440);
    };

    commInfoRef.current.addEventListener("scroll", handleScroll);
    sidebarRef.current.addEventListener("scroll", handleScroll);
    mainfeedRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (commInfoRef.current) {
        commInfoRef.current.removeEventListener("scroll", handleScroll);
      }
      if (sidebarRef.current) {
        sidebarRef.current.removeEventListener("scroll", handleScroll);
      }
      if (mainfeedRef.current) {
        mainfeedRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  });
  return (
    <div
      id="community_page"
      className="w-full mt-14 h-full flex flex-row justify-center overflow-hidden scrollbar_mod"
    >
      <div
        className={`flex flex-row w-fit xl:ml-4 lg:mr-5 min-w-60  xl:mr-2% mxl:mr-4 h-full`}
      >
        <div
          ref={sidebarRef}
          className={`h-full ${
            isVisibleLeftSidebar
              ? "fixed left-0 xl:relative xl:flex pl-1 bg-reddit_navbar w-[280px]"
              : "hidden xl:flex"
          } z-20  w-[290px] min-w-[270px] border-r border-neutral-800 pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}
        >
          <Sidebar
            setIsCommunityOpen={setIsCommunityOpen}
            communityButtonRef={communityButtonRef}
            setIsVisibleLeftSidebar={setIsVisibleLeftSidebar}
            userHistoryRes={userHistoryRes}
          />
        </div>
        <div className="">
          {isCommunityOpen && (
            <CreateCommunity
              setIsCommunityOpen={setIsCommunityOpen}
              communityCardRef={communiyCardRef}
            />
          )}
        </div>
        <div
          id={`community_page__content`}
          className="w-full flex flex-col max-w-6xl overflow-auto scrollbar_mod_mf overflow-x-hidden"
        >
          {subreddit && <CommunityHeader {...subreddit} />}
          <div className="w-full flex flex-row  max-w-5xl">
            <div
              id="community_page__content__mainfeed"
              className="w-fit mxl:px-4 max-w-[900px] mt-2 flex flex-row flex-grow lg:flex-grow-0 xl:ml-0  mx-1 lg:mx-2 "
              ref={mainfeedRef}
            >
              {subreddit && <CommunityFeed subredditName={subreddit.name} />}
            </div>

            <div
              id="community_page__content__community_info"
              className="w-fit min-w-fit max-h-200 overflow-auto scrollbar_mod_mf sticky top-2"
              ref={commInfoRef}
            >
              {subreddit && <CommunityInfo {...subreddit} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
