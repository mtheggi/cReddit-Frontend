import { postRequest } from "@/services/Requests";
import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl } from "@/constants";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
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
        setReRenderSide

    }}>
        {children}
    </ChatContext.Provider>
}
