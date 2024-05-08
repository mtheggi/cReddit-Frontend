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
import Usercard from "@/Components/othersprofile/Usercard";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Loading from "@/Components/Loading/Loading";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { isMuiElement } from "@mui/material";
import NSFW from "@/Components/NSFW/NSFW";
import MyProfileHead from "@/Components/myprofile/MyProfileHead";
import MyButtonsRow from "@/Components/myprofile/MyButtonsRow";
import MyProfileFeed from "@/Components/myprofile/MyProfileFeed";
import Blocked from "@/Components/othersprofile/Blocked";
import MyUsercard from "@/Components/myprofile/MyUsercard";

const MyProfile = ({
  isVisibleLeftSidebar,
  setIsVisibleLeftSidebar,
  navbarRef,
}) => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const [isOthersProfile, setIsOthersProfile] = useState(true);
  const [ismyProfile, setIsMyProfile] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [otherUserInfo, setOtherUserInfo] = useState(null);
  const [isNSFWAccount, setIsNSFWAccount] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [selectedPage, setSelectedPage] = useState("overview");
  const [isNotFound, setIsNotFound] = useState(false);
  const recentRef = useRef();
  const mainfeedRef = useRef();
  const communiyCardRef = useRef();
  const urlParameters = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isCommunityOpen,
    setIsCommunityOpen,
    communityButtonRef,
    userHistoryRes,
    setUserHistoryRes,
    sidebarRef,
  } = useContext(SidebarContext);

  useEffect(() => {
    const username = urlParameters.username;
    const page = urlParameters.page;
    if (isLoggedIn) {
      if (!(userInfo && username === userInfo.username)) {
        navigate(`/user/${username}`);
      }
    } else {
      navigate(`/user/${username}`);
    }

    if (
      !(
        typeof page === "undefined" ||
        page === "submitted" ||
        page === "comments" ||
        page === "saved" ||
        page === "hidden" ||
        page === "upvoted" ||
        page === "downvoted"
      )
    ) {
      setIsOthersProfile(false);
      return;
    } else {
      if (typeof page === "undefined") {
        setSelectedPage("overview");
      } else {
        setSelectedPage(page);
      }
    }
    const checkValidUsername = async () => {
      setIsProfileLoading(true);
      const response = await getRequest(`${baseUrl}/user/${username}`);
      if (response.status == 200) {
        setOtherUserInfo(response.data);
        setIsBlocked(response.data?.isBlocked);
        setIsNSFWAccount(
          !response.data?.isNSFW && response.data?.showAdultContent
        );
      } else if (response.status == 401) {
        // TODO : check NSFW
        setIsNSFWAccount(true);
      } else {
        setIsNotFound(true);
      }
      setIsProfileLoading(false);
    };

    checkValidUsername();
  }, [location]);

  useEffect(() => {
    if (isNotFound) {
      navigate("/404");
    }
  }, [isNotFound]);

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
    if (!isProfileLoading && !isNSFWAccount) {
      recentRef.current.addEventListener("scroll", handleScroll);
      sidebarRef.current.addEventListener("scroll", handleScroll);
      mainfeedRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      const cleanup = () => {
        if (recentRef.current) {
          recentRef.current.removeEventListener("scroll", handleScroll);
        }
        if (sidebarRef.current) {
          sidebarRef.current.removeEventListener("scroll", handleScroll);
        }
        if (mainfeedRef.current) {
          mainfeedRef.current.removeEventListener("scroll", handleScroll);
        }
      };
      if (!isProfileLoading && !isNSFWAccount) {
        cleanup();
      }
    };
  }, [isProfileLoading]);
  return (
    <>
      <div
        className={
          "w-full mt-14 h-full flex flex-row overflow-hidden " +
          (isNSFWAccount ? "justify-center items-center" : "")
        }
      >
        {isNSFWAccount ? (
          <NSFW setOver18={setIsNSFWAccount} />
        ) : (
          <>
            <div
              className={`flex flex-row w-full xl:ml-4 lg:mr-5 min-w-60  xl:mr-2% mxl:mr-4 h-full`}
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

              <>
                <div className="flex-col w-full items-center flex overflow-auto scrollbar_mod_mf">
                  <div className="flex flex-row w-fit justify-center">
                    <div
                      className="w-full mxl:px-4 2xs:w-[300px] xs:w-[400px] sm:w-[600px] md:w-[600px] lg:w-[550px] xl:w-[45%] 2xl:w-[900px] mt-2 flex flex-col flex-grow lg:flex-grow-0 xl:ml-0 mx-1 lg:mx-2"
                      ref={mainfeedRef}
                    >
                      <MyProfileHead
                        imgSrc={userInfo?.profilePicture}
                        displayName={userInfo?.displayName}
                        userName={userInfo?.username}
                      />
                      <MyButtonsRow
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                        userName={userInfo?.username}
                      />

                      {!isProfileLoading ? (
                        <MyProfileFeed
                          userName={userInfo?.username}
                          selectedPage={selectedPage}
                        />
                      ) : (
                        <Loading />
                      )}
                    </div>

                    <div
                      className="w-fit min-w-fit scrollbar_mod overflow-auto sticky top-0 h-[94vh]"
                      ref={recentRef}
                    >
                      <MyUsercard
                        otherUserInfo={userInfo}
                        isBlocked={isBlocked}
                        setIsBlocked={setIsBlocked}
                      />
                    </div>
                  </div>
                </div>
              </>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyProfile;
