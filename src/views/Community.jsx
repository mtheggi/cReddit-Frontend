import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Components/sidebar/Sidebar";
import Mainfeed from "../Components/mainfeed/Mainfeed";
import Recent from "../Components/mainfeed/Recent";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import CreateCommunity from "../Components/createCommunity/CreateCommunity";
import { UserContext } from "@/context/UserContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import CommunityFeed from "@/Components/community/CommunityFeed";
import CommunityHeader from "@/Components/community/CommunityHeader";
import CommunityInfo from "@/Components/community/CommunityInfo";
import NSFW from "@/Components/NSFW/NSFW";

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
  const { userInfo } = useContext(UserContext);
  const commInfoRef = useRef();
  const mainfeedRef = useRef();
  const communiyCardRef = useRef();
  const location = useLocation();
  const [showAdultPage, setShowAdultPage] = useState(false);

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
    sidebarRef
  } = useContext(SidebarContext);

  useEffect(() => {
    async function getSubreddit() {
      const response = await getRequest(
        `${baseUrl}/subreddit/${getSubredditName()}`
      );
      setSubreddit(response.data);
      setShowAdultPage(response.data.isNSFW && !userInfo.showAdultContent);
    }
    getSubreddit();

  }, [location.pathname]);

  useEffect(() => {
    async function getHistory() {
      const response = await getRequest(`${baseUrl}/user/history?limit=7`);
      setUserHistoryRes(response);
      if (response.status == 200 || response.status == 201)
        localStorage.setItem("userHistory", JSON.stringify(response.data));
      else localStorage.setItem("userHistory", null);
    }
    getHistory();
  }, []);

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

    if (commInfoRef.current)
      commInfoRef.current.addEventListener("scroll", handleScroll);

    if (sidebarRef.current)
      sidebarRef.current.addEventListener("scroll", handleScroll);

    if (mainfeedRef.current)
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
      className="w-full mt-14 h-full flex flex-row overflow-hidden scrollbar_mod"
    >
      <div
        className={`flex flex-row w-full xl:ml-4 min-w-60 h-full`}
      >
        <div
          ref={sidebarRef}
          className={`h-full ${isVisibleLeftSidebar
            ? "fixed left-0 xl:relative xl:flex pl-1 bg-reddit_navbar w-[280px]"
            : "hidden xl:flex"
            } z-20  w-[290px] min-w-[270px] border-r  border-[#3C4447] pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}
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



        <div className="flex flex-col w-full overflow-auto scrollbar_mod_mf  items-center">

          {showAdultPage ? <div className="w-full flex flex-row justify-center mt-[240px]">
            <NSFW setOver18={setShowAdultPage} />
          </div> : <div
            id={`community_page__content`}
            className="w-fit flex flex-col max-w-[1100px] mx-2" >

            {subreddit && <CommunityHeader {...subreddit} />}

            <div className="w-full flex flex-row">
              <div
                id="community_page__content__mainfeed"
                className="w-fit px-1 flex flex-row flex-grow lg:flex-grow-0  "
                ref={mainfeedRef}
              >
                {subreddit && <CommunityFeed subredditName={subreddit.name} isMember={subreddit.isMember} />}
              </div>

              <div
                id="community_page__content__community_info"
                className="w-fit min-w-fit max-h-200 overflow-auto scrollbar_mod_mf sticky top-2"
                ref={commInfoRef}
              >
                {subreddit && <CommunityInfo {...subreddit} />}
              </div>
            </div>
          </div>}


        </div>
      </div>
    </div>
  );
};

export default Community;
