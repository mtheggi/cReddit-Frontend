import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


const Searchbar = () => {
    const [placeholder, setPlaceholder] = useState('Search Reddit');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 550) {
                setPlaceholder('Search ...');
            }
            else {
                setPlaceholder('Search Reddit');
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (

        <form action="" className={`group xs:bg-reddit_search h-10 xs:mr-4 xl:max-w-148 ml-auto mr-2 xl:mr-14% mxl:max-w-170 xs:min-w-24 min-h-10 items-center flex xs:flex-grow rounded-full hover:bg-reddit_search_light xs:px-3 `}>
            <MagnifyingGlassIcon className=" text-gray-300 xs:h-5 xs:w-6 h-7 w-6 min-h-5 min-w-6  xs:ml-0 xs:mr-1" />
            <input id='navbar_searchbar_input' type="text" autoComplete='off' className="group-hover:bg-reddit_search_light bg-reddit_search h-7 w-11/12 text-sm hidden xs:block font-extralight border-none outline-none text-white focus:outline-none focus:border-none focus:ring-0"  placeholder={placeholder} />
        </form>

        //Todo: Add search results dropdown
    );
}

export default Searchbar;