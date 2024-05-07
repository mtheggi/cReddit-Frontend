import { useEffect, useRef, useState } from "react";
import { NoSymbolIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, ShareIcon, BookmarkIcon, EnvelopeIcon, EyeSlashIcon, FlagIcon, UserMinusIcon }
    from "@heroicons/react/24/outline";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import OthersProfile from "@/views/OthersProfile";
import Separator from "../sidebar/Nav-Icons/Separator";
import { NavbarContext } from "@/context/NavbarContext";
import { deleteRequest, postRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import { useNavigate } from "react-router-dom";

/**
 * Renders the FollowIcon component.
 * @component
 * @returns {JSX.Element} The rendered FollowIcon component.
 */

const FollowIcon = () => {
    return (<svg rpl="" aria-hidden="true" className="button-leading-icon" fill="currentColor" height="16" icon-name="join-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.625 9.375H14v1.25h-3.375V14h-1.25v-3.375H6v-1.25h3.375V6h1.25v3.375ZM20 10A10 10 0 1 1 10 0a10.011 10.011 0 0 1 10 10Zm-1.25 0A8.75 8.75 0 1 0 10 18.75 8.76 8.76 0 0 0 18.75 10Z"></path>
    </svg>
    );
}
/**
 * Renders the FollowIcon component.
 * @component
 * @returns {JSX.Element} The rendered UnfollowIcon component.
 */
const UnfollowIcon = () => {

    return (<svg rpl="" aria-hidden="true" className="button-leading-icon" fill="currentColor" height="16" icon-name="leave-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 10.625H6v-1.25h8v1.25ZM20 10a10 10 0 1 0-10 10 10.011 10.011 0 0 0 10-10Zm-1.25 0A8.75 8.75 0 1 1 10 1.25 8.76 8.76 0 0 1 18.75 10Z"></path>
    </svg>);
}


/**
 * Usercard component.
 *
 * This component represents a user card with various information and actions.
 * @component
 * @returns {JSX.Element} The rendered Usercard component.
 */
const Usercard = ({ otherUserInfo, isBlocked, setIsBlocked }) => {
    const { isLoggedIn } = useContext(UserContext);
    const { isOpenedLoginMenu, setIsOpenedLoginMenu } = useContext(NavbarContext)
    const [isFollow, setIsFollow] = useState(false);
    const [isOpenDots, setIsOpenDots] = useState(false);
    const [cakeDate, setCakeDate] = useState(null);
    const openDots = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const cakeDay = new Date(otherUserInfo?.cakeDay).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        setCakeDate(cakeDay);
    }, [otherUserInfo])

    useEffect(() => {
        const isFollowed = isLoggedIn ? otherUserInfo?.isFollowed : false;
        const isBlocked = isLoggedIn ? otherUserInfo?.isBlocked : false;
        setIsFollow(isFollowed);
        setIsBlocked(isBlocked);
    }, [isLoggedIn, otherUserInfo])
    const handleFollow = async (e) => {
        e.stopPropagation();

        if (!isLoggedIn) {
            setIsOpenedLoginMenu(true);
        }
        if (isLoggedIn) {
            setIsFollow((prev) => !prev);
            if (!isFollow) {
                const response = await postRequest(`${baseUrl}/user/follow/${otherUserInfo?.username}`, {});
                if (response.status !== 200) {
                    setIsFollow((prev) => !prev);

                }
            } else {
                const response = await deleteRequest(`${baseUrl}/user/follow/${otherUserInfo?.username}`);
                if (response.status !== 200) {
                    setIsFollow((prev) => !prev);

                }
            }
        }
    }
   

    const handleBlock = async (e) => {
        e.stopPropagation();
        if (!isLoggedIn) {
            setIsOpenedLoginMenu(true);
        }
        if (isLoggedIn) {
            setIsBlocked((prev) => !prev);
            setIsOpenDots(false);
            if (!isBlocked) {
                const response = await postRequest(`${baseUrl}/user/Block/${otherUserInfo?.username}`, {});
                if (response.status !== 200) {
                    setIsBlocked((prev) => !prev);
                    setIsOpenDots(true);
                }
            } else {
                const response = await deleteRequest(`${baseUrl}/user/Block/${otherUserInfo?.username}`);
                if (response.status !== 200) {
                    setIsBlocked((prev) => !prev);

                }
            }
        }
    }
    const handleClickOutside = (event) => {
        if (openDots.current && !openDots.current.contains(event.target)) {
            setIsOpenDots(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (<>
        <div className='bg-reddit_darkRecent hidden lg:flex flex-col h-fit p-0  mb-10 rounded-2xl w-90 xl:w-80 ml-3 mt-9 mr-auto'>
            {!isBlocked &&
                <img src={otherUserInfo?.banner} className="object-cover h-30 rounded-t-2xl " />}

            <div className="hidden lg:flex flex-col h-fit p-4 w-90 xl:w-80">
                <div className="flex flex-row justify-between mb-3">
                    <p className="font-bold text-lg text-white">{otherUserInfo?.displayName}</p>

                    <div className="relative ml-auto">
                        {!isBlocked &&
                            <div id="users-drop-menu-down" data-testid="users-drop-menu-down" className='h-8 w-8 ml-auto text-white rounded-full flex justify-center items-center bg-reddit_search hover:bg-reddit_search_light hover:cursor-pointer'>
                                <EllipsisHorizontalIcon onClick={() => setIsOpenDots((prev) => !prev)} id="user-profile-menu" data-testid="user-profile-menu" className='h-6 w-6 outline-none' />
                            </div>
                        }
                        {isOpenDots &&
                            (
                                <div ref={openDots} data-testid="user-profile-menu-dropped" className='z-10 w-49 h-47 bg-reddit_lightGreen absolute -ml-43 mt-1    text-white text-sm py-2 rounded-xl font-extralight flex flex-col '>

                                    <div className='w-full px-4 py-2 hover:bg-reddit_hover h-12 flex justify-start items-center cursor-pointer'>
                                        <ShareIcon className='h-5 w-5 text-white ' />
                                        <p className='ml-4'>Share</p>
                                    </div>
                                    <div className='w-full px-4 py-2 hover:bg-reddit_hover h-12 flex rounded-b-lg items-center cursor-pointer'>
                                        <EnvelopeIcon className='h-5 w-5 text-white' />
                                        <p className='ml-4'>Send a Message</p>
                                    </div>
                                    <div onClick={handleBlock} className='w-full px-4 py-2 hover:bg-reddit_hover h-12 flex rounded-b-lg items-center cursor-pointer'>
                                        <UserMinusIcon className='h-5 w-5 text-white ' />
                                        <p className='ml-4 '>Block Account</p>
                                    </div>
                                    <div className='w-full px-4 py-2 hover:bg-reddit_hover h-12 flex rounded-b-lg items-center cursor-pointer'>
                                        <FlagIcon className='h-5 w-5 text-white ' />
                                        <p className='ml-4 '>Report Profile</p>
                                    </div>

                                </div>

                            )

                        }
                    </div>


                </div>
                <div className="flex flex-row justify-start text-white">
                    {isBlocked ?

                        <button id="follow-btn-usercard" data-testid="follow-btn-usercard" onClick={(e) => { handleBlock(e) }} className={`flex flex-row px-2 py-2 h-8 justify-between rounded-full text-sm items-center mr-3 bg-reddit_Blocked hover:bg-reddit_Blocked_hover`}>
                            <UserMinusIcon className='h-5 w-5 text-white ' />
                            <p className="ml-2 font-bold" data-testid="follow-btn-text" > UnBlock  </p>
                        </button>
                        : <>
                            <button id="follow-btn-usercard" data-testid="follow-btn-usercard" onClick={(e) => { handleFollow(e); }} className={`flex flex-row px-2 py-2 h-8 justify-between rounded-full text-sm items-center mr-3 ${!isFollow ? `bg-reddit_blue hover:bg-reddit_light_blue` : `bg-black border-1 border-white`}`}>
                                {!isFollow ? <FollowIcon /> : <UnfollowIcon />}
                                <p className="ml-2 font-bold" data-testid="follow-btn-text" >{!isFollow ? "Follow" : "Unfollow "}</p>
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); if (!isLoggedIn) { setIsOpenedLoginMenu(true); return; }; navigate("/chat") }} id="chat-btn-usercard" className="flex flex-row bg-reddit_search hover:bg-reddit_search_light px-3 py-2 h-8 justify-start rounded-full text-sm items-center">
                                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-gray-300" />
                                <p className="ml-2 font-bold">Chat </p>
                            </button>
                        </>}
                </div>

                <div id="others-about" className="text-gray-400 mt-2 mb-3"> {otherUserInfo?.about}</div>

                <Separator />
                <div className="flex flex-row my-4 gap-4">
                    <span className="flex flex-col">
                        <p className="text-sm text-white font-bold">{cakeDate}</p>
                        <p className="text-xs text-gray-500 ">Cake day</p>
                    </span>
                </div>

            </div>
        </div >
    </>);
}

export default Usercard;