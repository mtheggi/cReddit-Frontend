
import moment from "moment";
import { useNavigate } from "react-router-dom";


const SearchFeedComments = ({
    _id,
    postID,
    postTitle,
    postUsername,
    postVotes,
    postPicture,
    postCreatedAt,
    isPostNsfw,
    isPostSpoiler,
    communityName,
    createdAt,
    username,
    netVote,
    commentCount,
    commentPicture,
    content,
    lastElementRef
}) => {
    const navigate = useNavigate();

    function formatVotes(num) {
        let absoluteNum = Math.abs(num);
        let sign = num < 0 ? '-' : '';

        if (!num)
            return num;

        if (absoluteNum >= 1000000) {
            return sign + (absoluteNum / 1000000).toFixed(1) + 'M';
        } else if (absoluteNum >= 1000) {
            return sign + (absoluteNum / 1000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    }


    return (

        <div onClick={() => {
            if (communityName == null) {
                navigate(`/u/${postUsername}/comments/${postID}`)
            } else {
                navigate(`/r/${communityName}/comments/${postID}`)
            }
        }} ref={lastElementRef} className="h-fit w-full flex flex-row pl-3 pr-2 py-[17px] rounded-xl items-center cursor-pointer border-[#2F383B] hover:bg-reddit_hover">
            <div className="w-full flex-col flex ">
                <div className="flex flex-row w-full h-fit mb-2 items-center">
                    <img onClick={(e) => { e.stopPropagation(); communityName == null ? navigate(`/user/${postUsername}`) : navigate(`/r/${communityName}`); }} src={postPicture} alt="" className="w-7 peer h-7 rounded-full mr-2" />
                    {communityName != null ? <h1 onClick={(e) => { e.stopPropagation(); navigate(`/r/${communityName}`); }} className="text-[12px] peer-hover:underline hover:underline font-medium text-gray-400 tracking-wide">r/{communityName}</h1> :
                        <h1 onClick={(e) => { e.stopPropagation(); navigate(`/user/${postUsername}`); }} className="text-[14px] font-medium text-gray-400 peer-hover:underline hover:underline tracking-wide">u/{postUsername}</h1>}
                    <h1 className="text-[12px] text-gray-400 font-extralight ml-2">.</h1>
                    <h1 className="text-[11px] text-gray-400 font-extralight ml-2">{moment(postCreatedAt).fromNow()}</h1>
                </div>

                <div className="flex flex-row items-center mb-1">
                    {isPostNsfw && <svg rpl="" className="inline-block" fill="#E00296" height="14" icon-name="nsfw-fill" viewBox="0 0 20 20" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 10.967a1.593 1.593 0 0 0-1.363 0 1.2 1.2 0 0 0-.475.414 1.02 1.02 0 0 0-.173.576.967.967 0 0 0 .18.574c.122.172.29.307.482.393.21.095.438.143.668.14a1.51 1.51 0 0 0 .671-.146 1.2 1.2 0 0 0 .475-.4.985.985 0 0 0 .173-.569 1.024 1.024 0 0 0-.17-.57 1.2 1.2 0 0 0-.469-.412Z"></path><path d="M11.747 9.227c.177.095.374.143.574.14.2.003.396-.045.572-.14a1.057 1.057 0 0 0 .402-1.462.984.984 0 0 0-.406-.37 1.317 1.317 0 0 0-1.137 0 1 1 0 0 0-.557.902 1.047 1.047 0 0 0 .551.932l.001-.002Z"></path><path d="M18.636 6.73 13.27 1.363a4.634 4.634 0 0 0-6.542 0L1.364 6.73a4.627 4.627 0 0 0 0 6.542l5.365 5.365a4.633 4.633 0 0 0 6.542 0l5.366-5.365a4.634 4.634 0 0 0 0-6.542ZM8.204 14.5H6.288V8.277L4.648 9V7.23l2.988-1.367h.568V14.5Zm6.862-1.148c-.29.4-.683.714-1.136.912a4.11 4.11 0 0 1-3.24-.006 2.8 2.8 0 0 1-1.134-.918 2.172 2.172 0 0 1-.41-1.283c0-.42.12-.83.345-1.184a2.6 2.6 0 0 1 .944-.879 2.488 2.488 0 0 1-.636-.832c-.152-.32-.23-.67-.229-1.025a2.117 2.117 0 0 1 .378-1.248c.256-.362.604-.65 1.008-.832.43-.198.9-.298 1.374-.293.474-.004.942.099 1.371.3.403.182.749.47 1 .834.249.368.378.804.37 1.248a2.371 2.371 0 0 1-.868 1.851c.383.21.708.51.944.877a2.24 2.24 0 0 1-.074 2.481l-.007-.003Z"></path>
                    </svg>}
                    {isPostNsfw && <h1 className="text-[12px] text-[#E00296] ml-[1px] mr-2">NSFW</h1>}

                    {isPostSpoiler && <svg rpl="" class="inline-block" fill="red" height="14" icon-name="spoiler-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="m18.628 6.73-5.364-5.365a4.626 4.626 0 0 0-6.542 0L1.355 6.73a4.634 4.634 0 0 0 0 6.542l5.367 5.365a4.627 4.627 0 0 0 6.542 0l5.364-5.365a4.627 4.627 0 0 0 0-6.542ZM11.162 5l-.28 6.747H9.117L8.837 5h2.325Zm-.038 9.536a1.29 1.29 0 0 1-.462.472 1.24 1.24 0 0 1-.655.178 1.286 1.286 0 1 1 1.117-.65Z"></path>
                    </svg>}
                    {isPostSpoiler && <h1 className="text-[12px] text-red-600 font-medium ml-1 ">SPOILER</h1>}
                </div>

                <h1 className="text-[17px] text-white mb-[10px]  font-medium ">{postTitle}</h1>
                <div className="bg-[#04090A] w-full h-fit pt-[12px] mb-[12px] pb-4 px-[12px] flex rounded-xl flex-col">
                    <div className="flex flex-row items-center">
                        <img onClick={(e) => { e.stopPropagation(); navigate(`/user/${username}`); }} src={commentPicture} alt="" className="w-6 h-6 peer rounded-full mr-2" />
                        <h1 onClick={(e) => { e.stopPropagation(); navigate(`/user/${username}`); }} className="text-[12px] text-gray-200 peer-hover:underline hover:underline font-light ">{username}</h1>
                        <h1 className="text-[11px] text-gray-400 font-extralight ml-2">.</h1>
                        <h1 className="text-[10px] text-gray-400 font-extralight -mb-[1.5px] ml-2">{moment(createdAt).fromNow()}</h1>
                    </div>

                    <div className="flex flex-row">
                        <h1 className="text-[13px] mt-[11px] text-gray-200 font-light ">{content}</h1>
                    </div>

                    <h1 className="text-[12px] text-gray-400 mt-3 font-light mr-[1px]">{formatVotes(netVote)} votes</h1>




                </div>
                <h1 className="text-[12px] mb-1 hover:text-blue-300 w-fit text-[#629FFF]">Go To Thread</h1>
                <div className="flex flex-row w-full items-center">
                    <h1 className="text-[12px] text-gray-400 font-light mr-[1px]">{formatVotes(postVotes)} votes</h1>
                    <h1 className="text-[12px] text-gray-400 font-light ml-2">.</h1>
                    <h1 className="text-[12px] text-gray-400 font-light ml-2">{commentCount} comments</h1>
                </div>

            </div>



        </div>

    );
}

export default SearchFeedComments;