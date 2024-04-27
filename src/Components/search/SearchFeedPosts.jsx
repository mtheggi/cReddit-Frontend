
import moment from "moment";



const SearchFeedPosts = ({
    communityName,
    username,
    profilePicture,
    netVote,
    commentCount,
    createdAt,
    title,
    content,
    isSpoiler,
    isNSFW,
    type,
    lastElementRef


}) => {

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

        <div ref={lastElementRef} className="h-fit w-full flex flex-row pl-3 pr-2 py-6 rounded-xl items-center cursor-pointer border-[#2F383B] hover:bg-reddit_hover">
            <div className="w-full flex-col flex ">
                <div className="flex flex-row w-full h-fit mb-2 items-center">
                    <img src={profilePicture} alt="" className="w-7 h-7 rounded-full mr-2" />
                    {communityName != null ? <h1 className="text-[12px] font-medium text-gray-400 tracking-wide">r/{communityName}</h1> :
                        <h1 className="text-[12px] font-medium text-gray-400 tracking-wide">u/{username}</h1>}
                    <h1 className="text-[12px] text-gray-400 font-extralight ml-2">.</h1>
                    <h1 className="text-[11px] text-gray-400 font-extralight ml-2">{moment(createdAt).fromNow()}</h1>
                </div>
                <h1 className="text-[17px] text-white mb-[10px]  font-medium ">{title}</h1>
                <div className="flex flex-row w-full items-center">
                    <h1 className="text-[12px] text-gray-400 font-extralight mr-[1px]">{formatVotes(netVote)} votes</h1>
                    <h1 className="text-[12px] text-gray-400 font-extralight ml-2">.</h1>
                    <h1 className="text-[12px] text-gray-400 font-extralight ml-2">{commentCount} comments</h1>
                </div>

            </div>

            {type == "Images & Video" &&
                <div className="ml-auto overflow-clip rounded-lg relative w-[135px] min-w-[135px] h-[95px]"  >
                  
                    {!content.endsWith(".mp4") ? <img src={content} alt="" className="h-full absolute w-full object-cover rounded-lg" /> : <video src={content} className="h-full w-full rounded-lg" controls></video>}
                </div>}

        </div>

    );
}

export default SearchFeedPosts;