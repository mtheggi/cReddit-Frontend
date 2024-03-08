import React, { useState } from 'react';

const UpVote = ({ isUpvote, isDownvote, isHoverUpvote }) => {
    return (

        isUpvote ?
            <svg rpl="" fill="#ffffff" height="16" icon-name="upvote-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.706 8.953 10.834.372A1.123 1.123 0 0 0 10 0a1.128 1.128 0 0 0-.833.368L1.29 8.957a1.249 1.249 0 0 0-.171 1.343 1.114 1.114 0 0 0 1.007.7H6v6.877A1.125 1.125 0 0 0 7.123 19h5.754A1.125 1.125 0 0 0 14 17.877V11h3.877a1.114 1.114 0 0 0 1.005-.7 1.251 1.251 0 0 0-.176-1.347Z">
                </path>
            </svg>
            :
            <svg className={`${isHoverUpvote&&!(isUpvote||isDownvote) ? 'fill-reddit_upvote' : ''} ${!isUpvote ? (isDownvote ? 'hover:fill-white' : '') : 'hover:fill-white'}`} fill="#ffffff"
                width="19px"
                height="22px"
                viewBox="0 0 24.00 24.00"
                xmlns="http://www.w3.org/2000/svg"
                stroke="none"
                strokeWidth="0.00024000000000000003">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path></g>
            </svg>

    );
}
const DownVote = ({ isDownvote, isUpvote, isHoverDownvote }) => {
    return (

        isDownvote ?
        <svg rpl="" fill="#ffffff" height="16" icon-name="upvote-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.88 9.7a1.114 1.114 0 0 0-1.006-.7H14V2.123A1.125 1.125 0 0 0 12.877 1H7.123A1.125 1.125 0 0 0 6 2.123V9H2.123a1.114 1.114 0 0 0-1.005.7 1.25 1.25 0 0 0 .176 1.348l7.872 8.581a1.124 1.124 0 0 0 1.667.003l7.876-8.589A1.248 1.248 0 0 0 18.88 9.7Z"></path>
        </svg>
        :
        <svg className={`${isHoverDownvote&&!(isUpvote||isDownvote) ? 'fill-reddit_downvote' : ''}  ${!isDownvote ? (isUpvote ? 'hover:fill-white' : '') : 'hover:fill-white'}`} fill="#ffffff"
            width="19px"
            height="22px"
            viewBox="0 0 24.00 24.00"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            strokeWidth="0.00024000000000000003"
            transform="rotate(180)">
            <g id="SVGRepo_bgCarrier" strokeWidth="0">
            </g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path></g></svg>


    );


}

const Vote = () => {

    const [voters, setVoters] = useState(12);
    const [isUpvote, setIsUpvote] = useState(false);
    const [isDownvote, setIsDownvote] = useState(false);
    const [isHoverUpvote, setIsHoverUpvote] = useState(false);
    const [isHoverDownvote, setIsHoverDownvote] = useState(false);

    const handleUpvote = () => {
        if (isUpvote) {
            setVoters(voters - 1);
            setIsUpvote(false);
        } else {
            if (isDownvote) {
                setVoters(voters + 2);
                setIsDownvote(false);
            } else {
                setVoters(voters + 1);
            }
            setIsUpvote(true);
        }
    };

    const handleDownvote = () => {
        if (isDownvote) {
            setVoters(voters + 1);
            setIsDownvote(false);
        } else {
            if (isUpvote) {
                setVoters(voters - 2);
                setIsUpvote(false);
            } else {
                setVoters(voters - 1);
            }
            setIsDownvote(true);
        }
    };


    return (
        <div className={`flex flex-row justify-evenly items-center min-w-22 px-1 h-8  ${isDownvote ? 'bg-reddit_downvote' : (isUpvote ? 'bg-reddit_upvote':'bg-reddit_search')}  rounded-3xl`}>
            <span onMouseEnter={()=>setIsHoverUpvote(true)} onMouseLeave={()=>setIsHoverUpvote(false)} role="button" className={`hover:bg-reddit_search_light ${isUpvote || isDownvote ? 'hover:bg-opacity-30' : ''} rounded-full w-7 h-8 flex justify-center items-center`} onClick={handleUpvote}><UpVote isUpvote={isUpvote} isDownvote={isDownvote} isHoverUpvote={isHoverUpvote} /> </span>
            <span className="text-gray-300 text-sm">{voters}</span>
            <span onMouseEnter={()=>setIsHoverDownvote(true)} onMouseLeave={()=>setIsHoverDownvote(false)} role="button" className={`hover:bg-reddit_search_light ${isUpvote || isDownvote ? 'hover:bg-opacity-30' : ''} w-7 h-8 rounded-full flex justify-center items-center`} onClick={handleDownvote} ><DownVote isDownvote={isDownvote} isUpvote={isUpvote} isHoverDownvote={isHoverDownvote} /></span>
        </div>
    );
}

export default Vote;