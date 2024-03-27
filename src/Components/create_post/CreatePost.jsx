import { Link, PhotoOutlined, Poll, PollOutlined, PostAddOutlined } from '@mui/icons-material';
import { CheckIcon, ExclamationCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react';
import Post from './Post';
import { v4 as uuidv4 } from 'uuid';

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

                <div className='w-full h-[40px] ml-[0.2px] mt-3'>
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
                        <svg className="_1XXU14d6sjwsheKLMcy7ro" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 43"><g fill="none" fill-rule="evenodd"><g fill="#0DD3BB" transform="translate(0 4)"><ellipse cx="25.492" cy="22.2631" transform="rotate(5 25.492 22.263)" rx="17.6396" ry="13.9883"></ellipse><ellipse cx="19.3519" cy="17.9699" transform="rotate(5 19.352 17.97)" rx="14.7297" ry="16.0688"></ellipse><ellipse cx="14.0251" cy="27.7862" transform="rotate(5 14.025 27.786)" rx="8.4751" ry="8.9243"></ellipse><ellipse cx="11.808" cy="17.4531" transform="rotate(5 11.808 17.453)" rx="10.7695" ry="10.8575"></ellipse><ellipse cx="12.1168" cy="22.4429" transform="rotate(5 12.117 22.443)" rx="8.4751" ry="8.9243"></ellipse></g><path fill="#FFF" d="M35.6875 31.5625c-1.3275 1.8696-6.7017 5.0483-8.7188 6.0313-2.0174.983-13.478 2.1465-15.625-.6876-1.5625-2.0624-.9687-4.625 1-6.1562C9.6563 29.2812 8.125 27.8437 7 24.9062c-.0872-.2277-1.1015-1.763-.875-1.7812l.9375-4.0313c.8158-2.9308 4.2118-5.1638 6.7992-6.5715 2.3198-1.2615 4.9067-1.934 7.5113-2.1714 2.1052-.192 4.259-.101 6.277.554 2.0182.6552 4.2956 1.063 5.5063 2.8765 0 0 1.5532 3.6305 1.6736 5.5487.1204 1.9177-2.0402 6.1206-2.0402 6.1206"></path><path fill="#FFF" d="M31.5665 34.5708c.6293 1.944.9 4.0143.794 6.0635 0 0-.473 1.3654-6.7204 1.3654-6.2478 0-7.6077-.7104-7.6077-.7104.047-1.224.0518-2.4493.014-3.6732-.0028-.097.0414-.2356.13-.2062l-.1555-7.319 12.5354-2.0634c.4433.252.8525.5696 1.211.9412l-.2007 5.6022z"></path><path fill="#FF0" d="M34.0514 21.4676c-.3642.8707-.5738 1.8017-.8143 2.7188-.601 2.29-1.4044 4.5218-2.3967 6.658.1578.0357.3286.0014.4624-.0927.072.7567 1.0046 1.1686 1.678.8836.6734-.2846 1.071-1.0334 1.2235-1.777.0223-.1084.0407-.2198.0277-.33-.0202-.1737-.114-.3265-.1996-.477-.6817-1.2056-.9025-2.6877-.6033-4.0528.099-.4518.2715-.9186.6318-1.1878.2046-.1536.452-.2293.6975-.2872.6156-.146 1.2512-.198 1.8812-.154l.33-1.1467c.054-.1864.108-.3773.0993-.572-.0212-.4554-.393-.8263-.8058-.9727-.412-.1463-.8604-.115-1.2947-.0823"></path><path fill="#F15A24" d="M12.322 21.7194c.061.3407.127.693.3168.977.3034.4517.85.6324 1.3573.785.3797.1136.7785.2284 1.165.141.2643-.0598.5012-.2104.725-.3697.61-.433 1.1792-.9615 1.5326-1.6395.3962-.7593.4926-1.684.2625-2.5148-.0912-.3294-.2458-.6615-.524-.843-.2292-.1494-.5564-.2205-.6293-.4927-.1057-.3946-1.938-.4537-2.25-.4202-.474.051-.939.1728-1.2797.5403-.9068.9784-.8953 2.613-.676 3.8366M24.194 19.0418c.0644.3482.1334.708.3344.998.3193.462.8963.6468 1.431.8023.4005.1164.8212.234 1.2286.1447.2793-.0614.529-.2154.7647-.3776.644-.443 1.244-.983 1.617-1.6756.4174-.776.5195-1.7205.2768-2.5694-.0964-.3366-.2596-.6762-.5526-.8614-.242-.1528-.587-.2255-.664-.5037-.1117-.4033-2.0443-.464-2.3736-.4297-.4998.052-.9902.1766-1.3498.5523-.9564 1-.9442 2.67-.7126 3.9202"></path><path fill="#CCC" d="M35.9408 20.9708c.222.0064.4462.0053.6533.066.4068.1196.9188.5786.945-.1845.007-.1902.012-.3904-.0708-.56-.122-.251-.5983-.9602-.824-1.087-.1087-.061-.236-.0694-.359-.073-.3063-.0092-.613.0014-.9182.0315-.9906.0986-.7374 1.4513.01 1.725.177.0647.3693.0764.5638.082"></path><path fill="#FF7BAC" d="M37.8215 19.8532c-.0306.0467-.0694.0968-.123.099-.0946.0034-.1258-.128-.1816-.2085-.0644-.0938-.1824-.1258-.29-.1506-.4784-.112-1.163-.1415-1.5974-.3738-.4688-.251-.4095-.3117-.2434-.8975.178-.6268.4606-1.3722 1.071-1.6617 2.0532-.9728 2.1506 1.9814 1.3643 3.1932"></path><path fill="#FF0" d="M30.808 32.959c.0077.0694.0343.1556.1004.1593-.0834-.0335-.1158.1122-.095.203.429.0508.8583.1012 1.2877.152.263.0313.5674.0482.752-.151.1304-.141.16-.3512.1825-.5462.032-.274.064-.548.0964-.822.0082-.0724.0135-.1552-.0336-.2086-.034-.0388-.087-.051-.137-.0588-.219-.0327-.446-.0064-.6532.075-.6713.2642-.6634-.6747-1.1966-.4688-.4516.1747-.346 1.279-.3035 1.6663"></path><path fill="#FFF" d="M31.9858 34.3613c.3538.146.738.196 1.1182.2014 2.1213.03 4.1668-1.396 5.0646-3.4086.8978-2.0117.661-4.4994-.4998-6.3584-.514-.8238-1.3235-1.5857-2.2608-1.5168-.594.0433-1.1344.429-1.4745.9404-.3405.5112-.499 1.1347-.552 1.7558-.1233 1.4442.3143 2.9324 1.1923 4.053"></path><path fill="#F7E1CB" d="M11.2195 30.4984l9.4083-2.7606 1.318 7.9058-7.4904 2.7607"></path><path fill="#FFF" d="M12.7516 37.7683c.2136.2304.5864.1393.8525-.0207 1.096-.6588 1.5454-2.1516 1.337-3.4564-.108-.6758-.3805-1.3463-.877-1.792-.4966-.446-1.243-.6212-1.827-.3125-.402.212-.682.6167-.8776 1.041-.4437.9637-.5192 2.107-.206 3.1258.1683.548.462 1.0782.9255 1.388.4637.3095 1.1184.3464 1.543-.0195"></path><g><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M27.37 11.0563c-2.068-.6386-4.2747-.727-6.4318-.54-2.669.2313-5.8933.8336-7.6967 2.1168-.6986.4972-3.0193 1.2145-3.5257 3.1977"></path><path fill="#FFF" d="M10.0543 14.9054c-1.561-.3985-3.317.0782-4.4594 1.2103-1.1422 1.132-1.726 2.906-1.237 4.4356.5752 1.8004 1.926 3.0712 2.306 3.275"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M10.0543 14.9054c-1.561-.3985-3.317.0782-4.4594 1.2103-1.1422 1.132-1.7258 2.906-1.237 4.4356.5756 1.8004 1.926 3.0712 2.306 3.275"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M11.823 29.9606c-2.7657-.9024-4.92-3.4455-5.3476-6.3126-.034-.2298.0103-.55.2428-.5677M33.1486 15.4973c.192.314.384.6286.576.9427.114.1872.2283.374.33.5677.5276 1.003.7084 2.182.5062 3.2958M35.8308 16.6844c-1.6376 4.9262-3.3644 9.8235-5.1785 14.688"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M35.671 17.0804c.2263-.288.586-.4587.9517-.4895.366-.0313.736.0692 1.0563.2483.2708.1508.515.364.6543.6404.1393.276.161.6202.0118.8913M38.3983 17.8874c-.6142 1.9982-1.3304 3.9652-2.145 5.891"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M37.245 21.08c.2485-.5347.1342-1.2158-.2747-1.641-.4093-.425-1.0872-.5678-1.6347-.3436-.1367.0562-.278.1512-.301.297"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M37.2275 21.501c.0044-.5535-.3094-1.0984-.791-1.374-.482-.2753-1.113-.2705-1.5904.012"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M34.2996 20.788c.7136-.389 1.6686-.2757 2.2706.269.2052.1856.376.4304.3964.706.006.0785-.0008.1578-.0196.2345M31.8127 33.921c.3626.1424.7564.1912 1.1458.1963 2.1737.0294 4.2697-1.3607 5.1896-3.3225.92-1.961.6773-4.386-.512-6.1982-.5268-.803-1.3562-1.5457-2.3166-1.4785-.6087.0423-1.1624.4184-1.511.9168-.3488.4983-.5113 1.106-.5655 1.7115-.1264 1.4077.322 2.8584 1.2216 3.9508M33.9912 29.3915l-1.467 4.0393M32.6352 33.0774c-.951.6286-1.8904 1.2738-2.8177 1.935"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M30.6496 31.0486l-.6455 4.1743c-.0058.0366-.0053.083.0385.099.044.0162.0833-.0547.0346-.0517"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M30.1422 33.367c.1982-.3278.4635-.6147.7748-.8386.078.1534.1257.3226.139.4943.287-.1218.5986-.183.9103-.1802-.3703.3692-.701.778-.9844 1.2173"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M31.195 33.0817c-.389.5013-.7464 1.0268-1.0695 1.5725.0302-.0257.0604-.0514.0902-.0775M30.7412 32.969c.0104.3634-.12.7275-.3766 1.0607M32.6658 33.0168c.1094-.676.1787-1.3585.2074-2.0422-.326.1956-.6525.3912-.979.5872-.1045.0627-.2386.1262-.3414.06-.063-.04-.091-.1166-.1135-.1874-.133-.4158-.2417-.8396-.3253-1.2682-.291.3247-.547.6807-.7626 1.0594"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M33.4372 28.176c-.177.4906-.354.9812-.5313 1.472-.285.7874-.5726 1.5822-1.0206 2.291M36.2456 21.1264c.048-.0176.0608-.0917.0218-.1244-.3043.6815-.5497 1.3883-.732 2.1112M30.4806 30.95c-.0843.2098-.1095.43-.074.6453M32.6366 25.235c-1.3602 1.8225-3.2855 3.1704-5.3524 4.1286-2.0672.958-4.284 1.55-6.5023 2.0763M30.348 27.747c.454.2455.8732.5552 1.24.9174M31.3832 34.1252c.6447 1.895.9225 3.913.8134 5.9105"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M20.2203 27.5033c.529 2.5225.9453 5.069 1.2474 7.6282.0048.042.0063.0925-.0276.1178-.0345.0253-.095-.029-.0603-.0536"></path><path stroke="#000" d="M21.462 35.1753c-2.4317 1.1842-4.9882 2.113-7.614 2.7662-.0714.0177-.1587.031-.208-.023-.0494-.0544.038-.1667.0828-.1083" stroke-linecap="round" stroke-linejoin="round"></path><path stroke="#000" d="M13.3965 36.9094l.6482 1.51c-.01-.0428-.0207-.086-.0312-.129" stroke-linecap="round" stroke-linejoin="round"></path><path stroke="#000" d="M12.104 37.242c.219.2246.601.1358.8735-.0202 1.123-.6422 1.5835-2.0972 1.3698-3.369-.111-.659-.3898-1.3124-.8986-1.747-.5087-.4348-1.2736-.6054-1.872-.3045-.4118.2066-.6988.601-.8992 1.0147-.4546.9394-.532 2.054-.211 3.047.1723.5342.4733 1.051.9482 1.353.4753.3016 1.1462.3376 1.5813-.019M10.6766 30.3595c-.0715-.0158-.065.1064-.022.1655l.7927 1.0914c.011.0154.0276.0326.0457.0264.018-.006.0015-.0418-.01-.0268M10.6893 30.2222c3.1114-1.025 6.255-1.953 9.425-2.782.0814.1758.1628.352.2443.5274" stroke-linecap="round" stroke-linejoin="round"></path><path stroke="#000" d="M17.6433 28.0588c-.2222-.2202-.246-.6037-.5073-.7755-.2244-.148-.522-.0737-.7792.0048-1.0368.3175-2.073.6346-3.11.952-.2287.07-.4843.163-.579.382-.1275.2944.111.6096.332.843M13.849 27.877c-.025-.1897.085-.3783.2402-.4906.1554-.1123.349-.1592.5393-.1816.302-.0364.678.0275.7848.3115M17.774 36.8926c-.1595-.0286-.2392.1064-.234.201.068 1.193.0596 2.3876-.0247 3.5806M27.3276 14.627c-1.155-.254-2.4348.1776-3.1982 1.0778-.763.9005-.975 2.23-.5294 3.3214.203.498.537.9487.9825 1.252.757.5157 1.7714.556 2.64.263.9157-.3095 1.7137-.983 2.115-1.8592.401-.8763.3797-1.9464-.108-2.7783-.4875-.8312-1.447-1.3828-2.412-1.3303" stroke-linecap="round" stroke-linejoin="round"></path><path stroke="#000" stroke-width=".5" stroke-linecap="round" stroke-linejoin="round" d="M15.604 17.5287c-.993-.5754-2.3376-.3743-3.2093.371-.872.745-1.2777 1.9505-1.1753 3.0903.038.4224.1422.845.359 1.2103.4368.7372 1.309 1.1618 2.168 1.1684.8592.007 1.6937-.3673 2.346-.924.2724-.2316.518-.497.7086-.799.465-.738.5666-1.6924.2675-2.511-.2992-.8188-.993-1.485-1.8255-1.7524"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M25.8734 23.061c.019.8443.036 1.706-.2144 2.513-.3128 1.0058-1.0497 1.8733-1.9936 2.347-.9442.4738-2.0827.547-3.0803.1982"></path><path fill="#000" d="M24.826 27.045c-.909 1.0263-2.4282 1.5463-3.7262 1.098-.325-.1124-.682-.385-.5983-.7172-.305-.1123-.6554.132-.9616.024-.1132-.0405-.2045-.124-.2882-.21-.507-.519-.8602-1.1846-1.0054-1.894 1.3742.2257 2.797.237 4.147-.1035.6403-.1614 1.2614-.404 1.8365-.7284.2493-.1406 1.482-1.2717 1.6324-1.2287.3404.0972-.014 1.6884-.081 1.9398-.1798.6673-.4952 1.3003-.9554 1.82"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M24.826 27.045c-.909 1.0263-2.4282 1.5463-3.7262 1.098-.325-.1124-.682-.385-.5983-.7172-.305-.1123-.6554.132-.9616.024-.1132-.0405-.2045-.124-.2882-.21-.507-.519-.8602-1.1846-1.0054-1.894 1.3742.2257 2.797.237 4.147-.1035.6403-.1614 1.2614-.404 1.8365-.7284.2493-.1406 1.482-1.2717 1.6324-1.2287.3404.0972-.014 1.6884-.081 1.9398-.1798.6673-.4952 1.3003-.9554 1.82z"></path><path fill="#FFF" d="M27.1593 11.0486c.356-.539.901-.9515 1.5182-1.148.3725-.1184.7656-.1595 1.157-.1632 1.2186-.011 2.452.3553 3.4137 1.1013.9616.7464 1.63 1.8822 1.7275 3.0925l.0405 1.2437c.0792.8083-.1735 1.644-.687 2.274-.0244.03-.0506.0716-.0296.1038.021.0323.0833-.0212.0465-.033"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M27.1593 11.0486c.356-.539.901-.9515 1.5182-1.148.3725-.1184.7656-.1595 1.157-.1632 1.2186-.011 2.452.3553 3.4137 1.1013.9616.7464 1.63 1.8822 1.7275 3.0925l.0405 1.2437c.0792.8083-.1735 1.644-.687 2.274-.0244.03-.0506.0716-.0296.1038.021.0323.0833-.0212.0465-.033M19.0092 10.923c-.1602-.079-.1772-.2954-.172-.4733.078-2.7703.1672-5.5993 1.1384-8.1964 1.835.0793 3.6632.3303 5.4515.7494"></path><path fill="#FFF" d="M24.8624 3.1944c-.9362 1.032-.8485 2.7633.0626 3.8172.9108 1.0536 2.4758 1.4224 3.826 1.0687.64-.1677 1.2505-.4896 1.6915-.981 1.0054-1.121.9137-2.9152.1555-4.215-.237-.407-.534-.784-.9052-1.075-.72-.5643-1.7132-.7643-2.597-.5235-.883.241-1.6355.917-1.9667 1.768"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M24.8624 3.1944c-.9362 1.032-.8485 2.7633.0626 3.8172.9108 1.0536 2.4758 1.4224 3.826 1.0687.64-.1677 1.2505-.4896 1.6915-.981 1.0054-1.121.9137-2.9152.1555-4.215-.237-.407-.534-.784-.9052-1.075-.72-.5643-1.7132-.7643-2.597-.5235-.883.241-1.6355.917-1.9667 1.768"></path></g></g></svg>
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