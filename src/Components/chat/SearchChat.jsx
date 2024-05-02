import { useState, useEffect, useRef, useContext } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import Separator from '../sidebar/Nav-Icons/Separator';
import { getRequest } from '@/services/Requests';
import SearchUserRow from '../search/SearchUserRow';
import { baseUrl } from '@/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatSearchUserRow from './ChatSearchUserRow';
import { ChatContext } from '@/context/ChatContext';


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
    const { tags, setTags, groupName, setGroupName, setProfilePictureTag, profilePictureTag } = useContext(ChatContext);




    const getSearchResults = async (query) => {
        if (query.length == 0)
            return;

        const usersRespons = await getRequest(`${baseUrl}/search/users?page=1&limit=5&query=${query}&autocomplete=true`);
        if (usersRespons.status == 200 || usersRespons.status == 201) {
            const users = usersRespons.data;
            const FilteredUsers = users.filter(user => !tags.includes(user.username));
            setUserResults(FilteredUsers);
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


    const handleTagClick = (e, name, profilePicture) => {
        e.stopPropagation();
        console.log("test");
        setTags([...tags, name]);
        setProfilePictureTag([...profilePictureTag, profilePicture])
        console.log(tags);
        setUserResults(userResults.filter(user => user.username !== name));
    };
    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        setProfilePictureTag([...profilePictureTag.filter((_, index) => index !== indexToRemove)]);
    };

    return (

        <div className="flex-col w-full h-full items-center gap-20 p-7 flex relative bg-reddit_dark_Chat_Create">
            <div className="flex-col w-full items-center flex relative mt-5">
                <form action="" onSubmit={(e) => { e.preventDefault(); goToSearchPage(searchValue); }} className={`group w-full  xl:max-w-[600px] z-40 xs:bg-reddit_dark_search_chat justify-center sm:justify-start cursor-pointer sm:cursor-default h-13  min-h-10 items-center flex xs:flex-grow rounded-full xs:px-3 `}>
                    <MagnifyingGlassIcon className=" text-gray-300 xs:h-5 xs:w-6 h-7 w-6 min-h-5 min-w-6  xs:ml-0 xs:mr-1" />

                    <input ref={inputRef} onClick={() => setIsFocused(true)} onChange={(e) => { getSearchResults(e.target.value); setSearchValue(e.target.value); }} id='chat_searchbar_input' type="text" autoComplete='off' className={`bg-reddit_dark_search_chat h-7 w-11/12 text-sm hidden xs:block font-extralight border-none outline-none text-white focus:outline-none focus:border-none focus:ring-0`} placeholder={placeholder} />

                    {searchValue != "" && <div onClick={() => { setSearchValue(""); setCommunityResults([]); inputRef.current.value = ""; setUserResults([]) }} className='w-[26px] h-[26px] hover:bg-reddit_search_light rounded-full cursor-pointer flex flex-row items-center justify-center'>
                        <svg rpl="" className='text-black' fill="white" height="16" icon-name="clear-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 18.75A8.75 8.75 0 1 1 18.75 10 8.76 8.76 0 0 1 10 18.75Zm3.567-11.433L10.884 10l2.683 2.683-.884.884L10 10.884l-2.683 2.683-.884-.884L9.116 10 6.433 7.317l.884-.884L10 9.116l2.683-2.683.884.884Z"></path> </svg>
                    </div>}
                </form>



                <div className={`z-30 absolute -mt-8 w-full  xl:max-w-[600px] bg-[#0F1A1C] ${isFocused ? 'block' : 'hidden'}  hover:rounded-b-3xl rounded-b-3xl  h-fit top-[55px] `}>


                    {userResults.length != 0 && <Separator />}

                    <div className="flex-col flex h-fit w-full ">
                        {userResults.length != 0 && <h1 className={`text-gray-400 ${communityResults.length == 0 ? "mt-10" : "mt-[10px]"} mb-[5px] text-[14px] px-3 font-semibold`}>People</h1>}
                        {userResults.map((user, index) => {
                            return <ChatSearchUserRow key={index} {...user} handleClick={handleTagClick} />
                        })}
                    </div>
                    <Separator />

                    {searchValue != "" && <div
                        className={`flex flex-row w-full hover:bg-reddit_hover rounded-b-3xl h-[45px] px-[22px] cursor-pointer items-center ${communityResults.length == 0 && userResults.length == 0 ? 'mt-[28px]' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className=" text-gray-300 xs:h-5 xs:w-6 h-7 w-6 min-h-5 min-w-6  xs:ml-0 xs:mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg>
                        <h1 className='text-gray-300 text-[14px] ml-1 font-light'>Search for "{searchValue}"</h1>
                    </div>}
                </div>
            </div>


            {tags.length > 1 &&
                <>

                    <div className="flex-col w-full items-center flex relative mt-5">
                        <div className={`group w-full  xl:max-w-[600px] xl:mr-11 z-20 xs:bg-reddit_dark_search_chat justify-center sm:justify-start cursor-pointer sm:cursor-default h-13  min-h-10 items-center flex xs:flex-grow rounded-full xs:px-3 `}>
                            <UserGroupIcon className=" text-gray-300 xs:h-5 xs:w-6 h-7 w-6 min-h-5 min-w-6  xs:ml-0 xs:mr-1" />
                            <input onChange={(e) => { setGroupName(e.target.value); }} id='chat_groupname_input' type="text" autoComplete='off' className={`bg-reddit_dark_search_chat h-7 w-11/12 text-sm hidden xs:block font-extralight border-none outline-none text-white focus:outline-none focus:border-none focus:ring-0`} placeholder="Enter the group name" />
                        </div>
                        {groupName == "" &&
                            <p className='text-red-800 text-sm mt-2'> Group name is required * </p>
                        }
                    </div>
                </>
            }

            <div className='tags-input'>
                <ul id="tags">
                    {tags.map((tag, index) => (
                        <li key={index} className="tag">
                            <img src={profilePictureTag[index]} className='h-4 w-4 rounded-full mr-1'></img>
                            <span className='tag-title'>{tag}</span>
                            <span className='tag-close-icon'
                                onClick={() => removeTags(index)}
                            >
                                x
                            </span>
                        </li>
                    ))}
                </ul>

            </div>


        </div >

    );
}

export default SearchChat;