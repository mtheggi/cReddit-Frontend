import { postRequest } from "@/services/Requests";
import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl } from "@/constants";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [isAddChat, setIsAddChat] = useState(false);
    const [isChannelSelected, setIsChannelSelected] = useState(false);
    const [tags, setTags] = useState([]);
    const [groupName, setGroupName] = useState("");



    const handleCreateChat = useCallback(async () => {
        const name = groupName;
        if (tags.length === 1) {
            name = null;
        }
        const response = await postRequest(`${baseUrl}/chat`, { name: name, members: tags });
        if (response.status === 200) {
            console.log("success");
            console.log(response.data);
        } else if (response.status === 201) {
            console.log("success");
            console.log(response.data)

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
        handleCreateChat
    }}>
        {children}
    </ChatContext.Provider>
}
