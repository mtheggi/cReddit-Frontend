import React, { useState } from 'react';

const UpVote = () => {
    return (
        <svg fill="#ffffff"
            width="22"
            height="22px"
            viewBox="0 0 24.00 24.00"
            xmlns="http://www.w3.org/2000/svg"
            stroke="none"
            stroke-width="0.00024000000000000003">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path></g>
        </svg>

    );
}
const DownVote = () => {
    return (
        <svg fill="#ffffff"
            width="22px"
            height="22px"
            viewBox="0 0 24.00 24.00"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            stroke-width="0.00024000000000000003"
            transform="rotate(180)">
            <g id="SVGRepo_bgCarrier" stroke-width="0">
            </g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path></g></svg>


    );


}

const Vote = () => {

    const [voters, setVoters] = useState(0);


    return (
        <div className="flex flex-row justify-evenly content-center bg-reddit_greenyDark hover:bg-reddit_search_light rounded-3xl py-2 px-2 ">

            <span role="button" onClick={() => setVoters(voters + 1)}><UpVote /> </span>
            <span className="text-gray-300 font-medium text-base">{voters}</span>
            <span role="button" onClick={() => setVoters(voters + 1)} ><DownVote /></span>
        </div>


    );
}

export default Vote;