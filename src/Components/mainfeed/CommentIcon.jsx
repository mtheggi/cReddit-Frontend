import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

/**
 * CommentIcon component.
 * 
 * @component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - The ID of the comment
 * @param {number} props.commentCount - The count of comments
 * @param {string} props.username - The username of the user who made the comment
 * @param {string} props.communityName - The name of the community where the comment was made
 * 
 * @returns {JSX.Element} The rendered CommentIcon component
 */
const CommentIcon = ({ id, commentCount, username, communityName }) => {
    const location = useLocation();
    const navigate = useNavigate();

    /**
    * Formats the comment count for display.
    * 
    * @param {number} num - The number of comments
    * @returns {string} The formatted comment count
    */
    function formatComments(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num;
        }
    }

    /**
   * Smoothly scrolls the page to a target element.
   * 
   * @param {HTMLElement} element - The element to scroll
   * @param {number} target - The target scroll position
   * @param {number} duration - The duration of the scroll animation in milliseconds
   */
    const smoothScroll = (element, target, duration) => {
        let start = element.scrollTop,
            change = target - start,
            currentTime = 0,
            increment = 20;

        /**
        * Animates the scroll position of the page.
        */
        const animateScroll = function () {
            currentTime += increment;
            let val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                window.requestAnimationFrame(animateScroll);
            }
        };
        animateScroll();
    }

    /**
     * Easing function for smooth animations.
     * 
     * @param {number} t - Current time
     * @param {number} b - Start value
     * @param {number} c - Change in value
     * @param {number} d - Duration
     * @returns {number} The calculated intermediate value
     */
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
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