import Separator from "@/Components/sidebar/Nav-Icons/Separator";

import Queue from "@/Components/moderation/Queue";
import UserManagment from "@/Components/moderation/UserManagment";
import SchedualePost from "@/Components/moderation/SchedualePost";
import { useEffect, useState } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
import Loading from "@/Components/Loading/Loading";
import CommunityMod from "@/Components/moderation/CommunityMod";
import { useNavigate } from "react-router-dom";

const ModTools = () => {
    const [isQueue, setIsQueue] = useState(true);
    const [isUserManagement, setIsUserManagement] = useState(false);
    const [isScheduledPosts, setIsScheduledPosts] = useState(false);
    const [subbreddit, setSubbreddit] = useState([]);
    const [subredditLoading, setSubbredditLoading] = useState(false);
    const [selectedSubReddit, setSelectedSubreddit] = useState(null);
    const navigate = useNavigate();

    console.log(isQueue);
    useEffect(() => {

        const fetchSubreddits = async () => {
            setSubbredditLoading(true);
            const response = await getRequest(`${baseUrl}/user/moderator-in`);
            if (response.status === 200) {
                setSubbreddit(response.data);
                setSubbredditLoading(false);
                if (response.data.length > 0) {
                    setSelectedSubreddit(response.data[0]);
                }
            }
        }
        fetchSubreddits();
    }, [])

    console.log(selectedSubReddit);
    return (
        <div className="w-full h-full mt-[60px] flex flex-row">

            <div id="mod_sidebar" className="w-[260px] flex  flex-col min-w-[260px] px-[16px] py-3 border-r-[1px]  border-[#252C2E]">

                <div id="exit_mod" onClick={() => { navigate('/') }} className="flex flex-row mb-[10px] w-full h-10 rounded-lg items-center cursor-pointer px-[11px] mt-3 hover:bg-reddit_search">
                    <svg className=" rotate-90 mr-4" rpl="" fill="#83959B" height="16" icon-name="down-arrow-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_4084_297)"><path d="M10.442 19.442l9-9-.884-.884-7.933 7.933V1h-1.25v16.491L1.442 9.558l-.884.884 9 9a.624.624 0 00.884 0z"></path></g><defs><clipPath id="clip0_4084_297"><path d="M0 0h20v20H0z" transform="rotate(90 10 10)"></path></clipPath></defs></svg>
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


                <div onClick={() => { setIsQueue(true); setIsUserManagement(false); setIsScheduledPosts(false); }} id="mod_queues" className="w-full h-10 my-1 items-center flex cursor-pointer hover:bg-reddit_search rounded-lg px-[11px] flex-row">
                    <svg rpl="" fill="#83959B" height="20" icon-name="posts-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="M2.625 15.375V16A1.627 1.627 0 0 1 1 14.375V2.624A1.627 1.627 0 0 1 2.625 1h11.75A1.627 1.627 0 0 1 16 2.624H5.629a3.008 3.008 0 0 0-3 3l-.004 9.751ZM19 5.625v11.75A1.627 1.627 0 0 1 17.375 19H5.625A1.627 1.627 0 0 1 4 17.375V5.625A1.627 1.627 0 0 1 5.625 4h11.75A1.627 1.627 0 0 1 19 5.625ZM15 14H8v1.5h7V14Zm0-3H8v1.5h7V11Zm0-3H8v1.5h7V8Z"></path>
                    </svg>
                    <h1 className="text-[#83959B] font-medium text-[14px] ml-2">Queues</h1>
                </div>


                <div onClick={() => { setIsQueue(false); setIsUserManagement(true); setIsScheduledPosts(false); }} id="user_management" className="w-full h-10 my-1 items-center flex  cursor-pointer  hover:bg-reddit_search rounded-lg px-[11px]   flex-row">
                    <svg rpl="" fill="#83959B" height="20" icon-name="profile-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0ZM4.866 17.07a3.99 3.99 0 0 1 3.991-2.77h2.286a3.99 3.99 0 0 1 3.991 2.766 8.685 8.685 0 0 1-10.268 0v.004Zm11.3-.87a5.354 5.354 0 0 0-5.024-3.146H8.857A5.354 5.354 0 0 0 3.833 16.2a8.75 8.75 0 1 1 12.334 0h-.001ZM10.059 5a3.229 3.229 0 1 0 0 6.458 3.229 3.229 0 0 0 0-6.458Zm0 5.208a1.98 1.98 0 1 1 0-3.959 1.98 1.98 0 0 1 0 3.959Z"></path> </svg>
                    <h1 className="text-[#83959B] ml-2 font-medium text-[14px]">User Management</h1>
                </div>

                <div onClick={() => { setIsQueue(false); setIsUserManagement(false); setIsScheduledPosts(true); }} id="scheduled_posts" className="w-full h-10 mb-3 my-1 items-center flex  cursor-pointer hover:bg-reddit_search rounded-lg px-[11px] flex-row">
                    <svg rpl="" fill="#83959B" height="20" icon-name="calendar-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M17.374 2H16V.25h-1.25V2h-9.5V.251H4V2H2.626A1.627 1.627 0 0 0 1 3.626v13.748A1.627 1.627 0 0 0 2.626 19h14.748A1.627 1.627 0 0 0 19 17.374V3.626A1.627 1.627 0 0 0 17.374 2ZM2.626 3.25H4v1h1.25v-1h9.5v1H16v-1h1.374a.377.377 0 0 1 .376.376V7H2.25V3.626a.377.377 0 0 1 .376-.376Zm14.748 14.5H2.626a.377.377 0 0 1-.376-.376V8.25h15.5v9.124a.378.378 0 0 1-.376.376Z"></path> </svg>
                    <h1 className="text-[#83959B] ml-2 font-medium text-[14px]">Scheduled Posts</h1>
                </div>

                <Separator />
                {
                    subredditLoading ? <Loading /> :
                        subbreddit.map((sub, index) => {
                            return (
                                <div onClick={() => { setSelectedSubreddit(sub) }} key={index} id={`${sub.name}-icon-mod`} >
                                    <CommunityMod key={index} text={sub.name} icon={sub.icon} Selected={selectedSubReddit} />
                                    <Separator />
                                </div>
                            )
                        })
                }

            </div>

            {selectedSubReddit && isQueue && <Queue selectedSubReddit={selectedSubReddit} />}
            {selectedSubReddit && isUserManagement && <UserManagment selectedSubReddit={selectedSubReddit} />}
            {selectedSubReddit && isScheduledPosts && <SchedualePost selectedSubReddit={selectedSubReddit} />}


        </div>
    );
}

export default ModTools;