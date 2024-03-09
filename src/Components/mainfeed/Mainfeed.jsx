import Separator from "../sidebar/Nav-Icons/Separator";
import Share from './Share';
import Comment from './Comment';
import Vote from './Vote';
import redditLogo from '../../assets/reddit_logo.png';
import postImg from '../../assets/post_img.png';
import { useState, useEffect, useRef } from "react";
import { BookmarkIcon, ChevronDownIcon, EllipsisHorizontalIcon, EyeSlashIcon, FlagIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';


// ...



const Mainfeed = () => {
    const [isOpenCateg, setIsOpenCateg] = useState(false);
    const [isOpenView, setIsOpenView] = useState(false);
    const [isOpenDots, setIsOpenDots] = useState(false);

    const menuRefCateg = useRef();
    const menuRefView = useRef();
    const menuRefDots = useRef();

    useEffect(() => {
        let closeDropdown = (e) => {
            if (menuRefCateg.current && !menuRefCateg.current.contains(e.target)) {
                setIsOpenCateg(false);
            }
            if (menuRefView.current && !menuRefView.current.contains(e.target)) {
                setIsOpenView(false);
            }
            if (menuRefDots.current && !menuRefDots.current.contains(e.target)) {
                setIsOpenDots(false);
            }
        };
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    });


    return (
        <div className="flex flex-col w-full h-full bg-reddit_greenyDark no-select px-1 py-1">
            <div className="flex items-center h-12 mb-2 px-2 w-full" >

                <div ref={menuRefCateg} className="relative">
                    <div onClick={() => setIsOpenCateg((prev) => !prev)} className={`flex w-14 h-7 rounded-full hover:bg-reddit_search_light ${isOpenCateg ? 'bg-reddit_search_light' : ''} justify-center items-center cursor-pointer`}>
                        <p className='text-gray-500 font-semibold text-xs no-select '>Best</p>
                        <ChevronDownIcon className='h-3 ml-0.5 w-3 text-gray-400' />
                    </div>

                    {isOpenCateg && (
                        <div className=' w-20 h-72 bg-reddit_lightGreen absolute mt-2.5 -ml-2.5 text-white text-sm pt-2.5 z-1 rounded-lg  font-extralight flex flex-col'>
                            <div className='w-full pl-4 rounded-lg h-9 flex items-center font-normal'>
                                <p className='no-select'>Sort by</p>
                            </div>
                            <div className='w-full pl-4 hover:bg-reddit_hover h-12 flex items-center cursor-pointer'>
                                <p className='no-select'>Best</p>
                            </div>
                            <div className='w-full pl-4 hover:bg-reddit_hover h-12 flex items-center cursor-pointer'>
                                <p className='no-select'>Hot</p>
                            </div>
                            <div className='w-full pl-4  hover:bg-reddit_hover h-12 flex items-center cursor-pointer'>
                                <p className='no-select'>New</p>
                            </div>
                            <div className='w-full pl-4  hover:bg-reddit_hover h-12 flex items-center cursor-pointer'>
                                <p className='no-select'>Top</p>
                            </div>
                            <div className='w-full pl-4  hover:bg-reddit_hover h-12 flex items-center cursor-pointer rounded-b-lg'>
                                <p className='no-select'>Rising</p>
                            </div>
                        </div>
                    )}
                </div>

                <div ref={menuRefView} className="relative">
                    <div onClick={() => setIsOpenView((prev) => !prev)} className={`flex w-14 h-7 rounded-full hover:bg-reddit_search_light ${isOpenView ? 'bg-reddit_search_light' : ''} justify-center items-center cursor-pointer`} >
                        <ViewColumnsIcon className='h-4.5 w-5 text-gray-500 rotate-90' />
                        <ChevronDownIcon className='h-3 ml-0.5 w-3 text-gray-400' />
                    </div>

                    {isOpenView && (
                        <div className=' w-30 h-33 bg-reddit_lightGreen absolute -ml-7 mt-2.5 text-white text-sm pt-2 z-1 rounded-lg  font-extralight flex flex-col'>
                            <div className='w-full pl-3  rounded-lg h-8 flex items-center font-medium'>
                                <p className='no-select'>View</p>
                            </div>
                            <div className='w-full pl-6 hover:bg-reddit_hover h-11 flex items-center cursor-pointer'>
                                <ViewColumnsIcon className='h-4.5 w-5 text-white rotate-90' />
                                <p className='ml-2 no-select'>Card</p>
                            </div>
                            <div className='w-full pl-6 hover:bg-reddit_hover h-11 flex rounded-b-lg items-center cursor-pointer'>
                                <ViewColumnsIcon className='h-4.5 w-5 text-white rotate-90' />
                                {/* Todo change the icon, make the buttons change color when clicked, and when any click anyhwere else, close the dropdown */}
                                <p className='ml-2 no-select'>Classic</p>
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <div className=" h-1 flex w-full">
                <Separator />
            </div>

            {/*Todo height here will be dynamic */}
            <div className={`flex flex-col bg-reddit_greenyDark hover:bg-reddit_hover ${isOpenDots ? 'bg-reddit_hover' : ''} px-3 pt-2.5 mt-1 pb-1 rounded-2xl w-full cursor-pointer h-fit`}>

                <div className='flex flex-row items-center w-full h-6 '>
                    <img src={redditLogo} alt="Logo" className="w-6 h-6" />

                    {/*Todo all data here will be dynamic */}
                    <p className='text-gray-300 font-semibold text-xs ml-1.5 hover:text-cyan-600'>r/DunderMifflin</p>
                    <p className='text-gray-400 font-bold text-xs ml-2 mb-1.5'>.</p>
                    <p className='text-gray-400 font-extralight text-xs ml-1.5'>40 min. ago</p>

                    <div ref={menuRefDots} className="relative ml-auto">
                        <div className='h-7 w-7 ml-auto text-white rounded-full flex justify-center items-center hover:bg-reddit_search_light'>
                            <EllipsisHorizontalIcon onClick={() => setIsOpenDots((prev) => !prev)} className='h-6 w-6 outline-none' />
                        </div>

                        {isOpenDots && (
                            <div className='z-1 w-30 h-37 bg-reddit_lightGreen absolute -ml-20 mt-1 text-white text-sm py-2 rounded-lg font-extralight flex flex-col'>

                                <div className='w-full pl-6 hover:bg-reddit_hover h-12 flex items-center cursor-pointer'>
                                    <BookmarkIcon className='h-4.5 w-5 text-white ' />
                                    <p className='ml-2 no-select'>Save</p>
                                </div>
                                <div className='w-full pl-6 hover:bg-reddit_hover h-12 flex rounded-b-lg items-center cursor-pointer'>
                                    <EyeSlashIcon className='h-4.5 w-5 text-white' />
                                    {/* Todo change the icon, make the buttons change color when clicked, and when any click anyhwere else, close the dropdown */}
                                    <p className='ml-2 no-select'>Hide</p>
                                </div>

                                <div className='w-full pl-6 hover:bg-reddit_hover h-12 flex rounded-b-lg items-center cursor-pointer'>
                                    <FlagIcon className='h-4.5 w-5 text-white ' />
                                    {/* Todo change the icon, make the buttons change color when clicked, and when any click anyhwere else, close the dropdown */}
                                    <p className='ml-2 no-select'>Report</p>
                                </div>

                            </div>
                        )}
                    </div>

                </div>



                <div className='mt-1 w-full flex  flex-col'>
                    <div className='text-white mt-1.5 font-medium text-lg'>
                        <h1>Ignoring the fact that Karen = Ann, who from Parks and Rec would have made a fine addition to The Office (or vice versa)?</h1>
                    </div>

                    <div className='text-gray-400 text-sm mt-1.5'>
                        <p>Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation,
                            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
                            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
                            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
                        </p>
                    </div>

                    <div className='w-full h-full mt-2'>
                        <img src={postImg} alt="Post" className='rounded-2xl' />
                    </div>
                </div>


                <div className='flex flex-row items-center w-full h-13 space-x-2.5 no-select '>
                    <Vote />
                    <Comment />
                    <Share />
                </div>


            </div>

            <div className="flex flex-col bg-reddit_greenyDark hover:bg-reddit_hover px-3 pt-2.5 mt-1 pb-1 rounded-2xl w-full cursor-pointer h-fit">

                <div className='flex flex-row items-center w-full h-6 '>
                    <img src={redditLogo} alt="Logo" className="w-6 h-6" />

                    {/*Todo all data here will be dynamic */}
                    <p className='text-gray-300 font-semibold text-xs ml-1.5 hover:text-cyan-600'>r/DunderMifflin</p>
                    <p className='text-gray-400 font-bold text-xs ml-2 mb-1.5'>.</p>
                    <p className='text-gray-400 font-extralight text-xs ml-1.5'>40 min. ago</p>

                    {/*Todo make the ellipse menu here wil */}
                    <div className='h-7 w-7 ml-auto text-white rounded-full flex justify-center items-center hover:bg-reddit_search_light'>
                        <EllipsisHorizontalIcon className='h-6 w-6' />
                    </div>


                </div>


                <div className='mt-1 w-full flex flex-col'>
                    <div className='text-white mt-1.5 font-medium text-lg'>
                        <h1>Ignoring the fact that Karen = Ann, who from Parks and Rec would have made a fine addition to The Office (or vice versa)?</h1>
                    </div>

                    <div className='text-gray-400 text-sm mt-1.5'>
                        <p>Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation,
                            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
                            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
                            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
                        </p>
                    </div>

                    <div className='w-full h-full mt-2'>
                        <img src={postImg} alt="Post" className='rounded-2xl' />
                    </div>
                </div>


                <div className='flex flex-row items-center w-full h-13 space-x-2.5 no-select '>
                    <Vote />
                    <Comment />
                    <Share />
                </div>


            </div>

            <div className="flex flex-col bg-reddit_greenyDark hover:bg-reddit_hover px-3 pt-2.5 mt-1 pb-1 rounded-2xl w-full cursor-pointer h-fit">

                <div className='flex flex-row items-center w-full h-6 '>
                    <img src={redditLogo} alt="Logo" className="w-6 h-6" />

                    {/*Todo all data here will be dynamic */}
                    <p className='text-gray-300 font-semibold text-xs ml-1.5 hover:text-cyan-600'>r/DunderMifflin</p>
                    <p className='text-gray-400 font-bold text-xs ml-2 mb-1.5'>.</p>
                    <p className='text-gray-400 font-extralight text-xs ml-1.5'>40 min. ago</p>

                    {/*Todo make the ellipse menu here wil */}
                    <div className='h-7 w-7 ml-auto text-white rounded-full flex justify-center items-center hover:bg-reddit_search_light'>
                        <EllipsisHorizontalIcon className='h-6 w-6' />
                    </div>


                </div>


                <div className='mt-1 w-full flex flex-col'>
                    <div className='text-white mt-1.5 font-medium text-lg'>
                        <h1>Ignoring the fact that Karen = Ann, who from Parks and Rec would have made a fine addition to The Office (or vice versa)?</h1>
                    </div>

                    <div className='text-gray-400 text-sm mt-1.5'>
                        <p>Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation,
                            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
                            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
                            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
                        </p>
                    </div>

                    <div className='w-full h-full mt-2'>
                        <img src={postImg} alt="Post" className='rounded-2xl' />
                    </div>
                </div>


                <div className='flex flex-row items-center w-full h-13 space-x-2.5 no-select '>
                    <Vote />
                    <Comment />
                    <Share />
                </div>


            </div>


            <div className="flex flex-col bg-reddit_greenyDark hover:bg-reddit_hover px-3 pt-2.5 mt-1 pb-1 rounded-2xl w-full cursor-pointer h-fit">

<div className='flex flex-row items-center w-full h-6 '>
    <img src={redditLogo} alt="Logo" className="w-6 h-6" />

    {/*Todo all data here will be dynamic */}
    <p className='text-gray-300 font-semibold text-xs ml-1.5 hover:text-cyan-600'>r/DunderMifflin</p>
    <p className='text-gray-400 font-bold text-xs ml-2 mb-1.5'>.</p>
    <p className='text-gray-400 font-extralight text-xs ml-1.5'>40 min. ago</p>

    {/*Todo make the ellipse menu here wil */}
    <div className='h-7 w-7 ml-auto text-white rounded-full flex justify-center items-center hover:bg-reddit_search_light'>
        <EllipsisHorizontalIcon className='h-6 w-6' />
    </div>


</div>


<div className='mt-1 w-full flex flex-col'>
    <div className='text-white mt-1.5 font-medium text-lg'>
        <h1>Ignoring the fact that Karen = Ann, who from Parks and Rec would have made a fine addition to The Office (or vice versa)?</h1>
    </div>

    <div className='text-gray-400 text-sm mt-1.5'>
        <p>Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation,
            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
            Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation
        </p>
    </div>

    <div className='w-full h-full mt-2'>
        <img src={postImg} alt="Post" className='rounded-2xl' />
    </div>
</div>


<div className='flex flex-row items-center w-full h-13 space-x-2.5 no-select '>
    <Vote />
    <Comment />
    <Share />
</div>


</div>
        </div>
    );
}

export default Mainfeed;