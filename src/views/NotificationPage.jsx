import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/navbar/Navbar';
import Sidebar from '../Components/sidebar/Sidebar';
import Recent from '../Components/mainfeed/Recent';
import CreateCommunity from '../Components/createCommunity/CreateCommunity';
import { useState, useEffect, useRef } from 'react';
import { useNotifications } from '../Components/notifications/NotificationContext';
import NotificationList from '../Components/notifications/NotificationList';


const NotificationPage = ({ isVisibleLeftSidebar, setIsVisibleLeftSidebar, navbarRef }) => {
    const [isCommunityOpen, setIsCommunityOpen] = useState(false);
    const { notifications } = useNotifications();

    const sidebarRef = useRef();
    const recentRef = useRef();
    const notificationsRef = useRef();
    const communiyCardRef = useRef();
    const communityButtonRef = useRef();

    useEffect(() => {
        let handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)
                && navbarRef.current && !navbarRef.current.contains(e.target)) {
                setIsVisibleLeftSidebar(false);
            }
            if (communiyCardRef.current && !communiyCardRef.current.contains(e.target)
            && communityButtonRef.current && !communityButtonRef.current.contains(e.target)) {
             setIsCommunityOpen(false);
        }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1200px)');

        const handleResize = () => {
            if (mediaQuery.matches) {
                setIsVisibleLeftSidebar(false);
            }
        };

        mediaQuery.addEventListener('change', handleResize);
        handleResize();

        return () => mediaQuery.removeEventListener('change', handleResize);
    });

    useEffect(() => { //Todo: Optimize the code of handling the disappearing of scrolling
        let timer = null;

        const handleScroll = () => {
            clearTimeout(timer);

            if (!recentRef.current.classList.contains('scrolling')) {
                recentRef.current.classList.add('scrolling');
            }

            if (!sidebarRef.current.classList.contains('scrolling')) {
                sidebarRef.current.classList.add('scrolling');
            }

            if (!notificationsRef.current.classList.contains('scrolling')) {
              notificationsRef.current.classList.add('scrolling');
            }

            timer = setTimeout(function () {
                if (recentRef.current.classList.contains('scrolling')) {
                    recentRef.current.classList.remove('scrolling');
                }
                if (sidebarRef.current.classList.contains('scrolling')) {
                    sidebarRef.current.classList.remove('scrolling');
                }
                if (notificationsRef.current.classList.contains('scrolling')) {
                  notificationsRef.current.classList.remove('scrolling');
                }
            }, 440);
        };

        recentRef.current.addEventListener('scroll', handleScroll);
        sidebarRef.current.addEventListener('scroll', handleScroll);
        notificationsRef.current.addEventListener('scroll', handleScroll);

        return () => {
            if (recentRef.current) {
                recentRef.current.removeEventListener('scroll', handleScroll);
            }
            if (sidebarRef.current) {
                sidebarRef.current.removeEventListener('scroll', handleScroll);
            }
            if (notificationsRef.current) {
              notificationsRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    });
    return (
        <>

            <div className="w-full mt-14 inline-flex flex-row justify-center overflow-hidden">

                <div className={`relative flex flex-row w-fit lg:mr-5 xl:mr-3% mxl:mr-10 h-full`}>

                    <div ref={sidebarRef} className={`h-full ${isVisibleLeftSidebar ? 'absolute xl:relative xl:flex  bg-reddit_navbar w-70' : 'hidden xl:flex'} z-10 w-60 border-r border-neutral-800 pt-2 mr-2 no-select ml-auto overflow-auto scrollbar_mod overflow-x-hidden`}>
                        <Sidebar setIsCommunityOpen={setIsCommunityOpen} communityButtonRef={communityButtonRef} setIsVisibleLeftSidebar={setIsVisibleLeftSidebar} />
                    </div>
                    <div className="">
                        {isCommunityOpen && <CreateCommunity setIsCommunityOpen={setIsCommunityOpen} communityCardRef={communiyCardRef}  />}
                    </div>

                    <div className='mxl:w-192 mt-2 flex flex-row flex-grow lg:flex-grow-0 xl:ml-0 w-65% xl:w-51% mx-1 lg:mx-2 ' ref={notificationsRef}>
                            <NotificationList notifications={notifications}/>
                    </div>


                    <div className='w-fit h-full overflow-auto overflow-x-hidden scrollbar_mod' ref={recentRef}>
                        <Recent />
                    </div>

                </div>

            </div >
        </>




    );
}

export default NotificationPage;