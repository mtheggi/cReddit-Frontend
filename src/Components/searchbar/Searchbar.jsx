import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


const Searchbar = () => {
    const [isHoveredSearch, setIsHoveredSearch] = useState(false);
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

        <form action="" className={`xs:bg-reddit_search h-10 xs:mr-4 xl:max-w-148 ml-auto xl:mr-14% mxl:max-w-170 xs:min-w-24 min-h-10 items-center flex xs:flex-grow rounded-full xs:px-3  ${isHoveredSearch ? ' xs:bg-reddit_search_light' : ''}`}>
            <MagnifyingGlassIcon className="text-gray-300 xs:h-5 xs:w-6 h-7 w-6 min-h-5 min-w-6  ml-3 xs:ml-0 xs:mr-1" />
            <input type="text" className="bg-reddit_search h-7 w-11/12 text-sm hidden xs:block font-extralight text-white focus:outline-none hover:bg-reddit_search_light" placeholder={placeholder}
                onMouseEnter={() => setIsHoveredSearch(true)}
                onMouseLeave={() => setIsHoveredSearch(false)} />
        </form>

        //Todo: Add search results dropdown
    );
}

export default Searchbar;