
import Share from './Share';
import Comment from './Comment';
import Vote from './Vote';
import redditLogo from '../../assets/reddit_logo.png';
import postImg from '../../assets/post_img.png';
import { useState, useEffect, useRef } from "react";
import { BookmarkIcon, EllipsisHorizontalIcon, EyeSlashIcon, FlagIcon } from '@heroicons/react/24/outline';


import moment from "moment";

const Post = ({
    id,
    title,
    username,
    communityName,
    content,
    createdAt,
    commentCount,
    netVote,
    isUpvoted,
    isDownvoted,
    type,
    profilePicture
}) => {
    const menuRefDots = useRef();
    const [isOpenDots, setIsOpenDots] = useState(false);
    const uploadedFrom = moment(createdAt).fromNow();

    useEffect(() => {
        let closeDropdown = (e) => {
            if (menuRefDots.current && !menuRefDots.current.contains(e.target)) {
                setIsOpenDots(false);
            }
        };
        document.addEventListener("click", closeDropdown);

        const scrollingElement = document.getElementById("mainfeed");
        const handleScroll = () => {
            const scrollThreshold = 30;
            const rect = menuRefDots.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top < scrollThreshold || rect.bottom > viewportHeight - scrollThreshold) {
                setIsOpenDots(false);
            }
        };

        if (scrollingElement) {
            scrollingElement.addEventListener("scroll", handleScroll);
        }

        return () => {
            document.removeEventListener("click", closeDropdown);

            if (scrollingElement) {
                scrollingElement.removeEventListener("scroll", handleScroll);
            }
        };
    });

    return (
        <div
            id={"mainfeed_" + id + "_full"}
            href="L"
            className={`flex flex-col bg-reddit_greenyDark hover:bg-reddit_hover ${isOpenDots ? "bg-reddit_hover" : ""
                } px-3 pt-2.5 mt-1 pb-1 rounded-2xl w-full cursor-pointer h-fit`}
        >
            <div className="flex flex-row items-center w-full h-6 ">
                <a
                    id={"mainfeed_" + id + "_community"}
                    href=""
                    className="flex items-center w-fit"
                >
                    <img src={profilePicture} alt="Logo" className="w-6 rounded-full h-6" />
                    <p className="text-gray-300 font-semibold text-xs ml-2 hover:text-cyan-600">
                        r/{communityName}
                    </p>
                </a>

                <p className="text-gray-400 font-bold text-xs ml-2 mb-1.5">.</p>
                <p className="text-gray-400 font-extralight text-xs ml-1.5">
                    {uploadedFrom}
                </p>

                <div ref={menuRefDots} className="relative ml-auto">
                    <div
                        id={"mainfeed_" + id + "_menu"}
                        className="h-7 w-7 ml-auto text-white rounded-full flex justify-center items-center hover:bg-reddit_search_light"
                    >
                        <EllipsisHorizontalIcon
                            onClick={(e) => {
                      
                                setIsOpenDots((prev) => !prev);
                            }}
                            className="h-6 w-6 outline-none"
                        />
                    </div>

                    {isOpenDots && (
                        <div className="z-1 w-30 h-37 bg-reddit_lightGreen absolute -ml-20 mt-1 text-white text-sm py-2 rounded-lg font-extralight flex flex-col">
                            <div
                                id={"mainfeed_" + id + "_menu_save"}
                                className="w-full pl-6 hover:bg-reddit_hover h-12 flex items-center cursor-pointer"
                            >
                                <BookmarkIcon className="h-4.5 w-5 text-white " />
                                <p className="ml-2 no-select">Save</p>
                            </div>
                            <div
                                id={"mainfeed_" + id + "_menu_hide"}
                                className="w-full pl-6 hover:bg-reddit_hover h-12 flex rounded-b-lg items-center cursor-pointer"
                            >
                                <EyeSlashIcon className="h-4.5 w-5 text-white" />
                                {/* Todo change the icon, make the buttons change color when clicked, and when any click anyhwere else, close the dropdown */}
                                <p className="ml-2 no-select">Hide</p>
                            </div>

                            <div
                                id={"mainfeed_" + id + "_menu_report"}
                                className="w-full pl-6 hover:bg-reddit_hover h-12 flex rounded-b-lg items-center cursor-pointer"
                            >
                                <FlagIcon className="h-4.5 w-5 text-white " />
                                {/* Todo change the icon, make the buttons change color when clicked, and when any click anyhwere else, close the dropdown */}
                                <p className="ml-2 no-select">Report</p>
                            </div>
                        </div>

                    )}
                </div>
            </div>

            <div className="mt-1 w-full flex  flex-col">
                <div className="text-white mt-1.5 font-medium text-lg">
                    <h1>{title}</h1>
                </div>
                <div className="text-gray-400 text-sm mt-1.5">
                    <p>{content}</p>
                </div>
            {type=="Images & Video" && <a
                id={"mainfeed_" + id + "_img"}
                href="img"
                className="w-full h-full mt-2"
            >
                <img src={postImg} alt="Post" className="rounded-2xl" />
            </a>}
            </div>

            <div className="flex flex-row items-center w-full h-13 space-x-2.5 no-select ">
                <Vote
                    id={id}
                    netVotes={netVote}
                    isUpvoted={isUpvoted}
                    isDownvoted={isDownvoted}
                />
                <Comment id={id} commentCount={commentCount} />
                <Share id={id} />
            </div>
        </div>
    );
};

export default Post;