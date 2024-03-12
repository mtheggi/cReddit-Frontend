import { useState } from 'react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
const Comment = ({id}) => {
    const [commnetNumber, setCommentNumber] = useState(1)
    return (
        <div id={"mainfeed_"+id+"_comment"} className="flex justify-center flex-row items-center min-w-18 h-8 w-fit  bg-reddit_search hover:bg-reddit_search_light rounded-3xl">
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 mr-1 text-gray-300" />
            <span className="text-gray-300  text-sm mr-0.5"> {commnetNumber}</span>
        </div>

    );
}

export default Comment;