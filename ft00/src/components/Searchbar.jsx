import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


const Searchbar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [placeholder, setPlaceholder] = useState('Search Reddit');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 511) {
                setPlaceholder('Search ...');
            }
            else{
                setPlaceholder('Search Reddit');
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  

    return (

        <form action="" className={`bg-reddit_search h-10 min-w-24 min-h-10 items-center flex flex-grow rounded-full px-2.5  ${isHovered ? ' bg-reddit_search_light' : ''}`}>
            <MagnifyingGlassIcon className="text-gray-300 h-5 w-6 min-h-5 min-w-6 mr-1" />
            <input type="text" className="bg-reddit_search h-7 w-11/12 text-sm font-extralight text-white focus:outline-none hover:bg-reddit_search_light"  placeholder={placeholder}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} />
        </form>

        //Todo: Add search results dropdown
    );
}

export default Searchbar;