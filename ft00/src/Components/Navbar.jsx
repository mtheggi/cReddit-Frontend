import redditLogo from '../assets/reddit_logo.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'


const Navbar = () => {
    return (
        <header className="flex w-full bg-reddit_dark p-2.5">
            <div className="mx-4">
                <img src={redditLogo} alt="Logo" className="w-9 h-9 " />
            </div>

            <form action="" className="bg-gray-800 h-9 p-1 flex rounded-full px-3 py-2">
                <MagnifyingGlassIcon className="text-gray-300 h-5 w-6 mr-1" />
                <input type="text" className="bg-gray-800 h-6 mt-[-0.1rem] text-sm text-white focus:outline-none " placeholder='Search Reddit' />
            </form>

        </header>
    );
}

export default Navbar;