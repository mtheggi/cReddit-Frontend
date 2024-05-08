import { useState, useEffect, useRef, useContext } from "react";
import moment from "moment";
import { AvatarGenerator } from 'random-avatar-generator';
import { ChatContext } from "@/context/ChatContext";
import { UserContext } from "@/context/UserContext";
import { patchRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
const Channel = ({ index, roomInfo }) => {
    const [isOpenChannel, setIsOpenChannel] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const channelRef = useRef(null);
    const generator = new AvatarGenerator();
    const [avatar, setAvatar] = useState("https://random.imagecdn.app/500/150");
    const { _id, name, lastSentMessage } = roomInfo;
    const { createdAt, content, isRead } = lastSentMessage || { createdAt: "", content: "" };
    const { socket, rooms, selectedRoomId, setSelectedRoomId, setIsChannelSelected, setIsAddChat, setSelectedRoom } = useContext(ChatContext);
    const { user } = useContext(UserContext);


    const [myIsRead, setMyIsRead] = useState(isRead);
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
    const handleMarkAsRead = async (roomId) => {

        const response = await patchRequest(`${baseUrl}/chat/${roomId}/mark-as-read`);
        if (response.status === 200) {
            setMyIsRead(true);
        }
    }

    return (
        <div
            ref={channelRef}
            data-testid="open-threads"
            id="open-threads"
            className={`flex flex-row h-[50px] px-3 py-2 mt-1 justify-start items-center hover:bg-reddit_dark_Chat_hover cursor-pointer ${isOpenChannel ? "bg-reddit_dark_Chat_hover" : ""
                }`}
            onClick={() => {
                setIsOpenChannel((prev) => !prev);
                setSelectedRoomId(_id);
                setSelectedRoom(roomInfo);
                setIsAddChat(false);
                handleMarkAsRead(_id);
                console.log("selectedRoomId", _id);
                setIsChannelSelected(true);

            }}

        >
            <img src={avatar} className="h-9 w-9 rounded-full mr-3" />

            <div className="flex flex-col py-1 w-full">
                <div className="flex flex-row justify-between items-baseline ">
                    <p className="text-white text-sm">{limitName(name)}</p>
                    <p className="text-gray-500 text-xs">{moment(createdAt).fromNow()}</p>
                </div>

                <div className="flex flex-row justify-between">
                    <p className="text-gray-400 text-sm"> {limitMessage(content)}</p>

                    {!myIsRead && <div className='w-[13px] h-[13px] border-[2px] border-[#0C1416] mt-1 rounded-full bg-reddit_upvote'> </div>}
                </div>
            </div>
        </div>
    );
};


export default Channel;