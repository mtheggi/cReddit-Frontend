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
import SearchFeed from "@/Components/search/SearchFeed";

import SearchResultsOptions from "@/Components/search/SearchResultsOptions";

const Search = ({ isVisibleLeftSidebar, setIsVisibleLeftSidebar, navbarRef, isSearchInMobile}) => {
  const [sortType, setSortType] = useState(localStorage.getItem('sortType') || 'Relevance');
  const [sortTime, setSortTime] = useState(localStorage.getItem('sortTime') || 'All Time');
  const { isLoggedIn } = useContext(UserContext);
  const mainfeedRef = useRef();
  const searchFeed = useRef();
  const communiyCardRef = useRef();

  const [isSafeSearch, setIsSafeSearch] = useState(() => {
    const saved = localStorage.getItem('isSafeSearch');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  useEffect(() => {
    localStorage.setItem('isSafeSearch', JSON.stringify(isSafeSearch));
  }, [isSafeSearch]);


  const {
    isCommunityOpen,
    setIsCommunityOpen,
    communityButtonRef,
    userHistoryRes,
    sidebarRef,
  } = useContext(SidebarContext);


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
    let timer = null;

    const handleScroll = () => {
      clearTimeout(timer);


      if (!sidebarRef.current.classList.contains("scrolling")) {
        sidebarRef.current.classList.add("scrolling");
      }

      if (!mainfeedRef.current.classList.contains("scrolling")) {
        mainfeedRef.current.classList.add("scrolling");
      }

      timer = setTimeout(function () {
        if (sidebarRef.current.classList.contains("scrolling")) {
          sidebarRef.current.classList.remove("scrolling");
        }
        if (mainfeedRef.current.classList.contains("scrolling")) {
          mainfeedRef.current.classList.remove("scrolling");
        }
      }, 440);
    };

    sidebarRef.current.addEventListener("scroll", handleScroll);
    mainfeedRef.current.addEventListener("scroll", handleScroll);

    return () => {

      if (sidebarRef.current) {
        sidebarRef.current.removeEventListener('scroll', handleScroll);
      }
      if (mainfeedRef.current) {
        mainfeedRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  });
  return (

    <div className={`w-full ${isSearchInMobile?'mt-[108px] ':'mt-14 '} h-full flex min-w-[366px] flex-row overflow-hidden`}>
      <div className={`flex flex-row w-full xl:ml-4  h-full`}>

        <div ref={sidebarRef} className={`h-full ${isVisibleLeftSidebar ? 'fixed left-0 xl:relative xl:flex pl-1 bg-reddit_navbar w-[280px]' : 'hidden xl:flex'} z-20  w-[290px] min-w-[270px] border-r-[1px] border-[#3C4447] pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}>
          <Sidebar setIsCommunityOpen={setIsCommunityOpen} communityButtonRef={communityButtonRef} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} userHistoryRes={userHistoryRes} />
        </div>
        <div className="">
          {isCommunityOpen && <CreateCommunity setIsCommunityOpen={setIsCommunityOpen} communityCardRef={communiyCardRef} />}
        </div>

        <div ref={searchFeed} id="searchfeed" className="flex-col w-full h-full items-center flex overflow-auto scrollbar_mod_mf">
          <div className="flex-col w-fit max-w-[1150px]">
              <SearchResultsOptions sortTime={sortTime} setSortTime={setSortTime} sortType={sortType} setSortType={setSortType} isSafe={isSafeSearch} setIsSafe={setIsSafeSearch}/>

            <div className="flex flex-row w-fit">
              <div className='w-fit px-3 max-w-[1150px] -mt-2 flex flex-row flex-grow lg:flex-grow-0 ' ref={mainfeedRef}>
                <SearchFeed  sortTime={sortTime} sortType={sortType} isSafe={isSafeSearch} />
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Search;
