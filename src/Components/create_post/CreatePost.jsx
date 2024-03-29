import { Link, PhotoOutlined, Poll, PollOutlined, PostAddOutlined } from '@mui/icons-material';
import { CheckIcon, ExclamationCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react';
import Post from './Post';
import { v4 as uuidv4 } from 'uuid';
import RedditRuleIcon from './RedditRuleIcon';
import DropImage from './DropImage';
const CreatePost = () => {
    const [menuState, setMenuState] = useState('post');
    const [CommunityDropdownOpen, setCommunityDropdownOpen] = useState(false);
    const [voteDurationDropdownOpen, setVoteDurationDropdownOpen] = useState(false);
    const [voteDurationValue, setVoteDurationValue] = useState("3 Days");
    const [charCount, setCharCount] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [isSpoiler, setIsSpoiler] = useState(false);
    const [isNSFW, setIsNSFW] = useState(false);
    const [inputFields, setInputFields] = useState([{ id: uuidv4(), value: '' }, { id: uuidv4(), value: '' }]);
    const communityMenuRef = useRef();
    const voteMenuRef = useRef();

    let initialHeight = '38px';
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


    const addInputField = () => {
        if (inputFields.length < 6) {
            setInputFields([...inputFields, { id: uuidv4(), value: '' }]);
        }
    };

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
                    <div onClick={(e) => { e.stopPropagation(); setCommunityDropdownOpen(prev => !prev) }} id="create_post_community_dropdown_button" className={`text-gray-300 cursor-pointer pl-3 no-select border-[1px] border-gray-500 hover:bg-reddit_search_light bg-reddit_search w-62 h-10 rounded-sm focus:outline-none font-normal text-sm text-center  items-center flex flex-row" type="button`}>Choose a community
                        <div className="w-fit flex ml-auto mr-5 flex-row">
                            <svg className="w-2.5 h-2.5  ms-3 mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="#F05152" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </div>
                    </div>

                    <div ref={communityMenuRef} id="create_post_community_dropdown_menu" className={`z-20 absolute  ${CommunityDropdownOpen ? '' : 'hidden'} bg-reddit_search divide-y divide-gray-100 rounded-b-sm  border-r-[1px] border-l-[1px] border-b-[1px] border-gray-500 shadow w-[248px] dark:bg-gray-700 dark:divide-gray-600`}>


                        <ul className="py-1 text-sm" aria-labelledby="dropdownInformationButton">

                            <div className='flex flex-row'>
                                <h1 className='text-gray-400 text-[9px] font-semibold ml-3 mt-1.5 '>YOUR COMMUNITIES</h1>
                                <div className='flex flex-row justify-center items-center rounded-2xl ml-15 w-18 h-6 cursor-pointer
                                 hover:bg-reddit_search_light '>
                                    <h1 className='text-gray-200 text-[10.5px]  font-semibold '>Create New</h1>
                                </div>
                            </div>

                        </ul>

                    </div>

                </div>

                <div className='mt-2.5 bg-reddit_search w-full h-fit flex flex-col rounded-lg'>
                    <div className={`flex flex-row w-full h-[60px] min-h-[60px] text-gray-200  font-medium text-[11px] xs:text-[14px] `}>

                        <div onClick={() => setMenuState('post')} className={`h-full w-1/4 flex  hover:bg-reddit_search_light cursor-pointer flex-row justify-center items-center rounded-tl-lg ${menuState == "post" ? ' border-b-[2px] border-b-white bg-reddit_search_light' : ' border-b-[2px] border-gray-500'} border-r-[0.5px] border-gray-500`}>
                            <div className='-mt-1'>
                                <PostAddOutlined />
                            </div>
                            <h1 className='ml-1' >Post</h1>
                        </div>

                        <div onClick={() => setMenuState('image')} className={`h-full w-1/4 flex hover:bg-reddit_search_light cursor-pointer flex-row justify-center items-center ${menuState == "image" ? ' border-b-[2px] bg-reddit_search_light border-b-white' : ' border-b-[2px] border-gray-500'} border-r-[0.5px] border-gray-500`}>
                            <PhotoOutlined />
                            <h1 className='ml-1' >Image</h1>
                        </div>

                        <div onClick={() => setMenuState('link')} className={`h-full w-1/4 flex hover:bg-reddit_search_light cursor-pointer flex-row justify-center items-center ${menuState == "link" ? ' border-b-[2px] bg-reddit_search_light border-b-white' : ' border-b-[2px] border-gray-500'} border-r-[0.5px] border-gray-500`}>
                            <Link />
                            <h1 className='ml-1'>Link</h1>
                        </div>


                        <div onClick={() => setMenuState('poll')} className={`h-full w-1/4 flex hover:bg-reddit_search_light cursor-pointer  flex-row justify-center items-center rounded-tr-lg ${menuState == "poll" ? ' border-b-[2px] bg-reddit_search_light border-b-white' : ' border-b-[2px] border-gray-500'}`}>
                            <PollOutlined />
                            <h1 className='ml-1' >Poll</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-col h-fit px-3 '>
                        <div className={`mb-2.5 pl-2.5 border-[1px] ${isFocused ? ' border-white ' : ' border-gray-500'}   min-h-[39px] flex flex-row w-full mt-3 `} >
                            <textarea maxLength={300}
                                onInput={handleInput}
                                placeholder='Title'
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className='w-full pr-0 overflow-hidden border-none focus:border-none text-gray-300 font-normal text-[14px] rounded-sm focus:outline-none focus:ring-0  bg-reddit_search resize-none h-[38px]'>
                            </textarea>
                            <div className='text-gray-400 no-select mr-1 text-[9px] flex flex-row justify-center items-center w-14 h-10'>{charCount}/300</div>
                        </div>
                        {menuState == 'post' && (
                            <div className='h-fit w-full border-[0.5px] mb-3 border-gray-400 '>
                                <Post />
                            </div>)}

                        {menuState == 'image' && (
                            <div className='w-full h-[251px] mb-3 '>
                                <DropImage />
                            </div>)}

                        {menuState == 'link' && (
                            <div className='mb-3 h-[110px] w-full'>
                                <textarea onFocus={(e) => e.target.style.border = "1px solid #ffffff"}
                                    onBlur={(e) => e.target.style.border = "0.5px solid #9CA3AF"} placeholder='URL' className='w-full h-full text-gray-300 font-normal text-[14px]  rounded-sm focus:outline-none focus:ring-0 border-[0.5px] resize-none  px-2.5 border-gray-400 bg-reddit_search '>
                                </textarea>
                            </div>
                        )}


                        {menuState == 'poll' && (
                            <div className='mb-3 h-fit w-full border-[0.5px] flex flex-row border-gray-400'>
                                <div className='h-full w-full sm:w-10/12 sm:mr-0 flex flex-col  text-gray-200 space-y-2 pt-2.5 pl-2 pr-2'>
                                    {inputFields.map((field, index) => (
                                        <div className='mr-5'>
                                            <div key={field.id} className="input-field relative">
                                                <input maxLength={200} type="text" placeholder={`Option ${index + 1}`} className='h-[39px] w-full pr-9 ml-2.5 bg-transparent text-sm focus:outline-none focus:ring-0 focus:border-white' />
                                                {index > 1 && (
                                                    <button className='w-6 h-6 absolute right-[0px]  top-1/2 transform -translate-y-1/2' onClick={() => removeInputField(field.id)}>
                                                        <TrashIcon className=' text-gray-400' />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex flex-row w-full justify-between h-fit mt-3 mb-1 items-center'>
                                        <div onClick={addInputField} className={` w-16 h-7 rounded-full flex justify-center items-center ${inputFields.length >= 6 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-reddit_search_light'}`}>
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
                                                            <p onClick={() => setVoteDurationValue('1 Day')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == '1 Day' ? 'bg-reddit_search_light' : ''}`}>1 Day</p>
                                                        </li>
                                                        <li id="vote_2_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue('2 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == '2 Days' ? 'bg-reddit_search_light' : ''}`}>2 Days</p>
                                                        </li>
                                                        <li id="vote_3_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue('3 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == '3 Days' ? 'bg-reddit_search_light' : ''}`}>3 Days</p>
                                                        </li>
                                                        <li id="vote_4_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue('4 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == '4 Days' ? 'bg-reddit_search_light' : ''}`}>4 Days</p>
                                                        </li>
                                                        <li id="vote_5_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue('5 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == '5 Days' ? 'bg-reddit_search_light' : ''}`}>5 Days</p>
                                                        </li>
                                                        <li id="vote_6_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                            <p onClick={() => setVoteDurationValue('6 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == '6 Days' ? 'bg-reddit_search_light' : ''}`}>6 Days</p>
                                                        </li>
                                                        <li id="vote_7_day" className={`cursor-pointer`}>
                                                            <p onClick={() => setVoteDurationValue('7 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${voteDurationValue == '7 Days' ? 'bg-reddit_search_light' : ''}`}>7 Days</p>
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
                        )}


                        <div className='flex flex-row items-center w-full space-x-3 border-b-[0.5px] pb-3 border-gray-400 font-semibold'>
                            <div onClick={() => setIsSpoiler(prev => !prev)} className={`${isSpoiler ? ' bg-black border-black' : 'hover:bg-reddit_search_light'} border-[0.5px] w-24 h-8  rounded-full flex justify-center items-center cursor-pointer `}>
                                {!isSpoiler ? (<PlusIcon className="h-6.5 w-7  text-gray-300" />) : (<CheckIcon className="h-6.5 w-7  text-white" />)}
                                <p className={`no-select ml-1 mr-0.5 ${isSpoiler ? 'text-white' : 'text-gray-300'} text-sm`}>Spoiler</p>
                            </div>
                            <div onClick={() => setIsNSFW(prev => !prev)} className={`${isNSFW ? 'bg-red-500 border-black' : 'hover:bg-reddit_search_light '}  border-[0.5px] w-24 h-8  rounded-full flex justify-center items-center cursor-pointer `}>
                                {!isNSFW ? (<PlusIcon className="h-6.5 w-7  text-gray-300" />) : (<CheckIcon className="h-6.5 w-7  text-black" />)}
                                <p className={`ml-1 no-select mr-0.5 ${isNSFW ? 'text-black' : 'text-gray-300'}  text-sm`}>NSFW</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row space-x-3 mr-3  h-full mt-2.5 mb-2.5 font-semibold ml-auto'>
                        <div className=' hover:bg-gray-400 group  bg-gray-100 w-18 h-9  rounded-full flex justify-center items-center cursor-pointer '>
                            <p className=' ml-1 mr-0.5 group-hover:text-white text-gray-600  text-sm'>Post</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-reddit_search rounded-lg hidden  h-[312px] mt-6 lg:flex py-2 px-2 flex-col w-[418px]'>
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