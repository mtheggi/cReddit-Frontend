import { useState } from 'react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
const Comment = () => {
    const [commnetNumber, setCommentNumber] = useState(0)
    return (
        <div className="flex flex-row bg-reddit_greenyDark hover:bg-reddit_search_light rounded-3xl py-2 px-2">
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 mr-2 text-gray-300" />
            <span className="text-gray-300 font-medium text-base"> {commnetNumber} Comments</span>
        </div>

    );
}

export default Comment;