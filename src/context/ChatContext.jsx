import { postRequest } from "@/services/Requests";
import { createContext, useState, useEffect, useCallback, useRef, useContext } from "react";
import { baseUrl } from "@/constants";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { UserContext } from "./UserContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { userInfo } = useContext(UserContext)
    const [isAddChat, setIsAddChat] = useState(false);
    const [isChannelSelected, setIsChannelSelected] = useState(false);
    const [tags, setTags] = useState([]);
    const [profilePictureTag, setProfilePictureTag] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    const [creationError, setCreationError] = useState(false);
    const [creationMsg, setCreationMsg] = useState("");
    const [reRenderSide, setReRenderSide] = useState(false);
    const socket = useRef(null);

    useEffect(() => {
        if (!socket.current) {
            console.log('Connecting to server', socket.current)
            socket.current = io(baseUrl);
            socket.current.on('connect', () => {
                console.log('Connected to server', socket.current)
            });

            // socket.current.on('error', (data) => {
            //     setResponse(`Error: ${data.message}`);
            // });

            // socket.current.on('onlineUser', (data) => {
            //     setResponse(`User: ${data.username} is online in room: ${data.room}`);
            // });

            // socket.current.on('joinedRoom', (data) => {
            //     setResponse(`Joined rooms: ${data.rooms.join(', ')}`);
            // });

        }
    }, []);


    const handleCreateChat = useCallback(async () => {
        let name = groupName;
        if (tags.length === 1) {
            name = null;
        }
        const response = await postRequest(`${baseUrl}/chat`, { name: name, members: tags });
        if (response.status === 200) {
            console.log("success");
            setSelectedRoomId(response.data.roomID);
            setCreationMsg(response.data.message);
            setReRenderSide(true);
        } else if (response.status === 201) {
            console.log("success");
            setSelectedRoomId(response.data.roomID);
            setCreationMsg(response.data.message);
            setReRenderSide(true);
        } else {
            setCreationError(true);
            setCreationMsg(response.data.message);
        }

    });

    const handleSendMessage = (event, message) => {
        event.preventDefault();
        const data = {
            username: userInfo?.username,
            roomId: selectedRoomId, // Add the room ID to the chat message data
            message: message
        };
        socket.current.emit('chatMessage', data);
    };

    return <ChatContext.Provider value={{
        isAddChat,
        setIsAddChat,
        isChannelSelected,
        setIsChannelSelected,
        tags,
        setTags,
        groupName,
        setGroupName,
        creationError,
        setCreationError,
        setCreationMsg,
        creationMsg,
        handleCreateChat,
        setProfilePictureTag,
        profilePictureTag,
        rooms,
        setRooms,
        reRenderSide,
        setReRenderSide,
        setSelectedRoomId,
        selectedRoomId,
        selectedRoom,
        setSelectedRoom,
        handleSendMessage,
        socket,

    }}>
        {children}
    </ChatContext.Provider>
}
