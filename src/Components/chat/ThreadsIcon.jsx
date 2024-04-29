import { useState } from "react";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
const ThreadArrowIcon = () => {
    return (
        <svg rpl="" fill="white" height="20" icon-name="reply-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3 7H3.065l5.024-5.023-.889-.884L1.058 7.24a.625.625 0 0 0 0 .884L7.2 14.27l.885-.884L2.952 8.25H13.3a4.417 4.417 0 0 1 4.45 4.375V17H19v-4.375A5.669 5.669 0 0 0 13.3 7Z"></path>
        </svg>
    )
}


const ThreadsIcon = () => {
    const [isOpenThreads, setIsOpenThreads] = useState(false);

    return (
        <div className={`flex flex-row h-[50px] p-3 justify-between hover:bg-reddit_dark_Chat_hover ${isOpenThreads ? "bg-reddit_dark_Chat_hover" : ""}`}
            onClick={() => { setIsOpenThreads(prev => !prev) }}
        >
            <div className="flex flex-row w-[100px] justify-between items-center" >
                <ThreadArrowIcon />
                <p className="text-white  text-lg">Threads</p>

            </div>
            <ChevronRightIcon className='h-5 w-5 text-white' />

        </div>);
}

export default ThreadsIcon;