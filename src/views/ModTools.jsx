import Separator from "@/Components/sidebar/Nav-Icons/Separator";
import killbill from "@/assets/kill_bill.jpg";

const ModTools = () => {
    return (
        <div className="w-full h-full mt-[60px] flex flex-row">

            <div id="mod_sidebar" className="w-[260px] flex  flex-col min-w-[260px] px-[16px] py-3 border-r-[1px]  border-[#252C2E]">

                <div id="exit_mod" className="flex flex-row mb-[10px] w-full h-10 rounded-lg items-center cursor-pointer px-[11px] mt-3 hover:bg-reddit_search">
                    <svg className=" rotate-90 mr-4" rpl="" fill="#83959B" height="16" icon-name="down-arrow-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_4084_297)"><path d="M10.442 19.442l9-9-.884-.884-7.933 7.933V1h-1.25v16.491L1.442 9.558l-.884.884 9 9a.624.624 0 00.884 0z"></path></g><defs><clipPath id="clip0_4084_297"><path d="M0 0h20v20H0z" transform="rotate(90 10 10)"></path></clipPath></defs></svg>
                    <h1 className="text-[#83959B] font-light text-[14px] ">Exit mod tools</h1>
                </div>
                <Separator />
                <div id="collapse_mod" className="w-full mb-[11px] flex flex-row mt-[10px] px-[11px] cursor-pointer rounded-lg h-10 items-center hover:bg-reddit_search">
                    <svg rpl="" aria-hidden="true" fill="#83959B" height="20" icon-name="side-menu-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.876 19H2.124A1.125 1.125 0 0 1 1 17.876V2.124A1.125 1.125 0 0 1 2.124 1h7.752A1.125 1.125 0 0 1 11 2.124v15.752A1.125 1.125 0 0 1 9.876 19ZM2.25 17.75h7.5V2.25h-7.5v15.5Zm16.192-4.192L14.884 10l3.558-3.558-.884-.884-4 4a.624.624 0 0 0 0 .884l4 4 .884-.884ZM8.5 5h-5v1.25h5V5Zm0 3h-5v1.25h5V8Zm0 3h-5v1.25h5V11Zm0 3h-5v1.25h5V14Z"></path>
                    </svg>
                    <h1 className="ml-2 text-[14px] text-[#83959B]">Collapse</h1>
                </div>

                <Separator />


                <div className="w-full mt-[32px] mb-2  flex flex-col">
                    <h1 className="text-[#83959B] font-medium text-[12px]">OVERVIEW</h1>
                </div>


                <div id="mod_queues" className="w-full h-10 my-1 items-center flex cursor-pointer hover:bg-reddit_search rounded-lg px-[11px] flex-row">
                    <svg rpl="" fill="#83959B" height="20" icon-name="posts-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="M2.625 15.375V16A1.627 1.627 0 0 1 1 14.375V2.624A1.627 1.627 0 0 1 2.625 1h11.75A1.627 1.627 0 0 1 16 2.624H5.629a3.008 3.008 0 0 0-3 3l-.004 9.751ZM19 5.625v11.75A1.627 1.627 0 0 1 17.375 19H5.625A1.627 1.627 0 0 1 4 17.375V5.625A1.627 1.627 0 0 1 5.625 4h11.75A1.627 1.627 0 0 1 19 5.625ZM15 14H8v1.5h7V14Zm0-3H8v1.5h7V11Zm0-3H8v1.5h7V8Z"></path>
                    </svg>
                    <h1 className="text-[#83959B] font-medium text-[14px] ml-2">Queues</h1>
                </div>


                <div id="user_management" className="w-full h-10 my-1 items-center flex  cursor-pointer  hover:bg-reddit_search rounded-lg px-[11px]   flex-row">
                    <svg rpl="" fill="#83959B" height="20" icon-name="profile-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0ZM4.866 17.07a3.99 3.99 0 0 1 3.991-2.77h2.286a3.99 3.99 0 0 1 3.991 2.766 8.685 8.685 0 0 1-10.268 0v.004Zm11.3-.87a5.354 5.354 0 0 0-5.024-3.146H8.857A5.354 5.354 0 0 0 3.833 16.2a8.75 8.75 0 1 1 12.334 0h-.001ZM10.059 5a3.229 3.229 0 1 0 0 6.458 3.229 3.229 0 0 0 0-6.458Zm0 5.208a1.98 1.98 0 1 1 0-3.959 1.98 1.98 0 0 1 0 3.959Z"></path> </svg>
                    <h1 className="text-[#83959B] ml-2 font-medium text-[14px]">User Management</h1>
                </div>

                <div id="scheduled_posts" className="w-full h-10 mb-3 my-1 items-center flex  cursor-pointer hover:bg-reddit_search rounded-lg px-[11px] flex-row">
                    <svg rpl="" fill="#83959B" height="20" icon-name="calendar-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M17.374 2H16V.25h-1.25V2h-9.5V.251H4V2H2.626A1.627 1.627 0 0 0 1 3.626v13.748A1.627 1.627 0 0 0 2.626 19h14.748A1.627 1.627 0 0 0 19 17.374V3.626A1.627 1.627 0 0 0 17.374 2ZM2.626 3.25H4v1h1.25v-1h9.5v1H16v-1h1.374a.377.377 0 0 1 .376.376V7H2.25V3.626a.377.377 0 0 1 .376-.376Zm14.748 14.5H2.626a.377.377 0 0 1-.376-.376V8.25h15.5v9.124a.378.378 0 0 1-.376.376Z"></path> </svg>
                    <h1 className="text-[#83959B] ml-2 font-medium text-[14px]">Scheduled Posts</h1>
                </div>

                <Separator />
            </div>


            <div id="mod_content" className="flex flex-col  w-full h-full">
                <div className="w-full px-4  mt-[7px] h-[150px] min-h-[150px]  flex flex-col border-b-[1px] border-[#252C2E]">
                    <h1 className="text-[33px] font-semibold text-gray-200">Queue</h1>
                    <p className="text-gray-200 mt-1 font-light text-[14px]">Anything that needs moderator attention will show up in needs review.</p>

                    <div className="w-[470px] h-12  mt-auto mb-2 flex flex-row items-center space-x-16">
                        <div className="hover:bg-reddit_hover w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl">
                            <h1 className="text-white text-[15px]">Unmoderated</h1>
                        </div>

                        <div className="hover:bg-reddit_hover w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl">
                            <h1 className="text-white text-[15px]">Edited</h1>
                        </div>

                        <div className="hover:bg-reddit_hover w-fit px-3 h-11 flex flex-row items-center cursor-pointer rounded-3xl">
                            <h1 className="text-white text-[15px]">Removed</h1>
                        </div>

                    </div>
                </div>


                {/* <div className="w-full h-full flex flex-col items-center mt-20 ">
                    <img className="w-[200px] h-[200px]" src="https://www.redditstatic.com/shreddit/assets/snoomojis/cat_blep.png" alt="cat blep" />
                    <h1 className="text-white font-medium text-[24px]">Queue is clean.</h1>
                    <p className="text-gray-400 mt-1">Kitteh is pleased</p>
                </div> */}

                <div id="mapped_mod" className="px-4 flex flex-col h-full w-full mt-3">

                    <div className="flex flex-col h-fit w-1/2 border-b-[#252C2E]">
                        <div className="flex flex-row items-center h-7 mb-2 w-full">
                            <img className="w-6 h-6 rounded-full mr-2" src={killbill} alt="" />
                            <h1 className="text-gray-400 text-[13px] tracking-wide font-medium" >u/No_Significance_7222</h1>
                            <h1 className="text-gray-400 text-[13px] font-medium mx-2 -mt-[6px]">.</h1>
                            <h1 className="text-[#83959B] text-[12px] font-light"> 10h ago</h1>
                            <h1 className="text-gray-400 text-[13px] font-medium mx-2 -mt-[6px]">.</h1>
                            <h1 className="text-[#83959B] text-[12px] font-light"> 1 upvote</h1>
                            <h1 className="text-gray-400 text-[13px] font-medium mx-2 -mt-[6px]">.</h1>
                            <h1 className="text-[#83959B] text-[12px] font-light"> 0 comments</h1>
                        </div>

                      
                            <h1 className="text-gray-200 mb-[9px] text-[16px] font-medium">Lets goooo</h1>
                            <p className="text-gray-400 text-[14px] ">yaaallaaaaaaaaa</p>

                            <div className="flex flex-row w-full mt-[11px] space-x-4 h-10 items-center" id="options_list">

                                <div className="flex flex-row items-center h-[34px] w-fit px-[10px] cursor-pointer bg-reddit_search hover:bg-reddit_search_light rounded-3xl">
                                    <h1 className="text-gray-200 text-[12px] font-medium">Approve</h1>
                                </div>

                                <div className="flex flex-row items-center h-[34px] w-fit px-[10px] cursor-pointer bg-reddit_search hover:bg-reddit_search_light rounded-3xl">
                                    <h1 className="text-gray-200 text-[12px] font-medium">Remove</h1>
                                </div>

                                <div className="flex flex-row items-center h-[34px] w-fit px-[10px] cursor-pointer hover:bg-reddit_search_light rounded-3xl">
                                    <h1 className="text-gray-200 text-[12px] font-medium">Spam</h1>
                                </div>

                                <div className="flex flex-row items-center h-[34px] w-fit px-[10px] cursor-pointer hover:bg-reddit_search_light rounded-3xl">
                                    <h1 className="text-gray-200 text-[12px] font-medium">Flair</h1>
                                </div>

                                <div className="flex flex-row items-center h-[34px] w-fit px-[10px] cursor-pointer hover:bg-reddit_search_light rounded-3xl">
                                    <h1 className="text-gray-200 text-[12px] font-medium">Lock</h1>
                                </div>

                                <div className="flex flex-row items-center h-[34px] w-fit min-w-fit px-[10px] cursor-pointer hover:bg-reddit_search_light rounded-3xl">
                                    <h1 className="text-gray-200 text-[12px] font-medium">Copy Link</h1>
                                </div>

                                <div className="flex flex-row items-center h-[34px] w-fit px-[10px] cursor-pointer hover:bg-reddit_search_light rounded-3xl">
                                    <h1 className="text-gray-200 text-[12px] font-medium">Sticky</h1>
                                </div>

                                <div className="flex flex-row items-center justify-center px-2 w-fit h-[34px] cursor-pointer rounded-3xl hover:bg-reddit_search_light">
                                <svg rpl="" fill="white" height="16" icon-name="mod-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"> <path d="M10 20c-.101 0-.202-.014-.3-.04C8.249 19.554 1 17.277 1 12V3.187A1.122 1.122 0 0 1 1.846 2.1L9.73.108c.177-.044.363-.044.54 0L18.154 2.1A1.122 1.122 0 0 1 19 3.187V12c0 5.277-7.249 7.554-8.7 7.957A1.162 1.162 0 0 1 10 20ZM2.25 3.283V12c0 4.465 6.989 6.531 7.786 6.751.725-.22 7.714-2.286 7.714-6.751V3.283L10 1.33 2.25 3.283Z"></path> </svg>
                                </div>

                            </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ModTools;