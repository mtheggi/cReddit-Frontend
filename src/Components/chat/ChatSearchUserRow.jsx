import { useNavigate } from 'react-router-dom';

const ChatSearchUserRow = ({
    _id,
    username,
    profilePicture,
    isNSFW,
    handleClick,
    index
}) => {




    return (

        <div id={`search-user-row-${index}`} data-testid={`search-user-row-${index}`} onClick={(e) => handleClick(e, username, profilePicture)} className="z-30 w-full h-[54px] flex flex-row px-[24px] hover:bg-reddit_hover cursor-pointer items-center">
            <div className="w-fit flex-row flex items-center h-full mr-2">
                <img src={profilePicture} alt="" className="w-7 h-7 rounded-full" />
            </div>
            <div className="flex flex-col h-full justify-center">
                <h1 className="text-gray-300 text-[13px] font-base">u/{username}</h1>
            </div>

        </div>
    );
}

export default ChatSearchUserRow;