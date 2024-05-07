import { useState } from "react";

import propsTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

EmptyStart.propTypes = {
    color: propsTypes.string
}
/**
 * Renders an SVG icon for a bookmarked item or an empty star.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.color - The color of the SVG icon.
 * @param {boolean} props.isBookmarked - Indicates whether the item is bookmarked.
 * @returns {JSX.Element} - The rendered SVG icon.
 */
function EmptyStart({ color, isBookmarked }) {

    if (isBookmarked) {
        return (

            <svg rpl="" fill="white" icon-name="star-fill" viewBox="-2 0 24 22" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.943 7.659a1.142 1.142 0 0 0-.871-.771l-5.4-1.046L11 1.024a1.191 1.191 0 0 0-2 0L6.333 5.842.928 6.888a1.145 1.145 0 0 0-.619 1.9l3.757 4.024-.674 5.468a1.144 1.144 0 0 0 1.62 1.178L10 17.127l4.988 2.331a1.145 1.145 0 0 0 1.62-1.177l-.674-5.464 3.757-4.024a1.14 1.14 0 0 0 .252-1.134Z">
                </path></svg>
        );
    }




    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={color}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
        </svg>
    );
}
/**
 * Renders a community icon with optional text, bookmark functionality, and custom styling.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display next to the icon.
 * @param {string} props.divId - The ID of the container div.
 * @param {string} props.bookmarkId - The ID of the bookmark element.
 * @param {string} props.icon - The URL of the icon image.
 * @returns {JSX.Element} The rendered community icon component.
 */

const CommunityMod = ({ text, divId, icon }) => {



    return (
        <div id={divId} data-testid={divId} className="testClass flex h-[48px] mb-1 flex-row ml-0.5  justify-between pl-3 pr-4 hover:bg-reddit_hover SideIcon-Container rounded-lg items-center cursor-pointer">
            <div className="flex flex-row items-center justify-start">
                <img src={icon} className="h-[30px] w-[32px] rounded-full" alt="randomImgs" />
                <span className="text-gray-200 text-[13px] tracking-wider truncate letter font-normal ml-3">{text}</span>
            </div>
        </div>
    );
}
CommunityMod.propTypes = {
    text: propsTypes.string

}
export default CommunityMod;