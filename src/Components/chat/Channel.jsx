import { useState, useEffect, useRef } from "react";
import moment from "moment";
const Channel = ({ roomInfo }) => {
    const [isOpenChannel, setIsOpenChannel] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const channelRef = useRef(null);
    const { name, lastSentMessage } = roomInfo;
    const { createdAt, content } = lastSentMessage;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        const handleClickOutside = (event) => {
            if (channelRef.current && !channelRef.current.contains(event.target)) {
                setIsOpenChannel(false);
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("click", handleClickOutside);


        return () => {
            window.removeEventListener("resize", handleResize);
            window.addEventListener("click", handleClickOutside);
        };
    }, []);

    const limitMessage = (message) => {
        const maxChars = windowWidth <= 768 ? 8 : 15;
        if (message.length > maxChars) {
            return message.slice(0, maxChars) + "...";
        }
        return message;
    };

    const limitName = (name) => {
        const maxChars = windowWidth <= 768 ? 8 : 15;
        if (name.length > maxChars) {
            return name.slice(0, maxChars) + "...";
        }
        return name;
    };

    return (
        <div
            ref={channelRef}
            data-testid="open-threads"
            className={`flex flex-row h-[50px] px-3 py-2 mt-1 justify-start items-center hover:bg-reddit_dark_Chat_hover cursor-pointer ${isOpenChannel ? "bg-reddit_dark_Chat_hover" : ""
                }`}
            onClick={() => {
                setIsOpenChannel((prev) => !prev);
            }}

        >
            <img src="https://random.imagecdn.app/500/150" className="h-7 w-7 rounded-full mr-3" />

            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-baseline ">
                    <p className="text-white text-sm">{limitName(name)}</p>
                    <p className="text-gray-500 text-xs">{moment(createdAt).calendar()}</p>
                </div>

                <div className="flex flex-row">
                    <p className="text-gray-400 text-sm"> {limitMessage(content)}</p>
                </div>
            </div>
        </div>
    );
};


export default Channel;