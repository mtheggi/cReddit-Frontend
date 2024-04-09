import { useState } from 'react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
const Comment = ({ id, commentCount }) => {
    function formatComments(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num;
        }
    }
    return (
        <div id={"mainfeed_" + id + "_comment"} className="flex justify-center flex-row items-center min-w-18 h-8 w-fit  bg-reddit_search hover:bg-reddit_search_light rounded-3xl">
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 mr-1 text-gray-300" />
            <span className="text-gray-300  text-sm mr-0.5"> {formatComments(commentCount)}</span>
        </div>

    );
}

export default Comment;