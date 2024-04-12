import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';


const CommentIcon = ({ id, commentCount, username, communityName }) => {
    const location = useLocation();
    const navigate = useNavigate();
    function formatComments(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num;
        }
    }

    const smoothScroll = (element, target, duration) => {
        let start = element.scrollTop,
            change = target - start,
            currentTime = 0,
            increment = 20;

        const animateScroll = function() {
            currentTime += increment;
            let val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                window.requestAnimationFrame(animateScroll);
            }
        };
        animateScroll();
    }

    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };


    return (
        <div onClick={() => {
            const url = location.pathname;
            const regex = /.*\/comments\/([A-Za-z0-9]*)\/?.*/;
            const match = url.match(regex);
            if (!match) {
                if (!communityName)
                    navigate(`u/${username}/comments/${id}`)
                else
                    navigate(`r/${communityName}/comments/${id}`)
            }
            else {
                const element = document.getElementById('mainfeed_comment_category_dropdown');
                const mainfeed = document.getElementById('mainfeed');
                console.log(element, mainfeed);
                if (element && mainfeed) {
                    
                    const position = element.offsetTop - mainfeed.offsetTop - 10;
                    smoothScroll(mainfeed, position, 300);
                }
            }
        }
        }
            id={"mainfeed_" + id + "_comment"} className="flex justify-center cursor-pointer flex-row items-center min-w-18 h-8 w-fit  bg-reddit_search hover:bg-reddit_search_light rounded-3xl">
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 mr-1 text-gray-300" />
            <span className="text-gray-300  text-sm mr-0.5"> {formatComments(commentCount)}</span>
        </div>

    );
}

export default CommentIcon;