import redditLogo from '../assets/reddit_logo.png';
import { Bars3Icon, BellIcon, ChatBubbleOvalLeftEllipsisIcon, CursorArrowRippleIcon, MagnifyingGlassIcon, PlusIcon, } from '@heroicons/react/24/outline'
import redditWord from '../assets/reddit_word.png';
import avatar from '../assets/avatar.png';
import Searchbar from './Searchbar';
import Separator from './sidebar/Nav-Icons/Separator';


//Todo integrate the menu icon with the side bar

const Navbar = () => {

    return (
        <header className="flex w-full fixed bg-reddit_navbar p-2 items-center">
            <div className='ml-2.5'>
                <Bars3Icon className="h-9 w-7 text-white xl:hidden cursor-pointer" />
            </div>


            <div className="flex mr-2 relative left-4 xl:left-5 h-full items-center">
                <img src={redditLogo} alt="Logo" className="w-8 h-8 min-w-8" />
                <img src={redditWord} alt="Logo" className=" ml-2 w-18 h-6  cursor-pointer hidden lg:block" />
            </div>

            <div className='flex xs:flex-grow ml-auto xs:ml-7 xl:ml-11% items-center'>
                <Searchbar />

                <div className='flex items-center xs:ml-3 xl:ml-5.5%  mr-3 xl:mr-7'>

                    <div className='hidden hover:bg-reddit_search_light w-10 h-10 ml-2 rounded-full justify-center items-center cursor-pointer xl:inline-flex'>
                        <CursorArrowRippleIcon className="h-7 w-6 text-gray-300" />
                    </div>

                    <div className='hover:bg-reddit_search_light ml-0.5 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer '>
                        <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-7 text-gray-300" />
                    </div>

                    <div className='hover:bg-reddit_search_light w-8 xs:w-24 h-10  rounded-full flex justify-center items-center cursor-pointer '>
                        <PlusIcon className="h-6.5 w-7  text-gray-300" />
                        <p className=' ml-1 mr-0.5 text-gray-300 hidden xs:block text-sm'>Create </p>
                    </div>

                    <div className='hover:bg-reddit_search_light w-10 h-10 xs:ml-1 rounded-full flex justify-center items-center cursor-pointer '>
                        <BellIcon className="h-7 w-6 text-gray-300" />
                    </div>

                    <div className='hover:bg-reddit_search_light w-10 h-10 xs:ml-1.5 rounded-full flex justify-center items-center cursor-pointer '>
                        <div className=' bg-reddit_sky w-8 h-8 rounded-full'>
                            <img src={avatar} alt="Open profile menu" style={{ filter: '', transform: 'scaleX(-1)' }} className="block" />
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Navbar;