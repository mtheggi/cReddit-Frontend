import SwitchButton from "@/Components/createCommunity/SwitchButton";
import { ChevronDoubleDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Separator from "../sidebar/Nav-Icons/Separator";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const SearchResultsOptions = ({ isSafe, setIsSafe, sortTime, sortType, setSortTime, setSortType }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [isOpenSortType, setIsOpenSortType] = useState(false);
    const [isOpenSortTime, setIsOpenSortTime] = useState(false);
    const sortTypeRef = useRef();
    const sortTimeRef = useRef();

    useEffect(() => {
        let closeDropdown = (e) => {
            if (sortTypeRef.current && !sortTypeRef.current.contains(e.target)) {
                setIsOpenSortType(false);
            }
            if (sortTimeRef.current && !sortTimeRef.current.contains(e.target)) {
                setIsOpenSortTime(false);
            }
        };
        document.addEventListener("click", closeDropdown);
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    });


    useEffect(() => {
        localStorage.setItem('sortType', sortType);
        localStorage.setItem('sortTime', sortTime);
    }, [sortType, sortTime]);

    const changePath = (newPath) => {
        const currentPath = location.pathname;
        const newPathname = currentPath.substring(0, currentPath.lastIndexOf('/')) + '/' + newPath;
        navigate(newPathname);
    }
    return (
        <div className="flex-col ml-[20px] mr-2 flex">
            <div id="results_options" className="flex-col flex lg:flex-row w-full mt-2.5 h-fit">
                <div className="flex flex-row  w-full md:w-fit h-[100px] mmsm:h-[80px] mmsm:items-center">
                    <h1 className="text-[12px] md:block hidden font-medium text-[#82949B] mr-4 ">SEARCH RESULTS</h1>

                    <div className="flex space-x-7  md:space-x-6 md:w-fit w-full xs:justify-between md:justify-start overflow-x-auto flex-wrap flex-row">
                        <div id="posts_option" onClick={() => changePath('posts')} className={`w-16 no-select h-10 flex flex-row justify-center items-center ${location.pathname.endsWith("posts") ? 'bg-[#33464C]' : 'hover:bg-reddit_hover'}  rounded-3xl cursor-pointer`}>
                            <h1  className="text-[14px] font-medium text-gray-200">Posts</h1>
                        </div>

                     {!(location.pathname.includes("/r/") || location.pathname.includes("/user/") || location.pathname.includes("/my-user/")  )&&  <div  id="communities_option"  onClick={() => changePath('communities')} className={`w-28 no-select h-10 flex flex-row justify-center items-center ${location.pathname.endsWith("communities") ? 'bg-[#33464C]' : 'hover:bg-reddit_hover'}  rounded-3xl cursor-pointer`}>
                            <h1 className="text-[14px] font-medium text-gray-200 ">Communities</h1>
                        </div>}

                        <div id="comments_option" onClick={() => changePath('comments')} className={`w-24 no-select h-10 flex flex-row justify-center ${location.pathname.endsWith("comments") ? 'bg-[#33464C]' : 'hover:bg-reddit_hover'}  items-center   rounded-3xl cursor-pointer`}>
                            <h1  className="text-[14px] font-medium text-gray-200 ">Comments</h1>
                        </div>

                    { !(location.pathname.includes("/r/") || location.pathname.includes("/user/") || location.pathname.includes("/my-user/")  ) &&  <div id="people_option" onClick={() => changePath('people')} className={`w-18 no-select h-10 flex flex-row justify-center ${location.pathname.endsWith("people") ? 'bg-[#33464C]' : 'hover:bg-reddit_hover'}  items-center rounded-3xl cursor-pointer`}>
                            <h1  className="text-[14px] font-medium text-gray-200 ">People</h1>
                        </div>}

                        <div id="hashtag_option" onClick={() => changePath('hashtags')} className={`w-22 no-select h-10 flex flex-row justify-center ${location.pathname.endsWith("hashtags") ? 'bg-[#33464C]' : 'hover:bg-reddit_hover'}  items-center rounded-3xl cursor-pointer`}>
                            <h1  className="text-[14px] font-medium text-gray-200 ">hashtags</h1>
                        </div>
                    </div>
                </div>

                <div id="ismature_switch_btn_search" className="flex flex-row lg:items-center h-[40px] lg:h-[80px] lg:ml-auto mr-7 font-light w-[140px]">
                    <h1 className="mr-[20px] text-white text-[14px]">Safe Search</h1>
                    <div className="-mt-2.5">
                        <SwitchButton isSwitched={isSafe} setIsSwitched={setIsSafe} />
                    </div>
                </div>

            </div>



            {!location.pathname.endsWith("/people") && !location.pathname.endsWith("/communities") ?
                <div className="flex-row flex lg:-mt-1.5 items-center">

                    <div className="flex flex-row min-w-fit items-center mr-10">

                        <div ref={sortTypeRef} className="flex relative flex-row min-w-fit items-center ">
                            <h1 className="text-[#637278] mr-4 min-w-fit text-[12px]">Sort by: </h1>

                            <div id="search_sort_type" onClick={() => { setIsOpenSortType(prev => !prev) }} className={`flex  flex-row justify-center items-center ${sortType == "Most Comments" ? 'w-[145px]' : 'w-[122px] '} h-9 hover:bg-reddit_search_light cursor-pointer rounded-3xl`}>

                

                                {sortType == "Hot" && <svg rpl="" fill="#82949B" height="17" icon-name="hot-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.328.454 9.956.311l-.283.143C8.785.9 1 5.056 1 12.225c0 4.243 3.957 7.7 8.849 7.768A.979.979 0 0 0 9.99 20H10c4.962 0 9-3.488 9-7.775C19 5.056 11.215.9 10.328.454ZM12.5 17.789a3.699 3.699 0 0 1-2.854.945 3.48 3.48 0 0 1-2.457-1.37 3.945 3.945 0 0 1-.764-3.052c.441-2.639 2.75-4.38 3.576-4.926.928.611 3.65 2.674 3.65 5.818a3.469 3.469 0 0 1-1.151 2.585Zm1.64-.057c.49-.754.753-1.633.76-2.532 0-4.268-4.069-6.79-4.537-7.066l-.415-.184-.315.187c-.638.377-3.852 2.436-4.442 5.964A5.18 5.18 0 0 0 6 17.8a6.4 6.4 0 0 1-3.75-5.575c0-5.969 6.4-9.788 7.75-10.53 1.352.741 7.75 4.56 7.75 10.53a6.366 6.366 0 0 1-3.611 5.507h.001Z"></path>
                                </svg>}

                                {sortType == "New" && <svg rpl="" fill="#82949B" height="17" icon-name="new-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 20a1.143 1.143 0 0 1-1.007-.6l-1.281-2.36-2.424 1.16a1.145 1.145 0 0 1-1.63-1.184l.353-2.662-2.641-.492a1.144 1.144 0 0 1-.622-1.915L2.6 10 .748 8.053a1.145 1.145 0 0 1 .623-1.916l2.64-.488-.352-2.662A1.145 1.145 0 0 1 5.288 1.8l2.424 1.16L8.992.6a1.19 1.19 0 0 1 2.014 0l1.281 2.36 2.424-1.16a1.145 1.145 0 0 1 1.63 1.184l-.353 2.662 2.642.489a1.145 1.145 0 0 1 .622 1.915L17.4 10l1.85 1.947a1.145 1.145 0 0 1-.623 1.916l-2.64.488.351 2.662a1.144 1.144 0 0 1-1.627 1.187l-2.424-1.16-1.28 2.36A1.142 1.142 0 0 1 10 20Zm-2.244-4.242a1.144 1.144 0 0 1 1.007.6L10 18.636l1.236-2.279a1.147 1.147 0 0 1 1.5-.488l2.34 1.116-.34-2.569a1.146 1.146 0 0 1 .93-1.277l2.546-.47-1.785-1.88a1.146 1.146 0 0 1 0-1.578l1.785-1.88-2.547-.471a1.142 1.142 0 0 1-.928-1.276l.338-2.569-2.338 1.116a1.149 1.149 0 0 1-1.5-.488L10 1.364 8.763 3.643a1.147 1.147 0 0 1-1.5.488l-2.34-1.116.34 2.569a1.146 1.146 0 0 1-.93 1.277l-2.546.47 1.786 1.88a1.146 1.146 0 0 1 0 1.578l-1.786 1.88 2.548.471a1.142 1.142 0 0 1 .928 1.276l-.34 2.569 2.34-1.116c.154-.073.322-.11.493-.111Z"></path>
                                </svg>}

                                {sortType == "Top" && <svg rpl="" fill="#82949B" height="17" icon-name="top-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.875 11H13V7h2.242a.725.725 0 0 0 .513-1.238L10.5.628l-.257-.212-.589.029L4.21 5.764A.726.726 0 0 0 4.725 7H7v4H2.125A1.118 1.118 0 0 0 1 12.107v5.786A1.118 1.118 0 0 0 2.125 19h15.75A1.118 1.118 0 0 0 19 17.893v-5.786A1.118 1.118 0 0 0 17.875 11ZM2.25 17.75v-5.5H7v5.5H2.25Zm9.5-12v12h-3.5v-12H5.992l3.992-3.866 3.991 3.866H11.75Zm6 12H13v-5.5h4.75v5.5Z"></path>
                                </svg>
                                }

                              

                                <h1 id="sort_options" className="text-[12px] ml-2 text-[#83959B]">{sortType}</h1>
                                <ChevronDownIcon className="w-4 text-gray-400 ml-1 h-4" />



                            </div>

                            {isOpenSortType && (
                                <div className=" w-[185px] h-38 bg-[#0E1A1C] absolute mt-48 ml-7 text-white text-sm pt-2.5 z-20 rounded-xl items-center font-extralight flex flex-col">


                                   

                                    <div onClick={() => { setSortType("Hot"); setIsOpenSortType(false); }}
                                        id="search_hot"
                                        href=""
                                        className={`w-full pl-[28px] ${sortType == "Hot" ? "bg-reddit_search_light" : "hover:bg-reddit_hover"}   h-12 flex items-center cursor-pointer`}
                                    >
                                        <svg rpl="" fill="currentColor" height="16" icon-name="hot-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.328.454 9.956.311l-.283.143C8.785.9 1 5.056 1 12.225c0 4.243 3.957 7.7 8.849 7.768A.979.979 0 0 0 9.99 20H10c4.962 0 9-3.488 9-7.775C19 5.056 11.215.9 10.328.454ZM12.5 17.789a3.699 3.699 0 0 1-2.854.945 3.48 3.48 0 0 1-2.457-1.37 3.945 3.945 0 0 1-.764-3.052c.441-2.639 2.75-4.38 3.576-4.926.928.611 3.65 2.674 3.65 5.818a3.469 3.469 0 0 1-1.151 2.585Zm1.64-.057c.49-.754.753-1.633.76-2.532 0-4.268-4.069-6.79-4.537-7.066l-.415-.184-.315.187c-.638.377-3.852 2.436-4.442 5.964A5.18 5.18 0 0 0 6 17.8a6.4 6.4 0 0 1-3.75-5.575c0-5.969 6.4-9.788 7.75-10.53 1.352.741 7.75 4.56 7.75 10.53a6.366 6.366 0 0 1-3.611 5.507h.001Z"></path>
                                        </svg>

                                        <p className="no-select ml-3">Hot</p>
                                    </div>

                                    <div onClick={() => { setSortType("New"); setIsOpenSortType(false); }}
                                        id="search_new"
                                        href=""
                                        className={`w-full pl-[28px] ${sortType == "New" ? "bg-reddit_search_light" : "hover:bg-reddit_hover "}  h-12 flex items-center cursor-pointer`}
                                    >
                                        <svg rpl="" fill="currentColor" height="16" icon-name="new-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 20a1.143 1.143 0 0 1-1.007-.6l-1.281-2.36-2.424 1.16a1.145 1.145 0 0 1-1.63-1.184l.353-2.662-2.641-.492a1.144 1.144 0 0 1-.622-1.915L2.6 10 .748 8.053a1.145 1.145 0 0 1 .623-1.916l2.64-.488-.352-2.662A1.145 1.145 0 0 1 5.288 1.8l2.424 1.16L8.992.6a1.19 1.19 0 0 1 2.014 0l1.281 2.36 2.424-1.16a1.145 1.145 0 0 1 1.63 1.184l-.353 2.662 2.642.489a1.145 1.145 0 0 1 .622 1.915L17.4 10l1.85 1.947a1.145 1.145 0 0 1-.623 1.916l-2.64.488.351 2.662a1.144 1.144 0 0 1-1.627 1.187l-2.424-1.16-1.28 2.36A1.142 1.142 0 0 1 10 20Zm-2.244-4.242a1.144 1.144 0 0 1 1.007.6L10 18.636l1.236-2.279a1.147 1.147 0 0 1 1.5-.488l2.34 1.116-.34-2.569a1.146 1.146 0 0 1 .93-1.277l2.546-.47-1.785-1.88a1.146 1.146 0 0 1 0-1.578l1.785-1.88-2.547-.471a1.142 1.142 0 0 1-.928-1.276l.338-2.569-2.338 1.116a1.149 1.149 0 0 1-1.5-.488L10 1.364 8.763 3.643a1.147 1.147 0 0 1-1.5.488l-2.34-1.116.34 2.569a1.146 1.146 0 0 1-.93 1.277l-2.546.47 1.786 1.88a1.146 1.146 0 0 1 0 1.578l-1.786 1.88 2.548.471a1.142 1.142 0 0 1 .928 1.276l-.34 2.569 2.34-1.116c.154-.073.322-.11.493-.111Z"></path>
                                        </svg>
                                        <p className="no-select ml-3">New</p>
                                    </div>

                                    <div onClick={() => { setSortType("Top"); setIsOpenSortType(false); }}
                                        id="search_top"
                                        href=""
                                        className={`w-full pl-[28px] ${sortType == "Top" ? "bg-reddit_search_light" : "hover:bg-reddit_hover "}  h-12 flex items-center cursor-pointer`}
                                    >
                                        <svg rpl="" fill="currentColor" height="16" icon-name="top-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.875 11H13V7h2.242a.725.725 0 0 0 .513-1.238L10.5.628l-.257-.212-.589.029L4.21 5.764A.726.726 0 0 0 4.725 7H7v4H2.125A1.118 1.118 0 0 0 1 12.107v5.786A1.118 1.118 0 0 0 2.125 19h15.75A1.118 1.118 0 0 0 19 17.893v-5.786A1.118 1.118 0 0 0 17.875 11ZM2.25 17.75v-5.5H7v5.5H2.25Zm9.5-12v12h-3.5v-12H5.992l3.992-3.866 3.991 3.866H11.75Zm6 12H13v-5.5h4.75v5.5Z"></path>
                                        </svg>
                                        <p className="no-select ml-3">Top</p>
                                    </div>



                                </div>
                            )}

                        </div>


                        <div className="relative">
                            <div id="search_sort_time" ref={sortTimeRef} onClick={() => setIsOpenSortTime(prev => !prev)} className="flex flex-row ml-4 justify-center items-center w-[140px] h-9 hover:bg-reddit_search_light cursor-pointer rounded-3xl">
                                <svg rpl="" fill="#82949B" height="16" icon_name="calendar-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.374 2H16V.25h-1.25V2h-9.5V.251H4V2H2.626A1.627 1.627 0 0 0 1 3.626v13.748A1.627 1.627 0 0 0 2.626 19h14.748A1.627 1.627 0 0 0 19 17.374V3.626A1.627 1.627 0 0 0 17.374 2ZM2.626 3.25H4v1h1.25v-1h9.5v1H16v-1h1.374a.377.377 0 0 1 .376.376V7H2.25V3.626a.377.377 0 0 1 .376-.376Zm14.748 14.5H2.626a.377.377 0 0 1-.376-.376V8.25h15.5v9.124a.378.378 0 0 1-.376.376Z"></path>
                                </svg>
                                <h1 id="sort_time" className="text-[12px] ml-2 text-[#83959B]">{sortTime}</h1>
                                <ChevronDownIcon className="w-4 text-gray-400 ml-1 h-4" />
                            </div>

                            {isOpenSortTime && (

                                <div className=" w-[185px] h-68 bg-[#0E1A1C] absolute mt-[2px] -ml-4 text-white text-sm pt-2.5 z-20 rounded-xl items-center font-extralight flex flex-col">

                                    <div onClick={() => { setSortTime("All"); setIsOpenSortTime(false); }}
                                        id="search_all_time"
                                        href=""
                                        className={`w-full pl-[28px] ${sortTime == "All" ? "bg-reddit_search_light" : "hover:bg-reddit_hover"}   h-12 flex items-center cursor-pointer`}
                                    >
                                       
                                        <p className="no-select ml-3">All Time</p>
                                    </div>

                                    <div onClick={() => { setSortTime("Year"); setIsOpenSortTime(false); }}
                                        id="search_past_year"
                                        href=""
                                        className={`w-full pl-[28px] ${sortTime == "Year" ? "bg-reddit_search_light" : "hover:bg-reddit_hover"}   h-12 flex items-center cursor-pointer`}
                                    >
                                        <p className="no-select ml-3">Year</p>
                                    </div>

                                    <div onClick={() => { setSortTime("Month"); setIsOpenSortTime(false); }}
                                        id="search_past_month"
                                        href=""
                                        className={`w-full pl-[28px] ${sortTime == "Month" ? "bg-reddit_search_light" : "hover:bg-reddit_hover "}  h-12 flex items-center cursor-pointer`}
                                    >
                                    
                                        <p className="no-select ml-3">Month</p>
                                    </div>

                                    <div onClick={() => { setSortTime("Week"); setIsOpenSortTime(false); }}
                                        id="search_past_week"
                                        href=""
                                        className={`w-full pl-[28px] ${sortTime == "Week" ? "bg-reddit_search_light" : "hover:bg-reddit_hover "}  h-12 flex items-center cursor-pointer`}
                                    >
                                      
                                        <p className="no-select ml-3">Week</p>
                                    </div>


                                    <div onClick={() => { setSortTime("Today"); setIsOpenSortTime(false); }}
                                        id="search_past_24_hours"
                                        href=""
                                        className={`w-full pl-[28px] ${sortTime == "Today" ? "bg-reddit_search_light" : "hover:bg-reddit_hover"}   h-12 flex items-center cursor-pointer`}
                                    >
                                        
                                        <p className="no-select ml-3">Today</p>
                                    </div>

                                    <div onClick={() => { setSortTime("Now"); setIsOpenSortTime(false); }}
                                        id="search_past_hour"
                                        href=""
                                        className={`w-full pl-[28px] ${sortTime == "Now" ? "bg-reddit_search_light" : "hover:bg-reddit_hover"}   h-12 flex items-center cursor-pointer`}
                                    >
                                        
                                        <p className="no-select ml-3">Now</p>
                                    </div>

                                </div>

                            )}
                        </div>

                    </div>

                    <div className="w-full flex flex-row items-center pr-3 ">
                        <hr className="w-full h-[0.5px] text-gray-400" />
                    </div>

                </div> :
                <div className="mt-[10px] h-4">
                    <div className="w-full flex flex-row items-center pr-3 ">
                        <hr className="w-full h-[0.5px] text-gray-400" />
                    </div>
                </div>}
        </div>

    );
}

export default SearchResultsOptions;