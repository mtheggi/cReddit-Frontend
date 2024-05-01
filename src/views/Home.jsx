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
import PopularCarousel from "../Components/popular/PopularCarousel";

const Home = ({ isVisibleLeftSidebar, setIsVisibleLeftSidebar, navbarRef }) => {
  const { isLoggedIn } = useContext(UserContext);
  const recentRef = useRef();
  const mainfeedRef = useRef();
  const homefeedRef = useRef();
  const communiyCardRef = useRef();


  const {
    isCommunityOpen,
    setIsCommunityOpen,
    communityButtonRef,
    userHistoryRes,
    setUserHistoryRes,
    sidebarRef,
  } = useContext(SidebarContext);

  const navigate = useLocation();
  const [homeFeedScroll, setHomeFeedScroll] = useState(0);
  const prevPath = useRef(navigate.pathname);


  useEffect(() => {
    if (navigate.pathname.includes("/comments/")) {
      localStorage.setItem('homeFeedScroll', homeFeedScroll);

    }
    else if (prevPath.current.includes("/comments/") && !navigate.pathname.includes("/comments/")) {
      setTimeout(() => {
        homefeedRef.current.scrollTop = localStorage.getItem('homeFeedScroll');
      }, 10);
    }
    prevPath.current = navigate.pathname;
  }, [navigate.pathname]);



  useEffect(() => {
    const mainfeedElement = document.getElementById("homefeed");

    const handleScroll = () => {

      setHomeFeedScroll(mainfeedElement.scrollTop);
    };

    if (mainfeedElement) {
      mainfeedElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainfeedElement) {
        mainfeedElement.removeEventListener("scroll", handleScroll);
      }
    };
  });


  useEffect(() => {
    async function getHistory() {
      const response = await getRequest(`${baseUrl}/user/history?limit=10`);
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
    let timer = null;

    const handleScroll = () => {
      clearTimeout(timer);

      if (!recentRef.current.classList.contains("scrolling")) {
        recentRef.current.classList.add("scrolling");
      }

      if (!sidebarRef.current.classList.contains("scrolling")) {
        sidebarRef.current.classList.add("scrolling");
      }

      if (!mainfeedRef.current.classList.contains("scrolling")) {
        mainfeedRef.current.classList.add("scrolling");
      }

      timer = setTimeout(function () {
        if (recentRef.current.classList.contains("scrolling")) {
          recentRef.current.classList.remove("scrolling");
        }
        if (sidebarRef.current.classList.contains("scrolling")) {
          sidebarRef.current.classList.remove("scrolling");
        }
        if (mainfeedRef.current.classList.contains("scrolling")) {
          mainfeedRef.current.classList.remove("scrolling");
        }
      }, 440);
    };

    recentRef.current.addEventListener("scroll", handleScroll);
    sidebarRef.current.addEventListener("scroll", handleScroll);
    mainfeedRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (recentRef.current) {
        recentRef.current.removeEventListener('scroll', handleScroll);
      }
      if (sidebarRef.current) {
        sidebarRef.current.removeEventListener('scroll', handleScroll);
      }
      if (mainfeedRef.current) {
        mainfeedRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  });
  return (

    <div className="w-full mt-14 h-full flex flex-row overflow-hidden">
      <div className={`flex flex-row w-full xl:ml-4 min-w-60 h-full`}>

        <div ref={sidebarRef} className={`h-full ${isVisibleLeftSidebar ? 'fixed left-0 xl:relative xl:flex pl-1 bg-reddit_navbar w-[280px]' : 'hidden xl:flex'} z-20  w-[290px] min-w-[270px] border-r-[1px] border-[#3C4447] pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}>
          <Sidebar setIsCommunityOpen={setIsCommunityOpen} communityButtonRef={communityButtonRef} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} userHistoryRes={userHistoryRes} />
        </div>
        <div className="">
          {isCommunityOpen && <CreateCommunity setIsCommunityOpen={setIsCommunityOpen} communityCardRef={communiyCardRef} />}
        </div>

        <div ref={homefeedRef} id="homefeed" className="flex-col w-full items-center flex overflow-auto scrollbar_mod_mf">

          {
            location.pathname === "/" &&
            <>
              <div className="flex flex-row w-fit">
                <div className='w-fit  lg:max-w-[820px] mt-2 flex flex-row flex-grow lg:flex-grow-0 mx-2.5  ' ref={mainfeedRef}>
                  <Mainfeed mode={"home"} />
                </div>

                <div
                  className="w-fit min-w-fit scrollbar_mod overflow-auto sticky lg:mr-5  xl:mr-2% top-0 h-[94vh]" ref={recentRef} >
                  <Recent userHistoryRes={userHistoryRes} />
                </div>
              </div>
            </>
          }

{
            location.pathname === "/popular" &&
            <>
              <div className=" w-full px-6 mt-[18px] lg:max-w-[1155px]">
                <PopularCarousel />
              </div>
              <div className="flex flex-row w-fit">
                <div className='w-fit  lg:max-w-[820px] mt-2 flex flex-row flex-grow lg:flex-grow-0 mx-2.5  ' ref={mainfeedRef}>
                  <Mainfeed mode={"popular"}  />
                </div>

                <div
                  className="w-fit min-w-fit scrollbar_mod overflow-auto sticky lg:mr-5  xl:mr-2% top-0 h-[94vh]" ref={recentRef} >
                  <Recent userHistoryRes={userHistoryRes} />
                </div>
              </div>
            </>
          }
{
            location.pathname === "/all" &&
            <>
              <div className="flex flex-row w-fit">
                <div className='w-fit  lg:max-w-[820px] mt-2 flex flex-row flex-grow lg:flex-grow-0 mx-2.5  ' ref={mainfeedRef}>
                  <Mainfeed mode={"all"} />
                </div>

                <div
                  className="w-fit min-w-fit scrollbar_mod overflow-auto sticky lg:mr-5  xl:mr-2% top-0 h-[94vh]" ref={recentRef} >
                  <Recent userHistoryRes={userHistoryRes} />
                </div>
              </div>
            </>
          }

        </div>
      </div>
    </div>

  );
};

export default Home;
