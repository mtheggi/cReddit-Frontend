import redditLogo from '../../assets/reddit_logo.png';
import { Link } from 'react-router-dom';
import { Bars3Icon, BellIcon, ChatBubbleOvalLeftEllipsisIcon, PlusIcon, } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef, useContext } from 'react';
import avatar from '../../assets/avatar.png';
import Searchbar from '../search/Searchbar';
import Separator from '../sidebar/Nav-Icons/Separator';
import Setting from '../settings/Setting';
import ForgetPass from '../authentication/reset_components/ForgetPass';
import ForgetUsername from '../authentication/reset_components/ForgetUsername';
import LogIn from '../authentication/LogIn';
import SignUp from '../authentication/signup/SignUp';
import SignUpEmail from '../authentication/signup/SignUpEmail';
import EmailVerification from '../authentication/reset_components/EmailVerification';
import { postRequest } from '../../services/Requests';
import { baseUrl, testingUrl } from "../../constants";
import { UserContext } from '@/context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationList from '../notifications/NotificationList'
import { useNotifications } from '../notifications/NotificationContext';
import { NavbarContext } from '@/context/NavbarContext';

import { CurrencyPoundTwoTone } from '@mui/icons-material';
import fcmToken, { generateToken, messaging } from "../../firebase";
import { onMessage } from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast'

/**
 * Navbar component.
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setIsVisibleLeftSidebar - Function to set the visibility of the left sidebar.
 * @param {Object} props.navbarRef - Reference to the navbar element.
 * @returns {JSX.Element} The Navbar component.
 * */
