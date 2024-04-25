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
import Usercard from "@/Components/usercard/Usercard";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Loading from "@/Components/Loading/Loading";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { isMuiElement } from "@mui/material";
import NSFW from "@/Components/NSFW/NSFW";

const OthersProfile = ({ isVisibleLeftSidebar, setIsVisibleLeftSidebar, navbarRef }) => {
    const { isLoggedIn, userInfo } = useContext(UserContext);
    const [isOthersProfile, setIsOthersProfile] = useState(true);
    const [ismyProfile, setIsMyProfile] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [otherUserInfo, setOtherUserInfo] = useState(null);
    const [isNSFWAccount, setIsNSFWAccount] = useState(true);

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
        if (userInfo && username === userInfo.username) {
            // if username == user.username , then it should be my profile not others . 
            // to view my profile , i should be loggedin , so user is not null, and username in the route is equal to mine .             
            setIsMyProfile(true);
            setIsOthersProfile(false);
            return;
        }
        if (!(typeof page === 'undefined' || page === 'submitted' || page === 'comments')) {
            setIsOthersProfile(false);
            return;
        }
        const checkValidUsername = async () => {
            setIsProfileLoading(true);
            const response = await getRequest(`${baseUrl}/user/${username}`);


            if (response.status == 200) {
                setOtherUserInfo(response.data);
            } else if (response.status == 401) {
                setIsNSFWAccount(true);
            } else {
                setIsOthersProfile(false);
            }
            setIsProfileLoading(false);
        }

        checkValidUsername();
    }, [location])

    useEffect(() => {

        if (!isOthersProfile) {
            if (ismyProfile) {
                // should navigate to my profile
            } else {
                console.log("invalid route");
                navigate('/404')
            }

        }
    }, [isOthersProfile])

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
                    recentRef.current.removeEventListener('scroll', handleScroll);
                }
                if (sidebarRef.current) {
                    sidebarRef.current.removeEventListener('scroll', handleScroll);
                }
                if (mainfeedRef.current) {
                    mainfeedRef.current.removeEventListener('scroll', handleScroll);
                }
            }
            if (!isProfileLoading && !isNSFWAccount) {
                cleanup();
            }

        };

    }, [isProfileLoading]);
    return (
        <>

            <div className={"w-full mt-14 h-full flex flex-row overflow-hidden " + (isNSFWAccount ? "justify-center items-center" : "")}>
                {isNSFWAccount ? <NSFW /> :
                    <>
                        <div className={`flex flex-row w-full xl:ml-4 lg:mr-5 min-w-60  xl:mr-2% mxl:mr-4 h-full`}>

                            <div ref={sidebarRef} className={`h-full ${isVisibleLeftSidebar ? 'fixed left-0 xl:relative xl:flex pl-1 bg-reddit_navbar w-[280px]' : 'hidden xl:flex'} z-20  w-[290px] min-w-[270px] border-r border-neutral-800 pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}>
                                <Sidebar setIsCommunityOpen={setIsCommunityOpen} communityButtonRef={communityButtonRef} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} userHistoryRes={userHistoryRes} />
                            </div>
                            <div className="">
                                {isCommunityOpen && <CreateCommunity setIsCommunityOpen={setIsCommunityOpen} communityCardRef={communiyCardRef} />}
                            </div>
                            {isProfileLoading ? <Loading /> :
                                <>
                                    <div className="flex-col w-full items-center flex overflow-auto scrollbar_mod_mf">
                                        <div className="flex flex-row w-fit">


                                            <div className='w-fit mxl:px-4 max-w-[900px] mt-2 flex flex-row flex-grow lg:flex-grow-0 xl:ml-0 mx-1 lg:mx-2 ' ref={mainfeedRef}>
                                                <Mainfeed />
                                            </div>

                                            <div
                                                className="w-fit min-w-fit scrollbar_mod overflow-auto sticky top-0 h-[94vh]"
                                                ref={recentRef}
                                            >
                                                {/* <Recent userHistoryRes={userHistoryRes} /> */}
                                                <Usercard />
                                            </div>
                                        </div>
                                    </div>

                                </>
                            }
                        </div>

                    </>}
            </div>
        </>
    );
};

export default OthersProfile;
