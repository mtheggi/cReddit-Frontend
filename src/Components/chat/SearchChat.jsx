import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Separator from '../sidebar/Nav-Icons/Separator';
import { getRequest } from '@/services/Requests';
import SearchSubredditRow from './SearchSubredditRow';
import SearchUserRow from './SearchUserRow';
import { baseUrl } from '@/constants';
import { useNavigate, useLocation } from 'react-router-dom';


/**
 * Component for the searchbar in the navbar.
 * @component
 * @returns {JSX.Element} The Searchbar component.
 *  */
const SearchChat = () => {
    const [placeholder, setPlaceholder] = useState('Enter username(s) *');
    const [userResults, setUserResults] = useState([]);
    const [communityResults, setCommunityResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef(null);
    const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();



    const getSearchResults = async (query) => {
        if (query.length == 0)
            return;

        const usersRespons = await getRequest(`${baseUrl}/search/users?page=1&limit=5&query=${query}&autocomplete=true`);
        if (usersRespons.status == 200 || usersRespons.status == 201) {
            setUserResults(usersRespons.data);
        }
    }

    useEffect(() => {
        if (searchValue.length == 0) {
            setUserResults([]);
        }
    }, [searchValue])

    useEffect(() => {
        let closeDropdown = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setIsFocused(false);
            }

        };
        document.addEventListener("click", closeDropdown);


        return () => {
            document.removeEventListener("click", closeDropdown);

        };
    });

    const goToSearchPage = (query) => {
        if (query.trim() == "")
            return;
        navigate(`/search/${query}/posts`);
        setIsFocused(false);
    }

    return (

        <div className="flex-col w-full items-center flex relative">

            <form action="" onSubmit={(e) => { e.preventDefault(); goToSearchPage(searchValue); }} className={`group w-full mr-2 xl:max-w-[600px] xl:mr-12 z-20 ${isFocused ? 'xs:bg-[#0E1A1C]' : 'xs:bg-reddit_search'} justify-center sm:justify-start cursor-pointer sm:cursor-default h-10 min-h-10 items-center flex xs:flex-grow rounded-full hover:bg-reddit_search_light xs:px-3 `}>
                <MagnifyingGlassIcon className=" text-gray-300 xs:h-5 xs:w-6 h-7 w-6 min-h-5 min-w-6  xs:ml-0 xs:mr-1" />
                <input ref={inputRef} onClick={() => setIsFocused(true)} onChange={(e) => { getSearchResults(e.target.value); setSearchValue(e.target.value); }} id='navbar_searchbar_input' type="text" autoComplete='off' className={`group-hover:bg-reddit_search_light ${isFocused ? 'bg-[#0E1A1C]' : 'bg-reddit_search'} h-7 w-11/12 text-sm hidden xs:block font-extralight border-none outline-none text-white focus:outline-none focus:border-none focus:ring-0`} placeholder={placeholder} />

                {searchValue != "" && <div onClick={() => { setSearchValue(""); setCommunityResults([]); inputRef.current.value = ""; setUserResults([]) }} className='w-[26px] h-[26px] hover:bg-reddit_search_light rounded-full cursor-pointer flex flex-row items-center justify-center'>
                    <svg rpl="" className='text-black' fill="white" height="16" icon-name="clear-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 18.75A8.75 8.75 0 1 1 18.75 10 8.76 8.76 0 0 1 10 18.75Zm3.567-11.433L10.884 10l2.683 2.683-.884.884L10 10.884l-2.683 2.683-.884-.884L9.116 10 6.433 7.317l.884-.884L10 9.116l2.683-2.683.884.884Z"></path> </svg>
                </div>}
            </form>

            <div className={`absolute -ml-[8px] xl:max-w-[600px] xl:mr-10 bg-[#0F1A1C] ${isFocused ? 'block' : 'hidden'}  rounded-b-3xl w-full h-fit top-[20px] `}>


                {userResults.length != 0 && <Separator />}

                <div className="flex-col flex h-fit w-full">
                    {userResults.length != 0 && <h1 className={`text-gray-400 ${communityResults.length == 0 ? "mt-10" : "mt-[10px]"} mb-[5px] text-[14px] px-3 font-semibold`}>People</h1>}
                    {userResults.map((user, index) => {
                        return <SearchUserRow key={index} {...user} setSearchHistory={setSearchHistory} setIsFocused={setIsFocused} />
                    })}
                </div>

                <Separator />


            </div>

        </div>

    );
}

export default SearchChat;