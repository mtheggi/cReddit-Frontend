import { useState, useEffect, useRef, useContext } from "react";
import moment from "moment";
import { AvatarGenerator } from 'random-avatar-generator';
import { ChatContext } from "@/context/ChatContext";
import { UserContext } from "@/context/UserContext";
const Channel = ({ index, roomInfo }) => {
    const [isOpenChannel, setIsOpenChannel] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const channelRef = useRef(null);
    const generator = new AvatarGenerator();
    const [avatar, setAvatar] = useState("https://random.imagecdn.app/500/150");
    const { _id, name, lastSentMessage } = roomInfo;
    const { createdAt, content } = lastSentMessage || { createdAt: "", content: "" };
    const { socket, rooms, selectedRoomId, setSelectedRoomId, setIsChannelSelected, setIsAddChat, setSelectedRoom } = useContext(ChatContext);
    const { user } = useContext(UserContext);
    useEffect(() => {
        const newAvatar = generator.generateRandomAvatar(_id);
        setAvatar(newAvatar);
    }, []);

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
        const maxChars = windowWidth <= 768 ? 6 : 20;
        if (message.length > maxChars) {
            return message.slice(0, maxChars) + "...";
        }
        return message;
    };

    const limitName = (name) => {
        const maxChars = windowWidth <= 768 ? 6 : 12;
        if (name.length > maxChars) {
            return name.slice(0, maxChars) + "...";
        }
        return name;
    };

    const handleLeaveRoom = () => {
        socket.current.emit('leaveRoom', rooms[index]); // Emit the 'leaveRoom' event with the current room ID
    };

    return (
        <div
            ref={channelRef}
            data-testid="open-threads"
            className={`flex flex-row h-[50px] px-3 py-2 mt-1 justify-start items-center hover:bg-reddit_dark_Chat_hover cursor-pointer ${isOpenChannel ? "bg-reddit_dark_Chat_hover" : ""
                }`}
            onClick={() => {
                setIsOpenChannel((prev) => !prev);
                setSelectedRoomId(_id);
                setSelectedRoom(roomInfo);
                setIsAddChat(false);
                console.log("selectedRoomId", _id);
                setIsChannelSelected(true);

            }}

        >
            <img src={avatar} className="h-9 w-9 rounded-full mr-3" />

            <div className="flex flex-col py-1 w-full">
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