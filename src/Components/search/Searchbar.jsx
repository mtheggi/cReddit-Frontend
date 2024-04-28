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
const Searchbar = () => {
    const [placeholder, setPlaceholder] = useState('Search Reddit');
    const [userResults, setUserResults] = useState([]);
    const [communityResults, setCommunityResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef(null);
    const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setSearchHistory(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
    }, []);

    useEffect(()=>{
        const pathParts = location.pathname.split('/');
        if (pathParts[1] === 'search' && pathParts[2].trim!="") {
            inputRef.current.value=pathParts[2];
        }
    },[])

    const getSearchResults = async (query) => {
        if (query.length == 0)
            return;
        const communitiesResponse = await getRequest(`${baseUrl}/search/communities?page=1&limit=5&query=${query}&autocomplete=true`);
        if (communitiesResponse.status == 200 || communitiesResponse.status == 201) {
            setCommunityResults(communitiesResponse.data);
        }

        const usersRespons = await getRequest(`${baseUrl}/search/users?page=1&limit=5&query=${query}&autocomplete=true`);
        if (usersRespons.status == 200 || usersRespons.status == 201) {
            setUserResults(usersRespons.data);
        }
    }

    useEffect(() => {
        if (searchValue.length == 0) {
            setCommunityResults([]);
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
                <div className="flex-col flex h-fit w-full">
                    {communityResults.length != 0 && <h1 className='text-gray-400 px-3 mt-10 mb-[6px] text-[14px] font-semibold'>Communities</h1>}
                    {communityResults.map((community, index) => {
                        return <SearchSubredditRow key={index} {...community} setSearchHistory={setSearchHistory} setIsFocused={setIsFocused} />
                    })}
                </div>

                {userResults.length != 0 && <Separator />}

                <div className="flex-col flex h-fit w-full">
                    {userResults.length != 0 && <h1 className={`text-gray-400 ${communityResults.length == 0 ? "mt-10" : "mt-[10px]"} mb-[5px] text-[14px] px-3 font-semibold`}>People</h1>}
                    {userResults.map((user, index) => {
                        return <SearchUserRow key={index} {...user} setSearchHistory={setSearchHistory} setIsFocused={setIsFocused} />
                    })}
                </div>

                <Separator />

                {searchValue!="" && <div onClick={() => {
                    goToSearchPage(searchValue);
                }}
                 className={`flex flex-row w-full hover:bg-reddit_hover rounded-b-3xl h-[45px] px-[22px] cursor-pointer items-center ${communityResults.length==0 && userResults.length==0 ?'mt-[28px]':''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className=" text-gray-300 xs:h-5 xs:w-6 h-7 w-6 min-h-5 min-w-6  xs:ml-0 xs:mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg>
                    <h1 className='text-gray-300 text-[14px] ml-1 font-light'>Search for "{searchValue}"</h1>
                </div>}

                {searchValue == "" && <div className='flex flex-col w-full h-fit'>
                    {
                        [...searchHistory].reverse().map((item, index, array) => (
                            <div onClick={(e) => {
                                e.stopPropagation();
                                if (item[0].startsWith('u/')) {
                                    navigate('user/' + item[0].slice(2) + '/')
                                }
                                setIsFocused(false);
                            }}
                                key={index} className={`h-[50px] w-full ${index == 0 ? 'mt-8' : ''} ${index == array.length - 1 ? 'rounded-b-3xl' : ''} px-[26px] flex flex-row items-center hover:bg-reddit_hover cursor-pointer`} >
                                <svg className='mr-6' rpl="" fill="white" height="16" icon-name="history-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m13.558 14.442-4.183-4.183V4h1.25v5.741l3.817 3.817-.884.884ZM20 10a10 10 0 1 0-10 10 10.011 10.011 0 0 0 10-10Zm-1.25 0A8.75 8.75 0 1 1 10 1.25 8.76 8.76 0 0 1 18.75 10Z"></path> </svg>

                                <div className='w-[22px] h-[22px] mr-[12px]'>
                                    <img src={item[1]} alt="" className='w-full h-full rounded-full' />
                                </div>
                                <h1 className='text-gray-300 text-[13px] tracking-wide  font-light'>{item[0]}</h1>

                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
                                    let updatedSearchHistory = searchHistory.filter(historyItem => historyItem[0] !== item[0]);
                                    localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
                                    setSearchHistory(updatedSearchHistory);
                                }}
                                    className='w-[26px] h-[26px] hover:bg-reddit_search_light rounded-full cursor-pointer ml-auto flex flex-row items-center justify-center'>
                                    <svg rpl="" className='text-black' fill="white" height="16" icon-name="clear-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 18.75A8.75 8.75 0 1 1 18.75 10 8.76 8.76 0 0 1 10 18.75Zm3.567-11.433L10.884 10l2.683 2.683-.884.884L10 10.884l-2.683 2.683-.884-.884L9.116 10 6.433 7.317l.884-.884L10 9.116l2.683-2.683.884.884Z"></path> </svg>
                                </div>
                            </div>
                        ))
                    }
                </div>}
            </div>

        </div>

    );
}

export default Searchbar;