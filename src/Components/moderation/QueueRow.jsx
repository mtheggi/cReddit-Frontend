import killbill from "@/assets/kill_bill.jpg";
import Separator from "../sidebar/Nav-Icons/Separator";
import moment from "moment";
import { useState } from "react";
import { LockClosedIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { patchRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";

const QueueRow = ({ post }) => {
    const [isLocked, setIsLocked] = useState(post?.isLocked)
    const [isApproved, setIsApproved] = useState(post?.isApproved)
    const [isRemoved, setIsRemoved] = useState(post?.isRemoved)
    const ID = post.hasOwnProperty('_id') ? post._id : post.postID;
    const pic = post.hasOwnProperty('icon') ? post.icon : post.userPic

    const handleLock = async () => {
        const response = await patchRequest(`${baseUrl}/post/${ID}/lock`, { isLocked: !isLocked });
        if (response.status === 200) {
            setIsLocked(!isLocked);
        }
    }
    const handleApprove = async () => {
        const response = await patchRequest(`${baseUrl}/post/${ID}/approve`);
        if (response.status === 200) {
            setIsApproved(true);
            setIsRemoved(false);
        }

    }
    const handleRemove = async () => {
        const response = await patchRequest(`${baseUrl}/post/${ID}/remove`);
        if (response.status === 200) {
            setIsRemoved(true);
            setIsApproved(false);
        }
    }

    return (
        <div className="flex  mb-3 flex-col h-fit w-3/4 ">
            <div className="flex flex-row items-center h-7 mb-2 w-full">
                <img className="w-6 min-w-6 h-6 rounded-full mr-2" src={pic} alt="" />
                <h1 className="text-gray-400 min-w-fit text-[13px] tracking-wide font-medium" >u/{post?.username}</h1>
                <h1 className="text-gray-400 min-w-fit text-[13px] font-medium mx-2 -mt-[6px]">.</h1>
                <h1 className="text-[#83959B] min-w-fit text-[12px] font-light"> {moment(post?.createdAt).fromNow()} </h1>
                <h1 className="text-gray-400 min-w-fit text-[13px] font-medium mx-2 -mt-[6px]">.</h1>
                <h1 className="text-[#83959B] min-w-fit text-[12px] font-light"> {post?.netVote} netvote</h1>
                <h1 className="text-gray-400 min-w-fit text-[13px] font-medium mx-2 -mt-[6px]">.</h1>
                <h1 className="text-[#83959B] min-w-fit text-[12px] font-light"> {post?.commentCount} comments</h1>
                {isLocked ? <div className="flex flex-row gap-3 items-center justify-start"> <LockClosedIcon className="h-5 w-5 text-yellow-400 ml-4" /> <p className="text-gray-400 min-w-fit text-[13px] font-bold"> Locked </p></div> : null}
                {isApproved && !isRemoved ? <div className="flex flex-row gap-3 items-center justify-start"> <ShieldCheckIcon className="h-5 w-5 text-green-400 ml-4" /> <p className="text-gray-400 min-w-fit text-[13px] font-bold"> Approved </p></div> : null}
                {isRemoved && !isApproved ? <div className="flex flex-row gap-3 items-center justify-start"> <ExclamationTriangleIcon className="h-5 w-5 text-red-400 ml-4" /> <p className="text-gray-400 min-w-fit text-[13px] font-bold"> Removed </p></div> : null}
            </div>

            {(post?.isNSFW || post?.isSpoiler) &&
                <div className="flex flex-row items-center h-6 mb-2 w-full">

                    {
                        post?.isNSFW && <div className="flex flex-row">
                            <svg rpl="" fill="#C60E88" height="16" icon-name="nsfw-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"> <path d="M13 10.967a1.593 1.593 0 0 0-1.363 0 1.2 1.2 0 0 0-.475.414 1.02 1.02 0 0 0-.173.576.967.967 0 0 0 .18.574c.122.172.29.307.482.393.21.095.438.143.668.14a1.51 1.51 0 0 0 .671-.146 1.2 1.2 0 0 0 .475-.4.985.985 0 0 0 .173-.569 1.024 1.024 0 0 0-.17-.57 1.2 1.2 0 0 0-.469-.412Z"></path><path d="M11.747 9.227c.177.095.374.143.574.14.2.003.396-.045.572-.14a1.057 1.057 0 0 0 .402-1.462.984.984 0 0 0-.406-.37 1.317 1.317 0 0 0-1.137 0 1 1 0 0 0-.557.902 1.047 1.047 0 0 0 .551.932l.001-.002Z"></path><path d="M18.636 6.73 13.27 1.363a4.634 4.634 0 0 0-6.542 0L1.364 6.73a4.627 4.627 0 0 0 0 6.542l5.365 5.365a4.633 4.633 0 0 0 6.542 0l5.366-5.365a4.634 4.634 0 0 0 0-6.542ZM8.204 14.5H6.288V8.277L4.648 9V7.23l2.988-1.367h.568V14.5Zm6.862-1.148c-.29.4-.683.714-1.136.912a4.11 4.11 0 0 1-3.24-.006 2.8 2.8 0 0 1-1.134-.918 2.172 2.172 0 0 1-.41-1.283c0-.42.12-.83.345-1.184a2.6 2.6 0 0 1 .944-.879 2.488 2.488 0 0 1-.636-.832c-.152-.32-.23-.67-.229-1.025a2.117 2.117 0 0 1 .378-1.248c.256-.362.604-.65 1.008-.832.43-.198.9-.298 1.374-.293.474-.004.942.099 1.371.3.403.182.749.47 1 .834.249.368.378.804.37 1.248a2.371 2.371 0 0 1-.868 1.851c.383.21.708.51.944.877a2.24 2.24 0 0 1-.074 2.481l-.007-.003Z"></path>
                            </svg>
                            <h1 className="font-semibold text-[13px] ml-1 text-[#C60E88] uppercase">NSFW</h1>
                        </div>
                    }

                    {post?.isSpoiler &&
                        <div className="flex ml-3 flex-row">
                            <svg rpl="" fill="red" height="16" icon-name="spoiler-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"> <path d="m18.628 6.73-5.364-5.365a4.626 4.626 0 0 0-6.542 0L1.355 6.73a4.634 4.634 0 0 0 0 6.542l5.367 5.365a4.627 4.627 0 0 0 6.542 0l5.364-5.365a4.627 4.627 0 0 0 0-6.542ZM11.162 5l-.28 6.747H9.117L8.837 5h2.325Zm-.038 9.536a1.29 1.29 0 0 1-.462.472 1.24 1.24 0 0 1-.655.178 1.286 1.286 0 1 1 1.117-.65Z"></path></svg>
                            <h1 className="font-semibold text-[13px] ml-1 text-red-600 uppercase">Spoiler</h1>
                        </div>
                    }
                </div>
            }

            <h1 className="text-gray-200 mb-[9px] font-bold text-[16px]">{post?.title}</h1>

            {post?.type === "Images & Video" && <img src={post?.content} className="h-40 w-40"></img>}
            {post?.type === "Link" && <a href={post?.content} className="text-blue-700 text-[20px] underline cursor-pointer">{post?.content}</a>}
            {post?.type === "Text" || post?.type === 'Comment' && <p className="text-gray-200 text-[16px]">{post?.content}</p>}

            <div className="flex flex-row w-full mt-[11px] space-x-4 h-10 items-center" id="options_list">

                {!isApproved && <div onClick={handleApprove} className="flex flex-row items-center h-[30px] w-fit px-[10px] cursor-pointer bg-reddit_search hover:bg-reddit_search_light rounded-3xl">
                    <h1 className="text-gray-200 text-[12px] font-bold">Approve</h1>
                </div>
                }

                {!isRemoved && <div onClick={handleRemove} className="flex flex-row items-center h-[30px] w-fit px-[10px] cursor-pointer bg-reddit_search hover:bg-reddit_search_light rounded-3xl">
                    <h1 className="text-gray-200 text-[12px] font-bold">Remove</h1>
                </div>}

                <div onClick={handleLock} className="flex flex-row items-center h-[30px] w-fit px-[10px] cursor-pointer hover:bg-reddit_search_light rounded-3xl">
                    <h1 className="text-gray-200 text-[12px] font-bold">Lock</h1>
                </div>



                <div className="flex flex-row items-center justify-center px-2 w-fit h-[34px] cursor-pointer rounded-3xl hover:bg-reddit_search_light">
                    <svg rpl="" fill="white" height="16" icon-name="mod-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"> <path d="M10 20c-.101 0-.202-.014-.3-.04C8.249 19.554 1 17.277 1 12V3.187A1.122 1.122 0 0 1 1.846 2.1L9.73.108c.177-.044.363-.044.54 0L18.154 2.1A1.122 1.122 0 0 1 19 3.187V12c0 5.277-7.249 7.554-8.7 7.957A1.162 1.162 0 0 1 10 20ZM2.25 3.283V12c0 4.465 6.989 6.531 7.786 6.751.725-.22 7.714-2.286 7.714-6.751V3.283L10 1.33 2.25 3.283Z"></path> </svg>
                </div>

            </div>
        </div >
    );
}

export default QueueRow;