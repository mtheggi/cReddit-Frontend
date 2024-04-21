import { Link, PhotoOutlined, Poll, PollOutlined, PostAddOutlined } from '@mui/icons-material';
import { CheckIcon, ExclamationCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import CreateCommunity from '../createCommunity/CreateCommunity';
import { postRequest, getRequest, postRequestImg } from "../../services/Requests";
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import redditLogo from "../../assets/reddit_logo.png"
import Post from './Post';
import { baseUrl } from "../../constants";
import { v4 as uuidv4 } from 'uuid';
import RedditRuleIcon from './RedditRuleIcon';
import DropImage from './DropImage';
import { UserContext } from '@/context/UserContext';



/**
 * CreatePost component is a form for creating a new post.
 * @component
 * @returns {JSX.Element} React component.
 */
const CreatePost = () => {
    const { user, setUser } = useContext(UserContext);
    const { userProfilePicture, setUserProfilePicture } = useContext(UserContext);
    const [isCommunityOpenLocal, setIsCommunityOpenLocal] = useState(false);
    const [CommunityDropdownOpen, setCommunityDropdownOpen] = useState(false);
    const [voteDurationDropdownOpen, setVoteDurationDropdownOpen] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [joinedSubreddits, setJoinedSubreddits] = useState([]);
    const [file, setFile] = useState(null);
    const [type, setType] = useState('Post');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [inputFields, setInputFields] = useState([{ id: uuidv4(), value: '' }, { id: uuidv4(), value: '' }]);
    const [voteDurationValue, setVoteDurationValue] = useState(3);
    const [isSpoiler, setIsSpoiler] = useState(false);
    const [isNSFW, setIsNSFW] = useState(false);
    const [yourOrAllCommunities, setYourOrAllCommunities] = useState("YOUR COMMUNITIES");
    const communityMenuRef = useRef();
    const communityCardRef = useRef();
    const voteMenuRef = useRef();
    const commNameInputRef = useRef();
    const navigate = useNavigate();
    let initialHeight = '38px';
    let communityName = "";

    useEffect(() => {
        getJoinedSubreddits();

    }, []);

    useEffect(() => {
        let handleClickOutside = (e) => {
            if (communityCardRef.current && !communityCardRef.current.contains(e.target)) {
                setIsCommunityOpenLocal(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    /**
 * Handles file changes.
 * @function handleFileChange
 * @param {Object} e - The event object.
 */
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    /**
 * Checks if a community is joined.
 * @function isCommunityJoined
 * @param {string} communityName - The name of the community.
 * @returns {boolean} - Returns true if the community is joined, false otherwise.
 */
    const isCommunityJoined = (communityName) => {
        return joinedSubreddits.some(subreddit => subreddit.name === communityName);
    }

    /**
 * Gets the expiration date.
 * @function getExpirationDate
 * @param {number} voteDurationValue - The vote duration value.
 * @returns {string} - Returns the expiration date as a string.
 */
    const getExpirationDate = (voteDurationValue) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + parseInt(voteDurationValue));
        return expirationDate.toISOString();
    }


/**
 * Handles the submission of other types of posts.
 * @function handleSubmitOtherTypes
 * @async
 * @returns {Object} - The response from the post request.
 */
    const handleSubmitOtherTypes = async () => {

        if (commNameInputRef.current.value.substring(2) != user)
            communityName = commNameInputRef.current.value.substring(2);

        if (type == "Link" && content.trim() == "")
            return null

        const response = await postRequest(`${baseUrl}/post`, { type: type, communityName: communityName, title: title, content: content, isSpoiler: isSpoiler, isNSFW: isNSFW });
        return response
    }


/**
 * Handles the submission of image posts.
 * @function handleSubmitImg
 * @async
 * @returns {Object} - The response from the post request.
 */
    const handleSubmitImg = async () => {

        if (commNameInputRef.current.value.substring(2) != user)
            communityName = commNameInputRef.current.value.substring(2);

        const formData = new FormData();
        formData.append('images', file);
        formData.append('type', type);
        formData.append('communityName', communityName);
        formData.append('title', title);
        formData.append('isSpoiler', isSpoiler);
        formData.append('isNSFW', isNSFW);
        const response = await postRequestImg(`${baseUrl}/post`, formData);
        return response
    }

    /**
 * Handles the submission of poll posts.
 * @function handleSubmitPoll
 * @async
 * @returns {Object} - The response from the post request.
 */
    const handleSubmitPoll = async () => {

        if (commNameInputRef.current.value.substring(2) != user)
            communityName = commNameInputRef.current.value.substring(2);

        const nonEmptyInputFields = inputFields.filter(field => field.value.trim() !== "");
        const pollOptions = nonEmptyInputFields.map(field => field.value);
        const expirationDate = getExpirationDate(voteDurationValue);
        const response = await postRequest(`${baseUrl}/post`, { type: type, communityName: communityName, title: title, content: content, pollOptions: pollOptions, expirationDate: expirationDate, isSpoiler: isSpoiler, isNSFW: isNSFW });
        return response
    }

    const searchSubreddits = async () => {

    }


    /**
 * Gets the joined subreddits.
 * @function getJoinedSubreddits
 * @async
 * @returns {Array} - An array of joined subreddits.
 */
    const getJoinedSubreddits = async () => {
        const response = await getRequest(`${baseUrl}/user/joined-communities`);
        if (!response) return;
        if (response.status == 200 || response.status == 201) {
            const subredditData = response.data.map(subreddit => ({
                name: subreddit.communityName,
                members: subreddit.members,
                icon: subreddit.profilePicture
            }));
            setJoinedSubreddits(subredditData);
        }
    }


    /**
 * Handles the submission of posts.
 * @function handleSubmitPost
 * @async
 */
    const handleSubmitPost = async () => {
        //Todo add a check that the communityName exists inside the returned array from database: 
        if (isCommunityJoined(commNameInputRef.current.value.substring(2)) || commNameInputRef.current.value.substring(2) == user) {
            if (title.trim() !== "") {
                let res = null;
                if (type === "Poll") {
                    if (checkInputFieldsNotEmpty()) {
                        res = await handleSubmitPoll();
                    }
                }
                else if (type === "Images & Video") {
                    if (file != null)
                        res = await handleSubmitImg();
                }
                else {
                    res = await handleSubmitOtherTypes();
                }

                if (res != null && (res.status === 200 || res.status === 201)) {
                    if (communityName == "")
                        navigate(`/u/${user}/comments/${res.data.postId}`);
                    else
                        navigate(`/r/${communityName}/comments/${res.data.postId}`);
                }

                if (res != null && res.status != 200 && res.status != 201) {
                    //Todo: either toast or 404 page for failure creating post -> server error 
                }
            }
        }
    }

    /**
 * Handles input changes.
 * @function handleInput
 * @param {Object} e - The event object.
 */
    const handleInput = (e) => {
        if (!initialHeight) {
            initialHeight = `${e.target.clientHeight}px`;
        }
        e.target.style.height = initialHeight;
        if (e.target.scrollHeight > e.target.clientHeight) {
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
        setCharCount(e.target.value.length);
    };


    /**
 * Checks if input fields are not empty.
 * @function checkInputFieldsNotEmpty
 * @returns {boolean} - Returns true if input fields are not empty, false otherwise.
 */
    const checkInputFieldsNotEmpty = () => {
        const nonEmptyFields = inputFields.filter(field => field.value.trim() !== "");
        return nonEmptyFields.length >= 2;
    };


    /**
 * Adds an input field for voting in a poll.
 * @function addInputField
 * 
 */
    const addInputField = () => {
        if (inputFields.length < 6) {
            setInputFields([...inputFields, { id: uuidv4(), value: '' }]);
        }
    };

    /**
 * Removes an input field from poll.
 * @function removeInputField
 * @param {string} id - The id of the input field.
 */
    const removeInputField = (id) => {
        setInputFields(inputFields.filter(field => field.id !== id));
    };


    useEffect(() => {
        let closeDropdown = (e) => {

            if (communityMenuRef.current && !communityMenuRef.current.contains(e.target)) {
                setCommunityDropdownOpen(false);
            }
            if (voteMenuRef.current && !voteMenuRef.current.contains(e.target)) {
                setVoteDurationDropdownOpen(false);
            }

        };
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    });



    return (

        <div className='flex mx-auto min-w-[350px]  sm:px-9 pl-2 pr-2 w-full max-w-[1092px] flex-row mt-15 overflow'>


            <div className='flex flex-col w-full h-fit mb-16 lg:mr-10  '>
                <div className='w-full h-14 min-h-14 border-b-[1px] border-gray-600 flex flex-row items-center '>
                    <h1 className='text-lg text-white font-base'>Create a post</h1>
                </div>

                <div className='w-full h-[40px] ml-[0.2px] relative mt-3'>
                    <div onClick={(e) => { e.stopPropagation(); setCommunityDropdownOpen(prev => !prev); commNameInputRef.current.focus(); }} id="create_post_community_dropdown_button" data-testid="create_post_community_dropdown_button" className={`cursor-pointer pl-1 no-select border-[1px] border-gray-500 hover:bg-reddit_search_light bg-reddit_search w-62 h-10 rounded-sm focus:outline-none font-normal text-sm text-center  items-center flex flex-row" type="button`}>
                        <input autoComplete='off' onChange={() => { !CommunityDropdownOpen && setCommunityDropdownOpen(true); commNameInputRef.current.value != "" && setYourOrAllCommunities("ALL COMMUNITIES"); commNameInputRef.current.value == "" && setYourOrAllCommunities("YOUR COMMUNITIES"); }} ref={commNameInputRef} type="text" placeholder='Choose a community' className='bg-transparent text-gray-300 text-[14px] border-0 focus:outline-none focus:ring-0' id="create_post_chosen_community" />
                        <div className="w-fit flex ml-auto mr-5 flex-row">
                            <svg className="w-2.5 h-2.5  ms-3 mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="#F05152" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </div>
                    </div>

                    <div className="">
                        {isCommunityOpenLocal && <CreateCommunity setIsCommunityOpen={setIsCommunityOpenLocal} communityCardRef={communityCardRef} />}
                    </div>

                    <div ref={communityMenuRef} id="create_post_community_dropdown_menu" className={`z-[15] absolute  ${CommunityDropdownOpen ? '' : 'hidden'} bg-reddit_search divide-y divide-gray-100 rounded-b-sm  border-r-[1px] border-l-[1px] border-b-[1px] border-gray-500 shadow w-[248px] dark:bg-gray-700 dark:divide-gray-600`}>
                        <ul className="pt-1 text-sm" aria-labelledby="dropdownInformationButton">
                            <li className='flex pt-2 border-b-[0.5px] mb-2  border-gray-400 flex-col w-full h-20'>
                                <h1 className='text-gray-400 text-[9px]  mb-[4px]  ml-3.5 font-semibold'>YOUR PROFILE</h1>
                                <div onClick={() => { setCommunityDropdownOpen(false); commNameInputRef.current.value = `u/${user}`; }} className='hover:bg-reddit_search_light pt-[8px] cursor-pointer pb-2 pl-3 h-full w-full items-center flex'>
                                    <img className=' h-[38px] rounded-full w-[38px]' src={userProfilePicture} alt="" />
                                    <h1 className='text-gray-200 text-[14px] ml-2 font-medium'>u/{user}</h1>
                                </div>
                            </li>
                        </ul>

                        <li className='flex h-fi border-0 flex-row pt-1 items-center mb-2'>
                            <h1 className='text-gray-400 text-[9px] font-semibold ml-3  '>{yourOrAllCommunities}</h1>
                            <div onClick={(e) => { e.stopPropagation(); setIsCommunityOpenLocal(true); setCommunityDropdownOpen(false); }} className='flex flex-row justify-center items-center rounded-2xl ml-auto mr-3 w-18 cursor-pointer
                                 hover:bg-reddit_search_light '>
                                <h1 className='text-gray-200 text-[10.5px] font-semibold '>Create New</h1>
                            </div>
                        </li>

                        <ul data-testid="joined-subreddits" className="pb-1 max-h-[270px] border-0 overflow-y-auto text-sm" aria-labelledby="dropdownInformationButton">
                            {joinedSubreddits.map((subreddit, index) => (
                                <li key={index} className='flex border-gray-400 flex-col w-full h-13'>
                                    <div onClick={() => { setCommunityDropdownOpen(false); commNameInputRef.current.value = `r/${subreddit.name}`; }} className='hover:bg-reddit_search_light pt-[8px] cursor-pointer pb-1 pl-3 h-full w-full items-center flex'>
                                        <img className=' h-[32px] w-[34px] rounded-2xl' src={subreddit.icon} alt="" />
                                        <div className='flex flex-col space-y-1'>
                                            <h1 className='text-gray-200 text-[13px] ml-2 font-base'>r/{subreddit.name}</h1>
                                            <h1 className='text-gray-400 text-[11px] ml-2 font-light'>{subreddit.members.toLocaleString()} members</h1>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>

                </div>

                <div className='mt-2.5 bg-reddit_search w-full h-fit flex flex-col rounded-lg'>
                    <div className={`flex flex-row w-full h-[60px] min-h-[60px] text-gray-200  font-medium text-[11px] xs:text-[14px] `}>

                        <div id='type_post' onClick={() => setType('Post')} className={`h-full w-1/4 flex  hover:bg-reddit_search_light cursor-pointer flex-row justify-center items-center rounded-tl-lg ${type == "Post" ? ' border-b-[2px] border-b-white bg-reddit_search_light' : ' border-b-[2px] border-gray-500'} border-r-[0.5px] border-gray-500`}>
                            <div className='-mt-1'>
                                <PostAddOutlined />
                            </div>
                            <h1 className='ml-1' >Post</h1>
                        </div>

                        <div id='type_image' onClick={() => setType('Images & Video')} className={`h-full w-1/4 flex hover:bg-reddit_search_light cursor-pointer flex-row justify-center items-center ${type == "Images & Video" ? ' border-b-[2px] bg-reddit_search_light border-b-white' : ' border-b-[2px] border-gray-500'} border-r-[0.5px] border-gray-500`}>
                            <PhotoOutlined />
                            <h1 className='ml-1' >Image</h1>
                        </div>

                        <div id='type_link' onClick={() => setType('Link')} className={`h-full w-1/4 flex hover:bg-reddit_search_light cursor-pointer flex-row justify-center items-center ${type == "Link" ? ' border-b-[2px] bg-reddit_search_light border-b-white' : ' border-b-[2px] border-gray-500'} border-r-[0.5px] border-gray-500`}>
                            <Link />
                            <h1 className='ml-1'>Link</h1>
                        </div>


                        <div id='type_poll' onClick={() => setType('Poll')} className={`h-full w-1/4 flex hover:bg-reddit_search_light cursor-pointer  flex-row justify-center items-center rounded-tr-lg ${type == "Poll" ? ' border-b-[2px] bg-reddit_search_light border-b-white' : ' border-b-[2px] border-gray-500'}`}>
                            <PollOutlined />
                            <h1 className='ml-1' >Poll</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-col h-fit px-3 '>
                        <div id='post_title' className={`mb-2.5  border-[1px] ${isFocused ? ' border-white ' : ' border-gray-500'}   min-h-[39px] flex flex-row w-full mt-3 `} >
                            <textarea maxLength={300}
                                onInput={handleInput}
                                placeholder='Title'
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(e) => setTitle(e.target.value)}
                                className='w-full pr-0 overflow-hidden border-none focus:border-none text-gray-300 font-normal text-[14px] rounded-sm focus:outline-none focus:ring-0  bg-reddit_search resize-none h-[38px]'>
                            </textarea>
                            <div className='text-gray-400 no-select mr-1 text-[9px] flex flex-row justify-center items-center w-14 h-10'>{charCount}/300</div>
                        </div>
                        {type == 'Post' && (
                            <div className='h-fit w-full border-[0.5px] mb-3 border-gray-400 '>
                                <Post setContent={setContent} type={type} />

                            </div>)}

                        {type == 'Images & Video' && (
                            <div className='w-full h-[251px] mb-3 '>
                                <DropImage id="post_drop_image" handleFileChange={handleFileChange} />
                            </div>)}

                        {type == 'Link' && (
                            <div className='mb-3 h-[110px] w-full'>
                                <textarea onChange={(e) => setContent(e.target.value)} id="url_content" onFocus={(e) => e.target.style.border = "1px solid #ffffff"}
                                    onBlur={(e) => e.target.style.border = "0.5px solid #9CA3AF"} placeholder='URL' className='w-full h-full text-gray-300 font-normal text-[14px]  rounded-sm focus:outline-none focus:ring-0 border-[0.5px] resize-none  px-2.5 border-gray-400 bg-reddit_search '>
                                </textarea>
                            </div>
                        )}

                        {type == 'Poll' && (<>
                            <div className='mb-2.5 h-[110px] w-full'>
                                <textarea id='poll_content' onChange={(e) => setContent(e.target.value)} onFocus={(e) => e.target.style.border = "1px solid #ffffff"}
                                    onBlur={(e) => e.target.style.border = "0.5px solid #9CA3AF"} placeholder='Text(optional)' className='w-full h-full text-gray-300 font-normal text-[14px]  rounded-sm focus:outline-none focus:ring-0 border-[0.5px] resize-none  px-2.5 border-gray-400 bg-reddit_search '>
                                </textarea>
                            </div>
                            <div className='mb-3 h-fit w-full border-[0.5px] flex flex-row border-gray-400'>
                                <div className='h-full w-full sm:w-10/12 sm:mr-0 flex flex-col  text-gray-200 space-y-2 pt-2.5 pl-2 pr-2'>
                                    {inputFields.map((field, index) => (
                                        <div key={field.id} className='mr-5'>
                                            <div className="input-field relative">
                                                <input onChange={(e) => {
                                                    const newInputFields = [...inputFields];
                                                    newInputFields[index].value = e.target.value;
                                                    setInputFields(newInputFields);
                                                }} id={`input_option_${index + 1}`} maxLength={200} type="text" placeholder={`Option ${index + 1}`} className='h-[39px] w-full pr-9 ml-2.5 bg-transparent text-sm focus:outline-none focus:ring-0 focus:border-white' />
                                                {index > 1 && (
                                                    <button id={`delete_option_${index + 1}`} className='w-6 h-6 absolute right-[0px]  top-1/2 transform -translate-y-1/2' onClick={() => removeInputField(field.id)}>
                                                        <TrashIcon className=' text-gray-400' />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex flex-row w-full justify-between h-fit mt-3 mb-1 items-center'>
                                        <div id='add_option' onClick={addInputField} className={` w-16 h-7 rounded-full flex justify-center items-center ${inputFields.length >= 6 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-reddit_search_light'}`}>
                                            <PlusIcon className="h-6 w-6  text-gray-300" />
                                            <p className=' ml-0.5 mr-0.5 text-gray-300 text-sm'>ADD</p>
                                        </div>

                                        <div className='flex flex-row sm:mr-4 items-center relative'>
                                            <label className='text-xs hidden xs:block text-gray-400 h-fit' htmlFor="create_post_vote_dropdown_button">Voting Duration:</label>
                                            <div ref={voteMenuRef} onClick={(e) => { e.stopPropagation(); setVoteDurationDropdownOpen(prev => !prev) }} id="create_post_vote_dropdown_button" className={`text-gray-300 text-xs cursor-pointer pl-1.5 no-select bg-reddit_search w-22 h-10 rounded-sm focus:outline-none font-normal text-center  items-center flex flex-row" type="button`}>{voteDurationValue}
                                                <div className="w-fit flex ml-2 mr-2 flex-row">
                                                    <svg className="w-2.5 h-2.5  mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="#F05152" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                    </svg>
                                                </div>
                                                <div id="vote_duration_dropdown_menu" className={`z-10 absolute mt-66 right-[0.5px]  ${voteDurationDropdownOpen ? '' : 'hidden'} bg-reddit_hover divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700 dark:divide-gray-600`}>

                                                    <ul className="text-xs border-[0.5px] rounded-sm border-gray-400" aria-labelledby="dropdownInformationButton">
                                                        <li id="vote_1_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue(1)} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == 1 ? 'bg-reddit_search_light' : ''}`}>1 Day</p>
                                                        </li>
                                                        <li id="vote_2_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue(2)} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == 2 ? 'bg-reddit_search_light' : ''}`}>2 Days</p>
                                                        </li>
                                                        <li id="vote_3_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue(3)} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == 3 ? 'bg-reddit_search_light' : ''}`}>3 Days</p>
                                                        </li>
                                                        <li id="vote_4_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue(4)} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == 4 ? 'bg-reddit_search_light' : ''}`}>4 Days</p>
                                                        </li>
                                                        <li id="vote_5_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue(5)} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == 5 ? 'bg-reddit_search_light' : ''}`}>5 Days</p>
                                                        </li>
                                                        <li id="vote_6_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue(6)} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == 6 ? 'bg-reddit_search_light' : ''}`}>6 Days</p>
                                                        </li>
                                                        <li id="vote_7_day" className={`cursor-pointer`}>
                                                            <p onClick={() => setVoteDurationValue(7)} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == 7 ? 'bg-reddit_search_light' : ''}`}>7 Days</p>
                                                        </li>

                                                    </ul>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className='h-full hidden  sm:flex flex-col w-4/12 p-2 pt-1  text-gray-200 '>
                                    <div className='h-9 items-center flex flex-row w-full '>
                                        <ExclamationCircleIcon className='w-6 mr-1 h-6' />
                                        <h1 className='text-[11px] md:text-[13px]'>Tips on Better Polls</h1>
                                    </div>
                                    <h1 className='text-[10px] md:text-[11px] ml-1.5 mt-1'>1. Suggest short clear options</h1>
                                    <h1 className='text-[10px] md:text-[11px] ml-1.5 mt-2'>2. The more options, the better</h1>
                                    <h1 className='text-[10px] md:text-[11px] ml-1.5 mt-2'>3. Choose the poll duration</h1>
                                    <h1 className='text-[10px] md:text-[11px] ml-1.5 mt-2'>4. Options can't be edited after post creation</h1>
                                </div>

                            </div>
                        </>)}


                        <div className='flex flex-row items-center w-full space-x-3 border-b-[0.5px] pb-3 border-gray-400 font-semibold'>
                            <div id='spoiler' onClick={() => setIsSpoiler(prev => !prev)} className={`${isSpoiler ? ' bg-black border-black' : 'hover:bg-reddit_search_light'} border-[0.5px] w-24 h-8  rounded-full flex justify-center items-center cursor-pointer `}>
                                {!isSpoiler ? (<PlusIcon className="h-6.5 w-7  text-gray-300" />) : (<CheckIcon className="h-6.5 w-7  text-white" />)}
                                <p className={`no-select ml-1 mr-0.5 ${isSpoiler ? 'text-white' : 'text-gray-300'} text-sm`}>Spoiler</p>
                            </div>
                            <div id='nsfw' onClick={() => setIsNSFW(prev => !prev)} className={`${isNSFW ? 'bg-red-500 border-black' : 'hover:bg-reddit_search_light '}  border-[0.5px] w-24 h-8  rounded-full flex justify-center items-center cursor-pointer `}>
                                {!isNSFW ? (<PlusIcon className="h-6.5 w-7  text-gray-300" />) : (<CheckIcon className="h-6.5 w-7  text-black" />)}
                                <p className={`ml-1 no-select mr-0.5 ${isNSFW ? 'text-black' : 'text-gray-300'}  text-sm`}>NSFW</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row space-x-3 mr-3  h-full mt-2.5 mb-2.5 font-semibold ml-auto'>
                        <div onClick={handleSubmitPost} id='submit_post' data-testid="submit_post" className={`  group  bg-gray-100 w-18 h-9  rounded-full flex justify-center items-center ${title.trim() == "" || (!isCommunityJoined(commNameInputRef.current.value.substring(2)) && commNameInputRef.current.value.substring(2) != user) || (type == "Poll" && !(checkInputFieldsNotEmpty())) || (file == null && type == "Images & Video") || (type == "Link" && content.trim() == "") ? "cursor-not-allowed text-gray-600" : " cursor-pointer hover:bg-reddit_upvote hover:text-white"} `}>
                            <p className=' ml-1 mr-0.5   text-sm'>Post</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id='posting_to_reddit' className='bg-reddit_search rounded-lg hidden  h-[312px] mt-6 lg:flex py-2 px-2 flex-col w-[418px]'>
                <div className='w-full flex flex-row border-b-[0.5px] items-center border-gray-400 h-[74px]'>

                    <div className='w-[44px] mb-1 h-[44px]'>
                        <RedditRuleIcon />
                    </div>

                    <div>
                        <h1 className='w-full ml-4 mt-2  h-full text-gray-200'>Posting to Reddit</h1>
                    </div>

                </div>


                <div className='w-full h-full text-gray-200 font-light text-sm'>

                    <div className='w-full flex items-center border-b-[0.5px] border-gray-400 h-[45px]'>
                        <h1>1. Remember the human</h1>

                    </div>
                    <div className='w-full flex items-center border-b-[0.5px] border-gray-400 h-[45px]'>
                        <h1>2. Behave like you would in real life</h1>

                    </div>
                    <div className='w-full flex items-center border-b-[0.5px] border-gray-400 h-[45px]'>
                        <h1>3. Look for the original source of content</h1>

                    </div>
                    <div className='w-full flex items-center border-b-[0.5px] border-gray-400 h-[45px]'>
                        <h1>4. Search for duplicates before posting</h1>

                    </div>
                    <div className='w-full flex items-center border-b-[0.5px] border-gray-400 h-[45px]'>
                        <h1>5. Read the community’s rules</h1>

                    </div>

                </div>




            </div>
        </div>

    );
}

export default CreatePost;