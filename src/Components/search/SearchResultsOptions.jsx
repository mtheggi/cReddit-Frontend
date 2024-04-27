import SwitchButton from "@/Components/createCommunity/SwitchButton";
import { ChevronDoubleDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Separator from "../sidebar/Nav-Icons/Separator";
import { useContext, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const SearchResultsOptions = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const changePath = (newPath) => {
        const currentPath = location.pathname;
        const newPathname = currentPath.substring(0, currentPath.lastIndexOf('/')) + '/' + newPath;
        navigate(newPathname);
    }
    return (
        <div className="flex-col ml-5 flex">
            <div id="results_options" className="flex-col flex md:flex-row w-full mt-2.5 h-fit ">
                <div className="flex flex-row w-fit h-[80px] items-center">
                    <h1 className="text-[12px] font-medium text-[#82949B] mr-4 ">SEARCH RESULTS</h1>

                    <div className="flex space-x-6 overflow-x-auto flex-row">
                        <div onClick={() => changePath('posts')} className={`w-16 no-select h-10 flex flex-row justify-center items-center ${location.pathname.endsWith("posts") ? 'bg-[#33464C]' : 'hover:bg-reddit_hover'}  rounded-3xl cursor-pointer`}>
                            <h1 id="posts_option" className="text-[14px] font-medium text-gray-200">Posts</h1>
                        </div>

                        <div onClick={() => changePath('communities')} className={`w-28 no-select h-10 flex flex-row justify-center items-center ${location.pathname.endsWith("communities") ? 'bg-[#33464C]' : 'hover:bg-reddit_hover'}  rounded-3xl cursor-pointer`}>
                            <h1 id="communities_option" className="text-[14px] font-medium text-gray-200 ">Communities</h1>
                        </div>

                        <div onClick={() => changePath('comments')} className={`w-24 no-select h-10 flex flex-row justify-center ${location.pathname.endsWith("comments") ? 'bg-[#33464C]' : 'hover:bg-reddit_hover'}  items-center   rounded-3xl cursor-pointer`}>
                            <h1 id="comments_option" className="text-[14px] font-medium text-gray-200 ">Comments</h1>
                        </div>

                        <div onClick={() => changePath('people')} className={`w-18 no-select h-10 flex flex-row justify-center ${location.pathname.endsWith("people") ? 'bg-[#33464C]' : 'hover:bg-reddit_hover'}  items-center rounded-3xl cursor-pointer`}>
                            <h1 id="people_option" className="text-[14px] font-medium text-gray-200 ">People</h1>
                        </div>
                    </div>
                </div>

                <div id="ismature_switch_btn_search" className="flex flex-row md:items-center h-[40px] md:h-[80px] md:ml-auto mr-7 font-light w-[140px]">
                    <h1 className="mr-[20px] text-white text-[14px]">Safe Search</h1>
                    <div className="-mt-2.5">
                        <SwitchButton />
                    </div>
                </div>

            </div>



            {!location.pathname.endsWith("/people") && !location.pathname.endsWith("/communities") ?
                <div className="flex-row flex md:-mt-1.5 items-center">

                    <div className="flex flex-row min-w-fit items-center mr-10">
                        <h1 className="text-[#637278] mr-4 text-[12px]">Sort by: </h1>

                        <div className="flex flex-row justify-center items-center w-[122px] h-8 hover:bg-reddit_search_light cursor-pointer rounded-3xl">
                            <svg rpl="" fill="#82949B" height="16" icon_name="best-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 10.011v-.445A10.264 10.264 0 0 0 10.273.221L10 .087l-.273.134A10.263 10.263 0 0 0 4 9.566v.445a3.727 3.727 0 0 0-3 3.7v3.141A1.14 1.14 0 0 0 2.125 18h15.75A1.14 1.14 0 0 0 19 16.852v-3.141a3.727 3.727 0 0 0-3-3.7ZM2.25 16.75v-3.039A2.493 2.493 0 0 1 4 11.3v5.45H2.25Zm12.5 0h-9.5V9.566A9.037 9.037 0 0 1 10 1.483a9.037 9.037 0 0 1 4.75 8.083v7.184Zm3 0H16V11.3a2.493 2.493 0 0 1 1.75 2.416v3.034ZM7 18.75h6V20H7v-1.25ZM7 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm4.75 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z"></path>
                            </svg>
                            <h1 id="sort_options" className="text-[12px] ml-2 text-[#83959B]">Relevance</h1>
                            <ChevronDownIcon className="w-4 text-gray-400 ml-1 h-4" />
                        </div>



                        <div className="flex flex-row ml-4 justify-center items-center w-[110px] h-8 hover:bg-reddit_search_light cursor-pointer rounded-3xl">
                            <svg rpl="" fill="#82949B" height="16" icon_name="calendar-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.374 2H16V.25h-1.25V2h-9.5V.251H4V2H2.626A1.627 1.627 0 0 0 1 3.626v13.748A1.627 1.627 0 0 0 2.626 19h14.748A1.627 1.627 0 0 0 19 17.374V3.626A1.627 1.627 0 0 0 17.374 2ZM2.626 3.25H4v1h1.25v-1h9.5v1H16v-1h1.374a.377.377 0 0 1 .376.376V7H2.25V3.626a.377.377 0 0 1 .376-.376Zm14.748 14.5H2.626a.377.377 0 0 1-.376-.376V8.25h15.5v9.124a.378.378 0 0 1-.376.376Z"></path>
                            </svg>
                            <h1 id="sort_options" className="text-[12px] ml-2 text-[#83959B]">All Time</h1>
                            <ChevronDownIcon className="w-4 text-gray-400 ml-1 h-4" />
                        </div>
                    </div>

                    <div className="w-full flex flex-row items-center pr-6 ">
                        <hr className="w-full h-[0.5px] text-gray-400" />
                    </div>

                </div> :
                <div className="mt-[10px] h-4">
                     <div className="w-full flex flex-row items-center pr-6 ">
                        <hr className="w-full h-[0.5px] text-gray-400" />
                    </div>
                </div>}
        </div>

    );
}

export default SearchResultsOptions;