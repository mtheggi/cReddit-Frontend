import React, { useState } from 'react';

const UpVote = () => {
    return (
        <svg className='hover:fill-red-700' fill="#ffffff"
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
const DownVote = () => {
    return (
        <svg className=' hover:fill-purple-500' fill="#ffffff"
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

    const [voters, setVoters] = useState(0);


    return (
        <div className="flex flex-row justify-evenly items-center min-w-22 px-1 h-8 bg-reddit_search rounded-3xl  ">

            <span role="button"  className='hover:bg-reddit_search_light rounded-full w-7 h-8 flex justify-center items-center' onClick={() => setVoters(voters + 1)}><UpVote /> </span>
            <span className="text-gray-300 text-sm">{voters}</span>
            <span role="button" className='hover:bg-reddit_search_light w-7 h-8 rounded-full flex justify-center items-center' onClick={() => setVoters(voters - 1)} ><DownVote /></span>
        </div>


    );
}

export default Vote;