const Navbar = ({ setIsVisibleLeftSidebar, navbarRef, isSearchInMobile, setIsSearchInMobile }) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const { userProfilePicture, setUserProfilePicture } = useContext(UserContext);
    const { isOpenedLoginMenu, setIsOpenedLoginMenu } = useContext(NavbarContext);

    const { user, setUser } = useContext(UserContext);

    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
    const [isOpenedSignupMenu, setIsOpenedSignupMenu] = useState(false);
    const [isOpenedForgotUsername, setIsOpenedForgotUsername] = useState(false);
    const [isOpenedForgotPass, setIsOpenedForgotPass] = useState(false);
    const [isOpenedEmailVerification, setIsOpenedEmailVerification] = useState(false);
    const [isPrevForgotPassOrUsername, setIsPrevForgotPassOrUsername] = useState(null);
    const [isOpenedSecondSignupMenu, setIsOpenedSecondSignupMenu] = useState(false);
    const [signupEmail, setSignupEmail] = useState('');
    const [isOpenBellMenu, setIsOpenBellMenu] = useState(false);
    const [showInboxTooltip, setShowInboxTooltip] = useState(false);
    const [showInboxTextTransition, setShowInboxTextTransition] = useState(false);



    const profileMenuRef = useRef();
    const profileMenuRefExpanded = useRef();
    const loginMenuRef = useRef();
    const loginButtonRef = useRef();
    const signupMenuRef = useRef();
    const secondSignupMenuRef = useRef();
    const signupButtonRef = useRef();
    const forgotPassRef = useRef();
    const forgotUsernameRef = useRef();
    const emailVerificationRef = useRef();
    const bellMenuRef = useRef();
    const bellMenuRefExpanded = useRef();

    const {
        notifications, addNotification, setNotifications
    } = useNotifications();

    const navigate = useNavigate();

    /**
     * Function to handle logout.
     * @async
     * @function handleLogout
     * */
    const handleLogout = async () => {
        const response = await postRequest(`${baseUrl}/user/logout`, {
            fcmToken
        });
        if (response.status == 200 || response.status == 201) {
            setIsLoggedIn(false);
            setIsOpenProfileMenu(false);
            navigate('/');
        }
    }

    useEffect(() => {
        let closeDropdown = (e) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target) && profileMenuRefExpanded.current && !profileMenuRefExpanded.current.contains(e.target)) {
                setIsOpenProfileMenu(false);
            }
            if (loginMenuRef.current && !loginMenuRef.current.contains(e.target) && loginButtonRef.current && !loginButtonRef.current.contains(e.target)) {
                setIsOpenedLoginMenu(false);
            }
            if (signupMenuRef.current && !signupMenuRef.current.contains(e.target) && signupButtonRef.current && !signupButtonRef.current.contains(e.target)) {
                setIsOpenedSignupMenu(false);
            }
            if (forgotPassRef.current && !forgotPassRef.current.contains(e.target)) {
                setIsOpenedForgotPass(false);
            }
            if (forgotPassRef.current && !forgotPassRef.current.contains(e.target)) {
                setIsOpenedForgotPass(false);
            }
            if (forgotUsernameRef.current && !forgotUsernameRef.current.contains(e.target)) {
                setIsOpenedForgotUsername(false);
            }
            if (emailVerificationRef.current && !emailVerificationRef.current.contains(e.target)) {
                setIsOpenedEmailVerification(false);
            }
            if (secondSignupMenuRef.current && !secondSignupMenuRef.current.contains(e.target)) {
                setIsOpenedSecondSignupMenu(false);
            }
            if (bellMenuRef.current && !bellMenuRef.current.contains(e.target) && bellMenuRefExpanded.current && !bellMenuRefExpanded.current.contains(e.target)) {
                setIsOpenBellMenu(false);
            }

        };
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    });
    const location = useLocation();
    const words = ['/submit', '/settings'];

    const urlContainsWord = words.some(word => location.pathname.includes(word));

    /**
     * Function to handle mouse enter event on the bell icon.
     * @function handleMouseEnterBellIcon
     * */
    const handleMouseEnterBellIcon = () => {
        setShowInboxTextTransition(true);

        setTimeout(() => {
            setShowInboxTooltip(true);
        }, 100);
    };

    /**
     * Function to handle mouse leave event on the bell icon.
     * @function handleMouseLeaveBellIcon
     * */
    const handleMouseLeaveBellIcon = () => {
        setShowInboxTooltip(false);

        setTimeout(() => {
            setShowInboxTextTransition(false);
        }, 100);
    };

    useEffect(() => {
        onMessage(messaging, (payload) => {
            toast(payload.notification.title);

            // Get the current date and time
            const now = new Date();
            const date = now.toLocaleDateString('en-US');  // Format the date as MM/DD/YYYY
            const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Format the time as HH:MM:SS AM/PM

            // Generate a unique key using the current date-time to ensure uniqueness
            const uniqueKey = `${date.replace(/\//g, '-')}-${time.replace(/:/g, '-').replace(/ /g, '-')}-${now.getTime()}`;

            const notificationDetails = {
                key: uniqueKey,
                title: payload.notification.title,
                date: date,
                time: time,
                description: payload.notification.body,
                image: avatar,
                isRead: false
            };
            addNotification(notificationDetails);

        });
    }, []);

    const unreadNotificationsCount = notifications.filter(notification => !notification.isRead).length;

    return (
        <div ref={navbarRef} className="flex  z-30 fixed flex-col w-full no-select">
            <Toaster position='top-right' toastOptions={{ style: { marginTop: '50px' } }} />
            <header className='w-full flex flex-col bg-reddit_navbar'>


                <div className="flex flex-row w-full items-center  p-2 ">
                    {!urlContainsWord && (
                        <div className={`ml-2.5 hover:bg-reddit_search_light rounded-full min-w-9 w-9 h-9 flex justify-center items-center ${(location.pathname == "/best/communities" || location.pathname.includes('/mod')) ? "hidden" : "xl:hidden"}`}>
                            <Bars3Icon onClick={() => setIsVisibleLeftSidebar((prev) => !prev)} className="h-8 w-7 text-white cursor-pointer" />
                        </div>
                    )}


                    <div className="flex mr-4 xs:mr-1 relative left-3 xl:left-7 h-full items-center">
                        <Link id='navbar_reddit' className='w-fit h-fit flex mr-2 xs:mr-0 items-center' to="">
                            <img src={redditLogo} alt="Logo" className="w-8  h-8 min-w-8" />

                            <svg className="h-[22px] ml-2 hidden lg:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 514 149" >
                                <g className=' fill-white'>
                                    <path d="m71.62,45.92l-12.01,28.56c-1.51-.76-5.11-1.61-8.51-1.61s-6.81.85-10.12,2.46c-6.53,3.31-11.35,9.93-11.35,19.48v52.3H-.26V45.35h29.04v14.28h.57c6.81-9.08,17.21-15.79,30.74-15.79,4.92,0,9.65.95,11.54,2.08Z"></path>
                                    <path d="m65.84,96.52c0-29.41,20.15-52.68,50.32-52.68,27.33,0,46.91,19.96,46.91,48.05,0,4.92-.47,9.55-1.51,14h-68.48c3.12,10.69,12.39,19.01,26.29,19.01,7.66,0,18.54-2.74,24.4-7.28l9.27,22.32c-8.61,5.86-21.75,8.7-33.29,8.7-32.25,0-53.91-20.81-53.91-52.11Zm26.67-9.36h43.03c0-13.05-8.89-19.96-19.77-19.96-12.3,0-20.62,7.94-23.27,19.96Z"></path>
                                    <path d="m419.53-.37c10.03,0,18.25,8.23,18.25,18.25s-8.23,18.25-18.25,18.25-18.25-8.23-18.25-18.25S409.51-.37,419.53-.37Zm14.94,147.49h-29.89V45.35h29.89v101.77Z"></path>
                                    <path d="m246,1.47l-.09,53.53h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66,0-47.67,23.08-47.67,52.3s17.78,52.4,46.72,52.4c12.11,0,23.55-4.16,30.93-13.62h.85v12.11h28.47V1.47h-29.89Zm1.42,121.39h-.99l-6.67-6.93c-4.34,4.33-10.28,6.93-17.22,6.93-14.64,0-24.88-11.58-24.88-26.6s10.24-26.6,24.88-26.6,24.88,11.58,24.88,26.6v26.6Z"></path>
                                    <path d="m360.15,1.47l-.09,53.53h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66,0-47.67,23.08-47.67,52.3s17.78,52.4,46.72,52.4c12.11,0,23.55-4.16,30.93-13.62h.85v12.11h28.47V1.47h-29.89Zm1.28,121.39h-.99l-6.67-6.93c-4.34,4.33-10.28,6.93-17.22,6.93-14.64,0-24.88-11.58-24.88-26.6s10.24-26.6,24.88-26.6,24.88,11.58,24.88,26.6v26.6Z"></path>
                                    <path d="m492.44,45.35h21.85v25.44h-21.85v76.33h-29.89v-76.33h-21.75v-25.44h21.75v-27.66h29.89v27.66Z"></path>
                                </g>
                            </svg>
                        </Link>
                    </div>

                    <div className="flex xs:flex-grow ml-auto xs:ml-7 xl:ml-11% items-center">

                        <Searchbar isSearchInMobile={isSearchInMobile} />

                        <div className='flex items-center xs:ml-auto  mr-3 xl:mr-4'>
                            {!isLoggedIn && (<div className=' flex items-center w-fit h-full ml-2 xs:ml-0 xl:mr-4'>
                                <div ref={loginButtonRef} onClick={() => setIsOpenedLoginMenu(true)} className=" bg-[#CC3600]  hover:bg-orange-700 rounded-3xl w-17 mr-3 h-[33px] hover:no-underline cursor-pointer items-center justify-center  inline-flex" href="" id="navbar_login_button">
                                    <span className="flex items-center justify-center ">
                                        <span className="flex items-center font-medium text-white text-sm ">Log In</span>
                                    </span>
                                </div>

                                {isOpenedLoginMenu && (
                                    <div className="community-modal flex flex-row items-center justify-center">
                                        <div className='overlay'></div>

                                        <div ref={loginMenuRef} className='z-30 flex flex-col w-100% h-100% msm:w-132 msm:h-160'>
                                            <LogIn setIsOpenedLoginMenu={setIsOpenedLoginMenu} setIsOpenedForgotPass={setIsOpenedForgotPass} setIsOpenedForgotUsername={setIsOpenedForgotUsername} setIsOpenedSignupMenu={setIsOpenedSignupMenu} />
                                        </div>
                                    </div>
                                )}

                                <div ref={signupButtonRef} onClick={() => setIsOpenedSignupMenu(true)} className=" bg-indigo-600 hover:bg-indigo-700 rounded-full w-17 mr-2  h-[33px] hover:no-underline cursor-pointer  items-center justify-center  inline-flex" href="" id="navbar_signup_button">
                                    <span className="flex items-center justify-center">
                                        <span className="flex items-center font-medium text-white text-sm ">Sign Up</span>
                                    </span>
                                </div>

                                {isOpenedSignupMenu && (
                                    <div className="community-modal flex flex-row items-center justify-center">
                                        <div className='overlay'></div>

                                        <div ref={signupMenuRef} className='z-30 flex flex-col w-100% h-100% msm:w-132 msm:h-160'>
                                            <SignUpEmail setIsOpenedSignupMenu={setIsOpenedSignupMenu} setIsOpenedLoginMenu={setIsOpenedLoginMenu} setIsOpenedSecondSignupMenu={setIsOpenedSecondSignupMenu} setNavbarSignupEmail={setSignupEmail} />
                                        </div>
                                    </div>
                                )}

                                {isOpenedForgotPass && (
                                    <div className="community-modal flex flex-row items-center justify-center">
                                        <div className='overlay'></div>
                                        <div className='z-30 flex flex-col w-100% h-100% msm:w-132 msm:h-160'>
                                            <ForgetPass setIsOpenedForgotPass={setIsOpenedForgotPass} setIsOpenedLoginMenu={setIsOpenedLoginMenu} forgotPassRef={forgotPassRef} setIsOpenedEmailVerification={setIsOpenedEmailVerification} setIsPrevForgotPassOrUsername={setIsPrevForgotPassOrUsername} />
                                        </div>
                                    </div>
                                )}


                                {isOpenedForgotUsername && (
                                    <div className="community-modal flex flex-row items-center justify-center">
                                        <div className='overlay'></div>

                                        <div ref={forgotUsernameRef} className='z-30 flex flex-col w-100% h-100% msm:w-132 msm:h-160'>
                                            <ForgetUsername setIsOpenedForgotUsername={setIsOpenedForgotUsername} setIsOpenedLoginMenu={setIsOpenedLoginMenu} setIsOpenedEmailVerification={setIsOpenedEmailVerification} setIsPrevForgotPassOrUsername={setIsPrevForgotPassOrUsername} />
                                        </div>
                                    </div>
                                )}


                                {isOpenedEmailVerification && (
                                    <div className="community-modal flex flex-row items-center justify-center">
                                        <div className='overlay'></div>

                                        <div ref={emailVerificationRef} className='z-30 flex flex-col w-100% h-100% msm:w-132 msm:h-160'>
                                            <EmailVerification setIsOpenedEmailVerification={setIsOpenedEmailVerification} setIsOpenedForgotPass={setIsOpenedForgotPass} setIsOpenedForgotUsername={setIsOpenedForgotUsername} isPrevForgotPassOrUsername={isPrevForgotPassOrUsername} />
                                        </div>
                                    </div>
                                )}


                                {isOpenedSecondSignupMenu && (
                                    <div className="community-modal flex flex-row items-center justify-center">
                                        <div className='overlay'></div>

                                        <div ref={secondSignupMenuRef} className='z-30 flex flex-col w-100% h-100% msm:w-132 msm:h-160'>

                                            <SignUp setIsOpenedSignupMenu={setIsOpenedSignupMenu} setIsOpenedSecondSignupMenu={setIsOpenedSecondSignupMenu} NavbarSignupEmail={signupEmail} />
                                        </div>
                                    </div>
                                )}





                            </div>)

                            }


                            {isLoggedIn &&
                                <>
                                    <div id='search_mobile_icon' onClick={
                                        () => setIsSearchInMobile((prev) => !prev)
                                    } className='mmd:hidden flex flex-row items-center justify-center hover:bg-reddit_search_light w-10 h-9 rounded-full cursor-pointer'>
                                        <svg className='w-5 h-5' rpl="" aria-hidden="true" fill="white" height="16" icon-name="search-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"> <path d="M19.5 18.616 14.985 14.1a8.528 8.528 0 1 0-.884.884l4.515 4.515.884-.884ZM1.301 8.553a7.253 7.253 0 1 1 7.252 7.253 7.261 7.261 0 0 1-7.252-7.253Z"></path></svg>
                                    </div>


                                    <Link id='navbar_chat' to={"/chat"} className="flex justify-center items-center w-fit h-fit">
                                        <div className='hover:bg-reddit_search_light ml-0 xs:ml-0.5 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer '>
                                            <svg rpl="" fill="white" height="20" icon-name="chat-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.61 19.872a10.013 10.013 0 0 0 6.51-4.035A9.999 9.999 0 0 0 12.275.264c-1.28-.3-2.606-.345-3.903-.132a10.05 10.05 0 0 0-8.25 8.311 9.877 9.877 0 0 0 1.202 6.491l-1.24 4.078a.727.727 0 0 0 .178.721.72.72 0 0 0 .72.19l4.17-1.193A9.87 9.87 0 0 0 9.998 20c.54 0 1.079-.043 1.612-.128ZM1.558 18.458l1.118-3.69-.145-.24A8.647 8.647 0 0 1 1.36 8.634a8.778 8.778 0 0 1 7.21-7.27 8.765 8.765 0 0 1 8.916 3.995 8.748 8.748 0 0 1-2.849 12.09 8.763 8.763 0 0 1-3.22 1.188 8.68 8.68 0 0 1-5.862-1.118l-.232-.138-3.764 1.076ZM6.006 9a1.001 1.001 0 0 0-.708 1.707A1 1 0 1 0 6.006 9Zm4.002 0a1.001 1.001 0 0 0-.195 1.981 1 1 0 1 0 .195-1.98Zm4.003 0a1.001 1.001 0 1 0 0 2.003 1.001 1.001 0 0 0 0-2.003Z"></path>
                                            </svg>
                                        </div>
                                    </Link>

                                    <Link id='navbar_create_post' to={"/submit"} className="flex justify-center items-center w-fit h-fit">
                                        <div className='hover:bg-reddit_search_light w-8 xs:w-24 h-10  rounded-full flex justify-center items-center cursor-pointer '>
                                            <PlusIcon className="h-6.5 w-7  text-gray-300" />
                                            <p className=' ml-1 mr-0.5 text-gray-300 hidden xs:block text-sm'>Create </p>
                                        </div>
                                    </Link>


                                    <div className="flex relative justify-center items-center w-fit h-fit">
                                        <div id='navbar_bell' ref={bellMenuRef} className="flex justify-center items-center w-fit h-fit relative"
                                            onClick={(e) => { e.stopPropagation(); setIsOpenBellMenu(prev => !prev); setIsOpenProfileMenu(false); }}
                                            onMouseEnter={handleMouseEnterBellIcon}
                                            onMouseLeave={handleMouseLeaveBellIcon}
                                        >
                                            <div className='hover:bg-reddit_search_light w-10 h-10 xs:ml-1 rounded-full flex justify-center items-center cursor-pointer relative'>
                                                <svg rpl="" fill="white" height="20" icon-name="notification-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 18h1a2 2 0 0 1-4 0h3Zm8-3.792v.673A1.12 1.12 0 0 1 17.883 16H2.117A1.12 1.12 0 0 1 1 14.881v-.673a3.947 3.947 0 0 1 1.738-3.277A2.706 2.706 0 0 0 3.926 8.7V7.087a6.07 6.07 0 0 1 12.138 0l.01 1.613a2.7 2.7 0 0 0 1.189 2.235A3.949 3.949 0 0 1 19 14.208Zm-1.25 0a2.7 2.7 0 0 0-1.188-2.242A3.956 3.956 0 0 1 14.824 8.7V7.088a4.819 4.819 0 1 0-9.638 0v1.615a3.956 3.956 0 0 1-1.738 3.266 2.7 2.7 0 0 0-1.198 2.239v.542h15.5v-.542Z"></path>
                                                </svg>
                                                {unreadNotificationsCount > 0 && (
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: '-6px',
                                                        right: '-6px',
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold',
                                                        padding: '0.25em 0.5em',
                                                        borderRadius: '50%',
                                                        minWidth: '20px',
                                                        height: '20px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                        {unreadNotificationsCount}
                                                    </span>
                                                )}
                                            </div>
                                            {showInboxTextTransition && (
                                                <span
                                                    style={{
                                                        position: 'absolute',
                                                        zIndex: 100,
                                                        bottom: '-35px',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        backgroundColor: '#e0e0e0',
                                                        color: '#333',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        whiteSpace: 'nowrap',
                                                        opacity: showInboxTooltip ? 1 : 0,
                                                        transition: 'opacity 1s linear',
                                                    }}
                                                >
                                                    Open inbox
                                                </span>
                                            )}
                                        </div>

                                        {isOpenBellMenu && (
                                            <NotificationList notifications={notifications} isNewNotificationsPage={false} reference={bellMenuRefExpanded} setIsOpenBellMenu={setIsOpenBellMenu} />
                                        )}
                                    </div>

                                    <div className="flex justify-center items-center w-fit h-fit">
                                        <div id='navbar_profile' ref={profileMenuRef} onClick={(e) => { setIsOpenProfileMenu((prev) => !prev); setIsOpenBellMenu(false); }} className='hover:bg-reddit_search_light w-10 h-10 xs:ml-1.5 rounded-full flex justify-center items-center cursor-pointer '>
                                            <div className='relative w-8 h-8 rounded-full'>
                                                <img src={userProfilePicture} alt="" className="block object-cover w-full h-full rounded-full" />

                                                <div className='w-[10px] h-[10px] absolute left-[24px] bottom-[0px] border-[2px] border-[#0C1416] -mt-[8px] rounded-full bg-[#55BD45]'>
                                                </div>
                                            </div>
                                        </div>

                                        {isOpenProfileMenu && (<div ref={profileMenuRefExpanded} className=' w-62 mr-46 mt-90 h-72 bg-reddit_lightGreen absolute text-white text-sm pt-2.5 space-y-2 rounded-xl font-extralight flex flex-col'>

                                            <a id="profile_view" href={`${testingUrl}/user/${user}/`} className=' w-full mb-2.5 mt-2 pl-6  hover:bg-reddit_hover h-14 flex items-center cursor-pointer'>
                                                <div className='flex flex-row w-full'>

                                                    <div className='  w-9 h-9 rounded-full'>
                                                        <img src={userProfilePicture} alt="" className="block object-cover w-full h-full rounded-full" />
                                                    </div>

                                                    <div className='ml-2.5 text-sm '>
                                                        <p className='text-gray-200'>View Profile</p>
                                                        <p className='text-xs  text-gray-400'>u/{user}</p>
                                                    </div>

                                                </div>
                                            </a>
                                            <Separator />

                                            <a id="profile_modmode" href="M" className='w-full pl-8 hover:bg-reddit_hover h-14 flex items-center cursor-pointer'>
                                                <svg rpl="" fill="currentColor" height="20" icon-name="mod-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 20c-.101 0-.202-.014-.3-.04C8.249 19.554 1 17.277 1 12V3.187A1.122 1.122 0 0 1 1.846 2.1L9.73.108c.177-.044.363-.044.54 0L18.154 2.1A1.122 1.122 0 0 1 19 3.187V12c0 5.277-7.249 7.554-8.7 7.957A1.162 1.162 0 0 1 10 20ZM2.25 3.283V12c0 4.465 6.989 6.531 7.786 6.751.725-.22 7.714-2.286 7.714-6.751V3.283L10 1.33 2.25 3.283Z"></path>
                                                </svg>
                                                <p className='ml-3 no-select mr-10'>Mod Mode</p>
                                                <div className='-mt-7'>
                                                    <Setting toggleButton={true} />
                                                </div>

                                            </a>



                                            <Link onClick={() => setIsOpenProfileMenu(false)} id="profile_settings" to="/settings" className='w-full pl-8  hover:bg-reddit_hover h-14 flex items-center cursor-pointer'>
                                                <svg rpl="" fill="currentColor" height="20" icon-name="settings-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 20c-.401 0-.802-.027-1.2-.079a1.145 1.145 0 0 1-.992-1.137v-1.073a.97.97 0 0 0-.627-.878A.98.98 0 0 0 6.1 17l-.755.753a1.149 1.149 0 0 1-1.521.1 10.16 10.16 0 0 1-1.671-1.671 1.149 1.149 0 0 1 .1-1.523L3 13.906a.97.97 0 0 0 .176-1.069.98.98 0 0 0-.887-.649H1.216A1.145 1.145 0 0 1 .079 11.2a9.1 9.1 0 0 1 0-2.393 1.145 1.145 0 0 1 1.137-.992h1.073a.97.97 0 0 0 .878-.627A.979.979 0 0 0 3 6.1l-.754-.754a1.15 1.15 0 0 1-.1-1.522 10.16 10.16 0 0 1 1.673-1.676 1.155 1.155 0 0 1 1.522.1L6.1 3a.966.966 0 0 0 1.068.176.98.98 0 0 0 .649-.887V1.216A1.145 1.145 0 0 1 8.8.079a9.129 9.129 0 0 1 2.393 0 1.144 1.144 0 0 1 .991 1.137v1.073a.972.972 0 0 0 .628.878A.977.977 0 0 0 13.905 3l.754-.754a1.152 1.152 0 0 1 1.522-.1c.62.49 1.18 1.05 1.671 1.671a1.15 1.15 0 0 1-.1 1.522L17 6.1a.967.967 0 0 0-.176 1.068.98.98 0 0 0 .887.649h1.073a1.145 1.145 0 0 1 1.137.991 9.096 9.096 0 0 1 0 2.392 1.145 1.145 0 0 1-1.137.992h-1.073A1.041 1.041 0 0 0 17 13.905l.753.755a1.149 1.149 0 0 1 .1 1.521c-.49.62-1.05 1.18-1.671 1.671a1.149 1.149 0 0 1-1.522-.1L13.906 17a.97.97 0 0 0-1.069-.176.981.981 0 0 0-.65.887v1.073a1.144 1.144 0 0 1-.99 1.137A9.431 9.431 0 0 1 10 20Zm-.938-1.307a7.638 7.638 0 0 0 1.875 0v-.982a2.292 2.292 0 0 1 3.853-1.6l.693.694a8.796 8.796 0 0 0 1.326-1.326l-.694-.694a2.29 2.29 0 0 1 1.6-3.851h.982a7.746 7.746 0 0 0 0-1.876h-.982a2.213 2.213 0 0 1-2.034-1.4 2.223 2.223 0 0 1 .438-2.451l.694-.693a8.76 8.76 0 0 0-1.327-1.326l-.692.694a2.22 2.22 0 0 1-2.434.445 2.221 2.221 0 0 1-1.419-2.041v-.979a7.638 7.638 0 0 0-1.875 0v.982a2.213 2.213 0 0 1-1.4 2.034 2.23 2.23 0 0 1-2.456-.438l-.693-.694a8.757 8.757 0 0 0-1.326 1.327l.694.692a2.216 2.216 0 0 1 .445 2.434 2.22 2.22 0 0 1-2.041 1.418h-.982a7.746 7.746 0 0 0 0 1.876h.982a2.213 2.213 0 0 1 2.034 1.4 2.223 2.223 0 0 1-.438 2.451l-.694.693c.394.488.838.933 1.326 1.326l.694-.694a2.218 2.218 0 0 1 2.433-.445 2.22 2.22 0 0 1 1.418 2.041v.983ZM10 13.229a3.23 3.23 0 1 1 0-6.458 3.23 3.23 0 0 1 0 6.458Zm0-5.208a1.979 1.979 0 1 0 0 3.958 1.979 1.979 0 0 0 0-3.958Z"></path>
                                                </svg>
                                                <p className='no-select ml-3 mr-14'>Settings</p>
                                            </Link>



                                            <div onClick={handleLogout} id="profile_logout" href="" className='w-full pl-7  hover:bg-reddit_hover h-14 flex items-center cursor-pointer rounded-b-lg'>
                                                <svg rpl="" fill="currentColor" height="20" icon-name="logout-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.991 10.625H1v-1.25h10.991l-1.933-1.933.884-.884 3 3a.624.624 0 0 1 0 .884l-3 3-.884-.884 1.933-1.933ZM15.375 1h-9.75A2.629 2.629 0 0 0 3 3.625v.792h1.25v-.792A1.377 1.377 0 0 1 5.625 2.25h9.75a1.377 1.377 0 0 1 1.375 1.375v12.75a1.377 1.377 0 0 1-1.375 1.375h-9.75a1.377 1.377 0 0 1-1.375-1.375v-.792H3v.792A2.63 2.63 0 0 0 5.625 19h9.75A2.63 2.63 0 0 0 18 16.375V3.625A2.63 2.63 0 0 0 15.375 1Z"></path>
                                                </svg>
                                                <p className='no-select ml-3'>Log Out</p>
                                            </div>
                                        </div>)}
                                    </div>
                                </>
                            }
                        </div>




                    </div>
                </div>

            </header>
            <div className='mt-14 px-4 fixed w-full'>
                <Separator />
            </div>
        </div>
    );
}

export default Navbar;