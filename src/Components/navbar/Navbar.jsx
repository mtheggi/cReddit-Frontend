import redditLogo from '../../assets/reddit_logo.png';
import { Bars3Icon, BellIcon, ChatBubbleOvalLeftEllipsisIcon, CursorArrowRippleIcon, PlusIcon, } from '@heroicons/react/24/outline'
import redditWord from '../../assets/reddit_word.png';
import avatar from '../../assets/avatar.png';
import Searchbar from '../searchbar/Searchbar';
import Separator from '../sidebar/Nav-Icons/Separator';
import { useState } from 'react';


//Todo integrate the menu icon with the side bar

const Navbar = () => {
    const [isLogged, setIsLogged] = useState(true);

    return (
        <div className="flex z-2 fixed flex-col w-full h-15">

            <header className="flex w-full bg-reddit_navbar p-2 items-center">
                <div className='ml-2.5'>
                    <Bars3Icon className="h-9 w-7 text-white xl:hidden cursor-pointer" />
                </div>


                <div className="flex mr-4 xs:mr-2 relative left-4 xl:left-5 h-full items-center">
                    <img src={redditLogo} alt="Logo" className="w-8 h-8 min-w-8" />
                    <img src={redditWord} alt="Logo" className=" ml-2 w-17 h-6  cursor-pointer hidden lg:block" />
                </div>

                <div className='flex xs:flex-grow ml-auto xs:ml-7 xl:ml-11% items-center'>
                    <Searchbar />

                    <div className='flex items-center xs:ml-auto  mr-3 xl:mr-4'>


                        {!isLogged && (<div className='flex items-center w-fit h-full mr-2'>
                            <a className=" bg-reddit_upvote rounded-full w-18 mr-2 h-10 hover:no-underline  items-center justify-center  inline-flex" href="" id="navbar_login-button">
                                <span class="flex items-center justify-center">
                                    <span className="flex items-center font-medium text-white text-sm ">Log In</span>
                                </span>
                            </a>

                            <a className=" bg-reddit_downvote rounded-full w-18 mr-2 h-10 hover:no-underline  items-center justify-center  inline-flex" href="" id="navbar_signup-button">
                                <span class="flex items-center justify-center">
                                    <span className="flex items-center font-medium text-white text-sm ">Sign Up</span>
                                </span>
                            </a>
                        </div>)}


                        { isLogged &&
                            <div className='flex w-fit h-full items-center'>
                                <div className='hover:bg-reddit_search_light ml-0.5 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer '>
                                    <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-7 text-gray-300" />
                                </div>

                                <div className='hover:bg-reddit_search_light w-8 ml-1 xs:w-24 h-10  rounded-full flex justify-center items-center cursor-pointer '>
                                    <PlusIcon className="h-6.5 w-7  text-gray-300" />
                                    <p className=' ml-1 mr-0.5 text-gray-300 hidden xs:block text-sm'>Create </p>
                                </div>

                                <div className='hover:bg-reddit_search_light w-10 h-10 xs:ml-2 rounded-full flex justify-center items-center cursor-pointer '>
                                    <BellIcon className="h-7 w-6 text-gray-300" />
                                </div>

                                <div className='hover:bg-reddit_search_light w-10 h-10 xs:ml-3 rounded-full flex justify-center items-center cursor-pointer '>
                                    <div className=' bg-reddit_sky w-8 h-8 rounded-full'>
                                        <img src={avatar} alt="Open profile menu" style={{ filter: '', transform: 'scaleX(-1)' }} className="block" />
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </header>
            <div className='mt-14 fixed w-full'>
                <Separator />
            </div>
        </div>
    );
}

export default Navbar;