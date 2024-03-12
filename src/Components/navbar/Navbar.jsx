import redditLogo from '../../assets/reddit_logo.png';
import { Bars3Icon, BellIcon, ChatBubbleOvalLeftEllipsisIcon, CursorArrowRippleIcon, PlusIcon, } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react';
import avatar from '../../assets/avatar.png';
import Searchbar from '../searchbar/Searchbar';
import Separator from '../sidebar/Nav-Icons/Separator';


//Todo integrate the menu icon with the side bar




const Navbar = ({ setIsVisibleLeftSidebar, navbarRef }) => {
    return (
        <div ref={navbarRef} className="flex z-20 fixed flex-col w-full no-select">

            <header className="flex w-full bg-reddit_navbar p-2 items-center">
                <div className='ml-2.5 hover:bg-reddit_search_light rounded-full min-w-9 w-9 h-9 flex xl:hidden justify-center items-center'>
                    <Bars3Icon onClick={() => setIsVisibleLeftSidebar((prev) => !prev)} className="h-8 w-7 text-white cursor-pointer" />
                </div>


                <div className="flex mr-4 xs:mr-1 relative left-3 xl:left-7 h-full items-center">
                    <a id='navbar_reddit' className='w-fit h-fit flex items-center' href="">
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
                    </a>
                </div>

        <div className="flex xs:flex-grow ml-auto xs:ml-7 xl:ml-11% items-center">
          <Searchbar />

                    <div className='flex items-center xs:ml-auto  mr-3 xl:mr-4'>

                        {/* <div className='hidden hover:bg-reddit_search_light w-10 h-10 ml-2 rounded-full justify-center items-center cursor-pointer xl:inline-flex'>
                            <CursorArrowRippleIcon className="h-7 w-6 text-gray-300" />
                        </div> */}

                        <a id='navbar_chat' href='' className="flex justify-center items-center w-fit h-fit">
                            <div className='hover:bg-reddit_search_light ml-0.5 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer '>
                                <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-7 text-gray-300" />
                            </div>
                        </a>

                        <a id='navbar_create_post'  href='' className="flex justify-center items-center w-fit h-fit">
                            <div className='hover:bg-reddit_search_light w-8 xs:w-24 h-10  rounded-full flex justify-center items-center cursor-pointer '>
                                <PlusIcon className="h-6.5 w-7  text-gray-300" />
                                <p className=' ml-1 mr-0.5 text-gray-300 hidden xs:block text-sm'>Create </p>
                            </div>
                        </a>

                        <a id='navbar_bell' href='' className="flex justify-center items-center w-fit h-fit">
                            <div className='hover:bg-reddit_search_light w-10 h-10 xs:ml-1 rounded-full flex justify-center items-center cursor-pointer '>
                                <BellIcon className="h-7 w-6 text-gray-300" />
                            </div>
                        </a>

                        <a id='navbar_profile' href='' className="flex justify-center items-center w-fit h-fit">
                            <div className='hover:bg-reddit_search_light w-10 h-10 xs:ml-1.5 rounded-full flex justify-center items-center cursor-pointer '>
                                <div className=' bg-reddit_sky w-8 h-8 rounded-full'>
                                    <img src={avatar} alt="Open profile menu" style={{ filter: '', transform: 'scaleX(-1)' }} className="block" />
                                </div>
                            </div>
                        </a>

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
